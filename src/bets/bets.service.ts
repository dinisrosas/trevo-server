import { Injectable } from "@nestjs/common";
import { Bet } from "@prisma/client";
import { LotteriesService } from "src/lotteries/lotteries.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetInput } from "./dto/create-bet.input";
import { UpdateBetInput } from "./dto/update-bet.input";
import { getBetAmount } from "./helpers/amount.helper";

@Injectable()
export class BetsService {
  constructor(
    private prisma: PrismaService,
    private lotteriesService: LotteriesService
  ) {}

  async create(
    createBetInput: Omit<CreateBetInput, "lottery"> & {
      lotteryId: string;
      betbookId: string;
    }
  ): Promise<Bet> {
    const lottery = await this.lotteriesService.findOneById(
      createBetInput.lotteryId
    );

    const amount = getBetAmount({
      mode: lottery.mode,
      pick: createBetInput.pick,
      target: createBetInput.target,
      updown: createBetInput.updown,
    });

    return this.prisma.bet.create({
      data: {
        amount,
        target: createBetInput.target,
        pick: createBetInput.pick,
        updown: createBetInput.updown,
        ball: createBetInput.ball,
        betbookId: createBetInput.betbookId,
        lotteryId: createBetInput.lotteryId,
      },
    });
  }

  async findAll(): Promise<Bet[]> {
    return await this.prisma.bet.findMany();
  }

  async findAllByLotteryId(lotteryId: string): Promise<Bet[]> {
    return await this.prisma.bet.findMany({
      where: {
        lotteryId: lotteryId,
      },
    });
  }

  async findAllByBetbookId(betbookId: string): Promise<Bet[]> {
    return await this.prisma.bet.findMany({
      where: {
        betbookId: betbookId,
      },
    });
  }

  async getBetbookTotalAmount(betbookId: string): Promise<number> {
    const aggregate = await this.prisma.bet.aggregate({
      where: {
        betbookId: betbookId,
      },
      _sum: {
        amount: true,
      },
    });

    return aggregate._sum.amount;
  }

  async findOne(id: string): Promise<Bet> {
    return await this.prisma.bet.findUnique({ where: { id } });
  }

  async update(id: string, updateBetInput: UpdateBetInput): Promise<Bet> {
    return await this.prisma.bet.update({
      where: { id },
      data: {
        ...updateBetInput,
      },
    });
  }

  async remove(id: string): Promise<Bet> {
    return await this.prisma.bet.delete({ where: { id } });
  }
}
