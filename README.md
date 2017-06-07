[![Build Status](https://travis-ci.org/H-Huang/LL1-Academy.svg?branch=master)](https://travis-ci.org/H-Huang/LL1-Academy) [![GitHub releases](https://img.shields.io/badge/releases-4-brightgreen.svg)](https://github.com/H-Huang/LL1-Academy/releases) [![GitHub issues](https://img.shields.io/github/issues/H-Huang/LL1-Academy.svg)](https://github.com/H-Huang/LL1-Academy/issues) [![GitHub stars](https://img.shields.io/github/stars/H-Huang/LL1-Academy.svg)](https://github.com/H-Huang/LL1-Academy/stargazers) [![GitHub forks](https://img.shields.io/github/forks/H-Huang/LL1-Academy.svg)](https://github.com/H-Huang/LL1-Academy/network) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/H-Huang/LL1-Academy/master/LICENSE)
# LL1-Academy

### Team :fire: :
| Julien Brundrett | Howard Huang | Vincent Siu | Elise Yuen | Vivian (Ni) Zhang |
| :-: | :-: | :-: | :-: | :-: |
| [@jbrundrett](https://github.com/jbrundrett) | [@H-Huang](https://github.com/H-Huang) | [@vincesiu](https://github.com/vincesiu) | [@eliseyuen](https://github.com/eliseyuen) | [@vivz](https://github.com/vivz)

## Introduction:

The LL(1) Academy web application is intended to be used as a resource for students to gain more familiarity with compiler concepts such as LL(1) grammars, First sets, and Follow sets. 

## Getting Started:

### If you have docker + docker-compose installed locally:

    docker-compose up

### Otherwise download Vagrant and VirtualBox 5.1.18

    vagrant up
    vagrant ssh (or use "ssh -p 2222 vagrant@localhost" with password vagrant)
    cd /vagrant
    docker-compose up

The commands above will use Docker Compose to run the Django/PostgreSQL app. You will be able to view the application on your local computer on localhost:8000/.

##  Important files:

__cs130_LL1/settings.py__:  Modify project-wide settings (type of database, static folder location, etc.)

__cs130_LL1/urls.py__:  Routing for the multiple url and pages for the application.

__cs130_LL1/static/__:  Where the static assets are stored for development.

__LL1_Academy/migrations/__:  Contains all the database migrations.

__LL1_Academy/admin.py__:  Models here are detected in the admin panel.

__LL1_Academy/models.py__:  Database models through Django's ORM.

__LL1_Academy/tests.py__:  Test cases for features in the application.

__LL1_Academy/views/__:  Where the majority of the web application logic is
