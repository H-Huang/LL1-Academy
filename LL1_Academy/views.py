import random
import ast

from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseRedirect, Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

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

def login_page(request):
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user is not None:
			login(request, user)
			messages.success(request, 'Successfully logged in')
			return HttpResponseRedirect('/index')
		else:
			# Return an 'invalid login' error message.
			messages.error(request, 'invalid credentials')
			return HttpResponseRedirect('/login')
	else:
		return render(request, 'LL1_Academy/login.html')

def logout_page(request):
	logout(request)
	return HttpResponseRedirect('/index')

def register_page(request):
	if request.method == 'POST':
		email = request.POST['email']
		username = request.POST['email']
		password = request.POST['password']
		#TODO: this confirm password should be down on client side so we dont refresh the page
		confirm_password = request.POST['confirm_password']
		if password != confirm_password:
			messages.error(request, "passwords do not match")
			return HttpResponseRedirect('/register')
		user = User.objects.create_user(username=username, email=email, password=password)
		login(request, user)
		messages.success(request, 'Successfully resgister and logged in')
		return HttpResponseRedirect('/learn')
	else:
		return render(request, 'LL1_Academy/register.html')


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
			isCorrect, feedback = compare_parse_table_answer(gid,true_answer,answer_dict)
			
			# print(answer_dict)
			# print(true_answer)
			# print(feedback)

			return JsonResponse({
				# "valid": True,
				"feedback": feedback,
				"correct": isCorrect
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
		raise Http404("Cannot use GET method for check_answer")