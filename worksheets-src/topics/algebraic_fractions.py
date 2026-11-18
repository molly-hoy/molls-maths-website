"""Algebraic fractions: simplifying, multiplying, dividing, adding.
One file, four worksheets (see SHEETS at the bottom)."""


def P(ws, prompt, qa, cols=3):
    """Parts question from a list of (question, answer) pairs."""
    ws.parts(prompt, [q for q, _ in qa], [a for _, a in qa], cols=cols)


def simplifying(ws):
    ws.section("Practice")
    P(ws, "Simplify fully", [
        ("[[6x//9]]", "[[2x//3]]"), ("[[4a//8a^2]]", "[[1//2a]]"), ("[[10xy//15y]]", "[[2x//3]]"),
        ("[[12p^3//4p]]", "3p^2"), ("[[x^2y//xy^2]]", "[[x//y]]"), ("[[14ab^2//21a^2b]]", "[[2b//3a]]"),
    ])
    P(ws, "Factorise and simplify fully", [
        ("[[3x + 6//3]]", "x + 2"), ("[[5x − 10//x − 2]]", "5"), ("[[x^2 + 4x//x]]", "x + 4"),
        ("[[4x + 8//6x + 12]]", "[[2//3]]"), ("[[x^2 − 3x//x^2 − 9]]", "[[x//x + 3]]"),
        ("[[x^2 + 5x + 6//x + 2]]", "x + 3"), ("[[x^2 − 16//x^2 + 4x]]", "[[x − 4//x]]"),
        ("[[x^2 + 2x − 15//x^2 − 9]]", "[[x + 5//x + 3]]"), ("[[2x^2 + 7x + 3//x^2 − 9]]", "[[2x + 1//x − 3]]"),
        ("[[3x^2 − 12//x^2 + x − 6]]", "[[3(x + 2)//x + 3]]"), ("[[x^2 − 7x + 10//2x^2 − 9x − 5]]", "[[x − 2//2x + 1]]"),
        ("[[6x^2 − x − 2//4x^2 − 1]]", "[[3x − 2//2x − 1]]"),
    ])
    ws.section("Problem solving")
    ws.question("Show that [[x^2 + 3x − 10//x^2 − 4]] simplifies to [[x + 5//x + 2]].",
                "[[(x + 5)(x − 2)//(x − 2)(x + 2)]] = [[x + 5//x + 2]]", space=60)
    ws.question("Tom says [[x + 6//x + 3]] simplifies to 2, because 6 ÷ 3 = 2.\nExplain why Tom is wrong.",
                "You can only cancel common factors of the whole top and bottom, not single terms. "
                "x + 6 and x + 3 have no common factor, so it does not simplify. (Try x = 1: [[7//4]] is not 2.)",
                space=50)
    ws.question("[[x^2 − 9//x^2 + ax + b]] = [[x − 3//x + 5]]\nFind the values of a and b.",
                "The bottom must be (x + 3)(x + 5) = x^2 + 8x + 15, so a = 8 and b = 15", space=60)
    ws.question("Write [[2x^2 − 8//x^2 − x − 2]] in the form [[a(x + b)//x + c]], where a, b and c are integers.",
                "[[2(x − 2)(x + 2)//(x − 2)(x + 1)]] = [[2(x + 2)//x + 1]], so a = 2, b = 2, c = 1", space=60)


def multiplication(ws):
    ws.section("Practice")
    P(ws, "Work out each multiplication. Give your answers in their simplest form.", [
        ("[[2x//3]] × [[9//4x]]", "[[3//2]]"), ("[[a//b]] × [[b^2//a^2]]", "[[b//a]]"),
        ("[[3x^2//5y]] × [[10y^2//9x]]", "[[2xy//3]]"), ("[[4//x]] × [[x^2//8]]", "[[x//2]]"),
        ("[[x + 1//3]] × [[6//x + 1]]", "2"), ("[[x//x − 2]] × [[x − 2//5]]", "[[x//5]]"),
    ])
    P(ws, "Factorise, then multiply. Simplify your answers fully.", [
        ("[[x + 3//x − 1]] × [[x^2 − 1//x^2 + 3x]]", "[[x + 1//x]]"),
        ("[[x^2 − 4//x + 5]] × [[2x + 10//x + 2]]", "2(x − 2)"),
        ("[[x^2 + 5x + 6//x^2 − 9]] × [[x − 3//x + 2]]", "1"),
        ("[[3x − 6//x^2 + x]] × [[x + 1//x − 2]]", "[[3//x]]"),
        ("[[x^2 − x − 12//2x + 6]] × [[4//x − 4]]", "2"),
        ("[[2x^2 + x − 1//x^2 + 2x]] × [[x + 2//x + 1]]", "[[2x − 1//x]]"),
    ], cols=2)
    ws.section("Problem solving")
    ws.question("Show that [[x^2 − 25//x + 2]] × [[x^2 + 2x//x − 5]] = x(x + 5)",
                "[[(x − 5)(x + 5)//x + 2]] × [[x(x + 2)//x − 5]]: cancel (x − 5) and (x + 2) to leave x(x + 5)",
                space=60)
    ws.question("A rectangle has sides of length [[x + 4//x]] and [[x^2//x^2 − 16]].\n"
                "Find an expression for its area. Simplify your answer fully.",
                "[[x + 4//x]] × [[x^2//(x − 4)(x + 4)]] = [[x//x − 4]]", space=60)
    ws.question("Ella says [[x//3]] × [[x//3]] = [[2x//3]]. Explain Ella's mistake and give the correct answer.",
                "Ella added instead of multiplying. Multiply the tops and the bottoms: [[x^2//9]].", space=50)


