from django.urls import path

from .views import SellerProfileView
from .views import (SellerProfileView,SellerDashboardView,)

urlpatterns = [

    path("profile/",SellerProfileView.as_view(),name="seller-profile",),
    path("dashboard/",SellerDashboardView.as_view(),name="seller-dashboard",),

]
