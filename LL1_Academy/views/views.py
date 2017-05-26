from django.shortcuts import render

def index(request):
	return render(request, 'LL1_Academy/index.html')

def about(request):
	return render(request, 'LL1_Academy/about.html')

def handler404(request):
    response = render(request, '404.html')
    response.status_code = 404
    return response
