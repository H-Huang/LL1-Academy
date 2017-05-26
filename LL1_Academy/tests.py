from django.test import TestCase, Client
from django.urls import reverse
from LL1_Academy.models import Grammar, Question

from django.contrib.sites.models import Site

class TestData(TestCase):

    @classmethod
    def setUpTestData(cls):
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


class UrlTest(TestData):

    def test_index1(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_index2(self):
        response = self.client.get('/index')
        self.assertEqual(response.status_code, 200)

    def test_learn(self):
        response = self.client.get('/learn')
        self.assertEqual(response.status_code, 200)
    
    def test_get_question(self):
        response = self.client.get('/learn')
        session = self.client.session
        session.save()
        response = self.client.get('/get_question')
        self.assertEqual(response.status_code, 200)
    
    def test_check_answer(self):
        response = self.client.get('/check_answer')
        print(response)
        self.assertEqual(response.status_code, 400)

class RenderingTest(TestData):
    def test_index1(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'LL1_Academy/index.html')
    
    def test_index1(self):
        response = self.client.get('/learn')
        self.assertTemplateUsed(response, 'LL1_Academy/learn.html')

