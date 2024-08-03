from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import get_object_or_404

from rest_framework.generics import ListCreateAPIView, ListAPIView

from rest_framework.permissions import IsAuthenticated

from .serializers import PostSerializer

from comment.serializers import CommentSerializer
from comment.pagination import CommentPagination

from .models import Post



class PostListCreateView(ListCreateAPIView):
  serializer_class = PostSerializer
  permission_classes = [IsAuthenticated]
  queryset = Post.objects.all()
  parser_classes = [MultiPartParser,FormParser]
  
  def perform_create(self,serializer):
    serializer.save(author=self.request.user)
    
    
class PostCommentsListCreateView(ListCreateAPIView):
  serializer_class = CommentSerializer
  pagination_class = CommentPagination
  
  def get_queryset(self):
    post_id = self.kwargs.get('pk')
    post = get_object_or_404(Post,pk=post_id)
    return post.comments.all()
    
  def perform_create(self,serializer):
    serializer.save(author=self.request.user)
    

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
  
  