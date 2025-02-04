from django.urls import path
from .views import AddMissingCase, UpdateMissingCase, GetMissingCase, DeleteMissingCase

urlpatterns = [
    path('add/', AddMissingCase.as_view(), name='add-missing-case'),
    path('update/<int:pk>/', UpdateMissingCase.as_view(), name='update-missing-case'),
    path('get/', GetMissingCase.as_view(), name='get-all-missing-cases'),
    path('get/<int:pk>/', GetMissingCase.as_view(), name='get-missing-case'),
    path('delete/<int:pk>/', DeleteMissingCase.as_view(), name='delete-missing-case'),
]