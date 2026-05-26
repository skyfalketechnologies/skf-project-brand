from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('project_manager', 'Project Manager'),
        ('developer', 'Developer'),
        ('client', 'Client'),
        ('viewer', 'Viewer'),
        ('user', 'User'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username
