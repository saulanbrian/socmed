from django.shortcuts import render
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView

from .serializers import UserAuthSerializer, UserInfoSerializer
from .models import CustomUser as User
from post.models import Post
from post.serializers import PostSerializer
from post.pagination import PostPagination


class UserCreationView(CreateAPIView):
  serializer_class = UserAuthSerializer
  
  
class UserInfoRetrieveView(RetrieveAPIView):
  serializer_class = UserInfoSerializer
  queryset = User.objects.all()
  

class UserPostsListView(ListAPIView):
  serializer_class = PostSerializer
  pagination_class = PostPagination
  
  def get_queryset(self):
    user_id = self.kwargs.get('user_id',None)
    return Post.objects.filter(author__id=user_id)