from django.db import models

# Create your models here.
class book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    published_date = models.DateField()
    pages = models.IntegerField()
    cover_image = models.URLField()
    language = models.CharField(max_length=30)

    def __str__(self):
        return self.title

class IssuedBook(models.Model):
    user = models.ForeignKey(on_delete=models.CASCADE)
    book = models.ForeignKey( on_delete=models.CASCADE)
    issue_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    issued_books = models.ManyToManyField(IssuedBook, blank=True)

    def __str__(self):
        return self.username