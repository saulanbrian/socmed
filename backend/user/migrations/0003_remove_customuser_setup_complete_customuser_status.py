# Generated by Django 5.0.6 on 2024-07-26 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_customuser_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='setup_complete',
        ),
        migrations.AddField(
            model_name='customuser',
            name='status',
            field=models.CharField(choices=[('HOLD', 'HOLD'), ('ACTIVE', 'ACTIVE')], default='HOLD', max_length=20),
        ),
    ]
