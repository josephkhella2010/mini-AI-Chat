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
        token_user.delete()

        update_user={
                        "id":token_user.id,
                        "username":token_user.username,
                        "email":token_user.email,
                        "firstname":token_user.firstname,
                        "lastname":token_user.lastname,
                        "dateOfBirth":token_user.dateOfBirth,
                        "password":token_user.password,
                         "items": [
                            {"id": it.id, "name": it.name}
                            for it in token_user.items.all()]},

        return JsonResponse({"msg":"User Successfully Deleted","user":update_user},status=200)
    except Exception as e:
        return JsonResponse({"error":str(e)},status=405)

