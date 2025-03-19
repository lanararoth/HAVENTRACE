from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('parent', 'Parent'),
        ('police', 'Police'),
    )
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

    REQUIRED_FIELDS = ['email', 'phone_number', 'user_type']
    USERNAME_FIELD = 'username'

    def str(self):
        return self.username