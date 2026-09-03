import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}

            <aside className="w-64 bg-white shadow-lg min-h-screen">

                <h1 className="text-2xl font-bold p-5 border-b">
                    ShopSphere
                </h1>

                <p className="px-5 py-4 text-gray-500 font-semibold">
                    Admin Panel
                </p>

                <nav className="flex flex-col">

                    <Link
                        to="/admin/dashboard"
                        className="p-4 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/users"
                        className="p-4 hover:bg-gray-100"
                    >
                        Users
                    </Link>
                    <Link
                        to="/admin/sellers"
                        className="p-4 hover:bg-gray-100"
                    >
                        Sellers
                    </Link>
                    <Link
                        to="/admin/products"
                        className="p-4 hover:bg-gray-100"
                    >
                        Products
                    </Link>
                    <Link to="/admin/orders" className="p-4 hover:bg-gray-100">
                        Orders
                    </Link>
                    <Link
                        to="/admin/categories"
                        className="p-4 hover:bg-gray-100"
                    >
                        Categories
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="p-4 hover:bg-gray-100 text-left text-red-600"
                    >
                        Logout
                    </button>

                </nav>

            </aside>


            {/* MAIN CONTENT */}

            <main className="flex-1">

                <Outlet />

            </main>

        </div>
    );
}

export default AdminLayout;