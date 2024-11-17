from rest_framework import serializers
from .models import Profile , Product , Cart

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'username',  'profile_picture', 'address', 'created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'user', 'image', 'price', 'description', 'added_at', 'updated_at']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['product', 'user', 'added_at', 'updated_at']
        
