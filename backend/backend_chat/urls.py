from django.urls import path, include
from .views import protected_view
urlpatterns = [
    path('', include('backend_chat.api_routes.urls')),
    path("protected/", protected_view),
]