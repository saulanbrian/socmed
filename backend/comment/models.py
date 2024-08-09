from django.db import models

from user.models import CustomUser as User
from post.models import Post

def construct_path(instance,filename):
  return 'user_{0}/comments/comment_{1}/{2}'.format(instance.author.username,instance.id,filename)

class Comment(models.Model):
  author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments')
  image = models.ImageField(upload_to=construct_path,null=True)
  text = models.TextField(max_length=100,null=True)
  likers = models.ManyToManyField(User,related_name='liked_comments')
  post = models.ForeignKey(Post,related_name='comments',on_delete=models.CASCADE)
