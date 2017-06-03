from django.core.management.base import BaseCommand, CommandError
from LL1_Academy.tools import MassGrammarGenerator
from LL1_Academy.models import Grammar
import os
import time
from django.core.management import call_command


class Command(BaseCommand):
	help = 'This command will add grammars to the database, starting from <num> grammars and gradually filtering them down to a valid set (which may be much less than <num>)'

	def add_arguments(self, parser):
		parser.add_argument('num', type=int)
		parser.add_argument('--reset',
				action='store_true',
				dest='reset_db',
				default=False,
				help='Clear database and repopulate it',
				)
	
	def handle(self, *args, **options):
		if (options['reset_db']):
			call_command('cleardatabase')

		print("Grammar objects initially in database: {}".format(Grammar.objects.count()))
		#Number of randomly generated grammars
		num = options['num']

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
		print("Grammar objects finally in database: {}".format(Grammar.objects.count()))
