import { CATEGORIES } from "../data";
import ElementTile from "./ElementTile";

export default function ListView({ idioms, learned, onOpen }) {
  return (
    <div className="list">
      {CATEGORIES.map((cat) => {
        const group = idioms.filter((i) => i.category === cat.id);
        if (!group.length) return null;
        return (
          <section key={cat.id} className="list__group" data-cat={cat.id}>
            <h3 className="list__heading">
              <span className="swatch" data-cat={cat.id} />
              {cat.label} <span className="muted">· {cat.family}</span>
            </h3>
            <ul className="list__items">
              {group.map((idiom) => (
                <li key={idiom.id}>
                  <button type="button" className="row" onClick={() => onOpen(idiom)}>
                    <ElementTile
                      number={idiom.number}
                      symbol={idiom.symbol}
                      category={idiom.category}
                      learned={learned.has(idiom.id)}
                      size="sm"
                    />
                    <span className="row__text">
                      <span className="row__phrase">{idiom.phrase}</span>
                      <span className="row__meaning">{idiom.meaning}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
