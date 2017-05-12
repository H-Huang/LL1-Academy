from django.core.management.base import BaseCommand, CommandError
import time
from LL1_Academy.tools import MassGrammarGenerator
import os

class Command(BaseCommand):
	help = 'This command will populate the database with a small set of grammars'
	
	def handle(self, *args, **options):
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