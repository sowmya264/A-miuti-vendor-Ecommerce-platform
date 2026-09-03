import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
    getProduct,
    uploadProductImage,
    deleteProductImage,
} from "../Services/ProductService";

function ProductImages() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [imageFile, setImageFile] = useState(null);

    const [isPrimary, setIsPrimary] = useState(false);

    const [loading, setLoading] = useState(false);

    const fetchProduct = useCallback(async () => {
        try {
            const data = await getProduct(id);
            console.log(data);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            await fetchProduct();
        })();
    }, [fetchProduct]);

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        console.log("Selected file:", file);

        setImageFile(file);

    };

    const handleDelete = async (imageId) => {

        try {

            await deleteProductImage(imageId);

            setProduct((currentProduct) => ({
                ...currentProduct,
                images: currentProduct.images.filter(
                    (image) => image.id !== imageId
                ),
            }));

            alert("Image deleted successfully");

        } catch (error) {

            console.log(
                "Delete image error:",
                error.response?.status
            );

            console.log(
                "Delete image response:",
                error.response?.data
            );

            alert("Unable to delete image");

        }
    };

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!imageFile) {

            alert("Please select an image");

            return;

        }

        try {

            setLoading(true);

            await uploadProductImage(
                id,
                imageFile,
                isPrimary
            );

            alert("Image uploaded successfully");

            setImageFile(null);

            setIsPrimary(false);

            e.target.reset();

            fetchProduct();

        } catch (error) {

            console.log("UPLOAD ERROR:", error);

            console.log("STATUS:", error.response?.status);

            console.log("DATA:", error.response?.data);

            alert(
                JSON.stringify(
                    error.response?.data || error.message
                )
            );

        } finally {

            setLoading(false);

        }

    };

    if (!product) {

        return <p>Loading...</p>;

    }

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Product Images

            </h1>

            <h2 className="text-xl font-semibold mb-4">

                {product.name}

            </h2>

            {/* Upload Form */}

            <form
                onSubmit={handleUpload}
                className="bg-white p-6 rounded shadow mb-8"
            >

                <div className="mb-4">

                    <label className="block font-semibold mb-2">

                        Select Image

                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                </div>

                <div className="mb-4">

                    <label className="flex items-center gap-2">

                        <input
                            type="checkbox"
                            checked={isPrimary}
                            onChange={(e) =>
                                setIsPrimary(e.target.checked)
                            }
                        />

                        Primary Image

                    </label>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                >

                    {loading
                        ? "Uploading..."
                        : "Upload Image"
                    }

                </button>

            </form>

            {/* Existing Images */}

            <h2 className="text-xl font-semibold mb-4">

                Existing Images

            </h2>

            {product.images && product.images.length > 0 ? (

                <div className="grid grid-cols-3 gap-6">

                    {product.images.map((image) => (

                        <div
                            key={image.id}
                            className="bg-white p-4 rounded shadow"
                        >

                            <img
                                src={image.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded"
                            />
                            

                            {image.is_primary && (

                                <p className="text-green-600 font-semibold mt-2">

                                    Primary Image

                                </p>

                            )}
                            <button
                                onClick={() => handleDelete(image.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            ) : (

                <p>

                    No images uploaded yet.

                </p>

            )}

        </div>

    );

}

export default ProductImages;