import json

from LL1_Academy.models import *
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseRedirect, Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages



def log_start_grammar(gid):
	g = Grammar.objects.all()[gid]
	g.nStart += 1
	g.save()
	return 

def log_grammar(request):
	#update NSkip or NComplete
	if request.method == 'POST':
		gid = request.session['gid']
		completed = request.POST.get('completed')
		grammar_obj = Grammar.objects.filter(gid=gid).first()

		if completed == '1':
			#Update the grammar field
			grammar_obj.nComplete +=1
			grammar_obj.save()

			#Create a user history
			history = UserHistory.objects.filter(user=request.user,grammar=grammar_obj).first()
			print(history)
			if history == None:
				#TODO: Also log the scores
				newHistory = UserHistory(user=request.user,grammar=grammar_obj,complete=True,score=10)
				newHistory.save()
			else: 
				#TODO update the score
				history.complete = True
				history.score = 10
				history.save()

		elif completed == '0':
			#if skipped
			grammar_obj.nSkip +=1 
			grammar_obj.save()
		else:
			raise Http404("log_grammar does not recognize the status of grammar")

		#no need to return anything 
		return JsonResponse({})

	else:
		raise Http404("Cannot use GET method for log_grammar")
