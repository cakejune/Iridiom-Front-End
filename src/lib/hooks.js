import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

// ---------- Storage (always optional: private windows may block it) ----------

export function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the app still works, it just won't remember */
  }
}

export function useStoredState(key, initial) {
  const [value, setValue] = useState(() => readStored(key, typeof initial === "function" ? initial() : initial));
  useEffect(() => writeStored(key, value), [key, value]);
  return [value, setValue];
}

// ---------- Learned idioms ----------

export function useLearned() {
  const [ids, setIds] = useStoredState("iridiom:learned", []);
  const learned = new Set(ids);
  const toggle = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds],
  );
  const addMany = useCallback(
    (more) => setIds((prev) => [...new Set([...prev, ...more])]),
    [setIds],
  );
  return { learned, toggle, addMany };
}

// ---------- Hash routing: #/table/2, #/table/2/26, #/lab, #/about, #/thanks ----------

function subscribeHash(cb) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function parseRoute(hash) {
  const [page = "table", a, b] = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (page === "table") {
    const level = [1, 2, 3].includes(Number(a)) ? Number(a) : 1;
    const number = Number(b) >= 1 && Number(b) <= 118 ? Number(b) : null;
    return { page, level, number };
  }
  if (["lab", "about", "thanks"].includes(page)) return { page };
  return { page: "table", level: 1, number: null };
}

export function useRoute() {
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");
  return parseRoute(hash);
}

export function navigate(path, { replace = false } = {}) {
  const hash = `#/${path}`;
  if (replace) {
    window.history.replaceState(null, "", hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
}

// ---------- Text to speech ----------

export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

export function speak(text) {
  if (!canSpeak) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  const voice = synth.getVoices().find((v) => v.lang === "en-US" && /natural|samantha|google/i.test(v.name))
    ?? synth.getVoices().find((v) => v.lang === "en-US");
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}
