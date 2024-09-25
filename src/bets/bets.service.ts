import { Injectable } from "@nestjs/common";
import { GamesService } from "src/games/games.service";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBetInput } from "./dto/create-bet.input";
import { UpdateBetInput } from "./dto/update-bet.input";
import { Bet, BetConnection, BetSummary } from "./entities/bet.entity";
import { getBetAmount } from "./helpers/amount.helper";
import { FindActiveArgs, FindAllArgs } from "./dto/generics.args";
import { Prisma } from "@prisma/client";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";

@Injectable()
export class BetsService {
  constructor(
    private prisma: PrismaService,
    private gamesService: GamesService,
  ) {}

  async create(
    data: Omit<CreateBetInput, "game"> & {
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

  async findAll(args: FindAllArgs): Promise<BetConnection> {
    const baseFindManyArgs: Prisma.BetFindManyArgs = {
      orderBy: {
        id: "desc",
      },
      include: {
        game: true,
      },
    };

    const bets = await findManyCursorConnection(
      (findManyArgs) =>
        this.prisma.bet.findMany({ ...findManyArgs, ...baseFindManyArgs }),
      () => this.prisma.bet.count({ where: baseFindManyArgs.where }),
      {
        first: args.first,
        after: args.after,
        before: args.before,
        last: args.last,
      },
    );

    return bets;
  }

  async summary(): Promise<BetSummary[]> {
    return await this.prisma.$queryRaw`
      SELECT 
        g.iso_date as date,
        SUM(b.amount) AS amount,
        SUM(COALESCE(b.award, 0)) AS award,
        SUM(b.amount - COALESCE(b.award, 0)) AS profit,
        g.result AS result
      FROM 
        bets b
      JOIN 
        games g ON b.game_id = g.id
      GROUP BY 
        g.iso_date, g.result
      ORDER BY
        g.iso_date ASC;
    `;
  }

  async findAllActive(args?: FindActiveArgs): Promise<Bet[]> {
    return await this.prisma.bet.findMany({
      where: {
        award: null,
        game: {
          isoDate: args?.date,
        },
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
