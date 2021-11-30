import { GameModeEnum, GameTypeEnum } from 'src/types';
import { getBetAward } from './award.helper';

describe('game award', () => {
  it('should get no award and description', () => {
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

  it('should get award and description (updown)', () => {
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
    expect(award.description).toBe('1º Lugar Desce');
  });

  it('should get award and description (updown)', () => {
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
    expect(award.description).toBe('1º Lugar Sobe');
  });

  it('should get correct award for LC (1st place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '81',
      result: '66982;23811;22974',
      target: 40,
      type: GameTypeEnum.LC,
    });

    expect(award.amount).toBe(8);
    expect(award.description).toBe('1º Lugar Desce');
  });

  it('should get correct award for LC (2nd place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '11',
      result: '66982;23811;22974',
      target: 40,
      type: GameTypeEnum.LC,
    });

    expect(award.amount).toBe(8);
    expect(award.description).toBe('2º Lugar');
  });

  it('should get correct award for LC (2nd place up)', () => {
    const award = getBetAward({
      amount: 1.25,
      mode: GameModeEnum.LOTTERY,
      pick: '12',
      result: '66982;23811;22974',
      target: 50,
      type: GameTypeEnum.LC,
    });

    expect(award.amount).toBe(5);
    expect(award.description).toBe('2º Lugar Sobe');
  });
});
