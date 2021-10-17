import { LotteryMode } from ".prisma/client";
import { DateTime } from "luxon";
import rawLotteries from "src/lotteries/data/raw-lotteries";
import { LotteryType } from "src/types";

export function getLottery(type: LotteryType, isoDate: string) {
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
