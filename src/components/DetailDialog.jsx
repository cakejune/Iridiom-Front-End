import { useEffect, useRef, useState } from "react";
import { CATEGORY_BY_ID, LEVELS, exampleParts, plainExample } from "../data";
import { canSpeak, speak } from "../lib/hooks";
import ElementTile from "./ElementTile";
import { CheckIcon, ChevronLeft, ChevronRight, CloseIcon, LinkIcon, SpeakerIcon } from "./Icons";

export default function DetailDialog({ idiom, isLearned, onToggleLearned, onClose, onPrev, onNext }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (idiom && !dialog.open) dialog.showModal();
    if (!idiom && dialog.open) dialog.close();
  }, [idiom]);

  useEffect(() => setCopied(false), [idiom]);

  useEffect(() => {
    if (!idiom) return undefined;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idiom, onPrev, onNext]);

  const cat = idiom && CATEGORY_BY_ID[idiom.category];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <dialog
      ref={ref}
      className="detail"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="detail-title"
    >
      {idiom && (
        <div className="detail__inner" data-cat={idiom.category} tabIndex={-1} autoFocus>
          <div className="detail__top">
            <ElementTile
              number={idiom.number}
              symbol={idiom.symbol}
              name={cat.family}
              category={idiom.category}
              learned={isLearned}
              size="xl"
            />
            <div className="detail__meta">
              <p className="eyebrow">
                Level {idiom.level} · {LEVELS[idiom.level - 1].name}
              </p>
              <h2 id="detail-title" className="detail__phrase">
                {idiom.phrase}
              </h2>
              <p className="chip-static">
                <span className="swatch" data-cat={idiom.category} /> {cat.label}
              </p>
            </div>
            <button type="button" className="icon-btn detail__close" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          <div className="detail__section">
            <h3 className="eyebrow">Meaning</h3>
            <p className="detail__meaning">{idiom.meaning}</p>
          </div>

          <div className="detail__section">
            <h3 className="eyebrow">Example</h3>
            <p className="detail__example">
              {exampleParts(idiom.example).map((p, i) => (p.mark ? <mark key={i}>{p.text}</mark> : <span key={i}>{p.text}</span>))}
            </p>
          </div>

          {canSpeak && (
            <div className="detail__listen">
              <button type="button" className="btn btn--ghost" onClick={() => speak(idiom.phrase)}>
                <SpeakerIcon /> Hear the idiom
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => speak(plainExample(idiom.example))}>
                <SpeakerIcon /> Hear the example
              </button>
            </div>
          )}

          <div className="detail__actions">
            <button
              type="button"
              className={`btn ${isLearned ? "btn--done" : "btn--primary"}`}
              onClick={onToggleLearned}
              aria-pressed={isLearned}
            >
              <CheckIcon /> {isLearned ? "Learned" : "Mark as learned"}
            </button>
            <button type="button" className="btn btn--ghost" onClick={copyLink}>
              <LinkIcon /> {copied ? "Link copied" : "Copy link"}
            </button>
            <span className="detail__nav">
              <button type="button" className="icon-btn" onClick={onPrev} aria-label="Previous element">
                <ChevronLeft />
              </button>
              <button type="button" className="icon-btn" onClick={onNext} aria-label="Next element">
                <ChevronRight />
              </button>
            </span>
          </div>
        </div>
      )}
    </dialog>
  );
}
