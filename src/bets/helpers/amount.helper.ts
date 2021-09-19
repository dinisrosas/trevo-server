import { LotteryMode } from ".prisma/client";

type CalculateBetAmount = {
  mode: LotteryMode;
  pick: string;
  target: number;
  upDown?: boolean;
};

const ODDS = {
  DRAW: [35, 30],
  LOTTERY: [500, 40],
};

export function getBetAmount({
  mode,
  pick,
  target,
  upDown,
}: CalculateBetAmount): number {
  switch (mode) {
    case "DRAW":
      if (upDown) {
        return target / ODDS[mode][1];
      } else {
        return target / ODDS[mode][0];
      }

    case "LOTTERY":
      if (pick.length === 2) {
        return target / ODDS[mode][1];
      } else if (pick.length === 3) {
        return target / ODDS[mode][0];
      }

      throw new Error("Invalid bet pick");

    default:
      throw new Error("Invalid lottery mode");
  }
}
