from django.urls import path
from .get_users import get_users
from .register_user import register_user
from .login_user import login_user
from .delete_user import  delete_user
urlpatterns = [
    path('users/', get_users),
    path('register-user', register_user),
    path('login-user', login_user), 
    path('delete-user/userId=<int:user_id>', delete_user),    
]