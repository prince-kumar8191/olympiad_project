import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MembershipEditProfile() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        membershipId: "",
        bhayatId: "",
        name: "",
        email: "",
        phone: "",
        roleType: "",
        morcha: "",
        membershipType: "",
        field: "",
        state: "",
        city: "",
        pincode: "",
        photo: "",
        blood_group: "",
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("membership") || "{}");

        setForm({
            membershipId: stored.membershipId || "",
            bhayatId: stored.bhayatId || "",
            name: stored.name || "",
            email: stored.email || "",
            phone: stored.phone || "",
            morcha: stored.morcha || "",
            membershipType: stored.membershipType || "",
            roleType: stored.roleType || "",
            field: stored.field || "",
            state: stored.state || "",
            city: stored.city || "",
            pincode: stored.pincode || "",
            photo: stored.photo || "",
            blood_group: stored.blood_group || "",
        });

        setPreview(stored.photo || "");
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setForm(prev => ({
                    ...prev,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/membership/update/${form.membershipId}`,
                form
            );

            alert(res.data.message);

            localStorage.setItem("membership", JSON.stringify(form));

            navigate("/Membership_profile", { replace: true });

        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 md:p-6 text-white"
            style={{
                background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
                position: "relative",
                overflow: "hidden"
            }}
        >

            <div style={glow1}></div>
            <div style={glow2}></div>

            {/* 🔥 RESPONSIVE WIDTH */}
            <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl w-full max-w-4xl shadow-2xl border border-white/20 relative z-10">

                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6" style={gradientText}>
                    Edit Profile ✨
                </h2>

                {/* IMAGE */}
                <div className="flex flex-col items-center mb-6">

                    <div className="relative group">
                        <img
                            src={preview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                            alt="profile"
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 blur-md opacity-0 group-hover:opacity-60 transition"></div>
                    </div>

                    <label className="mt-4 cursor-pointer">
                        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                        <div className="px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-semibold text-center" style={uploadBtn}>
                            📸 Choose Profile Image
                        </div>
                    </label>

                </div>

                {/* 🔥 RESPONSIVE GRID */}
                <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-4"
                >

                    <div>
                        <label>Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Email</label>
                        <input name="email" value={form.email} onChange={handleChange} className="inputStyle" />
                    </div>


                    <div>
                        <label>Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Bhayat ID</label>
                        <input name="bhayatId" value={form.bhayatId} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Role</label>
                        <input name="roleType" value={form.roleType} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Morcha</label>
                        <input name="morcha" value={form.morcha} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Membership</label>
                        <input name="membershipType" value={form.membershipType} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Field</label>
                        <input name="field" value={form.field} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>State</label>
                        <input name="state" value={form.state} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>District</label>
                        <input name="city" value={form.city} onChange={handleChange} className="inputStyle" />
                    </div>

                    <div>
                        <label>Pincode</label>
                        <input name="pincode" value={form.pincode} onChange={handleChange} className="inputStyle" />
                    </div>

                    <select
                        name="blood_group"
                        value={form.blood_group}
                        onChange={handleChange}
                        className="inputStyle"
                    >
                        <option value="" style={{ color: "black" }}>Select Blood Group</option>
                        <option value="A+" style={{ color: "black" }}>A+</option>
                        <option value="A-" style={{ color: "black" }}>A-</option>
                        <option value="B+" style={{ color: "black" }}>B+</option>
                        <option value="B-" style={{ color: "black" }}>B-</option>
                        <option value="AB+" style={{ color: "black" }}>AB+</option>
                        <option value="AB-" style={{ color: "black" }}>AB-</option>
                        <option value="O+" style={{ color: "black" }}>O+</option>
                        <option value="O-" style={{ color: "black" }}>O-</option>
                    </select>

                    {/* BUTTON */}
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button className="w-full py-3 rounded-xl font-bold hover:scale-105" style={btnStyle}>
                            🚀 Update Profile
                        </button>
                    </div>

                </form>
            </div>

            <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }

        .inputStyle {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          outline: none;
          border: 1px solid rgba(255,255,255,0.2);
          transition: 0.3s;
        }

        .inputStyle:focus {
          border: 1px solid cyan;
          box-shadow: 0 0 10px cyan;
        }
      `}</style>

        </div>
    );
}

/* STYLES SAME */

const glow1 = {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(34,211,238,0.25)",
    filter: "blur(120px)",
    top: "-50px",
    left: "-50px",
    animation: "float 8s infinite",
};

const glow2 = {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(236,72,153,0.25)",
    filter: "blur(120px)",
    bottom: "-50px",
    right: "-50px",
    animation: "float 10s infinite",
};

const gradientText = {
    background: "linear-gradient(90deg, cyan, pink)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
};

const btnStyle = {
    background: "linear-gradient(90deg, #22d3ee, #ec4899)",
};

const uploadBtn = {
    background: "linear-gradient(90deg, #6366f1, #ec4899)",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 0 15px rgba(236,72,153,0.5)"
};