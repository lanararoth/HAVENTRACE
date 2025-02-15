from django.db import models

# Create your models here.
from django.db import models

class MissingCase(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    photo = models.ImageField(upload_to='missing_photos/')
    missing_date = models.DateField()
    last_seen_location = models.TextField()
    special_features = models.TextField(blank=True, null=True)
    parent_name = models.CharField(max_length=100)
    address = models.TextField()
    parent_phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name