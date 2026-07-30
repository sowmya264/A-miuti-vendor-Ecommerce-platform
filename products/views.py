from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from seller.models import Seller
from .models import (
    Product,
    ProductImage,
    ProductVariant,
)

from .serializers import (
    ProductSerializer,
    ProductImageSerializer,
    ProductVariantSerializer,
)

from seller.models import Seller

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class ProductCreateView(generics.CreateAPIView):

    serializer_class = ProductSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        seller = Seller.objects.get(
            user=self.request.user
        )

        serializer.save(
            seller=seller,
            status="PENDING"
        )

class SellerProductListView(generics.ListAPIView):

    serializer_class = ProductSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return Product.objects.filter(
            seller=seller
        )
        
class ProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = ProductSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return Product.objects.filter(
            seller=seller
        )
        
class ProductImageCreateView(generics.CreateAPIView):

    serializer_class = ProductImageSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        seller = Seller.objects.get(
            user=self.request.user
        )

        product = Product.objects.get(
            id=self.request.data["product"],
            seller=seller
        )

        serializer.save(product=product)
        
class ProductVariantCreateView(generics.CreateAPIView):

    serializer_class = ProductVariantSerializer

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        seller = Seller.objects.get(
            user=self.request.user
        )

        product = Product.objects.get(
            id=self.request.data["product"],
            seller=seller
        )

        serializer.save(product=product)
        
class ProductVariantUpdateView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = ProductVariantSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return ProductVariant.objects.filter(
            product__seller=seller
        )