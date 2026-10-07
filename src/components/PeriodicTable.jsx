import { CATEGORY_BY_ID, IDIOMS_BY_LEVEL, LEVELS } from "../data";
import ElementTile from "./ElementTile";

// Short label shown on the tile under the symbol.
function shortName(phrase) {
  return phrase.length > 26 ? `${phrase.slice(0, 24).trimEnd()}…` : phrase;
}

export default function PeriodicTable({ level, isMatch, learned, featured, featuredLabel, onPreview, onOpen }) {
  const idioms = IDIOMS_BY_LEVEL[level];
  const cat = featured && CATEGORY_BY_ID[featured.category];

  return (
    <div className="ptable-scroll">
      <div className="ptable" onMouseLeave={() => onPreview(null)}>
        {idioms.map((idiom) => {
          const match = isMatch(idiom);
          return (
            <button
              key={idiom.id}
              type="button"
              className={`cell${match ? "" : " cell--dim"}`}
              style={{ gridRow: idiom.row, gridColumn: idiom.col }}
              onClick={() => onOpen(idiom)}
              onMouseEnter={() => onPreview(idiom)}
              onFocus={() => onPreview(idiom)}
              tabIndex={match ? 0 : -1}
              aria-label={`${idiom.number}, ${idiom.symbol}: ${idiom.phrase}`}
            >
              <ElementTile
                number={idiom.number}
                symbol={idiom.symbol}
                name={shortName(idiom.phrase)}
                category={idiom.category}
                learned={learned.has(idiom.id)}
                size="cell"
              />
            </button>
          );
        })}

        <div className="ptable__slot" style={{ gridRow: 6, gridColumn: 3 }} aria-hidden="true">57–71</div>
        <div className="ptable__slot" style={{ gridRow: 7, gridColumn: 3 }} aria-hidden="true">89–103</div>
        <div className="ptable__gap" style={{ gridRow: 8, gridColumn: "1 / -1" }} aria-hidden="true" />

        {/* The empty space at the top of every periodic table holds the key / preview. */}
        <div className="preview" style={{ gridRow: "1 / 4", gridColumn: "3 / 13" }} aria-live="polite">
          {featured ? (
            <>
              <ElementTile
                number={featured.number}
                symbol={featured.symbol}
                name={featured.phrase}
                category={featured.category}
                learned={learned.has(featured.id)}
                size="lg"
              />
              <div className="preview__text">
                <p className="eyebrow">
                  {featuredLabel ?? (
                    <>
                      {cat.family} · {cat.label}
                    </>
                  )}
                </p>
                <p className="preview__phrase">{featured.phrase}</p>
                <p className="preview__meaning">{featured.meaning}</p>
                {featured.level !== level && (
                  <button type="button" className="link-btn" onClick={() => onOpen(featured)}>
                    Open in Level {featured.level} · {LEVELS[featured.level - 1].name} →
                  </button>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
