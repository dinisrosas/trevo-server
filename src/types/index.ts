import { Bet, Betbook, Lottery, User } from "@prisma/client";

export type UserProps = User;
export type AuthUser = Pick<UserProps, "id" | "username">;

export type BetbookProps = Betbook;

export type BetProps = Bet;

export type LotteryProps = Lottery;

export enum UserRoleEnum {
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

export type LotteryType = LotteryProps["type"];
export type LotteryMode = LotteryProps["mode"];

export enum LotteryTypeEnum {
  EM = "EM",
  TL = "TL",
  M1 = "M1",
  LC = "LC",
  LP = "LP",
  JE = "JE",
}

export enum LotteryModeEnum {
  DRAW = "DRAW",
  LOTTERY = "LOTTERY",
}

export type RawLottery = {
  type: LotteryType;
  name: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  time: {
    hour: number;
    minute: number;
  };
};
