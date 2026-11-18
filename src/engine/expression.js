/* ==========================================================================
   Algebraic expression parser
   --------------------------------------------------------------------------
   Lets students type answers such as  5x + 3y,  3(x+2),  x^2 - 4  or  2ab.
   We must NEVER use JavaScript's eval() on typed text: it would run any
   code a user entered. Instead this file reads the text itself, character
   by character, and builds a small tree describing the maths.

   How it works (a "recursive-descent parser"):
     1. tokenise: "3x+2" → [3, x, +, 2]
     2. parse using the order of operations, one function per level:
          expression = term (+ or − term)*
          term       = factor ((× or ÷ or implied ×) factor)*
          factor     = (−)factor | power
          power      = atom (^ factor)?
          atom       = number | letter | ( expression )
     3. evaluate the tree for given letter values.

   Two expressions are treated as EQUAL if they give the same value for
   several random letter values. (This is how many online maths systems
   check algebra: if 2(x+3) and 2x+6 agree at five random points, they are
   the same expression.)
   ========================================================================== */

function tokenise(text) {
  const s = text
    .replace(/[−–]/g, "-")
    .replace(/[×·*]/g, "*")
    .replace(/÷/g, "/")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3");
  const tokens = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === " ") { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      const num = s.slice(i, j);
      if (!/^(\d+\.?\d*|\.\d+)$/.test(num)) throw new Error(`“${num}” is not a valid number`);
      tokens.push({ type: "num", value: Number(num) });
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      tokens.push({ type: "var", value: c }); // single letters: "ab" means a × b
      i++;
      continue;
    }
    if ("+-*/^()".includes(c)) {
      tokens.push({ type: "op", value: c });
      i++;
      continue;
    }
    throw new Error(`The symbol “${c}” can't be used here`);
  }
  return tokens;
}

export function parseExpression(text) {
  const tokens = tokenise(text);
  if (tokens.length === 0) throw new Error("Type an expression");
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v) => peek()?.type === "op" && peek().value === v;

  function expression() {
    let node = term();
    while (isOp("+") || isOp("-")) {
      const op = tokens[pos++].value;
      node = { op, left: node, right: term() };
    }
    return node;
  }

  function term() {
    let node = factor();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = tokens[pos++].value;
        node = { op, left: node, right: factor() };
      } else if (peek() && (peek().type !== "op" || peek().value === "(")) {
        // Implied multiplication: 3x, 2(x+1), xy, (x+1)(x+2)
        node = { op: "*", left: node, right: factor() };
      } else {
        return node;
      }
    }
  }

  function factor() {
    if (isOp("-")) { pos++; return { op: "neg", arg: factor() }; }
    if (isOp("+")) { pos++; return factor(); }
    return power();
  }

  function power() {
    const base = atom();
    if (isOp("^")) { pos++; return { op: "^", left: base, right: factor() }; }
    return base;
  }

  function atom() {
    const t = tokens[pos++];
    if (!t) throw new Error("The expression seems to end too early");
    if (t.type === "num") return { num: t.value };
    if (t.type === "var") return { v: t.value };
    if (t.value === "(") {
      const inside = expression();
      if (!isOp(")")) throw new Error("A bracket hasn't been closed");
      pos++;
      return inside;
    }
    throw new Error(`Unexpected “${t.value}”`);
  }

  const tree = expression();
  if (pos < tokens.length) throw new Error(`Unexpected “${tokens[pos].value}”`);
  return tree;
}

export function evaluate(node, values) {
  if ("num" in node) return node.num;
  if ("v" in node) {
    if (!(node.v in values)) throw new Error(`Unknown letter “${node.v}”`);
    return values[node.v];
  }
  if (node.op === "neg") return -evaluate(node.arg, values);
  const a = evaluate(node.left, values);
  const b = evaluate(node.right, values);
  switch (node.op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return a / b;
    case "^": return a ** b;
    default: throw new Error("Unknown operation");
  }
}

// All letters used in a tree, e.g. 3x + 2y → ["x", "y"].
export function lettersIn(node, found = new Set()) {
  if ("v" in node) found.add(node.v);
  if (node.arg) lettersIn(node.arg, found);
  if (node.left) lettersIn(node.left, found);
  if (node.right) lettersIn(node.right, found);
  return [...found].sort();
}

// Count the terms at the top level: "5x + 3y − 2" has 3 terms.
// Used to tell a student "equivalent, but not fully simplified".
export function countTerms(node) {
  if (node.op === "+" || node.op === "-") return countTerms(node.left) + countTerms(node.right);
  return 1;
}

// Does the tree still contain brackets that multiply something?
// (After parsing, brackets disappear, so we check for × of a sum.)
export function hasUnexpandedBrackets(node) {
  if (!node || "num" in node || "v" in node) return false;
  if (node.op === "*" && [node.left, node.right].some((n) => n.op === "+" || n.op === "-")) return true;
  return [node.arg, node.left, node.right].some(hasUnexpandedBrackets);
}

/* Are two expressions algebraically the same?
   Tests at 6 sets of values chosen to avoid "lucky" agreements
   (non-integers, both signs). Returns true/false. */
export function equivalent(treeA, treeB) {
  const letters = [...new Set([...lettersIn(treeA), ...lettersIn(treeB)])];
  const trials = [
    [1.37, -2.11, 0.73], [-0.58, 3.29, -1.61], [2.71, 0.43, 1.97],
    [-3.13, -0.87, 2.39], [0.91, 1.53, -2.77], [4.07, -1.29, 0.61],
  ];
  for (const set of trials) {
    const values = {};
    letters.forEach((l, i) => { values[l] = set[i % set.length] + i * 0.17; });
    const a = evaluate(treeA, values);
    const b = evaluate(treeB, values);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (Math.abs(a - b) > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b))) return false;
  }
  return true;
}

// Is the whole expression a product, e.g. (2x + 1)(x − 3) or 3(x + 2)?
// Used to check that an answer is factorised.
export function isProduct(node) {
  if (node.op === "neg") return isProduct(node.arg);
  return node.op === "*" || node.op === "^";
}
