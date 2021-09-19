"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextLotteries = void 0;
const luxon_1 = require("luxon");
const raw_lotteries_1 = require("../data/raw-lotteries");
function getLotteryCalendarDate(lottery, startDate) {
    const previousLotteryDateTime = luxon_1.DateTime.fromJSDate(startDate)
        .set(lottery.time)
        .startOf("minute");
    const daysDiff = lottery.day - previousLotteryDateTime.weekday;
    const daysOffset = daysDiff >= 0
        ? daysDiff
        : 7 - previousLotteryDateTime.weekday + lottery.day;
    return previousLotteryDateTime.plus({ days: daysOffset }).toJSDate();
}
function getLotteryId(lottery) {
    return `${lottery.day}${lottery.type}`;
}
function findNextRawLottery(prevLottery) {
    const nextLottery = raw_lotteries_1.default.find((lottery) => getLotteryId(lottery) > getLotteryId(prevLottery));
    return nextLottery ? nextLottery : raw_lotteries_1.default[0];
}
function findFirstRawLottery(startDate) {
    const startDateTime = luxon_1.DateTime.fromJSDate(startDate);
    const dayOfWeek = startDateTime.weekday;
    if (dayOfWeek === 7) {
        return raw_lotteries_1.default[0];
    }
    const firstLottery = raw_lotteries_1.default.find((lottery) => lottery.day === dayOfWeek);
    const firstLotteryDateTime = startDateTime
        .set(firstLottery.time)
        .startOf("minute");
    const { minutes: minutesLeft } = firstLotteryDateTime.diff(startDateTime, "minutes");
    if (minutesLeft > 50) {
        return firstLottery;
    }
    return findNextRawLottery(firstLottery);
}
function getNextLotteries(quantity = 8, startDate = new Date(), lotteries = []) {
    if (lotteries.length === quantity) {
        return lotteries;
    }
    const lastLottery = lotteries.length > 0 ? lotteries[lotteries.length - 1] : null;
    const lottery = lastLottery
        ? findNextRawLottery(lastLottery)
        : findFirstRawLottery(startDate);
    const date = getLotteryCalendarDate(lottery, startDate);
    const oncomingLottery = Object.assign(Object.assign({}, lottery), { date, id: getLotteryId(lottery), isoDate: luxon_1.DateTime.fromJSDate(date).toISODate(), mode: lottery.type.match(/EM|TL/) ? "DRAW" : "LOTTERY" });
    return getNextLotteries(quantity, date, [...lotteries, oncomingLottery]);
}
exports.getNextLotteries = getNextLotteries;
//# sourceMappingURL=oncoming.helper.js.map