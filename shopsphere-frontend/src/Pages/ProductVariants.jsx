import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
    getProduct,
    createProductVariant,
    updateProductVariant,
    deleteProductVariant,
} from "../Services/ProductService";

function ProductVariants() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [additionalPrice, setAdditionalPrice] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [editingVariantId, setEditingVariantId] = useState(null);
    

    const [loading, setLoading] = useState(false);

    const fetchProduct = useCallback(async () => {

        try {

            const data = await getProduct(id);

            console.log("Product:", data);

            setProduct(data);

        } catch (error) {

            console.log("FETCH PRODUCT ERROR:", error);

        }

    }, [id]);
    const handleEdit = (variant) => {

        setEditingVariantId(variant.id);

        setSize(variant.size || "");
        setColor(variant.color || "");
        setQuantity(variant.quantity);
        setAdditionalPrice(variant.additional_price);
        setIsActive(variant.is_active);

    };
    const handleDelete = async (variantId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this variant?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProductVariant(variantId);

            alert("Variant deleted successfully");

            fetchProduct();

        } catch (error) {

            console.log("DELETE VARIANT ERROR:", error);

            console.log(
                "ERROR DATA:",
                error.response?.data
            );

            alert("Unable to delete variant");

        }

    };

    useEffect(() => {

        const loadProduct = async () => {
            await fetchProduct();
        };

        loadProduct();

    }, [id, fetchProduct]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const variantData = {
                product: Number(id),
                size: size,
                color: color,
                quantity: Number(quantity),
                additional_price: Number(additionalPrice),
                is_active: isActive,
            };

            console.log("Variant data:", variantData);

            let data;

            if (editingVariantId) {

                data = await updateProductVariant(
                    editingVariantId,
                    variantData
                );

            } else {

                data = await createProductVariant(
                    variantData
                );

            }

            console.log("Created variant:", data);

            alert(
                editingVariantId
                    ? "Variant updated successfully"
                    : "Variant added successfully"
            );
            

            setSize("");
            setColor("");
            setQuantity("");
            setAdditionalPrice("");
            setIsActive(true);
            setEditingVariantId(null);

            fetchProduct();

        } catch (error) {

            console.log("VARIANT ERROR:", error);

            console.log(
                "ERROR DATA:",
                error.response?.data
            );

            alert(
                JSON.stringify(
                    error.response?.data ||
                    error.message
                )
            );

        } finally {

            setLoading(false);

        }

    };
    

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Product Variants
            </h1>

            <p className="mb-6">
                Product ID: {id}
            </p>

            <div className="bg-white p-6 rounded shadow max-w-xl">

                <h2 className="text-xl font-semibold mb-6">
                    Add Variant
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Size */}

                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Size
                        </label>

                        <input
                            type="text"
                            value={size}
                            onChange={(e) =>
                                setSize(e.target.value)
                            }
                            placeholder="Example: 15 inch"
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* Color */}

                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Color
                        </label>

                        <input
                            type="text"
                            value={color}
                            onChange={(e) =>
                                setColor(e.target.value)
                            }
                            placeholder="Example: Black"
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* Quantity */}

                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Quantity
                        </label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(e.target.value)
                            }
                            min="0"
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* Additional Price */}

                    <div className="mb-4">

                        <label className="block font-semibold mb-2">
                            Additional Price
                        </label>

                        <input
                            type="number"
                            value={additionalPrice}
                            onChange={(e) =>
                                setAdditionalPrice(e.target.value)
                            }
                            min="0"
                            step="0.01"
                            placeholder="Example: 500"
                            className="w-full border p-2 rounded"
                        />

                    </div>

                    {/* Active */}

                    <div className="mb-6">

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) =>
                                    setIsActive(
                                        e.target.checked
                                    )
                                }
                            />

                            Active

                        </label>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        {loading
                            ? "Saving..."
                            : editingVariantId
                                ? "Update Variant"
                                : "Add Variant"
                        }
                    </button>

                </form>

            </div>
            



    <div className="bg-white p-6 rounded shadow mt-8">

        <h2 className="text-xl font-semibold mb-6">
            Existing Variants
        </h2>

        {product && product.variants && product.variants.length > 0 ? (

            <div className="overflow-x-auto">

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border p-3 text-left">
                                Size
                            </th>

                            <th className="border p-3 text-left">
                                Color
                            </th>

                            <th className="border p-3 text-left">
                                Quantity
                            </th>

                            <th className="border p-3 text-left">
                                Additional Price
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

                        {product.variants.map((variant) => (

                            <tr key={variant.id}>

                                <td className="border p-3">
                                    {variant.size || "-"}
                                </td>

                                <td className="border p-3">
                                    {variant.color || "-"}
                                </td>

                                <td className="border p-3">
                                    {variant.quantity}
                                </td>

                                <td className="border p-3">
                                    ₹{variant.additional_price}
                                </td>

                                <td className="border p-3">

                                    {variant.is_active
                                        ? "Active"
                                        : "Inactive"
                                    }

                                </td>
                                <td className="border p-3">

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => handleEdit(variant)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(variant.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        ) : (

            <p className="text-gray-600">
                No variants added yet.
            </p>

        )}

    </div>

        </div>

    );
}

export default ProductVariants;