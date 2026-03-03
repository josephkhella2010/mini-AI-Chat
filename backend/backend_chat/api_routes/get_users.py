from django.shortcuts import render
from django.http import JsonResponse
from ..models import User
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_users(req):
    if req.method !="GET":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    
    try:
        usersdb=User.objects.all()
        users=list(map(lambda u:{"id":u.id,
                                 "username":u.username,
                                 "email":u.email
                                 ,"firstname":u.firstname,
                                 "lastname":u.lastname,
                                 "dateOfBirth":u.dateOfBirth,
                                 "password":u.password,
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
                                                       for chat in usersdb.items.all()
                                                   ]


                                 },usersdb))
        return JsonResponse({"users":users},status=200)
    
    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)


    