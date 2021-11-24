import { Prisma } from ".prisma/client";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { BadRequestException, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { DateTime } from "luxon";
import { PrismaService } from "src/prisma/prisma.service";
import { LotteryType } from "src/types";
import { getLottery } from "src/utils/misc";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { Lottery, LotteryConnection } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
import { getNextLotteries } from "./helpers/oncoming.helper";

@Injectable()
export class LotteriesService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createLotteryInput: CreateLotteryInput): Promise<Lottery> {
    const { type, isoDate } = createLotteryInput;

    const lottery = getLottery(type, isoDate);

    if (!lottery) {
      throw new BadRequestException("Invalid lottery type or date");
    }

    return await this.prisma.lottery.create({
      data: {
        type,
        name: lottery.name,
        mode: lottery.mode,
        date: lottery.date.toJSDate(),
        isoDate: lottery.isoDate,
      },
    });
  }

  async findOrCreate(createLotteryInput: CreateLotteryInput): Promise<Lottery> {
    const { type, isoDate } = createLotteryInput;

    const lottery = await this.findOneByTypeIsoDate(type, isoDate);

    if (lottery) {
      return lottery;
    }

    return await this.create(createLotteryInput);
  }

  async findAll(): Promise<Lottery[]> {
    return await this.prisma.lottery.findMany();
  }

  async findOneById(id: string): Promise<Lottery> {
    return await this.prisma.lottery.findUnique({
      where: { id },
      include: {
        bets: {
          include: {
            betbook: true,
          },
        },
      },
    });
  }

  async findAllBySeller(
    sellerId: string,
    date?: string,
    finished?: boolean,
    after?: string,
    first?: number
  ): Promise<LotteryConnection> {
    const args: Prisma.LotteryFindManyArgs = {
      where: {
        isoDate: date,
        result: finished
          ? {
              not: null,
            }
          : undefined,
        bets: {
          every: {
            betbook: {
              sellerId,
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    };

    const lotteries = await findManyCursorConnection(
      (pagination) => this.prisma.lottery.findMany({ ...pagination, ...args }),
      () => this.prisma.lottery.count({ where: args.where }),
      { first, after }
    );

    return lotteries;
  }

  async findOneByTypeIsoDate(
    type: LotteryType,
    isoDate: string
  ): Promise<Lottery> {
    return await this.prisma.lottery.findUnique({
      where: {
        type_iso_date: { isoDate, type },
      },
    });
  }

  findOncoming(): OncomingLottery[] {
    return getNextLotteries();
  }

  async findRecentActiveLotteries(): Promise<Lottery[]> {
    const today = DateTime.now().toISODate();
    return await this.prisma.lottery.findMany({
      where: {
        isoDate: today,
        result: null,
      },
    });
  }

  async update(
    id: string,
    updateLotteryInput: UpdateLotteryInput
  ): Promise<Lottery> {
    const lottery = await this.prisma.lottery.update({
      where: {
        id,
      },
      data: {
        ...updateLotteryInput,
      },
    });

    return lottery;
  }

  async updateResult(id: string, result: string): Promise<Lottery> {
    const lottery = await this.prisma.lottery.update({
      where: {
        id,
      },
      data: {
        result,
      },
    });

    this.eventEmitter.emit("lottery.result.updated", lottery);

    return lottery;
  }

  async remove(id: string): Promise<Lottery> {
    return await this.prisma.lottery.delete({ where: { id } });
  }
}
