"""Money (14), volume of pyramids/frustums/spheres, numbers in words and figures,
flow charts, measuring and drawing lines, binary and reading tables.
Money answers use Decimal so pence never go wrong."""
import math
from decimal import Decimal as D, ROUND_HALF_UP
from engine.geo import scene, table
from engine.draw import solid, round_solid

CM = 28.3465          # 1 cm in PDF points, so lines print true size
PI = math.pi


def P(ws, prompt, qa, cols=2, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def gbp(x):
    """Money: £3.50, £12, 45p."""
    x = D(str(x)).quantize(D("0.01"), ROUND_HALF_UP)
    if x < 1:
        return f"{int(x * 100)}p"
    return f"£{x:,.2f}".replace(".00", "") if x == x.to_integral() else f"£{x:,.2f}"


# ==========================================================================
# Numbers in words
# ==========================================================================
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen " \
       "eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def words(n):
    """Write a whole number in words, British style (with 'and')."""
    if n < 20:
        return ONES[n]
    if n < 100:
        return TENS[n // 10] + ("-" + ONES[n % 10] if n % 10 else "")
    if n < 1000:
        return ONES[n // 100] + " hundred" + (" and " + words(n % 100) if n % 100 else "")
    for size, name in ((10 ** 6, "million"), (1000, "thousand")):
        if n >= size:
            rest = n % size
            joint = "" if not rest else (" and " if rest < 100 else " ")
            return words(n // size) + " " + name + joint + (words(rest) if rest else "")


def fig(n):
    return f"{n:,}".replace(",", " ")


def num_to_words(ws):
    ws.section("Practice")
    ns = [47, 315, 908, 1250, 4006, 12040, 70315, 250000, 1400000]
    P(ws, "Write each number in words.", [(fig(k), words(k)) for k in ns], cols=1)
    ws.section("Problem solving")
    ws.question("A cheque must have the amount written in words. Write £2 375 in words.", "two thousand three hundred and "
                "seventy-five pounds", space=40)


def words_to_num(ws):
    ws.section("Practice")
    ns = [63, 480, 705, 3412, 9090, 15600, 208017, 3500000]
    P(ws, "Write each number in figures.", [(words(k), fig(k)) for k in ns], cols=1)
    ws.section("Problem solving")
    ws.question("Write the number that is one more than nine thousand nine hundred and ninety-nine, in figures and in words.",
                "10 000, ten thousand", space=40)


# ==========================================================================
# Lines, binary, tables, flow charts
# ==========================================================================
def line_fig(L):
    """A line exactly L cm long, with dots at each end."""
    return scene([("seg", (0, 0), (L, 0)), ("dot", (0, 0)), ("dot", (L, 0)), ("text", (0, 0.2), "")], pad=6, max_scale=CM)


def measuring(ws):
    ws.section("Practice")
    Ls = [5, 8, 3.5, 11, 6.5, 9.2, 4.7, 12.4]
    ws.figures("Measure each line. Give your answer in cm (print this sheet at 100% size).", [line_fig(L) for L in Ls],
               [f"{L:g} cm ({int(L * 10)} mm)" for L in Ls], cols=1, fig_h=26)
    ws.section("Problem solving")
    ws.question("Write the length of line (c) in millimetres.", "35 mm", space=30)


def drawing(ws):
    ws.section("Practice")
    P(ws, "Use a ruler to draw a straight line of length", [(f"{x}", "Check the line with a ruler (to the nearest mm).")
                                                            for x in ("6 cm", "10 cm", "4.5 cm", "72 mm", "13.5 cm", "38 mm")], cols=1,
      row_h=34)
    ws.section("Problem solving")
    ws.question("Draw a line 8 cm long. Mark the point exactly halfway along it.", "The midpoint is 4 cm from each end.", space=50)


def binary(ws):
    ws.section("Practice")
    ds = [5, 9, 12, 17, 23, 30, 45, 64]
    P(ws, "Write each number in binary.", [(str(k), bin(k)[2:]) for k in ds], cols=4)
    bs = ["11", "101", "1000", "1101", "10110", "11111", "100100", "1010101"]
    P(ws, "Write each binary number as an ordinary (denary) number.", [(b, str(int(b, 2))) for b in bs], cols=4)
    ws.section("Problem solving")
    ws.question("Work out 1011 + 110 in binary.", "10001 (11 + 6 = 17)", space=35)
    ws.question("What is the largest number you can write with 5 binary digits?", "11111 = 31", space=30)


def reading_tables(ws):
    ws.section("Practice")
    rows = [["", "Adult", "Child", "Senior"], ["Mon–Thu", "£8.50", "£5.25", "£6.00"], ["Fri–Sun", "£10.75", "£6.50", "£7.25"]]
    ws.figure_only(table(rows, side_header=True), 300, 70)
    P(ws, "The table shows cinema ticket prices. Find the cost of", [("1 adult on Tuesday", "£8.50"), ("1 child on Saturday", "£6.50"),
                                                                    ("2 adults and 1 child on Monday", "£22.25"),
                                                                    ("2 seniors on Friday", "£14.50")], cols=2)
    ws.section("Problem solving")
    ws.question("How much more does a family of 2 adults and 2 children pay on Sunday than on Wednesday?", "£34.50 − £27.50 = £7",
                space=40)


def box(cx, cy, w, h, text):
    return [("poly", [(cx - w / 2, cy - h / 2), (cx + w / 2, cy - h / 2), (cx + w / 2, cy + h / 2), (cx - w / 2, cy + h / 2)]),
            ("text", (cx, cy), text, None)]


def flow_fig(steps):
    """A vertical flow chart: Start, the steps, Stop, joined by arrows."""
    items, y = [], 0
    allsteps = ["Start"] + steps + ["Stop"]
    for i, s in enumerate(allsteps):
        items += box(0, -i * 1.4, 4.6, 0.8, s)
        if i:
            items.append(("ray", (0, -(i - 1) * 1.4 - 0.4), (0, -i * 1.4 + 0.4)))
    return scene([it if it[0] != "text" else ("text", it[1], it[2]) for it in items], pad=6, font_size=9.5)


def flow_charts(ws):
    ws.section("Practice")
    ch = ["Think of a number n", "Multiply by 3", "Subtract 4", "Write down the answer"]
    ws.question("Use the flow chart to find the output when the input is\n(a) 5   (b) 10   (c) −2",
                "(a) 11  (b) 26  (c) −10", figure=flow_fig(ch), fig_w=170, fig_h=230, space=10)
    ws.question("Use the same flow chart. What number was put in if the answer is 20?", "8", space=35)
    ws.section("Problem solving")
    ws.question("Draw a flow chart that takes a number, doubles it, adds 5 and then halves the result. What comes out when 7 goes in?",
                "9.5", space=90)


# ==========================================================================
# Money
# ==========================================================================
def m_coins(ws):
    ws.section("Practice")
    P(ws, "Work out the total.", [("20p, 10p, 5p and 2p", "37p"), ("50p, 50p, 20p and 1p", "£1.21"), ("£1, 20p, 20p and 5p", "£1.45"),
                                  ("£2, £1, 50p and 10p", "£3.60"), ("three 20p coins", "60p"), ("five 5p coins and a 2p", "27p")], cols=2)
    P(ws, "Write down the fewest coins needed to make", [("35p", "20p, 10p, 5p"), ("78p", "50p, 20p, 5p, 2p, 1p"),
                                                         ("£1.60", "£1, 50p, 10p"), ("£3.99", "£2, £1, 50p, 20p, 20p, 5p, 2p, 2p")], cols=2)
    ws.section("Problem solving")
    ws.question("Jo has 4 coins that make 72p. What are they?", "50p, 20p, 1p, 1p", space=35)


def m_change(ws):
    ws.section("Practice")
    qs = [(5, "3.40"), (10, "6.75"), (2, "1.15"), (20, "12.99"), (1, "0.43"), (50, "37.60")]
    P(ws, "Work out the change.", [(f"Pay £{p} for an item costing {gbp(c)}", gbp(D(p) - D(c))) for p, c in qs], cols=2)
    ws.section("Problem solving")
    ws.question("Sam buys a comic for £2.85 and a drink for 95p. He pays with a £5 note. How much change does he get?", "£1.20",
                space=40)


def m_buying(ws):
    ws.section("Practice")
    menu = [["Item", "Price"], ["Sandwich", "£2.40"], ["Crisps", "75p"], ["Apple", "45p"], ["Drink", "£1.20"]]
    ws.figure_only(table(menu), 160, 100)
    P(ws, "Use the price list. Find the cost of", [("a sandwich and a drink", "£3.60"), ("2 apples and crisps", "£1.65"),
                                                   ("3 drinks", "£3.60"), ("one of each item", "£4.80")], cols=2)
    ws.section("Problem solving")
    ws.question("Mia has £5. Can she buy 2 sandwiches and a drink? Explain.", "No: 2 × £2.40 + £1.20 = £6.00, which is more than £5.", space=40)


def m_regular(ws):
    ws.section("Practice")
    P(ws, "Work out", [("£35 a month for a year", "£420"), ("£12.50 a week for 52 weeks", "£650"),
                       ("£4.20 a day for 5 days a week for 4 weeks", "£84"), ("£1260 a year, paid monthly. Find the monthly amount.", "£105")],
      cols=1)
    ws.section("Problem solving")
    ws.question("A phone costs £30 deposit and then £18.75 a month for 24 months. Find the total cost.", "£480", space=40)
    ws.question("A gym costs £29 a month or £320 a year. Which is cheaper over a year, and by how much?", "Yearly, by £28", space=40)


def m_bills(ws):
    ws.section("Practice")
    rows = [["Item", "Quantity", "Price each", "Total"], ["Paint (tin)", "3", "£14.50", ""], ["Brush", "2", "£3.75", ""],
            ["Roller", "1", "£6.20", ""], ["", "", "Total", ""]]
    ws.figure_only(table(rows), 320, 110)
    ws.parts("Complete the bill.", ["Paint total", "Brush total", "Roller total", "Bill total"], ["£43.50", "£7.50", "£6.20", "£57.20"],
             cols=4)
    ws.section("Problem solving")
    ws.question("A restaurant bill is £64. A 12.5% service charge is added. Find the total.", "£72", space=40)


def m_discounts(ws):
    ws.section("Practice")
    qs = [(40, 10), (80, 25), (120, 15), (35, 20), (250, 30), (18.60, 50)]
    P(ws, "Find the sale price.", [(f"{gbp(p)} with {d}% off", gbp(D(str(p)) * (100 - d) / 100)) for p, d in qs], cols=2)
    ws.section("Problem solving")
    ws.question("Shop A: £60 with 20% off. Shop B: £55 with £5 off. Which is cheaper?", "A £48, B £50: Shop A", space=40)
    ws.question("A coat costs £72 in a sale with 10% off. What was the original price?", "£80", space=40)


def m_vat(ws):
    ws.section("Practice")
    ps = [50, 120, 35, 9.99, 480, 1250]
    P(ws, "VAT is 20%. Find the price including VAT.", [(f"{gbp(p)} + VAT", gbp(D(str(p)) * D("1.2"))) for p in ps], cols=3)
    P(ws, "These prices include 20% VAT. Find the price before VAT.", [(gbp(p), gbp(D(p) / D("1.2"))) for p in (60, 240, 18)], cols=3)
    ws.section("Problem solving")
    ws.question("A plumber charges £45 an hour plus VAT. Find the bill for 3 hours' work.", "£162", space=40)


def m_wages(ws):
    ws.section("Practice")
    P(ws, "Work out", [("Pay for 35 hours at £12.40 an hour", "£434"), ("Pay for 8 hours at £11.50 an hour", "£92"),
                       ("Overtime: 6 hours at time and a half, on £12 an hour", "£108"),
                       ("Weekly pay for £28 600 a year", "£550"), ("Monthly pay for £31 800 a year", "£2650")], cols=1)
    ws.section("Problem solving")
    ws.question("Dan works 37.5 hours a week at £13.20 an hour, plus 4 hours overtime at time and a half. Find his weekly pay.",
                "£495 + £79.20 = £574.20", space=45)


def m_statements(ws):
    ws.section("Practice")
    rows = [["Date", "Details", "Paid out", "Paid in", "Balance"], ["1 Mar", "Opening balance", "", "", "£520.00"],
            ["3 Mar", "Supermarket", "£64.20", "", "A"], ["8 Mar", "Wages", "", "£812.50", "B"], ["12 Mar", "Rent", "£650.00", "", "C"],
            ["20 Mar", "Phone", "£22.99", "", "D"]]
    ws.figure_only(table(rows), 360, 125)
    ws.parts("Work out the missing balances.", ["A", "B", "C", "D"], ["£455.80", "£1268.30", "£618.30", "£595.31"], cols=4)
    ws.section("Problem solving")
    ws.question("What does a negative balance on a bank statement mean?", "The account is overdrawn: you owe the bank money.", space=35)


def m_tax(ws):
    ws.section("Practice")
    ws.question("Income tax: the first £12 570 is tax-free; income above this is taxed at 20% (up to £50 270).\n"
                "Find the tax paid on a salary of\n(a) £20 000   (b) £30 000   (c) £45 570",
                "(a) £1486  (b) £3486  (c) £6600", fig_pos="right", space=70)
    ws.question("Council tax is £1860 a year, paid in 10 equal instalments. Find each instalment.", "£186", space=35)
    ws.section("Problem solving")
    ws.question("After tax, Priya takes home £24 000 using the rules above. What is her salary?", "Tax-free £12 570, taxed part "
                "0.8x = 11 430, x = £14 287.50: salary £26 857.50", space=55)


def m_unit_cost(ws):
    ws.section("Practice")
    P(ws, "Work out", [("Cost per kg: 3 kg of potatoes for £2.40", "80p"), ("Cost per litre: 2 l of milk for £1.70", "85p"),
                       ("Cost per metre: 5 m of rope for £7.50", "£1.50"), ("Cost of 4 kg at £1.35 per kg", "£5.40"),
                       ("Cost of 250 g at £8 per kg", "£2"), ("Cost of 1.5 m at £6.40 per metre", "£9.60")], cols=1)
    ws.section("Problem solving")
    ws.question("Which is better value: 750 ml of juice for £1.20 or 2 litres for £3.00?", "£1.60/l vs £1.50/l: the 2 litre bottle",
                space=45)


def m_meters(ws):
    ws.section("Practice")
    rows = [["", "Previous reading", "Present reading", "Units used", "Cost at 28p per unit"], ["Home A", "34 512", "35 247", "", ""],
            ["Home B", "08 960", "09 418", "", ""], ["Home C", "71 005", "71 893", "", ""]]
    ws.figure_only(table(rows, side_header=True), 420, 85)
    ws.parts("Complete the table of electricity meter readings.", ["Units used by A", "Cost for A", "Units used by B", "Cost for B",
                                                                   "Units used by C", "Cost for C"],
             ["735", "£205.80", "458", "£128.24", "888", "£248.64"], cols=2)
    ws.section("Problem solving")
    ws.question("There is also a standing charge of 45p a day. Find Home A's bill for 90 days.", "£205.80 + £40.50 = £246.30", space=40)


def m_profit(ws):
    ws.section("Practice")
    P(ws, "Find the profit (or loss).", [("Buy for £40, sell for £55", "£15 profit"), ("Buy for £120, sell for £96", "£24 loss"),
                                         ("Buy 20 at £3, sell all at £4.50", "£30 profit")], cols=1)
    P(ws, "Find the percentage profit or loss.", [("Cost £50, sold £60", "20% profit"), ("Cost £80, sold £68", "15% loss"),
                                                  ("Cost £25, sold £34", "36% profit")], cols=3)
    ws.section("Problem solving")
    ws.question("A trader buys 50 cakes for £30 and sells 45 of them at 90p each. Find the profit.", "£40.50 − £30 = £10.50", space=40)


def m_greatest(ws):
    ws.section("Practice")
    P(ws, "Work out", [("Most £2.40 cinema snacks you can buy with £10", "4 (£0.40 left)"),
                       ("Most £0.65 stickers you can buy with £5", "7"), ("Least number of 12-seat minibuses for 80 people", "7"),
                       ("Most 45p stamps for £4", "8"), ("Least number of boxes of 6 eggs to get 50 eggs", "9")], cols=1)
    ws.section("Problem solving")
    ws.question("Pens cost 85p each or £3 for a pack of 4. What is the most pens Ali can buy with £10?",
                "3 packs (£9) = 12 pens, then 1 single (85p): 13 pens", space=45)


def m_estimation(ws):
    ws.section("Practice")
    P(ws, "Estimate by rounding", [("£4.95 + £3.10 + £1.98", "£5 + £3 + £2 = £10"), ("6 items at £2.99", "6 × £3 = £18"),
                                   ("£19.50 × 4", "£20 × 4 = £80"), ("£61.20 ÷ 3", "£60 ÷ 3 = £20")], cols=2)
    ws.section("Problem solving")
    ws.question("Lewis has £20. He wants 3 T-shirts at £6.95 each. Use estimation to decide whether he has enough money.",
                "3 × £7 = £21 so roughly no; exact £20.85, not enough", space=45)


def m_midpoint(ws):
    ws.section("Practice")
    P(ws, "Find the amount halfway between", [("£20 and £30", "£25"), ("£4.50 and £7.50", "£6"), ("£12 and £19", "£15.50"),
                                              ("85p and £1.45", "£1.15"), ("£120 and £175", "£147.50"), ("£3.99 and £5.25", "£4.62")], cols=3)
    ws.section("Problem solving")
    ws.question("A house was valued at £240 000 and then at £262 000. What value is halfway between?", "£251 000", space=40)


def m_proportion(ws):
    ws.section("Practice")
    P(ws, "Work out", [("4 pens cost £2.80. Find the cost of 7.", "£4.90"), ("£1 = €1.15. Change £60 to euros.", "€69"),
                       ("£1 = $1.25. Change $50 to pounds.", "£40"), ("5 kg costs £8.50. Find the cost of 3 kg.", "£5.10")], cols=1)
    ws.section("Problem solving")
    ws.question("A pair of trainers costs £72 in the UK and €80 in Spain. £1 = €1.15. Where are they cheaper?",
                "€80 ÷ 1.15 = £69.57: Spain", space=45)


# ==========================================================================
# Volume
# ==========================================================================
def vol_pyramid(ws):
    ws.section("Practice")
    qs = [(6, 6, 10), (4, 5, 9), (8, 8, 12), (3, 7, 5)]
    P(ws, "Work out the volume of each rectangle-based pyramid ([[1//3]] × base area × height).",
      [(f"base {a} cm by {b} cm, height {h} cm", f"{a * b * h / 3:g} cm^3") for a, b, h in qs], cols=1)
    ws.question("A square-based pyramid has a base 9 cm by 9 cm and a height of 8 cm. Find its volume.", "216 cm^3",
                figure=solid("square-based pyramid"), fig_w=120, fig_h=95, space=20)
    ws.section("Problem solving")
    ws.question("A pyramid has a square base of side 5 cm and a volume of 100 cm^3. Find its height.", "12 cm", space=40)


def vol_sphere(ws):
    ws.section("Practice")
    rs = [3, 5, 2.5, 10, 7, 1.2]
    P(ws, "Work out the volume of each sphere ([[4//3]]πr^3), to 1 d.p.", [(f"radius {r:g} cm", f"{4 / 3 * PI * r ** 3:.1f} cm^3")
                                                                         for r in rs], cols=2)
    P(ws, "Work out the volume of each hemisphere, to 1 d.p.", [(f"radius {r:g} cm", f"{2 / 3 * PI * r ** 3:.1f} cm^3")
                                                              for r in (6, 4)], cols=2)
    ws.section("Problem solving")
    ws.question("A sphere has volume 288π cm^3. Find its radius.", "r^3 = 216, r = 6 cm", figure=round_solid("sphere"), fig_w=90,
                fig_h=80, space=20)


def vol_frustum(ws):
    ws.section("Practice")
    qs = [(6, 3, 12, 6), (10, 5, 16, 8), (9, 6, 15, 10)]
    out = []
    for R, r, H, h in qs:
        v = PI / 3 * (R * R * H - r * r * h)
        out.append((f"cone radius {R} cm, height {H} cm; removed cone radius {r} cm, height {h} cm", f"{v:.1f} cm^3"))
    P(ws, "A frustum is made by cutting a small cone off the top of a large cone. Work out each volume, to 1 d.p.", out, cols=1)
    ws.section("Problem solving")
    ws.question("A bucket is a frustum: top radius 15 cm, base radius 10 cm, depth 30 cm. Show the full cone would be 90 cm tall, "
                "then find the bucket's volume in litres.", "Similar cones: H = 90, small cone 60 cm. V = [[1//3]]π(15^2 × 90 − "
                f"10^2 × 60) = {PI / 3 * (225 * 90 - 100 * 60) / 1000:.1f} litres", figure=round_solid("cone"), fig_w=90, fig_h=100,
                space=20)


SHEETS = [
    ({"slug": "volume-pyramid"}, vol_pyramid), ({"slug": "volume-frustum"}, vol_frustum), ({"slug": "volume-sphere"}, vol_sphere),
    ({"slug": "number-writing-figures-in-words"}, num_to_words), ({"slug": "number-writing-words-in-figures"}, words_to_num),
    ({"slug": "flow-charts"}, flow_charts), ({"slug": "reading-tables"}, reading_tables),
    ({"slug": "measuring-lines"}, measuring), ({"slug": "drawing-lines"}, drawing), ({"slug": "binary"}, binary),
    ({"slug": "money-coins"}, m_coins), ({"slug": "money-change"}, m_change), ({"slug": "money-buying"}, m_buying),
    ({"slug": "money-regular-payments"}, m_regular), ({"slug": "money-bills"}, m_bills), ({"slug": "money-discounts"}, m_discounts),
    ({"slug": "money-vat"}, m_vat), ({"slug": "money-wages"}, m_wages), ({"slug": "money-bank-statements"}, m_statements),
    ({"slug": "money-tax"}, m_tax), ({"slug": "money-cost-per-kg-cost-per-litre-cost-per-metre"}, m_unit_cost),
    ({"slug": "money-reading-meters"}, m_meters), ({"slug": "money-profit"}, m_profit), ({"slug": "money-greatest-maximum"}, m_greatest),
    ({"slug": "money-estimation"}, m_estimation), ({"slug": "money-midpoint"}, m_midpoint), ({"slug": "money-proportion"}, m_proportion),
]
