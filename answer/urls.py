from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('<int:question_id>/add_answer/', views.add_answer, name='add_answer'),
    path('<int:answer_id>/', views.get_answer_detail_as_json, name='get_answer_detail_as_json'),
]