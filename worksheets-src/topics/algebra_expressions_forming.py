"""Algebra: expressions – forming"""
from engine.algebra import simplify, expand
from engine.draw import shape2d

META = {"title": "Algebra: expressions – forming", "slug": "algebra-expressions-forming"}


def build(ws):
    ws.section("Practice")

    q1 = [("5 more than x", "x + 5"), ("7 less than y", "y − 7"), ("a multiplied by 4", "4a"),
          ("b divided by 3", "[[b//3]]"), ("the sum of p and q", "p + q"), ("double m, then add 1", "2m + 1"),
          ("x squared", "x^2"), ("3 lots of (n + 2)", "3(n + 2)"), ("the product of a and b", "ab"),
          ("half of t, take away 6", "[[t//2]] − 6"), ("k less than 20", "20 − k"), ("the square of (y + 1)", "(y + 1)^2")]
    ws.parts("Write an expression for:", [q for q, _ in q1], [a for _, a in q1], cols=3)

    q2 = [("A pen costs p pence. Write an expression for the cost of 6 pens.", "6p pence"),
          ("Sara is x years old. Her brother is 4 years older. How old is her brother?", "x + 4"),
          ("A bag holds n sweets. Tom eats 3 of them. How many sweets are left?", "n − 3"),
          ("A pizza is shared equally between k people. What fraction of the pizza does each person get?", "[[1//k]]"),
          ("Apples cost a pence each and bananas cost b pence each. Find the cost of 3 apples and 5 bananas.", "3a + 5b pence"),
          ("A taxi charges £3 plus £2 for every mile. Find the cost, in pounds, of a journey of m miles.", "2m + 3"),
          ("A cinema ticket costs £c. Find the change from £20 when Ali buys 2 tickets.", "20 − 2c")]
    ws.parts("Write an expression for each of these.", [q for q, _ in q2], [a for _, a in q2], cols=1)

    ws.section("Problem solving")

    ws.question("Find an expression for the perimeter of this rectangle. Simplify your answer.",
                simplify("2x + 2x + x + 3 + x + 3"),
                figure=shape2d([(0, 0), (2.4, 0), (2.4, 1.1), (0, 1.1)], right_angles=[0, 1, 2, 3],
                               labels=["2x", "x + 3", None, None]),
                fig_w=140, fig_h=75, space=10)

    ws.question("Amir has x sweets. Beth has twice as many sweets as Amir. Chris has 5 fewer sweets than Beth.\n"
                "Write an expression for the total number of sweets they have. Simplify your answer.",
                f"x + 2x + (2x − 5) = {simplify('x + 2x + 2x − 5')}", space=50)

    ws.question("Think of a number, n. Multiply it by 3, then add 4, then double the result.\n"
                "Write an expression for the answer. Expand any brackets.",
                f"2(3n + 4) = {expand('2(3n + 4)')}", space=45)

    ws.question("Adult tickets cost £a and child tickets cost £c.\n"
                "(a) Write an expression for the cost of 2 adult and 3 child tickets.\n"
                "(b) Work out the cost when a = 12 and c = 7.",
                "(a) 2a + 3c   (b) £45", space=50)

    ws.question("The angles of a triangle are x, 2x and x + 20 degrees.\n"
                "Write a simplified expression for the sum of the angles.",
                simplify("x + 2x + x + 20"), space=40)
