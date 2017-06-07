var first1_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['xy']
    }],
    helptext: "To calculate the First Set of the nonterminals for simple grammars, find the first terminal symbol in the production. For this case, to find the First Set of A we just find first terminal symbol of the production xy.",
	questions:[{
		question: "What is the first set of symbol A?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','ε'],
	}]

}

var first2_grammar = {
	grammar: [
    {
		nt: 'A',
		productions: ['xy','yz']
	}],
	helptext: "When there are multiple productions, we calculate the First Set of each production individually, and add each of them to the First Set. In this case, the First Set of A includes the First Set of xy and the First Set of yz.",
	questions:[{
		question: "What is the first set of symbol A?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
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
	}],
	helptext: "When there is a nonterminal as the first symbol of a production, we calculate the First Set of that non terminal first, and then add it to the First Set of that production. In this case, we would want to calculate the First(B), and then add that to the First(A) due to A = Bx.",
	questions:[{
		question: "What is the first set of symbol B?",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		question: "What is the first set of symbol A?",
		answer: "y,z",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	}]
}

var first6_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['xy', 'ε']
    }],
    helptext: "Here, we introduce the concept of ε, which is our symbol which denotes an empty string. In other words, the production A = ε converts the nonterminal symbol to nothing. <br><br> If there exists such a production, we add ε to the First Set of A, and A is now considered a “nullable” nonterminal. In general, if A is nullable, then A can be replaced by the empty string. Don’t forget to include A = xy in your calculation of the First Set of A.",
	questions:[{
		question: "What is the first set of symbol A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','y','ε'],
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
		productions: ['y','ε']
    }],
    helptext: "In a production such as A = Bx, notice that the leftmost symbol B is nullable (includes ε in its First Set). In this case, the First Set of A includes y from the First Set of B. Instead of adding ε from the First Set of B to the First Set of A, look at the next leftmost symbol in the production, in this case x. Thus, we add x to the First Set of A. <br><br> While not needed in our example, consider how this could be a recursive procedure: if multiple of the leftmost symbols in a production are nullable, we would need to add the First Set of each of those nullable symbols, stopping only when we reach the First Set of a symbol which is not nullable. This will be explained further in a later example.",
	questions:[{
		question: "What is the first set of symbol B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		question: "What is the first set of symbol A?",
		answer: "x,y, z",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	}
	]
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
    }],
    helptext: "Whenever we see a production where all the nonterminals are nullable, we add ε to the First Set of that production. In this case, for the first production of A, we see that it only consists of B. Since B is nullable and can go to null string, we now know that A is also nullable, and add ε to the First Set of A.",
	questions:[
	{
		question: "What is the first set of symbol B?",
		answer: "ε",
		type: "checkbox",
		terminals: ['x','ε'],
	},{
		question: "What is the first set of symbol A?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['x','ε'],
	}]
}

var first10_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BC', 'BCDw']
    },
	{
		nt: 'B',
		productions: ['y','ε']
    },
	{
		nt: 'C',
		productions: ['x','ε']
    },
	{
		nt: 'D',
		productions: ['z']
    }],
    helptext: "A = BC is an example of a production in which several of the leftmost production symbols are nullable. In calculating the First Set of A, we consider the First Set of B and the First Set of C; since both B and C are nullable, that means A is also nullable, so we add ε to the First Set of A. <br><br> Furthermore, in the production A = BCDw, notice that both B and C are nullable, so we add the First Set of B, First Set of C, and First Set of D to the First Set of A. We do NOT add w to the First Set of A because D is NOT nullable, and therefore we do not look at any symbols to the right of D when calculating the First Set of A.",
	questions:[
	{
		question: "What is the first set of symbol B?",
		answer: "y,ε",
		type: "checkbox",
		terminals: ['w','x','y','z','ε'],
	},
	{
		question: "What is the first set of symbol C?",
		answer: "x,ε",
		type: "checkbox",
		terminals: ['w','x','y','z','ε'],
	},
	{
		question: "What is the first set of symbol D?",
		answer: "z",
		type: "checkbox",
		terminals: ['w','x','y','z','ε'],
	},{
		question: "What is the first set of symbol A?",
		answer: "x,y,z,ε",
		type: "checkbox",
		terminals: ['w','x','y','z','ε'],
	},
	{
		type: "text",
		text: '<div class="aboutSection" style="padding: 40px;"><p>Formal algorithm for calculating first sets:</p><ol><li>If X is a nonterminal, First(X) is X</li><li>If there is a production X -> ε (in other words, X is nulable), then add ε to First(X)</li><li>If there is a production X->Y<sub>1</sub> Y<sub>2</sub> … Y<sub>k</sub>, then add First(Y<sub>1</sub> Y<sub>2</sub>...Y<sub>k</sub>) to First(X)</li><ol type="a"><li>First(Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub>) is either:</li><ol type="i"><li>If Y<sub>1</sub> is not nullable: First(Y<sub>1</sub>)</li><li>If Y<sub>1</sub> is nullable: First(Y<sub>1</sub>) except for epsilon and everything in First(Y<sub>2</sub>..Y<sub>k</sub>)</li><li>If all Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub> are nullable, add ε to First(Y<sub>1</sub>, Y<sub>2</sub> … Y<sub>k</sub>)</li></ol></ol></ol></div>'
	}]
}

