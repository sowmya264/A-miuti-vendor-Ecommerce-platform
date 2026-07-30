from django.db import models
from users.models import User


class Seller(models.Model):

    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="seller_profile_details"
    )

    store_name = models.CharField(max_length=150)

    gst_number = models.CharField(
        max_length=20,
        unique=True
    )

    pan_number = models.CharField(
        max_length=20,
        unique=True
    )

    phone = models.CharField(max_length=15)

    address = models.TextField()

    city = models.CharField(max_length=100)

    state = models.CharField(max_length=100)

    pincode = models.CharField(max_length=10)

    country = models.CharField(
        max_length=100,
        default="India"
    )

    store_logo = models.ImageField(
        upload_to="seller/logo/",
        blank=True,
        null=True
    )

    store_banner = models.ImageField(
        upload_to="seller/banner/",
        blank=True,
        null=True
    )

    bank_name = models.CharField(max_length=100)

    account_number = models.CharField(max_length=30)

    ifsc_code = models.CharField(max_length=20)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.store_name