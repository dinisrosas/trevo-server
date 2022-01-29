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

  @Cron('25 20 * * 1-3,5,6', {
    name: '8oclock_games',
    timeZone: 'Europe/Lisbon',
  })
  @Cron('55 12 * * 4', {
    name: 'thursday_game',
    timeZone: 'Europe/Lisbon',
  })
  async fetchGameResult(): Promise<void> {
    this.logger.debug('Fetching Game Result...');

    let attempts = 0;
    const intervalName = 'fetchGameInterval';

    const callback = async () => {
      attempts++;

      this.logger.debug('Fetch Attempt ' + attempts);

      const activeGames = await this.gamesService.findRecentActiveGames();

      // 4 hours  => 48 * 5 min
      if (activeGames.length === 0 || attempts >= 48 - 1) {
        this.schedulerRegistry.deleteInterval(intervalName);
        this.logger.debug('Stopped Fetching. All done');
        return;
      }

      for (const game of activeGames) {
        try {
          const { result, isoDate } = await getLatestGameResult(game.type);

          if (game.isoDate !== isoDate) {
            this.logger.debug('Fetch Result');
            this.logger.log('Game ' + game.type + ' ' + game.isoDate);
            this.logger.log('Result date ' + isoDate);
            this.logger.debug('Game is not available yet');
            continue;
          }

          this.logger.debug('Result Found ' + result);

          // sometimes result by order takes longer to be available
          if (result) {
            await this.gamesService.updateResult(game.id, result);
          }
        } catch (error) {
          this.logger.error(error.message);
        }
      }
    };

    // 5 minutes interval
    const interval = setInterval(callback, 1000 * 60 * 5);
    this.schedulerRegistry.addInterval(intervalName, interval);
  }
}
