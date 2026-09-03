import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("access");

        const publicUrls = [
            "users/login/",
            "users/register/",
            "users/customer/register/",
        ];

        const isPublicUrl = publicUrls.some(
            (url) => config.url?.includes(url)
        );

        if (token && !isPublicUrl) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;
    },
    (error) => {

        return Promise.reject(error);

    }
);

export default api;