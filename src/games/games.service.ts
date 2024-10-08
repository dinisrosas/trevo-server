import { Prisma } from ".prisma/client";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { BadRequestException, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { DateTime } from "luxon";
import { getGameFromRawData } from "src/bets/helpers/game.helper";
import { PrismaService } from "src/prisma/prisma.service";
import { GameType } from "src/types";
import { CreateGameInput } from "./dto/create-game.input";
import { FindAllBySellerArgs } from "./dto/generics.args";
import { UpdateGameInput } from "./dto/update-game.input";
import {
  AwardStat,
  AwardStatsArgs,
  Game,
  GameConnection,
} from "./entities/game.entity";

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateGameInput): Promise<Game> {
    const { type, isoDate } = data;

    const game = getGameFromRawData(type, isoDate);

    if (!game) {
      throw new BadRequestException("Invalid game type or date");
    }

    return await this.prisma.game.create({
      data: {
        type,
        name: game.name,
        mode: game.mode,
        date: game.date,
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

  async findAll(args: FindAllBySellerArgs): Promise<GameConnection> {
    const findManyBaseArgs: Prisma.GameFindManyArgs = {
      where: {
        isoDate: args.date,
        result: args.finished
          ? {
            not: null,
          }
          : undefined,
      },
      orderBy: {
        id: "desc",
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

  async findOneById(id: string): Promise<Game> {
    return await this.prisma.game.findUnique({
      where: { id },
      include: {
        bets: {
          include: {
            betbook: {
              include: {
                seller: true,
              },
            },
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
        id: "desc",
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

  async awardStats(args: AwardStatsArgs): Promise<AwardStat[]> {
    return await this.prisma.$queryRaw`
      SELECT 
        g.type AS game_type,
        b.pick AS bet_pick,
        COUNT(*)::INT AS total
      FROM 
          bets b
      JOIN 
          games g ON b.game_id = g.id
      WHERE 
          g.result IS NOT NULL
          AND b.award > 0
      GROUP BY 
          g.type, b.pick
      ORDER BY 
          total DESC
      LIMIT 25;
    `;
  }

  async findOneByTypeIsoDate(type: GameType, isoDate: string): Promise<Game> {
    return await this.prisma.game.findUnique({
      where: {
        type_iso_date: { isoDate, type },
      },
    });
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
        bets: undefined,
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

    this.eventEmitter.emit("game.result.updated", game);

    return game;
  }

  async remove(id: string): Promise<Game> {
    return await this.prisma.game.delete({ where: { id } });
  }
}
