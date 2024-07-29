from rest_framework import serializers

from .models import Post

class PostSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Post
    fields = ('id','author','caption')
    extra_kwargs = {
      'author':{'read_only':True}
    }