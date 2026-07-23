from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    ROLE_CHOICES = (
        ("ADMIN", "Admin"),
        ("SELLER", "Seller"),
        ("CUSTOMER", "Customer"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="CUSTOMER"
    )

    phone = models.CharField(
        max_length=15,
        unique=True,
        null=True,
        blank=True
    )

    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class Customer(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="customer_profile"
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True
    )

    gender = models.CharField(
        max_length=10,
        blank=True
    )

    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username


class Seller(models.Model):

    STATUS = (
        ("PENDING", "Pending"),
        ("APPROVED", "Approved"),
        ("REJECTED", "Rejected"),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="seller_profile"
    )

    business_name = models.CharField(max_length=200)

    gst_number = models.CharField(
        max_length=20,
        unique=True
    )

    business_address = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="PENDING"
    )

    commission_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=10.00
    )

    total_earnings = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.business_name