
from rest_framework import serializers

from .models import User, Customer


class CustomerProfileSerializer(serializers.ModelSerializer):

    date_of_birth = serializers.DateField(
        source="customer_profile.date_of_birth",
        required=False,
        allow_null=True
    )

    gender = serializers.CharField(
        source="customer_profile.gender",
        required=False,
        allow_blank=True
    )

    loyalty_points = serializers.IntegerField(
        source="customer_profile.loyalty_points",
        read_only=True
    )

    class Meta:

        model = User

        fields = (
            "id",
            "username",
            "email",
            "phone",
            "date_of_birth",
            "gender",
            "loyalty_points",
        )

    def update(self, instance, validated_data):

        customer_data = validated_data.pop(
            "customer_profile",
            {}
        )

        instance.username = validated_data.get(
            "username",
            instance.username
        )

        instance.email = validated_data.get(
            "email",
            instance.email
        )

        instance.phone = validated_data.get(
            "phone",
            instance.phone
        )

        instance.save()

        customer = instance.customer_profile

        customer.date_of_birth = customer_data.get(
            "date_of_birth",
            customer.date_of_birth
        )

        customer.gender = customer_data.get(
            "gender",
            customer.gender
        )

        customer.save()

        return instance
