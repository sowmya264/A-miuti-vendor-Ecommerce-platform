from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    # User APIs
    path("api/users/", include("users.urls")),

    # Product APIs
    path("api/products/", include("products.urls")),

    # Admin APIs
    path("api/admin/", include("adminpanel.urls")),

    # JWT Refresh Token
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/token/refresh/",TokenRefreshView.as_view(),name="token_refresh",),
    path("api/products/", include("products.urls")),
    path("api/seller/", include("seller.urls")),
    path("api/orders/", include("orders.urls")),
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )