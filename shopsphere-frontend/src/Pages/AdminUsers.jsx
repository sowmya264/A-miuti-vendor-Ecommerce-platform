import { useEffect, useState } from "react";
import api from "../Services/api";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response = await api.get(
                    "admin/users/"
                );

                console.log(
                    "Admin Users:",
                    response.data
                );

                setUsers(response.data);

            } catch (error) {

                console.log(
                    "Users Error:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load users"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchUsers();

    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>

                <p className="mt-4">
                    Loading users...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>

                <p className="text-red-600 mt-4">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Manage Users
                </h1>

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">
                                    ID
                                </th>

                                <th className="p-4 text-left">
                                    Username
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Role
                                </th>

                                <th className="p-4 text-left">
                                    Active
                                </th>

                                <th className="p-4 text-left">
                                    Verified
                                </th>

                                <th className="p-4 text-left">
                                    Created
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-t"
                                >

                                    <td className="p-4">
                                        {user.id}
                                    </td>

                                    <td className="p-4 font-semibold">
                                        {user.username}
                                    </td>

                                    <td className="p-4">
                                        {user.email}
                                    </td>

                                    <td className="p-4">
                                        {user.role}
                                    </td>

                                    <td className="p-4">
                                        {user.is_active
                                            ? "Yes"
                                            : "No"}
                                    </td>

                                    <td className="p-4">
                                        {user.is_verified
                                            ? "Yes"
                                            : "No"}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminUsers;