from django.urls import path
from .get_users import get_users
from .register_user import register_user
urlpatterns = [
    path('users/', get_users),
    path('register-user/', register_user)
]