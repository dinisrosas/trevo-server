import { DateTime } from "luxon";
import rawLotteries from "../data/raw-lotteries";
import { OncomingLottery } from "../entities/oncoming-lottery.entity";

function getLotteryCalendarDate(lottery, startDate) {
  const previousLotteryDateTime = DateTime.fromJSDate(startDate)
    .set(lottery.time)
    .startOf("minute");

  const daysDiff = lottery.day - previousLotteryDateTime.weekday;

  // check if week changed
  const daysOffset =
    daysDiff >= 0
      ? daysDiff
      : 7 - previousLotteryDateTime.weekday + lottery.day;

  return previousLotteryDateTime.plus({ days: daysOffset }).toJSDate();
}

function getLotteryId(lottery) {
  return `${lottery.day}${lottery.type}`;
}

function findNextRawLottery(prevLottery) {
  const nextLottery = rawLotteries.find(
    (lottery) => getLotteryId(lottery) > getLotteryId(prevLottery)
  );
  return nextLottery ? nextLottery : rawLotteries[0];
}

function findFirstRawLottery(startDate) {
  const startDateTime = DateTime.fromJSDate(startDate);
  const dayOfWeek = startDateTime.weekday;

  // is sunday
  if (dayOfWeek === 7) {
    // return monday (weekday 0)
    return rawLotteries[0];
  }

  const firstLottery = rawLotteries.find(
    (lottery) => lottery.day === dayOfWeek
  );

  const firstLotteryDateTime = startDateTime
    .set(firstLottery.time)
    .startOf("minute");

  const { minutes: minutesLeft } = firstLotteryDateTime.diff(
    startDateTime,
    "minutes"
  );

  if (minutesLeft > 50) {
    return firstLottery;
  }

  return findNextRawLottery(firstLottery);
}

export function getNextLotteries(
  quantity = 8,
  startDate = new Date(),
  lotteries = []
): OncomingLottery[] {
  if (lotteries.length === quantity) {
    return lotteries;
  }

  const lastLottery =
    lotteries.length > 0 ? lotteries[lotteries.length - 1] : null;

  const lottery = lastLottery
    ? findNextRawLottery(lastLottery)
    : findFirstRawLottery(startDate);

  const date = getLotteryCalendarDate(lottery, startDate);

  const oncomingLottery: OncomingLottery = {
    ...lottery,
    date,
    id: getLotteryId(lottery),
    isoDate: DateTime.fromJSDate(date).toISODate(),
    mode: lottery.type.match(/EM|TL/) ? "DRAW" : "LOTTERY",
  };

  return getNextLotteries(quantity, date, [...lotteries, oncomingLottery]);
}
