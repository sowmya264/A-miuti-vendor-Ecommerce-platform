import { useEffect, useState } from "react";
import api from "../Services/api";

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await api.get(
                    "admin/products/"
                );

                console.log(
                    "Admin Products:",
                    response.data
                );

                setProducts(response.data);

            } catch (error) {

                console.log(
                    "Products Error:",
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

                <h1 className="text-3xl font-bold">
                    Manage Products
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

                <h1 className="text-3xl font-bold">
                    Manage Products
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>

            </div>
        );
    }
    const handleStatusChange = async (productId, status) => {
        try {
            await api.patch(
                `admin/products/${productId}/status/`,
                { status: status }
            );

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId
                        ? { ...product, status: status }
                        : product
                )
            );

            alert(`Product ${status.toLowerCase()} successfully`);
        } catch (error) {
            console.error(error);
            alert("Failed to update product status");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Manage Products
                </h1>

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Product
                                </th>

                                <th className="p-4 text-left">
                                    Seller
                                </th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Price
                                </th>

                                <th className="p-4 text-left">
                                    Stock
                                </th>

                                <th className="p-4 text-left">
                                    SKU
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-left">
                                    Active
                                </th>
                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {product.id}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {product.name}
                                    </td>

                                    <td className="p-4">
                                        {product.seller}
                                    </td>

                                    <td className="p-4">
                                        {product.category}
                                    </td>

                                    <td className="p-4">
                                        ₹{product.price}
                                    </td>

                                    <td className="p-4">
                                        {product.stock}
                                    </td>

                                    <td className="p-4">
                                        {product.sku}
                                    </td>

                                    <td className="p-4">

                                        <div className="flex flex-col gap-2">

                                            <span
                                                className={
                                                    product.status === "APPROVED"
                                                        ? "text-green-600 font-semibold"
                                                        : product.status === "REJECTED"
                                                            ? "text-red-600 font-semibold"
                                                            : "text-yellow-600 font-semibold"
                                                }
                                            >
                                                {product.status}
                                            </span>

                                            <div className="flex gap-2">

                                                {product.status !== "APPROVED" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                product.id,
                                                                "APPROVED"
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700"
                                                    >
                                                        Approve
                                                    </button>
                                                )}

                                                {product.status !== "REJECTED" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                product.id,
                                                                "REJECTED"
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                                                    >
                                                        Reject
                                                    </button>
                                                )}

                                            </div>

                                        </div>

                                    </td>

                                    <td className="p-4">
                                        {product.is_active
                                            ? "Yes"
                                            : "No"}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.status === "PENDING" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(product.id, "APPROVED")
                                                    }
                                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(product.id, "REJECTED")
                                                    }
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">
                                                No actions
                                            </span>
                                        )}
</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminProducts;