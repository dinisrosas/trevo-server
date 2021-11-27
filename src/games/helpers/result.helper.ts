import got from 'got';
import { JSDOM } from 'jsdom';
import { DateTime } from 'luxon';
import { GameType } from 'src/types';

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
  const url_prefix = `https://www.jogossantacasa.pt/web/SCCartazResult`;

  if (/(EM|TL)/.test(type)) {
    const url = `${url_prefix}/${
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
    const url = `${url_prefix}/${type === 'LC' ? 'lotClass' : 'lotPop'}`;

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
  } else if (type === 'M1') {
    const url = `${url_prefix}/m1lhao`;

    const response = await got(url);
    const dom = new JSDOM(response.body);
    const document = dom.window.document;

    const result = document.getElementById('code_m1').textContent;

    const date = document.querySelector('span.dataInfo').textContent;
    const isoDate = getIsoDateFromString(date);

    return { result, isoDate };
  } else if (type === 'JE') {
    const url = 'https://www.loteriasyapuestas.es/es/resultados';

    const response = await got(url);
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
