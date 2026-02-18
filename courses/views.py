import json
import re

from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import HttpRequest, JsonResponse, HttpResponseBadRequest
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from courses.forms import CourseFormCreate, LoginForm, CourseFormEdit, LessonForm
from courses.models import Course, Lesson, User

"""--- Админ палнель ---"""

def admin_logout(request: HttpRequest):
    """Выход из админ панели"""
    logout(request)
    return redirect("admin_index")

def admin_login(request: HttpRequest):
    """Вход в админ панель"""
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]

            user = authenticate(request, username=email, password=password)

            if user and user.is_superuser:
                login(request, user)
                return redirect("admin_index")
            else:
                return render(request, "courses/login.html", {"form": form, "error": True})
    else:
        form = LoginForm()

    return render(request, "courses/login.html", {"form": form, "error": False})

@login_required(login_url="admin_login")
def course_edit(request: HttpRequest, course_id: int):
    """Редактирование курса"""
    course = get_object_or_404(Course, id=course_id)
    if request.method == "POST":
        form = CourseFormEdit(request.POST, request.FILES)
        if form.is_valid():
            course.name = form.cleaned_data["name"]
            course.description = form.cleaned_data["description"]
            course.hours = form.cleaned_data["hours"]
            course.price = form.cleaned_data["price"]
            course.start_date = form.cleaned_data["start_date"]
            course.end_date = form.cleaned_data["end_date"]
            img_file = form.cleaned_data["img"]

            if img_file:
                course.save_image(img_file)

            course.save()
    else:
        form = CourseFormEdit()

    return render(request, "courses/course-form-edit.html", {"course": course, "course_price": str(course.price).replace(",","."), "form": form})

@login_required(login_url="admin_login")
def course_create(request: HttpRequest):
    """Создание курса"""
    if request.method == "POST":
        form = CourseFormCreate(request.POST, request.FILES)

        if form.is_valid():
            course = Course.objects.create(
                name=form.cleaned_data["name"],
                description=form.cleaned_data["description"],
                hours=form.cleaned_data["hours"],
                price=form.cleaned_data["price"],
                start_date=form.cleaned_data["start_date"],
                end_date=form.cleaned_data["end_date"],
            )

            img_file = form.cleaned_data["img"]
            course.save_image(img_file)

    else:
        form = CourseFormCreate()

    return render(request, "courses/course-form-create.html", {"form": form})

@login_required(login_url="admin_login")
def course_delete(request: HttpRequest, course_id: int):
    """Удаление курса"""
    course = get_object_or_404(Course, id=course_id)

    course.delete()

    return redirect("admin_index")

@login_required(login_url="admin_login")
def courses_list(request: HttpRequest):
    """Список курсов"""
    courses_queryset = Course.objects.all()

    courses_pages = Paginator(courses_queryset, 5)
    page = request.GET.get("page", 1)
    courses = courses_pages.get_page(page)


    return render(request, "courses/courses-list.html", {"courses": courses, "total": courses_pages.page_range})

@login_required(login_url="admin_login")
def delete_lesson(request: HttpRequest, lesson_id: int):
    """Удаление урока"""
    lesson = get_object_or_404(Lesson, id=lesson_id)
    lesson.delete()
    return redirect("admin_lessons_list", course_id=lesson.course.id)

@login_required(login_url="admin_login")
def create_lesson(request: HttpRequest, course_id: int):
    """Созданеи урока"""
    course = get_object_or_404(Course, id=course_id)
    if request.method == "POST":
        form = LessonForm(request.POST)
        if form.is_valid():
            lesson = Lesson.objects.create(
                name=form.cleaned_data["title"],
                description=form.cleaned_data["content"],
                hours=form.cleaned_data["hours"],
                video = form.cleaned_data["video_link"],
                course_id = course_id,
            )
            lesson.save()
    else:
        form = LessonForm()

    return render(request, "courses/lesson-form-create.html", {"course":course, "form": form})

@login_required(login_url="admin_login")
def lessons_list(request: HttpRequest, course_id: int):
    """Список уроков"""
    course = get_object_or_404(Course, id=course_id)
    lessons = Lesson.objects.filter(course=course)

    lessons_list = []

    i = 1
    for lesson in lessons:
        lessons_list.append({"num":i,"lesson":lesson})
        i = i + 1

    return render(request,"courses/lessons-list.html", {"lessons": lessons_list,"lessons_length": len(lessons_list), "course": course})



"""--- Rest API ---"""


@csrf_exempt
def register(request: HttpRequest):
    """Регистрация"""
    if request.method == "POST":
        json_body = json.loads(request.body)

        email = json_body["email"]
        password = json_body["password"]

        validation_errors = {"email":[],"password":[]}

        if not password:
            validation_errors["password"].append("Password is required")

        if not re.match(r".{3,}", password):
            validation_errors["password"].append("Password must contain 3 symbols")

        if not re.match(r"[a-z]", password):
            validation_errors["password"].append("Password must contain lower case letters")

        if validation_errors["email"] or validation_errors["password"]:
            return JsonResponse({
                "message": "Invalid data",
                "errors": validation_errors,
            }, status=422)

        User.objects.create_user(username=email, email=email, password=password)

        return JsonResponse({"success": True})
    else:
        return HttpResponseBadRequest()


@csrf_exempt
def auth(request: HttpRequest):
    """Авторизация"""
    if request.method == "POST":
        json_body = json.loads(request.body)

        email = json_body["email"]
        password = json_body["password"]

        authenticated = authenticate(username=email, password=password)

        if authenticated:
            import jwt
            return JsonResponse({"token": jwt.encode({},settings.SECRET_KEY,algorithm="HS256")})
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseBadRequest()
