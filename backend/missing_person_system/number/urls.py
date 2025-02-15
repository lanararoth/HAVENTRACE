from django.urls import path
from . import views

from django.urls import path
from .views import (
    AddEmergencyContact,
    UpdateEmergencyContact,
    ListEmergencyContacts,
    GetEmergencyContact,
    DeleteEmergencyContact
)

urlpatterns = [
    path('emergency-contacts/get/', ListEmergencyContacts.as_view(), name='list_emergency_contacts'),  # List all
    path('emergency-contacts/add/', AddEmergencyContact.as_view(), name='add_emergency_contact'),  # Add new
    path('emergency-contacts/get/<int:pk>/', GetEmergencyContact.as_view(), name='get_emergency_contact'),  # Get specific
    path('emergency-contacts/update/<int:pk>/', UpdateEmergencyContact.as_view(), name='update_emergency_contact'),  # Update
    path('emergency-contacts/delete/<int:pk>/', DeleteEmergencyContact.as_view(), name='delete_emergency_contact'),  # Delete
]