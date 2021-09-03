import { LotteryType } from "@prisma/client";
export declare type RawLottery = {
    type: LotteryType;
    name: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    time: {
        hour: number;
        minute: number;
    };
};
declare const lotteries: RawLottery[];
export default lotteries;
