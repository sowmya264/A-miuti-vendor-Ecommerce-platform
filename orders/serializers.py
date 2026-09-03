from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    seller_name = serializers.CharField(
        source="product.seller.store_name",
        read_only=True
    )

    class Meta:

        model = OrderItem

        fields = (
            "id",
            "product",
            "product_name",
            "seller_name",
            "quantity",
            "price",
        )

        read_only_fields = (
            "id",
            "product_name",
            "seller_name",
        )


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:

        model = Order

        fields = (
            "id",
            "customer",
            "total_amount",
            "status",
            "created_at",
            "items",
        )

        read_only_fields = (
            "id",
            "customer",
            "created_at",
            "items",
        )
        
from rest_framework import serializers
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    product_price = serializers.DecimalField(
        source="product.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = CartItem
        fields = (
            "id",
            "product",
            "product_name",
            "product_price",
            "quantity",
        )


class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Cart
        fields = (
            "id",
            "customer",
            "items",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "customer",
            "created_at",
            "updated_at",
        )