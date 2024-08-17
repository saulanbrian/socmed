from rest_framework import serializers

from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  
  author_name = serializers.SerializerMethodField()
  author_id = serializers.SerializerMethodField()
  author_profile = serializers.SerializerMethodField()
  like_counts = serializers.SerializerMethodField()
  
  
  class Meta:
    model = Comment
    fields = (
      'id',
      'author_id',
      'author_name',
      'author_profile',
      'text',
      'image',
      'like_counts'
      )
    extra_kwargs = {
      'author_id':{'read_only':True},
      'author_name':{'read_only':True},
      'author_profile':{'read_only':True},
      'like_counts':{'read_only':True},
    }
    
  def get_author_id(self,obj):
    return obj.author.id
    
  def get_author_name(self,obj):
    return obj.author.display_name
    
  def get_author_profile(self,obj):
    try:
      return obj.author.pfp.url
    except ValueError:
      return None
  
  def get_like_counts(self,obj):
    return obj.likers.count()