from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from ..models import User
from ..models import Item
from django.db.models import Q
from ..auth.jwt import decode_jwt


@csrf_exempt

def get_items_user(req,user_id):
    if req.method !="GET":
        return JsonResponse({"error":"Method is not Allowed"},status=500)
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
        user_items = Item.objects.filter(user_id=user_id)
        return JsonResponse({"msg":"Get All ","items":
                      list(map(lambda i:{"id": i.id,"question":i.question,"answer":i.answer}, user_items))},status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)


    