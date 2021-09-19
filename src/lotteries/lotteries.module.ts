import { Module } from "@nestjs/common";
import { LotteriesService } from "./lotteries.service";
import { LotteriesResolver } from "./lotteries.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { FetchLotteryResultTask } from "./tasks/fetch-result.task";

@Module({
  providers: [
    LotteriesResolver,
    LotteriesService,
    PrismaService,
    FetchLotteryResultTask,
  ],
  exports: [LotteriesService],
})
export class LotteriesModule {}
