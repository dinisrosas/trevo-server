import { Module } from "@nestjs/common";
import { LotteriesModule } from "src/lotteries/lotteries.module";
import { PrismaService } from "src/prisma/prisma.service";
import { BetsResolver } from "./bets.resolver";
import { BetsService } from "./bets.service";
import { LotteryResultListener } from "./listeners/lottery-result.listener";

@Module({
  imports: [LotteriesModule],
  providers: [BetsResolver, BetsService, PrismaService, LotteryResultListener],
  exports: [BetsService],
})
export class BetsModule {}
