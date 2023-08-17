from django.shortcuts import render, get_object_or_404
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
        

def get_answer_detail_as_json(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    answer_data = {
        'id': answer.id,
        'question_id': answer.question.id,
        'content': answer.content,
    }
    return JsonResponse(answer_data)