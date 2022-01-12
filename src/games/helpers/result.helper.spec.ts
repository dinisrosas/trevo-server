import { getLatestGameResult } from './result.helper';

const ISO_DATE_REGEX = /(\d{4})[-](\d{1,2})[-](\d{1,2})/;

describe('latest game result', () => {
  it('should get valid result and iso date for EM game', async () => {
    const data = await getLatestGameResult('EM');
    expect(data.result).toMatch(
      /(([1-9]|[1234][0-9]|50)\s){5}\+(\s([1-9]|1[0-2])){2}/,
    );
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });

  it('should get valid result and iso date for TL game', async () => {
    const data = await getLatestGameResult('TL');
    expect(data.result).toMatch(
      /(([1-9]|[1234][0-9]|50)\s){5}\+(\s([1-9]|1[0-2]))/,
    );
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });

  it('should get valid result and iso date for M1 game', async () => {
    const data = await getLatestGameResult('M1');
    expect(data.result).toMatch(/[A-Z]{3}\d{5}/);
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });

  it('should get valid result and iso date for LC game', async () => {
    const data = await getLatestGameResult('LC');
    expect(data.result).toMatch(/(\d{5};){2}\d{5}/);
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });

  it('should get valid result and iso date for LP game', async () => {
    const data = await getLatestGameResult('LP');
    expect(data.result).toMatch(/(\d{5};){3}\d{5}/);
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });

  it('should get valid result and iso date for JE game', async () => {
    const data = await getLatestGameResult('JE');
    expect(data.result).toMatch(/\d{7}/);
    expect(data.isoDate).toMatch(ISO_DATE_REGEX);
  });
});
