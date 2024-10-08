# Generated by Django 5.0.6 on 2024-08-17 00:22

import post.models
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('caption', models.TextField(max_length=200)),
                ('image', models.ImageField(null=True, upload_to=post.models.construct_path)),
            ],
        ),
    ]
