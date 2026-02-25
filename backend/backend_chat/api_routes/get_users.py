from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

Users=[
    {
    "name":"jesus",
    "age":2026,
    "id":1
},
    {
    "name":"maria",
    "age":2040,
    "id":2
},
   {
    "name":"joseph",
    "age":2100,
    "id":3
},

]

@csrf_exempt
def get_users(req):
    if req.method !="GET":
        return JsonResponse({"error":"Method not Allowed"},status=405)
    
    try:
        formate_Users=list(map(lambda u:{"id":u["id"],"name":u["name"],"age":u["age"]},Users))
        return JsonResponse({"users":formate_Users},status=200)
    
    except Exception as e:
        return JsonResponse({"error":str(e)},status=500)


    