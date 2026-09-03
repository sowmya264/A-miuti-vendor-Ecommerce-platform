from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    CustomerRegisterView,
    CustomerProfileView
)
urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),
    path(
        "customer/register/",
        CustomerRegisterView.as_view(),
        name="customer-register"
    ),
    path(
        "customer/profile/",
        CustomerProfileView.as_view(),
        name="customer-profile"
    ),



]