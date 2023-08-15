from django.db import models

# Create your models here.
class question(models.Model):
    question_title = models.CharField(max_length = 50)
    question_pub_date = models.DateTimeField("published date")
    question_body = models.TextField()

    def __str__(self):
        return self.question_title