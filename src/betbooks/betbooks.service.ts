import { Injectable } from "@nestjs/common";
import { BetsService } from "src/bets/bets.service";
import { LotteriesService } from "src/lotteries/lotteries.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetbookInput } from "./dto/create-betbook.input";
import { UpdateBetbookInput } from "./dto/update-betbook.input";
import { Betbook } from "./entities/betbook.entity";

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
    const betbook = await this.prisma.betbook.create({
      data: {
        bettor: createBetbookInput.bettor,
        sellerId: createBetbookInput.sellerId,
        totalAmount: 0,
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
        upDown: bet.upDown,
      });
    }

    const totalAmount = await this.betsService.getBetbookTotalAmount(
      betbook.id
    );

    // maybe improve in the future, create bet with totalAmount already
    const updatedBetbook = await this.update(betbook.id, {
      id: betbook.id,
      totalAmount,
    });

    return updatedBetbook;
  }

  async findAllBySeller(sellerId: string): Promise<Betbook[]> {
    const betbooks = await this.prisma.betbook.findMany({
      where: {
        sellerId,
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
    });

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
