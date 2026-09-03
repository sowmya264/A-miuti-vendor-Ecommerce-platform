import api from "./api";



// Get Seller Profile
export const getSellerProfile = async () => {

    const response = await api.get("seller/profile/");

    return response.data;

};

// Update Seller Profile
export const updateSellerProfile = async (profileData) => {

    const response = await api.put(
        "seller/profile/",
        profileData
    );

    return response.data;

};

export const getSellerDashboard = async () => {

    const response = await api.get(
        "seller/dashboard/"
    );

    return response.data;
};