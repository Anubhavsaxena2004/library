from rest_framework import serializers
from .models import book,IssuedBook,User
from django.contrib.auth.models import User
class bookserializers(serializers.ModelSerializer):
    class Meta:
        model = book
        fields = '__all__'
class IssuedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = book
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        
        return user