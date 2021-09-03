import { Module } from "@nestjs/common";
import { LotteriesService } from "./lotteries.service";
import { LotteriesResolver } from "./lotteries.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { LotteryTasksSerivce } from "./lottery-tasks.service";

@Module({
  providers: [
    LotteriesResolver,
    LotteriesService,
    PrismaService,
    LotteryTasksSerivce,
  ],
})
export class LotteriesModule {}
