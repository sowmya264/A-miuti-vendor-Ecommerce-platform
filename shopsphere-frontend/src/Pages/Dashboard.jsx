import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSellerOrders } from "../Services/orderservice";
import { getSellerDashboard } from "../Services/SellerService";
import {
    getSellerProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../Services/ProductService";
function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleViewProduct = async (productId) => {

        try {

            const data = await getProductById(productId);

            console.log("Selected product:", data);

            setSelectedProduct(data);

        } catch (error) {

            console.log(
                "View product error:",
                error.response?.data || error.message
            );

        }

    };
    const handleEditProduct = (product) => {

        setEditingProduct(product);

        setSelectedProduct(null);

    };
    const handleUpdateProduct = async (e) => {

        e.preventDefault();

        try {

            const productData = {
                name: editingProduct.name,
                slug: editingProduct.slug,
                description: editingProduct.description,
                price: Number(editingProduct.price),
                stock: Number(editingProduct.stock),
                brand: editingProduct.brand,
                sku: editingProduct.sku,
                category: editingProduct.category,
                is_active: editingProduct.is_active,
            };

            const updatedProduct = await updateProduct(
                editingProduct.id,
                productData
            );

            console.log(
                "Updated product:",
                updatedProduct
            );

            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === updatedProduct.id
                        ? updatedProduct
                        : product
                )
            );

            setEditingProduct(null);

            alert("Product updated successfully");

        } catch (error) {

            console.log(
                "Update product error:",
                error.response?.data || error.message
            );

            alert(
                JSON.stringify(
                    error.response?.data ||
                    "Unable to update product"
                )
            );

        }

    };

    const handleDeleteProduct = async (productId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProduct(productId);

            alert("Product deleted successfully");

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.id !== productId
                )
            );

        } catch (error) {

            console.log(
                "Delete product error:",
                error.response?.data || error.message
            );

            alert("Unable to delete product");

        }

    };

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const dashboardData = await getSellerDashboard();

                console.log(
                    "Dashboard data:",
                    dashboardData
                );

                setDashboard(dashboardData);

            } catch (error) {

                console.log(
                    "Dashboard error:",
                    error.response?.data || error.message
                );

            }

        };

        const fetchProducts = async () => {

            try {

                const productData = await getSellerProducts();

                console.log(
                    "Products:",
                    productData
                );

                setProducts(productData);

            } catch (error) {

                console.log(
                    "Products error:",
                    error.response?.data || error.message
                );

            }

        };
        const fetchOrders = async () => {

            try {

                const data = await getSellerOrders();

                console.log(
                    "Dashboard orders:",
                    data
                );

                setOrders(data);

            } catch (error) {

                console.log(
                    "Dashboard orders error:",
                    error.response?.data || error.message
                );

            }

        };
        

        fetchDashboard();
        fetchProducts();
        fetchOrders();

    }, []);

    if (!dashboard) {
        return <h2 className="p-10">Loading...</h2>;
    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Welcome, {dashboard.seller_name}
            </h1>

            <div className="grid grid-cols-4 gap-5">

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Total Products</h2>
                    <p>
                        {dashboard?.total_products ?? 0}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Total Orders</h2>
                    <p className="text-3xl font-bold mt-3">
                        {orders.length}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Pending Orders</h2>
                    <p className="text-3xl font-bold mt-3">
                        {dashboard.pending_orders}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2>Total Sales</h2>
                    <p className="text-3xl font-bold mt-3">
                        ₹ {dashboard.total_sales}
                    </p>
                </div>

            </div>
            <div className="bg-white p-6 rounded-lg shadow mt-8">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-semibold">
                        My Products
                    </h2>

                </div>


                {products.length === 0 ? (

                    <p className="text-gray-500">
                        No products found.
                    </p>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full border">

                            <thead>

                                <tr className="bg-gray-100">

                                    <th className="border p-3 text-left">
                                        ID
                                    </th>

                                    <th className="border p-3 text-left">
                                        Product Name
                                    </th>

                                    <th className="border p-3 text-left">
                                        Price
                                    </th>

                                    <th className="border p-3 text-left">
                                        Stock
                                    </th>

                                    <th className="border p-3 text-left">
                                        Status
                                    </th>
                                    <th className="border p-3 text-left">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {products.map((product) => (

                                    <tr key={product.id}>

                                        <td className="border p-3">
                                            {product.id}
                                        </td>

                                        <td className="border p-3">
                                            {product.name}
                                        </td>

                                        <td className="border p-3">
                                            ₹{product.price}
                                        </td>

                                        <td className="border p-3">
                                            {product.stock}
                                        </td>

                                        <td className="border p-3">
                                            {product.status}
                                        </td>
                                        <td className="border p-3">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        handleViewProduct(product.id)
                                                    }
                                                    className="bg-blue-600 text-white px-3 py-1 rounded"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleEditProduct(product)
                                                    }
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(product.id)
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/products/${product.id}/images`)
                                                    }
                                                    className="bg-purple-600 text-white px-3 py-1 rounded"
                                                >
                                                    Images
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/products/${product.id}/variants`)
                                                    }
                                                    className="bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    Variants
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}
                {selectedProduct && (

                    <div className="mt-8 bg-gray-50 p-6 rounded-lg">

                        <h2 className="text-xl font-semibold mb-4">
                            Product Details
                        </h2>

                        <p>
                            <strong>Name:</strong>{" "}
                            {selectedProduct.name}
                        </p>

                        <p>
                            <strong>Description:</strong>{" "}
                            {selectedProduct.description}
                        </p>

                        <p>
                            <strong>Price:</strong>{" "}
                            ₹{selectedProduct.price}
                        </p>

                        <p>
                            <strong>Stock:</strong>{" "}
                            {selectedProduct.stock}
                        </p>

                        <p>
                            <strong>SKU:</strong>{" "}
                            {selectedProduct.sku}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedProduct.status}
                        </p>

                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>

                    </div>

                )}

            </div>
            {editingProduct && (

                <div className="mt-8 bg-gray-50 p-6 rounded-lg">

                    <h2 className="text-xl font-semibold mb-6">
                        Edit Product
                    </h2>

                    <form onSubmit={handleUpdateProduct}>

                        {/* Product Name */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Product Name
                            </label>

                            <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Slug */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Slug
                            </label>

                            <input
                                type="text"
                                value={editingProduct.slug}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        slug: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Description */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Description
                            </label>

                            <textarea
                                value={editingProduct.description}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                                rows="4"
                            />

                        </div>


                        {/* Price */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        price: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Stock */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Stock
                            </label>

                            <input
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        stock: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Brand */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Brand
                            </label>

                            <input
                                type="text"
                                value={editingProduct.brand || ""}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        brand: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* SKU */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                SKU
                            </label>

                            <input
                                type="text"
                                value={editingProduct.sku}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        sku: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Category */}

                        <div className="mb-4">

                            <label className="block font-semibold mb-2">
                                Category ID
                            </label>

                            <input
                                type="number"
                                value={editingProduct.category}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        category: e.target.value
                                    })
                                }
                                className="w-full border p-2 rounded"
                            />

                        </div>


                        {/* Active */}

                        <div className="mb-6">

                            <label className="flex items-center gap-2">

                                <input
                                    type="checkbox"
                                    checked={editingProduct.is_active}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            is_active: e.target.checked
                                        })
                                    }
                                />

                                Active

                            </label>

                        </div>


                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-5 py-2 rounded"
                            >
                                Update Product
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setEditingProduct(null)
                                }
                                className="bg-gray-500 text-white px-5 py-2 rounded"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}

                        

        </div>

    );
}

export default Dashboard;