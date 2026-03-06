""" from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import User
from ..auth.jwt import decode_jwt


@csrf_exempt
def delete_user(req,user_id):
    if req.method !="DELETE":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    try:
        # 🔐 Authentication
        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # assign token user ID first
        token_user_id = payload.get("user_id")

        # 🔒 Authorization check
        if token_user_id != user_id:
            return JsonResponse({"error": "You are not allowed to add items for this user"}, status=403)
        token_user_id=payload.get("user_id")
        token_user=User.objects.filter(id =token_user_id).first()

        if  not token_user:
            return JsonResponse({"msg":"User is not found"},status=404)
         # 🔒 Only allow self-delete
        if token_user.id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)
        # 🔥 Force evaluation BEFORE delete
        items_list = list(token_user.items.all())
        update_user={"id": token_user.id,
                      "username": token_user.username,
                       "email": token_user.email,
                       "firstname": token_user.firstname,
                       "lastname": token_user.lastname,
                       "dateOfBirth": token_user.dateOfBirth,
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
        token_user.delete()

        return JsonResponse({"msg":"User Successfully Deleted","user":update_user},status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=405)

 """
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import User
from ..auth.jwt import decode_jwt


@csrf_exempt
def delete_user(req,user_id):
    if req.method !="DELETE":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    try:
        # 🔐 Authentication
        auth_header = req.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JsonResponse({"error": "Authorization token required"}, status=401)

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)

        # assign token user ID first
        token_user_id = payload.get("user_id")

        # 🔒 Authorization check
        if int(token_user_id) != int(user_id):
            return JsonResponse({"error": "You are not allowed to add items for this user"}, status=403)

        token_user_id = payload.get("user_id")
        token_user = User.objects.filter(id=token_user_id).first()

        if not token_user:
            return JsonResponse({"msg":"User is not found"},status=404)

        # 🔒 Only allow self-delete
        if token_user.id != int(user_id):
            return JsonResponse({"error": "Permission denied"}, status=403)

        # 🔥 Force evaluation BEFORE delete
        items_list = list(token_user.items.all())

        update_user={
            "id": token_user.id,
            "username": token_user.username,
            "email": token_user.email,
            "firstname": token_user.firstname,
            "lastname": token_user.lastname,
            "dateOfBirth": token_user.dateOfBirth,
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

        token_user.delete()

        return JsonResponse({"msg":"User Successfully Deleted","user":update_user},status=200)

    except Exception as e:
        return JsonResponse({"error":str(e)},status=405)