from rest_framework import serializers
from .models import Police

class PoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Police  # Ensure this matches your actual model
        fields = '__all__'  # OR provide a list/tuple like ('id', 'name', 'rank', 'station')