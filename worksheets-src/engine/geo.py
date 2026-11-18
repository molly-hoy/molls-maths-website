"""
Geometry scenes and tables
==========================

`scene()` draws any flat diagram from a list of simple instructions, in
"world" units (any units you like, y pointing up). Everything is scaled
together to fit the box, so angles stay accurate and can be measured.

    scene([
        ("seg", (0, 0), (4, 0)),                    # a line segment
        ("poly", [(0, 0), (4, 0), (1, 3)]),         # a filled shape
        ("angle", (0, 0), (4, 0), (1, 3), "x"),     # mark the angle at (0,0)
        ("label", (1, 3), "A", "N"),                # a letter above a point
    ])

Instructions (p, q are points (x, y)):
    ("seg", p, q)               line; add "dashed" or "thin" as extra words
    ("ray", p, q)               line with an arrowhead at q
    ("poly", pts)               filled, outlined polygon ("nofill" to skip fill,
                                "shade" for a darker fill that shows as shaded)
    ("circle", centre, r)       circle ("fill" to shade it, "solid" to fill it in black)
    ("arc", centre, r, a0, a1)  arc from angle a0 to a1 degrees (anticlockwise);
                                add "thick" to highlight it (also for circles)
    ("sector", centre, r, a0, a1)  filled slice of a circle
    ("angle", v, a, b, text)    marks the angle at v between rays v->a, v->b
                                (the smaller one) with an arc and text; add
                                "reflex" to mark the bigger one instead
    ("right", v, a, b)          a right-angle square at v
    ("ticks", p, q, n)          n equal-side dashes on side p-q
    ("arrows", p, q, n)         n parallel-side arrows on side p-q
    ("side", p, q, text)        text beside side p-q, on the outside ("inside"
                                for the other side, "on" to sit on the line)
    ("label", p, text, dir)     text next to point p; dir is N, NE, E, SE,
                                S, SW, W, NW or C (centred on the point)
    ("dot", p)                  a small solid dot
    ("cross", p)                a small x
    ("north", p, length)        a north line with an arrow and "N"
    ("grid", x0, x1, y0, y1)    light square grid lines (whole numbers)
    ("text", p, text)           free text centred at p
"""
import math
from reportlab.lib.colors import HexColor

from .text import draw_rich, rich_width, draw_rich_centred
from .draw import tick_marks, arrow_marks, right_angle, INK, LABEL, FILL, GRID, LINE_W

DIRS = {"N": (0, 1), "NE": (0.75, 0.75), "E": (1, 0), "SE": (0.75, -0.75), "S": (0, -1),
        "SW": (-0.75, -0.75), "W": (-1, 0), "NW": (-0.75, 0.75), "C": (0, 0)}


def _extent(item):
    """Points that must fit inside the box for this instruction."""
    k = item[0]
    if k in ("seg", "ray", "side", "ticks", "arrows"):
        return [item[1], item[2]]
    if k == "poly":
        return list(item[1])
    if k in ("circle", "arc", "sector"):
        (cx, cy), r = item[1], item[2]
        return [(cx - r, cy - r), (cx + r, cy + r)]
    if k in ("label", "dot", "cross", "text", "angle", "right"):
        return [item[1]]
    if k == "north":
        (x, y), L = item[1], item[2]
        return [(x, y), (x, y + L)]
    if k == "grid":
        return [(item[1], item[3]), (item[2], item[4])]
    return []


def _dir(a, b):
    return math.degrees(math.atan2(b[1] - a[1], b[0] - a[0]))


