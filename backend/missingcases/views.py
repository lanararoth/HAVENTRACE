from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MissingCase
from .serializers import MissingCaseSerializer

# Add Missing Case
class AddMissingCase(APIView):
    def post(self, request):
        serializer = MissingCaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Missing case reported successfully."},serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Missing Case
class UpdateMissingCase(APIView):
    def put(self, request, pk):
        try:
            missing_case = MissingCase.objects.get(pk=pk)
        except MissingCase.DoesNotExist:
            return Response({'error': 'Missing case not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MissingCaseSerializer(missing_case, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Missing case updated successfully."},serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get Missing Case
class GetMissingCase(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                missing_case = MissingCase.objects.get(pk=pk)
                serializer = MissingCaseSerializer(missing_case)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except MissingCase.DoesNotExist:
                return Response({'error': 'Missing case not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            missing_cases = MissingCase.objects.all()
            serializer = MissingCaseSerializer(missing_cases, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

# Delete Missing Case
class DeleteMissingCase(APIView):
    def delete(self, request, pk):
        try:
            missing_case = MissingCase.objects.get(pk=pk)
            missing_case.delete()
            return Response({'message': 'Missing case deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except MissingCase.DoesNotExist:
            return Response({'error': 'Missing case not found'}, status=status.HTTP_404_NOT_FOUND)