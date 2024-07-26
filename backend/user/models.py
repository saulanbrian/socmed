from django.db import models
import uuid

from django.contrib.auth.models import AbstractUser

from user_profile.models import Profile

class CustomUser(AbstractUser):
  
  STATUS_CHOICHES = [
    ('HOLD','HOLD'),
    ('ACTIVE','ACTIVE')
    ]
  
  profile = models.OneToOneField(Profile,on_delete=models.SET_NULL,null=True,related_name='user')
  account_status = models.CharField(max_length=20,choices=STATUS_CHOICHES,default='HOLD')
  