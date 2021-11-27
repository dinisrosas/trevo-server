import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';
import { BetsService } from 'src/bets/bets.service';
import { gameConstants } from 'src/games/contants';
import { GamesService } from 'src/games/games.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getGameFromRawData } from 'src/utils/misc';
import { CreateBetbookInput } from './dto/create-betbook.input';
import { FindAllArgs } from './dto/generics.args';
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

      return (
        DateTime.fromJSDate(game.date).diffNow().as('minutes') <
        gameConstants.minDelayBeforeDeadlineInMinutes
      );
    });

    if (hasInvalidDate) {
      throw new BadRequestException(
        `Less than ${gameConstants.minDelayBeforeDeadlineInMinutes} minutes left for one or more selected games`,
      );
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

  async findOne(id: string): Promise<Betbook> {
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
    return await this.prisma.betbook.delete({ where: { id } });
  }
}
