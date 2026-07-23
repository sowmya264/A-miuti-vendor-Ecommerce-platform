from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ProductViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    # Category APIs
    path(
        "categories/",
        CategoryListCreateView.as_view(),
        name="category-list"
    ),
    path(
        "categories/<int:pk>/",
        CategoryDetailView.as_view(),
        name="category-detail"
    ),

    # Product APIs
    path("", include(router.urls)),
]