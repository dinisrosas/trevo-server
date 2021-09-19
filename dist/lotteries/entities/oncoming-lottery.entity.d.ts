import { LotteryMode, LotteryType } from "@prisma/client";
export declare class OncomingLottery {
    id: string;
    name: string;
    type: LotteryType;
    mode: LotteryMode;
    isoDate: string;
    date: Date;
}
