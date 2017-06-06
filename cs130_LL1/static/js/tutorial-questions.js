var first1_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['xy']
    }]
}


var first2_grammar = {
	grammar: [
    {
		nt: 'A',
		productions: ['xy','yz']
	}]
}

var first3_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx', 'z']
    },
    {
		nt: 'B',
		productions: ['y']
	}]
}

var first4_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BC', 'zC']
    },
    {
		nt: 'B',
		productions: ['Cx','yBy']
	},
	{
		nt: 'C',
		productions: ['xz']
	}]
}

var first5_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bz', 'xC']
    },
    {
		nt: 'B',
		productions: ['Ax','yxx', 'C']
	},
	{
		nt: 'C',
		productions: ['z']
	}]
}

var first6_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['xy', 'ε']
    }]
}

var first7_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx', 'z']
    },
	{
		nt: 'B',
		productions: ['ε']
    }]
}

var first8_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx', 'z']
    },
	{
		nt: 'B',
		productions: ['y','ε']
    }]
}

var first9_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['B', 'x']
    },
	{
		nt: 'B',
		productions: ['ε']
    }]
}

var first10_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BC', 'Bz']
    },
	{
		nt: 'B',
		productions: ['y','ε']
    },
	{
		nt: 'C',
		productions: ['x','ε']
    }]
}

var firstQuestions = [
	{
		grammar: first1_grammar,
		helptext: "To calculate the First Set of the nonterminals for simple grammars, find the first terminal symbol in the production. For this case, to find the First Set of A we just find first terminal symbol of the production “xy”.",
		question: "What is the first set of symbol A?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y'],
	},
	{
		grammar: first2_grammar,
		helptext: "When there are multiple productions, we find the First Set of each production individually, and add them to the First Set of the desired nonterminal. In this case, the First Set of A includes the First Set of “xy” and the First Set of “yz”.",
		question: "What is the first set of symbol A?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, we find the First Set of that nonterminal first, and then add it to the First Set of that production. In this case, we would want to first find the First(B), and then add that to the First(A).",
		question: "What is the first set of symbol B?",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, we find the First Set of that nonterminal first, and then add it to the First Set of that production. In this case, we would want to first find the First(B), and then add that to the First(A).",
		question: "What is the first set of symbol A?",
		answer: "y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the first set of symbol A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the first set of symbol B?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the first set of symbol C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem 2",
		question: "What is the first set of symbol A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem 2",
		question: "What is the first set of symbol B?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem 2",
		question: "What is the first set of symbol C?",
		answer: "z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first6_grammar,
		helptext: "Here, we introduce the concept of ε, which is can be considered a “null” string. In other words, A’s ε production converts the nonterminal symbol to nothing. If there exists an epsilon production, we add ε to the First Set of A, and A is now considered a “nullable” nonterminal.",
		question: "What is the first set of symbol A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','y','ε'],
	},
	{
		grammar: first7_grammar,
		helptext: "In a production, if the first symbol can only go to ε, compute the First Set of the rest of the string. When looking at the production A = Bx, since B is only nullable, the First Set of this production is just “x”.",
		question: "What is the first set of symbol A?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','z','ε'],
	},
	{
		grammar: first7_grammar,
		helptext: "In a production, if the first symbol can only go to ε, compute the First Set of the rest of the string. When looking at the production A = Bx, since B is only nullable, the First Set of this production is just “x”.",
		question: "What is the first set of symbol B?",
		answer: "ε",
		type: "checkbox",
		terminals: ['x','z','ε'],
	},
	{
		grammar: first8_grammar,
		helptext: "Expanding on the previous example, now B now has two productions, and does not just go to ε. In this case, we want to first add everything in First(B) except for ε to the First Set of that production, and then calculate the First Set of the rest of the string. In this case, for A = Bx, add First(B) except for ε, and then add “x”.",
		question: "What is the first set of symbol A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first8_grammar,
		helptext: "Expanding on the previous example, now B now has two productions, and does not just go to ε. In this case, we want to first add everything in First(B) except for ε to the First Set of that production, and then calculate the First Set of the rest of the string. In this case, for A = Bx, add First(B) except for ε, and then add “x”.",
		question: "What is the first set of symbol B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first9_grammar,
		helptext: "Whenever we see a production where all the nonterminals are nullable, we add ε to the First Set of that production. In this case, for the first production of A, we see that it only consists of B. Since B is nullable and can go to null string, we now know that A is also nullable, and add ε to the First Set of A.",
		question: "What is the first set of symbol A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','ε'],
	},
	{
		grammar: first9_grammar,
		helptext: "Whenever we see a production where all the nonterminals are nullable, we add ε to the First Set of that production. In this case, for the first production of A, we see that it only consists of B. Since B is nullable and can go to null string, we now know that A is also nullable, and add ε to the First Set of A.",
		question: "What is the first set of symbol B?",
		answer: "ε",
		type: "checkbox",
		terminals: ['x','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem 3",
		question: "What is the first set of symbol A?",
		answer: "x,y,z,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem 3",
		question: "What is the first set of symbol B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem 3",
		question: "What is the first set of symbol C?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		type: "text",
		text: '<p>Formal algorithm for calculating first sets:</p><ol><li>If X is a nonterminal, First(X) is X</li><li>If there is a production X -> ε (in other words, X is nulable), then add ε to First(X)</li><li>If there is a production X->Y<sub>1</sub> Y<sub>2</sub> … Y<sub>k</sub>, then add First(Y<sub>1</sub> Y<sub>2</sub>...Y<sub>k</sub>) to First(X)</li><ol type="a"><li>First(Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub>) is either:</li><ol type="i"><li>If Y<sub>1</sub> is not nullable: First(Y<sub>1</sub>)</li><li>If Y<sub>1</sub> is nullable: First(Y<sub>1</sub>) except for epsilon and everything in First(Y<sub>2</sub>..Y<sub>k</sub>)</li><li>If all Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub> are nullable, add ε to First(Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub>)</li></ol></ol></ol>'
	}
]

var follow1_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['x']
    }]
}

