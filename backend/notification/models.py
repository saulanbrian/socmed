from django.db import models

from user.models import CustomUser as User

class Notification(models.Model):
  
  NotificationTypes = [
      ('like','like'),
      ('comment','comment'),
      ('share','share'),
    ]
  
  is_read = models.BooleanField(default=False)
  type = models.CharField(max_length=50,choices=NotificationTypes)
  actor = models.ForeignKey(User,on_delete=models.CASCADE)
  receiver = models.ForeignKey(User,on_delete=models.CASCADE,related_name='notifications')
  message = models.CharField(max_length=100)
