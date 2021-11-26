import { LotteryMode } from ".prisma/client";
import * as bcrypt from "bcrypt";
import { DateTime } from "luxon";
import rawLotteries from "src/lotteries/data/raw-lotteries";
import { Lottery } from "src/lotteries/entities/lottery.entity";
import { LotteryType } from "src/types";

export function getLottery(
  type: LotteryType,
  isoDate: string
): Pick<Lottery, "type" | "name" | "mode" | "isoDate"> & { date: DateTime } {
  const raw = rawLotteries.find((lottery) => lottery.type === type);

  if (!raw) {
    return null;
  }

  const date = DateTime.fromISO(isoDate)
    .startOf("day")
    .set({ ...raw.time });

  if (date.weekday !== raw.day) {
    return null;
  }

  const mode: LotteryMode = /(EM|TL)/.test(type) ? "DRAW" : "LOTTERY";

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
