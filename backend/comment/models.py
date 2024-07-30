from django.db import models

from post.models import Post
from user.models import CustomUser as User

class Comment(models.Model):
  text = models.TextField(max_length=100)
  post = models.ForeignKey(Post,related_name='comments',on_delete=models.CASCADE)
  likers = models.ManyToManyField(User,related_name='comments')
