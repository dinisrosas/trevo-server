import { Bet, Betbook, Game, User } from '@prisma/client';

export type UserProps = User;
export type AuthUser = Pick<UserProps, 'id' | 'username' | 'roles'>;

export type BetbookProps = Betbook;

export type BetProps = Bet;

export type GameProps = Game;

export type UserRoles = User['roles'];

export enum UserRoleEnum {
  Seller = 'SELLER',
  Admin = 'ADMIN',
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

export type FormattedGraphQLError = {
  message: string;
  code: string;
  name: string;
  status: number;
};

export type GetBetAward = {
  type: GameType;
  mode: GameMode;
  target: number;
  pick: string;
  ball?: number;
  updown?: boolean;
  result: string;
  amount: number;
};

export type GetDrawAward = Omit<GetBetAward, 'type' | 'mode' | 'amount'>;
export type GetGameAward = Omit<GetBetAward, 'ball' | 'updown' | 'mode'>;
export type GetDrawnTickets = Pick<GetBetAward, 'type' | 'result'>;

export type Award = {
  description?: string;
  amount: number;
};
