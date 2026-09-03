import { useEffect, useState } from "react";

import { getProducts } from "../Services/ProductService";

import { useNavigate } from "react-router-dom";


function CustomerProducts() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts();

                console.log(
                    "Customer Products:",
                    data
                );

                setProducts(data);

            } catch (error) {

                console.log(
                    "Customer Products Error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load products"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);


    if (loading) {

        return (
            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Shop
                </h1>

                <p className="mt-4">
                    Loading products...
                </p>

            </div>
        );

    }


    if (error) {

        return (
            <div className="p-6">

                <h1 className="text-2xl font-bold">
                    Shop
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>

            </div>
        );

    }


    return (

        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Shop
            </h1>


            {products.length === 0 ? (

                <div className="bg-white p-6 rounded-lg shadow">

                    <p className="text-gray-500">
                        No products available.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow p-4"
                        >

                            <h2 className="text-lg font-semibold">
                                {product.name}
                            </h2>


                            <p className="text-gray-500 mt-2">
                                {product.brand}
                            </p>


                            <p className="text-xl font-bold mt-3">
                                ₹{product.price}
                            </p>


                            <p className="text-sm text-gray-500 mt-2">
                                Stock: {product.stock}
                            </p>


                            <button
                                onClick={() =>
                                    navigate(
                                        `/shop/products/${product.id}`
                                    )
                                }
                                className="mt-4 w-full bg-black text-white py-2 rounded"
                            >
                                View Product
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default CustomerProducts;