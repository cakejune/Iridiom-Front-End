// The square "element" used everywhere: atomic number, symbol and name.
export default function ElementTile({ number, symbol, name, category, size = "md", learned = false, className = "" }) {
  return (
    <span className={`tile tile--${size} ${className}`} data-cat={category} aria-hidden="true">
      <span className="tile__number">{number}</span>
      {learned && <span className="tile__learned" title="Learned">✓</span>}
      <span className="tile__symbol">{symbol}</span>
      {name && <span className="tile__name">{name}</span>}
    </span>
  );
}
