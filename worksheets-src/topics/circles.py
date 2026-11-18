"""Circles (6 worksheets) and circle theorems (7 worksheets).
Circle-theorem answers are MEASURED from the diagram that is drawn, so the
numbers in the question, the picture and the answers always agree."""
import math
from engine.geo import scene
from topics.area import n, cm, circle_fig, sector_fig, semi_fig

PI = math.pi


def P(ws, prompt, qa, cols=3, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


# ==========================================================================
# Circles
# ==========================================================================
def circumference(ws):
    ws.section("Practice")
    ds = [10, 6, 15, 8.4]
    ws.figures("Work out the circumference of each circle. Give your answers to 1 decimal place.",
               [circle_fig(d / 2, cm(d), "diameter") for d in ds], [f"{PI * d:.1f} cm" for d in ds], cols=4, fig_h=80)
    rs = [5, 3, 12, 4.5]
    ws.figures("Work out the circumference of each circle. Give your answers to 1 decimal place.",
               [circle_fig(r, cm(r)) for r in rs], [f"{2 * PI * r:.1f} cm" for r in rs], cols=4, fig_h=80)
    P(ws, "Write the circumference in terms of π.", [("diameter 9 cm", "9π cm"), ("radius 4 cm", "8π cm"),
                                                    ("radius 11 cm", "22π cm"), ("diameter 2.5 cm", "2.5π cm")], cols=4)
    P(ws, "Find the diameter of each circle, to 1 decimal place.", [
        ("circumference 40 cm", f"{40 / PI:.1f} cm"), ("circumference 100 cm", f"{100 / PI:.1f} cm"),
        ("circumference 12π cm", "12 cm")], cols=3)
    ws.section("Problem solving")
    ws.question("A bicycle wheel has a diameter of 70 cm.\n(a) How far does the bike travel in one turn of the wheel?\n"
                "(b) How many complete turns does the wheel make in 1 km?",
                f"(a) 70π = {70 * PI:.1f} cm   (b) 100 000 ÷ {70 * PI:.1f} = {100000 / (70 * PI):.1f}, so 454 complete turns",
                space=60)
    ws.question("A circular pond has a circumference of 25 m. Find its radius to 1 decimal place.",
                f"d = 25 ÷ π = {25 / PI:.2f} m, r = {25 / PI / 2:.1f} m", space=45)


def arc_length(ws):
    ws.section("Practice")
    ss = [(6, 60), (10, 90), (5, 120), (8, 45), (12, 150), (7, 200)]
    ws.figures("Work out the length of the arc of each sector. Give your answers to 1 decimal place.",
               [sector_fig(r, t, cm(r), f"{t}°") for r, t in ss],
               [f"{t / 360 * 2 * PI * r:.1f} cm" for r, t in ss], cols=3, fig_h=95)
    ss2 = [(6, 60), (10, 90), (5, 120)]
    P(ws, "Work out the perimeter of each sector (the arc plus the two radii), to 1 decimal place.",
      [(f"radius {r} cm, angle {t}°", f"{t / 360 * 2 * PI * r + 2 * r:.1f} cm") for r, t in ss2], cols=3)
    P(ws, "Write each arc length in terms of π.", [("radius 9 cm, angle 40°", "2π cm"),
                                                  ("radius 6 cm, angle 150°", "5π cm"), ("radius 12 cm, angle 270°", "18π cm")],
      cols=3)
    ws.section("Problem solving")
    ws.question("An arc has length 5π cm and radius 10 cm. Find the angle of the sector.",
                "[[θ//360]] × 20π = 5π, θ = 90°", space=45)
    ws.question("A sector has angle 80° and arc length 12 cm. Find its radius, to 1 d.p.",
                f"[[80//360]] × 2πr = 12, r = {12 * 360 / (80 * 2 * PI):.1f} cm", space=50)


def parts(ws):
    ws.section("Practice")
    O = (0, 0)
    base = [("circle", O, 1), ("dot", O)]
    a = lambda d: (math.cos(math.radians(d)), math.sin(math.radians(d)))
    figs = [
        scene(base + [("seg", O, a(30))]),                                      # radius
        scene(base + [("seg", a(200), a(20))]),                                 # diameter
        scene(base + [("seg", a(140), a(260))]),                                # chord
        scene(base + [("seg", (1, -0.9), (1, 0.9)), ("dot", (1, 0))]),          # tangent
        scene(base + [("arc", O, 1, 20, 110, "thick")]),                        # arc (highlighted)
        scene([("sector", O, 1, 30, 120), ("circle", O, 1), ("dot", O)]),       # sector
        scene([("poly", [a(200 + k * 140 / 30) for k in range(31)]), ("circle", O, 1), ("dot", O)]),   # segment
        scene([("circle", O, 1, "thick"), ("dot", O)]),                         # circumference
    ]
    names = ["radius", "diameter", "chord", "tangent", "arc", "sector", "segment", "circumference"]
    ws.figures("Name the part of the circle that is shown in each diagram.", figs, names, cols=4, fig_h=72)
    P(ws, "Write down the name of:", [
        ("the distance from the centre to the edge", "radius"), ("a chord that goes through the centre", "diameter"),
        ("a line that touches the circle at one point", "tangent"), ("the distance all the way round", "circumference"),
        ("a 'slice' between two radii and an arc", "sector"), ("the region between a chord and an arc", "segment")], cols=2)
    ws.section("Problem solving")
    ws.question("A circle has a radius of 7 cm. How long is its diameter?", "14 cm", space=30)
    ws.question("What is the longest chord you can draw in a circle of radius 5 cm? Explain.",
                "10 cm: the longest chord is the diameter.", space=40)
    ws.question("Explain the difference between a sector and a segment.",
                "A sector is cut off by two radii and an arc; a segment is cut off by a chord and an arc.", space=40)


def perim_semi(ws):
    ws.section("Practice")
    ds = [10, 12, 7, 16, 9, 20]
    ws.figures("Work out the perimeter of each semicircle (the curved part plus the diameter), to 1 d.p.",
               [semi_fig(d, cm(d)) for d in ds], [f"{PI * d / 2 + d:.1f} cm" for d in ds], cols=3, fig_h=70)
    P(ws, "Write the perimeter of each semicircle in terms of π.", [("diameter 8 cm", "4π + 8 cm"),
                                                                    ("radius 5 cm", "5π + 10 cm"), ("diameter 14 cm", "7π + 14 cm")],
      cols=3)
    ws.section("Problem solving")
    fig = scene([("poly", [(0, 0), (10, 0), (10, 6), (0, 6)], "nofill"), ("sector", (10, 3), 3, -90, 90),
                 ("seg", (10, 0), (10, 6), "dashed", "thin"), ("side", (0, 0), (10, 0), "10 cm"),
                 ("side", (0, 6), (0, 0), "6 cm")], pad=16)
    ws.question("This shape is a rectangle with a semicircle on one end. Find its perimeter to 1 d.p.",
                f"10 + 6 + 10 + 3π = {26 + 3 * PI:.1f} cm", figure=fig, fig_w=140, fig_h=85, space=10)
    ws.question("A running track is two straights of 100 m joined by two semicircles of diameter 60 m.\n"
                "How far is one lap, to the nearest metre?", f"200 + 60π = {200 + 60 * PI:.0f} m", space=50)


def perim_quarter(ws):
    ws.section("Practice")
    rs = [4, 10, 7, 2.5, 6, 12]
    ws.figures("Work out the perimeter of each quarter circle (the arc plus two radii), to 1 d.p.",
               [semi_fig(r, cm(r), quarter=True) for r in rs], [f"{PI * r / 2 + 2 * r:.1f} cm" for r in rs],
               cols=3, fig_h=80)
    P(ws, "Write the perimeter of each quarter circle in terms of π.", [("radius 8 cm", "4π + 16 cm"),
                                                                        ("radius 6 cm", "3π + 12 cm"), ("radius 20 cm", "10π + 40 cm")],
      cols=3)
    ws.section("Problem solving")
    ws.question("A quarter circle has a perimeter of 50 cm. Find its radius to 1 d.p.",
                f"r([[π//2]] + 2) = 50, r = {50 / (PI / 2 + 2):.1f} cm", space=50)
    ws.question("A square of side 6 cm has a quarter circle cut out, centred on one corner, with radius 6 cm.\n"
                "Find the perimeter of the piece that is left (the part of the square outside the arc).",
                f"two sides of 6 cm plus the arc: 12 + 3π = {12 + 3 * PI:.1f} cm", space=55)


def segment_area(ws):
    ws.section("Practice")
    ss = [(6, 60), (10, 90), (8, 120), (5, 45), (12, 100), (7, 150)]
    figs = []
    for r, t in ss:
        a0 = 90 - t / 2
        A = (r * math.cos(math.radians(a0)), r * math.sin(math.radians(a0)))
        B = (r * math.cos(math.radians(a0 + t)), r * math.sin(math.radians(a0 + t)))
        segpts = [(r * math.cos(math.radians(a0 + t * k / 30)), r * math.sin(math.radians(a0 + t * k / 30)))
                  for k in range(31)]
        figs.append(scene([("poly", segpts), ("seg", (0, 0), A), ("seg", (0, 0), B), ("side", (0, 0), A, cm(r)),
                           ("angle", (0, 0), A, B, f"{t}°"), ("dot", (0, 0))], pad=14))
    ans = [f"{t / 360 * PI * r * r - 0.5 * r * r * math.sin(math.radians(t)):.1f} cm^2" for r, t in ss]
    ws.figures("Find the area of each shaded segment (sector − triangle), to 1 decimal place.", figs, ans,
               cols=3, fig_h=90)
    ws.section("Problem solving")
    ws.question("A chord of a circle of radius 10 cm is 10 cm long.\n(a) Explain why the angle at the centre is 60°.\n"
                "(b) Find the area of the minor segment to 1 d.p.",
                f"(a) the triangle has three sides of 10 cm, so it is equilateral   (b) "
                f"{PI * 100 / 6 - 0.5 * 100 * math.sin(math.radians(60)):.1f} cm^2", space=70)
    ws.question("Show that the area of the segment cut off by a 90° angle in a circle of radius r is [[r^2//4]](π − 2).",
                "sector = [[πr^2//4]], triangle = [[r^2//2]], so segment = [[πr^2//4]] − [[2r^2//4]] = [[r^2//4]](π − 2)",
                space=60)


# ==========================================================================
# Circle theorems
# ==========================================================================
def on_circle(deg, r=1.0):
    return (r * math.cos(math.radians(deg)), r * math.sin(math.radians(deg)))


def measure(v, a, b):
    """The (smaller) angle at v between a and b, in whole degrees."""
    d1 = math.atan2(a[1] - v[1], a[0] - v[0])
    d2 = math.atan2(b[1] - v[1], b[0] - v[0])
    x = abs(math.degrees(d1 - d2)) % 360
    return round(min(x, 360 - x))


def ct(points, segs, angles, extras=(), centre=True):
    """A circle-theorem diagram. points: {"A": degrees round the circle}
    (or an (x, y) tuple for points off the circle); segs: ["AB", "OC", ...];
    angles: [(vertex, a, b, label)] with letters. Returns (figure, P) where
    P maps letters to coordinates (O is the centre)."""
    Pt = {"O": (0, 0)}
    for k, v in points.items():
        Pt[k] = on_circle(v) if isinstance(v, (int, float)) else v
    items = [("circle", (0, 0), 1)]
    if centre:
        items += [("dot", (0, 0)), ("label", (0, 0), "O", "SE")]
    for s in segs:
        items.append(("seg", Pt[s[0]], Pt[s[1]]))
    for k, v in points.items():
        p = Pt[k]
        L = math.hypot(*p) or 1
        d = {(1, 0): "E", (-1, 0): "W", (0, 1): "N", (0, -1): "S"}
        ux, uy = p[0] / L, p[1] / L
        dirn = ("N" if uy > 0.38 else "S" if uy < -0.38 else "") + ("E" if ux > 0.38 else "W" if ux < -0.38 else "")
        items.append(("label", p, k, dirn or "N"))
    for v, a, b, lab in angles:
        if lab == "R":
            items.append(("right", Pt[v], Pt[a], Pt[b]))
        else:
            items.append(("angle", Pt[v], Pt[a], Pt[b], lab, 14))
    items += list(extras)
    return scene(items, pad=16), Pt


def q_fig(ws, prompt, fig, answer, w=150, h=135):
    ws.question(prompt, answer, figure=fig, fig_w=w, fig_h=h, space=15)


def right_angle_semi(ws):
    ws.section("Practice")
    figs, ans = [], []
    for cdeg, known in [(130, "A"), (60, "B"), (100, "A"), (36, "B"), (150, "B"), (76, "A")]:   # even arcs give whole-number angles
        pts = {"A": 180, "B": 0, "C": cdeg}
        _, Pt = ct(pts, [], [])
        a_val, b_val = measure(Pt["A"], Pt["B"], Pt["C"]), measure(Pt["B"], Pt["A"], Pt["C"])
        lab_a, lab_b = (f"{a_val}°", "x") if known == "A" else ("x", f"{b_val}°")
        f, _ = ct(pts, ["AB", "AC", "BC"], [("A", "B", "C", lab_a), ("B", "C", "A", lab_b)])
        figs.append(f)
        ans.append(f"{b_val if known == 'A' else a_val}° (angle C = 90°)")
    ws.figures("AB is a diameter of each circle. Find the angle marked x.", figs, ans, cols=3, fig_h=110)
    ws.section("Problem solving")
    f, Pt = ct({"A": 180, "B": 0, "C": 110, "D": 250}, ["AB", "AC", "BC", "AD", "BD"],
               [("A", "B", "C", f"{measure(on_circle(180), on_circle(0), on_circle(110))}°"), ("B", "A", "D", "y")])
    q_fig(ws, "AB is a diameter. C and D are on the circle.\nFind angle ACB and angle y. Give reasons.", f,
          f"angle ACB = 90° (angle in a semicircle); y = {measure(Pt['B'], Pt['A'], Pt['D'])}° "
          f"(angles in triangle ABD, with angle ADB = 90°)")
    ws.question("Explain why the angle in a semicircle is always 90°.",
                "Join C to the centre O: this makes two isosceles triangles (OA = OB = OC). If their base angles are "
                "p and q, then 2p + 2q = 180°, so the angle at C, p + q, is 90°.", space=55)


def angle_centre(ws):
    ws.section("Practice")
    cases = [(200, 340, 90, "C"), (210, 330, 100, "O"), (200, 0, 120, "C"), (230, 310, 70, "O"),
             (160, 20, 270, "C"), (180, 300, 90, "O")]
    figs, ans = [], []
    for a, b, c, unknown in cases:
        pts = {"A": a, "B": b, "C": c}
        _, Pt = ct(pts, [], [])
        at_c, at_o = measure(Pt["C"], Pt["A"], Pt["B"]), measure((0, 0), Pt["A"], Pt["B"])
        labs = ("x", f"{at_o}°") if unknown == "C" else (f"{at_c}°", "x")
        f, _ = ct(pts, ["CA", "CB", "OA", "OB"], [("C", "A", "B", labs[0]), ("O", "A", "B", labs[1])])
        figs.append(f)
        ans.append(f"{at_c if unknown == 'C' else at_o}° (angle at the centre is twice the angle at the circumference)")
    ws.figures("O is the centre of each circle. Find the angle marked x.", figs, ans, cols=3, fig_h=115)
    ws.section("Problem solving")
    f, Pt = ct({"A": 220, "B": 320, "C": 90}, ["CA", "CB", "OA", "OB", "AB"], [("O", "A", "B", "4y"), ("C", "A", "B", "y + 25")])
    q_fig(ws, "O is the centre. Find y.", f, "4y = 2(y + 25), so y = 25 (angle at the centre is twice the angle "
                                             "at the circumference)")
    ws.question("Angle AOB at the centre is 140°. Find the angle at the circumference on the major arc, "
                "and the angle on the minor arc.", "70°, and 180 − 70 = 110° (cyclic quadrilateral)", space=50)


def same_segment(ws):
    ws.section("Practice")
    cases = [(200, 340, 80, 120), (210, 330, 60, 140), (190, 350, 100, 40), (220, 320, 150, 60)]
    figs, ans = [], []
    for a, b, c, d in cases:
        pts = {"A": a, "B": b, "C": c, "D": d}
        _, Pt = ct(pts, [], [])
        val = measure(Pt["C"], Pt["A"], Pt["B"])
        f, _ = ct(pts, ["CA", "CB", "DA", "DB"], [("C", "A", "B", f"{val}°"), ("D", "A", "B", "x")], centre=False)
        figs.append(f)
        ans.append(f"{val}° (angles in the same segment are equal)")
    ws.figures("Find the angle marked x.", figs, ans, cols=2, fig_h=135)
    ws.section("Problem solving")
    pts = {"A": 200, "B": 340, "C": 70, "D": 130}
    _, Pt = ct(pts, [], [])
    cab, acb = measure(Pt["A"], Pt["C"], Pt["B"]), measure(Pt["C"], Pt["A"], Pt["B"])
    f, _ = ct(pts, ["CA", "CB", "DA", "DB", "AB"], [("C", "A", "B", f"{acb}°"), ("A", "B", "C", f"{cab}°"), ("D", "A", "B", "x"),
                                                    ("B", "A", "C", "y")], centre=False)
    q_fig(ws, "Find the angles x and y. Give reasons.", f,
          f"x = {acb}° (angles in the same segment); y = {180 - acb - cab}° (angles in a triangle)")
    ws.question("Two angles in the same segment are 3x + 10 and 5x − 20. Find x.", "3x + 10 = 5x − 20, x = 15", space=40)


def cyclic_quads(ws):
    ws.section("Practice")
    cases = [(200, 300, 40, 120), (190, 320, 20, 100), (230, 330, 50, 140), (210, 290, 10, 130),
             (240, 350, 70, 160), (200, 310, 30, 90)]
    figs, ans = [], []
    for k, (a, b, c, d) in enumerate(cases):
        pts = {"A": a, "B": b, "C": c, "D": d}
        _, Pt = ct(pts, [], [])
        angA = measure(Pt["A"], Pt["D"], Pt["B"])
        angB = measure(Pt["B"], Pt["A"], Pt["C"])
        if k % 2 == 0:
            angs = [("A", "D", "B", f"{angA}°"), ("C", "B", "D", "x")]
            ans.append(f"{180 - angA}° (opposite angles of a cyclic quadrilateral add up to 180°)")
        else:
            angs = [("B", "A", "C", f"{angB}°"), ("D", "C", "A", "x")]
            ans.append(f"{180 - angB}° (opposite angles of a cyclic quadrilateral add up to 180°)")
        f, _ = ct(pts, ["AB", "BC", "CD", "DA"], angs, centre=False)
        figs.append(f)
    ws.figures("ABCD is a cyclic quadrilateral. Find the angle marked x.", figs, ans, cols=3, fig_h=110)
    P(ws, "ABCD is a cyclic quadrilateral. Find the missing angles.", [
        ("angle A = 85°, angle B = 110°", "C = 95°, D = 70°"), ("angle A = 2x, angle C = x", "x = 60°: A = 120°, C = 60°")],
      cols=1)
    ws.section("Problem solving")
    ws.question("Explain why a rectangle can always be drawn inside a circle with all four corners on the circle, "
                "but a parallelogram that isn't a rectangle cannot.",
                "Opposite angles of a cyclic quadrilateral add up to 180°. A rectangle's do (90 + 90), but a "
                "parallelogram's opposite angles are equal and not 90°, so they can't add up to 180°.", space=55)


def alt_segment(ws):
    ws.section("Practice")
    figs, ans = [], []
    for a, b in [(140, 30), (120, 50), (160, 70), (110, 20)]:
        T = (0, -1)
        pts = {"T": 270, "A": a, "B": b}
        _, Pt = ct(pts, [], [])
        val = measure(Pt["A"], Pt["T"], Pt["B"])      # angle TAB = angle between tangent and chord TB
        tan_r = (1.4, -1)
        f, _ = ct(pts, ["TA", "TB", "AB"], [("A", "T", "B", f"{val}°")],
                  extras=[("seg", (-1.4, -1), (1.4, -1)), ("angle", T, tan_r, Pt["B"], "x", 16),
                          ("label", (1.4, -1), "P", "E")], centre=False)
        figs.append(f)
        ans.append(f"{val}° (alternate segment theorem)")
    ws.figures("The line through T is a tangent to the circle. Find the angle marked x.", figs, ans, cols=2, fig_h=135)
    ws.section("Problem solving")
    ws.question("A tangent at T makes an angle of 65° with the chord TA. B is a point on the major arc.\n"
                "Find angle TBA and angle TOA, where O is the centre.",
                "angle TBA = 65° (alternate segment theorem); angle TOA = 130° (angle at the centre)", space=55)
    ws.question("State the alternate segment theorem in your own words.",
                "The angle between a tangent and a chord equals the angle that chord makes at the circle in the "
                "other (alternate) segment.", space=45)


def radius_tangent(ws):
    ws.section("Practice")
    figs, ans = [], []
    for ang in (50, 35, 62, 28):
        # two tangents from P meet the circle at A and B
        d = 1 / math.sin(math.radians(ang / 2 + 0.0))
        Pp = (d, 0)
        ta = math.degrees(math.acos(1 / d))
        A, B = on_circle(ta), on_circle(-ta)
        f = scene([("circle", (0, 0), 1), ("dot", (0, 0)), ("label", (0, 0), "O", "W"), ("seg", Pp, A), ("seg", Pp, B),
                   ("seg", (0, 0), A), ("seg", (0, 0), B), ("label", Pp, "P", "E"), ("label", A, "A", "N"),
                   ("label", B, "B", "S"), ("right", A, (0, 0), Pp), ("right", B, (0, 0), Pp),
                   ("angle", Pp, A, B, f"{measure(Pp, A, B)}°", 18), ("angle", (0, 0), A, B, "x")], pad=14)
        figs.append(f)
        ans.append(f"{180 - measure(Pp, A, B)}° (radius ⊥ tangent, angles in a quadrilateral add up to 360°)")
    ws.figures("PA and PB are tangents and O is the centre. Find the angle marked x.", figs, ans, cols=2, fig_h=110)
    P(ws, "A tangent touches a circle of radius 5 cm at A. P is on the tangent and AP = 12 cm.", [
        ("What is angle OAP?", "90°"), ("Find the distance OP.", "√(25 + 144) = 13 cm")], cols=2)
    ws.section("Problem solving")
    ws.question("PA and PB are tangents from P to a circle. Explain why PA = PB.",
                "Triangles OAP and OBP are congruent (RHS): both have a right angle, OA = OB (radii) and OP is shared.",
                space=50)
    ws.question("Two tangents from P meet a circle with centre O at A and B. Angle AOB = 124°. Find angle APB.",
                "360 − 90 − 90 − 124 = 56°", space=40)


def mixed(ws):
    ws.section("Practice")
    f1, P1 = ct({"A": 180, "B": 0, "C": 70}, ["AB", "AC", "BC"], [("A", "B", "C", "x"), ("B", "C", "A", f"{measure(on_circle(0), on_circle(70), on_circle(180))}°")])
    f2, P2 = ct({"A": 220, "B": 320, "C": 90}, ["CA", "CB", "OA", "OB"], [("C", "A", "B", "y"), ("O", "A", "B", f"{measure((0, 0), on_circle(220), on_circle(320))}°")])
    f3, P3 = ct({"A": 200, "B": 300, "C": 30, "D": 120}, ["AB", "BC", "CD", "DA"],
                [("A", "D", "B", f"{measure(on_circle(200), on_circle(120), on_circle(300))}°"), ("C", "B", "D", "z")], centre=False)
    f4, P4 = ct({"A": 200, "B": 340, "C": 70, "D": 120}, ["CA", "CB", "DA", "DB"],
                [("C", "A", "B", f"{measure(on_circle(70), on_circle(200), on_circle(340))}°"), ("D", "A", "B", "w")], centre=False)
    ans = [f"x = {measure(P1['A'], P1['B'], P1['C'])}° (angle in a semicircle is 90°)",
           f"y = {measure(P2['C'], P2['A'], P2['B'])}° (angle at the centre is twice the angle at the circumference)",
           f"z = {measure(P3['C'], P3['B'], P3['D'])}° (opposite angles of a cyclic quadrilateral)",
           f"w = {measure(P4['D'], P4['A'], P4['B'])}° (angles in the same segment)"]
    ws.figures("Find each unknown angle. Name the circle theorem you use.", [f1, f2, f3, f4], ans, cols=2, fig_h=120)
    P(ws, "Complete each circle theorem.", [
        ("The angle in a semicircle is ...", "90°"), ("The angle at the centre is ... the angle at the circumference.", "twice"),
        ("Opposite angles in a cyclic quadrilateral add up to ...", "180°"),
        ("A tangent meets a radius at ...", "90° (a right angle)"),
        ("Two tangents from the same point are ...", "equal in length")], cols=1)
    ws.section("Problem solving")
    ws.question("A, B and C are on a circle with centre O. Angle OAB = 25°. Find angle AOB and angle ACB "
                "(C on the major arc). Give reasons.",
                "Triangle OAB is isosceles (radii), so angle AOB = 180 − 50 = 130°; angle ACB = 65° "
                "(angle at the centre is twice the angle at the circumference).", space=60)


SHEETS = [
    ({"slug": "circles-circumference"}, circumference),
    ({"slug": "circles-arc-length"}, arc_length),
    ({"slug": "circles-parts"}, parts),
    ({"slug": "circles-perimeter-semi-circle"}, perim_semi),
    ({"slug": "circles-perimeter-quarter-circle"}, perim_quarter),
    ({"slug": "circles-segment-area"}, segment_area),
    ({"slug": "circle-theorems-right-angle-in-a-semi-circle"}, right_angle_semi),
    ({"slug": "circle-theorems-angle-at-the-centre"}, angle_centre),
    ({"slug": "circle-theorems-angles-in-the-same-segment"}, same_segment),
    ({"slug": "circle-theorems-cyclic-quadrilaterals"}, cyclic_quads),
    ({"slug": "circle-theorems-alternate-segment-theorem"}, alt_segment),
    ({"slug": "circle-theorems-radius-and-tangent"}, radius_tangent),
    ({"slug": "circle-theorems-mixed"}, mixed),
]
