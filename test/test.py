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

    def test_tutorial(self):
        pass

    def test_practice(self):
        pass

    def test_about(self):
        driver = self.driver
        elem = driver.find_element_by_link_text('About')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('About')
                )
        
    def test_github(self):
        driver = self.driver
        elem = driver.find_element_by_link_text('Github')
        elem.click()
        WebDriverWait(driver, 10).until(
                EC.title_contains('LL(1) Academy')
                )
        self.assertIn('LL(1) Academy - Homepage', driver.title)

    def tearDown(self):
        if self.driver is not None:
            self.driver.quit()

if __name__ == '__main__':
    time.sleep(10)
    unittest.main()
