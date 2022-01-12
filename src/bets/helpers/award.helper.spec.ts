import { GameModeEnum, GameTypeEnum } from 'src/types';
import { getBetAward } from './award.helper';

describe('game award EM', () => {
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
      result: '1 2 3 4 5 + 1 12',
      target: 30,
      type: GameTypeEnum.EM,
      ball: 5,
      updown: true,
    });

    expect(award.amount).toBe(2.5);
    expect(award.description).toBe('1º Lugar Sobe');
  });
});

describe('game award TL', () => {
  it('should get no award and description', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.DRAW,
      pick: '6',
      result: '1 2 3 4 5 + 1',
      target: 500,
      type: GameTypeEnum.TL,
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
      result: '2 3 4 5 6 + 1',
      target: 30,
      type: GameTypeEnum.TL,
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
      result: '1 2 3 4 5 + 1',
      target: 30,
      type: GameTypeEnum.TL,
      ball: 5,
      updown: true,
    });

    expect(award.amount).toBe(2.5);
    expect(award.description).toBe('1º Lugar Sobe');
  });
});

describe('game award LC', () => {
  it('should get correct award (1st place down)', () => {
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

  it('should get correct award (2nd place)', () => {
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

  it('should get correct award (2nd place up)', () => {
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

describe('game award LP', () => {
  it('should get correct award (1st place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '81',
      result: '66982;23811;22974;89767',
      target: 40,
      type: GameTypeEnum.LP,
    });

    expect(award.amount).toBe(8);
    expect(award.description).toBe('1º Lugar Desce');
  });

  it('should get correct award (2nd place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '01',
      result: '66982;23801;22974;89767',
      target: 40,
      type: GameTypeEnum.LP,
    });

    expect(award.amount).toBe(8);
    expect(award.description).toBe('2º Lugar');
  });

  it('should get correct award (2nd place up)', () => {
    const award = getBetAward({
      amount: 1.25,
      mode: GameModeEnum.LOTTERY,
      pick: '02',
      result: '66982;23801;22974;89767',
      target: 50,
      type: GameTypeEnum.LP,
    });

    expect(award.amount).toBe(5);
    expect(award.description).toBe('2º Lugar Sobe');
  });
});

describe('game award M1', () => {
  it('should get correct award (1st place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '875',
      result: 'DSM28875',
      target: 500,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(500);
    expect(award.description).toBe('1º Lugar');
  });

  it('should get correct award (1st place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '74',
      result: 'DSM28875',
      target: 40,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(40 / 5);
    expect(award.description).toBe('1º Lugar Desce');
  });

  it('should get correct award (1st place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '76',
      result: 'DSM28875',
      target: 40,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(40 / 5);
    expect(award.description).toBe('1º Lugar Sobe');
  });

  it('should get correct award (2nd place)', () => {
    const award = getBetAward({
      amount: 2,
      mode: GameModeEnum.LOTTERY,
      pick: '887',
      result: 'DSM28875',
      target: 1000,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(1000 / 6);
    expect(award.description).toBe('2º Lugar');
  });

  it('should get correct award (3rd place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '762', // 1762
      result: 'DSM28875',
      target: 500,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(500 / 12);
    expect(award.description).toBe('3º Lugar');
  });

  it('should get correct award (3rd place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '61', // 1762
      result: 'DSM28875',
      target: 40,
      type: GameTypeEnum.M1,
    });

    expect(award.amount).toBe(40 / 20);
    expect(award.description).toBe('3º Lugar Desce');
  });
});

describe('game award JE', () => {
  it('should get correct award (1st place)', () => {
    const award = getBetAward({
      amount: 2,
      mode: GameModeEnum.LOTTERY,
      pick: '567',
      result: '1234567',
      target: 1000,
      type: GameTypeEnum.JE,
    });

    expect(award.amount).toBe(1000);
    expect(award.description).toBe('1º Lugar');
  });

  it('should get correct award (2nd place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '123',
      result: '1234567',
      target: 500,
      type: GameTypeEnum.JE,
    });

    expect(award.amount).toBe(500 / 6);
    expect(award.description).toBe('2º Lugar');
  });

  it('should get correct award (3rd place)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '690',
      result: '1234567',
      target: 500,
      type: GameTypeEnum.JE,
    });

    expect(award.amount).toBe(500 / 12);
    expect(award.description).toBe('3º Lugar');
  });

  it('should get correct award (3rd place down)', () => {
    const award = getBetAward({
      amount: 1,
      mode: GameModeEnum.LOTTERY,
      pick: '89',
      result: '1234567',
      target: 500,
      type: GameTypeEnum.JE,
    });

    expect(award.amount).toBe(500 / 20);
    expect(award.description).toBe('3º Lugar Desce');
  });
});
