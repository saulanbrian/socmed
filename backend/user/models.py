from django.db import models
import uuid

from django.contrib.auth.models import AbstractUser


def construct_path(instance,filename):
  return 'user_{0}/profile/{1}'.format(instance.id,filename)
  

class CustomUser(AbstractUser):
  in_app_username = models.CharField(max_length=50,null=True)
  profile = models.ImageField(upload_to=construct_path,null=True)
  setup_complete = models.BooleanField(default=False)
  
  USERNAME_FIELD = 'username'