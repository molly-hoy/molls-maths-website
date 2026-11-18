"""
Worksheet layout
================

A worksheet is built from a list of "blocks" stacked down the page:

    ws = Worksheet("Collecting like terms", level="Year 7")
    ws.section("Practice")                       # green section label
    ws.parts("Simplify", ["m + m", "3a + 2a"], cols=4)   # (a) (b) (c)...
    ws.figures("Name each shape", [draw_square, draw_circle], cols=4)
    ws.question("A square has sides of 3x. Find its perimeter.",
                answer="12x", figure=draw_fn, fig_w=120, fig_h=80)
    ws.save("public/worksheets/collecting-like-terms.pdf")

Every question carries its answers. `save()` lays the questions out,
moves a block to the next page when it would not fit, and adds an
Answers page at the end.

Measurements are in points (72 points = 1 inch, A4 is 595 x 842).
"""
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from .text import draw_rich, rich_width, wrap, minus

# --------------------------------------------------------------------------
# Colours: the same palette as the website (src/styles/global.css), so the
# worksheets look like they belong to Moll’s Maths.
# --------------------------------------------------------------------------
INK = HexColor("#15203b")
INK_2 = HexColor("#47526b")
INK_3 = HexColor("#6b7489")
LINE = HexColor("#dde2ec")
BRAND = HexColor("#cdeed9")
BRAND_SOFT = HexColor("#eaf7ef")
BRAND_STRONG = HexColor("#1e6b44")

PAGE_W, PAGE_H = A4
MARGIN_X = 48
TOP = PAGE_H - 44           # where the page header starts
BOTTOM = 56                 # nothing is drawn below this (footer lives here)
CONTENT_W = PAGE_W - 2 * MARGIN_X

BODY = 11.5                 # size of question text
LABEL_W = 74                # space for "Question 1" before the instruction
ROW_H = 27                  # height of one row of (a) (b) (c) parts
GAP = 16                    # space between questions


def letter(i):
    """0 -> a, 1 -> b ... 26 -> aa (only needed for very long lists)."""
    return "abcdefghijklmnopqrstuvwxyz"[i] if i < 26 else "a" + "abcdefghijklmnopqrstuvwxyz"[i - 26]


# ==========================================================================
# Blocks. Each one knows its height (measure) and how to draw itself.
# ==========================================================================
class Section:
    """A green label such as "Practice" or "Problem solving"."""
    def __init__(self, name):
        self.name = name

    def measure(self):
        return 30 + 12

    def render(self, c, y):
        h, pad = 26, 14
        w = rich_width(self.name, 13, "Head") + pad * 2
        c.setFillColor(BRAND_SOFT)
        c.setStrokeColor(BRAND)
        c.setLineWidth(1.2)
        c.roundRect(MARGIN_X, y - h, w, h, 8, fill=1, stroke=1)
        draw_rich(c, MARGIN_X + pad, y - h + 8.5, self.name, 13, "Head", BRAND_STRONG)


def _draw_prompt(c, y, number, prompt, width):
    """'Question 3:' on the left, the instruction wrapped beside it.
    Returns the y of the line under the prompt."""
    draw_rich(c, MARGIN_X, y - BODY, f"Question {number}", 10.5, "Head", INK)
    lines = wrap(minus(prompt), width - LABEL_W, BODY)
    lh = _line_h(prompt)
    for i, line in enumerate(lines):
        draw_rich(c, MARGIN_X + LABEL_W, y - BODY - i * lh, line, BODY, "Body", INK)
    return y - BODY - (len(lines) - 1) * lh - 10


def _line_h(prompt):
    return 24 if ("[[" in prompt or "{{" in prompt) else 15


def _prompt_height(prompt, width):
    return BODY + (len(wrap(minus(prompt), width - LABEL_W, BODY)) - 1) * _line_h(prompt) + 10


