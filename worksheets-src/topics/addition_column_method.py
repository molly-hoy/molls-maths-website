"""Addition: column method
Answers are added up by the computer, so they can't be mistyped."""
from engine.draw import column_calc

META = {"title": "Addition: column method", "slug": "addition-column-method"}


def sums(ws, prompt, pairs, cols=4):
    ws.figures(prompt, [column_calc(p) for p in pairs],
               [f"{sum(p):,}".replace(",", " ") if sum(p) >= 10000 else str(sum(p)) for p in pairs],
               cols=cols, fig_h=66, answer_line=False)


def build(ws):
    ws.section("Practice")

    sums(ws, "Work out", [(34, 25), (52, 37), (41, 46), (63, 35)])

    sums(ws, "Work out. You will need to carry.", [
        (48, 36), (57, 29), (126, 245), (368, 254),
        (475, 386), (709, 196), (2346, 1578), (4085, 2937),
    ])

    sums(ws, "Work out", [(253, 46, 120), (1407, 365, 28), (38, 914, 207)], cols=3)

    pairs = [("253 + 46", 299), ("1407 + 365", 1772), ("6052 + 3948", 10000),
             ("12 384 + 5927", 18311), ("999 + 1001", 2000), ("45 + 8 + 376", 429)]
    ws.parts("Set these out in columns and work them out.",
             [p for p, _ in pairs], [f"{a:,}".replace(",", " ") if a >= 10000 else str(a) for _, a in pairs],
             cols=3, row_h=70)

    ws.section("Problem solving")

    ws.question("A school has 486 boys and 517 girls. How many pupils are there altogether?",
                "1003", space=42)

    ws.question("Find the missing digits.        3 □ 7  +  2 4 □  =  6 1 2",
                "367 + 245 = 612", space=42)

    ws.question("Ali works out 2564 + 1378 and gets 3832.\nIs Ali correct? Explain your answer.",
                "No. The answer is 3942. Ali did not carry the 1s into the next column.", space=45)

    ws.question("Mia buys a coat for £68, shoes for £45 and a bag for £27.\nHow much does she spend altogether?",
                "£140", space=50)

    ws.question("Use each of the digits 1, 2, 3, 4, 5 and 6 once to make two 3-digit numbers.\n"
                "What is the largest total you can make?",
                "1173 (for example 642 + 531)", space=50)