def scene(items, pad=14, max_scale=None, font_size=10.5):
    def fig(c, x, y, w, h):
        pts = [p for it in items for p in _extent(it)]
        xs, ys = [p[0] for p in pts], [p[1] for p in pts]
        bw, bh = (max(xs) - min(xs)) or 1, (max(ys) - min(ys)) or 1
        s = min((w - 2 * pad) / bw, (h - 2 * pad) / bh)
        if max_scale:
            s = min(s, max_scale)
        ox = x + (w - bw * s) / 2 - min(xs) * s
        oy = y + (h - bh * s) / 2 - min(ys) * s
        T = lambda p: (ox + p[0] * s, oy + p[1] * s)

        def pen(width=LINE_W, dashed=False, colour=INK):
            c.setStrokeColor(colour)
            c.setLineWidth(width)
            c.setLineCap(1)
            c.setLineJoin(1)
            c.setDash(3, 2.5) if dashed else c.setDash()

        def text_at(px, py, text, d="C", colour=LABEL, size=font_size, font="HeadMedium"):
            dx, dy = DIRS[d]
            tw = rich_width(text, size, font)
            gap = 7
            cx = px + dx * (gap + tw / 2)
            cy = py + dy * (gap + size / 2)
            draw_rich(c, cx - tw / 2, cy - size * 0.35, text, size, font, colour)

        # grids first so everything else sits on top
        for it in items:
            if it[0] == "grid":
                _, x0, x1, y0, y1 = it
                pen(0.45, colour=GRID)
                for i in range(int(x0), int(x1) + 1):
                    c.line(*T((i, y0)), *T((i, y1)))
                for j in range(int(y0), int(y1) + 1):
                    c.line(*T((x0, j)), *T((x1, j)))
        for it in items:
            k, extra = it[0], it[1:]
            words = [e for e in extra if isinstance(e, str)]
            if k == "poly":
                pen()
                c.setFillColor(SHADE if "shade" in words else FILL)
                p = c.beginPath()
                q = [T(v) for v in it[1]]
                p.moveTo(*q[0])
                for v in q[1:]:
                    p.lineTo(*v)
                p.close()
                c.drawPath(p, stroke=1, fill=0 if "nofill" in words else 1)
            elif k == "sector":
                _, cen, r, a0, a1 = it[:5]
                pen()
                c.setFillColor(SHADE if "shade" in words else FILL)
                cx, cy = T(cen)
                p = c.beginPath()
                p.moveTo(cx, cy)
                p.arcTo(cx - r * s, cy - r * s, cx + r * s, cy + r * s, a0, a1 - a0)
                p.close()
                c.drawPath(p, stroke=1, fill=1)
            elif k == "circle":
                _, cen, r = it[:3]
                pen(3.2 if "thick" in words else LINE_W)
                c.setFillColor(INK if "solid" in words else FILL)
                c.circle(*T(cen), r * s, stroke=1, fill=1 if ("fill" in words or "solid" in words) else 0)
        for it in items:
            k = it[0]
            words = [e for e in it[1:] if isinstance(e, str)]
            if k in ("seg", "ray"):
                p, q = T(it[1]), T(it[2])
                pen(0.9 if "thin" in words else LINE_W, dashed="dashed" in words)
                c.line(*p, *q)
                if k == "ray":
                    ang = math.atan2(q[1] - p[1], q[0] - p[0])
                    for side in (1, -1):
                        c.line(*q, q[0] - 7 * math.cos(ang + side * 0.4), q[1] - 7 * math.sin(ang + side * 0.4))
            elif k == "arc":
                _, cen, r, a0, a1 = it[:5]
                pen(3.2 if "thick" in words else 1.1, dashed="dashed" in words)
                cx, cy = T(cen)
                p = c.beginPath()
                p.arc(cx - r * s, cy - r * s, cx + r * s, cy + r * s, a0, a1 - a0)
                c.drawPath(p, stroke=1, fill=0)
            elif k == "angle":
                _, v, a, b, label = it[:5]
                d1, d2 = _dir(v, a), _dir(v, b)
                sweep = (d2 - d1) % 360
                if (sweep > 180) != ("reflex" in words):   # smaller angle, unless "reflex"
                    d1, sweep = d2, 360 - sweep
                rad = 13 if sweep > 35 else 20
                if len(it) > 5 and isinstance(it[5], (int, float)):
                    rad = it[5]
                pen(0.9)
                vx, vy = T(v)
                p = c.beginPath()
                p.arc(vx - rad, vy - rad, vx + rad, vy + rad, d1, sweep)
                c.drawPath(p, stroke=1, fill=0)
                if label:
                    mid = math.radians(d1 + sweep / 2)
                    lw = rich_width(label, font_size, "HeadMedium")
                    dist = rad + 5 + lw * 0.45 + max(0, 40 - sweep) * 0.35   # small angles: further out
                    lx, ly = vx + dist * math.cos(mid), vy + dist * math.sin(mid)
                    draw_rich(c, lx - lw / 2, ly - font_size * 0.35, label, font_size, "HeadMedium", LABEL)
            elif k == "right":
                pen(0.9)
                right_angle(c, T(it[1]), T(it[2]), T(it[3]), size=7)
            elif k == "ticks":
                pen(1)
                tick_marks(c, T(it[1]), T(it[2]), it[3])
            elif k == "arrows":
                pen(1)
                arrow_marks(c, T(it[1]), T(it[2]), it[3])
            elif k == "side":
                p, q, text = T(it[1]), T(it[2]), it[3]
                flip = "inside" in it[4:]
                mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
                L = math.hypot(q[0] - p[0], q[1] - p[1]) or 1
                nx, ny = (q[1] - p[1]) / L, -(q[0] - p[0]) / L      # right-hand normal
                if flip:
                    nx, ny = -nx, -ny
                tw = rich_width(text, font_size, "HeadMedium")
                if "on" in it[4:]:
                    # centred ON the line, on a white patch (used for dashed heights)
                    c.setFillColorRGB(1, 1, 1)
                    c.rect(mx - tw / 2 - 2, my - font_size * 0.55, tw + 4, font_size * 1.1, stroke=0, fill=1)
                    draw_rich(c, mx - tw / 2, my - font_size * 0.35, text, font_size, "HeadMedium", LABEL)
                    continue
                off = 6 + abs(nx) * tw / 2 + abs(ny) * font_size / 2
                draw_rich(c, mx + nx * off - tw / 2, my + ny * off - font_size * 0.35, text,
                          font_size, "HeadMedium", LABEL)
            elif k == "label":
                d = it[3] if len(it) > 3 else "NE"
                text_at(*T(it[1]), it[2], d, colour=INK, font="Head")
            elif k == "text":
                text_at(*T(it[1]), it[2], "C", colour=it[3] if len(it) > 3 else LABEL)
            elif k == "dot":
                c.setFillColor(INK)
                c.circle(*T(it[1]), 2.1, stroke=0, fill=1)
            elif k == "cross":
                px, py = T(it[1])
                pen(1.1)
                c.line(px - 3.2, py - 3.2, px + 3.2, py + 3.2)
                c.line(px - 3.2, py + 3.2, px + 3.2, py - 3.2)
            elif k == "north":
                (px, py), L = T(it[1]), it[2] * s
                pen(1.1)
                c.line(px, py, px, py + L)
                c.line(px, py + L, px - 3.5, py + L - 7)
                c.line(px, py + L, px + 3.5, py + L - 7)
                text_at(px, py + L, "N", "N", colour=INK, size=9.5, font="Head")
    return fig


