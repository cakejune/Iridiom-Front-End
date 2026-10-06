import { CATEGORIES, CATEGORY_BY_ID } from "./categories";
import level1 from "./level1";
import level2 from "./level2";
import level3 from "./level3";

export { CATEGORIES, CATEGORY_BY_ID };

export const LEVELS = [
  { id: 1, name: "Everyday", blurb: "Idioms you'll hear almost every week. Start here." },
  { id: 2, name: "Conversational", blurb: "Sound natural with friends, coworkers and on TV." },
  { id: 3, name: "Fluent", blurb: "The ones native speakers use and textbooks skip." },
];

export const ELEMENT_COUNT = 118;

// Grid position (1-based row/col) of each atomic number in the classic table.
// Rows 9 and 10 hold the two f-block rows that sit underneath the main table.
export function positionOf(n) {
  if (n === 1) return { row: 1, col: 1 };
  if (n === 2) return { row: 1, col: 18 };
  if (n <= 18) {
    const row = n <= 10 ? 2 : 3;
    const i = n - (row === 2 ? 3 : 11); // 0..7
    return { row, col: i < 2 ? i + 1 : i + 11 };
  }
  if (n <= 54) {
    const row = n <= 36 ? 4 : 5;
    return { row, col: n - (row === 4 ? 18 : 36) };
  }
  const row = n <= 86 ? 6 : 7;
  const start = row === 6 ? 55 : 87;
  const i = n - start; // 0..31
  if (i < 2) return { row, col: i + 1 };
  if (i < 17) return { row: row + 3, col: i + 1 }; // f-block: cols 3..17
  return { row, col: i - 13 };
}

// Families fill the table column by column (like real element groups),
// then the two f-block rows, so each family forms one connected colour region.
const FILL_ORDER = Array.from({ length: ELEMENT_COUNT }, (_, i) => i + 1)
  .map((n) => ({ n, ...positionOf(n) }))
  .sort((a, b) => {
    const fa = a.row > 7, fb = b.row > 7;
    if (fa !== fb) return fa ? 1 : -1;
    return a.col - b.col || a.row - b.row;
  });

const RAW = { 1: level1, 2: level2, 3: level3 };

function buildLevel(levelId) {
  const entries = CATEGORIES.flatMap((cat) =>
    RAW[levelId][cat.id].map(([symbol, phrase, meaning, example]) => ({
      symbol, phrase, meaning, example, category: cat.id,
    })),
  );
  if (entries.length !== ELEMENT_COUNT) {
    throw new Error(`Level ${levelId} has ${entries.length} idioms; it needs exactly ${ELEMENT_COUNT}.`);
  }
  return entries
    .map((entry, i) => {
      const slot = FILL_ORDER[i];
      return {
        ...entry,
        id: `${levelId}-${slot.n}`,
        level: levelId,
        number: slot.n,
        row: slot.row,
        col: slot.col,
      };
    })
    .sort((a, b) => a.number - b.number);
}

export const IDIOMS_BY_LEVEL = Object.fromEntries(LEVELS.map((l) => [l.id, buildLevel(l.id)]));
export const ALL_IDIOMS = LEVELS.flatMap((l) => IDIOMS_BY_LEVEL[l.id]);
export const IDIOM_BY_ID = Object.fromEntries(ALL_IDIOMS.map((i) => [i.id, i]));

// Splits "He [[spilled the beans]]." into [{text, mark}] parts for highlighting.
export function exampleParts(example) {
  return example.split(/(\[\[.*?\]\])/).filter(Boolean).map((part) =>
    part.startsWith("[[") ? { text: part.slice(2, -2), mark: true } : { text: part, mark: false },
  );
}

export function plainExample(example) {
  return example.replace(/\[\[|\]\]/g, "");
}

const normalize = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const SEARCH_TEXT = Object.fromEntries(
  ALL_IDIOMS.map((i) => [
    i.id,
    normalize(`${i.phrase} ${i.symbol} ${i.meaning} ${plainExample(i.example)} ${CATEGORY_BY_ID[i.category].label} ${CATEGORY_BY_ID[i.category].family}`),
  ]),
);

export function matchesQuery(idiom, query) {
  const q = normalize(query);
  if (!q) return true;
  const text = SEARCH_TEXT[idiom.id];
  return q.split(" ").every((word) => text.includes(word));
}

// The same "element of the day" for everyone, changing at local midnight.
export function elementOfTheDay(date = new Date()) {
  const day = Math.floor((date.getTime() - date.getTimezoneOffset() * 60000) / 86400000);
  return ALL_IDIOMS[(day * 7919) % ALL_IDIOMS.length];
}
