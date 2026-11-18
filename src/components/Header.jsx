/* ==========================================================================
   Site header and navigation
   --------------------------------------------------------------------------
   The menu has six items. Four of them are drop-downs that group related
   pages, so the bar stays short and tidy:

     Home | Learn ▾ | Practise ▾ | Revision ▾ | My progress | About ▾

   On wide screens the drop-downs open as panels under the bar. On narrow
   screens (phones and small tablets) a "Menu" button opens one panel with
   every page, grouped under the same headings.

   HOW TO CHANGE THE MENU: edit the NAV list just below. Nothing else needs
   to change. Each top-level item is either:
     • a single link:  { to: "/progress", label: "My progress" }
     • a drop-down:    { label: "Learn", sections: [ ... ] }
   A drop-down holds one or more sections. Each section has an optional
   small heading and a list of links. A link can have a "hint": the short
   grey description shown under it.

   ACCESSIBILITY: each drop-down is opened by a real <button> that tells
   screen readers whether it is expanded. With the keyboard you can open it
   with Enter, Space or the Down arrow, move between links with the Up and
   Down arrows, and close it with Escape (which puts you back on the button).
   It also closes when you click elsewhere or go to a new page.
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export const NAV = [
  { to: "/", label: "Home", end: true },
  {
    label: "Learn",
    wide: true,                       // this panel shows its sections side by side
    sections: [
      {
        heading: "Year groups",
        links: [
          { to: "/year/7", label: "Year 7" },
          { to: "/year/8", label: "Year 8" },
          { to: "/year/9", label: "Year 9" },
          { to: "/year/10", label: "Year 10" },
          { to: "/year/11", label: "Year 11" },
        ],
      },
      {
        heading: "Courses",
        links: [
          { to: "/ks3", label: "KS3 Mathematics", hint: "Years 7 to 9" },
          { to: "/gcse", label: "GCSE Mathematics", hint: "Years 10 and 11" },
          { to: "/curriculum-map", label: "Curriculum map", hint: "Every unit on one page" },
        ],
      },
    ],
  },
  {
    label: "Practise",
    sections: [
      {
        links: [
          { to: "/practice", label: "Practice questions", hint: "Answer online and get instant feedback" },
          { to: "/worksheets", label: "Worksheets", hint: "Printable PDFs with answers" },
          { to: "/assessments", label: "Quizzes and assessments", hint: "Check what you've learned" },
        ],
      },
    ],
  },
  {
    label: "Revision",
    sections: [
      {
        links: [
          { to: "/revision/foundation", label: "Foundation revision", hint: "GCSE Foundation tier" },
          { to: "/revision/higher", label: "Higher revision", hint: "GCSE Higher tier" },
          { to: "/revision/planner", label: "Revision planner", hint: "Plan your weeks before the exams" },
        ],
      },
    ],
  },
  { to: "/progress", label: "My progress" },
  {
    label: "About",
    alignRight: true,                 // opens leftwards so it doesn't run off the screen
    sections: [
      {
        links: [
          { to: "/about", label: "About Moll's Maths" },
          { to: "/contact", label: "Contact" },
        ],
      },
    ],
  },
];

// Every link inside a drop-down, in order (used to light up the drop-down
// button when you are on one of its pages).
const linksOf = (item) => item.sections.flatMap((s) => s.links);

// Is this page the link's page, or a page inside it (e.g. /year/7/...)?
const isOn = (pathname, to) => pathname === to || pathname.startsWith(to + "/");

const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`;

/* --------------------------------------------------------------------------
   One drop-down (wide screens)
   -------------------------------------------------------------------------- */
