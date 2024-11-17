from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import renderers
from .models import Profile, Product, Cart
from .serializers import ProductSerializer, ProfileSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.exceptions import NotFound


def profile(request):
    return render(request, 'inventory/profile.html') 

def products(request):
    return render(request, 'inventory/products.html') 

def login(request):
    return render(request, 'inventory/login.html')

def cart(request):
    return render(request, 'inventory/cart.html')
    


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()    
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'added_at']
    ordering = ['added_at']

    def get_object(self):
        try:
            return super().get_object()
        except Product.DoesNotExist:
            raise NotFound("The product you are looking for does not exist.")

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()    
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]