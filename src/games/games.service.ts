import { Prisma } from '.prisma/client';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameType } from 'src/types';
import { getGame } from 'src/utils/misc';
import { CreateGameInput } from './dto/create-game.input';
import { FindAllBySellerArgs } from './dto/generics.args';
import { UpdateGameInput } from './dto/update-game.input';
import { Game, GameConnection } from './entities/game.entity';
import { OncomingGame } from './entities/oncoming-game.entity';
import { getNextGames } from './helpers/oncoming.helper';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateGameInput): Promise<Game> {
    const { type, isoDate } = data;

    const game = getGame(type, isoDate);

    if (!game) {
      throw new BadRequestException('Invalid game type or date');
    }

    return await this.prisma.game.create({
      data: {
        type,
        name: game.name,
        mode: game.mode,
        date: game.date.toJSDate(),
        isoDate: game.isoDate,
      },
    });
  }

  async findOrCreate(data: CreateGameInput): Promise<Game> {
    const { type, isoDate } = data;

    const game = await this.findOneByTypeIsoDate(type, isoDate);

    if (game) {
      return game;
    }

    return await this.create(data);
  }

  async findAll(): Promise<Game[]> {
    return await this.prisma.game.findMany();
  }

  async findOneById(id: string): Promise<Game> {
    return await this.prisma.game.findUnique({
      where: { id },
      include: {
        bets: {
          include: {
            betbook: true,
          },
        },
      },
    });
  }

  async findAllBySeller(
    sellerId: string,
    args: FindAllBySellerArgs,
  ): Promise<GameConnection> {
    const findManyBaseArgs: Prisma.GameFindManyArgs = {
      where: {
        isoDate: args.date,
        result: args.finished
          ? {
              not: null,
            }
          : undefined,
        bets: {
          every: {
            betbook: {
              sellerId,
            },
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    };

    const games = await findManyCursorConnection(
      (findManyArgs) =>
        this.prisma.game.findMany({ ...findManyArgs, ...findManyBaseArgs }),
      () => this.prisma.game.count({ where: findManyBaseArgs.where }),
      {
        first: args.first,
        after: args.after,
        before: args.before,
        last: args.last,
      },
    );

    return games;
  }

  async findOneByTypeIsoDate(type: GameType, isoDate: string): Promise<Game> {
    return await this.prisma.game.findUnique({
      where: {
        type_iso_date: { isoDate, type },
      },
    });
  }

  findOncoming(): OncomingGame[] {
    return getNextGames();
  }

  async findRecentActiveGames(): Promise<Game[]> {
    const today = DateTime.now().toISODate();
    return await this.prisma.game.findMany({
      where: {
        isoDate: today,
        result: null,
      },
    });
  }

  async update(id: string, data: UpdateGameInput): Promise<Game> {
    const game = await this.prisma.game.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return game;
  }

  async updateResult(id: string, result: string): Promise<Game> {
    const game = await this.prisma.game.update({
      where: {
        id,
      },
      data: {
        result,
      },
    });

    this.eventEmitter.emit('game.result.updated', Game);

    return game;
  }

  async remove(id: string): Promise<Game> {
    return await this.prisma.game.delete({ where: { id } });
  }
}
