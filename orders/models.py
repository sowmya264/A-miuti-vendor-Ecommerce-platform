from django.db import models
from users.models import User

class Order(models.Model):

    STATUS = (

        ("Pending","Pending"),

        ("Shipped","Shipped"),

        ("Delivered","Delivered"),

        ("Cancelled","Cancelled")

    )

    customer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role":"CUSTOMER"}
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return f"Order {self.id}"