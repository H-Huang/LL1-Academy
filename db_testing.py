# HOW TO RUN THIS:
# 
# make sure you are in the docker web instance using the following command from vagrant
# docker exec -it vagrant_web_1 bash
# 
# then call the following command:
# python manage.py shell < db_testing.py

from LL1_Academy.models import Grammar

newG = Grammar(prods="{'A': ['z', xA', 'Bz'], 'B': ['yB']}", nonterminals="AB", terminals="xyz")
newG.save()
