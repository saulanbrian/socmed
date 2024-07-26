from django.dispatch import receiver
from django.db.models.signals import pre_save,post_save

from django.contrib.auth.hashers import make_password

from .models import CustomUser

@receiver(post_save,sender=CustomUser)
def hash_password(sender,instance,created,**kwargs):
  if created:
    instance.password = make_password(instance.password)

@receiver(pre_save,sender=CustomUser)
def check_setup_status(sender,instance,**kwargs):
  if bool(instance.profile):
    instance.account_status = 'ACTIVE'
  else:
    instance.account_status = 'DRAFT'