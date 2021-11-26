import { GameMode } from ".prisma/client";
import * as bcrypt from "bcrypt";
import { DateTime } from "luxon";
import rawGames from "src/games/data/raw-games";
import { Game } from "src/games/entities/game.entity";
import { GameType } from "src/types";

export function getGame(
  type: GameType,
  isoDate: string
): Pick<Game, "type" | "name" | "mode" | "isoDate"> & { date: DateTime } {
  const raw = rawGames.find((game) => game.type === type);

  if (!raw) {
    return null;
  }

  const date = DateTime.fromISO(isoDate)
    .startOf("day")
    .set({ ...raw.time });

  if (date.weekday !== raw.day) {
    return null;
  }

  const mode: GameMode = /(EM|TL)/.test(type) ? "DRAW" : "LOTTERY";

  return {
    type: raw.type,
    name: raw.name,
    mode,
    date,
    isoDate,
  };
}

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePasswords(
  password: string,
  encryptedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
