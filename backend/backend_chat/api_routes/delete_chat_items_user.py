from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from ..models import Chat
from django.db.models import Q
from ..auth.jwt import decode_jwt

@csrf_exempt
def delete_chat_items_user(req,user_id,chat_id):
    if req.method !="DELETE":
        return JsonResponse({"error":"Method is not valid"},status=405)


    try:
         # 🔐 Authentication
        auth_header = req.headers.get("Authorization")

        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)

        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        token_user_id = payload.get("user_id")

        # 🔒 Authorization check
        if int(token_user_id) != int(user_id):
            return JsonResponse(
                {"error": "You are not allowed to add items for this user"},
                status=403
            )

        token_user = User.objects.filter(id=token_user_id).first()

        if not token_user:
            return JsonResponse({"error": "User not found"}, status=404)
            #  Find chat
        chat = Chat.objects.filter(id=chat_id, user=token_user).first()
        if not chat:
            return JsonResponse({"error": "Chat not found"}, status=404)

        chat.delete()
        user_items=[{
            "chatId":c.id,
            "chat_items":[{
                  "id": item.id,
                   "question": item.question,
                    "answer": item.answer

            }for item in c.chatItems.all()
                      
            ] 

        } for c in  token_user.items.all()
        ]  
        updated_user={
            "id": token_user.id,
            "firstname": token_user.firstname,
            "lastname": token_user.lastname,
            "email": token_user.email,
            "username": token_user.username,
            "password":token_user.password,
            "items": user_items

        }
        return JsonResponse({"msg":"successfully deleted","user":updated_user,"items":user_items},status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)