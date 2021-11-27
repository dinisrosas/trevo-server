import {
  GameModeEnum,
  GameTypeEnum,
  GetBetAward,
  GetDrawAward,
  GetDrawnTickets,
  GetGameAward,
} from 'src/types';

const odd_dividers = {
  draw_updown: 12,
  game_updown: [5, 10, 20],
  game_2: [1, 6, 12],
  game_3: [1, 6, 12],
};

export function getBetAward(params: GetBetAward): number {
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

function getDrawAward(params: GetDrawAward): number {
  const ball = parseInt(params.result.split(/\s+/)[params.ball - 1]);
  const pick = parseInt(params.pick);

  if (ball === pick) {
    return params.target;
  } else if (params.updown) {
    const match = ball === pick - 1 || ball === pick + 1;
    if (match) {
      return params.target / odd_dividers.draw_updown;
    }
  }

  return 0;
}

function getGameAward(params: GetGameAward): number {
  const drawnTickets = getDrawnTickets({
    type: params.type,
    result: params.result,
  });

  if (params.pick.length === 3) {
    const index = drawnTickets.findIndex(
      (ticket: string) => ticket === params.pick,
    );

    if (index !== -1) {
      return params.target / odd_dividers.game_3[index];
    }

    const hasLastTwo = drawnTickets
      .map((ticket) => ticket.slice(-2))
      .some((termination) => termination === params.pick.slice(-2));

    if (hasLastTwo) {
      return params.amount;
    }
  } else if (params.pick.length === 2) {
    const index = drawnTickets.findIndex(
      (ticket) => ticket.slice(-2) === params.pick,
    );

    if (index !== -1) {
      return params.target / odd_dividers.game_2[index];
    }

    const updownIndex = drawnTickets.findIndex(
      (ticket) =>
        Number(ticket.slice(-2)) === Number(params.pick) - 1 ||
        Number(ticket.slice(-2)) === Number(params.pick) + 1,
    );

    if (updownIndex !== -1) {
      return params.amount * odd_dividers.game_updown[updownIndex];
    }
  }

  return 0;
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
