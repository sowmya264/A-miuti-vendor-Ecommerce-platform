from django.contrib import admin
from .models import (Category, Product,ProductImage,ProductVariant)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "category_name",
        "is_active",
        "created_at",
    )

    search_fields = (
        "category_name",
    )
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "seller",
        "category",
        "price",
        "stock",
        "status",
    )

    search_fields = (
        "name",
        "brand",
    )

    list_filter = (
        "status",
        "category",
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "product",
        "is_primary",
    )


@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "product",
        "size",
        "color",
        "quantity",
        "additional_price",
    )