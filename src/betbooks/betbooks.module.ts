import { Module } from '@nestjs/common';
import { BetbooksService } from './betbooks.service';
import { BetbooksResolver } from './betbooks.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { GamesModule } from 'src/games/games.module';
import { BetsModule } from 'src/bets/bets.module';

@Module({
  imports: [BetsModule, GamesModule],
  providers: [BetbooksResolver, BetbooksService, PrismaService],
})
export class BetbooksModule {}
