from django.urls import path
from .get_users import get_users
from .register_user import register_user
from .login_user import login_user
from .delete_user import  delete_user
from .update_user import update_user
from .add_item_to_chat import add_item_to_chat
from .add_chat_to_user import add_chat_to_user
from .get_user_chat_items import get_user_chat_items
from .delete_chat_items_user import delete_chat_items_user
urlpatterns = [
    path('users/', get_users),
    path('register-user', register_user),
    path('login-user', login_user), 
    path('delete-user/userId=<int:user_id>', delete_user),
    path("update-user/userId=<int:user_id>", update_user),
    path("add-chat/userId=<int:user_id>",  add_chat_to_user ) , 
    path("get-user-chats/userId=<int:user_id>",  get_user_chat_items ) , 
    path("add-chat-item/userId=<int:user_id>/chatId=<int:chat_id>",add_item_to_chat ) , 
    path("delete-chat-item/userId=<int:user_id>/chatId=<int:chat_id>",delete_chat_items_user),

]