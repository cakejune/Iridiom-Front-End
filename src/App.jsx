import { useEffect } from "react";
import AboutPage from "./components/AboutPage";
import { FlaskIcon, MoonIcon, SunIcon } from "./components/Icons";
import LabPage from "./components/LabPage";
import TablePage from "./components/TablePage";
import ThanksPage from "./components/ThanksPage";
import { useLearned, useRoute, useStoredState } from "./lib/hooks";

function ThemeToggle() {
  const [theme, setTheme] = useStoredState("iridiom:theme", null);
  useEffect(() => {
    if (theme) document.documentElement.dataset.theme = theme;
    else delete document.documentElement.dataset.theme;
  }, [theme]);
  const dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export default function App() {
  const route = useRoute();
  const { learned, toggle, addMany } = useLearned();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route.page]);

  const tableHref = `#/table/${route.level ?? 1}`;

  return (
    <div className="app">
      <a className="skip" href="#main">Skip to content</a>
      <header className="masthead">
        <a href="#/table/1" className="brand" aria-label="Iridiom home">
          <span className="brand__tile" aria-hidden="true">
            <span className="brand__num">77</span>
            <span className="brand__sym">Ir</span>
          </span>
          <span className="brand__text">
            <span className="brand__name">Iridiom</span>
            <span className="brand__tag">The Periodic Table of English Idioms</span>
          </span>
        </a>
        <nav className="mainnav" aria-label="Main">
          <a href={tableHref} aria-current={route.page === "table" ? "page" : undefined}>Table</a>
          <a href="#/lab" aria-current={route.page === "lab" ? "page" : undefined}><FlaskIcon /> Lab</a>
          <a href="#/about" aria-current={route.page === "about" ? "page" : undefined}>About</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main">
        {route.page === "table" && <TablePage level={route.level} number={route.number} learned={learned} toggleLearned={toggle} />}
        {route.page === "lab" && <LabPage learned={learned} addLearned={addMany} />}
        {route.page === "about" && <AboutPage />}
        {route.page === "thanks" && <ThanksPage />}
      </main>

      <footer className="footer">
        <span>
          Iridiom · 354 idioms in 3 tables · Created by{" "}
          <a href="https://www.instagram.com/cake_june/" target="_blank" rel="noopener noreferrer">Cake June</a>
        </span>
        <span>
          <a href="#/about">How it works</a> · <a href="#/thanks">Special thanks</a>
        </span>
      </footer>
    </div>
  );
}
