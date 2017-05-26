import operator
import json

from django.shortcuts import render
from django.http import HttpRequest, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib import messages
from django.forms.models import model_to_dict
from django.db.models import Count, Avg

from LL1_Academy.models import *

def get_grammar_avg(gid):
	grammar_avg = UserHistory.objects.filter(grammar=gid, complete=True).aggregate(Avg('score'))
	return round(grammar_avg["score__avg"],2)

def get_complete_rate(uid):
	results = {}
	results["complete"] = UserHistory.objects.filter(user_id=uid, complete=True).count()
	results["skip"] = UserHistory.objects.filter(user_id=uid, complete=False).count()
	return results

def get_user_performance(uid):
	if not UserHistory.objects.filter(complete=True, user=uid).exists():
		return 0
	nComplete_by_user = UserHistory.objects.filter(complete=True).values('user').annotate(nComplete=Count('user'))
	current_user_nComplete = nComplete_by_user.get(user=uid)['nComplete']
	nMore = nComplete_by_user.filter(nComplete__gte = current_user_nComplete).count()
	percentile = (1 - nMore/User.objects.all().count())*100
	return percentile

def profile(request):
	current_user_id = request.user.id
	user_histories = UserHistory.objects.all().filter(user_id=current_user_id)
	context = {"skipped_grammars": [], 
		"completed_grammars": [], 
		"percentile": 0,
		"user_info": {}}
	available_score = 0
	earned_score = 0
	# get data for each grammar that the user has completed
	for user_history in user_histories:
		grammar = Grammar.objects.get(pk=user_history.grammar_id)
		grammar_dict = model_to_dict(grammar, fields=["gid","prods","nonTerminals"])
		stats_dict = model_to_dict(user_history, fields=["complete", "score", "updateTime"])
		stats_dict.update(grammar_dict)
		nQuestions = (2 * len(stats_dict['nonTerminals']) + 2)
		available_score += nQuestions
		if stats_dict["complete"]:
			stats_dict["grammar_avg"] = get_grammar_avg(user_history.grammar_id)
			stats_dict["total_score"] = nQuestions
			context["completed_grammars"].append(stats_dict)
			earned_score += stats_dict["score"]
		else: 
			context["skipped_grammars"].append(stats_dict)
	#sort grammarhistory based on time
	context["completed_grammars"] = sorted(context["completed_grammars"], key=lambda k: k['updateTime'])
	context["skipped_grammars"] = sorted(context["skipped_grammars"], key=lambda k: k['updateTime'])
	# get user information
	user_info = model_to_dict(User.objects.get(pk=current_user_id), ["first_name", "last_name", "data_joined", "email", "last_login"])
	context["percentile"] = round(get_user_performance(current_user_id),2)
	context["user_info"] = user_info
	#pack up infos for the pie charts
	chart_stats = {"correct": earned_score, "wrong": available_score-earned_score}
	chart_stats.update(get_complete_rate(current_user_id))
	context["chart_stats"] = json.dumps(chart_stats)

	return render(request, 'LL1_Academy/profile.html', context)

def disconnect_account(request):
    provider_name = request.POST.get('account', '')

    for acc in request.user.socialaccount_set.all().iterator():
        if acc.get_provider().id == provider_name:
            acc.delete()
            messages.info(request,
                          'Your account has been successfully disconnected.')

    return HttpResponseRedirect('/profile')

def login_duplicate(request):
	return render(request, 'socialaccount/login_duplicate.html')
