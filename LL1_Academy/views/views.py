from django.shortcuts import render

def index(request):
	return render(request, 'LL1_Academy/index.html')

def about(request):
	return render(request, 'LL1_Academy/about.html')

def handler404(request):
	context = {}
	context['title'] = "Oops, page not found."
	context['text'] = "We searched everywhere but could not find the page."
	response = render(request, 'LL1_Academy/error.html', context)
	response.status_code = 404
	return response

def handler500(request):
	context = {}
	context['title'] = "Oops, something went wrong."
	context['text'] = "An error happened while your request is handled."
	response = render(request, 'LL1_Academy/error.html', context)
	response.status_code = 500
	return response

def handler400(request):
	context = {}
	context['title'] = "Oops, bad request."
	context['text'] = "Please do not attempt to mess with our API."
	response = render(request, 'LL1_Academy/error.html', context)
	response.status_code = 400
	return response