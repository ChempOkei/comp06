import re

from django import forms

class LoginForm(forms.Form):
    """Форма входа"""
    email = forms.EmailField(required=True)
    password = forms.CharField(required=True)

class CourseFormEdit(forms.Form):
    """Форма редакстирования курса"""
    name = forms.CharField(max_length=30, required=True)
    description = forms.CharField(max_length=100, required=False)
    hours = forms.IntegerField(min_value=1, max_value=10, required=True)
    price = forms.DecimalField(min_value=100, max_digits=10, decimal_places=2, required=True)
    start_date = forms.DateField(input_formats=["%d-%m-%Y"], required=True)
    end_date = forms.DateField(input_formats=["%d-%m-%Y"], required=True)
    img = forms.ImageField(required=False)

    def clean_price(self):
        """Валидация цены"""
        price = self.cleaned_data["price"]

        if not re.match(r"^\d+\.\d\d$", str(price)):
            raise forms.ValidationError("Неверный формат.")

        return price

    def clean_image(self):
        """Валидация обложки курса"""
        img = self.cleaned_data["img"]

        if img and img.size > 2 * 1000 * 1024:
            raise forms.ValidationError("Размер не должен превышать 2000 КБ.")

        if img and not img.name.lower().endswith((".jpeg", ".jpg")):
            raise forms.ValidationError("Не верный формат изображения.")

        return img

class CourseFormCreate(forms.Form):
    """Форма создания курса"""
    name = forms.CharField(max_length=30, required=True)
    description = forms.CharField(max_length=100, required=False)
    hours = forms.IntegerField(min_value=1, max_value=10, required=True)
    price = forms.DecimalField(min_value=100, max_digits=10, decimal_places=2, required=True)
    start_date = forms.DateField(input_formats=["%d-%m-%Y"], required=True)
    end_date = forms.DateField(input_formats=["%d-%m-%Y"], required=True)
    img = forms.ImageField(required=True)

    def clean_price(self):
        """Валидация цены"""
        price = self.cleaned_data["price"]

        if not re.match(r"^\d+\.\d\d$", str(price)):
            raise forms.ValidationError("Неверный формат.")

        return price

    def clean_image(self):
        """Валидация обложки курса"""
        img = self.cleaned_data["img"]

        if img.size > 2 * 1000 * 1024:
            raise forms.ValidationError("Размер не должен превышать 2000 КБ.")

        if not img.name.lower().endswith((".jpeg", ".jpg")):
            raise forms.ValidationError("Не верный формат изображения.")

        return img


class LessonForm(forms.Form):
    """Форма урока"""
    title = forms.CharField(max_length=50, required=True)
    content = forms.CharField(max_length=1000, required=True)
    video_link = forms.URLField(required=True)
    hours = forms.IntegerField(min_value=1, max_value=4, required=True)
