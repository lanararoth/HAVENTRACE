from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EmergencyContact
from .serializers import EmergencyContactSerializer

# 1. Add Emergency Contact
class AddEmergencyContact(APIView):
    def post(self, request):
        serializer = EmergencyContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 2. Update Emergency Contact
class UpdateEmergencyContact(APIView):
    def put(self, request, pk):
        try:
            contact = EmergencyContact.objects.get(pk=pk)
        except EmergencyContact.DoesNotExist:
            return Response({'error': 'Emergency contact not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmergencyContactSerializer(contact, data=request.data, partial=True)  # partial=True for partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 3. List All Emergency Contacts
class ListEmergencyContacts(APIView):
    def get(self, request):
        contacts = EmergencyContact.objects.all()
        serializer = EmergencyContactSerializer(contacts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 4. Get Specific Emergency Contact
class GetEmergencyContact(APIView):
    def get(self, request, pk):
        try:
            contact = EmergencyContact.objects.get(pk=pk)
        except EmergencyContact.DoesNotExist:
            return Response({'error': 'Emergency contact not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmergencyContactSerializer(contact)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 5. Delete Emergency Contact
class DeleteEmergencyContact(APIView):
    def delete(self, request, pk):
        try:
            contact = EmergencyContact.objects.get(pk=pk)
        except EmergencyContact.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

