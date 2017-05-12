from django.test import TestCase, Client
from django.urls import reverse
from LL1_Academy.models import Grammar, Question


class UrlTest(TestCase):
    def setup(self):
        g = Grammar(prods="{'A': ['xA', 'Bz'],'B': ['yB']}", nonTerminals="AB", terminals="xyz", startsymbol="A")
        g.save()
        q = Question(gid=g, qnum=0, category="FI", symbol="A", answer="xy")
        q.save()

    def test_index1(self):
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_index2(self):
        client = Client()
        response = client.get('/index')
        self.assertEqual(response.status_code, 200)

    def test_learn(self):
        client = Client()
        response = client.get('/learn')
        self.assertEqual(response.status_code, 200)
    
    def test_get_question(self):
        client = Client()
        response = client.get('/get_question')
        self.assertEqual(response.status_code, 200)
    
    def test_check_answer(self):
        client = Client()
        response = client.get('/check_answer')
        self.assertEqual(response.status_code, 404)

class RenderingTest(TestCase):
    def test_index1(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'LL1_Academy/index.html')
    
    def test_index1(self):
        response = self.client.get('/learn')
        self.assertTemplateUsed(response, 'LL1_Academy/learn.html')