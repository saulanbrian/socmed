# Generated by Django 5.0.6 on 2024-08-09 08:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0005_post_comments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='comments',
        ),
    ]
