from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    pages = models.IntegerField()
    cover_image = models.URLField()
    language = models.CharField(max_length=30)

    def __str__(self):
        return self.title
# models.py



class IssuedBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='issued_book_entries')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    issued_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} issued {self.book.title}"

