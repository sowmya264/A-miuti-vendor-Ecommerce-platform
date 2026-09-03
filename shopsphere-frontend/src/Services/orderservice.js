import api from "./api";


// Get orders belonging to the logged-in seller
export const getSellerOrders = async () => {

    const response = await api.get(
        "orders/seller/"
    );

    return response.data;
};


// Create an order
export const createOrder = async (orderData) => {

    const response = await api.post(
        "orders/create/",
        orderData
    );

    return response.data;
};

export const updateSellerOrder = async (
    orderId,
    status
) => {

    const response = await api.patch(
        `orders/seller/${orderId}/`,
        {
            status: status
        }
    );

    return response.data;
};