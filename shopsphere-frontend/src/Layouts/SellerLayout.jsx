import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

function SellerLayout() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    if (!user) {

        return <Navigate to="/" replace />;

    }


    if (user.role !== "SELLER") {

        return <Navigate to="/shop" replace />;

    }


    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100">

                <div className="bg-blue-700 text-white p-5 text-2xl font-bold">
                    ShopSphere Seller Dashboard
                </div>

                <div className="p-6">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}

export default SellerLayout;