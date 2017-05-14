# LL1-Academy

## Getting Started:

### If you have docker + docker-compose installed locally:

    docker-compose up

### Otherwise download Vagrant and VirtualBox 5.1.18

    vagrant up
    vagrant ssh (or use "ssh -p 2222 vagrant@localhost" with password vagrant)
    cd /vagrant
    docker-compose up

The commands above will use Docker Compose to run the Django/PostgreSQL app. You will be able to view the application on your local computer on localhost:8000/.

##  Important files

__cs130_LL1/settings.py__:  Modify project-wide settings (type of database, static folder location, etc.)

__cs130_LL1/urls.py__:  Routing for different urls.

__cs130_LL1/static/__:  Where we will store all of our static assets.

__LL1_Academy/migrations/__:  Contains all the database migrations.

__LL1_Academy/admin.py__:  Add models here to be detected in the admin panel.

__LL1_Academy/models.py__:  Database models using ORM.

__LL1_Academy/tests.py__:  Test cases for features in the app.

__LL1_Academy/views.py__:  Where the majority of the web application logic will be
