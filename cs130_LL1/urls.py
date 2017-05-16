"""cs130_LL1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin

from LL1_Academy import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^index', views.index),
    url(r'^learn', views.learn),
    url(r'^login$', views.login_page),
    url(r'^logout$', views.logout_page),
    url(r'^register$', views.register_page),
    url(r'^get_question', views.get_question),
    url(r'^check_answer', views.check_answer),
    url(r'^give_up', views.give_up),
    url(r'^log_grammar', views.log_grammar),
    url(r'^accounts/', include('allauth.urls')),
]
