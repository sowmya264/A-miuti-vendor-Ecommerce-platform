
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login and Registration
import Login from "./Pages/Login";
import CustomerRegister from "./Pages/CustomerRegister";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/AdminUsers";
import AdminLayout from "./Layouts/AdminLayout";
import AdminSellers from "./Pages/AdminSellers";
import AdminProducts from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import AdminOrderDetails from "./Pages/AdminOrderDetails";
import AdminCategories from "./Pages/AdminCategories";

// Seller
import Dashboard from "./Pages/Dashboard";
import SellerLayout from "./Layouts/SellerLayout";
import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import Profile from "./Pages/Profile";
import ProductImages from "./Pages/ProductImages";
import ProductVariants from "./Pages/ProductVariants";
import SellerOrders from "./Pages/SellerOrders";
import ProductDetails from "./Pages/ProductDetails";

// Customer
import CustomerLayout from "./Layouts/CustomerLayout";
import Shop from "./Pages/Shop";
import CustomerProductDetails from "./Pages/CustomerProductDetails";
import Cart from "./Pages/Cart";
import CustomerOrders from "./Pages/CustomerOrders";
import CustomerOrderDetails from "./Pages/CustomerOrderDetails";
import CustomerProfile from "./Pages/CustomerProfile";

// Route Protection
import ProtectedRoute from "./Components/ProtectedRoute";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==================== */}
                {/* PUBLIC ROUTES */}
                {/* ==================== */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<CustomerRegister />}
                />


                {/* ==================== */}
                {/* SELLER ROUTES */}
                {/* ==================== */}

                <Route
                    element={
                        <ProtectedRoute allowedRole="SELLER" />
                    }
                >

                    <Route element={<SellerLayout />}>

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/products"
                            element={<Products />}
                        />

                        <Route
                            path="/products/add"
                            element={<AddProduct />}
                        />

                        <Route
                            path="/products/edit/:id"
                            element={<EditProduct />}
                        />

                        <Route
                            path="/products/:id/images"
                            element={<ProductImages />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/products/:id/variants"
                            element={<ProductVariants />}
                        />

                        <Route
                            path="/orders"
                            element={<SellerOrders />}
                        />

                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />

                    </Route>

                </Route>


                {/* ==================== */}
                {/* CUSTOMER ROUTES */}
                {/* ==================== */}

                <Route
                    element={
                        <ProtectedRoute allowedRole="CUSTOMER" />
                    }
                >

                    <Route element={<CustomerLayout />}>

                        <Route
                            path="/shop"
                            element={<Shop />}
                        />

                        <Route
                            path="/shop/products/:id"
                            element={<CustomerProductDetails />}
                        />

                        <Route
                            path="/cart"
                            element={<Cart />}
                        />

                        <Route
                            path="/customer/orders"
                            element={<CustomerOrders />}
                        />

                        <Route
                            path="/customer/orders/:id"
                            element={<CustomerOrderDetails />}
                        />

                        <Route
                            path="/customer/profile"
                            element={<CustomerProfile />}
                        />

                    </Route>

                </Route>
                {/* ==================== */}
                {/* ADMIN ROUTES */}
                {/* ==================== */}

                <Route
                    element={
                        <ProtectedRoute allowedRole="ADMIN" />
                    }
                >
                    <Route element={<AdminLayout />}>

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/users"
                            element={<AdminUsers />}
                        />
                        <Route
                            path="/admin/sellers"
                            element={<AdminSellers />}
                        />
                        <Route
                            path="/admin/products"
                            element={<AdminProducts />}
                        />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                        <Route
                            path="/admin/orders/:orderId"
                            element={<AdminOrderDetails />}
                        />
                        <Route
                            path="/admin/categories"
                            element={<AdminCategories />}
                        />

                    </Route>
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;