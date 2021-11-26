import { DateTime } from "luxon";
import { gameConstants } from "../contants";
import rawGames from "../data/raw-games";
import { OncomingGame } from "../entities/oncoming-game.entity";

function getGameCalendarDate(game, startDate) {
  const previousGameDateTime = DateTime.fromJSDate(startDate)
    .set(game.time)
    .startOf("minute");

  const daysDiff = game.day - previousGameDateTime.weekday;

  // check if week changed
  const daysOffset =
    daysDiff >= 0 ? daysDiff : 7 - previousGameDateTime.weekday + game.day;

  return previousGameDateTime.plus({ days: daysOffset }).toJSDate();
}

function getGameId(game) {
  return `${game.day}${game.type}`;
}

function findNextRawGame(prevGame) {
  const nextGame = rawGames.find(
    (game) => getGameId(game) > getGameId(prevGame)
  );

  return nextGame ? nextGame : rawGames[0];
}

function findFirstRawGame(startDate) {
  const startDateTime = DateTime.fromJSDate(startDate);
  const dayOfWeek = startDateTime.weekday;

  // is sunday
  if (dayOfWeek === 7) {
    // return monday (weekday 0)
    return rawGames[0];
  }

  const firstGame = rawGames.find((game) => game.day === dayOfWeek);

  const firstGameDateTime = startDateTime.set(firstGame.time).startOf("minute");

  const { minutes: minutesLeft } = firstGameDateTime.diff(
    startDateTime,
    "minutes"
  );

  if (minutesLeft > gameConstants.maxMinutesBeforeGame) {
    return firstGame;
  }

  return findNextRawGame(firstGame);
}

export function getNextGames(
  quantity = 8,
  startDate = new Date(),
  games = []
): OncomingGame[] {
  if (games.length === quantity) {
    return games;
  }

  const lastGame = games.length > 0 ? games[games.length - 1] : null;

  const game = lastGame
    ? findNextRawGame(lastGame)
    : findFirstRawGame(startDate);

  const date = getGameCalendarDate(game, startDate);

  const oncomingGame: OncomingGame = {
    ...game,
    date,
    isoDate: DateTime.fromJSDate(date).toISODate(),
    mode: game.type.match(/EM|TL/) ? "DRAW" : "LOTTERY",
  };

  return getNextGames(quantity, date, [...games, oncomingGame]);
}