class Parts:
    """A question with short lettered parts set out in columns.
    A long one can be split across two pages (see `split`)."""
    def __init__(self, prompt, parts, answers, cols, start=0, continued=False, row_h=None):
        self.prompt, self.cols = prompt, cols
        # taller rows when a part has a stacked fraction in it
        self.row_h = row_h or (ROW_H + 9 if any("[[" in p or "{{" in p for p in parts) else ROW_H)
        self.parts = [minus(p) for p in parts]
        self.answers = answers
        self.start = start              # letter of the first part (0 = a)
        self.continued = continued      # True for the second half of a split
        self.number = None

    def rows(self):
        return -(-len(self.parts) // self.cols)        # rounds up

    def _top(self):
        return 4 if self.continued else _prompt_height(self.prompt, CONTENT_W) + 6

    def measure(self):
        return self._top() + self.rows() * self.row_h + GAP - 8

    def split(self, space):
        """Return (this page's piece, next page's piece) to fit `space`,
        or None if fewer than two rows would fit."""
        rows_fit = int((space - self._top() - GAP + 8) // self.row_h)
        if rows_fit < 2 or rows_fit >= self.rows():
            return None
        n = rows_fit * self.cols
        head = Parts(self.prompt, self.parts[:n], self.answers[:n], self.cols, self.start, self.continued, self.row_h)
        tail = Parts(self.prompt, self.parts[n:], self.answers[n:], self.cols, self.start + n, True, self.row_h)
        head.number = tail.number = self.number
        return head, tail

    def render(self, c, y):
        if self.continued:
            y -= 4
        else:
            y = _draw_prompt(c, y, self.number, self.prompt, CONTENT_W) - 6
        col_w = CONTENT_W / self.cols
        for i, part in enumerate(self.parts):
            row, col = divmod(i, self.cols)
            x = MARGIN_X + col * col_w
            base = y - row * self.row_h - BODY - 4 - (self.row_h - ROW_H) / 2
            draw_rich(c, x, base, f"({letter(self.start + i)})", BODY, "Body", INK_2)
            draw_rich(c, x + 22, base, part, BODY, "Body", INK)


class Figures:
    """A question whose parts are pictures, each with an answer line."""
    def __init__(self, prompt, figures, answers, cols, fig_h, answer_line):
        self.prompt, self.figures, self.answers = prompt, figures, answers
        self.cols, self.fig_h, self.answer_line = cols, fig_h, answer_line
        self.number = None

    def cell_h(self):
        return 16 + self.fig_h + (26 if self.answer_line else 6)

    def measure(self):
        rows = -(-len(self.figures) // self.cols)
        return _prompt_height(self.prompt, CONTENT_W) + 4 + rows * self.cell_h() + GAP - 10

    def render(self, c, y):
        y = _draw_prompt(c, y, self.number, self.prompt, CONTENT_W) - 4
        col_w = CONTENT_W / self.cols
        for i, fig in enumerate(self.figures):
            row, col = divmod(i, self.cols)
            x = MARGIN_X + col * col_w
            top = y - row * self.cell_h()
            draw_rich(c, x, top - BODY - 2, f"({letter(i)})", BODY, "Body", INK_2)
            # the picture gets a box below the label, inset a little
            box_x, box_w = x + 24, col_w - 34
            box_y = top - 16 - self.fig_h
            c.saveState()
            fig(c, box_x, box_y, box_w, self.fig_h)
            c.restoreState()
            if self.answer_line:
                c.setStrokeColor(INK_3)
                c.setLineWidth(0.6)
                c.setDash()
                c.line(x + 18, box_y - 16, x + col_w - 14, box_y - 16)


class Question:
    """A worded question, optionally with a diagram and working space."""
    def __init__(self, prompt, answer, figure, fig_w, fig_h, fig_pos, space):
        self.prompt, self.answer = prompt, answer
        self.figure, self.fig_w, self.fig_h, self.fig_pos = figure, fig_w, fig_h, fig_pos
        self.space = space
        self.number = None

    def squeeze(self, avail):
        """If this question only just misses the bottom of the page, give it
        less working space (never less than 40% of what was asked for)
        instead of pushing it onto a page of its own."""
        h = self.measure()
        spare = self.space * 0.6
        if h - avail <= spare and self.space > 0:
            self.space -= (h - avail)
            return True
        return False

    def text_w(self):
        if self.figure and self.fig_pos == "right":
            return CONTENT_W - self.fig_w - 16
        return CONTENT_W

    def measure(self):
        h = _prompt_height(self.prompt, self.text_w())
        if self.figure and self.fig_pos == "right":
            h = max(h + self.space, self.fig_h + 6)
        elif self.figure:
            h += self.fig_h + 10 + self.space
        else:
            h += self.space
        return h + GAP

    def render(self, c, y):
        under = _draw_prompt(c, y, self.number, self.prompt, self.text_w())
        if not self.figure:
            return
        c.saveState()
        if self.fig_pos == "right":
            fx = MARGIN_X + CONTENT_W - self.fig_w
            self.figure(c, fx, y - self.fig_h - 2, self.fig_w, self.fig_h)
        else:
            fx = MARGIN_X + LABEL_W
            self.figure(c, fx, under - self.fig_h - 4, self.fig_w, self.fig_h)
        c.restoreState()


class FigureOnly:
    """A diagram with no question number (e.g. a blank grid to draw on that
    belongs to the question just above it)."""
    def __init__(self, figure, w, h):
        self.figure, self.w, self.h = figure, w, h

    def measure(self):
        return self.h + GAP

    def render(self, c, y):
        c.saveState()
        self.figure(c, MARGIN_X + LABEL_W, y - self.h, self.w, self.h)
        c.restoreState()


# ==========================================================================
# The worksheet itself
# ==========================================================================
class Worksheet:
    def __init__(self, title, level=""):
        self.title, self.level = title, level
        self.blocks = []
        self._q = 0                      # question counter, resets per section

    # ---- adding content ---------------------------------------------------
    def section(self, name):
        self.blocks.append(Section(name))
        self._q = 0

    def _add(self, block):
        self._q += 1
        block.number = self._q
        self.blocks.append(block)

    def parts(self, prompt, parts, answers, cols=4, row_h=None):
        assert len(parts) == len(answers), f"{prompt}: {len(parts)} parts, {len(answers)} answers"
        self._add(Parts(prompt, parts, answers, cols, row_h=row_h))

    def figures(self, prompt, figures, answers, cols=4, fig_h=70, answer_line=True):
        assert len(figures) == len(answers)
        self._add(Figures(prompt, figures, answers, cols, fig_h, answer_line))

    def figure_only(self, figure, w, h):
        self.blocks.append(FigureOnly(figure, w, h))

    def question(self, prompt, answer, figure=None, fig_w=150, fig_h=90,
                 fig_pos="right", space=60):
        self._add(Question(prompt, answer, figure, fig_w, fig_h, fig_pos, space))

    # ---- page furniture ---------------------------------------------------
    def _header(self, c, first):
        c.setFillColor(BRAND_STRONG)
        c.setFont("Head", 8.5)
        # Spaced-out capitals. Character spacing (rather than typing spaces between
        # the letters) keeps the apostrophe snug: MOLL’S MATHS.
        c.saveState()                       # so the spacing doesn't leak into other text
        brand = c.beginText(MARGIN_X, TOP)
        brand.setFont("Head", 8.5)
        brand.setCharSpace(2.2)
        brand.textOut("MOLL’S MATHS")
        c.drawText(brand)
        c.restoreState()
        c.setFillColor(INK_3)
        c.setFont("HeadRegular", 8.5)
        right = "Worksheet" + (f"  ·  {self.level}" if self.level else "")
        c.drawRightString(PAGE_W - MARGIN_X, TOP, right)
        if first:
            draw_rich(c, MARGIN_X, TOP - 34, self.title, 22, "Head", INK)
            c.setFont("HeadRegular", 9.5)
            c.setFillColor(INK_2)
            y = TOP - 58
            x = MARGIN_X
            for label, w in (("Name", 190), ("Class", 90), ("Date", 90)):
                c.drawString(x, y, label)
                lw = c.stringWidth(label, "HeadRegular", 9.5) + 6
                c.setStrokeColor(LINE)
                c.setLineWidth(0.8)
                c.line(x + lw, y - 2, x + lw + w, y - 2)
                x += lw + w + 22
            rule_y = TOP - 72
        else:
            draw_rich(c, MARGIN_X, TOP - 22, self.title, 13, "Head", INK)
            rule_y = TOP - 32
        c.setStrokeColor(BRAND)
        c.setLineWidth(2)
        c.line(MARGIN_X, rule_y, PAGE_W - MARGIN_X, rule_y)
        return rule_y - 20

    def _footer(self, c, page, total):
        c.setFont("HeadRegular", 8)
        c.setFillColor(INK_3)
        c.drawString(MARGIN_X, 32, "© Moll’s Maths")
        c.drawRightString(PAGE_W - MARGIN_X, 32, f"Page {page} of {total}")

    # ---- answers ----------------------------------------------------------
    def _answer_blocks(self):
        """Turn every question's answers into blocks for the Answers pages."""
        out, section = [], None
        for b in self.blocks:
            if isinstance(b, Section):
                section = b.name
                out.append(AnswerHeading(section))
            elif isinstance(b, (Parts, Figures)):
                out.append(AnswerParts(b.number, b.answers))
            elif isinstance(b, FigureOnly):
                continue
            else:
                out.append(AnswerText(b.number, b.answer))
        return out

    # ---- building the PDF -------------------------------------------------
    def _paginate(self, blocks, first_top, later_top):
        """Decide which page each block goes on, and how far down."""
        pages, page, y = [], [], first_top
        queue = list(blocks)
        while queue:
            b = queue.pop(0)
            h = b.measure()
            # keep a section label on the same page as its first question
            need = h
            if isinstance(b, (Section, AnswerHeading)) and queue:
                need += min(queue[0].measure(), 120)
            if y - need < BOTTOM and page and hasattr(b, "squeeze") and b.squeeze(y - BOTTOM):
                h = need = b.measure()
            if y - need < BOTTOM and page:
                pieces = b.split(y - BOTTOM) if hasattr(b, "split") else None
                if pieces:                      # fill this page, carry the rest over
                    page.append((pieces[0], y))
                    queue.insert(0, pieces[1])
                    pages.append(page)
                    page, y = [], later_top
                    continue
                pages.append(page)
                page, y = [], later_top
            page.append((b, y))
            y -= h
        if page:
            pages.append(page)
        return pages

    def save(self, path, pupil_path=None):
        """Write the worksheet PDF (questions, then answers) to `path`.
        If `pupil_path` is given, also write a pupil copy there: exactly the
        same question pages, but with no answer pages. Returns the number of
        pages in the full version."""
        first_top = TOP - 72 - 20
        later_top = TOP - 32 - 20
        # Try the full working space first, then a little less, and keep the
        # most generous version that uses the fewest pages. This stops one
        # last question from spilling onto a page of its own.
        questions = [b for b in self.blocks if isinstance(b, Question)]
        wanted = [q.space for q in questions]
        best = None
        for scale in (1.0, 0.85, 0.7, 0.55):
            for q, sp in zip(questions, wanted):
                q.space = sp * scale
            pages = self._paginate(self.blocks, first_top, later_top)
            if best is None or len(pages) < len(best[1]):
                best = (scale, pages)
        for q, sp in zip(questions, wanted):
            q.space = sp * best[0]
        q_pages = self._paginate(self.blocks, first_top, later_top)
        a_blocks = [AnswerTitle()] + self._answer_blocks()
        a_pages = self._paginate(a_blocks, later_top, later_top)

        self._draw(path, q_pages + a_pages, f"{self.title} – Moll’s Maths worksheet")
        if pupil_path:
            self._draw(pupil_path, q_pages, f"{self.title} – Moll’s Maths worksheet (pupil copy, no answers)")
        return len(q_pages) + len(a_pages)

    def _draw(self, path, pages, pdf_title):
        """Draw a list of laid-out pages into a PDF file."""
        c = canvas.Canvas(path, pagesize=A4)
        c.setTitle(pdf_title)          # shown in the browser tab when the PDF is open
        c.setAuthor("Moll’s Maths")
        for n, page in enumerate(pages, start=1):
            self._header(c, first=(n == 1))
            for block, y in page:
                block.render(c, y)
            self._footer(c, n, len(pages))
            c.showPage()
        c.save()


# ==========================================================================
# Answer-page blocks
# ==========================================================================
ANS = 10.5


class AnswerTitle:
    def measure(self):
        return 34

    def render(self, c, y):
        draw_rich(c, MARGIN_X, y - 18, "Answers", 18, "Head", BRAND_STRONG)


class AnswerHeading:
    def __init__(self, name):
        self.name = name

    def measure(self):
        return 24

    def render(self, c, y):
        draw_rich(c, MARGIN_X, y - 12, self.name, 11.5, "Head", BRAND_STRONG)
        c.setStrokeColor(LINE)
        c.setLineWidth(0.8)
        c.line(MARGIN_X, y - 17, PAGE_W - MARGIN_X, y - 17)


class AnswerParts:
    def __init__(self, number, answers):
        self.number = number
        self.answers = [minus(a) for a in answers]
        widest = max(rich_width(a, ANS) for a in self.answers) + 26
        usable = CONTENT_W - LABEL_W
        self.cols = max(1, min(5, int(usable // (widest + 10))))
        self.col_w = usable / self.cols
        self.row = 24 if any("[[" in a or "{{" in a for a in self.answers) else 16

    def _lines(self):
        """Long answers in a single column may need wrapping."""
        if self.cols > 1:
            return None
        return [wrap(a, CONTENT_W - LABEL_W - 26, ANS) for a in self.answers]

    def measure(self):
        lines = self._lines()
        if lines:
            return sum(len(l) for l in lines) * self.row * 14 // 16 + 8
        return -(-len(self.answers) // self.cols) * self.row + 8

    def render(self, c, y):
        draw_rich(c, MARGIN_X, y - ANS, f"Question {self.number}", 9.5, "Head", INK_2)
        lines = self._lines()
        if lines:
            yy = y
            for i, ls in enumerate(lines):
                draw_rich(c, MARGIN_X + LABEL_W, yy - ANS, f"({letter(i)})", ANS, "Body", INK_2)
                for l in ls:
                    draw_rich(c, MARGIN_X + LABEL_W + 26, yy - ANS, l, ANS, "Body", INK)
                    yy -= self.row * 14 // 16
            return
        for i, a in enumerate(self.answers):
            row, col = divmod(i, self.cols)
            x = MARGIN_X + LABEL_W + col * self.col_w
            yy = y - row * self.row - ANS - (self.row - 16) / 3
            draw_rich(c, x, yy, f"({letter(i)})", ANS, "Body", INK_2)
            draw_rich(c, x + 22, yy, a, ANS, "Body", INK)


class AnswerText:
    def __init__(self, number, answer):
        self.number = number
        self.lines = wrap(minus(answer), CONTENT_W - LABEL_W, ANS)
        self.lh = 22 if ("[[" in answer or "{{" in answer) else 14

    def measure(self):
        return len(self.lines) * self.lh + 8

    def render(self, c, y):
        draw_rich(c, MARGIN_X, y - ANS, f"Question {self.number}", 9.5, "Head", INK_2)
        for i, l in enumerate(self.lines):
            draw_rich(c, MARGIN_X + LABEL_W, y - ANS - i * self.lh - (self.lh - 14) / 3, l, ANS, "Body", INK)
