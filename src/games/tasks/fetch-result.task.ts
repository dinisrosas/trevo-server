import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GamesService } from '../games.service';
import { getLatestGameResult } from '../helpers/result.helper';

@Injectable()
export class FetchGameResultTask {
  constructor(private gamesService: GamesService) {}

  @Cron('0 22 * * 1-3,5,6')
  @Cron('30 14 * * 4')
  async fetchAndUpdateGameResult(): Promise<void> {
    // get today's games
    const activeGames = await this.gamesService.findRecentActiveGames();

    for (const game of activeGames) {
      const { result, isoDate } = await getLatestGameResult(game.type);

      // result date validation !!
      if (game.isoDate !== isoDate) {
        throw new NotAcceptableException(
          'The date of the game and the date of the result fetched do not match',
        );
      }

      await this.gamesService.updateResult(game.id, result);
    }
  }
}
