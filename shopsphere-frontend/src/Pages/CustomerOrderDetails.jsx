import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getCustomerOrderDetails
} from "../Services/ProductService";


function CustomerOrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const data =
                    await getCustomerOrderDetails(id);

                console.log(
                    "Order Details:",
                    data
                );

                setOrder(data);

            } catch (error) {

                console.log(
                    "Order details error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load order details"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchOrder();

    }, [id]);


    if (loading) {

        return (
            <div className="p-6">

                <p>
                    Loading order...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="p-6">

                <p className="text-red-600">
                    {error}
                </p>

            </div>
        );

    }


    if (!order) {

        return (
            <div className="p-6">

                <p>
                    Order not found.
                </p>

            </div>
        );

    }


    return (

        <div className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Order Details
            </h1>


            {/* Order Information */}

            <div className="bg-white p-6 rounded-lg shadow mb-6">

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


                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                        {order.status}
                    </span>

                </div>

            </div>


            {/* Products */}

            <div className="bg-white p-6 rounded-lg shadow">

                <h2 className="text-xl font-semibold mb-5">
                    Products
                </h2>


                <div className="space-y-4">

                    {order.items.map((item) => (

                        <div
                            key={item.id}
                            className="border-b pb-4"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="font-semibold">
                                        {item.product_name}
                                    </h3>

                                    <p className="text-gray-500">
                                        Price: ₹{item.price}
                                    </p>

                                    <p className="text-gray-500">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>


                                <div className="font-semibold">

                                    ₹
                                    {Number(
                                        item.subtotal
                                    ).toFixed(2)}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* Total */}

                <div className="flex justify-between mt-6 pt-4 border-t">

                    <span className="text-xl font-semibold">
                        Total
                    </span>

                    <span className="text-xl font-bold">
                        ₹
                        {Number(
                            order.total_amount
                        ).toFixed(2)}
                    </span>

                </div>

            </div>

        </div>

    );

}


export default CustomerOrderDetails;