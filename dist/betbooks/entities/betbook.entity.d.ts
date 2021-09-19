import { Bet } from "src/bets/entities/bet.entity";
import { User } from "src/users/entities/user.entity";
export declare class Betbook {
    id: string;
    sid: number;
    bettor: string;
    seller?: User;
    bets?: Bet[];
    totalAmount: number;
    updatedAt: Date;
    createdAt: Date;
}
