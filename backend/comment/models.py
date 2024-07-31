from django.db import models

from user.models import CustomUser as User

class Comment(models.Model):
  author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments')
  text = models.TextField(max_length=100)
  likers = models.ManyToManyField(User,related_name='liked_comments')
