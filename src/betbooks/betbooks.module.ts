import { Module } from "@nestjs/common";
import { BetbooksService } from "./betbooks.service";
import { BetbooksResolver } from "./betbooks.resolver";
import { PrismaService } from "src/prisma/prisma.service";
import { LotteriesModule } from "src/lotteries/lotteries.module";
import { BetsModule } from "src/bets/bets.module";

@Module({
  imports: [BetsModule, LotteriesModule],
  providers: [BetbooksResolver, BetbooksService, PrismaService],
})
export class BetbooksModule {}
