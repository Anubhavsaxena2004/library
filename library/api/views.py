from rest_framework import viewsets, generics, permissions
from .models import Book, IssuedBook
from .serializers import BookSerializer, IssuedBookSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework import filters
from rest_framework.views import APIView

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author']

from rest_framework import status
from rest_framework.response import Response
from django.db import IntegrityError

class IssuedBookViewSet(viewsets.ModelViewSet):
    queryset = IssuedBook.objects.all()
    serializer_class = IssuedBookSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            # Normal process
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except IntegrityError:
            # Agar foreign key error aaye toh
            return Response(
                {
                    "error": "Database error",
                    "details": "User ya book sahi se select karein"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer  # You already have this serializer
    permission_classes = [permissions.IsAuthenticated]  # Optional: restrict access

    def get_permissions(self):
        # Allow registration (POST) without authentication
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()
