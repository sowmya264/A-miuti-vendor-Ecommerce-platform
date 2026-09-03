from django.urls import path
from .views import (Dashboard, UserList, SellerList, SellerStatusUpdate, ProductList, ProductStatusUpdate, OrderList, OrderStatusUpdate, OrderDetail, CategoryList, CategoryUpdate)      




urlpatterns = [

    path(
        "dashboard/",
        Dashboard.as_view()
    ),

    path(
        "users/",
        UserList.as_view()
    ),
    path(
        "sellers/",
        SellerList.as_view()
    ),
    path(
        "sellers/<int:seller_id>/status/",
        SellerStatusUpdate.as_view()
    ),
    path(
        "products/",
        ProductList.as_view()
    ),
    path(
        "products/<int:product_id>/status/",
        ProductStatusUpdate.as_view()
    ),
    path(
        "orders/",
        OrderList.as_view()
    ),
    path(
        "orders/<int:order_id>/status/",
        OrderStatusUpdate.as_view()
    ),
    path(
        "orders/<int:order_id>/",
        OrderDetail.as_view()
    ),
    path(
        "categories/",
        CategoryList.as_view()
    ),
    path(
        "categories/<int:category_id>/",
        CategoryUpdate.as_view()
    ),
]