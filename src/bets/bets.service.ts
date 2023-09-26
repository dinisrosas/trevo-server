import { Injectable } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';
import { getBetAmount } from './helpers/amount.helper';
import { FindActiveArgs } from './dto/generics.args';

@Injectable()
export class BetsService {
  constructor(
    private prisma: PrismaService,
    private gamesService: GamesService,
  ) {}

  async create(
    data: Omit<CreateBetInput, 'game'> & {
      gameId: string;
      betbookId: string;
    },
  ): Promise<Bet> {
    const game = await this.gamesService.findOneById(data.gameId);

    const amount = getBetAmount({
      mode: game.mode,
      pick: data.pick,
      target: data.target,
      updown: data.updown,
    });

    return this.prisma.bet.create({
      data: {
        amount,
        target: data.target,
        pick: data.pick,
        updown: data.updown,
        ball: data.ball,
        betbookId: data.betbookId,
        gameId: data.gameId,
      },
    });
  }

  async findAll(): Promise<Bet[]> {
    return await this.prisma.bet.findMany({ include: { game: true } });
  }

  async findAllActive(args?: FindActiveArgs): Promise<Bet[]> {
    return await this.prisma.bet.findMany({
      where: {
        award: null,
        game: {
          isoDate: args?.date,
        }
      },
      include: {
        game: true,
      },
    });
  }

  async findAllByGameId(gameId: string): Promise<Bet[]> {
    return await this.prisma.bet.findMany({
      where: {
        gameId: gameId,
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

  async findOne(id: string): Promise<Bet> {
    return await this.prisma.bet.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateBetInput): Promise<Bet> {
    return await this.prisma.bet.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<Bet> {
    return await this.prisma.bet.delete({ where: { id } });
  }
}
