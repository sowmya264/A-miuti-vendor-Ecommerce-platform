import { useEffect, useState } from "react";

import {
    getSellerOrders,
    updateSellerOrderStatus
} from "../Services/ProductService";

function SellerOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const handleStatusChange = async (
        orderId,
        newStatus
    ) => {

        try {

            await updateSellerOrderStatus(
                orderId,
                newStatus
            );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            status: newStatus
                        }
                        : order
                )
            );

            alert(
                "Order status updated successfully"
            );

        } catch (error) {

            console.log(
                "Status update error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to update order status"
            );

        }

    };


    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const data = await getSellerOrders();

                console.log(
                    "Seller Orders:",
                    data
                );

                setOrders(data);

            } catch (error) {

                console.log(
                    "Seller orders error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load orders"
                );

            } finally {

                setLoading(false);

            }

        };
        fetchOrders();

    }, []);


    if (loading) {

        return (
            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Orders
                </h1>

                <p className="mt-4">
                    Loading orders...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Orders
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Seller Orders
            </h1>


            {orders.length === 0 ? (

                <div className="bg-white p-6 rounded-lg shadow">

                    <p className="text-gray-500">
                        No orders available.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="bg-white p-6 rounded-lg shadow"
                        >

                            {/* Order Header */}

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-xl font-semibold">
                                        Order #{order.id}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Customer ID: {order.customer}
                                    </p>

                                    <p className="text-gray-500 mt-1">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>

                                </div>


                                <select
                                    value={order.status}
                                    onChange={(event) =>
                                        handleStatusChange(
                                            order.id,
                                            event.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2"
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

                            </div>


                            {/* Products */}

                            <div className="mt-5">

                                <h3 className="font-semibold mb-3">
                                    Products
                                </h3>


                                <div className="space-y-3">

                                    {order.items.map(
                                        (item) => (

                                            <div
                                                key={item.id}
                                                className="border p-4 rounded-lg flex justify-between"
                                            >

                                                <div>

                                                    <p className="font-semibold">
                                                        {
                                                            item.product_name
                                                        }
                                                    </p>

                                                    <p className="text-gray-500">
                                                        Quantity:{" "}
                                                        {
                                                            item.quantity
                                                        }
                                                    </p>

                                                    <p className="text-gray-500">
                                                        Price: ₹
                                                        {
                                                            item.price
                                                        }
                                                    </p>

                                                </div>


                                                <p className="font-semibold">
                                                    ₹
                                                    {
                                                        Number(
                                                            item.subtotal
                                                        ).toFixed(2)
                                                    }
                                                </p>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>


                            {/* Total */}

                            <div className="mt-5 pt-4 border-t flex justify-between">

                                <span className="text-lg font-semibold">
                                    Seller Total
                                </span>

                                <span className="text-lg font-bold">
                                    ₹
                                    {Number(
                                        order.total_amount
                                    ).toFixed(2)}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default SellerOrders;