import { DateTime } from 'luxon';
import { gameConstants } from '../contants';
import { getNextGames } from './oncoming.helper';

const delay = gameConstants.minDelayBeforeDeadlineInMinutes;

describe('oncoming games quantity', () => {
  it('should return 0 games', () => {
    const games = getNextGames(0);
    expect(games.length).toBe(0);
  });

  it('should return 1 game', () => {
    const games = getNextGames(1);
    expect(games.length).toBe(1);
  });

  it('should return 23 games', () => {
    const games = getNextGames(23);
    expect(games.length).toBe(23);
  });
});

describe('oncoming games date delay', () => {
  const baseDate = DateTime.now();

  // all hours for 1 week
  for (let hour = 0; hour <= 24 * 7; hour++) {
    const now = baseDate.plus({ hour });
    const games = getNextGames(1, now.toJSDate());

    const firstGameDate = DateTime.fromJSDate(games.at(0).date);

    it(`${firstGameDate.toString()} should be >= than ${now.toString()} + ${delay} minutes`, () => {
      const diffInMinutes = firstGameDate.diff(now).as('minutes');
      expect(diffInMinutes).toBeGreaterThanOrEqual(delay);
    });
  }

  const games = getNextGames(50);
  let prevGameDate = games[0].date;

  it('games should have crescent order dates', () => {
    for (const game of games) {
      const diff = DateTime.fromJSDate(game.date)
        .diff(DateTime.fromJSDate(prevGameDate))
        .as('minutes');

      expect(diff).toBeGreaterThanOrEqual(0);
      prevGameDate = game.date;
    }
  });
});
