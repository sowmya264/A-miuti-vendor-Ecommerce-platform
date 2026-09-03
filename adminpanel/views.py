from rest_framework.views import APIView
from rest_framework.response import Response

from users.permissions import IsAdmin
from users.models import User
from seller.models import Seller
from products.models import Product, Category
from orders.models import Order


class Dashboard(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({

            "message": "Welcome Admin",

            "users": {
                "total": User.objects.count(),
                "customers": User.objects.filter(
                    role="CUSTOMER"
                ).count(),
                "sellers": User.objects.filter(
                    role="SELLER"
                ).count(),
                "admins": User.objects.filter(
                    role="ADMIN"
                ).count(),
            },

            "sellers": {
                "total": Seller.objects.count(),
                "pending": Seller.objects.filter(
                    status="PENDING"
                ).count(),
                "approved": Seller.objects.filter(
                    status="APPROVED"
                ).count(),
                "rejected": Seller.objects.filter(
                    status="REJECTED"
                ).count(),
            },

            "products": {
                "total": Product.objects.count(),
                "pending": Product.objects.filter(
                    status="PENDING"
                ).count(),
                "approved": Product.objects.filter(
                    status="APPROVED"
                ).count(),
                "rejected": Product.objects.filter(
                    status="REJECTED"
                ).count(),
            },

            "categories": Category.objects.count(),

            "orders": {
                "total": Order.objects.count(),
                "pending": Order.objects.filter(
                    status="Pending"
                ).count(),
                "shipped": Order.objects.filter(
                    status="Shipped"
                ).count(),
                "delivered": Order.objects.filter(
                    status="Delivered"
                ).count(),
                "cancelled": Order.objects.filter(
                    status="Cancelled"
                ).count(),
            },

        })
        
class UserList(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        users = User.objects.all().order_by("-created_at")

        data = []

        for user in users:

            data.append({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "is_active": user.is_active,
                "is_verified": user.is_verified,
                "created_at": user.created_at,
            })

        return Response(data)
    
class SellerList(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        sellers = Seller.objects.all().order_by("-created_at")

        data = []

        for seller in sellers:

            data.append({
                "id": seller.id,
                "username": seller.user.username,
                "email": seller.user.email,
                "store_name": seller.store_name,
                "phone": seller.phone,
                "city": seller.city,
                "state": seller.state,
                "status": seller.status,
                "created_at": seller.created_at,
            })

        return Response(data)
    
class SellerStatusUpdate(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, seller_id):

        try:
            seller = Seller.objects.get(id=seller_id)

        except Seller.DoesNotExist:
            return Response(
                {"error": "Seller not found"},
                status=404
            )

        status_value = request.data.get("status")

        if status_value not in [
            "PENDING",
            "APPROVED",
            "REJECTED"
        ]:
            return Response(
                {
                    "error": "Invalid status. Use PENDING, APPROVED or REJECTED."
                },
                status=400
            )

        seller.status = status_value
        seller.save()

        return Response({
            "message": f"Seller status updated to {status_value}",
            "seller_id": seller.id,
            "status": seller.status
        })
        
class ProductList(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        products = Product.objects.all().order_by("-created_at")

        data = []

        for product in products:

            data.append({
                "id": product.id,
                "name": product.name,
                "seller": product.seller.store_name,
                "category": product.category.category_name,
                "price": product.price,
                "stock": product.stock,
                "brand": product.brand,
                "sku": product.sku,
                "status": product.status,
                "is_active": product.is_active,
                "created_at": product.created_at,
            })

        return Response(data)      
    
class ProductStatusUpdate(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, product_id):

        try:
            product = Product.objects.get(id=product_id)

        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=404
            )

        status_value = request.data.get("status")

        if status_value not in [
            "PENDING",
            "APPROVED",
            "REJECTED"
        ]:
            return Response(
                {
                    "error": "Invalid status. Use PENDING, APPROVED or REJECTED."
                },
                status=400
            )

        product.status = status_value
        product.save()

        return Response({
            "message": f"Product status updated to {status_value}",
            "product_id": product.id,
            "status": product.status
        })
        
class OrderList(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        orders = Order.objects.all().order_by("-created_at")

        data = []

        for order in orders:

            data.append({
                "id": order.id,
                "customer": order.customer.username,
                "email": order.customer.email,
                "total_amount": order.total_amount,
                "status": order.status,
                "created_at": order.created_at,
            })

        return Response(data)

class OrderStatusUpdate(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, order_id):

        try:
            order = Order.objects.get(id=order_id)

        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=404
            )

        status_value = request.data.get("status")

        if status_value not in [
            "Pending",
            "Shipped",
            "Delivered",
            "Cancelled"
        ]:
            return Response(
                {
                    "error": "Invalid status. Use Pending, Shipped, Delivered or Cancelled."
                },
                status=400
            )

        order.status = status_value
        order.save()

        return Response({
            "message": f"Order status updated to {status_value}",
            "order_id": order.id,
            "status": order.status
        })
        
class OrderDetail(APIView):

    permission_classes = [IsAdmin]

    def get(self, request, order_id):

        try:
            order = Order.objects.get(id=order_id)

        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found"},
                status=404
            )

        items = order.items.all()

        data = {
            "id": order.id,
            "customer": order.customer.username,
            "email": order.customer.email,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items": []
        }

        for item in items:

            data["items"].append({
                "product_id": item.product.id,
                "product_name": item.product.name,
                "quantity": item.quantity,
                "price": item.price,
                "subtotal": item.quantity * item.price,
            })

        return Response(data)
    
class CategoryList(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        categories = Category.objects.all().order_by("-created_at")

        data = []

        for category in categories:

            data.append({
                "id": category.id,
                "category_name": category.category_name,
                "slug": category.slug,
                "description": category.description,
                "image": category.image.url if category.image else None,
                "is_active": category.is_active,
                "created_at": category.created_at,
            })

        return Response(data)

    def post(self, request):

        category_name = request.data.get("category_name")
        description = request.data.get("description", "")

        if not category_name:
            return Response(
                {"error": "Category name is required"},
                status=400
            )

        if Category.objects.filter(
            category_name=category_name
        ).exists():
            return Response(
                {"error": "Category already exists"},
                status=400
            )

        category = Category.objects.create(
            category_name=category_name,
            description=description
        )

        return Response(
            {
                "message": "Category created successfully",
                "id": category.id,
                "category_name": category.category_name,
                "slug": category.slug,
                "description": category.description,
                "is_active": category.is_active,
            },
            status=201
        )
        
class CategoryUpdate(APIView):

    permission_classes = [IsAdmin]

    def patch(self, request, category_id):

        try:
            category = Category.objects.get(id=category_id)

        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"},
                status=404
            )

        category_name = request.data.get("category_name")
        description = request.data.get("description")

        if category_name:
            if Category.objects.filter(
                category_name=category_name
            ).exclude(id=category_id).exists():
                return Response(
                    {"error": "Category already exists"},
                    status=400
                )

            category.category_name = category_name

        if description is not None:
            category.description = description

        category.save()

        return Response({
            "message": "Category updated successfully",
            "id": category.id,
            "category_name": category.category_name,
            "slug": category.slug,
            "description": category.description,
            "is_active": category.is_active,
        })