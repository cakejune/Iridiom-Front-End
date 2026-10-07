import ElementTile from "./ElementTile";

const PEOPLE = [
  { name: "Elisa", symbol: "El", number: 5, description: "Pushes you to be better. Also kind of annoying." },
  { name: "Chett", symbol: "Ch", number: 11, description: "A fantastic instructor (often has an addiction to catnip)." },
  { name: "Alina", symbol: "Aa", number: 65, description: "A person with high levels of patience and empathy." },
  { name: "Michael", symbol: "Mi", number: 36, description: "Someone who gets more joy out of other people learning than himself. Does anyone know his real age by the way?" },
  { name: "Grant", symbol: "Gr", number: 1, description: "A digital being who acts as a catalyst for growth." },
];

const CATS = ["people", "talk", "nature", "success", "time"];

export default function ThanksPage() {
  return (
    <div className="page page--narrow">
      <header className="page-head">
        <p className="eyebrow">Special thanks</p>
        <h1>The elemental people</h1>
        <p className="lead">Iridiom wouldn't exist without these rare and valuable elements.</p>
      </header>
      <ul className="people">
        {PEOPLE.map((p, i) => (
          <li key={p.name} className="card person">
            <ElementTile number={p.number} symbol={p.symbol} name={p.name} category={CATS[i]} size="lg" />
            <div>
              <h2 className="h3">{p.name}</h2>
              <p>{p.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <p><a href="#/table/1" className="btn btn--primary">Back to the table</a></p>
    </div>
  );
}
