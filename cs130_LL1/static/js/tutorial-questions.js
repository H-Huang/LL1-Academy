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
		question: "What is the first set of A?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y'],
	},
	{
		grammar: first2_grammar,
		helptext: "When there are multiple productions, we calculate the First Set of each production individually, and add each of them to the First Set. In this case, the First Set of A includes the First Set of “xy” and the First Set of “yz”.",
		question: "What is the first set of A?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, we calculate the First Set of that non terminal first, and then add it to the First Set of that production. In this case, we would want to calculate the First(B), and then add that to the First(A).",
		question: "What is the first set of B?",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, we calculate the First Set of that non terminal first, and then add it to the First Set of that production. In this case, we would want to calculate the First(B), and then add that to the First(A).",
		question: "What is the first set of A?",
		answer: "y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem #1",
		question: "What is the first set of A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem #1",
		question: "What is the first set of B?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first4_grammar,
		helptext: "Challenge Problem #1",
		question: "What is the first set of C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem #2",
		question: "What is the first set of A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem #2",
		question: "What is the first set of B?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first5_grammar,
		helptext: "Challenge Problem #2",
		question: "What is the first set of C?",
		answer: "z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: first6_grammar,
		helptext: "Here, we introduce the concept of ε, which is can be considered a “null” string. In other words, A’s ε production converts the nonterminal symbol to nothing. If there exists an epsilon production, we add ε to the First Set of A, and A is now considered a “nullable” nonterminal.",
		question: "What is the first set of A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','y','ε'],
	},
	{
		grammar: first7_grammar,
		helptext: "In a production, if the first symbol can only go to ε, compute the First Set of the rest of the string. When looking at the production A = Bx, since B is only nullable, the First Set of this production is just “x”.",
		question: "What is the first set of A?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','z','ε'],
	},
	{
		grammar: first7_grammar,
		helptext: "In a production, if the first symbol can only go to ε, compute the First Set of the rest of the string. When looking at the production A = Bx, since B is only nullable, the First Set of this production is just “x”.",
		question: "What is the first set of B?",
		answer: "ε",
		type: "checkbox",
		terminals: ['x','z','ε'],
	},
	{
		grammar: first8_grammar,
		helptext: "When we look at the first production of A, we see that B is the first symbol, so we want to add the First Set of B to the First Set of A. However, this is incorrect! If we see that B has a ε in its First Set and is nullable, we will add everything EXCEPT the ε from B to First Set of A, and then look at the first set of the rest of the production. So, in this case, we would see that B is nullable, and add only “y” to the First Set of A, and then look at the First Set of everything after B, which is just “x”.",
		question: "What is the first set of A?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first8_grammar,
		helptext: "When we look at the first production of A, we see that B is the first symbol, so we want to add the First Set of B to the First Set of A. However, this is incorrect! If we see that B has a ε in its First Set and is nullable, we will add everything EXCEPT the ε from B to First Set of A, and then look at the first set of the rest of the production. So, in this case, we would see that B is nullable, and add only “y” to the First Set of A, and then look at the First Set of everything after B, which is just “x”.",
		question: "What is the first set of B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first9_grammar,
		helptext: "For the first production of A, we see that it only consists of B. Since B is nullable and can go to null string, we now know that A is also nullable, and add ε to the First Set of A.",
		question: "What is the first set of A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','ε'],
	},
	{
		grammar: first9_grammar,
		helptext: "For the first production of A, we see that it only consists of B. Since B is nullable and can go to null string, we now know that A is also nullable, and add ε to the First Set of A.",
		question: "What is the first set of B?",
		answer: "ε",
		type: "checkbox",
		terminals: ['x','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem #3",
		question: "What is the first set of A?",
		answer: "x,y,z,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem #3",
		question: "What is the first set of B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		grammar: first10_grammar,
		helptext: "Challenge Problem #3",
		question: "What is the first set of C?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		type: "text",
		text: [
			"example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing ",
			"example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing"
		],
	}
]

var follow1_grammar = {
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

var followQuestions = [
	// filler code
	{
		grammar: first3_grammar,
		helptext: "THIS IS FILLER CODE FOR FOLLOW QUESTIONS",
		question: "THIS IS FILLER CODE FOR FOLLOW QUESTIONS",
		answer: "y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	}
]

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
		grammar: follow1_grammar,
		helptext: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		question: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		answer: "y",
		type: "parse",
		terminals: ['x','y','z'],
		non_terminals: ['A','B','C']
	}
]