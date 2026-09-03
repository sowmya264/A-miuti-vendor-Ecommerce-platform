import { useEffect, useState } from "react";
import { getCategories, createProduct } from "../Services/ProductService";
import { useNavigate } from "react-router-dom";
import ProductForm from "../Components/ProductForm";

function AddProduct() {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        sku: "",
        category: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log("submit button clicked");

        try {

            await createProduct(formData);

            alert("Product Added Successfully");

            navigate("/products");

        }

        catch (error) {

            console.log(error.response.data);

            alert("Unable to add product");

        }

    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                console.log(data);
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Add Product

            </h1>

            <ProductForm
                formData={formData}
                categories={categories}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText="Save Product"
            />

            

        </div>

    );

}

export default AddProduct;