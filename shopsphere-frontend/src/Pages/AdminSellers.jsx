import { useEffect, useState } from "react";
import api from "../Services/api";

function AdminSellers() {

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchSellers = async () => {

            try {

                const response = await api.get(
                    "admin/sellers/"
                );

                console.log(
                    "Admin Sellers:",
                    response.data
                );

                setSellers(response.data);

            } catch (error) {

                console.log(
                    "Sellers Error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load sellers"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchSellers();

    }, []);
    const handleStatusChange = async (sellerId, status) => {

        try {

            await api.patch(
                `admin/sellers/${sellerId}/status/`,
                {
                    status: status
                }
            );

            // Update the seller status immediately
            setSellers((currentSellers) =>
                currentSellers.map((seller) =>
                    seller.id === sellerId
                        ? {
                            ...seller,
                            status: status
                        }
                        : seller
                )
            );

            alert(
                `Seller ${status.toLowerCase()} successfully`
            );

        } catch (error) {

            console.log(
                "Seller status update error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to update seller status"
            );
        }
    };

    if (loading) {

        return (
            <div className="p-6">

                <h1 className="text-3xl font-bold">
                    Manage Sellers
                </h1>

                <p className="mt-4">
                    Loading sellers...
                </p>

            </div>
        );
    }

    if (error) {

        return (
            <div className="p-6">

                <h1 className="text-3xl font-bold">
                    Manage Sellers
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

                <h1 className="text-3xl font-bold mb-6">
                    Manage Sellers
                </h1>

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Username
                                </th>

                                <th className="p-4 text-left">
                                    Store Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Location
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Created
                                </th>
                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sellers.map((seller) => (

                                <tr
                                    key={seller.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {seller.id}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {seller.username}
                                    </td>

                                    <td className="p-4">
                                        {seller.store_name}
                                    </td>

                                    <td className="p-4">
                                        {seller.email}
                                    </td>

                                    <td className="p-4">
                                        {seller.phone}
                                    </td>

                                    <td className="p-4">
                                        {seller.city}, {seller.state}
                                    </td>

                                    <td className="p-4">

                                        <div className="flex flex-col gap-2">

                                            <span
                                                className={
                                                    seller.status === "APPROVED"
                                                        ? "text-green-600 font-semibold"
                                                        : seller.status === "REJECTED"
                                                            ? "text-red-600 font-semibold"
                                                            : "text-yellow-600 font-semibold"
                                                }
                                            >
                                                {seller.status}
                                            </span>

                                            <div className="flex gap-2">

                                                {seller.status !== "APPROVED" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                seller.id,
                                                                "APPROVED"
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                                                    >
                                                        Approve
                                                    </button>
                                                )}

                                                {seller.status !== "REJECTED" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                seller.id,
                                                                "REJECTED"
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                                                    >
                                                        Reject
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            seller.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">

                                        {seller.status === "PENDING" ? (

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            seller.id,
                                                            "APPROVED"
                                                        )
                                                    }
                                                    className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            seller.id,
                                                            "REJECTED"
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        ) : (

                                            <span className="text-gray-500">
                                                No actions
                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminSellers;