from django.shortcuts import render
from rest_framework.generics import CreateAPIView

from .serializers import UserSerializer
from .models import CustomUser

class UserCreationView(CreateAPIView):
  serializer_class = UserSerializer
  
