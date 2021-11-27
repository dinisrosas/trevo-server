import * as bcrypt from 'bcrypt';
import { DateTime } from 'luxon';
import rawGames from 'src/games/data/raw-games';
import { Game } from 'src/games/entities/game.entity';
import { GameMode, GameModeEnum, GameType } from 'src/types';

export function getGameMode(type: GameType): GameMode {
  return /(EM|TL)/.test(type) ? GameModeEnum.DRAW : GameModeEnum.LOTTERY;
}

export function getGameFromRawData(
  type: GameType,
  isoDate: string,
): Pick<Game, 'type' | 'name' | 'mode' | 'isoDate' | 'date'> {
  const game = rawGames.find((game) => game.type === type);
  if (!game) return null;

  const date = DateTime.fromISO(isoDate)
    .startOf('day')
    .set({ ...game.time });

  const weekdayMatch = rawGames.some((game) => game.day === date.weekday);
  if (!weekdayMatch) return null;

  const mode: GameMode = getGameMode(type);

  return {
    mode,
    isoDate,
    type: game.type,
    name: game.name,
    date: date.toJSDate(),
  };
}

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePasswords(
  password: string,
  encryptedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
