import { useState } from "react";
import { loginUser } from "../Services/AuthServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(formData);

    console.log("API Response:", data);

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Stored Access:", localStorage.getItem("access"));
    console.log("Stored Refresh:", localStorage.getItem("refresh"));
    console.log("Stored User:", localStorage.getItem("user"));

    alert("Login Successful");

    if (data.user.role === "SELLER") {

        navigate("/dashboard");

    } else if (data.user.role === "CUSTOMER") {

        navigate("/shop");
        
    } else if (data.user.role === "ADMIN") {

    navigate("/admin/dashboard");

    }

  } catch (error) {
    console.error("Error:", error);
    console.error(error.response?.data);

  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          ShopSphere Login
        </h2>

        <form onSubmit={handleSubmit}>

          

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Login
          </button>

        </form>
        <p className="text-center mt-4">
            Don't have a customer account?{" "}

            <button
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold"
            >
                Register
            </button>
        </p>
        

      </div>

    </div>
  );
}

export default Login;