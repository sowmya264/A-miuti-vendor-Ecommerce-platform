import { useEffect, useState } from "react";
import api from "../Services/api";

function CustomerProfile() {

    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        date_of_birth: "",
        gender: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get(
                    "users/customer/profile/"
                );

                console.log("Customer Profile:", response.data);

                setProfile(response.data);

                setFormData({
                    username: response.data.username || "",
                    email: response.data.email || "",
                    phone: response.data.phone || "",
                    date_of_birth:
                        response.data.date_of_birth || "",
                    gender: response.data.gender || "",
                });

            } catch (error) {

                console.log(
                    "Customer profile error:",
                    error.response?.data ||
                    error.message
                );

                setError("Unable to load profile");

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const response = await api.put(
                "users/customer/profile/",
                formData
            );

            console.log(
                "Updated Profile:",
                response.data
            );

            setProfile(response.data);

            alert("Profile updated successfully");

        } catch (error) {

            console.log(
                "Profile update error:",
                error.response?.data ||
                error.message
            );

            alert("Unable to update profile");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div className="p-6">
                <p>Loading profile...</p>
            </div>
        );

    }

    if (error) {

        return (
            <div className="p-6">
                <p className="text-red-600">
                    {error}
                </p>
            </div>
        );

    }

    return (

        <div className="max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                My Profile
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow space-y-5"
            >

                <div>

                    <label className="font-semibold">
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="border p-3 w-full rounded mt-2"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 w-full rounded mt-2"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-3 w-full rounded mt-2"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="border p-3 w-full rounded mt-2"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Gender
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="border p-3 w-full rounded mt-2"
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>

                {profile?.loyalty_points !== undefined && (

                    <div className="bg-gray-100 p-4 rounded">

                        <p className="font-semibold">
                            Loyalty Points
                        </p>

                        <p className="text-2xl font-bold mt-1">
                            {profile.loyalty_points}
                        </p>

                    </div>

                )}

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-3 rounded disabled:bg-gray-400"
                >

                    {saving
                        ? "Saving..."
                        : "Update Profile"
                    }

                </button>

            </form>

        </div>

    );

}

export default CustomerProfile;
