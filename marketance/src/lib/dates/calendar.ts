/**
 * Dates « calendrier » (AAAA-MM-JJ) : une opération financière a lieu un jour donné,
 * dans le fuseau de l'utilisateur, sans heure. On évite ainsi les décalages d'un jour
 * autour de minuit et des changements d'heure.
 */

export const DEFAULT_TIME_ZONE = "America/Toronto";

export type IsoDate = string; // AAAA-MM-JJ
export type MonthKey = string; // AAAA-MM

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isIsoDate(value: string): value is IsoDate {
  const m = ISO_DATE.exec(value);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(y, mo - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d;
}

/** Date du jour dans un fuseau donné. */
export function todayIn(timeZone: string = DEFAULT_TIME_ZONE, now: Date = new Date()): IsoDate {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function monthOf(date: IsoDate): MonthKey {
  return date.slice(0, 7);
}

export function previousMonth(month: MonthKey): MonthKey {
  const [y, m] = month.split("-").map(Number);
  return m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
}

export function daysInMonth(month: MonthKey): number {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}
