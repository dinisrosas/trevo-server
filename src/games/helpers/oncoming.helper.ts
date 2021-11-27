import { DateTime } from 'luxon';
import { RawGame } from 'src/types';
import { gameConstants } from '../contants';
import rawGames from '../data/raw-games';
import { OncomingGame } from '../entities/oncoming-game.entity';

function getGameCalendarDate(game, startDate) {
  const previousGameDateTime = DateTime.fromJSDate(startDate)
    .set(game.time)
    .startOf('minute');

  const daysDiff = game.day - previousGameDateTime.weekday;

  // check if week changed
  const daysOffset =
    daysDiff >= 0 ? daysDiff : 7 - previousGameDateTime.weekday + game.day;

  return previousGameDateTime.plus({ days: daysOffset }).toJSDate();
}

function getGameId(game: RawGame) {
  return `${game.day}${game.type}`;
}

function findNextRawGame(prevGame: RawGame) {
  const nextGame = rawGames.find(
    (game) => getGameId(game) > getGameId(prevGame),
  );

  return nextGame ?? rawGames[0];
}

function getRawGameDateDiffNow(game: RawGame, date: Date) {
  const gameDate = getGameCalendarDate(game, date);
  return DateTime.fromJSDate(gameDate).diff(DateTime.fromJSDate(date));
}

export function findFirstRawGame(startDate: Date): RawGame {
  const startDateTime = DateTime.fromJSDate(startDate);
  const dayOfWeek = startDateTime.weekday;

  // is sunday
  if (dayOfWeek === 7) {
    return rawGames[0];
  }

  let currentGame = rawGames.find((game) => game.day === dayOfWeek);
  let minutesLeft = getRawGameDateDiffNow(currentGame, startDate).as('minutes');

  while (minutesLeft < gameConstants.minDelayBeforeDeadlineInMinutes) {
    currentGame = findNextRawGame(currentGame);
    minutesLeft = getRawGameDateDiffNow(currentGame, startDate).as('minutes');
  }

  return currentGame;
}

export function getNextGames(
  quantity = 8,
  startDate = new Date(),
  games = [],
): OncomingGame[] {
  if (games.length === quantity) {
    return games;
  }

  const lastGame = games.length > 0 ? games.at(-1) : null;

  const game = lastGame
    ? findNextRawGame(lastGame)
    : findFirstRawGame(startDate);

  const date = getGameCalendarDate(game, startDate);

  const oncomingGame: OncomingGame = {
    ...game,
    date,
    isoDate: DateTime.fromJSDate(date).toISODate(),
    mode: game.type.match(/EM|TL/) ? 'DRAW' : 'LOTTERY',
  };

  return getNextGames(quantity, date, [...games, oncomingGame]);
}
