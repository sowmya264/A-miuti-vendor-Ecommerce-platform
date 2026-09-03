from rest_framework import serializers
from .models import User, Customer
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )

    class Meta:
        model = User

        fields = (
            'id',
            'username',
            'email',
            'password',
            'role',
            'phone'
        )

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            phone=validated_data.get("phone"),
            role="CUSTOMER"
        )

        Customer.objects.create(
            user=user
        )

        return user
    
class CustomerRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "email",
            "password",
            "phone",
        )

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            phone=validated_data.get("phone"),
            role="CUSTOMER"
        )

        return user