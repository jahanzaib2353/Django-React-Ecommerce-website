from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),
    path('<str:pk>/', views.getProduct, name="product"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

    path('create/', views.createProduct, name="product-create"),
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
]