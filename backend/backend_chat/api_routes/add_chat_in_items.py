from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from ..models import Chat
from django.db.models import Q
from ..auth.jwt import decode_jwt

@csrf_exempt

def add_chat_in_items(req,user_id):
    if req.method !="POST":
        return JsonResponse({"error":"methods is not Valid"},status=500)
    try:
        auth_header=req.headers.get("Authorization")
        if not auth_header:
            return JsonResponse({"msg":"Please Login first"},status=401)
        token =auth_header.split(" ")[1]
        payload=decode_jwt(token)
        if not payload:
            return JsonResponse({"msg":"Token is not valid"},status=401)
        token_user_id=payload.get("user_id")
        token_user=User.objects.filter(id =token_user_id).first()

        if  not token_user:
            return JsonResponse({"msg":"User is not found"},status=404)
         # 🔒 Only allow self-delete
        if token_user.id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)
        # 🔥 add item

        # ✅ CREATE NEW CHAT (THIS IS THE IMPORTANT PART)
        new_chat = Chat.objects.create(user=token_user)

        # 🔄 Return updated items
        user_data = {
            "id": token_user.id,
            "username": token_user.username,
            "email": token_user.email,
            "firstname": token_user.firstname,
            "lastname": token_user.lastname,
            "dateOfBirth": token_user.dateOfBirth,
            "items": [
                {
                    "chatId": chat.id,
                    "chatItems": []  # empty because no messages yet
                }
                for chat in token_user.items.all()
            ]
        }
    
        return JsonResponse(
            {"msg": "chat items is created successfully", "user": user_data,"newChat":new_chat},
            status=200
        )
        
        

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)

