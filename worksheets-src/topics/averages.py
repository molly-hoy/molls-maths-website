"""Averages: 13 worksheets (see SHEETS at the bottom).
Every answer is calculated from the data shown, using Python's statistics."""
import statistics as st
from engine.geo import table
from topics.area import n


def P(ws, prompt, qa, cols=1, **kw):
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols, **kw)


def lst(xs):
    return ",  ".join(str(x).replace("-", "−") for x in xs)


def tq(ws, prompt, rows, answer, w=None, space=40, side=False):
    """A question with a table underneath."""
    ncols = max(len(r) for r in rows)
    width = w or min(420, 60 + 62 * ncols)
    ws.question(prompt, answer, figure=table(rows, side_header=side, header=not side), fig_w=width,
                fig_h=20 * len(rows) + 4, fig_pos="below", space=space)


def freq_rows(values, freqs, vlabel, flabel="Frequency"):
    return [[vlabel, flabel]] + [[str(v), str(f)] for v, f in zip(values, freqs)]


def expand(values, freqs):
    out = []
    for v, f in zip(values, freqs):
        out += [v] * f
    return out


# ==========================================================================
def median(ws):
    ws.section("Practice")
    sets = [[3, 7, 2, 9, 5], [12, 4, 8, 15, 6, 10, 9], [21, 17, 30, 25, 19, 22, 28], [6, 2, 9, 4],
            [1.5, 3.2, 2.8, 4.1, 2.2, 3.6], [-3, 5, -1, 2, 0], [40, 35, 52, 48, 41, 39, 60, 44]]
    P(ws, "Find the median of each set of numbers.", [(lst(s), n(st.median(s), 2)) for s in sets])
    ws.section("Problem solving")
    ws.question("The heights, in cm, of 8 plants are:  14,  9,  22,  17,  11,  19,  15,  20\nFind the median height.",
                f"order: 9, 11, 14, 15, 17, 19, 20, 22; median = (15 + 17) ÷ 2 = 16 cm", space=45)
    ws.question("Write down five numbers with a median of 10 and no two numbers the same.",
                "e.g. 3, 7, 10, 12, 20 (the middle number in order must be 10)", space=40)
    ws.question("Five numbers have a median of 8. Four of the numbers are 3, 12, 8 and 15.\n"
                "The fifth number is less than 8. Explain why the median is still 8.",
                "In order the numbers are ?, 3, 8, 12, 15 or 3, ?, 8, 12, 15: the third number is 8 either way.",
                space=45)
    ws.question("Ali says the median of 7, 2, 9, 4, 6 is 9 because it is in the middle.\nExplain his mistake.",
                "He did not put the numbers in order first: 2, 4, 6, 7, 9, so the median is 6.", space=40)


def median_freq(ws):
    ws.section("Practice")
    tables = [([0, 1, 2, 3, 4], [4, 7, 5, 3, 2], "Number of pets"), ([1, 2, 3, 4, 5, 6], [3, 5, 8, 6, 4, 2], "Score on a dice"),
              ([10, 11, 12, 13, 14], [2, 6, 9, 5, 3], "Age (years)")]
    for v, f, lab in tables:
        data = expand(v, f)
        tq(ws, f"The table shows the {lab.lower()} of some people. Find the median.", freq_rows(v, f, lab),
           f"total {len(data)}, median is the {n((len(data) + 1) / 2)}th value = {n(st.median(data))}", w=130, space=25)
    ws.section("Problem solving")
    v, f = [1, 2, 3, 4, 5], [6, 4, 3, 2, 1]
    data = expand(v, f)
    tq(ws, "The number of goals scored by a team in each match is shown.\nSam says the median is 3 because 3 is "
           "the middle number in the table. Explain why Sam is wrong and find the median.",
       freq_rows(v, f, "Goals"), f"The median is the middle value of all {len(data)} matches, not the middle of the "
                                 f"table: the {n((len(data) + 1) / 2)}th value is {n(st.median(data))}.", w=120, space=35)


def median_class(ws):
    ws.section("Practice")
    groups = [(["0 ≤ t < 10", "10 ≤ t < 20", "20 ≤ t < 30", "30 ≤ t < 40"], [5, 12, 9, 4], "Time, t (min)"),
              (["140 ≤ h < 150", "150 ≤ h < 160", "160 ≤ h < 170", "170 ≤ h < 180"], [3, 11, 14, 7], "Height, h (cm)"),
              (["0 ≤ m < 20", "20 ≤ m < 40", "40 ≤ m < 60", "60 ≤ m < 80", "80 ≤ m < 100"], [2, 8, 15, 10, 5], "Mark, m")]
    for cls, f, lab in groups:
        total = sum(f)
        pos = (total + 1) / 2
        run, which = 0, None
        for c, k in zip(cls, f):
            run += k
            if run >= pos:
                which = c
                break
        tq(ws, "Find the class that contains the median.", [[lab, "Frequency"]] + [[c, str(k)] for c, k in zip(cls, f)],
           f"{total} values, median is the {n(pos)}th value, in the class {which}", w=170, space=25)
    ws.section("Problem solving")
    ws.question("Explain why you cannot find the exact median from a grouped frequency table.",
                "You only know which group each value is in, not the actual values.", space=40)


