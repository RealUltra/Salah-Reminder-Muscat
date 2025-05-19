import axios from "axios";
import * as cheerio from "cheerio";
import { parseDate, parseTime, getIsoDate } from "./salah-times-utils.js";

type MultipleSalahTimes = Record<string, SalahTimes>;

export async function getSalahTimesForMonth(
  year: number | null = null,
  monthNum: number | null = null
): Promise<MultipleSalahTimes | null> {
  const now = new Date(Date.now());

  monthNum ??= now.getMonth() + 1;
  year ??= now.getFullYear();

  try {
    const url = `https://prayer-times.muslimpro.com/en/Prayer-times-adhan-Muscat-Oman-287286?date=${year}-${monthNum}`;
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const displayMonth: string = $(".display-month").text();

    const rows = $("table.prayer-times > tbody > tr");

    const monthSalahTimes: MultipleSalahTimes = {};

    rows.each((_, element) => {
      const columns = $(element).find("td");

      if (columns.length !== 7) return;

      const rawDate: string = $(columns[0]).text();
      const rawFajrTime: string = $(columns[1]).text();
      const rawSunriseTime: string = $(columns[2]).text();
      const rawDhuhrTime: string = $(columns[3]).text();
      const rawAsrTime: string = $(columns[4]).text();
      const rawMaghribTime: string = $(columns[5]).text();
      const rawIshaaTime: string = $(columns[6]).text();

      const date = parseDate(rawDate, displayMonth);
      const fajrTime = parseTime(rawFajrTime, date!);
      const sunriseTime = parseTime(rawSunriseTime, date!);
      const dhuhrTime = parseTime(rawDhuhrTime, date!);
      const asrTime = parseTime(rawAsrTime, date!);
      const maghribTime = parseTime(rawMaghribTime, date!);
      const ishaaTime = parseTime(rawIshaaTime, date!);

      if (
        !(
          date &&
          fajrTime &&
          sunriseTime &&
          dhuhrTime &&
          asrTime &&
          maghribTime &&
          ishaaTime
        )
      ) {
        throw new Error("Could not fetch all the data!");
      }

      const salahTimes: SalahTimes = {
        fajr: fajrTime!,
        sunrise: sunriseTime!,
        dhuhr: dhuhrTime!,
        asr: asrTime!,
        maghrib: maghribTime!,
        ishaa: ishaaTime!,
      };

      const isoDate = getIsoDate(date!);

      monthSalahTimes[isoDate] = salahTimes;
    });

    return monthSalahTimes;
  } catch (error) {
    console.error("Error in getSalahTimesForMonth:", error);
    return null;
  }
}

export async function getSalahTimesForDate(
  date: Date | null = null
): Promise<SalahTimes | null> {
  date ??= new Date(Date.now());

  const monthSalahTimes = await getSalahTimesForMonth(
    date.getFullYear(),
    date.getMonth() + 1
  );

  if (!monthSalahTimes) return null;

  const key = getIsoDate(date);

  return monthSalahTimes[key];
}

export async function getSalahTimesForDates(
  ...dates: Date[]
): Promise<MultipleSalahTimes | null> {
  const fetchedSalahTimes: Map<[number, number], MultipleSalahTimes> =
    new Map();

  const results: MultipleSalahTimes = {};

  for (const date of dates) {
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const key: [number, number] = [monthIndex, year];

    if (!fetchedSalahTimes.has(key)) {
      const monthSalahTimes = await getSalahTimesForMonth(monthIndex, year);
      if (!monthSalahTimes) return null;
      fetchedSalahTimes.set(key, monthSalahTimes);
    }

    const monthSalahTimes = fetchedSalahTimes.get(key)!;
    const isoDate = getIsoDate(date);
    results[isoDate] = monthSalahTimes[isoDate];
  }

  return results;
}

export async function getSalahTimesPayload(): Promise<SalahTimesPayload | null> {
  const yesterday = new Date(Date.now());
  const today = new Date(Date.now());
  const tomorrow = new Date(Date.now());

  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const requiredSalahTimes = await getSalahTimesForDates(
    yesterday,
    today,
    tomorrow
  );

  if (!requiredSalahTimes) {
    return null;
  }

  const yesterdaySalahTimes = requiredSalahTimes[getIsoDate(yesterday)];
  const todaySalahTimes = requiredSalahTimes[getIsoDate(today)];
  const tomorrowSalahTimes = requiredSalahTimes[getIsoDate(tomorrow)];

  return {
    yesterday: yesterdaySalahTimes,
    today: todaySalahTimes,
    tomorrow: tomorrowSalahTimes,
  };
}
