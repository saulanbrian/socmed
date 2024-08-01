from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Post

@receiver(post_save,sender=Post)
def check_validity(sender,instance,**kwargs):
  if instance.author.account_status != 'ACTIVE':
    instance.delete()