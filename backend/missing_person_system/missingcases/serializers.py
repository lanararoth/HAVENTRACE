from rest_framework import serializers
from .models import MissingCase

class MissingCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissingCase
        fields = '__all__'