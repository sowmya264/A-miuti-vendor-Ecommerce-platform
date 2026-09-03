from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryDetailView,
    CategoryListCreateView,
    ProductCreateView,
    ProductDetailView,
    ProductImageCreateView,
    ProductImageDetailView,
    ProductVariantCreateView,
    ProductVariantUpdateView,
    ProductViewSet,
    PublicProductDetailView,
    SellerProductListView,
    ProductImageDeleteView,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='products')

urlpatterns = [
    # Category APIs
    path(
        "categories/",
        CategoryListCreateView.as_view(),
        name="category-list",
    ),
    path(
        "categories/<int:pk>/",
        CategoryDetailView.as_view(),
        name="category-detail",
    ),

    # Product creation & seller product listing
    path(
        "create/",
        ProductCreateView.as_view(),
        name="product-create",
    ),
    path(
        "public/",
        ProductViewSet.as_view({"get": "list"}),
        name="public-products",
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

    # Product images
    path(
        "images/",
        ProductImageCreateView.as_view(),
        name="product-image-create",
    ),
    path(
        "images/<int:pk>/",
        ProductImageDeleteView.as_view(),
        name="product-image-delete",
    ),
    path(
        "images/<int:pk>/",
        ProductImageDetailView.as_view(),
        name="product-image-detail",
    ),

    # Product variants
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

    # ViewSet routes
    path("", include(router.urls)),
    
    path(
        "public/<int:pk>/",
        PublicProductDetailView.as_view(),
        name="public-product-detail",
    ),
]