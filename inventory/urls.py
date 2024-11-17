from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'api/profile', views.ProfileViewSet, basename='profile')
router.register(r'api/product', views.ProductViewSet, basename='product')
router.register(r'api/cart', views.CartViewSet, basename='cart')

urlpatterns = [
    path('api/', include(router.urls)), 
    path('profile', views.profile, name='profile'),
    path('home/products/', views.products, name='products'),
    path('login/', views.login, name='login'),
    path('home/cart/', views.cart, name='cart'),
]
