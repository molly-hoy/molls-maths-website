"""
Drawing helpers for diagrams
============================

Every figure on a worksheet is a function `fig(c, x, y, w, h)` that draws
inside the box whose bottom-left corner is (x, y), w wide and h high.
The helpers here build those functions for you, so a question file can say

    shape2d(polygon_pts(6))              # a regular hexagon
    shape2d(SQUARE, ticks=[1,1,1,1], right_angles=[0,1,2,3])
    solid("cube")                        # a 3D cube with hidden edges dashed

and the shape is scaled and centred to fit whatever box it is given.
"""
import math
from reportlab.lib.colors import HexColor

from .text import draw_rich_centred

INK = HexColor("#15203b")
LABEL = HexColor("#1b5aa6")      # side labels in blue, like a teacher's pen
FILL = HexColor("#eaf7ef")       # pale brand green inside shapes
LINE_W = 1.3


# --------------------------------------------------------------------------
# Fitting: take points in any units and scale them into the box.
# --------------------------------------------------------------------------
def fit(points, x, y, w, h, pad=6, max_scale=None):
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    bw, bh = (max(xs) - min(xs)) or 1, (max(ys) - min(ys)) or 1
    s = min((w - 2 * pad) / bw, (h - 2 * pad) / bh)
    if max_scale:
        s = min(s, max_scale)
    ox = x + (w - bw * s) / 2 - min(xs) * s
    oy = y + (h - bh * s) / 2 - min(ys) * s
    return lambda p: (ox + p[0] * s, oy + p[1] * s), s


def polygon_pts(n, rotation=None):
    """Corners of a regular n-sided polygon, flat edge at the bottom."""
    if rotation is None:
        rotation = -math.pi / 2 - math.pi / n      # puts one side flat at the bottom
    return [(math.cos(rotation + 2 * math.pi * k / n), math.sin(rotation + 2 * math.pi * k / n))
            for k in range(n)]


def _path(c, pts, close=True, fill=True):
    p = c.beginPath()
    p.moveTo(*pts[0])
    for q in pts[1:]:
        p.lineTo(*q)
    if close:
        p.close()
    c.drawPath(p, stroke=1, fill=1 if fill else 0)


def _style(c, dashed=False, width=LINE_W):
    c.setStrokeColor(INK)
    c.setFillColor(FILL)
    c.setLineWidth(width)
    c.setLineJoin(1)
    c.setLineCap(1)
    if dashed:
        c.setDash(3, 2.5)
    else:
        c.setDash()


# --------------------------------------------------------------------------
# Marks that show equal sides, parallel sides and right angles
# --------------------------------------------------------------------------
def tick_marks(c, a, b, n, size=4.5):
    """n small strokes across the middle of side a-b (equal sides)."""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L            # along the side
    nx, ny = -uy, ux                   # across the side
    c.setDash()
    c.setLineWidth(1)
    for k in range(n):
        off = (k - (n - 1) / 2) * 3.2
        cx, cy = mx + ux * off, my + uy * off
        c.line(cx - nx * size, cy - ny * size, cx + nx * size, cy + ny * size)


def arrow_marks(c, a, b, n, size=4.5):
    """n little arrowheads on side a-b (parallel sides)."""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy)
    ux, uy = dx / L, dy / L
    # Parallel sides must have arrows pointing the same way, so always
    # point right (or up, for a vertical side), whichever way we walked.
    if ux < -1e-9 or (abs(ux) < 1e-9 and uy < 0):
        ux, uy = -ux, -uy
    nx, ny = -uy, ux
    c.setDash()
    c.setLineWidth(1)
    for k in range(n):
        off = (k - (n - 1) / 2) * 4.5 + 2
        tx, ty = mx + ux * off, my + uy * off
        c.line(tx, ty, tx - ux * size + nx * size * 0.75, ty - uy * size + ny * size * 0.75)
        c.line(tx, ty, tx - ux * size - nx * size * 0.75, ty - uy * size - ny * size * 0.75)


def right_angle(c, corner, a, b, size=6):
    """A small square in the corner between rays corner->a and corner->b."""
    def unit(p):
        dx, dy = p[0] - corner[0], p[1] - corner[1]
        L = math.hypot(dx, dy)
        return dx / L, dy / L
    u, v = unit(a), unit(b)
    p1 = (corner[0] + u[0] * size, corner[1] + u[1] * size)
    p3 = (corner[0] + v[0] * size, corner[1] + v[1] * size)
    p2 = (p1[0] + v[0] * size, p1[1] + v[1] * size)
    c.setDash()
    c.setLineWidth(0.9)
    c.line(*p1, *p2)
    c.line(*p2, *p3)