def mean(ws):
    ws.section("Practice")
    sets = [[4, 6, 8, 10, 12], [3, 9, 5, 7], [12, 15, 18, 11, 14, 20], [2.5, 3.5, 4, 6], [-2, 4, 7, -1, 2],
            [105, 98, 112, 101, 94], [7, 7, 8, 9, 10, 11]]
    P(ws, "Find the mean of each set of numbers. Give answers to 1 decimal place where needed.",
      [(lst(s), n(st.mean(s), 1)) for s in sets])
    ws.section("Problem solving")
    ws.question("The mean of four numbers is 9. Three of the numbers are 6, 10 and 12. Find the fourth number.",
                "total = 36, so the fourth number is 36 − 28 = 8", space=45)
    ws.question("Five friends have a mean age of 14. A sixth friend, aged 20, joins them. Find the new mean age.",
                "total = 70 + 20 = 90, mean = 90 ÷ 6 = 15", space=45)
    ws.question("Write down three different numbers with a mean of 10.", "e.g. 5, 10, 15 (any three with a total of 30)",
                space=35)
    ws.question("Maya's mean score in 3 tests is 72. What does she need in the 4th test to raise her mean to 75?",
                "75 × 4 = 300, 300 − 216 = 84", space=45)


def combined_mean(ws):
    ws.section("Practice")
    cases = [(10, 6, 15, 8), (12, 50, 18, 60), (20, 3.5, 30, 4.5), (8, 72, 12, 65)]
    P(ws, "Find the mean of the two groups combined. Give answers to 1 d.p. where needed.",
      [(f"{a} people with a mean of {ma}, and {b} people with a mean of {mb}",
        f"({a} × {ma} + {b} × {mb}) ÷ {a + b} = {n((a * ma + b * mb) / (a + b), 1)}") for a, ma, b, mb in cases])
    ws.section("Problem solving")
    ws.question("Class A has 25 pupils with a mean test score of 64. Class B has 15 pupils with a mean of 72.\n"
                'Jo says the mean of both classes together is 68. Explain why Jo is wrong and find the correct mean.',
                "Jo just averaged the two means, but the classes are different sizes. "
                f"(25 × 64 + 15 × 72) ÷ 40 = {n((25 * 64 + 15 * 72) / 40, 1)}", space=60)
    ws.question("The mean weight of 6 boys is 52 kg. The mean weight of 4 girls is 47 kg.\n"
                "Find the mean weight of all 10 children.", "(312 + 188) ÷ 10 = 50 kg", space=45)
    ws.question("The mean of 10 numbers is 8. The mean of a different 5 numbers is 11.\n"
                "Find the mean of all 15 numbers.", "(80 + 55) ÷ 15 = 9", space=45)


def mean_freq(ws):
    ws.section("Practice")
    tables = [([0, 1, 2, 3, 4], [5, 8, 4, 2, 1], "Number of siblings"), ([1, 2, 3, 4, 5], [2, 6, 9, 5, 3], "Score"),
              ([20, 21, 22, 23, 24], [3, 7, 6, 3, 1], "Shoe size (EU)")]
    for v, f, lab in tables:
        sfx = sum(a * b for a, b in zip(v, f))
        tq(ws, "Find the mean from the frequency table. Give your answer to 1 decimal place where needed.",
           freq_rows(v, f, lab), f"Σfx = {sfx}, Σf = {sum(f)}, mean = {n(sfx / sum(f), 1)}", w=150, space=30)
    ws.section("Problem solving")
    v, f = [0, 1, 2, 3], [4, 10, 5, 1]
    tq(ws, "A survey asked people how many cars their household owns.\nAli says the mean is (0 + 1 + 2 + 3) ÷ 4 = 1.5. "
           "Explain his mistake and find the correct mean.", freq_rows(v, f, "Cars"),
       f"Ali ignored the frequencies. Σfx = {sum(a * b for a, b in zip(v, f))}, Σf = 20, mean = "
       f"{n(sum(a * b for a, b in zip(v, f)) / 20, 2)}", w=120, space=35)


