from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = ['username','password']
    extra_kwargs = {
        'password':{'write_only':True}
    }
  
  def validate_password(self,value):
    validate_password(value)
    return value
    


def get_user_profile(user):
  if user.profile:
    return user.profile.url
  return None

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    token['setup_complete'] = user.setup_complete
    token['profile'] = get_user_profile(user)
    token['in_app_username'] = user.in_app_username or None
    
    return token