from django.core.management.base import BaseCommand, CommandError
from LL1_Academy.models import Grammar

class Command(BaseCommand):
    help = 'This will delete all grammars in the database be careful'
    
    def handle(self, *args, **options):
        Grammar.objects.all().delete()
