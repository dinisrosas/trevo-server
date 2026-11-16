import { GameMode, GameModeEnum } from 'src/types';
import { AWARD_CHANGE_DATE } from '../constants';

type CalculateBetAmount = {
  mode: GameMode;
  pick: string;
  target: number;
  isoDate: string;
  updown?: boolean;
};

const LOTTERY_ODDS = [500, 40];

export function getBetAmount({
  mode,
  pick,
  target,
  isoDate,
  updown,
}: CalculateBetAmount): number {
  switch (mode) {
    case GameModeEnum.DRAW: {
      const [exact, withApproximation] =
        isoDate >= AWARD_CHANGE_DATE ? [30, 25] : [35, 30];
      return target / (updown ? withApproximation : exact);
    }

    case GameModeEnum.LOTTERY:
      if (pick.length === 2) {
        return target / LOTTERY_ODDS[1];
      } else if (pick.length === 3) {
        return target / LOTTERY_ODDS[0];
      }

      throw new Error('Invalid bet pick');

    default:
      throw new Error('Invalid game mode');
  }
}
