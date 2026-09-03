from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Seller
from .serializers import SellerSerializer
from .permissions import IsSeller
from products.models import Product
from django.db.models import Sum
from orders.models import Order
from django.db.models import Sum, F, DecimalField, ExpressionWrapper


class SellerProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = SellerSerializer

    permission_classes = [IsSeller]

    def get_object(self):

        return Seller.objects.get(
            user=self.request.user
        )
        

class SellerDashboardView(APIView):

    permission_classes = [IsSeller]

    def get(self, request):

        seller = Seller.objects.get(
            user=request.user
        )

        # Seller's products
        products = Product.objects.filter(
            seller=seller
        )

        total_products = products.count()

        # Seller's orders
        orders = Order.objects.filter(
            items__product__seller=seller
        ).distinct()

        total_orders = orders.count()

        pending_orders = orders.filter(
            status="Pending"
        ).count()

        completed_orders = orders.filter(
            status="Delivered"
        ).count()

        # Calculate sales from seller's products
        total_sales = Order.objects.filter(
            items__product__seller=seller,
            status="Delivered"
        ).aggregate(
            total=Sum(
                ExpressionWrapper(
                    F("items__price") *
                    F("items__quantity"),
                    output_field=DecimalField(
                        max_digits=12,
                        decimal_places=2
                    )
                )
            )
        )["total"] or 0

        data = {

            "seller_name": seller.store_name,

            "status": seller.status,

            "total_products": total_products,

            "total_orders": total_orders,

            "pending_orders": pending_orders,

            "completed_orders": completed_orders,

            "total_sales": total_sales,

        }

        return Response(data)