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
    this.logger.log('fetch game result');

    let attempts = 0;
    const intervalName = 'fetchGameInterval';

    const callback = async () => {
      attempts++;

      this.logger.log('fetch attempt ' + attempts);

      const activeGames = await this.gamesService.findRecentActiveGames();

      // 36 * 5 min => 3 hours 55 minutes
      if (activeGames.length === 0 || attempts >= 47) {
        this.schedulerRegistry.deleteInterval(intervalName);
        return;
      }

      for (const game of activeGames) {
        try {
          const { result, isoDate } = await getLatestGameResult(game.type);

          if (game.isoDate !== isoDate) {
            this.logger.warn('Game and result dates do not match');
            this.logger.debug('result date ' + isoDate);
            this.logger.debug('game ' + game.type + ' ' + game.isoDate);
            continue;
          }

          this.logger.log('found result ' + result);

          await this.gamesService.updateResult(game.id, result);
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
