/* ==========================================================================
   Layout: wraps every page with the skip link, header and footer
   ========================================================================== */
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProgress } from "../state/ProgressContext.jsx";
import Header from "./Header.jsx";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { storageAvailable, saveError } = useProgress();

  // New page: go back to the top and move keyboard focus to the content.
  // (Effects use a block body { } so they never return a value by accident.)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a href="#main" className={styles.skip}>Skip to main content</a>
      <Header />
      {(!storageAvailable || saveError) && (
        <div className={styles.storageWarning} role="status">
          <div className="container">
            {saveError
              ? "Your progress couldn't be saved (browser storage may be full). Changes in this visit will be lost when you close the page."
              : "This browser isn't allowing the site to save data, so your progress will only last until you close or reload the page."}
          </div>
        </div>
      )}
      <main id="main" tabIndex={-1} className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div>
            <p className={styles.footerTitle}>Moll's Maths</p>
            <p className={styles.small}>A maths course for Years 7 to 11, written for the English National Curriculum and GCSE Mathematics (AQA, Pearson Edexcel and OCR).</p>
          </div>
          <div>
            <p className={styles.footerTitle}>Course</p>
            <ul className={styles.footerLinks}>
              <li><Link to="/curriculum-map">Curriculum map</Link></li>
              <li><Link to="/ks3">KS3 Mathematics</Link></li>
              <li><Link to="/gcse">GCSE Mathematics</Link></li>
              <li><Link to="/practice">Practice questions</Link></li>
            </ul>
          </div>
          <div>
            <p className={styles.footerTitle}>For adults</p>
            <ul className={styles.footerLinks}>
              <li><Link to="/tutor">Tutor and parent view</Link></li>
              <li><Link to="/about">About and accessibility</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className={styles.footerTitle}>Your data</p>
            <p className={styles.small}>Progress is saved only in this browser, on this device. Nothing is sent to a server. <Link to="/about#data">How your data is stored</Link></p>
          </div>
        </div>
      </footer>
    </>
  );
}
