import api from "./api";


// Get all products
export const getProducts = async () => {

    const response = await api.get(
        "products/public/"
    );

    return response.data;

};


// Get single product
export const getProduct = async (productId) => {

    const response = await api.get(
        `products/${productId}/`
    );

    return response.data;

};

export const getProductById = getProduct;

export const getSellerProducts = async () => {

    const response = await api.get("products/");

    return response.data;

};

export const getCategories = async () => {

    const response = await api.get("categories/");

    return response.data;

};

export const createProduct = async (productData) => {

    const response = await api.post("products/create/", productData);

    return response.data;

};

export const updateProduct = async (productId, productData) => {

    const response = await api.put(
        `products/${productId}/`,
        productData
    );

    return response.data;

};

export const deleteProduct = async (productId) => {

    const response = await api.delete(`products/${productId}/`);

    return response.data;

};

export const uploadProductImage = async (
    productId,
    imageFile,
    isPrimary
) => {

    const formData = new FormData();
    formData.append("product", productId);
    formData.append("image", imageFile);
    formData.append("is_primary", isPrimary);

    const response = await api.post(
        `products/${productId}/images/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;

};

export const deleteProductImage = async (imageId) => {

    const response = await api.delete(
        `products/images/${imageId}/`
    );

    return response.data;
};

export const createProductVariant = async (variantData) => {

    const response = await api.post("variants/", variantData);

    return response.data;

};

export const updateProductVariant = async (variantId, variantData) => {

    const response = await api.put(
        `variants/${variantId}/`,
        variantData
    );

    return response.data;

};

export const deleteProductVariant = async (variantId) => {

    const response = await api.delete(`variants/${variantId}/`);

    return response.data;

};

export const addToCart = async (productId, quantity) => {

    const response = await api.post(
        "orders/cart/add/",
        {
            product: productId,
            quantity: quantity,
        }
    );

    return response.data;
};
export const getCart = async () => {

    const response = await api.get(
        "orders/cart/"
    );

    return response.data;
};
export const updateCartItem = async (
    itemId,
    quantity
) => {

    const response = await api.patch(
        `orders/cart/update/${itemId}/`,
        {
            quantity: quantity,
        }
    );

    return response.data;
};
export const removeCartItem = async (itemId) => {

    const response = await api.delete(
        `orders/cart/remove/${itemId}/`
    );

    return response.data;
};
export const checkout = async () => {

    const response = await api.post(
        "orders/checkout/"
    );

    return response.data;
};
export const getCustomerOrders = async () => {

    const response = await api.get(
        "orders/customer/orders/"
    );

    return response.data;
};
export const getCustomerOrderDetails = async (orderId) => {

    const response = await api.get(
        `orders/customer/orders/${orderId}/`
    );

    return response.data;
};
export const getSellerOrders = async () => {

    const response = await api.get(
        "orders/seller/orders/"
    );

    return response.data;
};
export const updateSellerOrderStatus = async (
    orderId,
    status
) => {

    const response = await api.patch(
        `orders/seller/orders/${orderId}/status/`,
        {
            status: status
        }
    );

    return response.data;
};