var follow2_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx','y']
    },
    {
		nt: 'B',
		productions: ['z']
	}]
}

var follow3_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx','y']
    },
    {
		nt: 'B',
		productions: ['C','z']
	},
	{
		nt: 'C',
		productions: ['z']
	}]
}

var follow4_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx','y']
    },
    {
		nt: 'B',
		productions: ['xC','z']
	},
	{
		nt: 'C',
		productions: ['z']
	}]
}

var follow5_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BCx']
    },
    {
		nt: 'B',
		productions: ['y']
	},
	{
		nt: 'C',
		productions: ['z']
	}]
}

var follow6_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BCx']
    },
    {
		nt: 'B',
		productions: ['y']
	},
	{
		nt: 'C',
		productions: ['z','ε']
	}]
}

var follow7_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BC']
    },
    {
		nt: 'B',
		productions: ['y']
	},
	{
		nt: 'C',
		productions: ['z','ε']
	}]
}

var follow8_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['yBC','BCz']
    },
    {
		nt: 'B',
		productions: ['z','zB']
	},
	{
		nt: 'C',
		productions: ['y','ε']
	}]
}

var followQuestions = [
	// filler code
	{
		grammar: follow1_grammar,
		helptext: "We will always start computing our Follow Sets by adding $ to the Follow Set of the Start Symbol. In this case, we add $ to the Follow Set of A.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','$'],
	},
	{
		grammar: follow2_grammar,
		helptext: "To calculate the Follow Set, look at all productions where a nonterminal occurs, and see what occurs directly to the right of it. In this case, we consider the production A = Bx, which is the only production with a nonterminal in it. We see that here, the terminal symbol x follows the nonterminal symbol B, and we add x to the Follow Set of A.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow2_grammar,
		helptext: "To calculate the Follow Set, look at all productions where a nonterminal occurs, and see what occurs directly to the right of it. In this case, we consider the production A = Bx, which is the only production with a nonterminal in it. We see that here, the terminal symbol x follows the nonterminal symbol B, and we add x to the Follow Set of A.",
		question: "What is the follow set of symbol B?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow3_grammar,
		helptext: "Whenever a nonterminal symbol S can be entirely replaced by another nonterminal symbol T, add the Follow(S) to the Follow(T). In this example, we’ve added the “B = C” production, so a B can be replaced by a C symbol. Now, whenever we encounter a symbol that follows B, we can replace the B with C, so the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow3_grammar,
		helptext: "Whenever a nonterminal symbol S can be entirely replaced by another nonterminal symbol T, add the Follow(S) to the Follow(T). In this example, we’ve added the “B = C” production, so a B can be replaced by a C symbol. Now, whenever we encounter a symbol that follows B, we can replace the B with C, so the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol B?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow3_grammar,
		helptext: "Whenever a nonterminal symbol S can be entirely replaced by another nonterminal symbol T, add the Follow(S) to the Follow(T). In this example, we’ve added the “B = C” production, so a B can be replaced by a C symbol. Now, whenever we encounter a symbol that follows B, we can replace the B with C, so the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow4_grammar,
		helptext: "This is the same concept as the previous example, except that we’ve added an “x” in front of the C. Any time we encounter a symbol “B”, we can replace it with a “xC”, so again, the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow4_grammar,
		helptext: "This is the same concept as the previous example, except that we’ve added an “x” in front of the C. Any time we encounter a symbol “B”, we can replace it with a “xC”, so again, the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol B?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow4_grammar,
		helptext: "This is the same concept as the previous example, except that we’ve added an “x” in front of the C. Any time we encounter a symbol “B”, we can replace it with a “xC”, so again, the Follow Set of B is included in the Follow Set of C.",
		question: "What is the follow set of symbol C?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow5_grammar,
		helptext: "This example shows how The Follow Set of C is trivial. We can see that the symbol C follows the B in the A = BCx production, so the Follow Set of B includes the First Set of “C”. ",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow5_grammar,
		helptext: "This example shows how The Follow Set of C is trivial. We can see that the symbol C follows the B in the A = BCx production, so the Follow Set of B includes the First Set of “C”. ",
		question: "What is the follow set of symbol B?",
		answer: "z",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow5_grammar,
		helptext: "This example shows how The Follow Set of C is trivial. We can see that the symbol C follows the B in the A = BCx production, so the Follow Set of B includes the First Set of “C”. ",
		question: "What is the follow set of symbol C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow6_grammar,
		helptext: "We introduce ε when computing follow sets now. Now, when considering the Follow Set of B, we cannot just add the First Set of C because C is nullable. The more rigorous algorithm is to calculate the First Set of “Cx”, using the skills we have learned in the First Set tutorial.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow6_grammar,
		helptext: "We introduce ε when computing follow sets now. Now, when considering the Follow Set of B, we cannot just add the First Set of C because C is nullable. The more rigorous algorithm is to calculate the First Set of “Cx”, using the skills we have learned in the First Set tutorial.",
		question: "What is the follow set of symbol B?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow6_grammar,
		helptext: "We introduce ε when computing follow sets now. Now, when considering the Follow Set of B, we cannot just add the First Set of C because C is nullable. The more rigorous algorithm is to calculate the First Set of “Cx”, using the skills we have learned in the First Set tutorial.",
		question: "What is the follow set of symbol C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		grammar: follow7_grammar,
		helptext: "Here, we remove “x” from the production A = BCx, and have to change the way that we compute the Follow Set of B. We calculate the First Set of B, and see that it contains ε. Because C is nullable, then everything in the Follow Set of C is contained in the Follow Set of A.",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		grammar: follow7_grammar,
		helptext: "Here, we remove “x” from the production A = BCx, and have to change the way that we compute the Follow Set of B. We calculate the First Set of B, and see that it contains ε. Because C is nullable, then everything in the Follow Set of C is contained in the Follow Set of A.",
		question: "What is the follow set of symbol B?",
		answer: "z,$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		grammar: follow7_grammar,
		helptext: "Here, we remove “x” from the production A = BCx, and have to change the way that we compute the Follow Set of B. We calculate the First Set of B, and see that it contains ε. Because C is nullable, then everything in the Follow Set of C is contained in the Follow Set of A.",
		question: "What is the follow set of symbol C?",
		answer: "$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		grammar: follow8_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		grammar: follow8_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the follow set of symbol B?",
		answer: "y,z,$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		grammar: follow8_grammar,
		helptext: "Challenge Problem 1",
		question: "What is the follow set of symbol C?",
		answer: "z,$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		type: "text",
		text: '<p>Formal algorithm for calculating follow sets:</p><p>Note: α and β  are shorthand for Y<sub>1</sub> Y<sub>2</sub> … Y<sub>k</sub> and X<sub>1</sub> X<sub>2</sub> … X<sub>i</sub>, used so that the algorithm is more clear</p><ol><li>Put $ in the Follow Set of the Start Symbol (In our case, A)</li><li>For each production:</li><ol type="a"><li>If it is of form A -> α B β , then everything in First(β) except for ε is placed in Follow Set of B</li><li>If it is of form A -> α B, then everything in Follow(A) is in Follow(B)</li><li>If it is of form A -> α B β , where First(β) contains ε, then everything in Follow(A) is in Follow(B)</li></ol></ol>'
	}
]

