import { LotteryMode, LotteryType } from ".prisma/client";
export declare type GetBetAward = {
    type: LotteryType;
    mode: LotteryMode;
    target: number;
    pick: string;
    ball?: number;
    updown?: boolean;
    result: string;
    amount: number;
};
export declare type GetDrawAward = Omit<GetBetAward, "type" | "mode" | "amount">;
export declare type GetLotteryAward = Omit<GetBetAward, "ball" | "updown" | "mode">;
export declare type GetDrawnTickets = Pick<GetBetAward, "type" | "result">;
export declare function getBetAward(params: GetBetAward): number;
