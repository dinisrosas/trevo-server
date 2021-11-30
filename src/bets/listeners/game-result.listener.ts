import { Game } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BetsService } from '../bets.service';
import { getBetAward } from '../helpers/award.helper';

@Injectable()
export class GameResultListener {
  // private readonly logger = new Logger(GameResultListener.name);

  constructor(private betsService: BetsService) {}

  @OnEvent('game.result.updated')
  async handleGameResultUpdated(game: Game): Promise<void> {
    const bets = await this.betsService.findAllByGameId(game.id);

    for (const bet of bets) {
      const award = getBetAward({
        pick: bet.pick,
        result: game.result,
        mode: game.mode,
        target: bet.target,
        type: game.type,
        ball: bet.ball,
        amount: bet.amount,
        updown: bet.updown,
      });

      await this.betsService.update(bet.id, {
        award: award.amount,
        awardDescription: award.description,
      });
    }
  }
}
