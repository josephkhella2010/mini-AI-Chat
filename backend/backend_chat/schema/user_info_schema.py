from django.db import models


class User(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    firstname = models.CharField(max_length=150)
    lastname = models.CharField(max_length=150)
    dateOfBirth = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username

    def to_schema(self):
        return {
            "userInfo": {
                "id": self.id,
                "username": self.username,
                "email": self.email,
                "first_name": self.firstname,
                "last_name": self.lastname,
                "date_of_birth": self.dateOfBirth,
            },
            "items": [
                {
                    "id": item.id,
                    "question": item.question,
                    "answer":item.answer
                }
                for item in self.items.all()
            ]
        }