def side_label(c, a, b, text, pts, size=10.5, gap=9):
    """Write `text` beside side a-b, on the outside of the shape."""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
    cx = sum(p[0] for p in pts) / len(pts)
    cy = sum(p[1] for p in pts) / len(pts)
    dx, dy = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dy)
    nx, ny = -dy / L, dx / L
    if (mx - cx) * nx + (my - cy) * ny < 0:      # flip so it points outward
        nx, ny = -nx, -ny
    lx, ly = mx + nx * gap, my + ny * gap
    c.setFillColor(LABEL)
    draw_rich_centred(c, lx + nx * 6, ly - size / 3 + ny * 2, text, size, "HeadMedium", LABEL)


# --------------------------------------------------------------------------
# 2D shapes
# --------------------------------------------------------------------------
def shape2d(points, ticks=None, arrows=None, right_angles=None, labels=None,
            fill=True, max_scale=None, pad=8):
    """A polygon. ticks/arrows give a count for each side (side i joins
    point i to point i+1); right_angles lists corner numbers; labels gives
    text for each side (None to skip)."""
    def fig(c, x, y, w, h):
        # leave room round the shape for side labels, but not too much
        to, _ = fit(points, x, y, w, h, pad=(16 if labels else pad), max_scale=max_scale)
        pts = [to(p) for p in points]
        n = len(pts)
        _style(c)
        _path(c, pts, fill=fill)
        c.setStrokeColor(INK)
        for i in range(n):
            a, b = pts[i], pts[(i + 1) % n]
            if ticks and ticks[i]:
                tick_marks(c, a, b, ticks[i])
            if arrows and arrows[i]:
                arrow_marks(c, a, b, arrows[i])
            if labels and labels[i]:
                side_label(c, a, b, labels[i], pts)
        for k in right_angles or []:
            right_angle(c, pts[k], pts[k - 1], pts[(k + 1) % n])
    return fig


def circle_fig(kind="circle"):
    """circle, semicircle, quarter, oval."""
    def fig(c, x, y, w, h):
        _style(c)
        cx, cy = x + w / 2, y + h / 2
        if kind == "circle":
            r = min(w, h) / 2 - 8
            c.circle(cx, cy, r, stroke=1, fill=1)
        elif kind == "oval":
            rx, ry = min(w / 2 - 6, h * 0.8), min(h / 2 - 8, w * 0.28)
            c.ellipse(cx - rx, cy - ry, cx + rx, cy + ry, stroke=1, fill=1)
        elif kind == "semicircle":
            r = min(w / 2 - 6, h - 16)
            base = cy - r / 2
            p = c.beginPath()
            p.moveTo(cx - r, base)
            p.arcTo(cx - r, base - r, cx + r, base + r, 0, 180)
            p.close()
            c.drawPath(p, stroke=1, fill=1)
        elif kind == "quarter":
            r = min(w, h) - 16
            ox, oy = cx - r / 2, cy - r / 2
            p = c.beginPath()
            p.moveTo(ox, oy)
            p.lineTo(ox + r, oy)
            p.arcTo(ox - r, oy - r, ox + r, oy + r, 0, 90)
            p.close()
            c.drawPath(p, stroke=1, fill=1)
    return fig


# --------------------------------------------------------------------------
# 3D solids
# --------------------------------------------------------------------------
# Solids with flat faces are described by their corners (x, y, z) and their
# faces. They are drawn in "oblique projection": the front face is drawn
# true shape and depth (z) goes back and up to the right at 35°, shortened
# by half. A face pointing away from us is hidden, and an edge is drawn
# dashed when every face touching it is hidden.
DEPTH_K, DEPTH_ANGLE = 0.5, math.radians(35)
VIEW = (-DEPTH_K * math.cos(DEPTH_ANGLE), -DEPTH_K * math.sin(DEPTH_ANGLE), 1.0)


def project(p):
    x, y, z = p
    return (x + DEPTH_K * z * math.cos(DEPTH_ANGLE), y + DEPTH_K * z * math.sin(DEPTH_ANGLE))


def _sub(a, b):
    return (a[0] - b[0], a[1] - b[1], a[2] - b[2])


