"""
Make the master worksheet list
==============================

Turns the original topic list (one title per line) into
worksheets-src/worksheet-list.csv, the to-do list for the worksheets:

    slug, title, topic, level, merged_from, status

  - Headings that aren't worksheets are dropped.
  - Repeats are merged into one worksheet (merged_from records the others).
  - Every worksheet gets a topic (for the filter on the site) and a level.
  - status is "done" when public/worksheets/<slug>.pdf exists.

Run:  python3 worksheets-src/make_list.py path/to/list.txt
You only need this again if the original list changes. After that, edit
the CSV directly if you want to change a title, topic or level.
"""
import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Lines that are headings or notes, not worksheets
DROP = {"Additional Topics", "Algebraic", "Geometric", "Circle theorems:", ""}

# Repeats: every title on the left is folded into the title on the right.
MERGE = {
    "Area: circles": "Circles: area",
    "Perimeter: semi-circle": "Circles: perimeter – semi-circle",
    "Triangles: congruent": "Congruent triangles",
    "Quadratic formula:": "Quadratics: formula",
    "Linear graphs: midpoint of a line": "Coordinates: midpoint of a line",
    "Pythagoras: distance points": "Coordinates: distance between 2 points",
    "Linear graphs: length of a line": "Coordinates: distance between 2 points",
    "Division: by decimals": "Decimals: division by decimals",
    "Division: decimals by integers": "Decimals: dividing decimals by integers",
    "Iterative Processes": "Iteration",
    "Quadratic graph (completing the square)": "Quadratic graphs: finding turning point",
    "Circle theorems – examples": "Circle theorems – theorems",
    "Quadratic nth term – Version 2": "Quadratic nth term – Version 1",
    "Quadratic nth term – Version 3": "Quadratic nth term – Version 1",
    "Averages: class containing median": "Averages: median (grouped data)",
    "Pythagoras: area of a regular hexagon": "Area: hexagon",
    "Number: cubing a number": "Number: cube numbers",
    "Number: squaring a number": "Number: square numbers",
}

# Clearer names for some titles (the original wording is kept in merged_from)
RENAME = {
    "Circle theorems – theorems": "Circle theorems: mixed",
    "Quadratic nth term – Version 1": "Sequences: quadratic nth term",
    "Area: hexagon": "Area: regular hexagon",
    "Number: cube numbers": "Number: cube numbers and cubing",
    "Number: square numbers": "Number: square numbers and squaring",
    "Averages: median (grouped data)": "Averages: median class (grouped data)",
    "Coordinates: distance between 2 points": "Coordinates: distance between two points",
    "Capture\\Recapture": "Capture–recapture",
    "Inequalities": "Inequalities: symbols",
    "Linear graphs: (across one method)": "Linear graphs: drawing (across-one method)",
    "Ratio: solving problems 1": "Ratio: problem solving",
    "Enlargements: centre of enlargement": "Enlargements: from a centre",
    "Enlargements: finding c.of.enlarge": "Enlargements: finding the centre",
    "Graphs composite bar charts": "Graphs: composite bar charts",
    "Graphs: box plots- draw\\interpret": "Graphs: box plots (draw and interpret)",
    "Circle theorems: angles at circumference\\centre": "Circle theorems: angle at the centre",
    "Percentages: increasing\\decreasing": "Percentages: increasing and decreasing",
    "Types of data:Qualitative/Quantitative": "Types of data: qualitative and quantitative",
    "Trigonometry introduction:": "Trigonometry: introduction",
    "Trigonometry missing sides:": "Trigonometry: missing sides",
    "Trigonometry missing angles:": "Trigonometry: missing angles",
    "Quadratics: formula": "Quadratics: the quadratic formula",
    "Money": "Money: mixed",
    "Coordinates": "Coordinates: reading and plotting",
    "Pythagoras": "Pythagoras: finding sides",
    "Factorisation": "Factorisation: single brackets",
}

# --------------------------------------------------------------------------
# Topic groups for the filter on the website (first matching rule wins)
# --------------------------------------------------------------------------
TOPIC_RULES = [
    ("Number", r"^Fractions|^FDP"),
    ("Money", r"^Money"),
    ("Probability", r"^Probability|Frequency Trees|Venn|Set notation"),
    ("Statistics", r"^Averages|^Graphs: (bar|composite|dual|vertical|box|cumulative|frequency|histogram|line graphs|misleading|pictogram|pie|scatter|stem)"
                   r"|Data handling|Questionnaires|^Sampling|^Tables|Tally|Types of data|Time series|Capture|Reading Tables"),
    ("Ratio and proportion", r"^Ratio|^Proportion|^Percentages|Speed|Density|Pressure|Kinematics|best buys|currency|^Scales and maps|Money: proportion|Dimensional"),
    ("Geometry and measures", r"shapes|^Angles|^Area: |^Circles|Circle theorems|Congruent|^Constructions|^Coordinates|^Enlargements|^Reflections|^Rotations|^Translations"
                              r"|Transformations: mixture|^Perimeter|^Pythagoras|^Trigonometry: (?!.*graph|Exact)|^Trigonometry: (introduction|missing)|^Surface area|^Volume|^Symmetry|^Triangles"
                              r"|^Units|^Vectors|^Views|^Parallel lines|^Perpendicular lines|Measuring Lines|Drawing Lines|Chord|Secant|Shortest distance|Scales: reading|Exact values"),
    ("Money", r"^Money"),
    ("Algebra", r"^Algebra|^Equations|^Factorisation|^Inequalities|^Linear graphs|^Quadratic|^Sequences|^Simultaneous|^Types of graph|Identities|functions|^Iteration"
                r"|Change of Sign|progressions|Function Machines|Flow Charts|^Graphs: |Transformations of|Area under|Rate of Change|Invariant|Tangent to a Circle|^Indices: laws"
                r"|Trigonometry: (Sine|Cosine|Tangent) graph|quadratic inequalities"),
    ("Number", r"."),
]

