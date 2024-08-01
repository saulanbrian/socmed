from django.dispatch import receiver
from django.db.models.signals import pre_delete, post_save

from .models import Profile

@receiver(pre_delete,sender=Profile)
def update_user_status(sender,instance,**kwargs):
  user = instance.user
  user.profile = None
  user.save()

@receiver(post_save,sender=Profile)
def delete_profile(sender,instance,**kwargs):
  if instance.display_name is None:
    instance.delete()
  