def mean_estimated(ws):
    ws.section("Practice")
    groups = [(["0 ≤ t < 10", "10 ≤ t < 20", "20 ≤ t < 30", "30 ≤ t < 40"], [5, 12, 9, 4], [5, 15, 25, 35], "Time, t (min)"),
              (["0 ≤ m < 20", "20 ≤ m < 40", "40 ≤ m < 60", "60 ≤ m < 80"], [3, 8, 12, 7], [10, 30, 50, 70], "Mass, m (kg)"),
              (["150 ≤ h < 155", "155 ≤ h < 160", "160 ≤ h < 165", "165 ≤ h < 170"], [4, 9, 5, 2], [152.5, 157.5, 162.5, 167.5],
               "Height, h (cm)")]
    for cls, f, mids, lab in groups:
        sfx = sum(a * b for a, b in zip(f, mids))
        tq(ws, "Work out an estimate of the mean. Give your answer to 1 decimal place.",
           [[lab, "Frequency"]] + [[c, str(k)] for c, k in zip(cls, f)],
           f"midpoints {', '.join(n(m) for m in mids)}; Σfx = {n(sfx)}, Σf = {sum(f)}, estimated mean = {sfx / sum(f):.1f}",
           w=170, space=30)
    ws.section("Problem solving")
    ws.question("Explain why the mean from a grouped frequency table is only an estimate.",
                "We use the midpoint of each group instead of the real values, which we don't know.", space=40)


def mode(ws):
    ws.section("Practice")
    sets = [[3, 5, 3, 7, 8, 3, 5], [12, 15, 12, 18, 15, 15], [2, 4, 6, 8, 10], [7, 9, 7, 9, 4, 1],
            ["red", "blue", "red", "green", "blue", "red"], [1.2, 1.5, 1.2, 1.8, 1.5, 1.2]]
    def m(s):
        ms = st.multimode(s)
        return "no mode" if len(ms) == len(set(s)) else " and ".join(str(x) for x in ms)
    P(ws, "Find the mode of each set of data.", [(lst(s), m(s)) for s in sets])
    ws.section("Problem solving")
    ws.question("Write down a set of 6 numbers that has two modes, 4 and 9.", "e.g. 4, 4, 9, 9, 1, 6", space=35)
    ws.question("A shoe shop wants to know which size to order most of. Which average should it use? Explain.",
                "The mode: it shows the size that is bought most often.", space=40)
    ws.question("Can the mode be used for data that are not numbers? Give an example.",
                "Yes, e.g. the most popular colour or favourite sport.", space=35)


def mode_freq(ws):
    ws.section("Practice")
    tables = [([0, 1, 2, 3, 4], [4, 7, 5, 3, 2], "Number of pets"), (["Red", "Blue", "Green", "Yellow"], [8, 12, 5, 9], "Colour"),
              ([5, 6, 7, 8, 9, 10], [2, 4, 9, 11, 6, 3], "Mark")]
    for v, f, lab in tables:
        best = v[f.index(max(f))]
        tq(ws, "Write down the mode.", freq_rows(v, f, lab), f"{best} (it has the highest frequency, {max(f)})",
           w=130, space=20)
    tq(ws, "Write down the modal class.", [["Time, t (min)", "Frequency"], ["0 ≤ t < 5", "6"], ["5 ≤ t < 10", "14"],
                                           ["10 ≤ t < 15", "9"], ["15 ≤ t < 20", "3"]], "5 ≤ t < 10", w=170, space=20)
    ws.section("Problem solving")
    tq(ws, "Ben says the mode is 12 because it is the biggest number in the table. Explain why Ben is wrong.",
       freq_rows([1, 2, 3, 4], [5, 12, 7, 2], "Number of drinks"),
       "The mode is the value with the highest frequency, which is 2 drinks (frequency 12), not the frequency itself.",
       w=140, space=30)


def range_(ws):
    ws.section("Practice")
    sets = [[3, 9, 5, 12, 7], [45, 32, 51, 38, 49, 40], [2.3, 5.1, 3.8, 4.4], [-4, 6, 1, -2, 3], [-12, -3, -8, -5],
            [150, 162, 158, 171, 149]]
    P(ws, "Find the range of each set of data.", [(lst(s), n(max(s) - min(s), 1)) for s in sets])
    ws.section("Problem solving")
    ws.question("The range of five numbers is 10. Four of the numbers are 6, 9, 12 and 14.\n"
                "Find the two possible values of the fifth number.",
                "Either the smallest is 4 (14 − 10) or the largest is 16 (6 + 10).", space=50)
    ws.question("Team A's scores have a range of 5. Team B's scores have a range of 20.\n"
                "Which team is more consistent? Explain.", "Team A: a smaller range means the scores are less spread out.",
                space=45)
    ws.question("The temperature at midnight was −6 °C. At noon it was 9 °C. Find the range.", "15 °C", space=35)


