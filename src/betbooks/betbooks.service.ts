import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";
import { BetsService } from "src/bets/bets.service";
import { LotteriesService } from "src/lotteries/lotteries.service";
import { PrismaService } from "src/prisma/prisma.service";
import { getLottery } from "src/utils/misc";
import { CreateBetbookInput } from "./dto/create-betbook.input";
import { UpdateBetbookInput } from "./dto/update-betbook.input";
import { Betbook, BetbookConnection } from "./entities/betbook.entity";

@Injectable()
export class BetbooksService {
  constructor(
    private prisma: PrismaService,
    private betsService: BetsService,
    private lotteriesService: LotteriesService
  ) {}

  async create(
    createBetbookInput: CreateBetbookInput & { sellerId: string }
  ): Promise<Betbook> {
    const now = DateTime.now();

    // validations
    const hasInvalidDate = createBetbookInput.bets.some((bet) => {
      const lottery = getLottery(bet.lottery.type, bet.lottery.isoDate);

      if (!lottery) {
        return true;
      }

      return lottery.date.diff(now).as("minutes") < 50;
    });

    if (hasInvalidDate) {
      throw new BadRequestException(
        "Less than 50 minutes left for one or more selected lotteries"
      );
    }

    const betbook = await this.prisma.betbook.create({
      data: {
        bettor: createBetbookInput.bettor,
        fixed: createBetbookInput.fixed,
        sellerId: createBetbookInput.sellerId,
      },
    });

    for (const bet of createBetbookInput.bets) {
      const lottery = await this.lotteriesService.findOrCreate({
        isoDate: bet.lottery.isoDate,
        type: bet.lottery.type,
      });

      await this.betsService.create({
        betbookId: betbook.id,
        lotteryId: lottery.id,
        pick: bet.pick,
        target: bet.target,
        updown: bet.updown,
        ball: bet.ball,
      });
    }

    return betbook;
  }

  async findAllBySeller(
    sellerId: string,
    fixed?: boolean,
    after?: string,
    first?: number
  ): Promise<BetbookConnection> {
    const args: Prisma.BetbookFindManyArgs = {
      where: {
        sellerId,
        fixed,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        seller: true,
        bets: {
          include: {
            lottery: true,
          },
        },
      },
    };

    const betbooks = await findManyCursorConnection(
      (pagination) => this.prisma.betbook.findMany({ ...pagination, ...args }),
      () => this.prisma.betbook.count({ where: args.where }),
      { first, after }
    );

    return betbooks;
  }

  async findOne(id: string): Promise<Betbook> {
    return await this.prisma.betbook.findUnique({
      where: { id },
      include: {
        seller: true,
        bets: {
          include: {
            lottery: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateBetbookInput: UpdateBetbookInput
  ): Promise<Betbook> {
    return await this.prisma.betbook.update({
      where: { id },
      data: {
        ...updateBetbookInput,
      },
    });
  }

  async delete(id: string): Promise<Betbook> {
    const betbook = await this.prisma.betbook.findUnique({ where: { id } });

    if (!betbook) {
      throw new Error("Betbook not found");
    }

    await this.prisma.$queryRaw("DELETE FROM betbooks WHERE id = $1", id);

    return betbook;
  }
}
