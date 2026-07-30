from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductVariant


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = (
            "id",
            "seller",
            "status",
            "created_at",
            "updated_at",
        )
        
class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage

        fields = "__all__"

        read_only_fields = (
            "id",
            "created_at",
        )


class ProductVariantSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductVariant

        fields = "__all__"

        read_only_fields = (
            "id",
        )


class ProductSerializer(serializers.ModelSerializer):

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    variants = ProductVariantSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Product

        fields = "__all__"

        read_only_fields = (
            "id",
            "seller",
            "status",
            "created_at",
            "updated_at",
        )