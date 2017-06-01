from django.shortcuts import render

def tutorial(request):
	# context = {}
	return render(request, 'LL1_Academy/tutorial.html')