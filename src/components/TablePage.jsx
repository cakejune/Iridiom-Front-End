import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, IDIOMS_BY_LEVEL, LEVELS, elementOfTheDay, matchesQuery } from "../data";
import { navigate, useStoredState } from "../lib/hooks";
import DetailDialog from "./DetailDialog";
import { CloseIcon, GridIcon, ListIcon, SearchIcon, ShuffleIcon } from "./Icons";
import ListView from "./ListView";
import PeriodicTable from "./PeriodicTable";

const STATUS = [
  { id: "all", label: "All" },
  { id: "new", label: "To learn" },
  { id: "learned", label: "Learned" },
];

export default function TablePage({ level, number, learned, toggleLearned }) {
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState(() => new Set());
  const [status, setStatus] = useState("all");
  const [view, setViewChoice] = useStoredState("iridiom:view", "table");
  const [preview, setPreview] = useState(null);
  const searchRef = useRef(null);
  const today = useMemo(() => elementOfTheDay(), []);

  const isMatch = useCallback(
    (idiom) =>
      (cats.size === 0 || cats.has(idiom.category)) &&
      (status === "all" || (status === "learned") === learned.has(idiom.id)) &&
      matchesQuery(idiom, query),
    [cats, status, learned, query],
  );

  const idioms = IDIOMS_BY_LEVEL[level];
  const matches = idioms.filter(isMatch);
  const filtering = query.trim() !== "" || cats.size > 0 || status !== "all";
  const countsByLevel = useMemo(
    () => Object.fromEntries(LEVELS.map((l) => [l.id, IDIOMS_BY_LEVEL[l.id].filter(isMatch).length])),
    [isMatch],
  );

  const open = idioms.find((i) => i.number === number) ?? null;

  // "/" focuses search, like on many sites.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !e.target.closest?.("input, textarea, dialog")) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setPreview(null), [level]);

  function toggleCat(id) {
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearFilters() {
    setQuery("");
    setCats(new Set());
    setStatus("all");
  }

  const openIdiom = (idiom) => navigate(`table/${idiom.level}/${idiom.number}`);
  const step = (dir) => {
    const next = ((number - 1 + dir + 118) % 118) + 1;
    navigate(`table/${level}/${next}`, { replace: true });
  };
  const randomElement = () => {
    const pool = matches.length ? matches : idioms;
    openIdiom(pool[Math.floor(Math.random() * pool.length)]);
  };

  // While searching, the preview shows the first hit; otherwise whatever is hovered, else today's element.
  const q = query.trim().toLowerCase();
  const bestMatch = (q && matches.find((i) => i.phrase.toLowerCase().includes(q))) || matches[0];
  const featured = preview ?? (filtering ? bestMatch : today) ?? null;
  const featuredLabel = !preview && !filtering && featured ? "Element of the day" : !preview && filtering && featured ? "Best match" : null;
  const learnedInLevel = idioms.filter((i) => learned.has(i.id)).length;

  return (
    <div className="page page--table">
      <nav className="levels" aria-label="Levels">
        {LEVELS.map((l) => {
          const done = IDIOMS_BY_LEVEL[l.id].filter((i) => learned.has(i.id)).length;
          return (
            <a
              key={l.id}
              href={`#/table/${l.id}`}
              className={`level${l.id === level ? " level--active" : ""}`}
              aria-current={l.id === level ? "page" : undefined}
            >
              <span className="level__num">Level {l.id}</span>
              <span className="level__name">{l.name}</span>
              <span className="level__progress" aria-label={`${done} of 118 learned`}>
                <span className="level__bar" style={{ "--p": `${(done / 118) * 100}%` }} />
                {done}/118
              </span>
              {filtering && <span className="level__hits">{countsByLevel[l.id]} match{countsByLevel[l.id] === 1 ? "" : "es"}</span>}
            </a>
          );
        })}
      </nav>

      <p className="level-blurb">{LEVELS[level - 1].blurb}</p>

      <div className="toolbar">
        <label className="search">
          <SearchIcon />
          <span className="sr-only">Search idioms</span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search idioms, meanings, words…  ( / )"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button type="button" className="icon-btn icon-btn--sm" onClick={() => setQuery("")} aria-label="Clear search">
              <CloseIcon />
            </button>
          )}
        </label>

        <div className="segmented" role="group" aria-label="Show">
          {STATUS.map((s) => (
            <button key={s.id} type="button" aria-pressed={status === s.id} onClick={() => setStatus(s.id)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="segmented" role="group" aria-label="View">
          <button type="button" aria-pressed={view === "table"} onClick={() => setViewChoice("table")} title="Periodic table">
            <GridIcon /> <span className="hide-sm">Table</span>
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setViewChoice("list")} title="List">
            <ListIcon /> <span className="hide-sm">List</span>
          </button>
        </div>

        <button type="button" className="btn btn--ghost" onClick={randomElement} title="Open a random element">
          <ShuffleIcon /> <span className="hide-sm">Random</span>
        </button>
      </div>

      <div className="families" role="group" aria-label="Filter by family">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="family"
            data-cat={c.id}
            aria-pressed={cats.has(c.id)}
            onClick={() => toggleCat(c.id)}
            title={c.hint}
          >
            <span className="swatch" data-cat={c.id} />
            <span className="family__label">{c.label}</span>
            <span className="family__name">{c.family}</span>
          </button>
        ))}
      </div>

      <div className="status-line" aria-live="polite">
        {filtering ? (
          <>
            <span>
              <strong>{matches.length}</strong> of 118 elements in Level {level} match.
            </span>
            {matches.length === 0 && LEVELS.some((l) => l.id !== level && countsByLevel[l.id] > 0) && (
              <span>
                {" "}Try{" "}
                {LEVELS.filter((l) => l.id !== level && countsByLevel[l.id] > 0).map((l, i) => (
                  <span key={l.id}>
                    {i > 0 && " or "}
                    <a href={`#/table/${l.id}`}>Level {l.id}</a>
                  </span>
                ))}
                .
              </span>
            )}
            <button type="button" className="link-btn" onClick={clearFilters}>Clear filters</button>
          </>
        ) : (
          <span>
            {learnedInLevel === 0
              ? "Tap any element to see what it means."
              : `You've learned ${learnedInLevel} of 118 in this level. Keep going!`}
          </span>
        )}
      </div>

      {view === "table" ? (
        <PeriodicTable
          level={level}
          isMatch={isMatch}
          learned={learned}
          featured={featured}
          featuredLabel={featuredLabel}
          onPreview={setPreview}
          onOpen={openIdiom}
        />
      ) : matches.length ? (
        <ListView idioms={matches} learned={learned} onOpen={openIdiom} />
      ) : (
        <p className="empty">No idioms match. Try a different word or clear the filters.</p>
      )}

      <DetailDialog
        idiom={open}
        isLearned={open ? learned.has(open.id) : false}
        onToggleLearned={() => open && toggleLearned(open.id)}
        onClose={() => navigate(`table/${level}`, { replace: true })}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}
