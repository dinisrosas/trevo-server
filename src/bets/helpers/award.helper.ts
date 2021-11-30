import {
  Award,
  GameModeEnum,
  GameTypeEnum,
  GetBetAward,
  GetDrawAward,
  GetDrawnTickets,
  GetGameAward,
} from 'src/types';

const odd_dividers = {
  draw_updown: 12,
  lottery_updown: [5, 10, 20],
  lottery_2: [1, 5, 10], // 1 5 12 ??
  lottery_3: [1, 6, 12], // 1 5 10 ??
};

export function getBetAward(params: GetBetAward): Award {
  switch (params.mode) {
    case GameModeEnum.DRAW:
      return getDrawAward({
        target: params.target,
        pick: params.pick,
        ball: params.ball,
        updown: params.updown,
        result: params.result,
      });

    case GameModeEnum.LOTTERY:
      return getGameAward({
        type: params.type,
        target: params.target,
        pick: params.pick,
        result: params.result,
        amount: params.amount,
      });
    default:
      throw new Error('Invalid game mode');
  }
}

function getDrawnTickets({ type, result }: GetDrawnTickets): string[] {
  if (type === GameTypeEnum.M1) {
    const first = result.slice(-3);
    const second = result.substring(0, result.length - 1).slice(-3);
    const third = String(Number(first) + Number(second)).slice(-3);

    return [first, second, third];
  } else if (type === GameTypeEnum.JE) {
    const first = result.slice(-3);
    const second = result.substring(0, 3);
    const third = String(Number(first) + Number(second)).slice(-3);

    return [first, second, third];
  }

  // LC & LP
  return result
    .split(';')
    .map((ticket) => ticket.slice(-3))
    .slice(0, 3);
}

function getDrawAward(params: GetDrawAward): Award {
  const result = parseInt(params.result.split(/\s+/)[params.ball - 1]);
  const pick = parseInt(params.pick);

  if (result === pick) {
    return {
      amount: params.target,
      description: '1º Lugar',
    };
  } else if (params.updown) {
    if (pick === result - 1) {
      return {
        amount: params.target / odd_dividers.draw_updown,
        description: '1º Lugar Desce',
      };
    } else if (pick === result + 1) {
      return {
        amount: params.target / odd_dividers.draw_updown,
        description: '1º Lugar Sobe',
      };
    }
  }

  return { amount: 0 };
}

function getGameAward(params: GetGameAward): Award {
  const drawnTickets = getDrawnTickets({
    type: params.type,
    result: params.result,
  });

  if (params.pick.length === 3) {
    const index = drawnTickets.findIndex(
      (ticket: string) => ticket === params.pick,
    );

    if (index !== -1) {
      return {
        amount: params.target / odd_dividers.lottery_3[index],
        description: `${index + 1}º Lugar`,
      };
    }

    const hasLastTwoIndex = drawnTickets
      .map((ticket) => ticket.slice(-2))
      .findIndex((termination) => termination === params.pick.slice(-2));

    if (hasLastTwoIndex !== -1) {
      return {
        amount: params.amount,
        description: `${hasLastTwoIndex + 1}º Lugar Terminação`,
      };
    }
  } else if (params.pick.length === 2) {
    const index = drawnTickets.findIndex(
      (ticket) => ticket.slice(-2) === params.pick,
    );

    if (index !== -1) {
      return {
        amount: params.target / odd_dividers.lottery_2[index],
        description: `${index + 1}º Lugar`,
      };
    }

    const updown = findUpdownResult(params.pick, drawnTickets);

    if (updown) {
      return {
        amount: params.target / odd_dividers.lottery_updown[updown.index],
        description: `${updown.index + 1}º Lugar ${
          updown.variation > 0 ? 'Sobe' : 'Desce'
        }`,
      };
    }
  }

  return { amount: 0 };
}

function findUpdownResult(
  pick: string,
  tickets: string[],
  digits = 2,
): { index: number; variation: number } {
  const variations = [-1, 1];

  const array = variations.map((variation) => ({
    variation,
    index: tickets.findIndex(
      (ticket) => Number(ticket.slice(-digits)) + variation === Number(pick),
    ),
  }));

  return array.find((data) => data.index !== -1);
}
