from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Category
from .serializers import CategorySerializer

from users.permissions import IsAdmin


class CategoryListCreateView(generics.ListCreateAPIView):

    queryset = Category.objects.all().order_by("category_name")

    serializer_class = CategorySerializer

    permission_classes = [IsAuthenticated, IsAdmin]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    permission_classes = [IsAuthenticated, IsAdmin]