import argparse
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Run UI tests on LL1 Academy website")
    parser.add_argument('host_selenium', metavar='host_selenium', help='hostname of selenium webdriver to connect to')
    parser.add_argument('host_website', metavar='host_website', help='hostname of website to test against')

    args = parser.parse_args()

    print(args.host_selenium)
    print(args.host_website)

    
#    while True:
#        pass
    capabilities = DesiredCapabilities.CHROME
    executor = "http://" + args.host_selenium + ":4444/wd/hub"
    print(executor)
    
    driver = webdriver.Remote(command_executor=executor, desired_capabilities=DesiredCapabilities.CHROME)
    driver.get(args.host_website)
    print (driver.title)

