# Iridiom: The Periodic Table of English Idioms

An interactive way for English learners to explore idioms, laid out like the periodic table.

- **3 levels × 118 elements = 354 idioms.** Every level is a full periodic table: *Everyday*, *Conversational* and *Fluent*.
- **10 families** (Animals, Body, Food & Drink, Money & Work, People & Feelings, Time, Nature & Science, Trouble, Success & Effort, Talk), each with its own color region, like element groups.
- **Search** across all three tables (match counts show on each level tab), **family filters**, and **To learn / Learned** filters.
- **Element cards** with a plain-English meaning, an example sentence with the idiom highlighted, and text-to-speech.
- **The Lab:** 10-question quizzes (meaning and fill-in-the-blank).
- Learned progress is saved in the browser. Light and dark themes. Shareable links (`#/table/2/26`).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # data integrity checks
npm run build    # outputs to dist/
```

## Adding or editing idioms

Idioms live in `src/data/level1.js`, `level2.js` and `level3.js`, grouped by family:

```js
["Bn", "Spill the beans", "To tell a secret.", "Come on, [[spill the beans]] — who are you dating?"],
// symbol, idiom, meaning, example ([[...]] marks the idiom in the sentence)
```

Each level must have exactly 118 idioms with unique symbols. `npm test` checks this.
Families fill the table column by column in the order listed in `src/data/categories.js`.

## Deploying

Hosting is Firebase (`firebase.json` serves `dist/`).

- **Automatic:** merging into `new-backend-to-json` runs `.github/workflows/firebase-hosting-merge.yml`, which tests, builds and deploys to the live site.
- **Pull requests** get a temporary preview link posted as a comment.
- **Manual:** `npm run build && firebase deploy --only hosting`
