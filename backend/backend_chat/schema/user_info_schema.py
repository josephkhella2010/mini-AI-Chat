from django.db import models


class UserInfo(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username

    def to_schema(self):
        return {
            "userInfo": {
                "id": self.id,
                "username": self.username,
                "email": self.email,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "date_of_birth": self.date_of_birth,
            },
            "items": [
                {
                    "id": item.id,
                    "text": item.text
                }
                for item in self.items.all()
            ]
        }