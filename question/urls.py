from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.question_home, name='question_home'),
    path('createQuestion/', views.create_question, name="create_question")
]