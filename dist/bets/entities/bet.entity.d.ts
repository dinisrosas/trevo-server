import { Betbook } from 'src/betbooks/entities/betbook.entity';
import { Game } from 'src/games/entities/game.entity';
export declare class Bet {
    id: string;
    sid: number;
    target: number;
    pick: string;
    amount: number;
    award?: number;
    game?: Game;
    betbook?: Betbook;
    updown?: boolean;
    ball?: number;
    updatedAt: Date;
    createdAt: Date;
}
