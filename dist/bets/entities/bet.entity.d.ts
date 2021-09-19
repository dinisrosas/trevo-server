import { Betbook } from "src/betbooks/entities/betbook.entity";
import { Lottery } from "src/lotteries/entities/lottery.entity";
export declare class Bet {
    id: string;
    sid: number;
    target: number;
    pick: string;
    amount: number;
    award?: number;
    lottery?: Lottery;
    betbook?: Betbook;
    upDown?: boolean;
    updatedAt: Date;
    createdAt: Date;
}
