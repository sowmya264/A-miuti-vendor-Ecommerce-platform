from rest_framework import serializers
from .models import Seller


class SellerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Seller
        fields = "__all__"
        read_only_fields = (
            "id",
            "user",
            "status",
            "created_at",
            "updated_at",
        )