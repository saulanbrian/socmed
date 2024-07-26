from django.shortcuts import render

from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .serializers import ProfileSerializer

from .models import Profile


class ProfileView(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self,request):
    user_id = self.request.user.id
    profile = Profile.objects.get(user__pk=user_id)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data,status=status.HTTP_200_OK)


class ProfileCreationView(CreateAPIView):
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

  def perform_create(self,serializer):
    serializer.save(user=self.request.user)
    

class ProfileRetrieveView(RetrieveAPIView):
  serializer_class = ProfileSerializer
  
