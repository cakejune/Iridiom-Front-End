import { useMemo, useState } from "react";
import { CATEGORIES, CATEGORY_BY_ID, IDIOMS_BY_LEVEL, LEVELS, exampleParts } from "../data";
import { canSpeak, speak } from "../lib/hooks";
import ElementTile from "./ElementTile";
import { CheckIcon, CloseIcon, FlaskIcon, SpeakerIcon } from "./Icons";

const LENGTH = 10;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Two kinds of question: "what does this idiom mean?" and "which idiom fits the sentence?"
function buildQuiz({ level, category, onlyNew, learned }) {
  const levelPool = level === "all" ? LEVELS.flatMap((l) => IDIOMS_BY_LEVEL[l.id]) : IDIOMS_BY_LEVEL[level];
  let pool = levelPool.filter((i) => category === "all" || i.category === category);
  if (onlyNew) {
    const fresh = pool.filter((i) => !learned.has(i.id));
    if (fresh.length >= 4) pool = fresh;
  }
  return shuffle(pool)
    .slice(0, LENGTH)
    .map((answer, n) => {
      const kind = n % 2 === 0 ? "meaning" : "fill";
      const distractors = shuffle(levelPool.filter((i) => i.id !== answer.id)).slice(0, 3);
      return { kind, answer, options: shuffle([answer, ...distractors]) };
    });
}

function Blanked({ example }) {
  return (
    <>
      {exampleParts(example).map((p, i) =>
        p.mark ? <span key={i} className="blank">{"_".repeat(Math.max(6, Math.min(14, p.text.length)))}</span> : <span key={i}>{p.text}</span>,
      )}
    </>
  );
}