var parse_challenge_grammar = {
	grammar: [
		{
			nt: 'A',
			productions: ['Bzxz','zC']
		},
		{
			nt: 'B',
			productions: ['wxw']
		},
		{
			nt: 'C',
			productions: ['xxAA','y']
		}
	]
}

var parse_challenge_grammar_2 = {
	grammar: [
	{
		nt: "A",
		productions: [ "ε", "yAB"]
	},
	{
		nt: "B", 
		productions: [ "xC", "ε"]
	},
	{
		nt: "C", 
		productions: [ "AwB", "ywwz", "Bx" ]
	}
]
}

var parseQuestions = [
	// filler code
	{
		grammar: first3_grammar,
		helptext: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		question: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		answer: '{"A":{"y":["Bx"],"z":["z"]},"B":{"y":["y"]}}',
		type: "parse",
		terminals: ['x','y','z'],
		non_terminals: ['A','B']
	},
	{
		grammar: parse_challenge_grammar,
		helptext: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		question: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		answer: '{"A":{"w":["Bzxz"],"z":["zC"]},"B":{"w":["wxw"]},"C":{"x":["xxAA"],"y":["y"]}}',
		type: "parse",
		terminals: ['w','x','y','z'],
		non_terminals: ['A','B','C']
	},
	{
		grammar: parse_challenge_grammar_2,
		helptext: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		question: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		answer: '{"A":{"w":["ε"],"x":["ε"],"y":["yAB"],"$":["ε"]},"B":{"w":["ε"],"x":["xC","ε"],"$":["ε"]},"C":{"w":["AwB"],"x":["Bx"],"y":["AwB","ywwz"]}}',
		type: "parse",
		terminals: ['w','x','y','z'],
		non_terminals: ['A','B','C']
	}
]