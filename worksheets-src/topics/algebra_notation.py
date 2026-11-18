"""Algebra: notation"""

META = {"title": "Algebra: notation", "slug": "algebra-notation"}


def build(ws):
    ws.section("Practice")

    q1 = [("a + a + a", "3a"), ("b × 5", "5b"), ("x × y", "xy"), ("m ÷ 4", "[[m//4]]"),
          ("p × p", "p^2"), ("3 × (x + 2)", "3(x + 2)"), ("y × y × y", "y^3"), ("a × b × 2", "2ab"),
          ("(x + 1) ÷ 2", "[[x + 1//2]]"), ("k × 7 − 3", "7k − 3"), ("n × n + n", "n^2 + n"), ("6 ÷ t", "[[6//t]]")]
    ws.parts("Write each of these using algebraic notation.", [q for q, _ in q1], [a for _, a in q1], cols=4)

    q2 = [("4y", "4 multiplied by y (4 × y)"), ("x + 9", "x add 9"), ("[[a//2]]", "a divided by 2"),
          ("m^2", "m squared (m × m)"), ("3(b + 1)", "3 multiplied by (b + 1)"),
          ("2p − 5", "2 multiplied by p, then subtract 5")]
    ws.parts("Write in words what each expression means.", [q for q, _ in q2], [a for _, a in q2], cols=3,
             row_h=40)

    q3 = [("2x means 2 + x", "False (it means 2 × x)"), ("x^2 means x × x", "True"),
          ("ab means a × b", "True"), ("3y means y + y + y", "True"),
          ("[[p//q]] means p ÷ q", "True"), ("5 − n is the same as n − 5", "False")]
    ws.parts("Write True or False for each statement.", [q for q, _ in q3], [a for _, a in q3], cols=2)

    ws.section("Problem solving")

    ws.question("Which of these expressions are the same as 4x?\n"
                "x + x + x + x          4 + x          x × 4          x^4          2x + 2x",
                "x + x + x + x,  x × 4  and  2x + 2x", space=40)

    ws.question("Lily writes y × y × 3 as 3y^2. Jake writes it as (3y)^2.\nWho is correct? Explain your answer.",
                "Lily. Only the y is squared. (3y)^2 means 3y × 3y = 9y^2.", space=50)

    ws.parts("Match each description to an expression from the box:     x^2     2x     x + 2     [[x//2]]",
             ["double x", "x squared", "x plus 2", "half of x"], ["2x", "x^2", "x + 2", "[[x//2]]"], cols=4)

    ws.question("A number n is multiplied by itself, and then 5 is subtracted.\nWrite this using algebraic notation.",
                "n^2 − 5", space=35)
