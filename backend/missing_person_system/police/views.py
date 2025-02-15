from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Police
from .serializers import PoliceSerializer

class AddPolice(APIView):
    def post(self, request):
        serializer = PoliceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdatePolice(APIView):
    def put(self, request, pk):
        try:
            police = Police.objects.get(pk=pk)
        except Police.DoesNotExist:
            return Response({'error': 'Police officer not found!'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PoliceSerializer(police, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetPolice(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                police = Police.objects.get(pk=pk)
                serializer = PoliceSerializer(police)
                return Response({'data': serializer.data})
            except Police.DoesNotExist:
                return Response({'error': 'Police officer not found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            police = Police.objects.all()
            serializer = PoliceSerializer(police, many=True)
            return Response({'data': serializer.data})

class DeletePolice(APIView):
    def delete(self, request, pk):
        try:
            police = Police.objects.get(pk=pk)
            police.delete()
            return Response()
        except Police.DoesNotExist:
            return Response({'error': 'Police officer not found!'}, status=status.HTTP_404_NOT_FOUND)