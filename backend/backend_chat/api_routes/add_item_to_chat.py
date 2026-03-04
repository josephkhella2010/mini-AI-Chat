from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User,Item,Chat
from django.db.models import Q
from ..auth.jwt import decode_jwt
from .open_ai import generate_answer

@csrf_exempt

def add_item_to_chat(req,user_id,chat_id):
    if req.method !="POST":
        return JsonResponse({"error":"Method is not Allowed"},status=405)
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

        data=json.loads(req.body)
        question = data["question"]
        ai_answer = generate_answer(question)
        chat = Chat.objects.filter(id=chat_id, user=token_user).first()
        if not chat:
           return JsonResponse({"error": "Chat not found"}, status=404)

        createdItem=Item.objects.create(
               chat=chat,  # 🔥 VERY IMPORTANT
               question=question,
               answer=ai_answer
        )
        updated_chat = {
                "chatId": chat.id,
                "chatItems": [
                    {
                        "id": item.id,
                                                "question": item.question,
                        "answer": item.answer
                    }
                    for item in chat.chatItems.all()
                   ]
                      }

        user={
            "id":token_user.id,
            "firstname":token_user.firstname,
            "lastname":token_user.lastname,
            "email":token_user.email,
            "username":token_user.username,
            "password":token_user.password,
             "items": [
                        {
                           "chatId": chat.id,
                           "chatItems": [
                              {
                                   "id": item.id,
                                   "question": item.question,
                                   "answer": item.answer
                               }
                               for item in chat.chatItems.all()
                           ]
                       }
                       for chat in token_user.items.all()
                    ]  
        }

        return JsonResponse({"msg": "successfully added item", "user": user,
                             "new-item":updated_chat},status=200)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)
