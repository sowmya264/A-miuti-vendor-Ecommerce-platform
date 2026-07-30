from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductImageCreateView
from .views import (ProductVariantCreateView,ProductVariantUpdateView)

from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ProductViewSet,
)
from .views import (
    ProductCreateView,
    SellerProductListView,
    ProductDetailView,
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
        "images/",
        ProductImageCreateView.as_view(),
        name="product-image-create",
    ),
    path(
        "categories/<int:pk>/",
        CategoryDetailView.as_view(),
        name="category-detail"
    ),
        path(
        "create/",
        ProductCreateView.as_view(),
        name="product-create",
    ),

    path(
        "",
        SellerProductListView.as_view(),
        name="seller-products",
    ),

    path(
        "<int:pk>/",
        ProductDetailView.as_view(),
        name="product-detail",
    ),

    # Product APIs
    path("", include(router.urls)),
    
    path(
        "variants/",
        ProductVariantCreateView.as_view(),
        name="variant-create",
    ),

    path(
        "variants/<int:pk>/",
        ProductVariantUpdateView.as_view(),
        name="variant-update",
    ),
]