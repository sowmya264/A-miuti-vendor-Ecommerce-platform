import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../Services/AuthServices";

function CustomerRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await registerCustomer(formData);

            alert("Customer Registration Successful");

            navigate("/");

        } catch (error) {

            console.log(
                "Registration error:",
                error.response?.data
            );

            setError(
                error.response?.data ||
                "Unable to register"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Customer Registration
                </h2>


                {error && (

                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

                        {typeof error === "object"
                            ? JSON.stringify(error)
                            : error
                        }

                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded mb-4"
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded mb-4"
                    />


                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded mb-4"
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border p-3 rounded mb-6"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>

                </form>


                <p className="text-center mt-4">

                    Already have an account?{" "}

                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-600 font-semibold"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>

    );

}


export default CustomerRegister;