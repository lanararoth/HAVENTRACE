from django.db import models

# Create your models here.
class Police(models.Model):
    station_name = models.CharField(max_length=100)
    station_address = models.TextField()

    def _str_(self):
        return self.police_name