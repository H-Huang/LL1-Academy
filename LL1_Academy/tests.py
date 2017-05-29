from django.test import TestCase, Client
from django.urls import reverse
from LL1_Academy.models import Grammar, Question

from django.contrib.sites.models import Site
from django.contrib.auth.models import User

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


class RoutingTest(TestData):
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
    
    def test_learn(self):
        response = self.client.get('/learn')
        self.assertTemplateUsed(response, 'LL1_Academy/learn.html')

    def test_error_page(self):
        response = self.client.get('/get_404_page')
        self.assertTemplateUsed(response, 'LL1_Academy/error.html')

# class GrammarTest(TestData):