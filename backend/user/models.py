from django.db import models
import uuid

from django.contrib.auth.models import AbstractUser

from user_profile.models import Profile

class CustomUser(AbstractUser):
  profile = models.OneToOneField(Profile,on_delete=models.SET_NULL,null=True,related_name='user')
  setup_complete = models.BooleanField(default=False)
  