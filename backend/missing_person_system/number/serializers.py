from rest_framework import serializers
from .models import EmergencyContact

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ['id', 'service_name', 'contact_number']
