from django.urls import path

from .views import (
    SellerOrderListView,
    CustomerOrderCreateView,
    SellerOrderUpdateView,
    SellerOrderListView,
    SellerOrderStatusUpdateView,
    
)
from .views import (CartView, AddToCartView, UpdateCartItemView, 
                    RemoveCartItemView,
                    CheckoutView,
                    CustomerOrderListView,
                    CustomerOrderDetailView,)


urlpatterns = [

    path(
        "seller/",
        SellerOrderListView.as_view(),
        name="seller-orders"
    ),

    path(
        "create/",
        CustomerOrderCreateView.as_view(),
        name="order-create"
    ),
    path(
        "seller/<int:pk>/",
        SellerOrderUpdateView.as_view(),
        name="seller-order-update"
    ),
    path(
        "cart/",
        CartView.as_view(),
        name="cart"
    ),
    path(
        "cart/",
        CartView.as_view(),
        name="cart"
    ),

    path(
        "cart/add/",
        AddToCartView.as_view(),
        name="cart-add"
    ),
    path(
        "cart/update/<int:item_id>/",
        UpdateCartItemView.as_view(),
        name="cart-update"
    ),
    path(
        "cart/remove/<int:item_id>/",
        RemoveCartItemView.as_view(),
        name="cart-remove"
    ),
    path(
        "checkout/",
        CheckoutView.as_view(),
        name="checkout"
    ),
    path(
        "customer/orders/",
        CustomerOrderListView.as_view(),
        name="customer-orders"
    ),
    path(
        "customer/orders/<int:pk>/",
        CustomerOrderDetailView.as_view(),
        name="customer-order-detail"
    ),
    path(
        "seller/orders/",
        SellerOrderListView.as_view(),
        name="seller-orders"
    ),
    path(
        "seller/orders/<int:order_id>/status/",
        SellerOrderStatusUpdateView.as_view(),
        name="seller-order-status"
    ),

]