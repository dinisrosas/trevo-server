import { Bet, Betbook, Lottery, User } from "@prisma/client";

export type UserProps = User;
export type AuthUser = Pick<UserProps, "id" | "username">;

export type BetbookProps = Betbook;

export type BetProps = Bet;

export type LotteryProps = Lottery;
export type LotteryMode = Lottery["mode"];
export type LotteryType = Lottery["type"];

export type RawLottery = {
  type: LotteryType;
  name: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  time: {
    hour: number;
    minute: number;
  };
};
