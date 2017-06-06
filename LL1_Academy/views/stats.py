import json

from LL1_Academy.models import *
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponseRedirect, Http404, HttpResponseBadRequest
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

	#Create a user history if this is a logged in session
	if request.user.is_authenticated:
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
		response = render(request, 'LL1_Academy/error.html', {
			'title':'Oops, invalid request to log_skip_grammar.',
			'text':'log_skip_grammar is not happy with how your request is formatted.'
			})
		response.status_code = 400
		return response

	request.session['hide_explainer'] = request.POST.get('hide_explainer')

	gid = request.session['gid']
	grammar_obj = Grammar.objects.filter(gid=gid).first()
	grammar_obj.nSkip +=1
	grammar_obj.save()

	#only does this part if user is logged in
	if request.user.is_authenticated:
		if not UserHistory.objects.filter(user=request.user, grammar=grammar_obj).exists():
			newHistory = UserHistory(user=request.user,grammar=grammar_obj)
			newHistory.save()

	return JsonResponse({})

