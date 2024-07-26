from django.urls import path

from . import views 

urlpatterns = [
  path('',views.ProfileView.as_view()),
  path('create',views.ProfileCreationView.as_view()),
  path('<pk>',views.ProfileRetrieveView.as_view()),
  ]