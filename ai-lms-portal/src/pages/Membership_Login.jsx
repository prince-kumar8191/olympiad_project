




import React, { useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaEnvelope, FaLock } from "react-icons/fa";
import { replace, useNavigate } from "react-router-dom";

function MembershipLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/membership/login`,
            form,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        alert(res.data.message);

        if (res.data.success) {
            const user = res.data.user || {};

            // ✅ SAVE FULL USER
            localStorage.setItem("membership", JSON.stringify(user));

            // ✅ MOST IMPORTANT LINE (ye missing tha)
            localStorage.setItem("membershipId", user.membershipId);

            console.log("Saved ID:", user.membershipId); // debug

            // login flags
            localStorage.setItem("membershipLogin", "true");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", "member");

            navigate("/membership_dashboard");
        }

    } catch (error) {
        console.log(error);

        if (error.response?.data?.message) {
            alert(error.response.data.message);
        } else {
            alert("Server Error");
        }
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

                <div className="flex flex-col items-center mb-6">
                    <FaUserGraduate size={45} />
                    <h2 className="text-3xl font-bold mt-3">Membership Login</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block mb-2">Email</label>
                        <div className="flex items-center bg-white/30 rounded-lg px-3">
                            <FaEnvelope className="mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2">Password</label>
                        <div className="flex items-center bg-white/30 rounded-lg px-3">
                            <FaLock className="mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default MembershipLogin;