from django.db import models

# Create your models here.
class Grammar(models.Model):

	gid = models.AutoField(primary_key = True)
	prods = models.CharField(max_length=200)
	nonterminals = models.CharField(max_length=4)
	terminals = models.CharField(max_length=4)

	def __str__(self):
		return str(self.gid) + ' ' + self.prods


class Question(models.Model):

	QUESTION_TYPES = (
		('FI', 'first'),
		('FO','follow'),
		('LL','isLL1'),
	)
	gid = models.ForeignKey(Grammar, on_delete = models.CASCADE)
	qnum = models.IntegerField()
	category = models.CharField(max_length = 2, choices = QUESTION_TYPES)
	symbol = models.CharField(max_length = 1, blank = True)
	answer = models.CharField(max_length = 4)

	class Meta:
		unique_together = (("gid","qnum"))
