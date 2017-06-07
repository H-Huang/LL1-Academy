import argparse
import time
import unittest

from retrying import retry

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class UITest(unittest.TestCase):
    driver = None
    executor = None
    def setUp(self):
        global executor
        host = "test_seleniumserver_1"
        executor = "http://{}:4444/wd/hub".format(host)
        url = 'http://sheltered-sands-11346.herokuapp.com'
        capabilities = DesiredCapabilities.FIREFOX
        self.driver = self.connect(executor, capabilities)
        self.driver.get(url)

    @retry(wait_fixed=1000)
    def connect(self, executor, capabilities):
        return webdriver.Remote(command_executor=executor, desired_capabilities=capabilities)

    def test_landingPage(self):
        driver = self.driver
        self.assertEqual('LL(1) Academy - Homepage', driver.title)

    def test_practice(self):
        driver = self.driver
        driver.implicitly_wait(10)
        elem = driver.find_element_by_partial_link_text('begin')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('Tutorial')
                )
        elem = driver.find_element_by_partial_link_text('practicing')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_id('giveup')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_id('giveup')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_id('giveup')
        elem.click()
        

    def test_tutorial(self):
        driver = self.driver
        elem = driver.find_element_by_partial_link_text('begin')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('Tutorial')
                )
       
        elem = driver.find_element_by_id('firstTutorial')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_class_name('question-help')
        self.assertIn('First Set',elem.text)
        elem = driver.find_element_by_id('followTutorial')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_class_name('question-help')
        self.assertIn('Follow Set',elem.text)
        elem = driver.find_element_by_id('parseTutorial')
        elem.click()
        time.sleep(0.5)
        elem = driver.find_element_by_class_name('question-help')
        self.assertIn('First(xA)',elem.text)

    def test_about(self):
        driver = self.driver
        elem = driver.find_element_by_link_text('About')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('About')
                )
        self.assertEqual('LL(1) Academy - About', driver.title)
        
    def test_github(self):
        driver = self.driver
        elem = driver.find_element_by_link_text('Github')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('LL(1) Academy')
                )
        self.assertIn('LL(1) Academy - Homepage', driver.title)
        time.sleep(1)

    def test_bug_report(self):
        driver = self.driver
        elem = driver.find_element_by_partial_link_text('begin')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('Tutorial')
                )
        self.assertEqual('LL(1) Academy - Tutorial', driver.title)
        elem = driver.find_element_by_partial_link_text('Report a Bug')
        elem.click()
        time.sleep(2)
        self.assertEqual('LL(1) Academy Bug Report', driver.title)



    def tearDown(self):
        time.sleep(1)
        if self.driver is not None:
            self.driver.quit()

if __name__ == '__main__':
    time.sleep(5)
    unittest.main()
