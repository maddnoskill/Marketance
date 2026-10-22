import { describe, expect, it } from "vitest";
import { daysInMonth, isIsoDate, previousMonth, todayIn } from "@/lib/dates/calendar";

describe("dates calendrier", () => {
  it("valide les dates réelles seulement", () => {
    expect(isIsoDate("2026-02-28")).toBe(true);
    expect(isIsoDate("2026-02-29")).toBe(false);
    expect(isIsoDate("2028-02-29")).toBe(true);
    expect(isIsoDate("2026-13-01")).toBe(false);
  });

  it("calcule le mois précédent, y compris en janvier", () => {
    expect(previousMonth("2026-10")).toBe("2026-09");
    expect(previousMonth("2027-01")).toBe("2026-12");
  });

  it("connaît la longueur des mois", () => {
    expect(daysInMonth("2026-02")).toBe(28);
    expect(daysInMonth("2028-02")).toBe(29);
    expect(daysInMonth("2026-10")).toBe(31);
  });

  it("donne la date de Toronto, pas celle de l'UTC", () => {
    // 1er novembre 2026 à 02 h UTC = 31 octobre à 22 h à Toronto (heure avancée).
    expect(todayIn("America/Toronto", new Date("2026-11-01T02:00:00Z"))).toBe("2026-10-31");
    // 2 novembre 2026 à 04 h 30 UTC = 1er novembre à 23 h 30 à Toronto (heure normale).
    expect(todayIn("America/Toronto", new Date("2026-11-02T04:30:00Z"))).toBe("2026-11-01");
  });
});
