import { LotteryType } from "@prisma/client";

export type RawLottery = {
  type: LotteryType;
  name: string;
  day: 1 | 2 | 3 | 4 | 5 | 6;
  time: {
    hour: number;
    minute: number;
  };
};

const lotteries: RawLottery[] = [
  {
    type: "LC",
    name: "Lotaria Clássica",
    day: 1,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "EM",
    name: "Euromilhões",
    day: 2,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "TL",
    name: "Totoloto",
    day: 3,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "LP",
    name: "Lotaria Popular",
    day: 4,
    time: {
      hour: 12,
      minute: 30,
    },
  },
  {
    type: "M1",
    name: "M1lhão",
    day: 5,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "EM",
    name: "Euromilhões",
    day: 5,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "TL",
    name: "Totoloto",
    day: 6,
    time: {
      hour: 20,
      minute: 0,
    },
  },
  {
    type: "JE",
    name: "Joker Espanhol",
    day: 6,
    time: {
      hour: 20,
      minute: 0,
    },
  },
];

export default lotteries;
