from django.db import models
from django.contrib.auth.models import User

class Grammar(models.Model):

	gid = models.AutoField(primary_key = True)
	prods = models.CharField(max_length=200)
	nonTerminals = models.CharField(max_length=4)
	terminals = models.CharField(max_length=4)
	startSymbol = models.CharField(max_length=1)
	nStart = models.IntegerField(default=0)
	nComplete = models.IntegerField(default=0)
	nSkip = models.IntegerField(default=0)
	
	def __str__(self):
		return str(self.gid) + ' ' + self.prods


class Question(models.Model):

	QUESTION_TYPES = (
		('FI', 'first'),
		('FO','follow'),
		('LL','isLL1'),
		('PT','parseTable'),
	)
	gid = models.ForeignKey(Grammar, on_delete = models.CASCADE)
	qnum = models.IntegerField()
	category = models.CharField(max_length = 2, choices = QUESTION_TYPES)
	symbol = models.CharField(max_length = 1, blank = True)
	answer = models.CharField(max_length = 300)
	nCorrect = models.IntegerField(default=0)
	nWrong = models.IntegerField(default=0)
	nGiveUp = models.IntegerField(default=0)

	def __str__(self):
		return str(self.gid.gid) + ' ' + str(self.qnum) + ' ' + self.category

	class Meta:
		unique_together = (("gid","qnum"))

class UserHistory(models.Model):
	user = models.ForeignKey(User, on_delete = models.CASCADE)
	grammar = models.ForeignKey(Grammar, on_delete = models.CASCADE)
	complete = models.BooleanField(default=False)
	score = models.IntegerField(blank=True)
	updateTime = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.user) + ' ' + str(self.grammar.gid)

	def save(self, *args, **kwargs):
	    if self.complete and (self.score is None):
	        raise Exception("Score cannot be empty for a completed question")
	    super(UserHistory, self).save(*args, **kwargs) 

	class Meta:
		unique_together = (("user","grammar"))
