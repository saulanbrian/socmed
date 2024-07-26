from django.db import models
import uuid

from user.models import CustomUser

def construct_path(instance,filename):
  return 'user_{0}/posts/post_{1}/{2}'.format(instance.author.username,instance.id,filename)

class Post(models.Model):
  id = models.UUIDField(default=uuid.uuid4,primary_key=True)
  author = models.ForeignKey(CustomUser,related_name='posts',on_delete=models.CASCADE)
  caption = models.TextField(max_length=200)
  image = models.ImageField(upload_to=construct_path,null=True)
