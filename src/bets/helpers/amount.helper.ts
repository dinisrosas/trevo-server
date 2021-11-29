import { GameMode, GameModeEnum } from 'src/types';

type CalculateBetAmount = {
  mode: GameMode;
  pick: string;
  target: number;
  updown?: boolean;
};

const ODDS = {
  DRAW: [35, 30],
  LOTTERY: [500, 40],
};

export function getBetAmount({
  mode,
  pick,
  target,
  updown,
}: CalculateBetAmount): number {
  switch (mode) {
    case GameModeEnum.DRAW:
      if (updown) {
        return target / ODDS[mode][1];
      } else {
        return target / ODDS[mode][0];
      }

    case GameModeEnum.LOTTERY:
      if (pick.length === 2) {
        return target / ODDS[mode][1];
      } else if (pick.length === 3) {
        return target / ODDS[mode][0];
      }

      throw new Error('Invalid bet pick');

    default:
      throw new Error('Invalid game mode');
  }
}
