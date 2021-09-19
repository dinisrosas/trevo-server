import { LotteryMode, LotteryType } from ".prisma/client";
export declare type GetBetAward = {
    type: LotteryType;
    mode: LotteryMode;
    target: number;
    pick: string;
    upDown?: boolean;
    result: string;
};
export declare type GetLotteryAward = Omit<GetBetAward, "upDown" | "mode">;
export declare type GetDrawnTickets = Pick<GetBetAward, "type" | "result">;
export declare function getBetAward(params: GetBetAward): number;