def _cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def _dot(a, b):
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def polyhedron(verts, faces):
    def fig(c, x, y, w, h):
        flat = [project(v) for v in verts]
        to, _ = fit(flat, x, y, w, h, pad=6)
        centre = tuple(sum(v[i] for v in verts) / len(verts) for i in range(3))
        visible = []
        for f in faces:
            a, b, d = verts[f[0]], verts[f[1]], verts[f[2]]
            n = _cross(_sub(b, a), _sub(d, a))
            if _dot(n, _sub(a, centre)) < 0:         # make normal point outwards
                n = (-n[0], -n[1], -n[2])
            visible.append(_dot(n, VIEW) < -1e-9)
        # pale fill on the faces we can see
        for f, vis in zip(faces, visible):
            if vis:
                c.setFillColor(FILL)
                c.setStrokeColor(FILL)
                c.setLineWidth(0.1)
                p = c.beginPath()
                pts = [to(flat[i]) for i in f]
                p.moveTo(*pts[0])
                for q in pts[1:]:
                    p.lineTo(*q)
                p.close()
                c.drawPath(p, stroke=0, fill=1)
        # collect edges and whether any visible face uses them
        edges = {}
        for f, vis in zip(faces, visible):
            for i in range(len(f)):
                e = tuple(sorted((f[i], f[(i + 1) % len(f)])))
                edges[e] = edges.get(e, False) or vis
        for (i, j), vis in sorted(edges.items(), key=lambda kv: kv[1]):
            _style(c, dashed=not vis, width=LINE_W if vis else 1)
            c.line(*to(flat[i]), *to(flat[j]))
    return fig


def prism(base2d, length):
    """Prism with the cross-section `base2d` on the front face."""
    n = len(base2d)
    verts = [(px, py, 0) for px, py in base2d] + [(px, py, length) for px, py in base2d]
    faces = [list(range(n)), list(range(n, 2 * n))]
    faces += [[i, (i + 1) % n, n + (i + 1) % n, n + i] for i in range(n)]
    return polyhedron(verts, faces)


def pyramid(base_pts_xz, height):
    """Pyramid on a flat base lying in the ground (y = 0)."""
    n = len(base_pts_xz)
    cx = sum(p[0] for p in base_pts_xz) / n
    cz = sum(p[1] for p in base_pts_xz) / n
    verts = [(px, 0, pz) for px, pz in base_pts_xz] + [(cx, height, cz)]
    faces = [list(range(n))] + [[i, (i + 1) % n, n] for i in range(n)]
    return polyhedron(verts, faces)


def _ellipse_arc(c, to, cx, cy, rx, ry, a0, a1, dashed, steps=40):
    """Part of an ellipse (in projected units), from angle a0 to a1."""
    _style(c, dashed=dashed, width=1 if dashed else LINE_W)
    p = c.beginPath()
    for k in range(steps + 1):
        t = a0 + (a1 - a0) * k / steps
        pt = to((cx + rx * math.cos(t), cy + ry * math.sin(t)))
        if k == 0:
            p.moveTo(*pt)
        else:
            p.lineTo(*pt)
    c.drawPath(p, stroke=1, fill=0)


def _fill_poly(c, pts):
    c.setFillColor(FILL)
    p = c.beginPath()
    p.moveTo(*pts[0])
    for q in pts[1:]:
        p.lineTo(*q)
    p.close()
    c.drawPath(p, stroke=0, fill=1)


