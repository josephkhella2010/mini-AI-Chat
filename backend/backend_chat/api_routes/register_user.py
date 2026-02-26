from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
import json
from ..models import User
from django.db.models import Q


@csrf_exempt
def register_user(req):
    if req.method != "POST":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    try:
        data = json.loads(req.body)
        required_fields=["username","email","password", "repassword" ,"firstname","lastname","dateOfBirth"]
        for field in required_fields:
            if  not data[field]:
                return JsonResponse({"error":f"{field}is required"},status=400)
        
        if data["password"] != data["repassword"]:
                        return JsonResponse({"error":"password is not matches"},status=400)
        exist_user = User.objects.filter(Q(username=data["username"]) | Q(email=data["email"])).first()

        if exist_user:
            return JsonResponse({"error":"Username or Email already exists"},status=400)
        
        hashed_password = make_password(data["password"])

        created_user=User.objects.create(
            username=data["username"],
            email=data["email"],
            password=hashed_password,
            firstname=data["firstname"],
            lastname=data["lastname"],
            dateOfBirth=data["dateOfBirth"],
        )
        created_user.items.set([])  
        created_user.save()

        user={
              
              "id": created_user.id,
              "username": created_user.username,
              "email": created_user.email,
              "firstname": created_user.firstname,
              "lastname": created_user.lastname,
              "dateOfBirth": created_user.dateOfBirth,
              "password":created_user.password,
              "items":[]
        }
        return JsonResponse({"msg":"user Created Successfully","user":user},status=201)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)