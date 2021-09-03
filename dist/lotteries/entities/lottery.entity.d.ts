import { LotteryType } from "@prisma/client";
export declare class Lottery {
    id: number;
    name: string;
    type: LotteryType;
    iso_date: string;
    date: Date;
    created_at: Date;
    updated_at: Date;
}
