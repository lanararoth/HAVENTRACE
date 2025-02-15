"""
URL configuration for missing_person_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/missingcases/', include('missingcases.urls')),
    path('api/parents/', include('parent.urls')),  # Include the Parent API URLs
    path('api/police/',include('police.urls')),
    path('api/', include('number.urls')),
    path('api/auth/', include('registration.urls')),
    ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
