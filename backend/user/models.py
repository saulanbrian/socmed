from django.db import models

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
  in_app_username = models.CharField(max_length=50)