def round_solid(kind):
    """cylinder, cone, sphere, hemisphere – drawn the way you would by hand."""
    r, ry = 1.0, 0.32                      # ellipse for circular faces seen at an angle
    pi = math.pi

    def ell(cx, cy, a0, a1, n=40):
        return [(cx + r * math.cos(a0 + (a1 - a0) * k / n), cy + ry * math.sin(a0 + (a1 - a0) * k / n))
                for k in range(n + 1)]

    def fig(c, x, y, w, h):
        if kind == "cylinder":
            H = 1.9
            box = [(-r, -ry), (r, -ry), (r, H + ry), (-r, H + ry)]
            to, _ = fit(box, x, y, w, h, pad=6)
            _fill_poly(c, [to(p) for p in ell(0, 0, pi, 2 * pi) + ell(0, H, 0, pi)])
            _fill_poly(c, [to(p) for p in ell(0, H, 0, 2 * pi)])
            _ellipse_arc(c, to, 0, 0, r, ry, 0, pi, True)
            _ellipse_arc(c, to, 0, 0, r, ry, pi, 2 * pi, False)
            _ellipse_arc(c, to, 0, H, r, ry, 0, 2 * pi, False)
            _style(c)
            c.line(*to((-r, 0)), *to((-r, H)))
            c.line(*to((r, 0)), *to((r, H)))
        elif kind == "cone":
            H = 2.0
            box = [(-r, -ry), (r, -ry), (0, H)]
            to, _ = fit(box, x, y, w, h, pad=6)
            _fill_poly(c, [to(p) for p in ell(0, 0, pi, 2 * pi)] + [to((0, H))])
            _ellipse_arc(c, to, 0, 0, r, ry, 0, pi, True)
            _ellipse_arc(c, to, 0, 0, r, ry, pi, 2 * pi, False)
            _style(c)
            c.line(*to((-r, 0)), *to((0, H)))
            c.line(*to((r, 0)), *to((0, H)))
        elif kind == "sphere":
            box = [(-r, -r), (r, r)]
            to, _ = fit(box, x, y, w, h, pad=6)
            _fill_poly(c, [to((r * math.cos(t * pi / 30), r * math.sin(t * pi / 30))) for t in range(60)])
            _ellipse_arc(c, to, 0, 0, r, 1, 0, 2 * pi, False, steps=80)
            _ellipse_arc(c, to, 0, 0, r, ry, 0, pi, True)
            _ellipse_arc(c, to, 0, 0, r, ry, pi, 2 * pi, False)
        elif kind == "hemisphere":
            box = [(-r, -r), (r, ry)]
            to, _ = fit(box, x, y, w, h, pad=6)
            _fill_poly(c, [to((r * math.cos(pi + t * pi / 40), r * math.sin(pi + t * pi / 40))) for t in range(41)]
                       + [to(p) for p in ell(0, 0, 0, pi)])
            _ellipse_arc(c, to, 0, 0, r, 1, pi, 2 * pi, False)
            _ellipse_arc(c, to, 0, 0, r, ry, 0, 2 * pi, False)
    return fig


# Ready-made solids by name, for "name the 3D shape" questions.
def solid(name):
    if name in ("cylinder", "cone", "sphere", "hemisphere"):
        return round_solid(name)
    if name == "cube":
        return prism([(0, 0), (1, 0), (1, 1), (0, 1)], 1)
    if name == "cuboid":
        return prism([(0, 0), (2.2, 0), (2.2, 1), (0, 1)], 1.3)
    if name == "triangular prism":
        return prism([(0, 0), (1.2, 0), (0.6, 0.95)], 3.4)
    if name == "pentagonal prism":
        pts = [(p[0], p[1]) for p in polygon_pts(5)]
        return prism(pts, 4.2)
    if name == "hexagonal prism":
        pts = [(p[0], p[1]) for p in polygon_pts(6)]
        return prism(pts, 4.2)
    if name == "square-based pyramid":
        return pyramid([(0, 0), (1.6, 0), (1.6, 1.6), (0, 1.6)], 1.5)
    if name == "triangular-based pyramid":
        return pyramid([(0, 0), (1.8, 0), (0.3, 1.8)], 1.7)
    if name == "hexagonal-based pyramid":
        return pyramid([(math.cos(k * math.pi / 3 + math.pi / 6), 1.4 * math.sin(k * math.pi / 3 + math.pi / 6))
                        for k in range(6)], 1.9)
    raise ValueError(f"No drawing for solid '{name}'")


# --------------------------------------------------------------------------
# Square grids (for nets, area on a grid, drawing questions)
# --------------------------------------------------------------------------
GRID = HexColor("#c3cad8")


def square_grid(cols, rows, shapes=(), dots=False):
    """A cols x rows grid of squares. `shapes` is a list of polygons in grid
    units (corners at whole numbers), drawn on top of the grid."""
    def fig(c, x, y, w, h):
        cell = min(w / cols, h / rows)
        ox = x + (w - cols * cell) / 2
        oy = y + (h - rows * cell) / 2
        c.setStrokeColor(GRID)
        c.setLineWidth(0.5)
        c.setDash()
        for i in range(cols + 1):
            c.line(ox + i * cell, oy, ox + i * cell, oy + rows * cell)
        for j in range(rows + 1):
            c.line(ox, oy + j * cell, ox + cols * cell, oy + j * cell)
        for poly in shapes:
            pts = [(ox + px * cell, oy + py * cell) for px, py in poly]
            _style(c)
            _path(c, pts)
    return fig


