const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export function parseDate(rawDate: string, displayMonth: string): Date | null {
  const match = rawDate.match(/\d+/);

  if (!match) return null;

  const dayNum = parseInt(match[0]);

  const parts = displayMonth.trim().split(" ");

  if (parts.length !== 2) return null;

  const [monthName, yearStr] = parts;

  const monthIndex = MONTH_NAMES.indexOf(monthName.toLowerCase());

  if (monthIndex === -1) return null;

  const year = parseInt(yearStr);

  return new Date(year, monthIndex, dayNum);
}

export function parseTime(rawTime: string, date: Date): Date | null {
  const match = rawTime.match(/(\d{1,2})\:(\d{1,2})/);

  if (!match) return null;

  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
}

export function getIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
