from django.http import JsonResponse
from django.views import View
from .models import Question
import json
from datetime import datetime
from django.shortcuts import get_object_or_404, render
from answer.models import Answer



class SaveQuestion(View):
    def post(self, request, *args, **kwargs):
        try:
            json_data = json.loads(request.body)
            title = json_data.get("question_title")
            pub_date = json_data.get("question_pub_date")
            content = json_data.get("question_content")

            if title and pub_date and content:
                question = Question(title=title, pub_date=datetime.strptime(pub_date, '%Y-%m-%d'), content=content)
                question.save()
                return JsonResponse({"message": "Question saved successfully."})
            else:
                return JsonResponse({"message": "Failed to save question."}, status=400)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)
        

def get_questions_as_json(request):
    questions = Question.objects.all()
    questions_json = [
        {
            'id': question.id,
            'title': question.question_title,
            'content': question.question_content,
            'pub_date': question.question_pub_date.strftime('%Y-%m-%d %H:%M:%S')
        }
        for question in questions
    ]
    return JsonResponse({'questions': questions_json})

def get_question_detail_as_json(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    question_data = {
        'id': question.id,
        'title': question.question_title,
        'content': question.question_content,
        'pub_date': question.question_pub_date.strftime('%Y-%m-%d %H:%M:%S'),  # 날짜 포맷 지정
    }
    return JsonResponse(question_data)