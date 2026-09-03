from django.urls import path

from .views import SellerProfileView, SellerDashboardView
from products.views import ProductImageDetailView

urlpatterns = [
    path("profile/", SellerProfileView.as_view(), name="seller-profile"),
    path("dashboard/", SellerDashboardView.as_view(), name="seller-dashboard"),
    path("images/<int:pk>/", ProductImageDetailView.as_view(), name="product-image-detail"),
]
