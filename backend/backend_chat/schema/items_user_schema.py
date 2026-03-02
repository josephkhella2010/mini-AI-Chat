from django.db import models
from .user_info_schema import User


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
        return self.question