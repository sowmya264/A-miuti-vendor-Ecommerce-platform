import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../Components/ProductForm";

import {
    getProduct,
    updateProduct,
    getCategories,
} from "../Services/ProductService";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({

        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        sku: "",
        category: "",

    });

    const fetchCategories = useCallback(async () => {

        try {

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.log(error);

        }

    }, []);

    const fetchProduct = useCallback(async () => {

        try {

            const data = await getProduct(id);

            setFormData({

                name: data.name,
                slug: data.slug,
                description: data.description,
                price: data.price,
                stock: data.stock,
                brand: data.brand,
                sku: data.sku,
                category: data.category,

            });

        } catch (error) {

            console.log(error);

        }

    }, [id]);

    useEffect(() => {

        const loadProductData = async () => {

            await fetchCategories();
            await fetchProduct();

        };

        void loadProductData();

    }, [fetchCategories, fetchProduct]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateProduct(id, formData);

            alert("Product Updated Successfully");

            navigate("/products");

        } catch (error) {

            console.log(error.response?.data);

            alert("Unable to update product");

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Edit Product

            </h1>

            <ProductForm
                formData={formData}
                categories={categories}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText="Update Product"
            />

        </div>

    );

}

export default EditProduct;