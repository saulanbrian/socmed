from django.dispatch import receiver
from django.db.models.signals import pre_save,post_save

from django.contrib.auth.hashers import make_password

from .models import CustomUser

@receiver(post_save,sender=CustomUser)
def hash_password(sender,instance,created,**kwargs):
  if created:
    instance.password = make_password(instance.password)
    instance.save()
    
