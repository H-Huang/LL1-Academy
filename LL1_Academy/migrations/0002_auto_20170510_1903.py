# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-10 19:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('LL1_Academy', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ParseTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('variable', models.CharField(max_length=1)),
                ('terminal', models.CharField(max_length=1)),
                ('answer', models.CharField(max_length=10)),
            ],
        ),
        migrations.RemoveField(
            model_name='grammar',
            name='nonterminals',
        ),
        migrations.AddField(
            model_name='parsetable',
            name='gid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='LL1_Academy.Grammar'),
        ),
        migrations.AlterUniqueTogether(
            name='parsetable',
            unique_together=set([('gid', 'variable', 'terminal')]),
        ),
    ]
