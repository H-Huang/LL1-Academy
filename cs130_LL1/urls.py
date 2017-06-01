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

import LL1_Academy.views.learn as learn
import LL1_Academy.views.tutorial as tutorial
import LL1_Academy.views.views as views
import LL1_Academy.views.stats as stats
import LL1_Academy.views.userProfile as user_profile


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^index', views.index),
    url(r'^about', views.about),
    url(r'^learn', learn.learn),
    url(r'^tutorial', tutorial.tutorial),
    url(r'^get_question', learn.get_question),
    url(r'^check_answer', learn.check_answer),
    url(r'^give_up', learn.give_up),
    url(r'^log_skip_grammar', stats.log_skip_grammar),
    url(r'^profile$', user_profile.profile),
    url(r'^accounts/disconnect_account$', user_profile.disconnect_account),
    url(r'^accounts/social/connections/$', user_profile.profile),
    url(r'^accounts/social/signup/$', user_profile.login_duplicate),
    url(r'^accounts/', include('allauth.urls')),
]

handler404='LL1_Academy.views.views.handler404'
handler500='LL1_Academy.views.views.handler500'
handler400='LL1_Academy.views.views.handler400'
