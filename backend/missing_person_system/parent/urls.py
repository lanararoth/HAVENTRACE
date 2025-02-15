from django.urls import path
from .views import AddParent, UpdateParent, ListParents, GetParent, DeleteParent

urlpatterns = [
    path('get/', ListParents.as_view(), name='list_parents'),  # Get all parents
    path('add/', AddParent.as_view(), name='add_parent'),  # Add new parent
    path('get/<int:pk>/', GetParent.as_view(), name='get_parent'),  # Get specific parent
    path('update/<int:pk>/', UpdateParent.as_view(), name='update_parent'),  # Update specific parent
    path('delete/<int:pk>/', DeleteParent.as_view(), name='delete_parent'),  # Delete specific parent
]