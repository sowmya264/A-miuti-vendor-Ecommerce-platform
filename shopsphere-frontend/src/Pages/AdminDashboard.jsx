import { useEffect, useState } from "react";
import api from "../Services/api";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await api.get(
                    "admin/dashboard/"
                );

                console.log(
                    "Admin Dashboard:",
                    response.data
                );

                setDashboard(response.data);

            } catch (error) {

                console.log(
                    "Admin Dashboard Error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load admin dashboard"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-4">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-2">
                    Admin Dashboard
                </h1>

                <p className="text-gray-500 mb-6">
                    Welcome to the ShopSphere Admin Panel
                </p>


                {/* USER STATISTICS */}

                <h2 className="text-xl font-semibold mb-3">
                    Users
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Total Users
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.users.total}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Customers
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.users.customers}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Sellers
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.users.sellers}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Admins
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.users.admins}
                        </h3>
                    </div>

                </div>


                {/* SELLER STATISTICS */}

                <h2 className="text-xl font-semibold mb-3">
                    Sellers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Total Sellers
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.sellers.total}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.sellers.pending}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Approved
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.sellers.approved}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Rejected
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.sellers.rejected}
                        </h3>
                    </div>

                </div>


                {/* PRODUCT STATISTICS */}

                <h2 className="text-xl font-semibold mb-3">
                    Products
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Total Products
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.products.total}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.products.pending}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Approved
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.products.approved}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Rejected
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.products.rejected}
                        </h3>
                    </div>

                </div>


                {/* ORDER STATISTICS */}

                <h2 className="text-xl font-semibold mb-3">
                    Orders
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">

                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Total Orders
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.orders.total}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.orders.pending}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Shipped
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.orders.shipped}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Delivered
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.orders.delivered}
                        </h3>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-gray-500">
                            Cancelled
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {dashboard.orders.cancelled}
                        </h3>
                    </div>

                </div>


                {/* CATEGORY */}

                <div className="bg-white p-5 rounded-lg shadow mb-8">

                    <p className="text-gray-500">
                        Total Categories
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {dashboard.categories}
                    </h3>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;