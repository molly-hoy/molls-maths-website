"""Enlargements: fractional scale factor, negative scale factor, ray method."""
from topics.geometry2 import enl_fig, image_of, pts_str
from topics.area import n


def fractional(ws):
    ws.section("Practice")
    cases = [([(4, 4), (8, 4), (8, 8)], (0, 0), 0.5), ([(3, 3), (9, 3), (9, 6), (3, 6)], (0, 0), 1 / 3),
             ([(6, 2), (10, 2), (10, 10)], (2, 2), 0.25)]
    for shape, c, k in cases:
        kk = {0.5: "[[1//2]]", 1 / 3: "[[1//3]]", 0.25: "[[1//4]]"}[k]
        ws.question(f"Enlarge the shape by scale factor {kk}, centre ({c[0]}, {c[1]}).",
                    f"image corners: {pts_str(image_of(shape, c, k))}",
                    figure=enl_fig(shape, c, rng=(0, 12, 0, 12)), fig_w=240, fig_h=215, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("A shape is enlarged by scale factor [[1//2]]. Is the image bigger or smaller? What happens to the area?",
                "Smaller: every length halves, so the area is [[1//4]] of the original.", space=45)


def negative(ws):
    ws.section("Practice")
    cases = [([(1, 1), (3, 1), (3, 2)], (0, 0), -2), ([(2, 1), (4, 1), (4, 3), (2, 3)], (1, 0), -1),
             ([(2, 2), (6, 2), (6, 4)], (0, 0), -0.5)]
    for shape, c, k in cases:
        kk = n(k) if k != -0.5 else "−[[1//2]]"
        ws.question(f"Enlarge the shape by scale factor {kk.replace('-', '−')}, centre ({c[0]}, {c[1]}).",
                    f"image corners: {pts_str(image_of(shape, c, k))} (the image is upside down, on the other side of the centre)",
                    figure=enl_fig(shape, c, rng=(-7, 7, -6, 6)), fig_w=260, fig_h=225, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("Describe the single transformation that is the same as an enlargement of scale factor −1.",
                "a rotation of 180° about the centre of enlargement", space=40)


def ray(ws):
    ws.section("Practice")
    cases = [([(2, 2), (3, 2), (3, 3)], (1, 1), 3), ([(3, 2), (5, 2), (5, 3), (3, 3)], (1, 1), 2),
             ([(2, 5), (3, 5), (3, 6)], (0, 8), 3)]
    for shape, c, k in cases:
        ws.question(f"Use the ray method to enlarge the shape by scale factor {k}, centre C. Draw a ray from C "
                    "through each corner and measure along it.", f"image corners: {pts_str(image_of(shape, c, k))}",
                    figure=enl_fig(shape, c, rng=(0, 12, 0, 12)), fig_w=240, fig_h=215, fig_pos="below", space=0)
    ws.section("Problem solving")
    ws.question("A corner is 3 cm from the centre of enlargement. How far from the centre is its image after an "
                "enlargement of scale factor 4?", "12 cm", space=35)


SHEETS = [
    ({"slug": "enlargements-fractional-scale-factor"}, fractional),
    ({"slug": "enlargements-negative-scale-factor"}, negative),
    ({"slug": "enlargements-ray-method"}, ray),
]
