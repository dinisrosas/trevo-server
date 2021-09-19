import { Bet, Betbook, Lottery, User } from "@prisma/client";
export declare type UserProps = User;
export declare type AuthUser = Pick<UserProps, "id" | "username">;
export declare type BetbookProps = Betbook;
export declare type BetProps = Bet;
export declare type LotteryProps = Lottery;
export declare type LotteryMode = Lottery["mode"];
export declare type LotteryType = Lottery["type"];
export declare type RawLottery = {
    type: LotteryType;
    name: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    time: {
        hour: number;
        minute: number;
    };
};
