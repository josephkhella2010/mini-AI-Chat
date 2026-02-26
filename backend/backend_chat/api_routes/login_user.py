from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json
from backend_chat.auth.jwt import create_jwt
from ..models import User
from django.db.models import Q


@csrf_exempt

def login_user(req):
    if req.method !="POST":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    try:
        data=json.loads(req.body)
        required_fields=["username","password"]
        for field in required_fields:
            if not data[field]:
                return JsonResponse({"error":f"{field} is required"},status=400)
            Exist_user=User.objects.filter(( Q(username=data["username"]) | Q(email=data["username"]))).first()
            if not Exist_user:
                return JsonResponse({"error":"user is not Exist"},status=400)
            
            if not check_password(data["password"],Exist_user.password):
                return JsonResponse({"error":"password is not correct"},status=400)
            #create token
            token = create_jwt(Exist_user)
            user={
                "id": Exist_user.id,
                "username": Exist_user.username,
                "email": Exist_user.email,
                "firstname": Exist_user.firstname,
                "lastname": Exist_user.lastname,
                "dateOfBirth": Exist_user.dateOfBirth,
                "password":Exist_user.password,
                "items":[item.id for item in Exist_user.items.all()]
            }
            return JsonResponse({"msg":"user successfully login","user":user, "token": token},status=201)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)