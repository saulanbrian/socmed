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
      'like_counts'
      )
    
  def get_author_id(self,obj):
    return obj.author.id
    
  def get_author_name(self,obj):
    return obj.author.profile.display_name
    
  def get_author_profile(self,obj):
    return  obj.author.profile.picture.url
  
  def get_like_counts(self,obj):
    return obj.likers.count()