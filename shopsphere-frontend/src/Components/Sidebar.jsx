import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="w-64 bg-white shadow-lg min-h-screen">

      <h2 className="text-2xl font-bold p-5">
        Seller
      </h2>

      <nav className="flex flex-col">

        <Link
          className="p-4 hover:bg-gray-100"
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="p-4 hover:bg-gray-100"
          to="/products"
        >
          Products
        </Link>

        <Link
          className="p-4 hover:bg-gray-100"
          to="/profile"
        >
          Profile
        </Link>

        <Link
            to="/orders"
            className="p-4 hover:bg-gray-100"
        >
            Orders
        </Link>
        <button
            onClick={handleLogout}
            className="p-4 hover:bg-gray-100 text-left"
        >
            Logout
        </button>

      </nav>

    </div>

  );

}

export default Sidebar;