"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultAndDate = exports.getLatestLotteryResult = void 0;
const got_1 = require("got");
const cheerio_1 = require("cheerio");
const luxon_1 = require("luxon");
const DATE_REGEX = /(\d{1,2})[/](\d{1,2})[/](\d{4})/;
async function getLatestLotteryResult(type) {
    const { result, date } = await getResultAndDate(type);
    const index = date.search(DATE_REGEX);
    const localIsoDate = date.substring(index);
    const isoDate = luxon_1.DateTime.fromFormat(localIsoDate, "dd/MM/yyyy").toISODate();
    return { result, isoDate };
}
exports.getLatestLotteryResult = getLatestLotteryResult;
async function getResultAndDate(type) {
    const url_prefix = `https://www.jogossantacasa.pt/web/SCCartazResult`;
    if (/(EM|TL)/.test(type)) {
        const url = `${url_prefix}/${type === "EM" ? "euroMilhoes" : "totolotoNew"}`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        const result = $(".betMiddle.twocol.regPad").find("ul li").last().text();
        const date = $("span.dataInfo").text();
        return { result, date };
    }
    else if (/(LC|LP)/.test(type)) {
        const url = `${url_prefix}/${type === "LC" ? "lotClass" : "lotPop"}`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        const results = $(".stripped.betMiddle.fourcol.regPad")
            .find("ul.colums")
            .toArray()
            .map((el) => $(el).find("li").eq(1).text());
        const result = results.join(";");
        const date = $("span.dataInfo").text();
        return { result, date };
    }
    else if (type === "M1") {
        const url = `${url_prefix}/m1lhao`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        const result = $("#code_m1").first().text();
        const date = $("span.dataInfo").text();
        return { result, date };
    }
    else if (type === "JE") {
        const url = "https://www.loteriasyapuestas.es/es/resultados";
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        const result = $(".c-ultimo-resultado__joker-ganador")
            .text()
            .replace(/\s/g, "");
        const date = $("#qa_ultResult-LAPR-fecha").text();
        return { result, date };
    }
}
exports.getResultAndDate = getResultAndDate;
//# sourceMappingURL=result.helper.js.map