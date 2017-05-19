import json

from LL1_Academy.models import *
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseRedirect, Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages



def log_start_grammar(gid):
	g = Grammar.objects.filter(gid=gid).first()
	g.nStart += 1
	g.save()
	return 

def log_complete_grammar(request):
	#Update the grammar field
	gid = request.session['gid']
	score = request.session['score']
	grammar_obj = Grammar.objects.filter(gid=gid).first()
	grammar_obj.nComplete +=1
	grammar_obj.save()

	#Create a user history
	history = UserHistory.objects.filter(user=request.user,grammar=grammar_obj).first()
	if history == None:
		newHistory = UserHistory(user=request.user,grammar=grammar_obj,complete=True,score=score)
		newHistory.save()
	else: 
		history.complete = True
		#save the highest score 
		if history.score < score:
			history.score = score
		history.save()
	return 

def log_skip_grammar(request):
	if not request.method == 'POST':
		raise Http404("Wrong request type for log_skip_grammar")
	gid = request.session['gid']
	grammar_obj = Grammar.objects.filter(gid=gid).first()
	grammar_obj.nSkip +=1
	grammar_obj.save()

	if not UserHistory.objects.filter(user=request.user, grammar=grammar_obj).exists():
		newHistory = UserHistory(user=request.user,grammar=grammar_obj)
		newHistory.save()
	return JsonResponse({})