def range_freq(ws):
    ws.section("Practice")
    tables = [([0, 1, 2, 3, 4, 5], [4, 7, 5, 3, 2, 1], "Number of pets"), ([12, 13, 14, 15, 16], [3, 8, 6, 0, 2], "Age"),
              ([1, 2, 3, 4, 5, 6], [0, 5, 8, 6, 4, 0], "Score")]
    for v, f, lab in tables:
        used = [a for a, b in zip(v, f) if b > 0]
        tq(ws, "Find the range of the data in the table.", freq_rows(v, f, lab),
           f"{max(used)} − {min(used)} = {max(used) - min(used)}" +
           (" (values with frequency 0 don't count)" if 0 in f else ""), w=130, space=20)
    ws.section("Problem solving")
    tq(ws, "Mo says the range is 10 − 1 = 9. Explain his mistake and find the range.",
       freq_rows([2, 3, 4, 5], [1, 10, 6, 4], "Goals"),
       "Mo used the frequencies. The range uses the values: 5 − 2 = 3.", w=120, space=30)


def quartiles(ws):
    ws.section("Practice")
    sets = [[2, 4, 5, 7, 8, 10, 12], [3, 6, 7, 9, 11, 14, 15, 18, 20, 21, 25],
            [12, 15, 15, 18, 20, 22, 25, 27, 30, 31, 34], [40, 42, 45, 46, 50, 51, 55, 58, 60, 62, 65, 68, 70, 72, 80]]
    def q(s):
        s = sorted(s)
        k = len(s)
        lq, med, uq = s[(k + 1) // 4 - 1], s[(k + 1) // 2 - 1], s[3 * (k + 1) // 4 - 1]
        return f"LQ = {lq}, median = {med}, UQ = {uq}, IQR = {uq - lq}"
    P(ws, "Find the lower quartile, median, upper quartile and interquartile range.", [(lst(s), q(s)) for s in sets])
    ws.section("Problem solving")
    ws.question("Explain why the interquartile range can be a better measure of spread than the range.",
                "It uses the middle half of the data, so it isn't affected by one very large or very small value.",
                space=45)
    ws.question("Group A has an IQR of 8. Group B has an IQR of 15. What does this tell you?",
                "The middle half of group B's data is more spread out (less consistent) than group A's.", space=40)


def distributions(ws):
    ws.section("Practice")
    P(ws, "Compare each pair of distributions. Write one sentence about the average and one about the spread.", [
        ("Class A: median 62, range 30.    Class B: median 55, range 18.",
         "Class A scored higher on average (median 62 > 55). Class B's marks were more consistent (range 18 < 30)."),
        ("Shop X: mean wait 4.2 min, range 6 min.    Shop Y: mean wait 3.5 min, range 11 min.",
         "Shop Y has a shorter wait on average. Shop X's waits are more consistent (smaller range)."),
        ("Girls: median 145 cm, IQR 8 cm.    Boys: median 148 cm, IQR 12 cm.",
         "The boys were taller on average. The girls' heights were less spread out (smaller IQR).")], row_h=34)
    tq(ws, "The table shows the number of goals scored in 6 matches by two teams.\n(a) Find the mean and range for "
           "each team.\n(b) Which team would you choose to play for? Give a reason.",
       [["Team", "Goals in each match"], ["Rovers", "2, 3, 2, 4, 3, 4"], ["United", "0, 6, 1, 5, 0, 6"]],
       "(a) Rovers: mean 3, range 2. United: mean 3, range 6.   (b) Same average, but Rovers are more consistent "
       "(any sensible reason).", w=230, space=55)
    ws.section("Problem solving")
    ws.question("Two sets of data have the same mean but very different ranges. Describe what this means.",
                "On average the values are the same size, but one set is much more spread out than the other.", space=40)
    ws.question("Explain why it is useful to compare both an average and a measure of spread.",
                "The average shows what is typical; the spread shows how consistent the data are. Two sets can match "
                "on one but not the other.", space=45)


SHEETS = [
    ({"slug": "averages-median"}, median),
    ({"slug": "averages-median-frequency-table"}, median_freq),
    ({"slug": "averages-median-class-grouped-data"}, median_class),
    ({"slug": "averages-mean"}, mean),
    ({"slug": "averages-combined-mean"}, combined_mean),
    ({"slug": "averages-mean-frequency-table"}, mean_freq),
    ({"slug": "averages-mean-estimated"}, mean_estimated),
    ({"slug": "averages-mode"}, mode),
    ({"slug": "averages-mode-frequency-table"}, mode_freq),
    ({"slug": "averages-range"}, range_),
    ({"slug": "averages-range-frequency-tables"}, range_freq),
    ({"slug": "averages-quartiles"}, quartiles),
    ({"slug": "averages-distributions"}, distributions),
]
