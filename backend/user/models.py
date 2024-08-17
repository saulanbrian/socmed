from django.db import models
import uuid

from django.contrib.auth.models import AbstractUser



def construct_path(instance,filename):
  return '{0}/profile_picture/{1}'.format(instance.username,filename)

class CustomUser(AbstractUser):
  followers = models.ManyToManyField('self',related_name='following',symmetrical=False)
  display_name = models.CharField(max_length=50)
  pfp = models.ImageField(upload_to=construct_path,null=True)
  bio = models.CharField(max_length=200,null=True)