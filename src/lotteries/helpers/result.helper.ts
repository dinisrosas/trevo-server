import { LotteryType } from ".prisma/client";
import got from "got";
import cheerio from "cheerio";
import { DateTime } from "luxon";

const DATE_REGEX = /(\d{1,2})[/](\d{1,2})[/](\d{4})/;

export async function getLatestLotteryResult(type: LotteryType): Promise<{
  result: string;
  isoDate: string;
}> {
  const { result, date } = await getResultAndDate(type);
  const index = date.search(DATE_REGEX);
  const localeIsoDate = date.substring(index);

  const isoDate = DateTime.fromFormat(localeIsoDate, "dd/MM/yyyy").toISODate();

  return { result, isoDate };
}

export async function getResultAndDate(type: LotteryType): Promise<{
  result: string;
  date: string;
}> {
  const url_prefix = `https://www.jogossantacasa.pt/web/SCCartazResult`;

  if (/(EM|TL)/.test(type)) {
    const url = `${url_prefix}/${
      type === "EM" ? "euroMilhoes" : "totolotoNew"
    }`;
    const response = await got(url);
    const $ = cheerio.load(response.body);

    const result = $(".betMiddle.twocol.regPad").find("ul li").last().text();
    const date = $("span.dataInfo").text();

    return { result, date };
  } else if (/(LC|LP)/.test(type)) {
    const url = `${url_prefix}/${type === "LC" ? "lotClass" : "lotPop"}`;
    const response = await got(url);
    const $ = cheerio.load(response.body);
    const results = $(".stripped.betMiddle.fourcol.regPad")
      .find("ul.colums")
      .toArray()
      .map((el) => $(el).find("li").eq(1).text());

    const result = results.join(";");
    const date = $("span.dataInfo").text();

    return { result, date };
  } else if (type === "M1") {
    const url = `${url_prefix}/m1lhao`;
    const response = await got(url);
    const $ = cheerio.load(response.body);

    const result = $("#code_m1").first().text();
    const date = $("span.dataInfo").text();

    return { result, date };
  } else if (type === "JE") {
    const url = "https://www.loteriasyapuestas.es/es/resultados";
    const response = await got(url);
    const $ = cheerio.load(response.body);
    const result = $(".c-ultimo-resultado__joker-ganador")
      .text()
      .replace(/\s/g, "");

    const date = $("#qa_ultResult-LAPR-fecha").text();

    return { result, date };
  }
}
