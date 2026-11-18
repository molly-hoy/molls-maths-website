"""
Maths text: fonts, superscripts and line wrapping
=================================================

Worksheet text is written as ordinary strings with a tiny bit of markup,
so question files stay easy to read:

    "x^2"      -> x with a raised, smaller 2        (one character after ^)
    "x^{-1}"   -> x with a raised -1                (curly brackets for more)
    "a_{1}"    -> a with a lowered 1                (subscripts; a plain _ is
                                                     just an underscore, so
                                                     "____" gives a gap line)
    "**Bold**" -> bold text (used for words like NOT in instructions)
    "{{3;−1}}" -> a column vector: 3 above −1 in tall round brackets
    "{.3}"     -> the digit 3 with a recurring-decimal dot above it,
                  e.g. "0.{.1}{.8}" is 0.181818...
    "[[3//4]]" -> a stacked fraction, 3 over 4. Top and bottom can hold
                  maths too: "[[x^2 + 1//2y]]". "2[[1//3]]" is a mixed number.

Write a real minus sign "−" (not the hyphen "-") in questions. The hyphen
looks too short next to numbers. The helper `minus()` below converts for
you if you forget.
"""
import re
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# --------------------------------------------------------------------------
# Fonts. "Body" is a serif that reads well for maths; "Head" is the sans
# serif used for titles and labels. The file paths are where the fonts are
# installed on the build machine. If you build on your own computer, point
# these at any .ttf files you like.
# --------------------------------------------------------------------------
FONT_FILES = {
    "Body": "/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf",
    "BodyBold": "/usr/share/fonts/truetype/crosextra/Caladea-Bold.ttf",
    "BodyItalic": "/usr/share/fonts/truetype/crosextra/Caladea-Italic.ttf",
    "Head": "/usr/share/fonts/truetype/google-fonts/ofl/firasans/FiraSans-SemiBold.ttf",
    "HeadMedium": "/usr/share/fonts/truetype/google-fonts/ofl/firasans/FiraSans-Medium.ttf",
    "HeadRegular": "/usr/share/fonts/truetype/google-fonts/ofl/firasans/FiraSans-Regular.ttf",
    # Caladea has no π, θ, □, ∛, Σ or ⊥, so those few symbols borrow from DejaVu
    "Sym": "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
}
SYMBOLS = set("∅′∪ξπ□∛θ∜Σ⊥≅●")
for _name, _path in FONT_FILES.items():
    pdfmetrics.registerFont(TTFont(_name, _path))

SUP_SCALE = 0.68   # superscripts are 68% of the normal size...
SUP_RISE = 0.38    # ...and raised by 38% of the normal size
SUB_DROP = 0.18    # subscripts are lowered by 18%


def minus(s):
    """Swap hyphen-minus for a proper minus sign, except inside words
    like "3-digit" or "right-angled"."""
    return re.sub(r"(?<![A-Za-z0-9])-(?=[\s\d(a-zA-Z{])", "−", s)


# One "segment" is a run of text drawn in one style: (text, style)
# where style is "n" (normal), "sup", "sub" or "b" (bold).
_TOKEN = re.compile(r"\*\*(.+?)\*\*|\^\{(.+?)\}|\^(.)|_\{(.+?)\}|\[\[(.+?)//(.+?)\]\]|\{\.(\d)\}|\{\{(.+?);(.+?)\}\}")


def segments(text):
    out, pos = [], 0
    for m in _TOKEN.finditer(text):
        if m.start() > pos:
            out.append((text[pos:m.start()], "n"))
        if m.group(1) is not None:
            out.append((m.group(1), "b"))
        elif m.group(2) is not None or m.group(3) is not None:
            out.append((minus(m.group(2) or m.group(3)), "sup"))
        elif m.group(4) is not None:
            out.append((m.group(4), "sub"))
        elif m.group(7) is not None:
            out.append((m.group(7), "dot"))
        elif m.group(8) is not None:
            out.append(((minus(m.group(8)), minus(m.group(9))), "vec"))
        else:
            out.append(((minus(m.group(5)), minus(m.group(6))), "frac"))
        pos = m.end()
    if pos < len(text):
        out.append((text[pos:], "n"))
    return out


def _runs(seg, font):
    """Split text into pieces, sending symbols the main font lacks to "Sym"."""
    out, cur, cur_font = [], "", None
    for ch in seg:
        f = "Sym" if ch in SYMBOLS else font
        if f != cur_font and cur:
            out.append((cur, cur_font))
            cur = ""
        cur, cur_font = cur + ch, f
    if cur:
        out.append((cur, cur_font))
    return out


