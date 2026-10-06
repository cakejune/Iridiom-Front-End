import { ALL_IDIOMS, CATEGORIES, LEVELS } from "../data";
import ElementTile from "./ElementTile";

const SAMPLE = ALL_IDIOMS.find((i) => i.phrase === "Break the ice");

export default function AboutPage() {
  return (
    <div className="page page--narrow prose">
      <header className="page-head">
        <p className="eyebrow">About</p>
        <h1>Idioms are the hidden chemistry of English</h1>
        <p className="lead">
          You can know every grammar rule and still be confused when a coworker says “let's touch base” or a friend tells
          you to “break a leg.” Americans use idioms constantly, but classes rarely teach them. Iridiom turns them into
          something you can explore, one element at a time.
        </p>
      </header>

      <section className="card how-to">
        <h2>How to read an element</h2>
        <div className="anatomy">
          <ElementTile number={SAMPLE.number} symbol={SAMPLE.symbol} name={SAMPLE.phrase} category={SAMPLE.category} size="xl" />
          <ol className="anatomy__notes">
            <li><strong>{SAMPLE.number}</strong> — the element's number: its seat in the table.</li>
            <li><strong>Ic</strong> — its symbol, taken from a key word (“ice”).</li>
            <li><strong>Break the ice</strong> — the idiom itself.</li>
            <li><strong>Color</strong> — its family. Families sit together, like metals and gases in a real table.</li>
          </ol>
        </div>
      </section>

      <section>
        <h2>Three tables, same shape</h2>
        <p>
          A periodic table only has room for 118 elements, so Iridiom has three of them. Each is a full table, ordered
          from the idioms you'll hear most to the ones that will make you sound like a native speaker.
        </p>
        <ul className="levels-list">
          {LEVELS.map((l) => (
            <li key={l.id}>
              <a href={`#/table/${l.id}`}><strong>Level {l.id} · {l.name}</strong></a> — {l.blurb}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>The families</h2>
        <div className="family-grid">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="family-card" data-cat={c.id}>
              <span className="swatch" data-cat={c.id} />
              <div>
                <strong>{c.family}</strong> <span className="muted">· {c.label}</span>
                <p className="small muted">{c.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Tips for learning idioms</h2>
        <ul>
          <li><strong>Don't translate word by word.</strong> “Piece of cake” has nothing to do with dessert. Learn the whole phrase as one unit, like a single word.</li>
          <li><strong>Listen first.</strong> Press the speaker button on any element to hear how it sounds in a natural sentence.</li>
          <li><strong>Notice the form.</strong> Idioms change to fit the sentence: “spill the beans” becomes “she spilled the beans.” The highlighted part of each example shows this.</li>
          <li><strong>Use it this week.</strong> Pick one idiom and try it in a real conversation or message. Then mark it as learned.</li>
          <li><strong>Visit the Lab.</strong> Short quizzes help idioms stay in your memory.</li>
        </ul>
      </section>

      <section>
        <h2>Why “Iridiom”?</h2>
        <p>
          <strong>Iridium</strong> (Ir, element 77) + <strong>idiom</strong>. Iridium is one of the rarest, toughest
          metals on Earth. We hope these idioms stick with you just as well.
        </p>
        <p>
          Iridiom started as a coding bootcamp project. See the <a href="#/thanks">elemental people</a> who helped make it.
        </p>
      </section>
    </div>
  );
}
