from django.shortcuts import render
from django.http import JsonResponse
from question.models import Question
from .models import Answer
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def add_answer(request, question_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            question = Question.objects.get(pk=question_id)
            content = data.get('content')
            if content:
                answer = Answer(question=question, content=content)
                answer.save()
                return JsonResponse({"message": "Answer added successfully."})
            else:
                return JsonResponse({"message": "Failed to add answer."}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)