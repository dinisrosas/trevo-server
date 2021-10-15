import { Bet, Betbook, Lottery, User } from "@prisma/client";
export declare type UserProps = User;
export declare type AuthUser = Pick<UserProps, "id" | "username">;
export declare type BetbookProps = Betbook;
export declare type BetProps = Bet;
export declare type LotteryProps = Lottery;
export declare enum UserRoleEnum {
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
export declare type LotteryType = LotteryProps["type"];
export declare type LotteryMode = LotteryProps["mode"];
export declare enum LotteryTypeEnum {
    EM = "EM",
    TL = "TL",
    M1 = "M1",
    LC = "LC",
    LP = "LP",
    JE = "JE"
}
export declare enum LotteryModeEnum {
    DRAW = "DRAW",
    LOTTERY = "LOTTERY"
}
export declare type RawLottery = {
    type: LotteryType;
    name: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    time: {
        hour: number;
        minute: number;
    };
};
