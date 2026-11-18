"""
Algebra answers, worked out by the computer
===========================================

Typing hundreds of answers by hand invites mistakes, so for algebra
questions the answer is calculated from the question itself:

    simplify("3a + 2b − a + 4")          ->  "2a + 2b + 4"
    expand("(x + 2)(x − 5)")             ->  "x^2 − 3x − 10"
    expand("(x + 1)^3")                  ->  "x^3 + 3x^2 + 3x + 1"
    divide("12x^2y", "4x")               ->  "3xy"
    evaluate("3a^2 − b", a=2, b=5)       ->  7
    complete_square(1, 6, 2)             ->  "(x + 3)^2 − 7"

It understands numbers, letters, powers (x^2), brackets, brackets
multiplied together, and a bracket raised to a power. Answers use the
same markup as the worksheets (x^2 for powers, [[a//b]] for fractions).

How it works: an expression is stored as a "polynomial", a dictionary
that maps each combination of letters to its number in front, e.g.
3x^2 − 5x + 1 is {x²: 3, x: −5, (no letters): 1}. Adding, multiplying
and powers are then just arithmetic on those dictionaries.
"""
from fractions import Fraction


# --------------------------------------------------------------------------
# Polynomial arithmetic. A "monomial" key is a sorted tuple of
# (letter, power) pairs, e.g. x^2y is (("x", 2), ("y", 1)); a plain number
# has the empty key ().
# --------------------------------------------------------------------------
def _add(p, q):
    r = dict(p)
    for k, v in q.items():
        r[k] = r.get(k, 0) + v
    return r


def _mul_keys(a, b):
    powers = dict(a)
    for v, n in b:
        powers[v] = powers.get(v, 0) + n
    return tuple(sorted((v, n) for v, n in powers.items() if n))


def _mul(p, q):
    r = {}
    for ka, va in p.items():
        for kb, vb in q.items():
            k = _mul_keys(ka, kb)
            r[k] = r.get(k, 0) + va * vb
    return r


def _pow(p, n):
    r = {(): Fraction(1)}
    for _ in range(n):
        r = _mul(r, p)
    return r


# --------------------------------------------------------------------------
# Reading an expression. Grammar (what it understands):
#   expression := [+|-] term { (+|-) term }
#   term       := factor { [×] factor }        (side by side means multiply)
#   factor     := (number | letter | "(" expression ")") [ "^" whole number ]
# --------------------------------------------------------------------------
class _Reader:
    def __init__(self, text):
        self.s = (text.replace("−", "-").replace("×", "*").replace(" ", "")
                  .replace("²", "^2").replace("³", "^3"))
        self.i = 0

    def peek(self):
        return self.s[self.i] if self.i < len(self.s) else ""

    def expression(self):
        total, sign = {}, 1
        while self.peek() in "+-" and self.peek():
            sign = -sign if self.peek() == "-" else sign
            self.i += 1
        total = _add(total, {k: sign * v for k, v in self.term().items()})
        while self.peek() and self.peek() in "+-":
            sign = -1 if self.peek() == "-" else 1
            self.i += 1
            total = _add(total, {k: sign * v for k, v in self.term().items()})
        return total

    def term(self):
        result = self.factor()
        while self.peek() and (self.peek().isalnum() or self.peek() in "(*/"):
            if self.peek() == "/":
                # dividing by a number, e.g. (x + 1)/3
                self.i += 1
                d = self.factor()
                assert list(d) == [()], "can only divide by a number"
                result = {k: v / d[()] for k, v in result.items()}
                continue
            if self.peek() == "*":
                self.i += 1
            result = _mul(result, self.factor())
        return result

    def factor(self):
        ch = self.peek()
        if ch.isdigit():
            j = self.i
            while self.peek() and (self.peek().isdigit() or self.peek() == "."):
                self.i += 1
            base = {(): Fraction(self.s[j:self.i])}
        elif ch.isalpha():
            self.i += 1
            base = {((ch, 1),): Fraction(1)}
        elif ch == "(":
            self.i += 1
            base = self.expression()
            assert self.peek() == ")", f"missing ) in {self.s}"
            self.i += 1
        else:
            raise ValueError(f"can't read {self.s!r} at {self.s[self.i:]!r}")
        if self.peek() == "^":
            self.i += 1
            j = self.i
            while self.peek().isdigit():
                self.i += 1
            base = _pow(base, int(self.s[j:self.i]))
        return base


def parse(text):
    r = _Reader(text)
    p = r.expression()
    assert r.i == len(r.s), f"couldn't read all of {text!r}"
    return p


