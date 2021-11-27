import { Bet, Betbook, Game, User } from '@prisma/client';
export declare type UserProps = User;
export declare type AuthUser = Pick<UserProps, 'id' | 'username'>;
export declare type BetbookProps = Betbook;
export declare type BetProps = Bet;
export declare type GameProps = Game;
export declare enum UserRoleEnum {
    SELLER = "SELLER",
    ADMIN = "ADMIN"
}
export declare type GameType = GameProps['type'];
export declare type GameMode = GameProps['mode'];
export declare enum GameTypeEnum {
    EM = "EM",
    TL = "TL",
    M1 = "M1",
    LC = "LC",
    LP = "LP",
    JE = "JE"
}
export declare enum GameModeEnum {
    DRAW = "DRAW",
    LOTTERY = "LOTTERY"
}
export declare type RawGame = {
    type: GameType;
    name: string;
    day: 1 | 2 | 3 | 4 | 5 | 6;
    time: {
        hour: number;
        minute: number;
    };
};
