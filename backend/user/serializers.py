from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser

from django.contrib.auth.password_validation import validate_password


class UserAuthSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = [
      'id',
      'display_name',
      'username',
      'password']
    extra_kwargs = {
        'password':{'write_only':True}
    }
  
  def validate_password(self,value):
    validate_password(value)
    return value
    

def get_user_profile(user):
  try:
    if user.pfp:
      return user.pfp.url
    else:
      return None
  except AttributeError:
    return None


class UserInfoSerializer(serializers.ModelSerializer):
  
  followers_count = serializers.SerializerMethodField()
  following_count = serializers.SerializerMethodField()
  
  class Meta:
    model = CustomUser
    fields = (
      'id',
      'display_name',
      'pfp',
      'bio',
      'followers_count',
      'following_count')
      
  def get_followers_count(self,obj):
    return obj.followers.count()
    
  def get_following_count(self,obj):
    return obj.following.count()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
  
  @classmethod
  def get_token(cls,user):
    token = super().get_token(user)
    
    token['user_id'] = user.id
    token['profile_picture'] = get_user_profile(user)
    token['display_name'] = user.display_name
    
    return token