def _font_for(style, font):
    if style == "b":
        return "BodyBold" if font.startswith("Body") else "Head"
    return font


FRAC_SCALE = 0.86   # numbers in a fraction are a little smaller
FRAC_PAD = 2.5      # the fraction bar sticks out this far each side


def _frac_width(num, den, size):
    s = size * FRAC_SCALE
    return max(rich_width(num, s), rich_width(den, s)) + 2 * FRAC_PAD


def rich_width(text, size, font="Body"):
    """How wide `text` will be when drawn, in points."""
    w = 0
    for seg, style in segments(text):
        if style == "frac":
            w += _frac_width(seg[0], seg[1], size)
            continue
        if style == "vec":
            w += _frac_width(seg[0], seg[1], size) + 9
            continue
        s = size * SUP_SCALE if style in ("sup", "sub") else size
        for run, f in _runs(seg, _font_for(style, font)):
            w += pdfmetrics.stringWidth(run, f, s)
    return w


def draw_rich(c, x, y, text, size, font="Body", color=None):
    """Draw `text` with its baseline at y, starting at x. Returns the width."""
    if color is not None:
        c.setFillColor(color)
    start = x
    for seg, style in segments(text):
        if style == "vec":
            # column vector: two numbers stacked between tall curved brackets
            top, bot = seg
            fs = size * FRAC_SCALE
            fw = _frac_width(top, bot, size)
            mid = y + size * 0.30
            draw_rich(c, x + 4.5 + (fw - rich_width(top, fs)) / 2, mid + fs * 0.22, top, fs, font)
            draw_rich(c, x + 4.5 + (fw - rich_width(bot, fs)) / 2, mid - fs * 0.95, bot, fs, font)
            c.setLineWidth(0.8)
            c.setStrokeColor(c._fillColorObj)
            hgt = size * 1.05
            for bx, d in ((x + 3.5, 1), (x + fw + 5.5, -1)):
                p = c.beginPath()
                p.moveTo(bx, mid + hgt)
                p.curveTo(bx - 3 * d, mid + hgt * 0.4, bx - 3 * d, mid - hgt * 0.4, bx, mid - hgt)
                c.drawPath(p, stroke=1, fill=0)
            x += fw + 10
            continue
        if style == "dot":
            # a digit with a small dot centred above it (recurring decimals)
            f = _font_for("n", font)
            c.setFont(f, size)
            c.drawString(x, y, seg)
            dw = pdfmetrics.stringWidth(seg, f, size)
            c.circle(x + dw / 2, y + size * 0.86, size * 0.07, stroke=0, fill=1)
            x += dw
            continue
        if style == "frac":
            # numerator above a bar, denominator below, both centred
            num, den = seg
            fs = size * FRAC_SCALE
            fw = _frac_width(num, den, size)
            bar = y + size * 0.30
            draw_rich(c, x + (fw - rich_width(num, fs)) / 2, bar + fs * 0.28, num, fs, font)
            draw_rich(c, x + (fw - rich_width(den, fs)) / 2, bar - fs * 0.92, den, fs, font)
            c.setLineWidth(0.7)
            c.setStrokeColor(c._fillColorObj)
            c.line(x + 0.8, bar, x + fw - 0.8, bar)
            x += fw + 1
            continue
        f = _font_for(style, font)
        if style == "sup":
            s, dy = size * SUP_SCALE, size * SUP_RISE
        elif style == "sub":
            s, dy = size * SUP_SCALE, -size * SUB_DROP
        else:
            s, dy = size, 0
        for run, rf in _runs(seg, f):
            c.setFont(rf, s)
            c.drawString(x, y + dy, run)
            x += pdfmetrics.stringWidth(run, rf, s)
    return x - start


def draw_rich_centred(c, x, y, text, size, font="Body", color=None):
    w = rich_width(text, size, font)
    draw_rich(c, x - w / 2, y, text, size, font, color)


def wrap(text, width, size, font="Body"):
    """Split text into lines no wider than `width`. "\\n" forces a new line."""
    lines = []
    # never break a line inside a fraction: hide its spaces from the splitter
    text = re.sub(r"\[\[.*?\]\]", lambda m: m.group(0).replace(" ", "\u00a0"), text)
    for para in text.split("\n"):
        words, line = para.split(" "), ""
        for word in words:
            trial = word if not line else line + " " + word
            if rich_width(trial, size, font) <= width or not line:
                line = trial
            else:
                lines.append(line)
                line = word
        lines.append(line)
    return lines
