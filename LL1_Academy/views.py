from django.shortcuts import render

from django.http import JsonResponse, HttpRequest
import random
import ast

from LL1_Academy.models import *



def get_random_grammar(max_id=None):
    randid = random.randint(0,Grammar.objects.count()-1)
    return Grammar.objects.all()[randid]



def index(request):
	return render(request, 'LL1_Academy/index.html')



def learn(request):
	# on page load we start the session over

	if 'gid1' not in request.session:
		random_grammar = get_random_grammar()
		request.session['gid'] = random_grammar.gid
		request.session['curQ'] = 2

	grammar_obj = Grammar.objects.filter(gid=request.session['gid']).first()
	non_terminals = list(grammar_obj.nonTerminals)
	terminals = list(grammar_obj.terminals)
	prods = ast.literal_eval(grammar_obj.prods)
	
	grammar_object = []
	for nt in non_terminals:
		grammar_object.append({"nt": nt, "productions": prods[nt]})

	#stringify terminals + non_terminals
	terminals = "{" + ", ".join(terminals) + "}"
	non_terminals = "{" + ", ".join(non_terminals) + "}"

	#prepare all items to be passed into the template
	context = {
		"grammar_object": grammar_object,
		"terminals": terminals,
		"non_terminals": non_terminals,
		"start_symbol": 'A'
	}
	
	return render(request, 'LL1_Academy/learn.html', context)

def get_question(request):
	gid = request.session['gid']
	currentQ = request.session['curQ']
	question = Question.objects.filter(gid__gid__contains=gid, qnum=currentQ).first()
	category = question.category
	symbol = question.symbol
	print(question.answer)

	return JsonResponse({
		"category": category,
		"symbol": symbol
	})

def check_answer(request):
	gid = request.session['gid']
	currentQ = request.session['curQ']
	question = Question.objects.filter(gid__gid__contains=gid, qnum=currentQ).first()

	# TODO: actually check if answer is right
	# think about where validations should take place - probably on client


	# answer = request.POST.get('answer').rstrip(',')
	# answer_set = set(answer.split(','))
	# true_answers = set(list(question.answer))
	# isCorrect = answer_set == true_answers

	category = request.POST.get('category')
	symbol = request.POST.get('symbol')
	isCorrect = False

	if (category != 'LL1'):
		answer = request.POST.get('answer').rstrip(',')
		answer_set = set(answer.split(','))
		isCorrect = answer_set == answers[category][symbol]
	else:
		answer = request.POST.get('ll1answer') == "True"
		isCorrect = answer == answers[category]



	# print(answers[category][symbol])
	# print(answer_set)
	# print(answer_set == answers[category][symbol])

	if (isCorrect):
		request.session['curQ'] = currentQ + 1

	return JsonResponse({
		# "valid": True,
		"correct": isCorrect
	})

# @app.errorhandler(404)
# def page_not_found(request):
#     return render_template('page_not_found.html'), 404
