# A script to run mass grammar generation and populating 
#the database with good grammars
#
# Usage: python3 populate.py

import time
from LL1_Academy.tools import MassGrammarGenerator
import os

#Number of randomly generated grammars
num = 100

#Number variables this run will include. 
#For example [2,3] will run the script to generate
#grammars with 2 variables and 3 variables
nVariables = [2, 3]

nonTerminals = ['A','B','C','D']
terminals = ['x','y','z','w']

for n in nVariables:
	start_time = time.time()
	mg = MassGrammarGenerator.MassGrammarGenerator(n)
	mg.run(num,nonTerminals[:n],terminals)
	print("{}Variables: {} seconds---".format(n,(time.time() - start_time)))

#if __name__ == '__main__':
 	#This number can be changed to however many grammars you want to generate 
 	#main(5000)