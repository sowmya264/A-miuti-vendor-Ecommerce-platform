import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleStatusChange = async (orderId, status) => {
        try {
            await api.patch(
                `admin/orders/${orderId}/status/`,
                { status: status }
            );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId
                        ? { ...order, status: status }
                        : order
                )
            );

            alert(`Order status updated to ${status}`);
        } catch (error) {
            console.error(error);
            alert("Failed to update order status");
        }
};

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const response = await api.get("admin/orders/");

                setOrders(response.data);

            } catch (error) {

                console.error(error);
                alert("Failed to load orders");

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold">
                    Loading orders...
                </h2>
            </div>
        );
    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Orders
            </h1>

            <div className="bg-white shadow rounded-lg overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-4 py-3 text-left">
                                Order ID
                            </th>

                            <th className="px-4 py-3 text-left">
                                Customer
                            </th>

                            <th className="px-4 py-3 text-left">
                                Email
                            </th>

                            <th className="px-4 py-3 text-left">
                                Total Amount
                            </th>

                            <th className="px-4 py-3 text-left">
                                Status
                            </th>

                            <th className="px-4 py-3 text-left">
                                Created At
                            </th>
                            <th className="px-4 py-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order.id}
                                className="border-t"
                            >

                                <td className="px-4 py-3">
                                    {order.id}
                                </td>

                                <td className="px-4 py-3">
                                    {order.customer}
                                </td>

                                <td className="px-4 py-3">
                                    {order.email}
                                </td>

                                <td className="px-4 py-3">
                                    ₹{order.total_amount}
                                </td>

                                <td className="px-4 py-3">
                                    <select
                                        value={order.status}
                                        onChange={(event) =>
                                            handleStatusChange(
                                                order.id,
                                                event.target.value
                                            )
                                        }
                                        className="border rounded-lg px-2 py-1 text-sm"
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>
                                        <option value="Shipped">
                                            Shipped
                                        </option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </td>

                                <td className="px-4 py-3">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </td>
                                <td className="px-4 py-3">
                                    <Link
                                        to={`/admin/orders/${order.id}`}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        View Details
                                    </Link>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {orders.length === 0 && (
                    <p className="p-6 text-gray-500">
                        No orders found.
                    </p>
                )}

            </div>

        </div>
    );
}

export default AdminOrders;