from django.urls import path
from .get_users import get_users
urlpatterns = [
    path('users/', get_users),
]