from django.db import models

def profile_path(instance,filename):
  return 'user_{0}/profile/{1}'.format(instance.user.username,filename)

class Profile(models.Model):
  display_name = models.CharField(max_length=50)
  picture = models.ImageField(upload_to=profile_path,null=True)
  description = models.TextField(max_length=200)
