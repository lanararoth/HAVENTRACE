from django.db import models

# Create your models here.
from django.db import models

class Parent(models.Model):
    parent_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()
    email = models.EmailField(unique=True)
    child_name = models.CharField(max_length=100)

    def __str__(self):
        return self.parent_name