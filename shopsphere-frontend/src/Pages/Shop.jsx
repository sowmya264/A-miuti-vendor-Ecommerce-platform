import { useEffect, useState } from "react";
import { getProducts } from "../Services/ProductService";
import { useNavigate } from "react-router-dom";


function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();


    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts();

                console.log("Customer Products:", data);

                setProducts(data);

            } catch (error) {

                console.log(
                    "Products error:",
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

                <p>
                    Loading products...
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


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        ShopSphere Shop
                    </h1>

                    <button
                        onClick={() => navigate("/cart")}
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Cart
                    </button>

                </div>


                {products.length === 0 ? (

                    <div className="bg-white p-6 rounded-lg shadow">

                        <p className="text-gray-500">
                            No products available.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.map((product) => (

                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow overflow-hidden"
                            >

                                {product.primary_image && (

                                    <img
                                        src={product.primary_image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />

                                )}


                                <div className="p-4">

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

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}


export default Shop;