def cells_net(cells, extra=(), labels=None):
    """A net made of unit squares at grid cells [(col, row), ...]. Drawn as
    separate squares so the fold lines show. `extra` adds other faces as
    polygons in the same units (e.g. triangles on a pyramid net)."""
    polys = [[(cx, cy), (cx + 1, cy), (cx + 1, cy + 1), (cx, cy + 1)] for cx, cy in cells]
    polys += list(extra)

    def fig(c, x, y, w, h):
        allpts = [p for poly in polys for p in poly]
        to, s = fit(allpts, x, y, w, h, pad=6, max_scale=26)
        for poly in polys:
            _style(c)
            _path(c, [to(p) for p in poly])
        # optional letters or numbers written in the middle of some squares
        for (cx, cy), text in (labels or {}).items():
            px, py = to((cx + 0.5, cy + 0.5))
            draw_rich_centred(c, px, py - s * 0.14, text, min(13, s * 0.5), "HeadMedium", LABEL)
    return fig


def net_circles(rect, circles):
    """A net with curved faces: rect is a polygon, circles are (cx, cy, r)."""
    def fig(c, x, y, w, h):
        pts = list(rect)
        for cx, cy, r in circles:
            pts += [(cx - r, cy - r), (cx + r, cy + r)]
        to, s = fit(pts, x, y, w, h, pad=6)
        _style(c)
        _path(c, [to(p) for p in rect])
        for cx, cy, r in circles:
            px, py = to((cx, cy))
            _style(c)
            c.circle(px, py, r * s, stroke=1, fill=1)
    return fig


# --------------------------------------------------------------------------
# Coordinate axes
# --------------------------------------------------------------------------
def axes(xmin, xmax, ymin, ymax, items=(), label_step=1, grid=True, xlabel="x", ylabel="y", ystep=None):
    """A coordinate grid. items can be:
        ("point", x, y, "A")          a cross with a label
        ("circle", cx, cy, r)         a circle
        ("line", [(x, y), ...])       straight segments through the points
        ("curve", f, x0, x1)          the graph of y = f(x)
        ("polygon", [(x, y), ...])    a filled shape (add "shade" for a see-through
                                      region with no outline)
        ("line", pts, "dashed")       a dashed line (strict inequalities)
        ("label", x, y, "A")          a letter centred at (x, y)
    ystep: give a y grid spacing (e.g. 2 or 5) for graphs whose y-values are
    much bigger than their x-values; the grid then fills the box instead of
    keeping square cells.
    """
    def fig(c, x, y, w, h):
        pad = 14
        if ystep:
            sx = (w - 2 * pad) / (xmax - xmin)
            sy = (h - 2 * pad) / (ymax - ymin)
        else:
            sx = sy = min((w - 2 * pad) / (xmax - xmin), (h - 2 * pad) / (ymax - ymin))
        ox = x + (w - (xmax - xmin) * sx) / 2 - xmin * sx
        oy = y + (h - (ymax - ymin) * sy) / 2 - ymin * sy
        X = lambda v: ox + v * sx
        Y = lambda v: oy + v * sy
        s = sx
        yst = ystep or 1
        ylab = ystep * (2 if (ymax - ymin) / ystep > 12 else 1) if ystep else label_step
        c.setDash()
        if grid:
            c.setStrokeColor(GRID)
            c.setLineWidth(0.45)
            for i in range(xmin, xmax + 1):
                c.line(X(i), Y(ymin), X(i), Y(ymax))
            j = math.ceil(ymin / yst) * yst
            while j <= ymax + 1e-9:
                c.line(X(xmin), Y(j), X(xmax), Y(j))
                j += yst
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.line(X(xmin), Y(0), X(xmax) + 6, Y(0))
        c.line(X(0), Y(ymin), X(0), Y(ymax) + 6)
        c.setFillColor(INK)
        c.setFont("BodyItalic", 10)
        c.drawString(X(xmax) + 6, Y(0) - 3.5, xlabel)
        c.drawString(X(0) - 3, Y(ymax) + 9, ylabel)
        c.setFont("Body", 7.5)
        for i in range(xmin, xmax + 1):
            if i and i % label_step == 0:
                c.drawCentredString(X(i), Y(0) - 9, str(i).replace("-", "−"))
        j = math.ceil(ymin / ylab) * ylab
        while j <= ymax + 1e-9:
            if j:
                c.drawRightString(X(0) - 3, Y(j) - 2.5, f"{j:g}".replace("-", "−"))
            j += ylab
        c.drawRightString(X(0) - 3, Y(0) - 9, "0")
        for item in items:
            kind = item[0]
            _style(c)
            if kind == "point":
                _, px, py, lab = item
                c.setLineWidth(1.1)
                c.line(X(px) - 3, Y(py) - 3, X(px) + 3, Y(py) + 3)
                c.line(X(px) - 3, Y(py) + 3, X(px) + 3, Y(py) - 3)
                if lab:
                    c.setFillColor(LABEL)
                    c.setFont("HeadMedium", 9.5)
                    c.drawString(X(px) + 4, Y(py) + 4, lab)
            elif kind == "circle":
                _, cx, cy, r = item
                c.setLineWidth(1.4)
                c.circle(X(cx), Y(cy), r * s, stroke=1, fill=0)
            elif kind in ("line", "polygon"):
                pts = [(X(a), Y(b)) for a, b in item[1]]
                c.setLineWidth(1.4)
                if "dashed" in item[2:]:
                    c.setDash(5, 3)
                if "shade" in item[2:]:
                    # a see-through shaded region (no outline)
                    c.setFillColor(HexColor("#7fc49b"), alpha=0.45)
                    p = c.beginPath()
                    p.moveTo(*pts[0])
                    for q in pts[1:]:
                        p.lineTo(*q)
                    p.close()
                    c.drawPath(p, stroke=0, fill=1)
                    c.setFillAlpha(1)
                else:
                    _path(c, pts, close=(kind == "polygon"), fill=(kind == "polygon"))
                c.setDash()
            elif kind == "label":
                _, px, py, lab = item
                c.setFillColor(LABEL)
                c.setFont("HeadMedium", 10)
                c.drawCentredString(X(px), Y(py) - 3.5, lab)
            elif kind == "curve":
                _, f, x0, x1 = item
                c.setLineWidth(1.4)
                p = c.beginPath()
                first = True
                for k in range(201):
                    xv = x0 + (x1 - x0) * k / 200
                    yv = f(xv)
                    if ymin - 0.01 <= yv <= ymax + 0.01:
                        (p.moveTo if first else p.lineTo)(X(xv), Y(yv))
                        first = False
                    else:
                        first = True
                c.drawPath(p, stroke=1, fill=0)
    return fig


