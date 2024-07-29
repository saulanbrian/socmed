from django.shortcuts import render

from rest_framework.generics import ListCreateAPIView

from rest_framework.permissions import IsAuthenticated

from .serializers import PostSerializer

from .models import Post

class PostListCreateView(ListCreateAPIView):
  serializer_class = PostSerializer
  permission_classes = [IsAuthenticated]
  queryset = Post.objects.all()
  
  def perform_create(self,serializer):
    serializer.save(author=self.request.user)
    
