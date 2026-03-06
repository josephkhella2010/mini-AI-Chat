from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from ..models import Chat
from django.db.models import Q
from ..auth.jwt import decode_jwt


@csrf_exempt
def get_user_chat_items(req, user_id):

    if req.method != "GET":
        return JsonResponse({"error": "Method Is Not Allowed"}, status=405)

    try:
        auth_header = req.headers.get("Authorization")

        if not auth_header:
            return JsonResponse({"msg": "Please Login first"}, status=401)

        # safer token parsing
        parts = auth_header.split(" ")
        if len(parts) != 2:
            return JsonResponse({"msg": "Invalid Authorization header"}, status=401)
        token = parts[1]

        payload, error = decode_jwt(token)

        if error:
              return JsonResponse({"msg": error}, status=401)
 
        if not payload:
          return JsonResponse({"msg": "Token is not valid"}, status=401)

        token_user_id = payload.get("user_id")

        token_user = User.objects.filter(id=token_user_id).first()

        if not token_user:
            return JsonResponse({"msg": "User is not found"}, status=404)

        # permission check
        if token_user.id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)

        # Build structured data
        user_data = {
            "id": token_user.id,
            "firstname": token_user.firstname,
            "lastname": token_user.lastname,
            "email": token_user.email,
            "username": token_user.username,
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

        items_data = [
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

        return JsonResponse({
            "msg": "data successfully retrieved",
            "user": user_data,
            "items": items_data
        }, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)