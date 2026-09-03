from django.db import models
from users.models import User
from products.models import Product

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
    
    
class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):

        return f"{self.product.name} - {self.quantity}"
    
class Cart(models.Model):

    customer = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"role": "CUSTOMER"}
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.customer.username}'s Cart"


class CartItem(models.Model):

    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(
        default=1
    )

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"