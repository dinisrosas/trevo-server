import { GameModeEnum, GameTypeEnum, GetBetAward } from 'src/types';
import { getBetAmount } from './amount.helper';
import { getBetAward } from './award.helper';

function getLegacyBetAward(params: Omit<GetBetAward, 'isoDate'>) {
  return getBetAward({ ...params, isoDate: '2026-11-16' });
}

describe('game award EM', () => {
  it('should get no award and description', () => {
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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
    const award = getLegacyBetAward({
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

describe('prize schedule from 17 November 2026', () => {
  const lottery = {
    isoDate: '2026-11-17',
    mode: GameModeEnum.LOTTERY,
    type: GameTypeEnum.LC,
    result: '66982;23811;22974',
  };

  it.each([
    [0.5, 250, 40, 20],
    [1, 500, 80, 40],
    [1.5, 750, 120, 60],
    [2, 1000, 160, 80],
    [2.5, 1250, 200, 100],
    [3, 1500, 240, 120],
    [5, 2500, 400, 200],
  ])(
    'settles three-digit prizes for a %s stake',
    (amount, target, second, third) => {
      expect(getBetAmount({ ...lottery, pick: '982', target })).toBe(amount);
      const awards = ['982', '811', '974'].map((pick) =>
        getBetAward({ ...lottery, pick, amount, target }),
      );
      expect(awards.map((award) => award.amount)).toEqual([
        target,
        second,
        third,
      ]);
    },
  );

  it('pays the stake for a three-digit ending match', () => {
    expect(
      getBetAward({ ...lottery, amount: 0.5, target: 250, pick: '182' }),
    ).toEqual({ amount: 0.5, description: '1º Lugar Terminação' });
  });

  it.each([
    [0.5, 20, 4, 2],
    [1, 40, 8, 4],
    [1.25, 50, 10, 5],
    [1.5, 60, 12, 6],
    [2, 80, 16, 8],
    [2.5, 100, 20, 10],
    [3, 120, 24, 12],
    [5, 200, 40, 20],
    [10, 400, 80, 40],
  ])(
    'settles two-digit prizes for a %s stake',
    (amount, target, second, third) => {
      expect(getBetAmount({ ...lottery, pick: '82', target })).toBe(amount);
      const awards = ['82', '11', '74'].map((pick) =>
        getBetAward({ ...lottery, pick, amount, target }),
      );
      expect(awards.map((award) => award.amount)).toEqual([
        target,
        second,
        third,
      ]);
    },
  );

  it.each([
    ['81', 10, '1º Lugar Desce'],
    ['83', 10, '1º Lugar Sobe'],
    ['12', 0, undefined],
    ['73', 0, undefined],
  ])(
    'settles two-digit approximation for pick %s',
    (pick, amount, description) => {
      expect(
        getBetAward({ ...lottery, pick, amount: 1.25, target: 50 }),
      ).toEqual({ amount, description });
    },
  );

  it('prefers an exact match over first-place approximation', () => {
    expect(
      getBetAward({
        ...lottery,
        result: '66982;23881;22974',
        pick: '81',
        amount: 1.25,
        target: 50,
      }),
    ).toEqual({ amount: 10, description: '2º Lugar' });
  });

  const draw = {
    isoDate: '2026-11-17',
    mode: GameModeEnum.DRAW,
    type: GameTypeEnum.EM,
    result: '2 3 4 5 6 + 1 2',
    ball: 1,
  };

  it.each([
    [true, 1, 25, 2.5],
    [true, 2, 50, 5],
    [true, 3, 75, 7.5],
    [false, 0.5, 15, 0],
    [false, 1, 30, 0],
    [false, 1.5, 45, 0],
    [false, 2, 60, 0],
    [false, 2.5, 75, 0],
  ])(
    'settles ball prizes with approximation %s and a %s stake',
    (updown, amount, target, approx) => {
      expect(getBetAmount({ ...draw, pick: '02', target, updown })).toBe(
        amount,
      );
      const bet = { ...draw, amount, target, updown };
      expect(getBetAward({ ...bet, pick: '02' }).amount).toBe(target);
      expect(getBetAward({ ...bet, pick: '01' }).amount).toBe(approx);
      expect(getBetAward({ ...bet, pick: '03' }).amount).toBe(approx);
    },
  );

  it('uses the original ball prices for draws before the cutoff', () => {
    const bet = { ...draw, isoDate: '2026-11-16', pick: '02' };
    expect(getBetAmount({ ...bet, target: 30, updown: true })).toBe(1);
    expect(getBetAmount({ ...bet, target: 35, updown: false })).toBe(1);
  });

  it('honors the quoted prize and stake of an already issued ball bet', () => {
    const bet = { ...draw, amount: 1, target: 30, updown: true };
    expect(getBetAward({ ...bet, pick: '02' }).amount).toBe(30);
    expect(getBetAward({ ...bet, pick: '03' }).amount).toBe(2.5);
  });
});
