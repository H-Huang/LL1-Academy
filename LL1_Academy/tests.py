# test case base class
from django.test import TestCase, Client

# routing
from django.http import HttpRequest
from django.urls import reverse

# models
from LL1_Academy.models import Grammar, Question, UserHistory
from django.contrib.sites.models import Site
from django.contrib.auth.models import User

# sessions
from django.conf import settings
from importlib import import_module

# import the functions that we need to test
import LL1_Academy.views.practice as practice
import LL1_Academy.views.tutorial as tutorial
import LL1_Academy.views.views as views
import LL1_Academy.views.stats as stats
import LL1_Academy.views.userProfile as user_profile
import LL1_Academy.tools.GrammarChecker as grammar_checker
import LL1_Academy.tools.MassGrammarGenerator as mass_grammar_generator
import LL1_Academy.tools.SingleGrammarGenerator as single_grammar_generator
import LL1_Academy.tools.SvmLearn as svm_learn

class TestData(TestCase):

    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='test',
                                        email='test@gmail.com',
                                        password='test')

        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()

        q = Question(gid=g, qnum=0, category="FI", symbol="A", answer="xy")
        q.save()

        cls.current_site = Site.objects.get_current()

        cls.SocialApp1 = cls.current_site.socialapp_set.create(
            provider="facebook",
            name="facebook",
            client_id="1234567890",
            secret="0987654321",
        )

        cls.SocialApp2 = cls.current_site.socialapp_set.create(
            provider="google",
            name="google",
            client_id="1234567890",
            secret="0987654321",
        )

class ModelTest(TestData):

    def test_grammar(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        t_grammar = Grammar.objects.get(pk=g.pk)
        self.assertEqual(t_grammar.prods, "{'A': ['xA', 'Bz'],'B': ['yB']}")
        self.assertEqual(t_grammar.nonTerminals, "AB")
        self.assertEqual(t_grammar.terminals, "xyz")
        self.assertEqual(t_grammar.startSymbol, "A")
        self.assertEqual(t_grammar.nStart, 0)
        self.assertEqual(t_grammar.nComplete, 0)
        self.assertEqual(t_grammar.nSkip, 0)

    def test_question(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        q = Question(gid=g, qnum=0, category="FI", symbol="A", answer="xy")
        q.save()
        t_question = Question.objects.get(pk=q.pk)
        self.assertEqual(t_question.gid, g)
        self.assertEqual(t_question.qnum, 0)
        self.assertEqual(t_question.category, "FI")
        self.assertEqual(t_question.symbol, "A")
        self.assertEqual(t_question.answer, "xy")
        self.assertEqual(t_question.nCorrect, 0)
        self.assertEqual(t_question.nWrong, 0)
        self.assertEqual(t_question.nGiveUp, 0)

    def test_user_history(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        u = User.objects.get(username="test")
        t_user_history = UserHistory(user=u, grammar=g)
        self.assertEqual(t_user_history.user, u)
        self.assertEqual(t_user_history.grammar, g)
        self.assertEqual(t_user_history.complete, False)
        self.assertEqual(t_user_history.score, -1)

# TODO: add more tests
class PracticeTest(TestData):

    def test_get_random_grammar_unit_test(self):
        sample_g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        user = User.objects.get(username="test")
        g = practice.get_random_grammar(user)
        self.assertEqual(g.prods, sample_g.prods)
        self.assertEqual(g.nonTerminals, sample_g.nonTerminals)
        self.assertEqual(g.terminals, sample_g.terminals)
        self.assertEqual(g.startSymbol, sample_g.startSymbol)

class UserProfileTest(TestData):

    def test_hi(self):
        pass
    
class StatsTest(TestData):
    
    # we can parse this content with BS4???
    def test_stats_page(self):
        c = Client()
        c.login(username='test', password='test')
        response = c.get('/profile')
        # print(response.content)
    
    def test_log_start_grammar_unit_test(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        g = Grammar.objects.get(pk=g.pk)
        before_nStart = g.nStart
        stats.log_start_grammar(g.pk)
        g = Grammar.objects.get(pk=g.pk)
        self.assertEqual(before_nStart + 1, g.nStart)

    def test_log_complete_grammar_unit_test(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        request = HttpRequest()
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request.session['gid'] = g.pk
        request.session['score'] = 5
        request.user = User.objects.get(username="test")
        before_nComplete = g.nComplete
        stats.log_complete_grammar(request)
        g = Grammar.objects.get(pk=g.pk)
        self.assertEqual(before_nComplete + 1, g.nComplete)
    
    # this test needs to be tested more thoroughly
    def test_log_skip_grammar_unit_test(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startSymbol="A")
        g.save()
        request = HttpRequest()
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request.session['gid'] = g.pk
        request.session['hide_explainer'] = False
        request.user = User.objects.get(username="test")
        before_nSkip = g.nSkip
        stats.log_skip_grammar(request)
        g = Grammar.objects.get(pk=g.pk)
        self.assertEqual(before_nSkip, g.nSkip)

class RoutingTest(TestData):
    def test_index1(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_index2(self):
        response = self.client.get('/index')
        self.assertEqual(response.status_code, 200)

    def test_practice(self):
        response = self.client.get('/practice')
        self.assertEqual(response.status_code, 200)

    def test_tutorial(self):
        response = self.client.get('/tutorial')
        self.assertEqual(response.status_code, 200)
    
    def test_get_question(self):
        response = self.client.get('/practice')
        session = self.client.session
        session.save()
        response = self.client.get('/get_question')
        self.assertEqual(response.status_code, 200)
    
    def test_check_answer(self):
        response = self.client.get('/check_answer')
        self.assertEqual(response.status_code, 400)

class RenderingTest(TestData):
    def test_index1(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'LL1_Academy/index.html')
    
    def test_index2(self):
        response = self.client.get('/index')
        self.assertTemplateUsed(response, 'LL1_Academy/index.html')
    
    def test_about(self):
        response = self.client.get('/about')
        self.assertTemplateUsed(response, 'LL1_Academy/about.html')
    
    def test_profile(self):
        c = Client()
        c.login(username='test', password='test')
        response = c.get('/profile')
        self.assertTemplateUsed(response, 'LL1_Academy/profile.html')
    
    def test_practice(self):
        response = self.client.get('/practice')
        self.assertTemplateUsed(response, 'LL1_Academy/practice.html')

    def test_tutorial(self):
        response = self.client.get('/tutorial')
        self.assertTemplateUsed(response, 'LL1_Academy/tutorial.html')

    def test_error_page(self):
        response = self.client.get('/get_404_page')
        self.assertTemplateUsed(response, 'LL1_Academy/error.html')
