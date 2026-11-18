"""
Charts for statistics worksheets
================================

    chart(0, 6, 0, 20, xstep=1, ystep=5, items=[...], xlabel=..., ylabel=...)
        A graph with a grid and scales in DATA units. Items:
            ("bar", x_centre, height, width, colour)     a bar from 0 up
            ("rect", x0, x1, y0, y1, colour)              any rectangle
            ("points", [(x, y), ...])                     crosses (scatter)
            ("line", [(x, y), ...])                       joined points
            ("line", [(x, y), ...], "dots")               ...with dots
            ("seg", (x, y), (x, y), "dashed")             a single line
            ("text", x, y, "label")                       text at a point
        xcats=[(x, "Mon"), ...] writes category names instead of numbers.
        legend=[(colour, "Boys"), ...] adds a key.
    pie(values, labels)            a pie chart
    pictogram(rows, key_value)     a pictogram with circle symbols
    stem_leaf(rows, key)           a stem-and-leaf diagram
    boxplots(lo, hi, step, boxes)  one or more box plots on a shared scale

Colours are numbers 0-3 (green, blue, orange, purple) so the same data
always looks the same on every sheet.
"""
import math
from reportlab.lib.colors import HexColor

from .text import draw_rich, rich_width
from .draw import INK, GRID

COLOURS = [HexColor("#7fc49b"), HexColor("#8fb4e3"), HexColor("#f2c48d"), HexColor("#c3a6e0")]
MINOR = HexColor("#e3e7ef")
TEXT = 8


def _num(v):
    return (f"{v:g}" if abs(v - round(v)) > 1e-9 else str(int(round(v)))).replace("-", "−")