var firstQuestions = [
	first1_grammar,
	first2_grammar,
	first3_grammar,
	first6_grammar,
	first7_grammar,
	first9_grammar,
	first10_grammar
]

var follow1_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['x']
    }],
    helptext: "The Follow Set represents the set of symbols which could immediately follow strings that can replace a nonterminal symbol. When the symbol is the start symbol, its Follow Set will always include a special reserved symbol, $, representing the end of string. <br><br> For our questions, the Start Symbol will always be A, so we will always add $ to the Follow Set of A. We don’t include x in the Follow Set of A because x replaces the nonterminal A. The Follow Set consists only of symbols that come AFTER the replacement of the symbol A.",
	questions:[{
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['x','$'],
	}]
}

var follow1b_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Ax','x']
    }],
    helptext: "To calculate the Follow Set, look at all productions where the nonterminal of interest occurs, and see what occurs immediately to the right of it. In this case, we want to find the Follow Set of A, and the only production with an A in it is Ax. We see that here, the terminal symbol x follows the nonterminal symbol A, so we add x to the Follow Set of A. Remember that A is the start symbol, so $ is always in A’s Follow Set.",
	questions:[{
		question: "What is the follow set of symbol A?",
		answer: "x,$",
		type: "checkbox",
		terminals: ['x','$'],
	}]
}

var follow2_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Ax','zByx','y']
    },
    {
		nt: 'B',
		productions: ['z']
	}],
	helptext: "In this case, we have added the production A = zByx to the previous grammar. Notice that here, the terminal symbol y follows the nonterminal symbol B, thus we add y to the Follow Set of B. We don’t add x to the Follow Set of B because it does not appear IMMEDIATELY to the right of B in the production zByx, since the terminal symbol y appears first.",
	questions:[{
		question: "What is the follow set of symbol A?",
		answer: "x,$",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		question: "What is the follow set of symbol B?",
		answer: "y",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	}]
}

var follow3_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx']
    },
    {
		nt: 'B',
		productions: ['C','Cy']
	},
	{
		nt: 'C',
		productions: ['z']
	}],
	helptext: "Whenever a nonterminal symbol S can be entirely replaced by another nonterminal symbol T, add the Follow Set of S to the Follow Set of T. In this example, we’ve added the B = C production, so B can be entirely replaced by a C symbol. Therefore, the Follow Set of C must contain the entire Follow Set of B, plus any additional symbols which would otherwise be in the Follow Set of C, such as y from the production B = Cy.",
	questions:[{
		question: "What is the follow set of symbol B?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		question: "What is the follow set of symbol C?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	}]
}

var follow4_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['Bx']
    },
    {
		nt: 'B',
		productions: ['yxC','Cy']
	},
	{
		nt: 'C',
		productions: ['z']
	}],
	helptext: "This is a similar concept to the previous example, except we have replaced the B = C production with B = yxC. Notice that C appears as the last symbol in a production of B. As a result, anything that follows B could also follow C, if we were to replace B with yxC. Therefore, we must include the Follow Set of B in the Follow Set of C, plus any additional symbols which would otherwise be in the Follow Set of C, such as y from the production B = Cy. ",
	questions:[{
		question: "What is the follow set of symbol B?",
		answer: "x",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	},
	{
		question: "What is the follow set of symbol C?",
		answer: "x,y",
		type: "checkbox",
		terminals: ['x','y','z','$'],
	}]
}

var follow5_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BCx','wBw']
    },
    {
		nt: 'B',
		productions: ['y']
	},
	{
		nt: 'C',
		productions: ['z']
	}],
	helptext: "For the Follow Set of B, notice that the nonterminal symbol C follows B in the production A = BCx. Thus, the Follow Set of B includes the First Set of C, since any symbol in the First Set of C can follow the symbol B.",
	questions:[{
		question: "What is the first set of symbol C?",
		answer: "z",
		type: "checkbox",
		terminals: ['w','x','y','z','ε'],
	},
	{
		question: "What is the follow set of symbol B?",
		answer: "w,z",
		type: "checkbox",
		terminals: ['w','x','y','z','$'],
	}]
}

