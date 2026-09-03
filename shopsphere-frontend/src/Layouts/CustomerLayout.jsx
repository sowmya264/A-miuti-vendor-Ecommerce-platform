
import { Link, Outlet, useNavigate } from "react-router-dom";

function CustomerLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    ShopSphere
                </h1>

                <div className="flex items-center gap-6">

                    <Link
                        to="/shop"
                        className="hover:text-blue-600"
                    >
                        Shop
                    </Link>

                    <Link
                        to="/cart"
                        className="hover:text-blue-600"
                    >
                        Cart
                    </Link>

                    <Link
                        to="/customer/orders"
                        className="hover:text-blue-600"
                    >
                        My Orders
                    </Link>

                    <Link
                        to="/customer/profile"
                        className="hover:text-blue-600"
                    >
                        Profile
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <main className="p-6">

                <Outlet />

            </main>

        </div>

    );

}

export default CustomerLayout;
