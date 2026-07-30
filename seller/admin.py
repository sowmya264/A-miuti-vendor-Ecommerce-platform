from django.contrib import admin
from .models import Seller


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "store_name",
        "user",
        "status",
        "city",
    )

    list_filter = (
        "status",
        "city",
    )

    search_fields = (
        "store_name",
        "gst_number",
    )