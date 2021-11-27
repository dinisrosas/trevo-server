import { Module } from '@nestjs/common';
import { GamesModule } from 'src/games/games.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';
import { GameResultListener } from './listeners/game-result.listener';

@Module({
  imports: [GamesModule],
  providers: [BetsResolver, BetsService, PrismaService, GameResultListener],
  exports: [BetsService],
})
export class BetsModule {}
