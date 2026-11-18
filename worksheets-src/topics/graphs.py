"""Statistical and real-life graphs: 31 worksheets (see SHEETS at the bottom).
Answers are calculated from the same data that is drawn."""
import math
import statistics as st
from engine.charts import chart, pie, pictogram, stem_leaf, boxplots
from engine.geo import scene, table
from topics.area import n


def P(ws, prompt, qa, cols=1, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def FQ(ws, prompt, answer, fig, w=330, h=190, space=10):
    """A question with a figure underneath it. With no prompt, the figure
    belongs to the question above (e.g. the grid to draw a chart on)."""
    if not prompt:
        ws.figure_only(fig, w, h)
        return
    ws.question(prompt, answer, figure=fig, fig_w=w, fig_h=h, fig_pos="below", space=space)


def TQ(ws, prompt, rows, answer, w=None, space=10):
    w = w or min(420, 70 * max(len(r) for r in rows))
    ws.question(prompt, answer, figure=table(rows), fig_w=w, fig_h=20 * len(rows) + 4, fig_pos="below", space=space)


def bar_chart(cats, vals, ymax, ystep, ylabel="Frequency", xlabel="", colour=0, y0=0):
    items = [("rect", i + 0.2, i + 0.8, y0, v, colour) for i, v in enumerate(vals)]
    return chart(0, len(cats), y0, ymax, 1, ystep, items, xlabel=xlabel, ylabel=ylabel,
                 xcats=[(i + 0.5, c) for i, c in enumerate(cats)])


def blank_bars(cats, ymax, ystep, ylabel="Frequency", xlabel=""):
    return chart(0, len(cats), 0, ymax, 1, ystep, [], xlabel=xlabel, ylabel=ylabel,
                 xcats=[(i + 0.5, c) for i, c in enumerate(cats)], minor=ystep / 2)


# ==========================================================================
# Bar charts, line charts, pictograms
# ==========================================================================
def bar_draw(ws):
    ws.section("Practice")
    cats, vals = ["Red", "Blue", "Green", "Yellow", "Pink"], [8, 12, 5, 9, 6]
    TQ(ws, "The table shows the favourite colours of a class. Draw a bar chart on the grid below.",
       [["Colour"] + cats, ["Frequency"] + [str(v) for v in vals]], "Check: bar heights 8, 12, 5, 9 and 6, with gaps between "
                                                                       "the bars and labelled axes.", space=0)
    FQ(ws, "", "", blank_bars(cats, 14, 2, xlabel="Colour"), h=170)
    cats2, vals2 = ["Mon", "Tue", "Wed", "Thu", "Fri"], [15, 25, 10, 30, 20]
    TQ(ws, "The table shows how many cakes a café sold each day. Draw a bar chart.",
       [["Day"] + cats2, ["Cakes sold"] + [str(v) for v in vals2]], "Check: bars of 15, 25, 10, 30 and 20 on a scale going up in 5s.",
       space=0)
    FQ(ws, "", "", blank_bars(cats2, 35, 5, ylabel="Cakes sold", xlabel="Day"), h=170)
    ws.section("Problem solving")
    ws.question("Write down three things a good bar chart must have.",
                "e.g. a title, labelled axes, a sensible scale starting at 0, bars of equal width with equal gaps", space=45)


def bar_read(ws):
    ws.section("Practice")
    cats, vals = ["Football", "Tennis", "Swimming", "Netball", "Rugby"], [14, 6, 9, 11, 4]
    FQ(ws, "The bar chart shows the favourite sports of some pupils.", "", bar_chart(cats, vals, 16, 2, xlabel="Sport"), h=180,
       space=0)
    P(ws, "Use the bar chart above.", [("How many pupils chose swimming?", "9"), ("Which sport was most popular?", "football"),
                                      ("How many more chose netball than tennis?", "5"),
                                      ("How many pupils were asked altogether?", str(sum(vals))),
                                      ("What fraction of the pupils chose rugby?", f"[[{4}//{sum(vals)}]] = [[1//11]]")], cols=1)
    ws.section("Problem solving")
    ws.question("Ella says twice as many pupils chose football as swimming. Is she right? Explain.",
                "No: 14 is not twice 9 (twice 9 would be 18).", space=40)


def composite(ws):
    ws.section("Practice")
    cats = ["Y7", "Y8", "Y9", "Y10"]
    boys, girls = [12, 15, 10, 14], [10, 9, 14, 12]
    items = []
    for i, (b, g) in enumerate(zip(boys, girls)):
        items += [("rect", i + 0.25, i + 0.75, 0, b, 0), ("rect", i + 0.25, i + 0.75, b, b + g, 1)]
    fig = chart(0, 4, 0, 30, 1, 5, items, ylabel="Number of pupils", xcats=[(i + 0.5, c) for i, c in enumerate(cats)],
                legend=[(1, "Girls"), (0, "Boys")], minor=1)
    FQ(ws, "The composite bar chart shows the number of boys and girls in a club, by year group.", "", fig, h=200, space=0)
    P(ws, "Use the chart above.", [("How many boys are in Year 8?", "15"), ("How many girls are in Year 9?", "14"),
                                   ("Which year group has the most pupils in total?", "Y10 (26)"),
                                   ("How many girls are in the club altogether?", str(sum(girls))),
                                   ("In which year are there more girls than boys?", "Year 9")])
    ws.section("Problem solving")
    ws.question("Give one advantage of a composite bar chart over a dual bar chart.",
                "You can see the total for each group as well as how it is split.", space=40)


def dual(ws):
    ws.section("Practice")
    cats = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    a, b = [8, 12, 6, 10, 14], [10, 9, 11, 7, 12]
    items = []
    for i, (p, q) in enumerate(zip(a, b)):
        items += [("rect", i + 0.15, i + 0.5, 0, p, 0), ("rect", i + 0.5, i + 0.85, 0, q, 1)]
    fig = chart(0, 5, 0, 16, 1, 2, items, ylabel="Hours of sunshine", xcats=[(i + 0.5, c) for i, c in enumerate(cats)],
                legend=[(0, "Town A"), (1, "Town B")], minor=1)
    FQ(ws, "The dual bar chart shows the hours of sunshine in two towns.", "", fig, h=200, space=0)
    P(ws, "Use the chart above.", [("How many hours of sunshine did Town B have on Wednesday?", "11"),
                                   ("On which days did Town A have more sunshine?", "Tue, Thu and Fri"),
                                   ("Find the total hours for each town.", f"A: {sum(a)}, B: {sum(b)}"),
                                   ("Which town was sunnier overall?", "Town A")])
    ws.section("Problem solving")
    ws.question("Draw a dual bar chart on the grid for: Boys 5, 8, 3 and Girls 7, 4, 6 for Cats, Dogs, Fish.",
                "Check: pairs of bars side by side with a key.", figure=blank_bars(["Cats", "Dogs", "Fish"], 10, 2),
                fig_w=260, fig_h=160, fig_pos="below", space=0)


def vertical_line(ws):
    ws.section("Practice")
    vals = {0: 3, 1: 7, 2: 9, 3: 5, 4: 2}
    items = [("seg", (k, 0), (k, v)) for k, v in vals.items()]
    fig = chart(-0.5, 4.5, 0, 10, 1, 2, items, xlabel="Number of pets", ylabel="Frequency", minor=1,
                xcats=[(k, str(k)) for k in vals])
    FQ(ws, "The vertical line chart shows how many pets some pupils have.", "", fig, h=180, space=0)
    data = [k for k, v in vals.items() for _ in range(v)]
    P(ws, "Use the chart above.", [("How many pupils have 2 pets?", "9"), ("How many pupils were asked?", str(len(data))),
                                   ("What is the mode?", "2 pets"), ("What is the range?", "4"),
                                   ("Work out the mean number of pets.", f"{sum(data)} ÷ {len(data)} = {sum(data) / len(data):.2f}")])
    ws.section("Problem solving")
    ws.question("Why is a vertical line chart better than a bar chart for discrete data like this?",
                "Each value is a single whole number, so a thin line shows that clearly.", space=40)


def pict_draw(ws):
    ws.section("Practice")
    rows = [("Monday", 20), ("Tuesday", 30), ("Wednesday", 15), ("Thursday", 25), ("Friday", 35)]
    TQ(ws, "The table shows the number of books borrowed from a library. Using ● = 10 books, draw a pictogram.",
       [["Day"] + [r[0] for r in rows], ["Books"] + [str(r[1]) for r in rows]],
       "Check: Mon 2, Tue 3, Wed 1½, Thu 2½, Fri 3½ symbols.", space=0)
    FQ(ws, "", "", pictogram(rows, 10, "books", blank=True), w=300, h=160)
    ws.section("Problem solving")
    ws.question("Why is it sensible to choose a key of 10 books rather than 1 book here?",
                "With 1 book per symbol you'd need up to 35 symbols in a row; 10 keeps it short and easy to read.", space=45)


def pict_read(ws):
    ws.section("Practice")
    rows = [("Apples", 16), ("Bananas", 10), ("Oranges", 14), ("Pears", 6), ("Grapes", 12)]
    FQ(ws, "The pictogram shows the fruit sold at a stall. ● = 4 pieces of fruit.", "", pictogram(rows, 4), w=300, h=170, space=0)
    P(ws, "Use the pictogram above.", [("How many apples were sold?", "16"), ("How many pears were sold?", "6"),
                                       ("Which fruit sold the most?", "apples"), ("How many more oranges than bananas?", "4"),
                                       ("How many pieces of fruit were sold in total?", str(sum(r[1] for r in rows)))])
    ws.section("Problem solving")
    ws.question("How would you show 9 pieces of fruit on this pictogram?", "2 full circles and a quarter circle", space=35)


def line_graph(ws):
    ws.section("Practice")
    times = [6, 8, 10, 12, 14, 16, 18]
    temps = [4, 7, 12, 16, 18, 15, 10]
    fig = chart(6, 18, 0, 20, 2, 5, [("line", list(zip(times, temps)), "dots")], xlabel="Time (hours)", ylabel="Temperature (°C)",
                minor=1)
    FQ(ws, "The line graph shows the temperature during one day.", "", fig, h=190, space=0)
    P(ws, "Use the graph above.", [("What was the temperature at 10:00?", "12 °C"), ("When was it warmest?", "14:00 (18 °C)"),
                                   ("Estimate the temperature at 11:00.", "about 14 °C"),
                                   ("Between which two times did the temperature rise fastest?", "08:00 and 10:00"),
                                   ("Find the range of the temperatures.", f"{max(temps) - min(temps)} °C")])
    ws.section("Problem solving")
    ws.question("Explain why the points on this graph can be joined with lines.",
                "Temperature changes continuously, so there are values between the readings.", space=40)


def misleading(ws):
    ws.section("Practice")
    fig = bar_chart(["A", "B", "C"], [48, 52, 50], 54, 2, ylabel="Sales (thousands)", y0=44)
    FQ(ws, "Shop B says: \"Our sales are more than double Shop A's!\" Explain why the graph is misleading.",
       "The vertical axis starts at 44, not 0, so the differences look much bigger. Sales of 52 vs 48 is only about 8% more.",
       fig, h=170, space=30)
    P(ws, "Give one reason why each graph could be misleading.", [
        ("A bar chart with no scale on the vertical axis", "you can't read the actual values"),
        ("A pictogram where some symbols are bigger than others", "bigger symbols look like more, even with the same value"),
        ("A line graph where the scale goes 0, 10, 20, 50, 100", "the scale is uneven, so changes look the wrong size"),
        ("A 3D pie chart drawn at an angle", "slices at the front look bigger than they are")], row_h=36)
    ws.section("Problem solving")
    ws.question("Describe how you would redraw the graph in Question 1 so it is fair.",
                "Start the vertical axis at 0 and use an even scale.", space=40)


# ==========================================================================
# Box plots, cumulative frequency, frequency polygons, histograms
# ==========================================================================
def five(data):
    s = sorted(data)
    k = len(s)
    return s[0], s[(k + 1) // 4 - 1], s[(k + 1) // 2 - 1], s[3 * (k + 1) // 4 - 1], s[-1]


def box_draw(ws):
    ws.section("Practice")
    data = [12, 15, 18, 20, 21, 23, 25, 28, 30, 34, 40]
    mn, q1, md, q3, mx = five(data)
    ws.question(f"Here are 11 test scores:   {', '.join(map(str, data))}\n(a) Find the minimum, lower quartile, median, upper "
                "quartile and maximum.\n(b) Draw a box plot on the scale below.",
                f"(a) {mn}, {q1}, {md}, {q3}, {mx}   (b) check the box plot", space=10)
    FQ(ws, "", "", boxplots(10, 45, 5, [("", mn, mn, mn, mn, mn)][:0], xlabel="Score"), h=90)
    fig = boxplots(0, 60, 10, [("", 8, 20, 28, 40, 55)], xlabel="Time (minutes)")
    FQ(ws, "The box plot shows the times some people took to finish a puzzle.", "", fig, h=90, space=0)
    P(ws, "Use the box plot above.", [("Write down the median.", "28 minutes"), ("Find the range.", "47 minutes"),
                                      ("Find the interquartile range.", "20 minutes"),
                                      ("What fraction of people took more than 40 minutes?", "[[1//4]]")])
    ws.section("Problem solving")
    ws.question("Why can't you find the mean from a box plot?", "A box plot only shows five values, not every data value.",
                space=35)


def box_compare(ws):
    ws.section("Practice")
    fig = boxplots(0, 100, 10, [("Class A", 20, 45, 60, 70, 90), ("Class B", 35, 50, 55, 62, 80)], xlabel="Test mark")
    FQ(ws, "The box plots show the test marks of two classes.", "", fig, h=130, space=0)
    P(ws, "Use the box plots above.", [("Find the median and interquartile range for each class.",
                                        "A: median 60, IQR 25.  B: median 55, IQR 12"),
                                       ("Compare the marks of the two classes.",
                                        "Class A did better on average (higher median). Class B's marks were more consistent "
                                        "(smaller IQR).")], row_h=40)
    ws.section("Problem solving")
    ws.question("Why should you use the median and IQR, not the range, to compare box plots?",
                "The range uses only the extreme values, which might be outliers; the median and IQR describe the middle of "
                "the data.", space=45)


def conv_draw(ws):
    ws.section("Practice")
    TQ(ws, "£1 = €1.20. Complete the table, then draw a conversion graph on the grid.",
       [["Pounds (£)", "0", "10", "20", "30", "40", "50"], ["Euros (€)", "0", "", "", "", "", "60"]],
       "€12, €24, €36, €48; a straight line from (0, 0) to (50, 60).", space=0)
    FQ(ws, "", "", chart(0, 50, 0, 70, 10, 10, [], xlabel="Pounds (£)", ylabel="Euros (€)", minor=2, xminor=2), h=190)
    ws.section("Problem solving")
    ws.question("Use your graph to change (a) £35 to euros   (b) €54 to pounds.", "(a) €42   (b) £45", space=40)
    ws.question("Why does a conversion graph always go through (0, 0)?", "0 of one currency is 0 of the other.", space=35)


def conv_read(ws):
    ws.section("Practice")
    fig = chart(0, 10, 0, 25, 1, 5, [("line", [(0, 0), (10, 22)])], xlabel="Kilograms (kg)", ylabel="Pounds (lb)", minor=1,
                xminor=None)
    FQ(ws, "The graph converts kilograms to pounds (lb).", "", fig, h=190, space=0)
    P(ws, "Use the graph above.", [("Change 5 kg to pounds.", "11 lb"), ("Change 22 lb to kg.", "10 kg"),
                                   ("Change 8 kg to pounds.", "about 17.6 lb"), ("Change 50 kg to pounds.", "110 lb (5 × 22)")])
    ws.section("Problem solving")
    ws.question("A suitcase can weigh at most 23 kg. Sam's weighs 48 lb. Is it too heavy?",
                "48 lb ≈ 21.8 kg, so it is under 23 kg: not too heavy.", space=40)


CF_CLASSES = [(0, 10, 4), (10, 20, 10), (20, 30, 18), (30, 40, 12), (40, 50, 6)]


def cf_points():
    pts, run = [(0, 0)], 0
    for a, b, f in CF_CLASSES:
        run += f
        pts.append((b, run))
    return pts


def cf_draw(ws):
    ws.section("Practice")
    rows = [["Time, t (min)", "Frequency", "Cumulative frequency"]] + [[f"{a} < t ≤ {b}", str(f), ""] for a, b, f in CF_CLASSES]
    TQ(ws, "The table shows the times 50 people waited. Complete the cumulative frequency column, then draw the cumulative "
           "frequency graph.", rows, "4, 14, 32, 44, 50; plot at the upper class boundaries (10, 4), (20, 14), (30, 32), "
                                    "(40, 44), (50, 50) and start at (0, 0).", w=330, space=0)
    FQ(ws, "", "", chart(0, 50, 0, 50, 10, 10, [], xlabel="Time (minutes)", ylabel="Cumulative frequency", minor=2, xminor=2), h=200)
    ws.section("Problem solving")
    ws.question("Why are cumulative frequencies plotted at the END of each class, not the middle?",
                "By the end of the class, all the values in it have been counted.", space=40)


def cf_read(ws):
    ws.section("Practice")
    pts = cf_points()
    fig = chart(0, 50, 0, 50, 10, 10, [("line", pts, "dots")], xlabel="Time (minutes)", ylabel="Cumulative frequency", minor=2,
                xminor=2)
    FQ(ws, "The graph shows the waiting times of 50 people.", "", fig, h=200, space=0)
    def inv(v):
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            if y0 <= v <= y1:
                return x0 + (v - y0) / (y1 - y0) * (x1 - x0)
    med, lq, uq = inv(25), inv(12.5), inv(37.5)
    P(ws, "Use the graph above.", [("Estimate the median.", f"about {med:.0f} minutes"),
                                   ("Estimate the lower and upper quartiles.", f"about {lq:.0f} and {uq:.0f} minutes"),
                                   ("Estimate the interquartile range.", f"about {uq - lq:.0f} minutes"),
                                   ("Estimate how many people waited more than 35 minutes.", f"about {50 - (32 + 6):.0f}")])
    ws.section("Problem solving")
    ws.question("Explain how to find the median from a cumulative frequency graph.",
                "Go across from half the total (here 25) to the curve, then down to read the value.", space=40)


FP_CLASSES = [(0, 10, 5), (10, 20, 11), (20, 30, 16), (30, 40, 9), (40, 50, 4)]


def fp_draw(ws):
    ws.section("Practice")
    rows = [["Mass, m (kg)", "Frequency", "Midpoint"]] + [[f"{a} < m ≤ {b}", str(f), ""] for a, b, f in FP_CLASSES]
    TQ(ws, "Complete the midpoint column, then draw a frequency polygon on the grid.", rows,
       "midpoints 5, 15, 25, 35, 45; plot (5, 5), (15, 11), (25, 16), (35, 9), (45, 4) and join with straight lines.",
       w=300, space=0)
    FQ(ws, "", "", chart(0, 50, 0, 18, 10, 2, [], xlabel="Mass (kg)", ylabel="Frequency", minor=1, xminor=2), h=180)
    ws.section("Problem solving")
    ws.question("Why are the points plotted at the midpoints of the classes?",
                "We don't know the exact values, so the midpoint represents each class.", space=40)


def fp_read(ws):
    ws.section("Practice")
    pts = [((a + b) / 2, f) for a, b, f in FP_CLASSES]
    fig = chart(0, 50, 0, 18, 10, 2, [("line", pts, "dots")], xlabel="Mass (kg)", ylabel="Frequency", minor=1, xminor=2)
    FQ(ws, "The frequency polygon shows the masses of some parcels.", "", fig, h=180, space=0)
    P(ws, "Use the graph above.", [("Which class has the highest frequency (the modal class)?", "20 < m ≤ 30"),
                                   ("How many parcels weighed between 30 and 40 kg?", "9"),
                                   ("How many parcels were weighed altogether?", str(sum(f for *_, f in FP_CLASSES))),
                                   ("Estimate the mean mass.", f"{sum(((a + b) / 2) * f for a, b, f in FP_CLASSES) / 45:.1f} kg")])
    ws.section("Problem solving")
    ws.question("A second frequency polygon is drawn for a different set of parcels. Its peak is further to the right. "
                "What does this tell you?", "The second set of parcels tends to be heavier.", space=40)


HIST = [(0, 10, 8), (10, 15, 12), (15, 20, 15), (20, 30, 14), (30, 50, 6)]


def hist_draw(ws):
    ws.section("Practice")
    rows = [["Time, t (s)", "Frequency", "Frequency density"]] + [[f"{a} < t ≤ {b}", str(f), ""] for a, b, f in HIST]
    TQ(ws, "Complete the frequency density column, then draw a histogram.", rows,
       "frequency densities " + ", ".join(n(f / (b - a)) for a, b, f in HIST) + "; bar widths match the class widths.",
       w=300, space=0)
    FQ(ws, "", "", chart(0, 50, 0, 3.5, 10, 0.5, [], xlabel="Time (seconds)", ylabel="Frequency density", minor=0.1,
                         xminor=2), h=190)
    ws.section("Problem solving")
    ws.question("Why do histograms with unequal class widths use frequency density instead of frequency?",
                "So that the AREA of each bar shows the frequency; wider classes would otherwise look too big.", space=45)


def hist_read(ws, harder=False):
    ws.section("Practice")
    items = [("rect", a, b, 0, f / (b - a), 0) for a, b, f in HIST]
    fig = chart(0, 50, 0, 3.5, 10, 0.5, items, xlabel="Time (seconds)", ylabel="Frequency density", minor=0.1, xminor=2)
    FQ(ws, "The histogram shows the times taken by some people to solve a puzzle.", "", fig, h=190, space=0)
    if not harder:
        P(ws, "Use the histogram above.", [(f"How many people took between {a} and {b} seconds?", str(f)) for a, b, f in HIST[:3]] +
          [("How many people were there altogether?", str(sum(f for *_, f in HIST)))])
    else:
        total = sum(f for *_, f in HIST)
        est = 15 / 2 + 14 / 2      # 17.5 < t <= 25: half of 15<t<=20 plus half of 20<t<=30
        P(ws, "Use the histogram above.", [
            ("Estimate how many people took between 17.5 and 25 seconds.", f"7.5 + 7 = {n(est)}"),
            ("Estimate how many took more than 40 seconds.", "3"),
            ("Estimate the median time.", "the 27.5th value: 20 in the first two bars, so 7.5 into the 15–20 bar "
                                          f"(density 3): 15 + 7.5 ÷ 3 = 17.5 seconds"),
            ("What percentage of people took 20 seconds or less?", f"{(8 + 12 + 15) / total * 100:.1f}%")], row_h=36)
    ws.section("Problem solving")
    ws.question("Explain how to find a frequency from a histogram.", "frequency = frequency density × class width (the area "
                "of the bar)", space=40)


# ==========================================================================
# Pie charts, scatter graphs, stem and leaf
# ==========================================================================
def pie_draw(ws):
    ws.section("Practice")
    cats, vals = ["Car", "Bus", "Walk", "Cycle"], [12, 8, 15, 5]
    total = sum(vals)
    TQ(ws, "40 pupils were asked how they travel to school. Work out the angle for each, then draw a pie chart.",
       [["Travel", "Frequency", "Angle"]] + [[c, str(v), ""] for c, v in zip(cats, vals)],
       "angles " + ", ".join(f"{c} {v * 360 // total}°" for c, v in zip(cats, vals)), w=240, space=0)
    FQ(ws, "", "", scene([("circle", (0, 0), 1), ("dot", (0, 0)), ("seg", (0, 0), (0, 1))], pad=6), w=170, h=170)
    ws.section("Problem solving")
    ws.question("Explain why each pupil is worth 9° in the pie chart above.", "360 ÷ 40 = 9", space=35)


def pie_read(ws):
    ws.section("Practice")
    cats, angles = ["Pop", "Rock", "Rap", "Classical"], [144, 90, 81, 45]
    FQ(ws, "The pie chart shows the favourite music of 120 people.", "", pie(angles, cats, show_angles=True), w=260, h=170, space=0)
    P(ws, "Use the pie chart above.", [(f"How many people chose {c}?", str(a * 120 // 360)) for c, a in zip(cats, angles)] +
      [("What fraction chose Rock?", "[[1//4]]")], cols=2)
    ws.section("Problem solving")
    ws.question("A different pie chart shows 200 people. Its Pop slice is also 144°. Did more people choose Pop in this group? "
                "Explain.", "Yes: 144° of 200 is 80 people, but 144° of 120 is only 48. Same angle doesn't mean same number.",
                space=50)


SCATTER = [(150, 45), (155, 50), (160, 52), (162, 55), (165, 58), (168, 57), (170, 62), (172, 64), (175, 66), (178, 70),
           (180, 72), (158, 66)]


def scat_draw(ws):
    ws.section("Practice")
    xs, ys = zip(*SCATTER[:-1])
    TQ(ws, "The table shows the heights and masses of 11 people. Plot a scatter graph.",
       [["Height (cm)"] + [str(x) for x in xs], ["Mass (kg)"] + [str(y) for y in ys]], "check the 11 points", w=420, space=0)
    FQ(ws, "", "", chart(145, 185, 40, 75, 5, 5, [], xlabel="Height (cm)", ylabel="Mass (kg)", minor=1, xminor=1), h=200)
    ws.section("Problem solving")
    ws.question("Describe the relationship between height and mass.", "positive correlation: taller people tend to be heavier",
                space=35)


def scat_read(ws):
    ws.section("Practice")
    fig = chart(145, 185, 40, 75, 5, 5, [("points", SCATTER)], xlabel="Height (cm)", ylabel="Mass (kg)", minor=1, xminor=1)
    FQ(ws, "The scatter graph shows the heights and masses of 12 people.", "", fig, h=200, space=0)
    P(ws, "Use the graph above.", [("What is the mass of the tallest person?", "72 kg"),
                                   ("How many people are taller than 170 cm?", "4"),
                                   ("Which point does not fit the pattern (an outlier)?", "(158, 66)"),
                                   ("Describe the correlation.", "positive")])
    ws.section("Problem solving")
    ws.question("Does this graph prove that being taller makes you heavier? Explain.",
                "No: correlation shows a link, not that one causes the other.", space=40)


def scat_lobf(ws):
    ws.section("Practice")
    pts = SCATTER[:-1]
    xs, ys = zip(*pts)
    mx, my = st.mean(xs), st.mean(ys)
    m = sum((x - mx) * (y - my) for x, y in pts) / sum((x - mx) ** 2 for x in xs)
    est = lambda x: my + m * (x - mx)
    fig = chart(145, 185, 40, 75, 5, 5, [("points", pts)], xlabel="Height (cm)", ylabel="Mass (kg)", minor=1, xminor=1)
    FQ(ws, "(a) Draw a line of best fit on the scatter graph.\n(b) Use it to estimate the mass of someone 167 cm tall.\n"
           "(c) Estimate the height of someone with a mass of 60 kg.",
       f"(a) a straight line through the middle of the points, passing near ({mx:.0f}, {my:.0f})   (b) about {est(167):.0f} kg   "
       f"(c) about {mx + (60 - my) / m:.0f} cm", fig, h=210, space=10)
    ws.section("Problem solving")
    ws.question("Why would it be unreliable to use the line to estimate the mass of someone 120 cm tall?",
                "120 cm is outside the range of the data (extrapolation); the pattern may not continue.", space=45)


def scat_corr(ws):
    ws.section("Practice")
    import random
    rnd = random.Random(7)
    def plot(kind):
        pts = []
        for i in range(14):
            x = rnd.uniform(1, 9)
            y = {"positive": x + rnd.uniform(-1.3, 1.3), "negative": 10 - x + rnd.uniform(-1.3, 1.3),
                 "no correlation": rnd.uniform(1, 9)}[kind]
            pts.append((x, max(0.5, min(9.5, y))))
        return chart(0, 10, 0, 10, 2, 2, [("points", pts)], grid=False)
    kinds = ["positive", "negative", "no correlation", "negative", "positive", "no correlation"]
    ws.figures("Describe the type of correlation shown by each scatter graph.", [plot(k) for k in kinds], kinds, cols=3,
               fig_h=100)
    P(ws, "What type of correlation would you expect between", [
        ("hours of revision and test score?", "positive"), ("age of a car and its value?", "negative"),
        ("shoe size and favourite colour number?", "no correlation"), ("temperature and ice creams sold?", "positive")], cols=1)
    ws.section("Problem solving")
    ws.question("Explain the difference between strong and weak positive correlation.",
                "Both go up together; strong means the points lie close to a straight line, weak means they are spread out.",
                space=45)


def sl_draw(ws):
    ws.section("Practice")
    data = [23, 31, 45, 27, 38, 42, 29, 35, 31, 48, 22, 36, 41, 33, 27]
    s = sorted(data)
    stems = {}
    for v in s:
        stems.setdefault(v // 10, []).append(v % 10)
    ans = ";  ".join(f"{k} | {' '.join(map(str, l))}" for k, l in stems.items())
    ws.question(f"Here are the ages of 15 people:   {', '.join(map(str, data))}\nDraw an ordered stem-and-leaf diagram. "
                "Include a key.", f"{ans}   Key: 2 | 3 means 23", space=130)
    ws.question("Use your diagram to find (a) the median   (b) the range   (c) the mode.",
                f"(a) {st.median(data)}   (b) {max(data) - min(data)}   (c) 27 and 31", space=40)
    ws.section("Problem solving")
    ws.question("Why must a stem-and-leaf diagram have a key?", "So the reader knows what the stem and leaf mean "
                "(e.g. 2 | 3 could be 23 or 2.3).", space=40)


def sl_read(ws):
    ws.section("Practice")
    rows = [(1, [2, 5, 8]), (2, [0, 3, 3, 7, 9]), (3, [1, 4, 4, 4, 6, 8]), (4, [2, 5])]
    data = [s * 10 + l for s, ls in rows for l in ls]
    FQ(ws, "The stem-and-leaf diagram shows the marks of some pupils in a quiz.", "",
       stem_leaf(rows, "2 | 3 means 23 marks"), w=200, h=95, space=0)
    P(ws, "Use the diagram above.", [("How many pupils took the quiz?", str(len(data))), ("What is the highest mark?", "45"),
                                     ("Find the mode.", "34"), ("Find the median.", n(st.median(data))),
                                     ("Find the range.", str(max(data) - min(data))),
                                     ("How many pupils scored more than 30?", str(sum(1 for v in data if v > 30)))], cols=2)
    ws.section("Problem solving")
    ws.question("Give one advantage of a stem-and-leaf diagram over a bar chart.", "It keeps all the original data values.",
                space=35)


# ==========================================================================
# Real-life graphs
# ==========================================================================
def distance_time(ws):
    ws.section("Practice")
    journey = [(0, 0), (1, 30), (1.5, 30), (2.5, 50), (3, 50), (4, 0)]
    fig = chart(0, 4, 0, 60, 0.5, 10, [("line", journey)], xlabel="Time (hours)", ylabel="Distance from home (km)", minor=5,
                xminor=0.25)
    FQ(ws, "The distance–time graph shows a cycle ride.", "", fig, h=200, space=0)
    P(ws, "Use the graph above.", [("How far did the cyclist go in the first hour?", "30 km"),
                                   ("How long did the cyclist stop for the first time?", "30 minutes"),
                                   ("What was the speed between 1.5 and 2.5 hours?", "20 km/h"),
                                   ("How far from home was the furthest point?", "50 km"),
                                   ("What was the speed on the way home?", "50 km/h (50 km in 1 hour)")])
    ws.section("Problem solving")
    ws.question("How can you tell from a distance–time graph which part of a journey was fastest?",
                "It is the steepest part of the line.", space=35)


def real_linear(ws):
    ws.section("Practice")
    fig = chart(0, 10, 0, 25, 1, 5, [("line", [(0, 3), (10, 23)])], xlabel="Distance (miles)", ylabel="Cost (£)", minor=1)
    FQ(ws, "The graph shows the cost of a taxi journey.", "", fig, h=190, space=0)
    P(ws, "Use the graph above.", [("What is the cost of a 5-mile journey?", "£13"), ("How far can you go for £19?", "8 miles"),
                                   ("What is the fixed charge (the cost at 0 miles)?", "£3"),
                                   ("How much does each extra mile cost?", "£2"),
                                   ("Write a formula for the cost C of a journey of d miles.", "C = 2d + 3")])
    ws.section("Problem solving")
    ws.question("A second taxi firm charges £2.50 per mile with no fixed charge. For which journeys is it cheaper?",
                "2.5d < 2d + 3 when d < 6, so for journeys under 6 miles", space=50)


def containers(ws):
    ws.section("Practice")
    def cont(kind):
        if kind == "cylinder":
            pts = [(0, 0), (1, 0), (1, 2), (0, 2)]
        elif kind == "wide":
            pts = [(-0.5, 0), (1.5, 0), (0.7, 2), (0.3, 2)]
        else:
            pts = [(0.3, 0), (0.7, 0), (1.5, 2), (-0.5, 2)]
        return scene([("poly", pts, "nofill")], pad=10)
    def graph(kind):
        f = {"A": lambda t: t, "B": lambda t: 1 - (1 - t) ** 2, "C": lambda t: t * t}[kind]
        return chart(0, 1, 0, 1, 1, 1, [("line", [(t / 20, f(t / 20)) for t in range(21)])], xlabel="time", ylabel="depth",
                     grid=False)
    ws.figures("Water is poured into each container at a steady rate.", [cont("cylinder"), cont("wide"), cont("narrow")],
               ["graph A", "graph C", "graph B"], cols=3, fig_h=80, answer_line=False)
    ws.figures("Match each container above to one of these graphs of depth against time.", [graph(k) for k in "ABC"],
               ["(a) straight line: the cylinder", "(b) rises fast then slows: the narrow-bottomed container",
                "(c) rises slowly then speeds up: the wide-bottomed container"], cols=3, fig_h=95)
    ws.section("Problem solving")
    ws.question("Sketch the graph for a container shaped like a cylinder on top of a wider cylinder.",
                "two straight lines: shallow slope first (wide part), then steeper (narrow part)", space=90)


SHEETS = [
    ({"slug": "graphs-bar-charts-draw"}, bar_draw), ({"slug": "graphs-bar-charts-reading"}, bar_read),
    ({"slug": "graphs-composite-bar-charts"}, composite), ({"slug": "graphs-dual-bar-charts"}, dual),
    ({"slug": "graphs-vertical-line-charts"}, vertical_line), ({"slug": "graphs-box-plots-draw-and-interpret"}, box_draw),
    ({"slug": "graphs-box-plots-compare"}, box_compare), ({"slug": "graphs-conversion-graphs-draw"}, conv_draw),
    ({"slug": "graphs-conversion-graphs-interpret"}, conv_read), ({"slug": "graphs-cumulative-frequency-draw"}, cf_draw),
    ({"slug": "graphs-cumulative-frequency-reading"}, cf_read), ({"slug": "graphs-frequency-polygons-draw"}, fp_draw),
    ({"slug": "graphs-frequency-polygons-reading"}, fp_read), ({"slug": "graphs-histograms-draw"}, hist_draw),
    ({"slug": "graphs-histograms-interpret"}, hist_read), ({"slug": "graphs-histograms-harder"}, lambda ws: hist_read(ws, True)),
    ({"slug": "graphs-line-graphs"}, line_graph), ({"slug": "graphs-misleading-graphs"}, misleading),
    ({"slug": "graphs-pictograms-draw"}, pict_draw), ({"slug": "graphs-pictograms-interpret"}, pict_read),
    ({"slug": "graphs-pie-charts-draw"}, pie_draw), ({"slug": "graphs-pie-charts-interpret"}, pie_read),
    ({"slug": "graphs-scatter-graphs-draw"}, scat_draw), ({"slug": "graphs-scatter-graphs-interpret"}, scat_read),
    ({"slug": "graphs-scatter-graphs-line-of-best-fit"}, scat_lobf), ({"slug": "graphs-scatter-graphs-correlation"}, scat_corr),
    ({"slug": "graphs-stem-and-leaf-draw"}, sl_draw), ({"slug": "graphs-stem-and-leaf-interpret"}, sl_read),
    ({"slug": "graphs-distance-time-graphs"}, distance_time), ({"slug": "graphs-real-life-linear-graphs"}, real_linear),
    ({"slug": "graphs-filling-containers"}, containers),
]