# --------------------------------------------------------------------------
# Tables (frequency tables, data, timetables)
# --------------------------------------------------------------------------
HEAD_FILL = HexColor("#eaf7ef")
SHADE = HexColor("#7fc49b")      # a clearly visible green for "shaded" regions


def table(rows, header=True, size=10.5, col_w=None, row_h=19, side_header=False):
    """Draw a table. rows is a list of lists of text (maths markup allowed).
    header=True shades the first row; side_header=True shades the first
    column (for tables written sideways)."""
    def fig(c, x, y, w, h):
        ncol = max(len(r) for r in rows)
        widths = col_w or [max(rich_width(str(r[i]) if i < len(r) else "", size) for r in rows) + 18
                           for i in range(ncol)]
        rh = row_h + (8 if any("[[" in str(cell) for r in rows for cell in r) else 0)
        tw, th = sum(widths), rh * len(rows)
        x0 = x + max(0, (w - tw) / 2) if col_w is None else x
        top = y + h - max(0, (h - th) / 2)
        c.setLineWidth(0.8)
        c.setStrokeColor(INK)
        c.setDash()
        for ri, r in enumerate(rows):
            cx = x0
            for ci in range(ncol):
                cw = widths[ci]
                cell = str(r[ci]) if ci < len(r) else ""
                shaded = (header and ri == 0) or (side_header and ci == 0)
                c.setFillColor(HEAD_FILL)
                c.rect(cx, top - (ri + 1) * rh, cw, rh, stroke=1, fill=1 if shaded else 0)
                font = "Head" if shaded else "Body"
                tws = rich_width(cell, size if not shaded else size - 0.5, font)
                draw_rich(c, cx + (cw - tws) / 2, top - (ri + 1) * rh + rh / 2 - size * 0.33,
                          cell, size if not shaded else size - 0.5, font, INK)
                cx += cw
    return fig
