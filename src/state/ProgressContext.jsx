/* ==========================================================================
   ProgressContext: shares the student's progress with every page
   --------------------------------------------------------------------------
   HONESTY NOTE (as the brief requires): progress is stored in this
   browser's localStorage only. It is NOT sent to a server, it is not
   available on other devices, and clearing browser data deletes it.
   `storageAvailable` tells the interface whether saving works at all
   (it can be blocked, e.g. in some private-browsing modes), so the site
   can say so plainly instead of pretending.
   ========================================================================== */
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { emptyProgress, progressReducer, STORAGE_KEY } from "./progress.js";

const ProgressContext = createContext(null);

function storageWorks() {
  try {
    const probe = "__molls_probe__";
    localStorage.setItem(probe, "1");
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    const data = JSON.parse(raw);
    // Basic shape check, so a damaged save can't break the site.
    if (typeof data !== "object" || data === null || data.version !== 1) return emptyProgress();
    return { ...emptyProgress(), ...data };
  } catch {
    return emptyProgress();
  }
}

export function ProgressProvider({ children }) {
  const [storageAvailable] = useState(storageWorks);
  const [state, dispatch] = useReducer(progressReducer, undefined, loadSaved);
  const [saveError, setSaveError] = useState(false);

  // Save after every change.
  useEffect(() => {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSaveError(false);
    } catch {
      setSaveError(true); // e.g. storage full
    }
  }, [state, storageAvailable]);

  const value = useMemo(() => ({ state, dispatch, storageAvailable, saveError }), [state, storageAvailable, saveError]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
