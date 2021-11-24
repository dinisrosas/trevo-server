import { Bet } from "src/bets/entities/bet.entity";
import { PageInfo } from "src/common/entities/pagination.entity";
import { LotteryMode, LotteryType } from "src/types";
export declare class Lottery {
    id: string;
    sid: number;
    name: string;
    type: LotteryType;
    mode: LotteryMode;
    isoDate: string;
    bets?: Bet[];
    date: Date;
    result?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LotteryEdge {
    cursor: string;
    node: Lottery;
}
export declare class LotteryConnection {
    edges: LotteryEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}
