import { useEffect, useState } from "react";
import {
    getSellerProfile,
    updateSellerProfile,
} from "../Services/SellerService";

function Profile() {

    const [formData, setFormData] = useState({
        store_name: "",
        gst_number: "",
        pan_number: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        bank_name: "",
        account_number: "",
        ifsc_code: "",
        status: "",
    });

    const fetchProfile = async () => {
        try {

            const data = await getSellerProfile();

            setFormData(data);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        const loadProfile = async () => {
            await fetchProfile();
        };

        void loadProfile();
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

            await updateSellerProfile(formData);

            alert("Profile Updated Successfully");

        } catch (error) {

            console.log(error.response?.data);

            alert("Unable to update profile");

        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Seller Profile
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow space-y-4"
            >

                <div>

                    <label className="font-semibold">
                        Store Name
                    </label>

                    <input
                        type="text"
                        name="store_name"
                        value={formData.store_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        GST Number
                    </label>

                    <input
                        type="text"
                        value={formData.gst_number}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        PAN Number
                    </label>

                    <input
                        type="text"
                        value={formData.pan_number}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
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
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Address
                    </label>

                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Pincode
                    </label>

                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Bank Name
                    </label>

                    <input
                        type="text"
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Account Number
                    </label>

                    <input
                        type="text"
                        name="account_number"
                        value={formData.account_number}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        IFSC Code
                    </label>

                    <input
                        type="text"
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />

                </div>

                <div>

                    <label className="font-semibold">
                        Status
                    </label>

                    <input
                        type="text"
                        value={formData.status}
                        readOnly
                        className="border p-2 w-full bg-gray-100"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Update Profile
                </button>

            </form>

        </div>

    );

}

export default Profile;