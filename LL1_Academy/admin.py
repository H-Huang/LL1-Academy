from django.contrib import admin
from .models import Grammar, Question, UserHistory

# Register your models here.
admin.site.register(Grammar)
admin.site.register(Question)
admin.site.register(UserHistory)