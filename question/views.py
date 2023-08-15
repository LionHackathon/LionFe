from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Question
from .form import QuestionForm

# Create your views here.

def question_home(request):
    question_object = Question.objects
    return render(request, 'questionHome.html', {"questions": question_object})


def create_question(request):
    #데이터가 사용자가 입력 -> POST로 데이터 생성
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            question_post = form.save(commit=False)
            question_post.question_pub_date = timezone.now()
            question_post.save()
            return redirect('question_home')
    #사용자가 입력하지 않은 상태로 글쓰기 누르면 -> GET으로 페이지 띄워주기
    else:
        form = QuestionForm()
        return render(request, 'createQuestion.html', {'form': form})