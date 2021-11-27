import { GameType } from '.prisma/client';
import got from 'got';
import { JSDOM } from 'jsdom';
import { DateTime } from 'luxon';

const JOGOSSANTACASA_PT_URL_PREFIX =
  'https://www.jogossantacasa.pt/web/SCCartazResult';
const LOTERIASYAPUESTAS_ES_URL =
  'https://www.loteriasyapuestas.es/es/resultados';

const DATE_REGEX = /(\d{1,2})[/](\d{1,2})[/](\d{4})/;
const DATE_FORMAT = 'dd/MM/yyyy';

export async function getLatestGameResult(type: GameType): Promise<{
  result: string;
  isoDate: string;
}> {
  return await getResultAndDate(type);
}

function getIsoDateFromString(str: string): string {
  const index = str.search(DATE_REGEX);
  const localIsoDate = str.substring(index);
  const isoDate = DateTime.fromFormat(localIsoDate, DATE_FORMAT).toISODate();
  return isoDate;
}

export async function getResultAndDate(type: GameType): Promise<{
  result: string;
  isoDate: string;
}> {
  if (/(EM|TL)/.test(type)) {
    const url = `${JOGOSSANTACASA_PT_URL_PREFIX}/${
      type === 'EM' ? 'euroMilhoes' : 'totolotoNew'
    }`;

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const document = dom.window.document;

    const result = document.querySelector(
      '.betMiddle.twocol.regPad ul.colums li:last-child',
    ).textContent;

    const date = document.querySelector('span.dataInfo').textContent;
    const isoDate = getIsoDateFromString(date);

    return { result, isoDate };
  } else if (/(LC|LP)/.test(type)) {
    const url = `${JOGOSSANTACASA_PT_URL_PREFIX}/${
      type === GameType.LC ? 'lotClass' : 'lotPop'
    }`;

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const document = dom.window.document;

    const results = document.querySelectorAll(
      '.stripped.betMiddle.fourcol.regPad ul.colums',
    );

    const result = [...results]
      .map((result) => result.querySelector('li:nth-child(2)').textContent)
      .join(';');

    const date = document.querySelector('span.dataInfo').textContent;
    const isoDate = getIsoDateFromString(date);

    return { result, isoDate };
  } else if (type === GameType.M1) {
    const url = `${JOGOSSANTACASA_PT_URL_PREFIX}/m1lhao`;

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const document = dom.window.document;

    const result = document.getElementById('code_m1').textContent;

    const date = document.querySelector('span.dataInfo').textContent;
    const isoDate = getIsoDateFromString(date);

    return { result, isoDate };
  } else if (type === GameType.JE) {
    const response = await got(LOTERIASYAPUESTAS_ES_URL);
    const dom = new JSDOM(response.body);
    const document = dom.window.document;

    const result = document
      .querySelector('.c-ultimo-resultado__joker-ganador')
      .textContent.replace(/\s/g, '');

    const date = document.getElementById('qa_ultResult-LAPR-fecha').textContent;
    const isoDate = getIsoDateFromString(date);

    return { result, isoDate };
  }
}
