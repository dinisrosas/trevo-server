import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GamesService } from '../games.service';
import { getLatestGameResult } from '../helpers/result.helper';

@Injectable()
export class FetchGameResultTask {
  private readonly logger = new Logger(FetchGameResultTask.name);

  constructor(private gamesService: GamesService) {}

  @Cron('0 22 * * 1-3,5,6')
  @Cron('30 14 * * 4')
  async fetchAndUpdateGameResult(): Promise<void> {
    const activeGames = await this.gamesService.findRecentActiveGames();

    for (const game of activeGames) {
      const { result, isoDate } = await getLatestGameResult(game.type);

      if (game.isoDate !== isoDate) {
        this.logger.warn('Game date and result date do not match');
        this.logger.log(isoDate);
        this.logger.log(JSON.stringify(game, null, 2));
        continue;
      }

      await this.gamesService.updateResult(game.id, result);
    }
  }
}
