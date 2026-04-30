

import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminVolunteers() {
    const [volunteers, setVolunteers] = useState([]);
    const [filteredVolunteers, setFilteredVolunteers] = useState([]);

    const [stateFilter, setStateFilter] = useState("");
    const [cityFilter, setCityFilter] = useState("");

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
        "Chhattisgarh", "Goa", "Gujarat", "Haryana",
        "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh",
        "Lakshadweep", "Puducherry"
    ].sort();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/volunteers`)
            .then(res => {
                const data = res.data.data || [];
                setVolunteers(data);
                setFilteredVolunteers(data);
            })
            .catch(err => {
                console.error("ERROR:", err);
            });
    }, []);

    useEffect(() => {
        let filtered = volunteers;

        if (stateFilter) {
            filtered = filtered.filter(v =>
                (v.state || v.state_name || "")
                    .toLowerCase()
                    .includes(stateFilter.toLowerCase())
            );
        }

        if (cityFilter) {
            filtered = filtered.filter(v =>
                (v.city || v.city_name || "")
                    .toLowerCase()
                    .includes(cityFilter.toLowerCase())
            );
        }

        setFilteredVolunteers(filtered);
    }, [stateFilter, cityFilter, volunteers]);

    return (
        <div
            className="min-h-screen p-6 text-white"
            style={{
                background: "linear-gradient(135deg, #07111f, #0b1f36, #102944)",
                position: "relative"
            }}
        >

            {/* Glow Effects */}
            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(0,255,255,0.15)",
                filter: "blur(120px)",
                top: "-50px",
                left: "-50px"
            }} />

            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(255,0,150,0.15)",
                filter: "blur(120px)",
                bottom: "-50px",
                right: "-50px"
            }} />

            <h2 className="text-3xl font-bold mb-6 text-center"
                style={{
                    background: "linear-gradient(90deg, #00f5ff, #ff00c8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                🚀 Volunteers Dashboard
            </h2>

            {/* FILTER */}
            <div
                className="flex flex-wrap gap-4 mb-6 p-4 rounded-2xl"
                style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.12)"
                }}
            >

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="p-3 rounded-xl outline-none"
                    style={inputStyle}
                >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter City"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="p-3 rounded-xl"
                    style={inputStyle}
                />

                <button
                    onClick={() => {
                        setStateFilter("");
                        setCityFilter("");
                    }}
                    className="px-5 py-2 rounded-xl font-semibold transition"
                    style={{
                        background: "linear-gradient(135deg,#00f5ff,#ff00c8)",
                        color: "#000"
                    }}
                >
                    Clear
                </button>
            </div>

            {/* TABLE */}
            <div
                className="rounded-2xl overflow-auto"
                style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.12)"
                }}
            >

                <table className="w-full text-center min-w-[700px]">

                    <thead>
                        <tr style={{
                            background: "rgba(255,255,255,0.1)"
                        }}>
                            <th className="p-4">Name</th>
                            <th>Volunteer ID</th>
                            <th>Phone</th>
                            <th>State</th>
                            <th>District</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredVolunteers.length > 0 ? (
                            filteredVolunteers.map((v, index) => (
                                <tr
                                    key={index}
                                    style={rowStyle}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(0,255,255,0.08)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "rgba(255,255,255,0.02)";
                                    }}
                                >
                                    <td className="p-4 text-white">
                                        {v.name || v.volunteer_name || "-"}
                                    </td>
                                    <td>{v.volunteerId || v.VolunteerId || "-"}</td>
                                    <td>{v.mobile || v.phone || "-"}</td>
                                    <td className="text-cyan-300">
                                        {v.state || v.state_name || "-"}
                                    </td>
                                    <td className="text-pink-300">
                                        {v.city || v.city_name || "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-gray-400">
                                    No Volunteers Found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminVolunteers;


// ================= STYLES =================

const inputStyle = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#fff"
};

const rowStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
    transition: "0.3s"
};