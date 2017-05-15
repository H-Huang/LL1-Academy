import random
import ast
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseNotFound
from LL1_Academy.models import *
from LL1_Academy.tools.GrammarChecker import *

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
		request.session['curQ'] = 0

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
	category = question.get_category_display()
	symbol = question.symbol
	print(question.answer)

	if category == 'parseTable':
		grammar_obj = Grammar.objects.filter(gid=gid).first()
		non_terminals = list(grammar_obj.nonTerminals)
		terminals = list(grammar_obj.terminals)
		return JsonResponse({
			"category": category,
			"symbol": symbol,
			"non_terminals": non_terminals,
			"terminals": terminals
		})

	return JsonResponse({
		"category": category,
		"symbol": symbol
	})

def check_answer(request):
	if request.method == 'POST':
		gid = request.session['gid']
		currentQ = request.session['curQ']
		question = Question.objects.filter(gid__gid__contains=gid, qnum=currentQ).first()
		category = question.get_category_display()

		# TODO: actually check if answer is right
		# think about where validations should take place - probably on client

		# category = request.POST.get('category')
		# symbol = request.POST.get('symbol')
		isCorrect = False

		if (category == 'isLL1'):
			answer = request.POST.get('ll1answer') == "True"
			true_answers = question.answer == "True"
			isCorrect = answer == true_answers
		elif (category == 'parseTable'):
			answer = request.POST.get('answer')
			answer_dict = ast.literal_eval(answer)
			true_answer = ast.literal_eval(question.answer)
			
			# print(answer_dict)
			# print(true_answer)

			return JsonResponse({
				# "valid": True,
				"correct": answer_dict == true_answer
			})

		else:
			answer = request.POST.get('answer').rstrip(',')
			answer_set = set(answer.split(','))
			true_answers = set(list(question.answer))
			isCorrect = answer_set == true_answers



		# print(answers[category][symbol])
		# print(answer_set)
		# print(answer_set == answers[category][symbol])

		if (isCorrect):
			request.session['curQ'] = currentQ + 1

		return JsonResponse({
			# "valid": True,
			"correct": isCorrect
		})
	else:
		return HttpResponseNotFound('<h1>Page not found</h1>')

# @app.errorhandler(404)
# def page_not_found(request):
#     return render_template('page_not_found.html'), 404
