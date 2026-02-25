from django.urls import path, include

urlpatterns = [
    path('', include('backend_chat.api_routes.url')),
]