from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from .models import Parent
from .serializers import ParentSerializer

# 1. Add Parent
class AddParent(APIView):
    def post(self, request):
        serializer = ParentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 2. Update Parent
class UpdateParent(APIView):
    def put(self, request, pk):
        try:
            parent = Parent.objects.get(pk=pk)
        except Parent.DoesNotExist:
            return Response({'error': 'Parent not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ParentSerializer(parent, data=request.data, partial=True)  # partial=True allows partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 3. List Parents
class ListParents(APIView):
    def get(self, request):
        parents = Parent.objects.all()
        serializer = ParentSerializer(parents, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 4. Get Specific Parent Data
class GetParent(APIView):
    def get(self, request, pk):
        try:
            parent = Parent.objects.get(pk=pk)
        except Parent.DoesNotExist:
            return Response({'error': 'Parent not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ParentSerializer(parent)
        return Response(serializer.data, status=status.HTTP_200_OK)

# 5. Delete Parent
class DeleteParent(APIView):
    def delete(self, request, pk):
        try:
            parent = Parent.objects.get(pk=pk)
        except Parent.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        parent.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
