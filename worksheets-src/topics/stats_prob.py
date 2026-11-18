"""Probability (10), questionnaires, sampling (3), tables (3), tally charts and
types of data (3). Probabilities are worked out with Fraction so they are exact."""
from fractions import Fraction as F
from itertools import product
from engine.geo import scene, table
from engine.charts import chart


def P(ws, prompt, qa, cols=2, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def fr(x):
    """A Fraction as stacked-fraction markup (0 and 1 stay as numbers)."""
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"[[{x.numerator}//{x.denominator}]]"


# ==========================================================================
# Probability
# ==========================================================================
def pr_basic(ws):
    ws.section("Practice")
    P(ws, "A fair dice is rolled. Find the probability of getting", [("a 4", fr(F(1, 6))), ("an even number", fr(F(3, 6))),
                                                                     ("a number greater than 4", fr(F(2, 6))), ("a 7", "0"),
                                                                     ("a prime number", fr(F(3, 6))), ("a number less than 7", "1")],
      cols=3)
    bag = {"red": 5, "blue": 3, "green": 2}
    P(ws, "A bag has 5 red, 3 blue and 2 green counters. One is taken at random. Find P(", [
        ("red)", fr(F(5, 10))), ("blue)", fr(F(3, 10))), ("green)", fr(F(2, 10))), ("red or blue)", fr(F(8, 10))),
        ("yellow)", "0"), ("not green)", fr(F(8, 10)))], cols=3)
    ws.section("Problem solving")
    ws.question("A spinner has 8 equal sections numbered 1 to 8. Find the probability it lands on a multiple of 3.", fr(F(2, 8)), space=35)
    ws.question("A letter is chosen at random from the word PROBABILITY. Find P(B).", fr(F(2, 11)), space=35)


def pr_not(ws):
    ws.section("Practice")
    ps = [F(3, 10), F(1, 4), F(2, 7), F(5, 9), F(7, 20)]
    P(ws, "The probability of an event happening is given. Find the probability it does not happen.",
      [(fr(p), fr(1 - p)) for p in ps] + [("0.35", "0.65"), ("0.08", "0.92"), ("62%", "38%")], cols=4)
    ws.section("Problem solving")
    ws.question("The probability it rains tomorrow is 0.4. What is the probability it does not rain?", "0.6", space=35)
    ws.question("A biased coin lands on heads with probability 0.58. Find P(tails).", "0.42", space=35)
    ws.question("P(red) = 0.2, P(blue) = 0.45 and the only other colour is green. Find P(green).", "0.35", space=35)


def pr_scale(ws):
    ws.section("Practice")
    P(ws, "Choose a word: impossible, unlikely, even chance, likely or certain.", [
        ("A dice lands on 9", "impossible"), ("A coin lands on heads", "even chance"), ("The sun rises tomorrow", "certain"),
        ("Rolling a 6 on a dice", "unlikely"), ("Picking a red card from 9 red and 1 black", "likely"),
        ("It snows in London in July", "unlikely")], cols=2)
    items = [("seg", (0, 0), (10, 0))] + [("seg", (i, -0.25), (i, 0.25)) for i in (0, 5, 10)]
    items += [("text", (0, -0.8), "0"), ("text", (5, -0.8), "[[1//2]]"), ("text", (10, -0.8), "1")]
    ws.question("Mark these on the probability scale with arrows.\nA: a coin lands on tails.  B: a dice shows a number less than 3.  "
                "C: picking a vowel from the letters A, E, I, O, T.", "A at [[1//2]], B at [[1//3]], C at [[4//5]]",
                figure=scene(items), fig_w=330, fig_h=50, fig_pos="below", space=10)
    ws.section("Problem solving")
    ws.question("Describe an event with a probability of 0.", "e.g. rolling a 7 on a normal dice", space=35)


def pr_listing(ws):
    ws.section("Practice")
    P(ws, "List all the possible outcomes for", [("flipping two coins", "HH, HT, TH, TT"),
                                                 ("choosing a starter (soup, salad) and a main (fish, pie, curry)",
                                                  "SoF, SoP, SoC, SaF, SaP, SaC"),
                                                 ("arranging the letters A, B, C", "ABC, ACB, BAC, BCA, CAB, CBA"),
                                                 ("flipping a coin and rolling a 1–4 spinner", "H1, H2, H3, H4, T1, T2, T3, T4")], cols=1)
    ws.section("Problem solving")
    ws.question("Two coins are flipped. Use your list to find P(one head and one tail).", "[[2//4]] = [[1//2]]", space=35)
    ws.question("How many outcomes are there when you flip three coins? Explain how you know.", "8 = 2 × 2 × 2", space=40)


def pr_space(ws):
    ws.section("Practice")
    rows = [["+"] + [str(i) for i in range(1, 7)]] + [[str(i)] + [""] * 6 for i in range(1, 7)]
    ws.figure_only(table(rows, side_header=True, col_w=[34] * 7), 240, 140)
    sums = [a + b for a, b in product(range(1, 7), repeat=2)]
    P(ws, "Two dice are rolled and the scores added. Complete the sample space above, then find", [
        ("P(total of 7)", fr(F(sums.count(7), 36))), ("P(total of 12)", fr(F(1, 36))), ("P(total of 2 or 3)", fr(F(3, 36))),
        ("P(total greater than 9)", fr(F(sum(s > 9 for s in sums), 36))), ("P(an even total)", fr(F(sum(s % 2 == 0 for s in sums), 36))),
        ("the most likely total", "7")], cols=3)
    ws.section("Problem solving")
    ws.question("A coin is flipped and a dice is rolled. How many outcomes are in the sample space? Find P(heads and a 6).",
                "12, [[1//12]]", space=40)


def pr_or(ws):
    ws.section("Practice")
    P(ws, "Events A and B are mutually exclusive. Find P(A or B).", [("P(A) = 0.3, P(B) = 0.5", "0.8"), ("P(A) = 0.12, P(B) = 0.4", "0.52"),
                                                                     ("P(A) = [[1//5]], P(B) = [[2//5]]", "[[3//5]]"),
                                                                     ("P(A) = [[1//3]], P(B) = [[1//4]]", "[[7//12]]")], cols=2)
    ws.figure_only(table([["Colour", "Red", "Blue", "Green", "Yellow"], ["Probability", "0.25", "0.3", "0.15", "x"]]), 300, 44)
    P(ws, "The table shows the probabilities for a spinner. Find", [("x", "0.3"), ("P(red or blue)", "0.55"),
                                                                    ("P(green or yellow)", "0.45"), ("P(not blue)", "0.7")], cols=4)
    ws.section("Problem solving")
    ws.question("Explain why getting an even number and getting a 4 on a dice are not mutually exclusive.",
                "They can both happen at once (rolling a 4).", space=40)


def pr_relfreq(ws):
    ws.section("Practice")
    ws.figure_only(table([["Outcome", "1", "2", "3", "4"], ["Frequency", "18", "22", "35", "25"]]), 260, 44)
    P(ws, "A spinner is spun 100 times. The results are in the table. Find the relative frequency of", [
        ("1", "0.18"), ("2", "0.22"), ("3", "0.35"), ("an even number", "0.47")], cols=4)
    ws.section("Problem solving")
    ws.question("Is the spinner above fair? Give a reason.", "Probably not: 3 came up far more than the 25 expected.", space=40)
    ws.question("A drawing pin lands point up 36 times in 80 throws. Estimate how many times it will land point up in 500 throws.",
                "0.45 × 500 = 225", space=40)
    ws.question("Why is it better to use 1000 trials than 10 to estimate a probability?", "More trials give a more reliable estimate.",
                space=35)


def pr_indep(ws):
    ws.section("Practice")
    P(ws, "A and B are independent. Find P(A and B).", [("P(A) = 0.5, P(B) = 0.4", "0.2"), ("P(A) = 0.3, P(B) = 0.7", "0.21"),
                                                         ("P(A) = [[1//2]], P(B) = [[1//6]]", "[[1//12]]"),
                                                         ("P(A) = [[2//3]], P(B) = [[3//5]]", "[[2//5]]")], cols=2)
    P(ws, "A fair coin is flipped and a fair dice is rolled. Find", [("P(head and 6)", "[[1//12]]"), ("P(tail and even)", "[[1//4]]"),
                                                                     ("P(head and a number less than 3)", "[[1//6]]")], cols=3)
    ws.section("Problem solving")
    ws.question("The probability Jo is late is 0.1 each day. Find the probability she is late on Monday and on Tuesday.", "0.01",
                space=35)
    ws.question("Find the probability of rolling three sixes in a row.", "[[1//216]]", space=35)


def tree_fig(p1, labels=("R", "B"), second=None):
    """A two-stage tree diagram. p1 = P(first branch). second=(top, bottom) for
    dependent events; None gives a blank tree with the first branches only."""
    items, q1 = [], 1 - p1
    ends = {1: (3, 2), -1: (3, -2)}
    for s, p, lab in ((1, p1, labels[0]), (-1, q1, labels[1])):
        ex, ey = ends[s]
        items += [("seg", (0, 0), (ex, ey)), ("text", (ex + 0.35, ey), lab), ("text", (1.2, ey * 0.62 + 0.35 * s), fr(p))]
        for s2, lab2 in ((1, labels[0]), (-1, labels[1])):
            ty = ey + s2 * 1
            items += [("seg", (ex + 0.8, ey), (ex + 3.6, ty)), ("text", (ex + 3.95, ty), lab2)]
            if second:
                pp = second[0 if s == 1 else 1][0 if s2 == 1 else 1]
                items.append(("text", (ex + 2.0, ey + s2 * 0.75 + 0.15), fr(pp)))
    return scene(items, font_size=9.5)


def pr_tree(ws):
    ws.section("Practice")
    ws.question("A bag has 3 red and 2 blue counters. A counter is taken, put back, then a second is taken.\n"
                "(a) Complete the tree diagram.\n(b) Find P(both red).\n(c) Find P(one of each colour).",
                f"(a) [[3//5]] and [[2//5]] on every pair  (b) [[9//25]]  (c) [[12//25]]",
                figure=tree_fig(F(3, 5)), fig_w=230, fig_h=150, fig_pos="right", space=10)
    ws.question("The probability Ed passes a test is 0.8 and that he passes a second test is 0.8. Draw a tree diagram and find "
                "P(he passes exactly one).", "0.8 × 0.2 + 0.2 × 0.8 = 0.32", space=120)
    ws.section("Problem solving")
    ws.question("Use the tree diagram from Question 1 to find P(at least one blue).", "1 − [[9//25]] = [[16//25]]", space=35)


def pr_cond(ws):
    ws.section("Practice")
    ws.question("A bag has 4 red and 3 blue counters. Two are taken without replacement.\n(a) Write the probabilities on the tree.\n"
                "(b) Find P(both red).\n(c) Find P(same colour).",
                "(a) [[4//7]], [[3//7]]; then [[3//6]], [[3//6]] after red and [[4//6]], [[2//6]] after blue  (b) [[12//42]] = [[2//7]]  "
                "(c) [[12//42]] + [[6//42]] = [[3//7]]", figure=tree_fig(F(4, 7)), fig_w=230, fig_h=150, fig_pos="right", space=10)
    ws.figure_only(table([["", "Walk", "Bus", "Car", "Total"], ["Year 7", "25", "40", "15", "80"], ["Year 8", "35", "30", "15", "80"],
                          ["Total", "60", "70", "30", "160"]], side_header=True), 300, 90)
    P(ws, "The table shows how students travel to school. A student is picked at random. Find", [
        ("P(bus, given they are in Year 7)", "[[40//80]] = [[1//2]]"), ("P(Year 8, given they walk)", "[[35//60]] = [[7//12]]"),
        ("P(car, given they are in Year 8)", "[[15//80]] = [[3//16]]")], cols=1)
    ws.section("Problem solving")
    ws.question("Two socks are picked without replacement from 5 black and 5 white. Find P(a matching pair).",
                "[[20//90]] + [[20//90]] = [[4//9]]", space=40)


# ==========================================================================
# Data collection
# ==========================================================================
def questionnaires(ws):
    ws.section("Practice")
    P(ws, "Write down one thing wrong with each question.", [
        ("How old are you?  □ 10–20  □ 20–30  □ 30–40", "Overlapping boxes (20 and 30 are in two) and no box over 40."),
        ("Don't you agree that school is too long?", "It is a leading question."),
        ("How much TV do you watch?  □ a little  □ a lot", "The options are vague: give time ranges."),
        ("How many hours do you sleep?  □ 6–7  □ 8–9", "Gaps: no box for under 6, between 7 and 8, or over 9.")], cols=1)
    ws.section("Problem solving")
    ws.question("Write a good question, with response boxes, to find out how many hours of homework a week students do.",
                "e.g. □ 0–2  □ more than 2 up to 4  □ more than 4 up to 6  □ more than 6 (no gaps or overlaps)", space=60)
    ws.question("Lucy asks 10 of her friends whether they like football. Explain why this sample might be biased.",
                "Too small, and her friends may share her interests.", space=40)


def samp_random(ws):
    ws.section("Practice")
    P(ws, "Is each sample random? Explain.", [
        ("Picking names out of a hat", "Yes: everyone has the same chance."),
        ("Asking the first 20 people in the lunch queue", "No: only early people can be picked."),
        ("Using a random number generator on a register", "Yes: every number is equally likely."),
        ("Asking people at a gym about exercise", "No: they are more likely to exercise.")], cols=1)
    ws.section("Problem solving")
    ws.question("Describe how to pick a random sample of 30 students from a school of 600.", "Number the students 1–600 and use a "
                "random number generator to pick 30 different numbers.", space=50)
    ws.question("Give one advantage and one disadvantage of using a sample instead of the whole population.", "Quicker/cheaper; "
                "may not represent everyone.", space=45)


def samp_using(ws):
    ws.section("Practice")
    P(ws, "Use the sample to estimate", [
        ("10 of a sample of 50 people are left-handed. How many of 2000 people?", "400"),
        ("12 of 40 apples in a sample are bruised. How many in a crate of 500?", "150"),
        ("3 of 60 light bulbs are faulty. How many in a batch of 1200?", "60"),
        ("In a sample, 18 of 30 like pizza best. How many of 450 students?", "270")], cols=1)
    ws.section("Problem solving")
    ws.question("A sample of 20 found 15 people support a new park. The paper says “75% of the town want the park”. "
                "Comment on this.", "The sample is very small, so 75% may not be reliable for the whole town.", space=45)


def samp_strat(ws):
    ws.section("Practice")
    ws.figure_only(table([["Year", "7", "8", "9", "10", "11", "Total"], ["Students", "180", "160", "200", "140", "120", "800"]]), 330, 44)
    ws.parts("A stratified sample of 80 students is taken. How many should be from", ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"],
             ["18", "16", "20", "14", "12"], cols=5)
    P(ws, "Work out the number for each group in the stratified sample.", [
        ("Sample of 50 from 300 men and 200 women", "30 men, 20 women"),
        ("Sample of 40 from 120 adults and 280 children", "12 adults, 28 children"),
        ("Sample of 60 from groups of 150, 250 and 100", "18, 30, 12")], cols=1)
    ws.section("Problem solving")
    ws.question("A club has 84 juniors and 156 seniors. A stratified sample of 30 is taken. How many seniors are in it?", "19.5 → 20",
                space=40)


# ==========================================================================
# Tables and tallies
# ==========================================================================
def tally_fig(n):
    """Draw n as tally marks: groups of four upright strokes crossed by a fifth."""
    def fig(c, x, y, w, h):
        from engine.draw import INK
        c.setStrokeColor(INK)
        c.setLineWidth(1.2)
        gx, top, bot = x + 8, y + h / 2 + 9, y + h / 2 - 9
        for g in range(n // 5 + (1 if n % 5 else 0)):
            k = min(5, n - g * 5)
            for i in range(min(k, 4)):
                c.line(gx + i * 5, bot, gx + i * 5, top)
            if k == 5:
                c.line(gx - 3, bot + 2, gx + 18, top - 2)
            gx += 30
    return fig


def tally(ws):
    ws.section("Practice")
    data = "dog cat dog fish cat dog rabbit cat dog dog fish cat dog cat rabbit dog cat dog fish dog".split()
    kinds = ["dog", "cat", "fish", "rabbit"]
    ws.question("Pets: " + ", ".join(data) + ".\nComplete a tally chart (with tally and frequency columns) for this data.",
                ", ".join(f"{k}: {data.count(k)}" for k in kinds), space=10,
                figure=table([["Pet", "Tally", "Frequency"]] + [[k, "", ""] for k in kinds], col_w=[70, 120, 70], row_h=22),
                fig_w=270, fig_h=120, fig_pos="below")
    ns = [7, 13, 20, 4, 16, 11, 25, 9]
    ws.figures("Write the number each tally shows.", [tally_fig(k) for k in ns], [str(k) for k in ns], cols=4, fig_h=40)
    ws.section("Problem solving")
    ws.question(f"Which pet is the most popular in Question 1? How many more people chose it than cat?",
                f"dog, {data.count('dog') - data.count('cat')} more", space=35)


def two_way(ws):
    ws.section("Practice")
    ws.figure_only(table([["", "Football", "Netball", "Swimming", "Total"], ["Boys", "34", "", "18", "60"], ["Girls", "", "27", "", ""],
                          ["Total", "45", "31", "", "120"]], side_header=True), 330, 90)
    P(ws, "Complete the two-way table above, then find", [("the number of girls who chose football", "11"),
                                                          ("the number of boys who chose netball", "4"),
                                                          ("the total who chose swimming", "44"), ("the number of girls", "60")], cols=2)
    ws.section("Problem solving")
    ws.question("80 people were asked if they have a pet. 45 are female. 30 males have a pet. 20 females do not have a pet. "
                "Draw a two-way table and find how many people do not have a pet.", "Male no pet 5, female pet 25: 25 have no pet",
                space=90)


def distance_chart(ws):
    ws.section("Practice")
    towns = ["Aston", "Brook", "Corby", "Delby"]
    d = {("Aston", "Brook"): 34, ("Aston", "Corby"): 52, ("Aston", "Delby"): 18, ("Brook", "Corby"): 41, ("Brook", "Delby"): 47,
         ("Corby", "Delby"): 63}
    rows = []
    for i, t in enumerate(towns):
        rows.append([""] * i + [t] + [str(d[(t, towns[j])]) for j in range(i + 1, len(towns))])
    ws.figure_only(table([[r[i] if i < len(r) else "" for i in range(4)] for r in rows], header=False, col_w=[56] * 4), 240, 90)
    P(ws, "The chart shows distances in miles. Find the distance from", [("Aston to Corby", "52 miles"), ("Brook to Delby", "47 miles"),
                                                                       ("Corby to Delby", "63 miles"), ("Aston to Brook", "34 miles")],
      cols=2)
    ws.section("Problem solving")
    ws.question("Sue drives from Delby to Aston, then on to Corby. How far is that?", "18 + 52 = 70 miles", space=35)
    ws.question("Which two towns are closest together?", "Aston and Delby", space=30)


def timetables(ws):
    ws.section("Practice")
    rows = [["Bus station", "07:45", "08:20", "09:05", "10:15"], ["Market", "07:58", "08:33", "09:18", "10:28"],
            ["Hospital", "08:10", "08:45", "09:30", "10:40"], ["Park", "08:24", "08:59", "09:44", "10:54"],
            ["Station", "08:37", "09:12", "09:57", "11:07"]]
    ws.figure_only(table(rows, header=False, side_header=True), 330, 110)
    P(ws, "Use the bus timetable to answer.", [("When does the 08:20 from the bus station reach the park?", "08:59"),
                                               ("How long does the journey from the market to the station take?", "39 minutes"),
                                               ("Ella must be at the hospital by 09:40. Which is the latest bus she can catch from "
                                                "the market?", "09:18"),
                                               ("How long after the first bus does the last bus reach the station?", "2 h 30 min")], cols=1)
    ws.section("Problem solving")
    ws.question("Raj arrives at the market at 08:40. How long does he wait for the next bus?", "38 minutes (09:18)", space=35)


# ==========================================================================
# Types of data
# ==========================================================================
def data_ql(ws):
    ws.section("Practice")
    P(ws, "Is each type of data qualitative or quantitative?", [("eye colour", "qualitative"), ("height", "quantitative"),
                                                                ("favourite sport", "qualitative"), ("number of pets", "quantitative"),
                                                                ("type of car", "qualitative"), ("time to run 100 m", "quantitative")],
      cols=3)
    ws.section("Problem solving")
    ws.question("Give two examples of qualitative data and two of quantitative data about a school.", "e.g. form names, uniform "
                "colour; number of pupils, lesson length", space=45)


def data_dc(ws):
    ws.section("Practice")
    P(ws, "Is each type of data discrete or continuous?", [("shoe size", "discrete"), ("mass of a baby", "continuous"),
                                                           ("number of goals", "discrete"), ("temperature", "continuous"),
                                                           ("number of siblings", "discrete"), ("time for a race", "continuous"),
                                                           ("length of a leaf", "continuous"), ("number of cars", "discrete")], cols=4)
    ws.section("Problem solving")
    ws.question("Shoe size can be 5½. Explain why it is still discrete.", "Only certain fixed values are possible; nothing between "
                "5½ and 6.", space=40)


def data_ps(ws):
    ws.section("Practice")
    P(ws, "Is each source primary or secondary data?", [("A survey you carry out", "primary"), ("Census results online", "secondary"),
                                                        ("Measuring heights in your class", "primary"),
                                                        ("A table in a newspaper", "secondary"),
                                                        ("Timing your friends running", "primary"), ("Weather records from the Met Office",
                                                                                                     "secondary")], cols=2)
    ws.section("Problem solving")
    ws.question("Give one advantage of primary data and one of secondary data.", "Primary: you know how it was collected. Secondary: "
                "quick and cheap to get.", space=45)


SHEETS = [
    ({"slug": "probability-basic"}, pr_basic), ({"slug": "probability-not-happening"}, pr_not),
    ({"slug": "probability-scale"}, pr_scale), ({"slug": "probability-listing-outcomes"}, pr_listing),
    ({"slug": "probability-sample-space"}, pr_space), ({"slug": "probability-or-rule"}, pr_or),
    ({"slug": "probability-relative-frequency"}, pr_relfreq), ({"slug": "probability-independent-events"}, pr_indep),
    ({"slug": "probability-tree-diagrams"}, pr_tree), ({"slug": "probability-conditional"}, pr_cond),
    ({"slug": "questionnaires"}, questionnaires), ({"slug": "sampling-random"}, samp_random),
    ({"slug": "sampling-using-samples"}, samp_using), ({"slug": "sampling-stratified"}, samp_strat),
    ({"slug": "tally-charts"}, tally), ({"slug": "tables-two-way-tables"}, two_way), ({"slug": "tables-distance-charts"}, distance_chart),
    ({"slug": "tables-timetables"}, timetables),
    ({"slug": "types-of-data-qualitative-and-quantitative"}, data_ql), ({"slug": "types-of-data-discrete-and-continuous"}, data_dc),
    ({"slug": "types-of-data-primary-and-secondary"}, data_ps),
]
