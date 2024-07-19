from rest_framework import serializers

from .models import CustomUser

from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = ['id','username','password']
    extra_kwargs = {
        'password':{'write_only':True}
    }
  
  def validate_password(self,value):
    validate_password(value)
    return value
