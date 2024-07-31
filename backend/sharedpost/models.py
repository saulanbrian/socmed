from django.db import models

from comment.models import Comment
from user.models import CustomUser as User
from post.models import Post

class SharedPost(models.Model):
  sharer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='shared_posts')
  post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='shares')
  caption = models.TextField(max_length=50)
  likers = models.ManyToManyField(User)
  comments = models.ManyToManyField(Comment)
