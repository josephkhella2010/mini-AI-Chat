from django.http import JsonResponse
from functools import wraps
from .jwt import decode_jwt
from backend_chat.models import User


def jwt_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return JsonResponse({"error": "Authorization header missing"}, status=401)

        try:
            token = auth_header.split(" ")[1]  # Bearer <token>
        except IndexError:
            return JsonResponse({"error": "Invalid token format"}, status=401)

        payload,error = decode_jwt(token)

        if not payload:
            return JsonResponse({"error": "Invalid or expired token"}, status=401)
        if error:
             return JsonResponse({"error": error}, status=401)

        try:
            user = User.objects.get(id=payload["user_id"])
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

        request.user = user

        return view_func(request, *args, **kwargs)

    return wrapper