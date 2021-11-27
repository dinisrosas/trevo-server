import { Bet } from 'src/bets/entities/bet.entity';
import { User } from 'src/users/entities/user.entity';
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
declare const BetbookConnection_base: import("@nestjs/common").Type<import("src/common/generics/pagination.entity").IConnectionType<Betbook>>;
export declare class BetbookConnection extends BetbookConnection_base {
}
export {};
