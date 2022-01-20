import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { GameMode, Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { BetsService } from 'src/bets/bets.service';
import { getGameFromRawData, getGameMode } from 'src/bets/helpers/game.helper';
import { GamesService } from 'src/games/games.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCodes } from 'src/utils/errors';
import { MAX_BET_TARGET_PER_NUMBER } from './constants';
import { CreateBetbookInput } from './dto/create-betbook.input';
import { FindAllArgs } from './dto/find-all.args';
import { UpdateBetbookInput } from './dto/update-betbook.input';
import { Betbook, BetbookConnection } from './entities/betbook.entity';

@Injectable()
export class BetbooksService {
  constructor(
    private prisma: PrismaService,
    private betsService: BetsService,
    private gamesService: GamesService,
  ) {}

  async create(
    input: CreateBetbookInput & { sellerId: string },
  ): Promise<Betbook> {
    // validate date
    const hasInvalidDate = input.bets.some((bet) => {
      const game = getGameFromRawData(bet.game.type, bet.game.isoDate);
      return DateTime.fromJSDate(game.date).diffNow().as('minutes') < 0;
    });

    if (hasInvalidDate) {
      throw new NotAcceptableException({
        message: `One or more games already over the dealine`,
        code: ErrorCodes.GameUnavailable,
      });
    }

    // check for numbers betting limit
    const pairs = new Map();
    const activeBets = await this.betsService.findAllActive();

    for (const bet of [...input.bets, ...activeBets]) {
      const pickMode =
        getGameMode(bet.game.type) === GameMode.DRAW
          ? bet.ball
          : bet.pick.length;

      const key = JSON.stringify({
        type: bet.game.type + '|' + pickMode,
        date: bet.game.isoDate,
        pick: bet.pick,
      });

      const target = pairs.get(key);

      if (!target) {
        pairs.set(key, bet.target);
      } else {
        pairs.set(key, target + bet.target);
      }
    }

    const invalidBet = [...pairs].find(
      ([, target]) => target > MAX_BET_TARGET_PER_NUMBER,
    );

    if (invalidBet) {
      throw new NotAcceptableException({
        message: `Betbook has one or more bet targets over limit`,
        code: ErrorCodes.BetbookHasBetTargetOverLimit,
        data: {
          ...JSON.parse(invalidBet[0]),
          target: invalidBet[1],
          limit: MAX_BET_TARGET_PER_NUMBER,
        },
      });
    }

    const betbook = await this.prisma.betbook.create({
      data: {
        bettor: input.bettor,
        fixed: input.fixed,
        sellerId: input.sellerId,
      },
    });

    for (const bet of input.bets) {
      const game = await this.gamesService.findOrCreate({
        isoDate: bet.game.isoDate,
        type: bet.game.type,
      });

      await this.betsService.create({
        betbookId: betbook.id,
        gameId: game.id,
        pick: bet.pick,
        target: bet.target,
        updown: bet.updown,
        ball: bet.ball,
      });
    }

    return betbook;
  }

  async findAll(args: FindAllArgs): Promise<BetbookConnection> {
    const baseFindManyArgs: Prisma.BetbookFindManyArgs = {
      where: {
        fixed: args.fixed,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        seller: true,
        bets: {
          include: {
            game: true,
          },
        },
      },
    };

    const betbooks = await findManyCursorConnection(
      (findManyArgs) =>
        this.prisma.betbook.findMany({ ...findManyArgs, ...baseFindManyArgs }),
      () => this.prisma.betbook.count({ where: baseFindManyArgs.where }),
      {
        first: args.first,
        after: args.after,
        before: args.before,
        last: args.last,
      },
    );

    return betbooks;
  }

  async findAllBySeller(
    sellerId: string,
    args: FindAllArgs,
  ): Promise<BetbookConnection> {
    const baseFindManyArgs: Prisma.BetbookFindManyArgs = {
      where: {
        sellerId,
        fixed: args.fixed,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        seller: true,
        bets: {
          include: {
            game: true,
          },
        },
      },
    };

    const betbooks = await findManyCursorConnection(
      (findManyArgs) =>
        this.prisma.betbook.findMany({ ...findManyArgs, ...baseFindManyArgs }),
      () => this.prisma.betbook.count({ where: baseFindManyArgs.where }),
      {
        first: args.first,
        after: args.after,
        before: args.before,
        last: args.last,
      },
    );

    return betbooks;
  }

  async findOneById(id: string): Promise<Betbook> {
    return await this.prisma.betbook.findUnique({
      where: { id },
      include: {
        seller: true,
        bets: {
          include: {
            game: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateBetbookInput: UpdateBetbookInput,
  ): Promise<Betbook> {
    return await this.prisma.betbook.update({
      where: { id },
      data: {
        ...updateBetbookInput,
      },
    });
  }

  async delete(id: string): Promise<Betbook> {
    const betbook = await this.findOneById(id);

    const hasBetAlreadyDrawed = betbook.bets.some((bet) => {
      const timeLeft = DateTime.fromJSDate(bet.game.date).diffNow().toMillis();
      return timeLeft <= 0;
    });

    if (hasBetAlreadyDrawed) {
      throw new NotAcceptableException({
        message: "Can't delete betbook with game already drawn",
        code: ErrorCodes.BetbookHasGameAlreadyDrawn,
      });
    }

    return await this.prisma.betbook.delete({ where: { id } });
  }
}
