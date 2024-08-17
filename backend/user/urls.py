from django.urls import path
from . import views

urlpatterns = [
  path('signup/', views.UserCreationView.as_view()),
  path('<pk>',views.UserInfoRetrieveView.as_view()),
  path('<user_id>/posts',views.UserPostsListView.as_view())
  ]