var follow6_grammar = {
	grammar: [
	{
		nt: 'A',
		productions: ['BCx','wBw']
    },
    {
		nt: 'B',
		productions: ['y']
	},
	{
		nt: 'C',
		productions: ['z','ε']
	}],
	helptext: "Now we introduce ε when computing Follow Sets. First, let’s examine the production A = BCx. C appears immediately to the right of B; thus, we add the First Set of C to the Follow Set of B. The First Set of C consists of z and ε, so we add z to the Follow Set of B. However, ε cannot be in a Follow Set. Instead, trying to add ε to a Follow Set indicates that we should look at the next rightmost symbol of the production A = BCx, which is x. Thus, we add x to the Follow Set of B. Finally, add any additional symbols which would otherwise be in the Follow Set of B, such as w from the production A = wBw.",
	questions:[{
		question: "What is the first set of symbol C?",
		answer: "z,ε",
		type: "checkbox",
		terminals: ['x','y','z','ε'],
	},
	{
		question: "What is the follow set of symbol B?",
		answer: "w,x,z",
		type: "checkbox",
		terminals: ['x','y','z','$'],
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
	}],
	helptext: "In this grammar, we have removed x from the production A = BCx. Now, we have A = BC. C appears immediately to the right of B; thus, we add the First Set of C to the Follow Set of B. The First Set of C consists of z and ε, so we add z to the Follow Set of B. However, ε cannot be in a Follow Set. Instead, trying to add ε to a Follow Set indicates that we should look at the next rightmost symbol of the production A = BC. However, now there are no symbols to the right of C. Thus, it is possible that B could be the last symbol of a production of A if we were to replace the C in A = BC with ε. As a result, we must include the Follow Set of A in the Follow Set of B since anything that follows A can follow B in this case. Since A does not appear in any production, the only symbol in its follow set is $. Thus, we add $ from the Follow Set of A to the Follow Set of B.",
	questions:[{
		question: "What is the first set of symbol C?",
		answer: "z,ε",
		type: "checkbox",
		terminals: ['y','z','ε'],
	},
	{
		question: "What is the follow set of symbol A?",
		answer: "$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		question: "What is the follow set of symbol B?",
		answer: "z,$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		question: "What is the follow set of symbol C?",
		answer: "$",
		type: "checkbox",
		terminals: ['y','z','$'],
	},
	{
		type: "text",
		text: '<div class="aboutSection" style="padding: 40px;"><p>Formal algorithm for calculating follow sets:</p><p>Note: α and β  are shorthand for Y<sub>1</sub> Y<sub>2</sub> … Y<sub>k</sub> and X<sub>1</sub> X<sub>2</sub> … X<sub>i</sub>, used so that the algorithm is more clear</p><ol><li>Put $ in the Follow Set of the Start Symbol (In our case, A)</li><li>For each production:</li><ol type="a"><li>If it is of form A -> α B β , then everything in First(β) except for ε is placed in Follow Set of B</li><li>If it is of form A -> α B, then everything in Follow(A) is in Follow(B)</li><li>If it is of form A -> α B β , where First(β) contains ε, then everything in Follow(A) is in Follow(B)</li></ol></ol></div>'
	}]
}

var followQuestions = [
	follow1_grammar,
	follow1b_grammar,
	follow2_grammar,
	follow3_grammar,
	follow4_grammar,
	follow5_grammar,
	follow6_grammar,
	follow7_grammar
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
	{
		type: "text",
		text: '<div class="aboutSection" style="padding: 40px;"><p>Note: the following only serves as a brief reminder on how LL(1) parsing works, and is not meant as a comprehensive tutorial</p><p>Parse tables are tables which are used to create an LL(1) parser. There is a column correlated with each terminal symbol, and there is a row correlated with each nonterminal symbol. Each table entry can be empty or they can contain productions.</p><p>The implementation of an LL(1) parser is outside the scope of this tutorial. Briefly, a parser will maintain a FIFO queue of symbols, which consists of nonterminal symbols and terminal symbols. Each iteration of the parser pops the first symbol from the queue. When a nonterminal symbol is encountered, the parse table is consulted to determine which production to add to the syntax tree, based on which terminal symbol the parser is currently examining within the input string.</p><p>In order for a grammar to be LL(1), each cell in a parse table must contain a single production - otherwise the derivation would be ambiguous and backtracking would be required. If a cell contains no productions, this means this cell should never be reached in any parse; if the cell is reached, it indicates that the input string is not in the grammar’s language.</p><p>The algorithm for generating a parse table is as follows:</p><ol><li>Calculate the First and Follow sets for each symbol</li><li>For each nonterminal symbol S:	</li><ol type="a"><li>For each production P</li><ol type="i"><li>Compute the First(P)</li><li>For every terminal in First(P), add P to the corresponding column</li><li>If ε is in First(P), add P to every corresponding column in Follow(S)</li></ol></ol></ol></div>'
	},
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