// Each category is an "element family", like alkali metals or noble gases.
// The order here is the order families appear across the table (left to right).
export const CATEGORIES = [
  { id: "animals", label: "Animals", family: "Fauna", hint: "Idioms with creatures in them" },
  { id: "body", label: "Body", family: "Anatomicals", hint: "Hands, heads, eyes, feet and more" },
  { id: "food", label: "Food & Drink", family: "Edibles", hint: "Kitchen and dinner-table idioms" },
  { id: "money", label: "Money & Work", family: "Currencies", hint: "Jobs, prices and the office" },
  { id: "people", label: "People & Feelings", family: "Emotives", hint: "Moods, love and personalities" },
  { id: "time", label: "Time", family: "Chronals", hint: "Speed, timing and waiting" },
  { id: "nature", label: "Nature & Science", family: "Elementals", hint: "Weather, earth and the lab" },
  { id: "trouble", label: "Trouble", family: "Volatiles", hint: "Problems, risks and arguments" },
  { id: "success", label: "Success & Effort", family: "Catalysts", hint: "Trying, winning and giving up" },
  { id: "talk", label: "Talk", family: "Conductors", hint: "Speaking, secrets and listening" },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
