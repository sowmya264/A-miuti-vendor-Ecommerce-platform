import { useEffect, useState } from "react";
import api from "../Services/api";

function AdminCategories() {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingDescription, setEditingDescription] = useState("");

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await api.get(
                    "admin/categories/"
                );

                setCategories(response.data);

            } catch (error) {

                console.error(error);
                alert("Failed to load categories");

            } finally {

                setLoading(false);

            }
        };

        fetchCategories();

    }, []);
    const handleUpdateCategory = async (categoryId) => {
        try {
            const response = await api.patch(
                `admin/categories/${categoryId}/`,
                {
                    category_name: editingName,
                    description: editingDescription
                }
            );

            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === categoryId
                        ? {
                            ...category,
                            ...response.data
                        }
                        : category
                )
            );

            setEditingId(null);
            setEditingName("");
            setEditingDescription("");

            alert("Category updated successfully");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.error ||
                "Failed to update category"
            );
        }
    };

    const handleCreateCategory = async (e) => {

        e.preventDefault();

        if (!categoryName.trim()) {
            alert("Category name is required");
            return;
        }

        try {

            setCreating(true);

            const response = await api.post(
                "admin/categories/",
                {
                    category_name: categoryName,
                    description: description
                }
            );

            setCategories((prevCategories) => [
                response.data,
                ...prevCategories
            ]);

            setCategoryName("");
            setDescription("");

            alert("Category created successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.error ||
                "Failed to create category"
            );

        } finally {

            setCreating(false);

        }
    };

    if (loading) {

        return (
            <div className="p-8">

                <h2 className="text-2xl font-bold">
                    Loading categories...
                </h2>

            </div>
        );

    }

    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Categories
            </h1>

            {/* Create Category */}

            <div className="bg-white shadow rounded-lg p-6 mb-8">

                <h2 className="text-xl font-bold mb-4">
                    Create Category
                </h2>

                <form
                    onSubmit={handleCreateCategory}
                    className="space-y-4"
                >

                    <div>

                        <label className="block font-semibold mb-1">
                            Category Name
                        </label>

                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                            placeholder="Enter category name"
                            className="border rounded px-3 py-2 w-full"
                        />

                    </div>

                    <div>

                        <label className="block font-semibold mb-1">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter category description"
                            className="border rounded px-3 py-2 w-full"
                            rows="3"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={creating}
                        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {creating
                            ? "Creating..."
                            : "Create Category"}
                    </button>

                </form>

            </div>

            {/* Category List */}

            <div className="bg-white shadow rounded-lg overflow-x-auto">

                <h2 className="text-xl font-bold p-6 pb-3">
                    All Categories
                </h2>

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-6 py-3 text-left">
                                ID
                            </th>

                            <th className="px-6 py-3 text-left">
                                Category Name
                            </th>

                            <th className="px-6 py-3 text-left">
                                Slug
                            </th>

                            <th className="px-6 py-3 text-left">
                                Description
                            </th>

                            <th className="px-6 py-3 text-left">
                                Active
                            </th>

                            <th className="px-6 py-3 text-left">
                                Created At
                            </th>
                            <th className="px-6 py-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {categories.map((category) => (

                            <tr
                                key={category.id}
                                className="border-t"
                            >

                                <td className="px-6 py-4">
                                    {category.id}
                                </td>

                               <td className="px-6 py-4">

                                    {editingId === category.id ? (
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) =>
                                                setEditingName(e.target.value)
                                            }
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        category.category_name
                                    )}

                                </td>

                                <td className="px-6 py-4">
                                    {category.slug}
                                </td>

                                <td className="px-6 py-4">

                                    {editingId === category.id ? (
                                        <input
                                            type="text"
                                            value={editingDescription}
                                            onChange={(e) =>
                                                setEditingDescription(e.target.value)
                                            }
                                            className="border rounded px-2 py-1"
                                        />
                                    ) : (
                                        category.description || "-"
                                    )}

                                </td>

                                <td className="px-6 py-4">
                                    {category.is_active
                                        ? "Yes"
                                        : "No"}
                                </td>

                                <td className="px-6 py-4">
                                    {new Date(
                                        category.created_at
                                    ).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">

                                    {editingId === category.id ? (
                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    handleUpdateCategory(category.id)
                                                }
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="bg-gray-500 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>

                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditingId(category.id);
                                                setEditingName(category.category_name);
                                                setEditingDescription(
                                                    category.description || ""
                                                );
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {categories.length === 0 && (

                    <p className="p-6 text-gray-500">
                        No categories found.
                    </p>

                )}

            </div>

        </div>
    );
}

export default AdminCategories;