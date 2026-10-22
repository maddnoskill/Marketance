import { describe, expect, it } from "vitest";
import { assertCents, formatCad, parseCadToCents } from "@/lib/money/cents";

const nbsp = (s: string) => s.replace(/[  ]/g, " ");

describe("parseCadToCents", () => {
  it.each([
    ["42,50", 4250],
    ["42.50", 4250],
    ["42,5", 4250],
    ["0,10", 10],
    ["0.1", 10],
    ["1 234,05", 123405],
    ["  7 ", 700],
  ])("convertit %s en %i cents", (input, expected) => {
    expect(parseCadToCents(input)).toBe(expected);
  });

  it.each(["", "abc", "-5", "0", "0,00", "10,999", "1,2,3", "12$"])("refuse « %s »", (input) => {
    expect(parseCadToCents(input)).toBeNull();
  });

  it("évite l'erreur classique 0,1 + 0,2", () => {
    expect(parseCadToCents("0,1")! + parseCadToCents("0,2")!).toBe(30);
  });
});

describe("formatCad", () => {
  it("formate à la québécoise", () => {
    expect(nbsp(formatCad(123456))).toBe("1 234,56 $");
    expect(nbsp(formatCad(-1799))).toBe("-17,99 $");
  });
});

describe("assertCents", () => {
  it("refuse les montants à virgule", () => {
    expect(() => assertCents(12.5)).toThrow(TypeError);
    expect(assertCents(1250)).toBe(1250);
  });
});
