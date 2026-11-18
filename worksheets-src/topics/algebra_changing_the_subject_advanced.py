"""Algebra: changing the subject advanced
The subject appears more than once, or inside a fraction or root."""

META = {"title": "Algebra: changing the subject advanced", "slug": "algebra-changing-the-subject-advanced"}


def build(ws):
    ws.section("Practice")

    q1 = [("ax + b = cx + d", "x = [[d − b//a − c]]"),
          ("ax = bx + c", "x = [[c//a − b]]"),
          ("y(x + 2) = x", "x = [[2y//1 − y]]"),
          ("p = [[x + 3//x]]", "x = [[3//p − 1]]"),
          ("y = [[x + 1//x − 1]]", "x = [[y + 1//y − 1]]"),
          ("y = [[3x//x + 4]]", "x = [[4y//3 − y]]"),
          ("t = [[2x − 1//x + 3]]", "x = [[3t + 1//2 − t]]"),
          ("k(x − a) = m(x + b)", "x = [[ka + mb//k − m]]")]
    ws.parts("Make x the subject of each formula.", [q for q, _ in q1], [a for _, a in q1], cols=4)

    q2 = [("T = 2π√([[l//g]])          [l]", "l = [[gT^2//4π^2]]"),
          ("[[1//f]] = [[1//u]] + [[1//v]]          [v]", "v = [[fu//u − f]]"),
          ("y = √([[x + a//x]])          [x]", "x = [[a//y^2 − 1]]"),
          ("V = [[1//3]]πr^2h          [r]", "r = √([[3V//πh]])"),
          ("a = [[b − 2c//c]]          [c]", "c = [[b//a + 2]]"),
          ("E = mc^2 + [[1//2]]mv^2          [m]", "m = [[2E//2c^2 + v^2]]")]
    ws.parts("Rearrange each formula to make the letter in square brackets the subject.",
             [q for q, _ in q2], [a for _, a in q2], cols=2)

    ws.section("Problem solving")

    ws.question("Two resistors are joined in parallel. Their total resistance R is given by\n"
                "[[1//R]] = [[1//R_{1}]] + [[1//R_{2}]].     Make R_{1} the subject of the formula.",
                "R_{1} = [[RR_{2}//R_{2} − R]]", space=60)

    ws.question("Show that if y = [[2x + 5//x − 3]], then x = [[3y + 5//y − 2]].",
                "y(x − 3) = 2x + 5, so yx − 3y = 2x + 5, so yx − 2x = 3y + 5, "
                "so x(y − 2) = 3y + 5, so x = [[3y + 5//y − 2]].", space=70)

    ws.question("Ellie makes x the subject of ax − 5 = bx + 2. She writes x = [[7//a]] − b.\n"
                "Explain Ellie's mistake and write the correct answer.",
                "Ellie can't divide the two x terms separately. Collect the x terms first: "
                "ax − bx = 7, so x(a − b) = 7, so x = [[7//a − b]].", space=60)

    ws.question("A formula is P = [[n + 2//n]].\n(a) Make n the subject of the formula.\n"
                "(b) Find the value of n when P = 1.5",
                "(a) n = [[2//P − 1]]   (b) n = 4", space=60)
