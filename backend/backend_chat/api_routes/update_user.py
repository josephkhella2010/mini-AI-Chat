from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from ..auth.jwt import decode_jwt
from django.contrib.auth.hashers import make_password

@csrf_exempt

def update_user(req,user_id):
    if not req.method=="PUT":
        return JsonResponse({"error":"Method Not Valid"},status=405)
    try:
        # get token and check if token valid
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
        data=json.loads(req.body)

       

            # 🔥 ADD THIS PART
        if User.objects.filter(username=data.get("username")).exclude(id=token_user.id).exists():
             return JsonResponse({"msg": "Username already exists"}, status=400)

        if User.objects.filter(email=data.get("email")).exclude(id=token_user.id).exists():
               return JsonResponse({"msg": "Email already exists"}, status=400)
        
        #store updates
        password = data.get("password")
        token_user.firstname = data.get("firstname")
        token_user.lastname = data.get("lastname")
        token_user.email = data.get("email")
        token_user.username = data.get("username")
        if password:
            hashed_password = make_password(password)
            token_user.password = hashed_password

        token_user.save()

        update_User={
            "id":token_user.id,
            "firstname":data.get("firstname"),
            "lastname":data.get("lastname"),
            "email":data.get("email"),
            "username":data.get("username"),
            "password": hashed_password,     
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

        return JsonResponse({"msg":"User Successfully Updated","user":update_User},status=201)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)


 