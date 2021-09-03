import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { PrismaService } from "src/prisma/prisma.service";
import rawLotteries, { RawLottery } from "./data/raw-lotteries";
import { CreateLotteryInput } from "./dto/create-lottery.input";
import { UpdateLotteryInput } from "./dto/update-lottery.input";

@Injectable()
export class LotteriesService {
  private readonly lotteries: RawLottery[];

  constructor(private prisma: PrismaService) {
    this.lotteries = rawLotteries;
  }

  create(createLotteryInput: CreateLotteryInput) {
    const { type, iso_date } = createLotteryInput;

    const lottery = this.lotteries.find((lottery) => lottery.type === type);

    const date = DateTime.fromISO(iso_date)
      .startOf("day")
      .set({ ...lottery.time })
      .toJSDate();

    return this.prisma.lottery.create({
      data: {
        type,
        date,
        iso_date,
        name: lottery.name,
      },
    });
  }

  findAll() {
    return this.prisma.lottery.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} lottery`;
  }

  update(id: number, updateLotteryInput: UpdateLotteryInput) {
    return `This action updates a #${id} lottery`;
  }

  remove(id: number) {
    return `This action removes a #${id} lottery`;
  }
}
