from rest_framework import generics

from .models import Seller
from .serializers import SellerSerializer
from .permissions import IsSeller


class SellerProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = SellerSerializer

    permission_classes = [IsSeller]

    def get_object(self):

        return Seller.objects.get(
            user=self.request.user
        )
        
from rest_framework.views import APIView
from rest_framework.response import Response


class SellerDashboardView(APIView):

    permission_classes = [IsSeller]

    def get(self, request):

        seller = Seller.objects.get(user=request.user)

        data = {
            "seller_name": seller.store_name,
            "status": seller.status,
            "total_products": 0,
            "total_orders": 0,
            "pending_orders": 0,
            "completed_orders": 0,
            "total_sales": 0,
        }

        return Response(data)