# --------------------------------------------------------------------------
# Written methods: a sum set out in columns
# --------------------------------------------------------------------------
def column_calc(numbers, op="+", answer_rows=1):
    """Numbers lined up by place value, with the operation sign and a
    double answer line underneath, ready for the column method."""
    def fig(c, x, y, w, h):
        digits = max(len(str(n)) for n in numbers) + 1      # +1 for a carry digit
        size = 13
        step = 11.5                                          # gap between digit columns
        right = x + w / 2 + digits * step / 2
        top = y + h - 4
        c.setFillColor(INK)
        for r, n in enumerate(numbers):
            s = str(n)
            base = top - (r + 1) * 17
            for k, ch in enumerate(reversed(s)):
                c.setFont("Body", size)
                c.drawCentredString(right - (k + 0.5) * step, base, ch)
        last = top - len(numbers) * 17
        c.setFont("Body", size)
        c.drawCentredString(right - (digits + 0.6) * step, last, op)
        c.setStrokeColor(INK)
        c.setLineWidth(0.9)
        c.setDash()
        left = right - (digits + 0.2) * step
        y1 = last - 6
        y2 = y1 - 19 * answer_rows
        c.line(left, y1, right + 2, y1)
        c.line(left, y2, right + 2, y2)
        c.line(left, y2 - 2.5, right + 2, y2 - 2.5)
    return fig


def bus_stop(divisor, dividend):
    """Short/long division set out as a 'bus stop': divisor outside, the
    number being divided underneath a bar, room above for the answer."""
    def fig(c, x, y, w, h):
        size = 13
        step = 11.5
        s = str(dividend)
        total = len(s) * step + 8
        left = x + (w - total) / 2 + 10
        base = y + h - 34
        c.setFillColor(INK)
        c.setFont("Body", size)
        c.drawRightString(left - 6, base, str(divisor))
        for k, ch in enumerate(s):
            c.drawCentredString(left + (k + 0.5) * step + 2, base, ch)
        c.setStrokeColor(INK)
        c.setLineWidth(1)
        c.setDash()
        c.line(left - 2, base - 4, left - 2, base + 14)
        c.line(left - 2, base + 14, left + total, base + 14)
    return fig
