import { describe, expect, it } from "vitest";
import { ALL_IDIOMS, CATEGORIES, IDIOMS_BY_LEVEL, LEVELS, positionOf, exampleParts } from "./index";

describe("table layout", () => {
  it("places all 118 elements in unique cells of the classic shape", () => {
    const cells = new Set();
    for (let n = 1; n <= 118; n++) {
      const { row, col } = positionOf(n);
      expect(col).toBeGreaterThanOrEqual(1);
      expect(col).toBeLessThanOrEqual(18);
      expect([1, 2, 3, 4, 5, 6, 7, 9, 10]).toContain(row);
      cells.add(`${row}:${col}`);
    }
    expect(cells.size).toBe(118);
    expect(positionOf(72)).toEqual({ row: 6, col: 4 });
    expect(positionOf(57)).toEqual({ row: 9, col: 3 });
    expect(positionOf(118)).toEqual({ row: 7, col: 18 });
  });
});

describe("idiom data", () => {
  it.each(LEVELS.map((l) => l.id))("level %i fills the table with unique symbols", (id) => {
    const idioms = IDIOMS_BY_LEVEL[id];
    expect(idioms).toHaveLength(118);
    const symbols = idioms.map((i) => i.symbol);
    const dupes = symbols.filter((s, i) => symbols.indexOf(s) !== i);
    expect(dupes).toEqual([]);
    for (const i of idioms) expect(i.symbol).toMatch(/^[A-Z][a-z]?$/);
  });

  it("has no idiom repeated across levels", () => {
    const phrases = ALL_IDIOMS.map((i) => i.phrase.toLowerCase());
    const dupes = phrases.filter((p, i) => phrases.indexOf(p) !== i);
    expect(dupes).toEqual([]);
  });

  it("marks the idiom inside every example sentence", () => {
    for (const i of ALL_IDIOMS) {
      expect(exampleParts(i.example).some((p) => p.mark), i.phrase).toBe(true);
      expect(i.meaning.length, i.phrase).toBeGreaterThan(3);
    }
  });

  it("uses only known categories", () => {
    const ids = new Set(CATEGORIES.map((c) => c.id));
    for (const i of ALL_IDIOMS) expect(ids.has(i.category)).toBe(true);
  });
});
