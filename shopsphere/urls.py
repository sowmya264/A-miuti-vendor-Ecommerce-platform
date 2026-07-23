from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    # User APIs
    path("api/users/", include("users.urls")),

    # Product APIs
    path("api/products/", include("products.urls")),

    # Admin APIs
    path("api/admin/", include("adminpanel.urls")),

    # JWT Refresh Token
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
]