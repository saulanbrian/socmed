from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
    

def get_user_profile(user):
  try:
    if user.profile.picture:
      return user.profile.picture.url
    else:
      return None
  except AttributeError:
    return None

def get_user_display_name(user):
  try:
    return user.profile.display_name
  except AttributeError:
    return None


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    token['setup_complete'] = user.setup_complete
    token['profile_picture'] = get_user_profile(user)
    token['display_name'] = get_user_display_name(user)
    
    return token