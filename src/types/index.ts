import { Bet, Betbook, Game, User } from '@prisma/client';

export type UserProps = User;
export type AuthUser = Pick<UserProps, 'id' | 'username'>;

export type BetbookProps = Betbook;

export type BetProps = Bet;

export type GameProps = Game;

export enum UserRoleEnum {
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export type GameType = GameProps['type'];
export type GameMode = GameProps['mode'];

export enum GameTypeEnum {
  EM = 'EM',
  TL = 'TL',
  M1 = 'M1',
  LC = 'LC',
  LP = 'LP',
  JE = 'JE',
}

export enum GameModeEnum {
  DRAW = 'DRAW',
  LOTTERY = 'LOTTERY',
}

export type RawGame = {
  type: GameType;
  name: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  time: {
    hour: number;
    minute: number;
  };
};
