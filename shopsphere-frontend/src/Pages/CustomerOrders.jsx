import { useEffect, useState } from "react";

import { getCustomerOrders } from "../Services/ProductService";
import { useNavigate } from "react-router-dom";

function CustomerOrders() {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const data = await getCustomerOrders();

                console.log(
                    "Customer Orders:",
                    data
                );

                setOrders(data);

            } catch (error) {

                console.log(
                    "Customer orders error:",
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

                <h1 className="text-3xl font-bold">
                    My Orders
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

                <h1 className="text-3xl font-bold">
                    My Orders
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                My Orders
            </h1>


            {orders.length === 0 ? (

                <div className="bg-white p-6 rounded-lg shadow">

                    <p className="text-gray-500">
                        You haven't placed any orders yet.
                    </p>

                </div>

            ) : (

                <div className="space-y-4">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            onClick={() =>
                                navigate(
                                    `/customer/orders/${order.id}`
                                )
                            }
                            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h2 className="text-xl font-semibold">
                                        Order #{order.id}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString()}
                                    </p>

                                </div>


                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                    {order.status}
                                </span>

                            </div>


                            <div className="mt-4">

                                <p className="text-lg font-semibold">
                                    Total: ₹
                                    {Number(
                                        order.total_amount
                                    ).toFixed(2)}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default CustomerOrders;