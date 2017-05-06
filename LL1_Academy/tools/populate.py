# A script to run mass grammar generation and checker automatically for different numbers 
# terminals and nonterminals. It also times the execution.
#
# Usage: python3 populate.py

import time
import MassGrammarGenerator


def main(num):
	nonTerminals = ['A','B','C','D']
	terminals = ['x','y','z','w']
	for n in range(2,5):
		for t in range (2,5):
			start_time = time.time()
			mg = MassGrammarGenerator.MassGrammarGenerator()
			mg.run(num,nonTerminals[:n],terminals[:t],True)
			print("{}-{}: {} seconds---".format(n, t,(time.time() - start_time)))

if __name__ == '__main__':
	#This number can be changed to however many grammars you want to generate 
    main(1000)