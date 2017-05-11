from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'HERE IS AN EXAMPLE COMMAND'
    
    def handle(self, *args, **options):
        print("HELLO WORLD TEST")