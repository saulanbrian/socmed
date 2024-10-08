from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied

from django.shortcuts import get_object_or_404

from rest_framework.generics import ListCreateAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated

from .serializers import PostSerializer

from comment.serializers import CommentSerializer
from comment.pagination import CommentPagination

from .models import Post
from .pagination import PostPagination


class PostListCreateView(ListCreateAPIView):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  parser_classes = [MultiPartParser,FormParser]
  pagination_class = PostPagination
  
  def perform_create(self,serializer):
    if not self.request.user.is_authenticated:
      raise PermissionDenied('login first before creating a post')
    serializer.save(author=self.request.user)
    
    
class PostCommentsListCreateView(ListCreateAPIView):
  serializer_class = CommentSerializer
  pagination_class = CommentPagination
  parser_classes = [MultiPartParser,FormParser]
  
  def get_queryset(self):
    post_id = self.kwargs.get('pk',None)
    post = get_object_or_404(Post.objects.prefetch_related('comments'),pk=post_id)
    return post.comments.all()
    
  def perform_create(self,serializer):
    post_id = self.kwargs.get('pk',None)
    post = get_object_or_404(Post,pk=post_id)
    serializer.save(author=self.request.user,post=post)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_unlike_post(request,pk):
  post = get_object_or_404(Post,pk=pk)
    
  if request.user in post.likers.all():
    post.likers.remove(request.user)
  else:
    post.likers.add(request.user)
  
  serializer = PostSerializer(post,context={
    'request':request
  })
  return Response(data=serializer.data,status=status.HTTP_200_OK)
  

class LikedPostListView(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = PostSerializer
  
  def get_queryset(self):
    user = self.request.user.id
    return Post.objects.filter(likers__id=user)
  
  