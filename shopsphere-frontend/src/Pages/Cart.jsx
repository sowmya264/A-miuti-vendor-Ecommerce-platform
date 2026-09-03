import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    updateCartItem,
    removeCartItem,
    checkout
} from "../Services/ProductService";


function Cart() {

    const navigate = useNavigate();

    const [checkingOut, setCheckingOut] = useState(false);

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchCart = async () => {

            try {

                const data = await getCart();

                console.log(
                    "Cart:",
                    data
                );

                setCart(data);

            } catch (error) {

                console.log(
                    "Cart error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load cart"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCart();

    }, []);


    const handleQuantityChange = async (
        itemId,
        newQuantity
    ) => {

        if (newQuantity < 1) {
            return;
        }

        try {

            const data = await updateCartItem(
                itemId,
                newQuantity
            );

            setCart(data);

        } catch (error) {

            console.log(
                "Update cart error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to update quantity"
            );

        }

    };


    const handleRemove = async (itemId) => {

        try {

            const data = await removeCartItem(
                itemId
            );

            setCart(data);

        } catch (error) {

            console.log(
                "Remove cart item error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to remove item"
            );

        }

    };


    const handleCheckout = async () => {

        try {

            setCheckingOut(true);

            const data = await checkout();

            alert(
                `Order placed successfully! Order #${data.order_id}`
            );

            navigate("/customer/orders");

        } catch (error) {

            console.log(
                "Checkout error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to place order"
            );

        } finally {

            setCheckingOut(false);

        }

    };


    if (loading) {

        return (

            <div className="p-6 max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold">
                    My Cart
                </h1>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-3 mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    ← Continue Shopping
                </button>

                <p className="mt-4">
                    Loading cart...
                </p>

            </div>

        );

    }


    if (error) {

        return (

            <div className="p-6 max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold">
                    My Cart
                </h1>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-3 mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    ← Continue Shopping
                </button>

                <p className="text-red-600 mt-4">
                    {error}
                </p>

            </div>

        );

    }


    const items = cart?.items || [];


    const total = items.reduce(
        (sum, item) =>
            sum +
            Number(item.product_price) *
            item.quantity,
        0
    );


    return (

        <div className="p-6 max-w-5xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                My Cart
            </h1>


            {items.length === 0 ? (

                <div className="bg-white p-6 rounded-lg shadow">

                    <p className="text-gray-500 text-lg">
                        Your cart is empty.
                    </p>


                    <button
                        onClick={() => navigate("/shop")}
                        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        ← Continue Shopping
                    </button>

                </div>

            ) : (

                <div className="space-y-4">

                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-lg shadow"
                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        {item.product_name}
                                    </h2>

                                    <p className="text-gray-500">
                                        ₹{item.product_price}
                                    </p>

                                </div>


                                <div className="text-right">

                                    <div className="flex items-center gap-3 mt-2">

                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            className="px-3 py-1 border rounded"
                                        >
                                            -
                                        </button>


                                        <span className="font-semibold">
                                            {item.quantity}
                                        </span>


                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="px-3 py-1 border rounded"
                                        >
                                            +
                                        </button>

                                    </div>


                                    <p className="text-lg font-bold mt-1">

                                        ₹
                                        {(
                                            Number(
                                                item.product_price
                                            ) *
                                            item.quantity
                                        ).toFixed(2)}

                                    </p>


                                    <button
                                        onClick={() =>
                                            handleRemove(item.id)
                                        }
                                        className="mt-3 text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}


                    <div className="bg-white p-5 rounded-lg shadow">

                        <div className="flex justify-between">

                            <span className="text-xl font-semibold">
                                Total
                            </span>

                            <span className="text-xl font-bold">
                                ₹{total.toFixed(2)}
                            </span>

                        </div>


                        <button
                            onClick={handleCheckout}
                            disabled={checkingOut}
                            className="mt-5 w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-400"
                        >

                            {checkingOut
                                ? "Processing..."
                                : "Proceed to Checkout"}

                        </button>


                        <button
                            onClick={() => navigate("/shop")}
                            className="mt-3 w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300"
                        >
                            ← Continue Shopping
                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}


export default Cart;