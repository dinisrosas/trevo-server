import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GamesService } from '../games.service';
import { getLatestGameResult } from '../helpers/result.helper';

@Injectable()
export class FetchGameResultTask {
  private readonly logger = new Logger(FetchGameResultTask.name);

  constructor(private gamesService: GamesService) {}

  @Cron('0 22 * * 1-3,5,6', {
    timeZone: 'Europe/Lisbon',
  })
  @Cron('30 14 * * 4', {
    timeZone: 'Europe/Lisbon',
  })
  async fetchAndUpdateGameResult(): Promise<void> {
    this.logger.log('fetch game result');

    const activeGames = await this.gamesService.findRecentActiveGames();

    for (const game of activeGames) {
      const { result, isoDate } = await getLatestGameResult(game.type);

      if (game.isoDate !== isoDate) {
        this.logger.warn('Game date and result date do not match');
        this.logger.debug(isoDate);
        this.logger.debug(JSON.stringify(game, null, 2));
        continue;
      }

      await this.gamesService.updateResult(game.id, result);
    }
  }

  @Cron('2 15 * * 4', {
    timeZone: 'Europe/Lisbon',
  })
  async test(): Promise<void> {
    this.logger.log('test fetch game result');
    this.logger.log(new Date());
  }
}