function Dropdown({ item, pathname }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);         // the whole drop-down: button + panel
  const buttonRef = useRef(null);
  const active = linksOf(item).some((l) => isOn(pathname, l.to));

  // The links currently in the open panel, so the arrow keys can move between them
  const menuLinks = () => [...(ref.current?.querySelectorAll("[data-menu-link]") ?? [])];

  // While open: close on a click outside, or on Escape
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();      // put keyboard users back where they were
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close when the page changes (after a link is clicked)
  useEffect(() => { setOpen(false); }, [pathname]);

  // Down arrow on the button opens the panel and jumps to the first link
  const onButtonKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => menuLinks()[0]?.focus());   // wait one frame for the panel to appear
    }
  };

  // Up/Down arrows move between links; Tab past the last link closes the panel
  const onMenuKey = (e) => {
    const links = menuLinks();
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); links[(i + 1) % links.length]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); links[(i - 1 + links.length) % links.length]?.focus(); }
    if (e.key === "Tab" && !e.shiftKey && i === links.length - 1) setOpen(false);
  };

  const panelId = `menu-${item.label.toLowerCase()}`;

  return (
    <li className={styles.dropdown} ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.link} ${active ? styles.active : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
      >
        {item.label}
        <span aria-hidden="true" className={`${styles.caret} ${open ? styles.caretOpen : ""}`}>▾</span>
      </button>

      {open && (
        <div
          id={panelId}
          className={`${styles.menu} ${item.wide ? styles.menuWide : ""} ${item.alignRight ? styles.menuRight : ""}`}
          onKeyDown={onMenuKey}
        >
          {item.sections.map((section, si) => (
            <div key={si} className={styles.menuSection}>
              {section.heading && <p className={styles.menuHeading}>{section.heading}</p>}
              <ul className={styles.menuList}>
                {section.links.map((l) => (
                  <li key={l.to}>
                    <NavLink to={l.to} className={linkClass} data-menu-link="">
                      <span className={styles.menuText}>
                        <span>{l.label}</span>
                        {l.hint && <span className={styles.hint}>{l.hint}</span>}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

/* --------------------------------------------------------------------------
   The header
   -------------------------------------------------------------------------- */
export default function Header() {
  const { pathname } = useLocation();
  const [panelOpen, setPanelOpen] = useState(false);   // the phone menu

  // Close the phone menu when the page changes, or on Escape
  useEffect(() => { setPanelOpen(false); }, [pathname]);
  useEffect(() => {
    if (!panelOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setPanelOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logo} aria-label="Moll's Maths home">
          <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#cdeed9" stroke="#8cc9a4" />
            <path d="M8 23 V9 L16 18 L24 9 V23" stroke="#123c26" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Moll's <span className={styles.logoMaths}>Maths</span></span>
        </Link>

        {/* ---- Wide screens: the bar with drop-downs ---- */}
        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.list}>
            {NAV.map((item) => item.sections
              ? <Dropdown key={item.label} item={item} pathname={pathname} />
              : (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={linkClass}>{item.label}</NavLink>
                </li>
              ))}
          </ul>
        </nav>

        {/* ---- Narrow screens: one "Menu" button ---- */}
        <button
          type="button"
          className={`btn btn-secondary btn-small ${styles.menuButton}`}
          aria-expanded={panelOpen}
          aria-controls="mobile-nav"
          onClick={() => setPanelOpen((o) => !o)}
        >
          {panelOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* The phone menu: every page, under the same group names as the bar */}
      {panelOpen && (
        <nav id="mobile-nav" aria-label="Main" className={styles.panel}>
          <div className="container">
            <ul className={styles.panelList}>
              {NAV.map((item) => item.sections ? (
                <li key={item.label} className={styles.panelGroup}>
                  <span className={styles.groupLabel}>{item.label}</span>
                  {item.sections.map((section, si) => (
                    <div key={si}>
                      {section.heading && <span className={styles.subLabel}>{section.heading}</span>}
                      <ul className={styles.panelSub}>
                        {section.links.map((l) => (
                          <li key={l.to}><NavLink to={l.to} className={linkClass}>{l.label}</NavLink></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              ) : (
                <li key={item.to}><NavLink to={item.to} end={item.end} className={linkClass}>{item.label}</NavLink></li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