# --------------------------------------------------------------------------
# Writing an answer back out
# --------------------------------------------------------------------------
def _letters(key):
    # powers of 10 or more need curly brackets: y^{12}
    return "".join(v + ((f"^{p}" if p < 10 else f"^{{{p}}}") if p > 1 else "") for v, p in key)


def _degree(key):
    return sum(p for _, p in key)


def fmt(poly, order="appear"):
    """order="appear": terms in the order they first appear in the question
    (numbers on their own last). order="degree": highest power first
    (x^2 + 5x + 6), the usual way to write an expanded answer."""
    items = [(k, v) for k, v in poly.items() if v != 0]
    if order == "degree":
        # highest total power first; ties go by the power of a, then b, ...
        # so x^3 + 2x^2y − xy^2 − 2y^3 comes out in the usual order
        letters = sorted({v for k, _ in items for v, _ in k})
        items.sort(key=lambda kv: (-_degree(kv[0]), [-dict(kv[0]).get(v, 0) for v in letters]))
    elif order == "appear":
        items = [kv for kv in items if kv[0]] + [kv for kv in items if not kv[0]]
    out = []
    for key, c in items:
        body = _letters(key)
        mag = abs(c)
        if mag.denominator != 1:
            # fractional coefficient: write as a stacked fraction
            text = f"[[{mag.numerator if (mag.numerator != 1 or not body) else ''}{body}//{mag.denominator}]]"
        else:
            text = (str(mag.numerator) if (mag != 1 or not body) else "") + body
        if not out:
            out.append(("−" if c < 0 else "") + text)
        else:
            out.append(("− " if c < 0 else "+ ") + text)
    return " ".join(out) if out else "0"


def simplify(text):
    return fmt(parse(text))


def expand(text, order="degree"):
    return fmt(parse(text), order=order)


def divide(top, bottom):
    """Divide one single term by another, e.g. divide("12x^2y", "4x") -> 3xy.
    Letters left over underneath are written as a fraction."""
    (kt, vt), = [kv for kv in parse(top).items() if kv[1]]
    (kb, vb), = [kv for kv in parse(bottom).items() if kv[1]]
    coeff = vt / vb
    pt, pb = dict(kt), dict(kb)
    up, down = {}, {}
    for v in set(pt) | set(pb):
        n = pt.get(v, 0) - pb.get(v, 0)
        if n > 0:
            up[v] = n
        elif n < 0:
            down[v] = -n
    up_s = _letters(tuple(sorted(up.items())))
    down_s = _letters(tuple(sorted(down.items())))
    sign = "−" if coeff < 0 else ""
    coeff = abs(coeff)
    num = (str(coeff.numerator) if (coeff.numerator != 1 or not up_s) else "") + up_s
    den = (str(coeff.denominator) if (coeff.denominator != 1 or not down_s) else "") + down_s
    if den in ("", "1"):
        return sign + num
    return f"{sign}[[{num}//{den}]]"


def evaluate(text, **values):
    """Substitute numbers for letters and work out the value."""
    total = Fraction(0)
    for key, c in parse(text).items():
        term = c
        for v, p in key:
            term *= Fraction(values[v]) ** p
        total += term
    return total


def num(x):
    """Write a number nicely: 7, −3, [[5//2]], 2.5 stays 2.5 if asked."""
    x = Fraction(x)
    if x.denominator == 1:
        return ("−" if x < 0 else "") + str(abs(x.numerator))
    return ("−" if x < 0 else "") + f"[[{abs(x.numerator)}//{x.denominator}]]"


def solve_linear(equation, var="x"):
    """Solve a linear equation such as "3(x + 2) = x − 4" -> Fraction(-5)."""
    lhs, rhs = equation.split("=")
    p = _add(parse(lhs), {k: -v for k, v in parse(rhs).items()})
    a = p.get(((var, 1),), 0)
    c = p.get((), 0)
    assert a != 0 and all(k in (((var, 1),), ()) for k, v in p.items() if v), f"not linear: {equation}"
    return -c / a


def complete_square(a, b, c, var="x"):
    """a(x + p)^2 + q for ax^2 + bx + c (a = 1 gives (x + p)^2 + q)."""
    a, b, c = Fraction(a), Fraction(b), Fraction(c)
    p = b / (2 * a)
    q = c - a * p * p
    inner = f"({var} {'+' if p >= 0 else '−'} {num(abs(p))})^2" if p else f"{var}^2"
    front = "" if a == 1 else ("−" if a == -1 else num(a))
    out = front + inner
    if q:
        out += f" {'+' if q > 0 else '−'} {num(abs(q))}"
    return out