def division(ws):
    ws.section("Practice")
    P(ws, "Work out each division. Give your answers in their simplest form.", [
        ("[[x//4]] ÷ [[x//8]]", "2"), ("[[3a//5]] ÷ [[9a//10]]", "[[2//3]]"), ("[[x^2//y]] ÷ [[x//y^2]]", "xy"),
        ("[[4p//q]] ÷ 2p", "[[2//q]]"), ("[[6//x + 1]] ÷ [[3//x + 1]]", "2"), ("[[x + 2//5]] ÷ [[x + 2//15]]", "3"),
    ])
    P(ws, "Factorise, then divide. Simplify your answers fully.", [
        ("[[x^2 − 9//x]] ÷ [[x + 3//x^2]]", "x(x − 3)"),
        ("[[x^2 + 3x//x − 4]] ÷ [[x + 3//x^2 − 16]]", "x(x + 4)"),
        ("[[2x + 4//x^2 − 1]] ÷ [[x + 2//x + 1]]", "[[2//x − 1]]"),
        ("[[x^2 + 7x + 12//x^2 − 4]] ÷ [[x + 4//x − 2]]", "[[x + 3//x + 2]]"),
        ("[[x^2 − 5x//3x + 6]] ÷ [[x − 5//x + 2]]", "[[x//3]]"),
        ("[[4x^2 − 9//x^2 + x]] ÷ [[2x − 3//x + 1]]", "[[2x + 3//x]]"),
    ], cols=2)
    ws.section("Problem solving")
    ws.question("Show that [[x^2 − 1//x + 4]] ÷ [[x + 1//x^2 + 4x]] = x(x − 1)",
                "[[(x − 1)(x + 1)//x + 4]] × [[x(x + 4)//x + 1]] = x(x − 1)", space=60)
    ws.question("Ravi works out [[a//b]] ÷ [[c//d]] and writes [[ac//bd]].\nExplain Ravi's mistake.",
                "Ravi multiplied instead of dividing. Turn the second fraction upside down and multiply: [[ad//bc]].",
                space=50)
    ws.question("A rectangle has area [[x^2 + 5x//4]] and length [[x + 5//2]].\nFind an expression for its width.",
                "[[x(x + 5)//4]] × [[2//x + 5]] = [[x//2]]", space=60)


def addition(ws):
    ws.section("Practice")
    P(ws, "Write as a single fraction in its simplest form.", [
        ("[[x//3]] + [[x//4]]", "[[7x//12]]"), ("[[2x//5]] + [[x//2]]", "[[9x//10]]"), ("[[a//2]] − [[a//6]]", "[[a//3]]"),
        ("[[x + 1//2]] + [[x + 3//4]]", "[[3x + 5//4]]"), ("[[x − 2//3]] + [[2x + 1//5]]", "[[11x − 7//15]]"),
        ("[[x + 4//2]] − [[x − 1//3]]", "[[x + 14//6]]"),
    ])
    P(ws, "Write as a single fraction in its simplest form.", [
        ("[[3//x]] + [[2//x]]", "[[5//x]]"), ("[[1//x]] + [[1//2x]]", "[[3//2x]]"),
        ("[[2//x]] + [[3//y]]", "[[2y + 3x//xy]]"), ("[[1//x + 1]] + [[1//x − 1]]", "[[2x//(x + 1)(x − 1)]]"),
        ("[[3//x + 2]] − [[2//x + 3]]", "[[x + 5//(x + 2)(x + 3)]]"),
        ("[[x//x − 4]] + [[2//x + 1]]", "[[x^2 + 3x − 8//(x − 4)(x + 1)]]"),
        ("[[5//x^2 − 9]] + [[1//x + 3]]", "[[x + 2//(x − 3)(x + 3)]]"),
        ("[[2x//x + 5]] − [[3//x]]", "[[2x^2 − 3x − 15//x(x + 5)]]"),
    ], cols=2)
    ws.section("Problem solving")
    ws.question("Show that [[2//x + 1]] + [[3//x − 2]] = [[5x − 1//(x + 1)(x − 2)]]",
                "[[2(x − 2) + 3(x + 1)//(x + 1)(x − 2)]] = [[2x − 4 + 3x + 3//(x + 1)(x − 2)]] = [[5x − 1//(x + 1)(x − 2)]]",
                space=60)
    ws.question("Solve        [[x//2]] + [[x//3]] = 10", "[[5x//6]] = 10, so x = 12", space=50)
    ws.question("Solve        [[3//x]] + [[2//x + 1]] = 1\nGive your answers in surd form.",
                "3(x + 1) + 2x = x(x + 1), so x^2 − 4x − 3 = 0, so x = 2 ± √7", space=70)
    ws.question("Jack says [[1//x]] + [[1//y]] = [[2//x + y]]\nShow that Jack is wrong.",
                "Try x = 1 and y = 1: the left side is 1 + 1 = 2, but the right side is [[2//2]] = 1. "
                "(The correct answer is [[x + y//xy]].)", space=50)


SHEETS = [
    ({"slug": "algebraic-fractions-simplifying"}, simplifying),
    ({"slug": "algebraic-fractions-multiplication"}, multiplication),
    ({"slug": "algebraic-fractions-division"}, division),
    ({"slug": "algebraic-fractions-addition"}, addition),
]
