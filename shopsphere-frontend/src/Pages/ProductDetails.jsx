import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../Services/ProductService";


function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const data = await getProduct(id);

                console.log(
                    "Product details:",
                    data
                );

                setProduct(data);

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


    if (loading) {

        return (
            <div className="p-6">

                <p>
                    Loading product...
                </p>

            </div>
        );

    }


    if (error || !product) {

        return (
            <div className="p-6">

                <p className="text-red-600">
                    {error || "Product not found"}
                </p>

            </div>
        );

    }


    return (

        <div className="p-6">

            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                    {/* Product Images */}

                    <div>

                        {product.images &&
                        product.images.length > 0 ? (

                            <div className="space-y-4">

                                {product.images.map(
                                    (image) => (

                                        <img
                                            key={image.id}
                                            src={image.image}
                                            alt={product.name}
                                            className="w-full max-h-96 object-contain rounded-lg"
                                        />

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg">

                                <p className="text-gray-500">
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


                        <p className="text-2xl font-bold mt-6">

                            ₹{product.price}

                        </p>


                        <p className="mt-4">

                            {product.description}

                        </p>


                        <p className="mt-4">

                            <strong>
                                Stock:
                            </strong>{" "}

                            {product.stock}

                        </p>


                        {/* Variants */}

                        {product.variants &&
                        product.variants.length > 0 && (

                            <div className="mt-6">

                                <h2 className="font-semibold mb-3">

                                    Variants

                                </h2>


                                <div className="space-y-2">

                                    {product.variants.map(
                                        (variant) => (

                                            <div
                                                key={variant.id}
                                                className="border rounded p-3"
                                            >

                                                <p>

                                                    Size:{" "}
                                                    {variant.size ||
                                                    "N/A"}

                                                </p>


                                                <p>

                                                    Color:{" "}
                                                    {variant.color ||
                                                    "N/A"}

                                                </p>


                                                <p>

                                                    Quantity:{" "}
                                                    {variant.quantity}

                                                </p>


                                                {Number(
                                                    variant.additional_price
                                                ) > 0 && (

                                                    <p>

                                                        Additional price:
                                                        {" "}
                                                        ₹
                                                        {variant.additional_price}

                                                    </p>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )}


                        {/* Add to Cart */}

                        <button
                            className="mt-8 w-full bg-black text-white py-3 rounded-lg"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default ProductDetails;