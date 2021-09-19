import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { DateTime } from "luxon";
import { PrismaService } from "src/prisma/prisma.service";
import { LotteryType, RawLottery } from "src/types";
import rawLotteries from "./data/raw-lotteries";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";
import { Lottery } from "./entities/lottery.entity";
import { OncomingLottery } from "./entities/oncoming-lottery.entity";
import { getNextLotteries } from "./helpers/oncoming.helper";

@Injectable()
export class LotteriesService {
  private readonly rawLotteries: RawLottery[] = rawLotteries;

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createLotteryInput: CreateLotteryInput): Promise<Lottery> {
    const { type, isoDate } = createLotteryInput;

    // needs validations !!

    const rawLottery = this.rawLotteries.find(
      (lottery) => lottery.type === type
    );

    const date = DateTime.fromISO(isoDate)
      .startOf("day")
      .set({ ...rawLottery.time })
      .toJSDate();

    const lotteryMode = /(EM|TL)/.test(type) ? "DRAW" : "LOTTERY";

    return await this.prisma.lottery.create({
      data: {
        type,
        name: rawLottery.name,
        mode: lotteryMode,
        date,
        isoDate: "asd",
      },
    });
  }

  async findOrCreate(createLotteryInput: CreateLotteryInput): Promise<Lottery> {
    const { type, isoDate } = createLotteryInput;

    const lottery = await this.prisma.lottery.findUnique({
      where: {
        type_iso_date: { type, isoDate },
      },
    });

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
        bets: true,
      },
    });
  }

  async findFinished(sellerId: string): Promise<Lottery[]> {
    return await this.prisma.lottery.findMany({
      where: {
        result: {
          not: null,
        },
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
    });
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
