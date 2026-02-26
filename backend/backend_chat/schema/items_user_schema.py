from django.db import models
from .user_info_schema import User


class Item(models.Model):
    user = models.ForeignKey(
        User,
        related_name="items",
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text