import { Bet } from "src/bets/entities/bet.entity";
import { PageInfo } from "src/common/entities/pagination.entity";
import { User } from "src/users/entities/user.entity";
export declare class Betbook {
    id: string;
    sid: number;
    bettor: string;
    fixed: boolean;
    seller?: User;
    bets?: Bet[];
    updatedAt: Date;
    createdAt: Date;
}
export declare class BetbookEdge {
    cursor: string;
    node: Betbook;
}
export declare class BetbookConnection {
    edges: BetbookEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}
