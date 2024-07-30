from rest_framework import serializers

from .models import Post
from user.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
  
  like_counts = serializers.SerializerMethodField()
  is_liked = serializers.SerializerMethodField()
  
  class Meta:
    model = Post
    fields = ('id','author','caption','image','like_counts','is_liked')
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