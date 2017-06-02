var q1_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['xy']
    }]
}


var q2_grammar = {
	grammar: [
    {
		nt: 'A',
		productions: ['xy','yz']
	}]
}

var q3_grammar = {
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

var q4_grammar = {
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

var firstQuestions = [
	{
		type: "text",
		text: [
			"example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing example of a paragraph in a full column text explaine rthing ",
			"here is paragraph 2, have I mentioned i think vincent is dumb here is paragraph 2, have I mentioned i think vincent is dumb here is paragraph 2, have I mentioned i think vincent is dumb here is paragraph 2, have I mentioned i think vincent is dumb here is paragraph 2, have I mentioned i think vincent is dumb here is paragraph 2, have I mentioned i think vincent is dumb "
		],
	},
	{
		grammar: q1_grammar,
		helptext: "To calculate the First Set of A, we need to calculate the First Set for the production “xy”. For this case, we just find first terminal symbol of the production. What is the first terminal symbol of “xy”?",
		question: "What is the first set of A?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y'],
	},
	{
		grammar: q2_grammar,
		helptext: "When there are multiple productions, we calculate the First Set of each production individually, and add each of them to the First Set. The First Set of A are the First Sets of “xy” and “yz” combined.",
		question: "What is the first set of A?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: q3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, then the First Set of that symbol is the First Set of that production. In this case, the First Set of A is “z”, and the First Set of B. Hint: It would be good to calculate First Set of B first, and then substitute it into the First Set of A.",
		question: "What is the first set of B?",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: q3_grammar,
		helptext: "When there is a nonterminal as the first symbol of a production, then the First Set of that symbol is the First Set of that production. In this case, the First Set of A is “z”, and the First Set of B. Hint: It would be good to calculate First Set of B first, and then substitute it into the First Set of A.",
		question: "What is the first set of A?",
		answer: "y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: q4_grammar,
		helptext: "This is a challenge problem",
		question: "What is the first set of A?",
		answer: "x,y,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: q4_grammar,
		helptext: "This is a challenge problem",
		question: "What is the first set of B?",
		answer: "x,z",
		type: "checkbox",
		terminals: ['x','y','z'],
	},
	{
		grammar: q4_grammar,
		helptext: "This is a challenge problem",
		question: "What is the first set of C?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z'],
	}
]

var followQuestions = [
	// filler code
	{
		grammar: q3_grammar,
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
		grammar: q3_grammar,
		helptext: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		question: "THIS IS FILLER CODE FOR PARSE TABLE QUESTIONS",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z'],
	}
]