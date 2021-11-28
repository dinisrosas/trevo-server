import { GameModeEnum, GameTypeEnum } from 'src/types';
import { getBetAward } from './award.helper';

describe('game award', () => {
  it('should return no award and description', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.DRAW,
      pick: '6',
      result: '1 2 3 4 5 + 1 2',
      target: 500,
      type: GameTypeEnum.EM,
      ball: 5,
      updown: false,
    });

    expect(award.amount).toBe(0);
    expect(award.description).toBeUndefined();
  });

  it('should return award and description (updown)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.DRAW,
      pick: '6',
      result: '1 2 3 4 5 + 1 2',
      target: 30,
      type: GameTypeEnum.EM,
      ball: 5,
      updown: true,
    });

    expect(award.amount).toBe(2.5);
    expect(award.description).toBe('1º Lugar Desce');
  });

  it('should return award and description (updown)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.DRAW,
      pick: '1',
      result: '2 3 4 5 6 + 1 2',
      target: 30,
      type: GameTypeEnum.EM,
      ball: 1,
      updown: true,
    });

    expect(award.amount).toBe(2.5);
    expect(award.description).toBe('1º Lugar Sobe');
  });
});
