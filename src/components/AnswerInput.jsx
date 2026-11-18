/* ==========================================================================
   Answer inputs: one component per kind of answer
   --------------------------------------------------------------------------
   AnswerInput looks at the question type and shows the right control:
     numeric / percentage / fraction / expression → a text box with a
                                                    format tip
     choice  → radio buttons
     order   → a drag-and-drop list (also works with buttons and keyboard)
     match   → a drop-down for each item
   All of them are "controlled": the parent holds the value and receives
   changes through onChange.
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { MathText } from "./ui.jsx";
import styles from "./AnswerInput.module.css";

const TEXT_TIPS = {
  numeric: "Type a number, e.g. 42, −7 or 3.5",
  percentage: "Type a percentage, e.g. 35 or 35%",
  fraction: "Type a fraction with /, e.g. 3/4 (mixed numbers: 1 1/2)",
  expression: "Type algebra, e.g. 5x + 3y. Use ^ for powers: x^2",
};

export default function AnswerInput({ question, value, onChange, disabled, id, onSubmit, label = "Your answer" }) {
  const type = question.type;
  if (type === "choice") return <ChoiceInput question={question} value={value} onChange={onChange} disabled={disabled} id={id} />;
  if (type === "order") return <OrderInput items={value} onChange={onChange} disabled={disabled} />;
  if (type === "match") return <MatchInput question={question} value={value} onChange={onChange} disabled={disabled} id={id} />;

  // Text-based answers
  return (
    <div className={styles.textAnswer}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <div className={styles.textRow}>
        <input
          id={id}
          className={`input ${styles.textInput}`}
          type="text"
          // "text" rather than "number": phone number pads often have no minus sign or slash
          inputMode="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          value={value}
          disabled={disabled}
          aria-describedby={`${id}-tip`}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && onSubmit) { e.preventDefault(); onSubmit(); } }}
        />
        {type === "numeric" && !disabled && (
          // A quick way to type a minus sign on phones
          <button type="button" className="btn btn-secondary btn-small" onClick={() => onChange(value.startsWith("-") || value.startsWith("−") ? value.slice(1) : "−" + value)} aria-label="Toggle minus sign">
            ±
          </button>
        )}
      </div>
      <p id={`${id}-tip`} className={styles.tip}>{TEXT_TIPS[type]}</p>
    </div>
  );
}

function ChoiceInput({ question, value, onChange, disabled, id }) {
  return (
    <fieldset className={styles.choices} disabled={disabled}>
      <legend className="sr-only">Choose one answer</legend>
      {question.options.map((option, i) => (
        <label key={i} className={`${styles.choice} ${String(value) === String(i) ? styles.chosen : ""}`}>
          <input type="radio" name={id} value={i} checked={String(value) === String(i)} onChange={() => onChange(i)} />
          <span className={styles.choiceLabel}><MathText>{option.label}</MathText></span>
          {option.text && <span className={styles.choiceText}>({option.text})</span>}
        </label>
      ))}
    </fieldset>
  );
}

/* Drag-and-drop ordering using Pointer Events (works for mouse, pen and
   touch). Each item also has ↑ and ↓ buttons for keyboard and switch users,
   so dragging is never the only way. */
function OrderInput({ items, onChange, disabled }) {
  const listRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  // Refs hold the latest values for the window listeners below, so they
  // never read out-of-date ("stale") values.
  const itemsRef = useRef(items);
  const draggingRef = useRef(null);
  itemsRef.current = items;

  const move = (from, to) => {
    const list = itemsRef.current;
    if (to < 0 || to >= list.length || from === to) return;
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    itemsRef.current = next;
    onChange(next);
    setAnnouncement(`${item} moved to position ${to + 1} of ${list.length}`);
  };

  // While dragging, listen on the whole window. (Listening only on the
  // handle fails: moving a list item in the page cancels pointer capture.)
  useEffect(() => {
    if (dragging === null) return undefined;
    const onMove = (e) => {
      const rows = [...listRef.current.children];
      // Find which row the pointer is over, by comparing with each row's middle.
      let target = rows.findIndex((row) => {
        const r = row.getBoundingClientRect();
        return e.clientY < r.top + r.height / 2;
      });
      if (target === -1) target = rows.length - 1;
      if (target !== draggingRef.current) {
        move(draggingRef.current, target);
        draggingRef.current = target;
        setDragging(target);
      }
    };
    const onUp = () => { draggingRef.current = null; setDragging(null); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging === null]);

  const onPointerDown = (e, index) => {
    if (disabled) return;
    e.preventDefault();
    draggingRef.current = index;
    setDragging(index);
  };

  return (
    <div>
      <p className={styles.tip}>Drag the items using the ⠿ handle, or use the arrow buttons.</p>
      <ol className={styles.order} ref={listRef}>
        {items.map((item, i) => (
          <li key={item} className={`${styles.orderItem} ${dragging === i ? styles.dragging : ""}`}>
            <span
              className={styles.handle}
              onPointerDown={(e) => onPointerDown(e, i)}
              aria-hidden="true"
            >⠿</span>
            <span className={styles.position}>{i + 1}</span>
            <span className={styles.orderText}><MathText>{item}</MathText></span>
            <span className={styles.orderButtons}>
              <button type="button" className="btn btn-quiet btn-small" disabled={disabled || i === 0} onClick={() => move(i, i - 1)} aria-label={`Move ${item} up`}>↑</button>
              <button type="button" className="btn btn-quiet btn-small" disabled={disabled || i === items.length - 1} onClick={() => move(i, i + 1)} aria-label={`Move ${item} down`}>↓</button>
            </span>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </div>
  );
}

function MatchInput({ question, value, onChange, disabled, id }) {
  return (
    <div className={styles.match}>
      {question.pairs.map((pair, i) => (
        <div key={i} className={styles.matchRow}>
          <span className={styles.matchLeft}><MathText>{pair.left}</MathText></span>
          <span aria-hidden="true" className={styles.matchArrow}>→</span>
          <label className="sr-only" htmlFor={`${id}-m${i}`}>Match for item {i + 1}</label>
          <select
            id={`${id}-m${i}`}
            className="input"
            value={value[i]}
            disabled={disabled}
            onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
          >
            <option value="">Choose…</option>
            {question.choices.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}
