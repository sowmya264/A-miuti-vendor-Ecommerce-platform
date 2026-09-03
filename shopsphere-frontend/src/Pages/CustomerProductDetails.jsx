import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { addToCart } from "../Services/ProductService";


function CustomerProductDetails() {
    const navigate = useNavigate();


    const { id } = useParams();
    console.log("Customer Product ID:", id);

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [addingToCart, setAddingToCart] = useState(false);


    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await api.get(
                    `products/public/${id}/`
                );

                console.log(
                    "Customer Product:",
                    response.data
                );

                setProduct(response.data);

            } catch (error) {

                console.log(
                    "Product details error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load product"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);


    const handleAddToCart = async () => {

        try {

            setAddingToCart(true);

            await addToCart(
                product.id,
                quantity
            );

            alert("Product added to cart successfully");
            navigate("/cart");

        } catch (error) {

            console.log(
                "Add to cart error:",
                error.response?.data ||
                error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to add product to cart"
            );

        } finally {

            setAddingToCart(false);

        }

    };


    if (loading) {

        return (
            <div className="p-6">
                <p>Loading product...</p>
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


    if (!product) {

        return (
            <div className="p-6">
                Product not found.
            </div>
        );

    }


    return (

        <div className="p-6 max-w-6xl mx-auto">
            <button
                onClick={() => window.history.back()}
                className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
                ← Back to Shop
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Product Image */}

                <div>

                    {product.images &&
                    product.images.length > 0 ? (

                        <img
                            src={product.images[0].image}
                            alt={product.name}
                            className="w-full h-96 object-contain rounded-lg"
                        />

                    ) : (

                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">

                            <p>
                                No image available
                            </p>

                        </div>

                    )}

                </div>


                {/* Product Information */}

                <div>

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>


                    <p className="text-gray-500 mt-2">
                        {product.brand}
                    </p>


                    <p className="text-2xl font-bold mt-4">
                        ₹{product.price}
                    </p>


                    <p className="mt-4">
                        {product.description}
                    </p>


                    <p className="mt-4">
                        Stock: {product.stock}
                    </p>


                    {/* Variants */}

                    {product.variants &&
                    product.variants.length > 0 && (

                        <div className="mt-6">

                            <h2 className="text-lg font-semibold mb-3">
                                Available Variants
                            </h2>


                            <div className="space-y-3">

                                {product.variants.map(
                                    (variant) => (

                                        <div
                                            key={variant.id}
                                            className="border p-3 rounded-lg"
                                        >

                                            <p>
                                                Size:{" "}
                                                {variant.size || "N/A"}
                                            </p>

                                            <p>
                                                Color:{" "}
                                                {variant.color || "N/A"}
                                            </p>

                                            <p>
                                                Quantity:{" "}
                                                {variant.quantity}
                                            </p>

                                            {Number(
                                                variant.additional_price
                                            ) > 0 && (

                                                <p>
                                                    Additional Price: ₹
                                                    {
                                                        variant.additional_price
                                                    }
                                                </p>

                                            )}

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    )}


                    {/* Quantity */}

                    <div className="mt-6">

                        <h2 className="font-semibold mb-2">
                            Quantity
                        </h2>


                        <div className="flex items-center gap-3">

                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            quantity - 1
                                        )
                                    )
                                }
                                className="px-4 py-2 border rounded"
                            >
                                -
                            </button>


                            <span className="text-lg font-semibold">
                                {quantity}
                            </span>


                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.min(
                                            product.stock,
                                            quantity + 1
                                        )
                                    )
                                }
                                className="px-4 py-2 border rounded"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* Add To Cart */}

                    <button
                        onClick={handleAddToCart}
                        disabled={
                            addingToCart ||
                            product.stock === 0
                        }
                        className="mt-6 w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-400"
                    >

                        {addingToCart
                            ? "Adding..."
                            : product.stock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}

                    </button>

                </div>

            </div>

        </div>

    );

}


export default CustomerProductDetails;