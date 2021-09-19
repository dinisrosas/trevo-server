import { LotteryMode } from ".prisma/client";
declare type CalculateBetAmount = {
    mode: LotteryMode;
    pick: string;
    target: number;
    upDown?: boolean;
};
export declare function getBetAmount({ mode, pick, target, upDown, }: CalculateBetAmount): number;
export {};
