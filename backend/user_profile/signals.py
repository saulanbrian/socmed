from django.dispatch import receiver
from django.db.models.signals import pre_delete

from .models import Profile

@receiver(pre_delete,sender=Profile)
def update_user_status(sender,instance,**kwargs):
  user = instance.user
  user.profile = None
  user.save()
  
  