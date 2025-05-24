from rest_framework import serializers
from django.contrib.auth.models import User  

from .models import Book, IssuedBook  # <-- YOUR custom User model

# Correct serializer for Book model
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

# Correct serializer for IssuedBook model
class IssuedBookSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username',  # Username dikhayega
        queryset=User.objects.all()  # Sirf existing users
    )
    book = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all()  # Sirf existing books
    )
    
    class Meta:
        model = IssuedBook
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': True},  # Lazmi hona chahiye
            'book': {'required': True}   # Lazmi hona chahiye
        }
    
    def validate(self, data):
        # Extra checking
        if not User.objects.filter(username=data['user'].username).exists():
            raise serializers.ValidationError(
                {"user": "Ye user database mein nahi hai"}
            )
        if not Book.objects.filter(id=data['book'].id).exists():
            raise serializers.ValidationError(
                {"book": "Ye book database mein nahi hai"}
            )
        return data

    

# Correct serializer for your custom User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# For registration logic — if using Django's built-in User model
from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

