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

import LL1_Academy.views.learn as views
import LL1_Academy.views.pages as pages
import LL1_Academy.views.stats as stats
import LL1_Academy.views.userProfile as user_profile


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', pages.index),
    url(r'^index', pages.index),
    url(r'^about', pages.about),
    url(r'^learn', views.learn),
    url(r'^get_question', views.get_question),
    url(r'^check_answer', views.check_answer),
    url(r'^give_up', views.give_up),
    url(r'^log_grammar', stats.log_grammar),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^profile$', user_profile.profile),
     url(r'^disconnect_account$', user_profile.disconnect_account),
]
