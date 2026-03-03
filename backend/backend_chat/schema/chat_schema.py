
from django.db import models


class Chat(models.Model):
    user = models.ForeignKey(
        'backend_chat.User',   # app_name.ModelName
        related_name="items",  # keep property name "items"
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat {self.id}"