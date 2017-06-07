import argparse
import unittest

from retrying import retry

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


class UITest(unittest.TestCase):
    driver = None
    executor = None
    def setUp(self):
        global executor
        host = "test_seleniumserver_1"
        executor = "http://{}:4444/wd/hub".format(host)
        capabilities = DesiredCapabilities.CHROME
        self.driver = self.connect(executor, capabilities)

    def connect(self, executor, capabilities):
        return webdriver.Remote(command_executor=executor, desired_capabilities=capabilities)

    def test_landingPage(self):
        global driver
        driver = self.driver
        url = 'http://sheltered-sands-11346.herokuapp.com'
        driver.get(url)
        self.assertIn('1', driver.title)


    def tearDown(self):
        if driver is not None:
            driver.quit()

if __name__ == '__main__':
    unittest.main()
