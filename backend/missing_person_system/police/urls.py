from django.urls import path
from .views import AddPolice, UpdatePolice, GetPolice, DeletePolice

urlpatterns = [
    path('add/', AddPolice.as_view(), name='add-police'),
    path('update/<int:pk>/', UpdatePolice.as_view(), name='update-police'),
    path('get/', GetPolice.as_view(), name='get-police'),
    path('get/<int:pk>/', GetPolice.as_view(), name='get-police-detail'),
    path('delete/<int:pk>/', DeletePolice.as_view(), name='delete-police'),
]