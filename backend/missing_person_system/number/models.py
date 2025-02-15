from django.db import models

# Create your models here.
from django.db import models

class EmergencyContact(models.Model):
    service_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.service_name}: {self.contact_number}"