# Levels: "KS2" (primary), "KS3", "GCSE Foundation", "GCSE Higher".
LEVEL_RULES = [
    ("GCSE Higher", r"completing the square|equation of a circle|three brackets|Algebraic fractions|Circle theorems|negative scale factor|fractional scale|fractional advanced"
                    r"|splitting the middle|quadratics harder|recurring|box plots|cumulative frequency|histograms|Indices: (fractional|negative)|Inequalities: (quadratic|regions)"
                    r"|Forming quadratic inequalities|Linear graphs: perpendicular|Limits of accuracy: applying|Pythagoras: 3D|Trigonometry: 3D|sine rule|cosine rule|area of a triangle|Trigonometry: (Sine|Cosine|Tangent) graph"
                    r"|Exact values|Transformations of|Surds|Similar shapes: (area|volume|further)|Simultaneous equations \((advanced|graphical)|Simultaneous Equations \(3"
                    r"|quadratic formula|Quadratics: solving \(completing|solving graphically advanced|Frustum|Inverse functions|Composite functions|Iteration|Change of Sign"
                    r"|Tangent to a Circle|Chord|Secant|Identities|Rate of Change|Area under|Invariant|conditional|Proportion: Graphs|Capture|Sampling: stratified"
                    r"|quadratic nth term|nth term for fractional|Types of graph: (exponential|reciprocal|mixture)|Kinematics|Rationalis|changing the subject advanced"
                    r"|Equation of a Tangent|Geometric progressions|Shortest distance|Quadratic graphs: (sketching|finding turning)|Coordinates: 3D|Dimensional|turning point"),
    ("KS2", r"^3D shapes: names|^Addition|^Subtraction|Multiplication: (grid|column|times tables)|Division: (short|long|remainders)|Money: (coins|change|buying)|place value|odd and even"
            r"|Measuring Lines|Drawing Lines|Tally|pictograms|Graphs: bar charts|Time: calculations|Writing (figures|words)|Rounding: to (nearest|whole)|Fractions: of shapes"
            r"|compass directions|Angles: right angle|2D shapes|3D shapes: names|Scales: reading|Number: ordering numbers|Fractions: equivalent"),
    ("GCSE Foundation", r"^Money|^Percentages|^Probability|^Ratio|^Proportion|Pythagoras|Trigonometry|^Quadratics|^Simultaneous|Standard form|Product of primes|Sampling"
                        r"|Error Intervals|Limits of accuracy|distance between two points|3D shapes: (nets|vertices)|Venn|Set notation|Frequency Trees|Speed|Density|Pressure|^Linear graphs|Inequalities|Factorisation: (quadratics|difference)"
                        r"|^Vectors|Surface area: (sphere|cone)|Volume: (cone|pyramid|sphere)|Circles: (arc|segment)|Area: sector|Averages: (mean \(estimated|median \(|range \()"
                        r"|scatter|time series|Quadratic graphs|Types of graph|Arithmetic progressions|Product rule|Sequences: nth term|Function|Bearings|bearings|Constructions"
                        r"|Enlargements|Reflections|Rotations|Translations|Transformations|Similar|Congruent|Expanding two|Equations: (forming|letters|cross|trial|x squared)"
                        r"|Algebra: (changing|indices|expanding two)|Rounding: (significant|highest)|Use of a calculator|Indices|rational|Recurring|Units: (converting|metric to)"),
    ("KS3", r"."),
]


def classify(title, rules):
    for name, pattern in rules:
        if re.search(pattern, title, flags=re.I):
            return name
    return rules[-1][0]


def slugify(title):
    s = title.lower().replace("&", "and").replace("%", "percent")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def main(src):
    raw = Path(src).read_text(encoding="utf-8").splitlines()
    titles = []
    for line in raw:
        t = re.sub(r"\s+", " ", line.replace("\t", " ")).strip()
        # the capture-recapture line had an example question attached to it
        if t.lower().startswith("capture"):
            t = "Capture\\Recapture"
        if not t or t in DROP or not re.search(r"[A-Za-z]", t):
            continue
        # lines that were part of the example question run on without a title
        if re.match(r"^(She|The next|Of these|Work out)", t):
            continue
        titles.append(t)

    rows, seen = {}, {}
    for t in titles:
        target = MERGE.get(t, t)
        if target not in rows:
            rows[target] = {"from": []}
        if t != target or t in seen:
            rows[target]["from"].append(t)
        seen[t] = True

    out = []
    for original, info in rows.items():
        title = RENAME.get(original, original)
        merged = [original] if title != original else []
        merged += [m for m in info["from"] if m != original]
        if any(m == original for m in info["from"]):
            merged.append(f"{original} (listed twice)")
        slug = slugify(title)
        out.append({
            "slug": slug,
            "title": title,
            "topic": classify(title, TOPIC_RULES),
            "level": classify(title, LEVEL_RULES),
            "merged_from": "; ".join(dict.fromkeys(merged)),
            "status": "done" if (ROOT / "public" / "worksheets" / f"{slug}.pdf").exists() else "to do",
        })

    path = ROOT / "worksheets-src" / "worksheet-list.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0]))
        w.writeheader()
        w.writerows(out)
    print(f"{len(titles)} lines in the list -> {len(out)} worksheets  ({path.name})")


if __name__ == "__main__":
    main(sys.argv[1])
