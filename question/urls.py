from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('questions/', views.questions_as_json, name='get-question'),
    path('questions/<int:question_id>/', views.get_question_detail_as_json, name='get_question_detail_as_json'),
]