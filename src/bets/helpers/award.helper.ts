import { LotteryMode, LotteryType } from ".prisma/client";

export type GetBetAward = {
  type: LotteryType;
  mode: LotteryMode;
  target: number;
  pick: string;
  upDown?: boolean;
  result: string;
};

export type GetLotteryAward = Omit<GetBetAward, "upDown" | "mode">;
export type GetDrawnTickets = Pick<GetBetAward, "type" | "result">;

const ODDS = {
  DRAW: [40, 8, 4],
  LOTTERY: [500, 100, 50],
  DRAW_UP_DOWN: [30, 2.5],
};

export function getBetAward(params: GetBetAward): number {
  const { type, mode, target, pick, upDown, result } = params;

  switch (mode) {
    case "DRAW":
      return getDrawAward({ target, pick, upDown, result });
    case "LOTTERY":
      return getLotteryAward({ type, target, pick, result });
    default:
      throw new Error("Invalid lottery mode");
  }
}

function getDrawAward(params: any) {
  const { target, pick, upDown, result } = params;

  // ball 5
  const ball = parseInt(result.split(/\s+/)[4]);
  const ballPick = parseInt(pick);

  if (ball === ballPick) {
    return target;
  } else if (upDown) {
    const match = ball === ballPick - 1 || ball === ballPick + 1;
    if (match) {
      return (target / ODDS.DRAW_UP_DOWN[0]) * ODDS.DRAW_UP_DOWN[1];
    }
  }

  return 0;
}

function getLotteryAward(params: GetLotteryAward) {
  const { type, target, pick, result } = params;

  const drawnTickets = getDrawnTickets({ type, result });

  if (pick.length === 3) {
    const index = drawnTickets.findIndex((ticket: string) => ticket === pick);

    if (index !== -1) {
      return (target / ODDS.LOTTERY[0]) * ODDS.LOTTERY[index];
    }

    const hasLastTwo = drawnTickets[0].slice(-2) === pick.slice(-2);

    if (hasLastTwo) {
      return target / ODDS.LOTTERY[0];
    }
  } else if (pick.length === 2) {
    const index = drawnTickets.findIndex(
      (ticket: string) => ticket.slice(-2) === pick
    );

    if (index !== -1) {
      return (target / ODDS.DRAW[0]) * ODDS.DRAW[index];
    }
  }

  return 0;
}

function getDrawnTickets({ type, result }: GetDrawnTickets) {
  if (type === "M1") {
    const first = result.slice(-3);
    const second = result.substring(0, result.length - 1).slice(-3);
    const third = String(Number(first) + Number(second)).slice(-3);

    return [first, second, third];
  } else if (type === "JE") {
    const first = result.slice(-3);
    const second = result.substring(0, 3);
    const third = String(Number(first) + Number(second)).slice(-3);

    return [first, second, third];
  }

  // LC & LP
  return result
    .split(";")
    .map((ticket) => ticket.slice(-3))
    .slice(0, 3);
}
