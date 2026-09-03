import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../Services/api";

function AdminOrderDetails() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const response = await api.get(
                    `admin/orders/${orderId}/`
                );

                setOrder(response.data);

            } catch (error) {

                console.error(error);
                alert("Failed to load order details");

            } finally {

                setLoading(false);

            }
        };

        fetchOrder();

    }, [orderId]);

    if (loading) {
        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold">
                    Loading order details...
                </h2>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold">
                    Order not found
                </h2>

                <Link
                    to="/admin/orders"
                    className="text-blue-600"
                >
                    ← Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Order #{order.id}
                </h1>

                <Link
                    to="/admin/orders"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    ← Back to Orders
                </Link>

            </div>

            <div className="bg-white shadow rounded-lg p-6 mb-6">

                <h2 className="text-xl font-bold mb-4">
                    Customer Information
                </h2>

                <p>
                    <strong>Username:</strong>{" "}
                    {order.customer}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {order.email}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {order.status}
                </p>

                <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(
                        order.created_at
                    ).toLocaleString()}
                </p>

                <p>
                    <strong>Total Amount:</strong>{" "}
                    ₹{order.total_amount}
                </p>

            </div>

            <div className="bg-white shadow rounded-lg overflow-x-auto">

                <h2 className="text-xl font-bold p-6 pb-3">
                    Order Items
                </h2>

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-3 text-left">
                                Product
                            </th>

                            <th className="px-6 py-3 text-left">
                                Quantity
                            </th>

                            <th className="px-6 py-3 text-left">
                                Price
                            </th>

                            <th className="px-6 py-3 text-left">
                                Subtotal
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {order.items.map((item) => (

                            <tr
                                key={item.product_id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">
                                    {item.product_name}
                                </td>

                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{item.price}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{item.subtotal}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminOrderDetails;