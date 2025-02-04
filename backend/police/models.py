from django.db import models

# Create your models here.
class Police(models.Model):
    police_name = models.CharField(max_length=100)
    badge_number = models.CharField(max_length=20, unique=True)
    contact_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    station_address = models.TextField()

    def _str_(self):
        return self.police_name