import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MembershipSignup() {

    const [form, setForm] = useState({
        bhayatId: "",
        name: "",
        roleType: "",
        membershipType: "",
        morcha: "",
        field: "",
        state: "",
        pincode: "",
        city: "",
        email: "",
        password: ""
    });

    const [membershipId, setMembershipId] = useState("");
    const [states, setStates] = useState([]);
    const [loadingCity, setLoadingCity] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        generateId();
        fetchStates();
    }, []);

    const generateId = () => {
        const id = "MBR-" + Date.now().toString().slice(-6);
        setMembershipId(id);
    };

    const fetchStates = async () => {
        try {
            const res = await axios.get(
                "https://countriesnow.space/api/v0.1/countries/states"
            );

            const india = res.data.data.find(c => c.name === "India");

            if (india) {
                setStates(india.states.map(s => s.name));
            }

        } catch (err) {
            console.log("STATE API ERROR:", err);
        }
    };

    useEffect(() => {
        if (form.pincode.length === 6) {
            const fetchCity = async () => {
                try {
                    setLoadingCity(true);

                    const res = await axios.get(
                        `https://api.postalpincode.in/pincode/${form.pincode}`
                    );

                    const postOffice = res.data?.[0]?.PostOffice?.[0];

                    if (postOffice) {
                        setForm(prev => ({
                            ...prev,
                            city: postOffice.District || "",
                            state: postOffice.State || prev.state
                        }));
                    } else {
                        setForm(prev => ({
                            ...prev,
                            city: ""
                        }));
                    }

                } catch (err) {
                    console.log("PINCODE ERROR:", err);
                } finally {
                    setLoadingCity(false);
                }
            };

            fetchCity();
        }
    }, [form.pincode]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.bhayatId ||
            !form.roleType ||
            !form.field ||
            !form.state ||
            !form.pincode ||
            !form.name ||
            !form.city ||
            !form.email ||
            !form.password ||
            !form.membershipType ||
            !form.morcha
        ) {
            alert("⚠️ Please fill all fields");
            return;
        }

        // 🔥 EMAIL VALIDATION (GMAIL ONLY)
        if (!form.email.endsWith("@gmail.com")) {
            alert("⚠️ Only Gmail addresses are allowed (example@gmail.com)");
            return;
        }

        const payload = {
            ...form,
            membershipId,
            joiningDate: new Date().toISOString().split("T")[0]
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/membership/signup`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const { password, ...safeData } = payload;
            localStorage.setItem("membership", JSON.stringify(safeData));

            alert("Membership Created Successfully");

            setForm({
                bhayatId: "",
                name: "",
                roleType: "",
                membershipType: "",
                morcha: "",
                field: "",
                state: "",
                pincode: "",
                city: "",
                email: "",
                password: ""
            });

            generateId();
            navigate("/membership_dashboard");

        } catch (err) {
            console.log(err);

            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Error creating membership");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl w-[750px] text-white shadow-2xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Membership Signup
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-10">

                    <div className="space-y-3">

                        <label>Enter Bhayat ID</label>
                        <input name="bhayatId" onChange={handleChange} className="input" />

                        <label>Membership ID</label>
                        <input value={membershipId} readOnly className="input" />

                        <label>Name</label>
                        <input name="name" onChange={handleChange} className="input" />

                        <label>Email</label>
                        <input name="email" onChange={handleChange} className="input" />

                        <label>Password</label>
                        <input type="password" name="password" onChange={handleChange} className="input" />

                        <label>Role</label>
                        <select name="roleType" onChange={handleChange} className="select">
                            <option value="">Select Role</option>
                            <option>President</option>
                            <option>Vice President</option>
                            <option>Treasurer</option>
                            <option>Secretary</option>
                            <option>Cultural Secretary</option>
                            <option>Member</option>
                        </select>

                    </div>

                    <div className="space-y-3">

                        <label>Membership Type</label>
                        <select name="membershipType" onChange={handleChange} className="select">
                            <option value="">Select Membership</option>
                            <option>Permanent</option>
                            <option>Associate</option>
                            <option>Lifetime</option>
                        </select>

                        <label>Morcha</label>
                        <select name="morcha" onChange={handleChange} className="select">
                            <option value="">Select Morcha</option>
                            <option>Yuva Morcha</option>
                            <option>Mahila Morcha</option>
                            <option>Sanik Morcha</option>
                        </select>

                        <label>Field</label>
                        <input name="field" onChange={handleChange} className="input" />

                        <label>State</label>
                        <select name="state" value={form.state} onChange={handleChange} className="select">
                            <option value="">Select State</option>
                            {states.map((s, i) => (
                                <option key={i} value={s} className="text-black">{s}</option>
                            ))}
                        </select>

                        <label>Pincode</label>
                        <input name="pincode" onChange={handleChange} className="input" />

                        <label>District</label>
                        <input value={loadingCity ? "Fetching..." : form.city} readOnly className="input" />

                    </div>

                    <div className="col-span-2 mt-4">
                        <button className="w-full bg-green-500 p-3 rounded font-bold hover:bg-green-600 transition">
                            Submit
                        </button>
                    </div>

                </form>
            </div>

            <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          outline: none;
        }

        .select {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.2);
          color: black;
        }
      `}</style>

        </div>
    );
}