from django.core.serializers import python
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import (
    RegisterSerializer,
    CustomerRegisterSerializer
)
from .login_serializer import LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from .models import Customer
from .customer_profile_serializer import CustomerProfileSerializer


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer


class LoginView(APIView):

    authentication_classes = []

    permission_classes = []

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data)
    
class CustomerRegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = CustomerRegisterSerializer
    
    
class CustomerProfileView(RetrieveUpdateAPIView):

    serializer_class = CustomerProfileSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):

        user = self.request.user

        customer, created = Customer.objects.get_or_create(
            user=user
        )

        return user