def chart(x0, x1, y0, y1, xstep=1, ystep=1, items=(), xlabel="", ylabel="", xcats=None, minor=None,
          grid=True, legend=None, xminor=None):
    def fig(c, x, y, w, h):
        L, B, R, T = 36, 30, (80 if legend else 10), 8      # room on the right for a key
        pw, ph = w - L - R, h - B - T
        X = lambda v: x + L + (v - x0) / (x1 - x0) * pw
        Y = lambda v: y + B + (v - y0) / (y1 - y0) * ph
        c.setDash()
        # light minor grid, then the main grid
        if grid:
            for step, col, wid in ((minor, MINOR, 0.35), (ystep, GRID, 0.5)):
                if step:
                    k = 0
                    while y0 + k * step <= y1 + 1e-9:
                        c.setStrokeColor(col)
                        c.setLineWidth(wid)
                        c.line(X(x0), Y(y0 + k * step), X(x1), Y(y0 + k * step))
                        k += 1
            if not xcats:
                for step, col, wid in ((xminor, MINOR, 0.35), (xstep, GRID, 0.5)):
                    if step:
                        k = 0
                        while x0 + k * step <= x1 + 1e-9:
                            c.setStrokeColor(col)
                            c.setLineWidth(wid)
                            c.line(X(x0 + k * step), Y(y0), X(x0 + k * step), Y(y1))
                            k += 1
        # shapes
        for it in items:
            k = it[0]
            if k in ("bar", "rect"):
                if k == "bar":
                    _, xc, ht, bw, col = it
                    r = (xc - bw / 2, xc + bw / 2, 0, ht)
                else:
                    _, a, b, lo, hi, col = it
                    r = (a, b, lo, hi)
                c.setFillColor(COLOURS[col])
                c.setStrokeColor(INK)
                c.setLineWidth(0.8)
                c.rect(X(r[0]), Y(r[2]), X(r[1]) - X(r[0]), Y(r[3]) - Y(r[2]), stroke=1, fill=1)
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.line(X(x0), Y(y0), X(x1), Y(y0))
        c.line(X(x0), Y(y0), X(x0), Y(y1))
        for it in items:
            k = it[0]
            c.setStrokeColor(INK)
            if k == "points":
                c.setLineWidth(1)
                for px, py in it[1]:
                    c.line(X(px) - 2.6, Y(py) - 2.6, X(px) + 2.6, Y(py) + 2.6)
                    c.line(X(px) - 2.6, Y(py) + 2.6, X(px) + 2.6, Y(py) - 2.6)
            elif k == "line":
                c.setLineWidth(1.3)
                pts = it[1]
                p = c.beginPath()
                p.moveTo(X(pts[0][0]), Y(pts[0][1]))
                for px, py in pts[1:]:
                    p.lineTo(X(px), Y(py))
                c.drawPath(p, stroke=1, fill=0)
                if "dots" in it[2:]:
                    c.setFillColor(INK)
                    for px, py in pts:
                        c.circle(X(px), Y(py), 1.8, stroke=0, fill=1)
            elif k == "seg":
                c.setLineWidth(1.2)
                c.setDash(3, 2) if "dashed" in it[3:] else c.setDash()
                c.line(X(it[1][0]), Y(it[1][1]), X(it[2][0]), Y(it[2][1]))
                c.setDash()
            elif k == "text":
                draw_rich(c, X(it[1]) - rich_width(it[3], 8.5, "HeadMedium") / 2, Y(it[2]) - 3, it[3], 8.5, "HeadMedium",
                          HexColor("#1b5aa6"))
        # scales
        c.setFillColor(INK)
        c.setFont("Body", TEXT)
        k = 0
        while y0 + k * ystep <= y1 + 1e-9:
            v = y0 + k * ystep
            c.drawRightString(X(x0) - 3, Y(v) - 2.6, _num(v))
            k += 1
        if xcats:
            for xv, lab in xcats:
                tw = rich_width(lab, TEXT)
                draw_rich(c, X(xv) - tw / 2, Y(y0) - 10, lab, TEXT, "Body", INK)
        else:
            k = 0
            while x0 + k * xstep <= x1 + 1e-9:
                v = x0 + k * xstep
                c.drawCentredString(X(v), Y(y0) - 10, _num(v))
                k += 1
        if xlabel:
            draw_rich(c, X((x0 + x1) / 2) - rich_width(xlabel, 8.5, "HeadMedium") / 2, y + 2, xlabel, 8.5, "HeadMedium", INK)
        if ylabel:
            c.saveState()
            c.translate(x + 8, Y((y0 + y1) / 2))
            c.rotate(90)
            draw_rich(c, -rich_width(ylabel, 8.5, "HeadMedium") / 2, 0, ylabel, 8.5, "HeadMedium", INK)
            c.restoreState()
        if legend:
            lx, ly = X(x1) + 10, Y(y1) - 4
            for i, (col, lab) in enumerate(legend):
                c.setFillColor(COLOURS[col])
                c.setStrokeColor(INK)
                c.rect(lx, ly - 10 - i * 12, 8, 8, stroke=1, fill=1)
                draw_rich(c, lx + 12, ly - 9 - i * 12, lab, 8, "Body", INK)
    return fig


def pie(values, labels, show_angles=False, start=90):
    def fig(c, x, y, w, h):
        r = min(w * 0.32, h / 2 - 8)
        cx, cy = x + r + 12, y + h / 2
        total = sum(values)
        a = start
        for i, (v, lab) in enumerate(zip(values, labels)):
            sweep = -360 * v / total                       # clockwise
            c.setFillColor(COLOURS[i % 4])
            c.setStrokeColor(INK)
            c.setLineWidth(0.9)
            p = c.beginPath()
            p.moveTo(cx, cy)
            p.arcTo(cx - r, cy - r, cx + r, cy + r, a, sweep)
            p.close()
            c.drawPath(p, stroke=1, fill=1)
            mid = math.radians(a + sweep / 2)
            if show_angles:
                t = f"{abs(sweep):g}°"
                draw_rich(c, cx + r * 0.62 * math.cos(mid) - rich_width(t, 8) / 2, cy + r * 0.62 * math.sin(mid) - 3, t, 8,
                          "Body", INK)
            a += sweep
        # key on the right
        for i, lab in enumerate(labels):
            kx, ky = cx + r + 18, cy + r - 6 - i * 14
            c.setFillColor(COLOURS[i % 4])
            c.rect(kx, ky, 9, 9, stroke=1, fill=1)
            draw_rich(c, kx + 13, ky + 1.5, lab, 8.5, "Body", INK)
    return fig


