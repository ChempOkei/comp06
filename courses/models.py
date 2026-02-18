import os
import secrets

from PIL import Image
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Модель пользователя"""
    username = models.EmailField(unique=True)

class Course(models.Model):
    """Модель курса"""
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=100)
    hours = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    image = models.CharField(max_length=256)

    def save_image(self, file):
        """Сохранение миниатюры"""
        static_dir = "static"
        if not os.path.exists(static_dir):
            os.makedirs(static_dir)

        filename = f"mpic_{secrets.token_hex(6)}.jpeg"

        path = os.path.join(settings.BASE_DIR, static_dir, filename)

        img = Image.open(file)

        img.thumbnail((300, 300))
        min_side = min(img.width, img.height)
        img = img.crop((
            (img.width - min_side) // 2,
            (img.height - min_side) // 2,
            (img.width + min_side) // 2,
            (img.height + min_side) // 2,
        ))

        img = img.resize((300, 300))

        img.save(path, "JPEG")

        self.image = f"/static/{filename}"
        self.save()

        return self.image


class Lesson(models.Model):
    """Модель урока"""
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    hours = models.PositiveIntegerField()
    video = models.URLField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)


class Order(models.Model):
    """Модель записи"""
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

