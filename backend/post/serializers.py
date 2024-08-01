from rest_framework import serializers

from .models import Post
from user.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
  
  like_counts = serializers.SerializerMethodField()
  is_liked = serializers.SerializerMethodField()
  author_profile = serializers.SerializerMethodField()
  author_name = serializers.SerializerMethodField()
  author_id = serializers.SerializerMethodField()
  
  class Meta:
    model = Post
    fields = ('id','author_name','author_id','author_profile','caption','image','like_counts','is_liked')
    extra_kwargs = {
      'author':{'read_only':True}
    }
  
  
  def get_is_liked(self,obj):
    request = self.context.get('request',None)
    if request and request.user.is_authenticated:
      return obj.likers.filter(id=request.user.id).exists()
    else:
      return None
      
  def get_like_counts(self,obj):
    return obj.likers.count()
  
  def get_author_profile(slef,obj):
    return obj.author.profile.picture.url
    
  def get_author_name(self,obj):
    return obj.author.profile.display_name
  
  def get_author_id(self,obj):
    return obj.author.id