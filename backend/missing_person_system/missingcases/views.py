from django.shortcuts import get_object_or_404, render
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update Missing Case
class UpdateMissingCase(APIView):
    def put(self, request, pk):
        missing_case = get_object_or_404(MissingCase, pk=pk)
        serializer = MissingCaseSerializer(missing_case, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Get Missing Case
class GetMissingCase(APIView):
    def get(self, request, pk=None):
        if pk:
            missing_case = get_object_or_404(MissingCase, pk=pk)
            serializer = MissingCaseSerializer(missing_case)
            return Response(serializer.data, status=status.HTTP_200_OK)
        missing_cases = MissingCase.objects.all()
        serializer = MissingCaseSerializer(missing_cases, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Delete Missing Case
class DeleteMissingCase(APIView):
    def delete(self, request, pk):
        missing_case = get_object_or_404(MissingCase, pk=pk)
        missing_case.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Notify Police (New API Endpoint)
class NotifyPolice(APIView):
    def post(self, request, pk):
        missing_case = get_object_or_404(MissingCase, pk=pk)
        
        # Simulate notifying the police (You can replace this with email/SMS functionality)
        notification_message = f"Police notified about {missing_case.name} (ID: {pk})"

        return Response({"message": notification_message}, status=status.HTTP_200_OK)
