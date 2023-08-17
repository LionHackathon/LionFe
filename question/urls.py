from django.contrib import admin
from django.urls import path
from . import views
from .views import SaveQuestion


urlpatterns = [
    path('save-question/', SaveQuestion.as_view(), name='save-question'),
    path('get-question/', views.get_questions_as_json, name='get-question'),
    path('<int:question_id>/', views.question_detail, name='question_detail'),


]