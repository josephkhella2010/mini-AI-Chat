from django.shortcuts import render
from django.http import JsonResponse
from backend_chat.auth.decorators import jwt_required

# Create your views here.


@jwt_required
def protected_view(request):
    return JsonResponse({
        "message": "You are authenticated",
        "user": request.user.username
    })