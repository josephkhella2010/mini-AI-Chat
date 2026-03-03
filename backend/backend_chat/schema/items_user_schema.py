from django.db import models
from django.db import models


class Item(models.Model):
    chat = models.ForeignKey(
        'backend_chat.Chat',   # app_name.ModelName
        related_name="chatItems",
        on_delete=models.CASCADE
    )

    question = models.TextField()
    answer = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question

""" 
class Item(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        User,
        related_name="items",
        on_delete=models.CASCADE
    )
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.question """