from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated

from .models import Category, Product, ProductImage, ProductVariant
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductImageSerializer,
    ProductVariantSerializer,
)
from seller.models import Seller


class SellerRequiredMixin:
    permission_classes = [IsAuthenticated]

    def get_seller(self):
        return Seller.objects.get(user=self.request.user)


class SellerProductMixin(SellerRequiredMixin):
    def get_queryset(self):
        return Product.objects.filter(seller=self.get_seller())


class SellerProductImageMixin(SellerRequiredMixin):
    def get_queryset(self):
        return ProductImage.objects.filter(product__seller=self.get_seller())


class SellerProductVariantMixin(SellerRequiredMixin):
    def get_queryset(self):
        return ProductVariant.objects.filter(product__seller=self.get_seller())


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class ProductViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = ProductSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Product.objects.filter(
            status="APPROVED",
            is_active=True
        )


class ProductCreateView(SellerRequiredMixin, generics.CreateAPIView):
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(
            seller=self.get_seller(),
            status="PENDING",
        )


class SellerProductListView(SellerProductMixin, generics.ListAPIView):
    serializer_class = ProductSerializer


class ProductDetailView(SellerProductMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer


class ProductImageCreateView(SellerRequiredMixin, generics.CreateAPIView):
    serializer_class = ProductImageSerializer

    def perform_create(self, serializer):
        product = Product.objects.get(
            id=self.request.data["product"],
            seller=self.get_seller(),
        )
        serializer.save(product=product)


class ProductVariantCreateView(SellerRequiredMixin, generics.CreateAPIView):
    serializer_class = ProductVariantSerializer

    def perform_create(self, serializer):
        product = Product.objects.get(
            id=self.request.data["product"],
            seller=self.get_seller(),
        )
        serializer.save(product=product)
        
class ProductImageDeleteView(generics.DestroyAPIView):

    serializer_class = ProductImageSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        seller = Seller.objects.get(
            user=self.request.user
        )

        return ProductImage.objects.filter(
            product__seller=seller
        )


class ProductVariantUpdateView(SellerProductVariantMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductVariantSerializer


class ProductImageDetailView(SellerProductImageMixin, generics.RetrieveDestroyAPIView):
    serializer_class = ProductImageSerializer
    
class PublicProductDetailView(generics.RetrieveAPIView):

    serializer_class = ProductSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        return Product.objects.filter(
            status="APPROVED",
            is_active=True
        )
