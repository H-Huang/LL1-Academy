import argparse
from retrying import retry
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

@retry
def connect(executor, capabilities):
    print("hi")
    driver = webdriver.Remote(command_executor=executor, desired_capabilities=capabilities)
    return driver
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Run UI tests on LL1 Academy website")
    parser.add_argument('host_selenium', metavar='host_selenium', help='hostname of selenium webdriver to connect to')
    parser.add_argument('host_website', metavar='host_website', help='hostname of website to test against')

    args = parser.parse_args()
    
    capabilities = DesiredCapabilities.CHROME
    executor = "http://" + args.host_selenium + ":4444/wd/hub"
    
    driver = connect(executor, capabilities)
    driver.get(args.host_website)
    print (driver.title)

