import random
import ast
import json

from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseRedirect, Http404, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.forms.models import model_to_dict

from LL1_Academy.views import stats 
from LL1_Academy.models import *


def get_random_grammar(user):
	if not user.is_authenticated:
		uncompleted_grammars = Grammar.objects.all()
	else:
		completed_gids = UserHistory.objects.all().filter(user=user,complete=True).values_list('grammar',flat=True)
		uncompleted_grammars = Grammar.objects.exclude(gid__in=completed_gids)
	size = uncompleted_grammars.count()
	if size == 0:
		return None
	randid = random.randint(0,size-1)
	g=uncompleted_grammars[randid]
	return g

def practice(request):
	# on page load we start the session over

	#if 'gid' not in request.session or request.session['gid']==None
	#print(request.GET.get('gid') )

	if request.GET.get('gid') == None:
		random_grammar = get_random_grammar(request.user)
		if random_grammar == None:
			context = {
				"title": "You finished all our grammars!",
				"text": "Click on your username to visit your profile page. You will be able to continue practicing on grammars you have already completed or skipped."
			}
			return render(request, 'LL1_Academy/error.html', context)

		request.session['gid'] = random_grammar.gid
	else:
		request.session['gid'] = request.GET.get('gid')

	stats.log_start_grammar(request.session['gid'])
	request.session['curQ'] = 0
	request.session['score'] = 0
	if not 'hide_explainer' in request.session: 
		request.session['hide_explainer'] = False

	grammar_obj = Grammar.objects.filter(gid=request.session['gid']).first()
	non_terminals = list(grammar_obj.nonTerminals)
	terminals = list(grammar_obj.terminals)
	prods = ast.literal_eval(grammar_obj.prods)
	
	grammar_object = []
	for nt in non_terminals:
		grammar_object.append({"nt": nt, "productions": prods[nt]})

	#stringify terminals + non_terminals
	terminals = ", ".join(terminals)
	non_terminals = "{" + ", ".join(non_terminals) + "}"
	#prepare all items to be passed into the template
	context = {
		"grammar_object": grammar_object,
		"terminals": terminals,
		"non_terminals": non_terminals,
		"start_symbol": 'A',
		"hide_explainer": request.session['hide_explainer'],
		"user_authenticated": request.user.is_authenticated,
		"grammar_json": json.dumps({"grammar": grammar_object})
	}

	return render(request, 'LL1_Academy/practice.html', context)

def get_question(request):
	gid = request.session['gid']
	currentQ = request.session['curQ']
	question = Question.objects.filter(gid__gid__exact=gid, qnum=currentQ).first()
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

	result = {
		"category": category,
		"symbol": symbol,
		"new_user": False
	}

	if currentQ == 0 and is_new_user(request):
		result["new_user"] = True

	return JsonResponse(result)

def is_new_user(request):
	user = request.user
	if "tutorial" in request.session:
		return False
	request.session["tutorial"] = True

	if user.is_authenticated:
		return UserHistory.objects.filter(user=user).count() == 0
	else:
		return False;

def compare_parse_table_answer(gid, true_answer, answer):
	grammar_obj = Grammar.objects.filter(gid=gid).first()
	non_terminals = list(grammar_obj.nonTerminals)
	terminals = list(grammar_obj.terminals)
	terminals.append('$')

	feedback = {}
	isCorrect = True
	for nt in non_terminals:
		feedback[nt] = []
		for t in terminals:
			# case 1: t in true_answer, not in answer
			if t in true_answer[nt] and t not in answer[nt]:
				feedback[nt].append(1)
				isCorrect = False
			# case 2: t not in true_answer, in answer
			elif t not in true_answer[nt] and t in answer[nt]:
				feedback[nt].append(1)
				isCorrect = False
			else:
				# case 3: t in neither
				if t not in answer[nt]:
					feedback[nt].append(0)
				# case 4: t in both -- check if same
				else:
					if set(answer[nt][t]) == set(true_answer[nt][t]):
						feedback[nt].append(0)
					else:
						feedback[nt].append(1)
						isCorrect = False
	return isCorrect, feedback

def give_up(request):
	if 'gid' in request.session and 'curQ' in request.session:
		gid = request.session['gid']
		currentQ = request.session['curQ']
		question = Question.objects.filter(gid__gid__exact=gid, qnum=currentQ).first()
		
		score = ""
		# TODO: fix the PT question handling
		if question.category == 'PT':
			ret = json.dumps(ast.literal_eval(question.answer))
			# the below is a hacky fix b/c the frontend submits this separately
			request.session['score'] = request.session['score'] - 1
		elif question.category == 'LL':
			ret = question.answer
			request.session['curQ'] = currentQ + 1
			score = calc_score_log_grammar(request)
			request.session['hide_explainer'] = request.POST.get('hide_explainer')
		else:
			ret = ','.join(question.answer)
			request.session['curQ'] = currentQ + 1

		return JsonResponse({
			"answer": ret,
			"category": question.category,
			"score": score
		})

	else:
		response = render(request, 'LL1_Academy/error.html', {
			'title':'Oops, invalid request to give_up.',
			'text':'There is no question in progress.'
			})
		response.status_code = 400
		return response

def last_question_reached():
	print("last question --> do something")

# TODO: remove this function its pointless but the logic is useful for displaying stuff
def calc_score_log_grammar(request):
	gid = request.session['gid']
	qcount = Question.objects.filter(gid__gid__exact=gid).count()
	score = request.session['score']
	# scorestr = "{0:.0f}%".format((score * 100) / qcount)
	# print(qcount,request.session['score'])
	stats.log_complete_grammar(request)
	return "{}/{}".format(score,qcount)

def check_answer(request):
	if request.method == 'POST':
		request.session['hide_explainer'] = request.POST.get('hide_explainer')

		gid = request.session['gid']
		currentQ = request.session['curQ']
		question = Question.objects.filter(gid__gid__exact=gid, qnum=currentQ).first()
		category = question.get_category_display()

		# TODO: actually check if answer is right
		# think about where validations should take place - probably on client

		# category = request.POST.get('category')
		# symbol = request.POST.get('symbol')
		isCorrect = False
		feedback = ''

		if (category == 'isLL1'):
			answer = request.POST.get('ll1answer') == "True"
			true_answers = question.answer == "True"
			isCorrect = answer == true_answers
		elif (category == 'parseTable'):
			answer = request.POST.get('answer')
			answer_dict = ast.literal_eval(answer)
			true_answer = ast.literal_eval(question.answer)
			isCorrect, feedback = compare_parse_table_answer(gid,true_answer,answer_dict)
		else:
			answer = request.POST.get('answer').rstrip(',')
			answer_set = set(answer.split(','))
			true_answers = set(list(question.answer))
			isCorrect = answer_set == true_answers

		# print(answers[category][symbol])
		# print(answer_set)
		# print(answer_set == answers[category][symbol])

		score = ""

		if (isCorrect):
			request.session['curQ'] = currentQ + 1
			request.session['score'] = request.session['score'] + 1
			if (category == 'isLL1'):
				score = calc_score_log_grammar(request)


		if (category == 'parseTable'):
			print(feedback)
			return JsonResponse({
				"feedback": feedback,
				"correct": isCorrect
			})
		else:
			return JsonResponse({
				"correct": isCorrect,
				"score": score
			})
	else:
		response = render(request, 'LL1_Academy/error.html', {
			'title':'Oops, invalid request to check_anser.',
			'text':'Cannot use GET method for check_answer.'
			})
		response.status_code = 400
		return response

