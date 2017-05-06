from django.shortcuts import render

from django.http import JsonResponse
from LL1_Academy.tools.GrammarChecker import *

# TODO: this should NOT be hardcoded
# single session grammar here
startsymbol = 'A'
grammar = {
    'A': ['xA', 'Bz'],
    'B': ['yB', 'y'],
}

grammarChecker = GrammarChecker()

# single session question tracking here
questions = []
currentQ = -1
answers = {} 

def generate_questions():
	# start over
	global questions
	global currentQ
	global answers

	questions = []
	currentQ = 0
	answers = {}

	# first set questions
	questions.append(('first','A'))
	questions.append(('first','B'))
	# follow set questions
	questions.append(('follow','A'))
	questions.append(('follow','B'))
	# is ll1?
	questions.append(('LL1', None))

	first,follow,_,status,_ = grammarChecker.solve(grammar,startsymbol)
	answers['first'] = first
	answers['follow'] = follow
	answers['LL1'] = (True if status == 0 else False)
	print(answers)
	print()

def index(request):
	return render(request, 'LL1_Academy/index.html')

def learn(request):
	# on page load we start the session over
	# TODO: this should eventually use the session object probably
	# 
	generate_questions()

	grammar_object = []
	non_terminals, terminals = grammarChecker.getSymbols(grammar)
	
	for nt in non_terminals:
		grammar_object.append({"nt": nt, "productions": grammar[nt]})

	#stringify terminals + non_terminals
	terminals = "{" + ", ".join(terminals) + "}"
	non_terminals = "{" + ", ".join(non_terminals) + "}"

	#prepare all items to be passed into the template
	context = {
		"grammar_object": grammar_object,
		"terminals": terminals,
		"non_terminals": non_terminals,
		"start_symbol": startsymbol
	}
	
	return render(request, 'LL1_Academy/learn.html', context)

def get_question(request):
	global questions
	global currentQ

	if currentQ >= len(questions):
		currentQ = 0

	category = questions[currentQ][0]
	symbol = questions[currentQ][1]

	currentQ += 1
	return JsonResponse({
		"category": category,
		"symbol": symbol
	})

def check_answer(request):
	global questions
	global currentQ

	# TODO: actually check if answer is right
	# think about where validations should take place - probably on client

	return JsonResponse({
		# "valid": True,
		"correct": True
	})

# @app.errorhandler(404)
# def page_not_found(request):
#     return render_template('page_not_found.html'), 404
