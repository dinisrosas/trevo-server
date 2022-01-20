import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { GamesService } from '../games.service';
import { getLatestGameResult } from '../helpers/result.helper';

@Injectable()
export class FetchGameResultTask {
  private readonly logger = new Logger(FetchGameResultTask.name);

  constructor(
    private gamesService: GamesService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('15 20 * * 1-3,5,6', {
    timeZone: 'Europe/Lisbon',
  })
  @Cron('45 12 * * 4', {
    timeZone: 'Europe/Lisbon',
  })
  async fetchGameResult(): Promise<void> {
    this.logger.log('fetch game result');

    let attempts = 0;
    const intervalName = 'fetchGameInterval';

    const callback = async () => {
      attempts++;

      this.logger.log('attempt ' + attempts);

      const activeGames = await this.gamesService.findRecentActiveGames();

      // 36 * 5 min => 4 hours
      if (activeGames.length === 0 || attempts >= 48) {
        this.schedulerRegistry.deleteInterval(intervalName);
        return;
      }

      for (const game of activeGames) {
        const { result, isoDate } = await getLatestGameResult(game.type);

        if (game.isoDate !== isoDate) {
          this.logger.warn('Game and result dates do not match');
          this.logger.debug('result date ' + isoDate);
          this.logger.debug('game ' + game.type + ' ' + game.isoDate);
          continue;
        }

        await this.gamesService.updateResult(game.id, result);
      }
    };

    // 5 minutes interval
    const interval = setInterval(callback, 1000 * 60 * 5);
    this.schedulerRegistry.addInterval(intervalName, interval);
  }
}
