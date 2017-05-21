from django.shortcuts import render


def index(request):
	return render(request, 'LL1_Academy/index.html')

def about(request):
	return render(request, 'LL1_Academy/about.html')