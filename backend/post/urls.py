from django.urls import path

from . import views

urlpatterns = [
  path('',views.PostListCreateView.as_view()),
  path('like_unlike_post/<pk>',views.like_unlike_post),
  path('liked_posts',views.LikedPostListView.as_view()),
  path('<pk>/comments',views.PostCommentsListCreateView.as_view())
  ]