export default function LabPage({ learned, addLearned }) {
  const [settings, setSettings] = useState({ level: 1, category: "all", onlyNew: false });
  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState([]);
  const [saved, setSaved] = useState(false);

  const poolSize = useMemo(() => {
    const levelPool = settings.level === "all" ? LEVELS.flatMap((l) => IDIOMS_BY_LEVEL[l.id]) : IDIOMS_BY_LEVEL[settings.level];
    return levelPool.filter((i) => settings.category === "all" || i.category === settings.category).length;
  }, [settings]);

  function start() {
    setQuiz(buildQuiz({ ...settings, learned }));
    setIndex(0);
    setPicks([]);
    setSaved(false);
  }

  if (!quiz) {
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <p className="eyebrow"><FlaskIcon /> The Lab</p>
          <h1>Test your idioms</h1>
          <p className="lead">
            Ten quick experiments. Half ask what an idiom means; half ask you to complete a real sentence.
            No pressure — wrong answers are just data.
          </p>
        </header>

        <div className="card lab-setup">
          <fieldset>
            <legend>Level</legend>
            <div className="segmented segmented--wrap">
              {[...LEVELS.map((l) => ({ id: l.id, label: `${l.id} · ${l.name}` })), { id: "all", label: "All levels" }].map((o) => (
                <button key={o.id} type="button" aria-pressed={settings.level === o.id} onClick={() => setSettings((s) => ({ ...s, level: o.id }))}>
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Family</legend>
            <div className="families families--compact">
              <button type="button" className="family" aria-pressed={settings.category === "all"} onClick={() => setSettings((s) => ({ ...s, category: "all" }))}>
                <span className="family__label">Any family</span>
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="family"
                  data-cat={c.id}
                  aria-pressed={settings.category === c.id}
                  onClick={() => setSettings((s) => ({ ...s, category: c.id }))}
                >
                  <span className="swatch" data-cat={c.id} />
                  <span className="family__label">{c.label}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="checkbox">
            <input type="checkbox" checked={settings.onlyNew} onChange={(e) => setSettings((s) => ({ ...s, onlyNew: e.target.checked }))} />
            Skip idioms I've already marked as learned
          </label>

          <div className="lab-setup__go">
            <span className="muted">{poolSize} idioms in this sample</span>
            <button type="button" className="btn btn--primary btn--lg" onClick={start}>
              Start experiment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const finished = index >= quiz.length;

  if (finished) {
    const correct = quiz.filter((q, i) => picks[i] === q.answer.id);
    const missed = quiz.filter((q, i) => picks[i] !== q.answer.id);
    const score = correct.length;
    const verdict = score === quiz.length ? "Perfect reaction!" : score >= quiz.length * 0.7 ? "Stable compound." : score >= quiz.length * 0.4 ? "Promising results." : "Every scientist starts somewhere.";
    return (
      <div className="page page--narrow">
        <header className="page-head">
          <p className="eyebrow"><FlaskIcon /> Results</p>
          <h1>{score} / {quiz.length} · {verdict}</h1>
        </header>
        <div className="card">
          {correct.length > 0 && (
            <p>
              <button type="button" className="btn btn--primary" disabled={saved} onClick={() => { addLearned(correct.map((q) => q.answer.id)); setSaved(true); }}>
                <CheckIcon /> {saved ? "Saved to your learned list" : `Mark the ${correct.length} you got right as learned`}
              </button>
            </p>
          )}
          {missed.length > 0 && (
            <>
              <h2 className="h3">Review these</h2>
              <ul className="review">
                {missed.map((q) => (
                  <li key={q.answer.id}>
                    <a href={`#/table/${q.answer.level}/${q.answer.number}`} className="row">
                      <ElementTile number={q.answer.number} symbol={q.answer.symbol} category={q.answer.category} size="sm" />
                      <span className="row__text">
                        <span className="row__phrase">{q.answer.phrase}</span>
                        <span className="row__meaning">{q.answer.meaning}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="lab-setup__go">
            <button type="button" className="btn btn--ghost" onClick={() => setQuiz(null)}>Change settings</button>
            <button type="button" className="btn btn--primary" onClick={start}>Run it again</button>
          </div>
        </div>
      </div>
    );
  }

  const q = quiz[index];
  const picked = picks[index];
  const answered = picked !== undefined;
  const cat = CATEGORY_BY_ID[q.answer.category];

  return (
    <div className="page page--narrow">
      <header className="page-head page-head--quiz">
        <p className="eyebrow"><FlaskIcon /> Experiment {index + 1} of {quiz.length}</p>
        <div className="quiz-progress" aria-hidden="true">
          {quiz.map((item, i) => (
            <span key={i} className={i < picks.length ? (picks[i] === item.answer.id ? "ok" : "bad") : i === index ? "now" : ""} />
          ))}
        </div>
      </header>

      <div className="card quiz" data-cat={q.answer.category}>
        {q.kind === "meaning" ? (
          <>
            <p className="quiz__ask">What does this idiom mean?</p>
            <div className="quiz__subject">
              <ElementTile number={q.answer.number} symbol={q.answer.symbol} name={cat.family} category={q.answer.category} size="lg" />
              <p className="quiz__phrase">
                “{q.answer.phrase}”
                {canSpeak && (
                  <button type="button" className="icon-btn" onClick={() => speak(q.answer.phrase)} aria-label="Hear the idiom">
                    <SpeakerIcon />
                  </button>
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="quiz__ask">Which idiom completes the sentence?</p>
            <p className="quiz__sentence"><Blanked example={q.answer.example} /></p>
            <p className="muted small">Tip: the idiom may change form to fit the sentence (for example, “spill” → “spilled”).</p>
          </>
        )}

        <ul className="options">
          {q.options.map((opt) => {
            const isAnswer = opt.id === q.answer.id;
            const state = !answered ? "" : isAnswer ? "correct" : picked === opt.id ? "wrong" : "faded";
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  className={`option ${state}`}
                  disabled={answered}
                  onClick={() => setPicks((p) => { const next = [...p]; next[index] = opt.id; return next; })}
                >
                  {q.kind === "meaning" ? opt.meaning : opt.phrase}
                  {answered && isAnswer && <CheckIcon />}
                  {answered && state === "wrong" && <CloseIcon />}
                </button>
              </li>
            );
          })}
        </ul>

        {answered && (
          <div className={`feedback ${picked === q.answer.id ? "feedback--ok" : "feedback--bad"}`}>
            <p className="feedback__title">{picked === q.answer.id ? "Correct!" : "Not quite."}</p>
            <p>
              <strong>{q.answer.phrase}</strong> — {q.answer.meaning}
            </p>
            <p className="detail__example small">
              {exampleParts(q.answer.example).map((p, i) => (p.mark ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
            </p>
            <button type="button" className="btn btn--primary" onClick={() => setIndex((i) => i + 1)} autoFocus>
              {index + 1 === quiz.length ? "See results" : "Next experiment →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
