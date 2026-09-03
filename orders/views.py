from django.shortcuts import render

# Create your views here.
from django.db import transaction

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product
from seller.models import Seller
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Cart
from .serializers import CartSerializer
from .models import CartItem


class SellerOrderListView(generics.ListAPIView):

    serializer_class = OrderSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return Order.objects.filter(
            items__product__seller=seller
        ).distinct()
        
class SellerOrderUpdateView(generics.UpdateAPIView):

    serializer_class = OrderSerializer

    permission_classes = [IsAuthenticated]

    http_method_names = ["patch"]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return Order.objects.filter(
            items__product__seller=seller
        ).distinct()


class CustomerOrderCreateView(generics.CreateAPIView):

    serializer_class = OrderSerializer

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):

        items = request.data.get("items", [])

        if not items:
            return Response(
                {"error": "Order must contain at least one product."},
                status=status.HTTP_400_BAD_REQUEST
            )

        total_amount = 0

        product_items = []

        for item in items:

            product_id = item.get("product")
            quantity = item.get("quantity")

            if not product_id or not quantity:
                return Response(
                    {
                        "error":
                        "Each item must contain product and quantity."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:

                quantity = int(quantity)

            except (TypeError, ValueError):

                return Response(
                    {"error": "Quantity must be a number."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:

                return Response(
                    {"error": "Quantity must be greater than zero."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:

                product = Product.objects.get(
                    id=product_id,
                    is_active=True
                )

            except Product.DoesNotExist:

                return Response(
                    {
                        "error":
                        f"Product {product_id} does not exist."
                    },
                    status=status.HTTP_404_NOT_FOUND
                )

            if product.stock < quantity:

                return Response(
                    {
                        "error":
                        f"Not enough stock for {product.name}."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            total_amount += product.price * quantity

            product_items.append(
                {
                    "product": product,
                    "quantity": quantity,
                    "price": product.price,
                }
            )

        order = Order.objects.create(
            customer=request.user,
            total_amount=total_amount,
            status="Pending"
        )

        for item in product_items:

            OrderItem.objects.create(
                order=order,
                product=item["product"],
                quantity=item["quantity"],
                price=item["price"]
            )

            item["product"].stock -= item["quantity"]

            item["product"].save(
                update_fields=["stock"]
            )

        serializer = self.get_serializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
        
class CartView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        cart, created = Cart.objects.get_or_create(
            customer=request.user
        )

        serializer = CartSerializer(cart)

        return Response(
            serializer.data
        )
        
class AddToCartView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        product_id = request.data.get("product")
        quantity = int(request.data.get("quantity", 1))

        if not product_id:
            return Response(
                {"error": "Product is required"},
                status=400
            )

        if quantity < 1:
            return Response(
                {"error": "Quantity must be at least 1"},
                status=400
            )

        from products.models import Product

        try:
            product = Product.objects.get(
                id=product_id,
                status="APPROVED",
                is_active=True
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not available"},
                status=404
            )

        if quantity > product.stock:
            return Response(
                {"error": "Requested quantity is not available"},
                status=400
            )

        cart, created = Cart.objects.get_or_create(
            customer=request.user
        )

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if item_created:
            cart_item.quantity = quantity
        else:
            new_quantity = cart_item.quantity + quantity

            if new_quantity > product.stock:
                return Response(
                    {"error": "Requested quantity exceeds stock"},
                    status=400
                )

            cart_item.quantity = new_quantity

        cart_item.save()

        serializer = CartSerializer(cart)

        return Response(
            serializer.data,
            status=201
        )
        
class UpdateCartItemView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, item_id):

        quantity = request.data.get("quantity")

        if quantity is None:
            return Response(
                {"error": "Quantity is required"},
                status=400
            )

        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response(
                {"error": "Invalid quantity"},
                status=400
            )

        if quantity < 1:
            return Response(
                {"error": "Quantity must be at least 1"},
                status=400
            )

        try:

            cart_item = CartItem.objects.get(
                id=item_id,
                cart__customer=request.user
            )

        except CartItem.DoesNotExist:

            return Response(
                {"error": "Cart item not found"},
                status=404
            )

        if quantity > cart_item.product.stock:

            return Response(
                {"error": "Requested quantity exceeds stock"},
                status=400
            )

        cart_item.quantity = quantity

        cart_item.save()

        serializer = CartSerializer(
            cart_item.cart
        )

        return Response(
            serializer.data
        )
        
class RemoveCartItemView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):

        try:

            cart_item = CartItem.objects.get(
                id=item_id,
                cart__customer=request.user
            )

        except CartItem.DoesNotExist:

            return Response(
                {"error": "Cart item not found"},
                status=404
            )

        cart = cart_item.cart

        cart_item.delete()

        serializer = CartSerializer(cart)

        return Response(
            serializer.data
        )
        
class CheckoutView(APIView):

    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):

        cart, created = Cart.objects.get_or_create(
            customer=request.user
        )

        cart_items = cart.items.select_related(
            "product"
        )

        if not cart_items.exists():

            return Response(
                {
                    "error": "Your cart is empty"
                },
                status=400
            )

        total_amount = 0

        for item in cart_items:

            product = item.product

            if not product.is_active:
                return Response(
                    {
                        "error":
                        f"{product.name} is no longer available"
                    },
                    status=400
                )

            if product.status != "APPROVED":
                return Response(
                    {
                        "error":
                        f"{product.name} is not available"
                    },
                    status=400
                )

            if item.quantity > product.stock:
                return Response(
                    {
                        "error":
                        f"Not enough stock for {product.name}"
                    },
                    status=400
                )

            total_amount += (
                product.price * item.quantity
            )

        order = Order.objects.create(
            customer=request.user,
            total_amount=total_amount,
            status="Pending"
        )

        for item in cart_items:

            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

            item.product.stock -= item.quantity
            item.product.save(
                update_fields=["stock"]
            )

        cart.items.all().delete()

        return Response(
            {
                "message": "Order placed successfully",
                "order_id": order.id,
                "total_amount": str(
                    order.total_amount
                ),
                "status": order.status
            },
            status=201
        )
        
class CustomerOrderListView(generics.ListAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Order.objects.filter(
            customer=self.request.user
        ).order_by("-created_at")

    def get(self, request, *args, **kwargs):

        orders = self.get_queryset()

        data = []

        for order in orders:

            data.append({
                "id": order.id,
                "total_amount": str(
                    order.total_amount
                ),
                "status": order.status,
                "created_at": order.created_at,
            })

        return Response(data)
    
class CustomerOrderDetailView(generics.RetrieveAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Order.objects.filter(
            customer=self.request.user
        ).prefetch_related(
            "items__product"
        )

    def retrieve(self, request, *args, **kwargs):

        order = self.get_object()

        items = []

        for item in order.items.all():

            items.append({
                "id": item.id,
                "product": item.product.id,
                "product_name": item.product.name,
                "quantity": item.quantity,
                "price": str(item.price),
                "subtotal": str(
                    item.price * item.quantity
                )
            })

        data = {
            "id": order.id,
            "total_amount": str(
                order.total_amount
            ),
            "status": order.status,
            "created_at": order.created_at,
            "items": items
        }

        return Response(data)
    
class SellerOrderListView(generics.ListAPIView):

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return Order.objects.filter(
            items__product__seller=seller
        ).distinct().order_by(
            "-created_at"
        )

    def list(self, request, *args, **kwargs):

        orders = self.get_queryset()

        data = []

        for order in orders:

            seller = Seller.objects.get(
                user=request.user
            )

            seller_items = order.items.filter(
                product__seller=seller
            )

            items = []

            seller_total = 0

            for item in seller_items:

                subtotal = (
                    item.price * item.quantity
                )

                seller_total += subtotal

                items.append({
                    "id": item.id,
                    "product": item.product.id,
                    "product_name": item.product.name,
                    "quantity": item.quantity,
                    "price": str(item.price),
                    "subtotal": str(subtotal),
                })

            data.append({
                "id": order.id,
                "customer": order.customer.id,
                "total_amount": str(
                    seller_total
                ),
                "status": order.status,
                "created_at": order.created_at,
                "items": items,
            })

        return Response(data)
    
class SellerOrderStatusUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, order_id):

        seller = Seller.objects.get(
            user=request.user
        )

        try:

            order = Order.objects.get(
                id=order_id,
                items__product__seller=seller
            )

        except Order.DoesNotExist:

            return Response(
                {"error": "Order not found"},
                status=404
            )

        new_status = request.data.get("status")

        allowed_statuses = [
            "Pending",
            "Shipped",
            "Delivered",
            "Cancelled"
        ]

        if new_status not in allowed_statuses:

            return Response(
                {
                    "error":
                    "Invalid order status"
                },
                status=400
            )

        order.status = new_status

        order.save(
            update_fields=["status"]
        )

        return Response({
            "message":
            "Order status updated successfully",

            "order_id":
            order.id,

            "status":
            order.status
        })