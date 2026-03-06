""" from django.shortcuts import render
from django.http import JsonResponse
from backend_chat.auth.jwt import jwt_required

# Create your views here.


@jwt_required
def protected_view(request):
    return JsonResponse({
        "message": "You are authenticated",
        "user": request.user.username
    }) """
from django.http import JsonResponse
import jwt
from django.conf import settings

JWT_SECRET = getattr(settings, "JWT_SECRET_KEY", settings.SECRET_KEY)
JWT_ALGORITHM = getattr(settings, "JWT_ALGORITHM", "HS256")


def protected_view(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return JsonResponse({"error": "Authorization header missing"}, status=401)

    try:
        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

        return JsonResponse({
            "message": "You are authenticated",
            "user": payload["username"]
        })

    except jwt.ExpiredSignatureError:
        return JsonResponse({"error": "Token expired"}, status=401)

    except jwt.InvalidTokenError:
        return JsonResponse({"error": "Invalid token"}, status=401)