def pictogram(rows, key_value, unit="", blank=False):
    """rows = [(label, value)]; each circle = key_value. Values that aren't
    whole numbers of circles get a half or quarter circle."""
    def fig(c, x, y, w, h):
        rad = 7
        lw = max(rich_width(lab, 9) for lab, _ in rows) + 14
        n = len(rows)
        rh = (h - 26) / n
        for i, (lab, v) in enumerate(rows):
            ry = y + h - (i + 1) * rh + rh / 2
            draw_rich(c, x, ry - 3, lab, 9, "Body", INK)
            c.setStrokeColor(GRID)
            c.line(x + lw - 6, ry - rh / 2, x + lw - 6, ry + rh / 2)
            if blank:
                continue
            full, part = divmod(v / key_value, 1)
            for k in range(int(full) + (1 if part > 1e-9 else 0)):
                cx = x + lw + rad + k * (2 * rad + 4)
                c.setFillColor(COLOURS[0])
                c.setStrokeColor(INK)
                if k < full:
                    c.circle(cx, ry, rad, stroke=1, fill=1)
                else:
                    p = c.beginPath()
                    p.moveTo(cx, ry)
                    p.arcTo(cx - rad, ry - rad, cx + rad, ry + rad, 90, 360 * part)
                    p.close()
                    c.drawPath(p, stroke=1, fill=1)
        # key
        c.setFillColor(COLOURS[0])
        c.circle(x + 8, y + 7, rad, stroke=1, fill=1)
        draw_rich(c, x + 20, y + 4, f"= {key_value} {unit}".strip(), 9, "Body", INK)
    return fig


def stem_leaf(rows, key):
    """rows = [(stem, [leaves])] -> drawn as  stem | l l l, with a key."""
    def fig(c, x, y, w, h):
        rh = 15
        top = y + h - 8
        c.setFillColor(INK)
        for i, (stem, leaves) in enumerate(rows):
            yy = top - (i + 1) * rh
            c.setFont("Body", 11)
            c.drawRightString(x + 28, yy, str(stem))
            for k, lf in enumerate(leaves):
                c.drawString(x + 42 + k * 13, yy, str(lf))
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.line(x + 35, top - 3, x + 35, top - len(rows) * rh - 4)
        draw_rich(c, x, top - len(rows) * rh - 20, f"Key: {key}", 9.5, "Body", INK)
    return fig


def boxplots(lo, hi, step, boxes, xlabel=""):
    """boxes = [(label, minimum, LQ, median, UQ, maximum)]."""
    def fig(c, x, y, w, h):
        L, R, B = 52, 10, 28
        X = lambda v: x + L + (v - lo) / (hi - lo) * (w - L - R)
        n = max(1, len(boxes))          # no boxes = just the scale, to draw on
        bh = min(26, (h - B - 10) / n - 10)
        c.setDash()
        k = 0
        while lo + k * step <= hi + 1e-9:
            v = lo + k * step
            c.setStrokeColor(GRID)
            c.setLineWidth(0.5)
            c.line(X(v), y + B, X(v), y + h)
            c.setFillColor(INK)
            c.setFont("Body", TEXT)
            c.drawCentredString(X(v), y + B - 11, _num(v))
            k += 1
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.line(X(lo), y + B, X(hi), y + B)
        if xlabel:
            draw_rich(c, X((lo + hi) / 2) - rich_width(xlabel, 8.5, "HeadMedium") / 2, y + 2, xlabel, 8.5, "HeadMedium", INK)
        for i, (lab, mn, q1, md, q3, mx) in enumerate(boxes):
            cy = y + h - (i + 0.5) * (h - B) / n
            draw_rich(c, x, cy - 3, lab, 9, "Body", INK)
            c.setStrokeColor(INK)
            c.setLineWidth(1.1)
            c.line(X(mn), cy, X(q1), cy)
            c.line(X(q3), cy, X(mx), cy)
            c.line(X(mn), cy - bh / 3, X(mn), cy + bh / 3)
            c.line(X(mx), cy - bh / 3, X(mx), cy + bh / 3)
            c.setFillColor(COLOURS[i % 4])
            c.rect(X(q1), cy - bh / 2, X(q3) - X(q1), bh, stroke=1, fill=1)
            c.line(X(md), cy - bh / 2, X(md), cy + bh / 2)
    return fig
