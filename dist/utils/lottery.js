"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestLotteryResult = void 0;
const cheerio_1 = require("cheerio");
const got_1 = require("got");
const types_1 = require("../types");
async function getLatestLotteryResult(type) {
    const url_prefix = `https://www.jogossantacasa.pt/web/SCCartazResult`;
    if (/(EM|TL)/.test(type)) {
        const url = `${url_prefix}/${type === "EM" ? "euroMilhoes" : "totolotoNew"}`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        return $(".betMiddle.twocol.regPad").find("ul li").last().text();
    }
    else if (/(LC|LP)/.test(type)) {
        const url = `${url_prefix}/${type === "LC" ? "lotClass" : "lotPop"}`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        const results = $(".stripped.betMiddle.fourcol.regPad")
            .find("ul.colums")
            .toArray()
            .map((el) => $(el).find("li").eq(1).text());
        return results.join(";");
    }
    else if (type === "M1") {
        const url = `${url_prefix}/m1lhao`;
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        return $("#code_m1").first().text();
    }
    else if (type === "JE") {
        const url = "https://www.loteriasyapuestas.es/es/resultados";
        const response = await got_1.default(url);
        const $ = cheerio_1.default.load(response.body);
        return $(".c-ultimo-resultado__joker-ganador").text().replace(/\s/g, "");
    }
}
exports.getLatestLotteryResult = getLatestLotteryResult;
//# sourceMappingURL=lottery.js.map