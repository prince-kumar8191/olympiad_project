

import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminCoordinators() {
    const [coordinators, setCoordinators] = useState([]);
    const [filteredCoordinators, setFilteredCoordinators] = useState([]);

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

    // 🔥 FETCH
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/admin/coordinators`)
            .then(res => {
                const data = res.data.data || [];
                setCoordinators(data);
                setFilteredCoordinators(data);
            })
            .catch(err => console.error(err));
    }, []);

    // 🔍 FILTER
    useEffect(() => {
        let filtered = coordinators;

        if (stateFilter) {
            filtered = filtered.filter(c =>
                (c.state || c.state_name || "")
                    .toLowerCase()
                    .includes(stateFilter.toLowerCase())
            );
        }

        if (cityFilter) {
            filtered = filtered.filter(c =>
                (c.city || c.city_name || "")
                    .toLowerCase()
                    .includes(cityFilter.toLowerCase())
            );
        }

        setFilteredCoordinators(filtered);
    }, [stateFilter, cityFilter, coordinators]);

    return (
        <div className="min-h-screen p-6 text-white relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg,#07111f,#0b1f36,#102944,#091829)"
            }}
        >

            {/* 🌈 Glow */}
            <div style={glow1}></div>
            <div style={glow2}></div>

            <h1 className="text-4xl font-extrabold mb-8 text-center"
                style={{
                    background: "linear-gradient(90deg,#00f5a0,#ff4ecd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                🎯 Coordinators Panel
            </h1>

            {/* FILTER */}
            <div className="flex flex-wrap gap-4 mb-6 justify-center">

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl"
                    style={inputStyle}
                >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state} style={{ color: "black" }}>
                            {state}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter District"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl"
                    style={inputStyle}
                />

                <button
                    onClick={() => {
                        setStateFilter("");
                        setCityFilter("");
                    }}
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={btnStyle}
                >
                    Clear
                </button>

            </div>

            {/* TABLE */}
            <div className="rounded-3xl p-6 overflow-x-auto"
                style={glassCard}
            >

                <table className="w-full min-w-[800px] text-center">

                    <thead style={{
                        ...theadStyle,
                        position: "sticky",
                        top: 0,
                        zIndex: 10
                    }}>
                        <tr>
                            <th className="p-3">Sr No</th>
                            <th>Name</th>
                            <th>Coordinator ID</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>State</th>
                            <th>District</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCoordinators.length > 0 ? (
                            filteredCoordinators.map((c, index) => (
                                <tr key={index}
                                    style={rowStyle(index)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "scale(1.01)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    {/* ✅ SR NO */}
                                    <td className="p-3 text-cyan-300 font-bold">
                                        {index + 1}
                                    </td>

                                    <td>{c.name || c.coordinator_name || "-"}</td>
                                    <td>{c.coordinatorId || c.CoordinatorId || "-"}</td>
                                    <td>{c.mobile || c.phone || "-"}</td>
                                    <td>{c.email || "-"}</td>
                                    <td>{c.state || c.state_name || "-"}</td>
                                    <td>{c.city || c.city_name || "-"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-5 text-gray-400">
                                    No Coordinators Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

            <style>{`
                @keyframes floatOne {
                    0%,100%{transform:translateY(0)}
                    50%{transform:translateY(20px)}
                }
                @keyframes floatTwo {
                    0%,100%{transform:translateY(0)}
                    50%{transform:translateY(-20px)}
                }
            `}</style>

        </div>
    );
}

export default AdminCoordinators;


/* 🎨 STYLES */

const glassCard = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
};

const inputStyle = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "white",
    backdropFilter: "blur(10px)"
};

const btnStyle = {
    background: "linear-gradient(135deg,#00f5a0,#ff4ecd)",
    color: "#001b2b",
    boxShadow: "0 10px 25px rgba(0,255,170,0.2)"
};

const theadStyle = {
    background: "rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.2)"
};

const rowStyle = (index) => ({
    background: index % 2 === 0
        ? "rgba(255,255,255,0.03)"
        : "transparent",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    transition: "all 0.3s ease"
});

const glow1 = {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(0,255,170,0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-80px",
    left: "-50px",
    animation: "floatOne 6s infinite"
};

const glow2 = {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "rgba(255,0,150,0.15)",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-80px",
    right: "-50px",
    animation: "floatTwo 7s infinite"
};