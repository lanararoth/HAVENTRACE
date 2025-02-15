from django.urls import path
from .views import AddMissingCase, UpdateMissingCase, GetMissingCase, DeleteMissingCase, NotifyPolice

urlpatterns = [
    path('add/', AddMissingCase.as_view(), name='add-missing-case'),  # Add a new missing case
    path('update/<int:pk>/', UpdateMissingCase.as_view(), name='update-missing-case'),  # Update a missing case
    path('get/', GetMissingCase.as_view(), name='get-all-missing-cases'),  # Get all missing cases
    path('get/<int:pk>/', GetMissingCase.as_view(), name='get-missing-case'),  # Get a single missing case by ID
    path('delete/<int:pk>/', DeleteMissingCase.as_view(), name='delete-missing-case'),  # Delete a missing case
    path('notify/<int:pk>/', NotifyPolice.as_view(), name='notify-police'),  # Notify police about a missing case
]
