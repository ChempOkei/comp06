"""
URL configuration for school project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from . import views

urlpatterns = [
    path("course-admin/create/", views.course_create, name="admin_create_course"),
    path("course-admin/delete/<int:course_id>/", views.course_delete, name="admin_delete_course"),
    path("course-admin/edit/<int:course_id>/", views.course_edit, name="admin_edit_course"),
    path("course-admin/<int:course_id>/lessons", views.lessons_list, name="admin_lessons_list"),
    path("course-admin/lessons/<int:lesson_id>/delete/", views.delete_lesson, name="admin_delete_lesson"),
    path("course-admin/<int:course_id>/lessons/create/", views.create_lesson, name="admin_create_lesson"),
    path("course-admin/", views.courses_list, name="admin_index"),
    path("course-admin/login/", views.admin_login, name="admin_login"),
    path("course-admin/logout/", views.admin_logout, name="admin_logout"),
    path("school-api/register", views.register, name="register"),
    path("school-api/auth/", views.auth, name="auth"),
]
