import { LotteryType } from ".prisma/client";
export declare function getLatestLotteryResult(type: LotteryType): Promise<{
    result: string;
    isoDate: string;
}>;
export declare function getResultAndDate(type: LotteryType): Promise<{
    result: string;
    date: string;
}>;
