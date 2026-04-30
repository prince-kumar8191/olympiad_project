

import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminStudents() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

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
        axios.get(`${import.meta.env.VITE_API_URL}/register`)
            .then(res => {
                setStudents(res.data);
                setFilteredStudents(res.data);
            })
            .catch(err => {
                console.error("ERROR:", err);
            });
    }, []);

    useEffect(() => {
        let filtered = students;

        if (stateFilter) {
            filtered = filtered.filter(stu =>
                stu.state?.toLowerCase().includes(stateFilter.toLowerCase())
            );
        }

        if (cityFilter) {
            filtered = filtered.filter(stu =>
                stu.city?.toLowerCase().includes(cityFilter.toLowerCase())
            );
        }

        setFilteredStudents(filtered);
    }, [stateFilter, cityFilter, students]);

    return (
        <div
            className="min-h-screen p-6 text-white"
            style={{
                background: "linear-gradient(135deg, #07111f, #0b1f36, #102944)",
                position: "relative"
            }}
        >

            {/* Glow */}
            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(0,255,255,0.15)",
                filter: "blur(120px)",
                top: "-60px",
                left: "-60px"
            }} />

            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: "rgba(255,0,150,0.15)",
                filter: "blur(120px)",
                bottom: "-60px",
                right: "-60px"
            }} />

            <h2
                className="text-3xl font-bold mb-6 text-center"
                style={{
                    background: "linear-gradient(90deg,#00f5ff,#ff00c8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}
            >
                🎓 Students Dashboard
            </h2>

            {/* FILTER */}
            <div
                className="flex flex-wrap gap-4 mb-6 p-4 rounded-2xl"
                style={glassStyle}
            >

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    style={inputStyle}
                    className="p-3 rounded-xl"
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
                    style={inputStyle}
                    className="p-3 rounded-xl"
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
                style={glassStyle}
            >

                <table className="w-full text-center min-w-[800px]">

                    <thead>
                        <tr style={{
                            background: "rgba(255,255,255,0.1)"
                        }}>
                            {/* ✅ SR NO */}
                            <th className="p-4">Sr No</th>
                            <th>Student Name</th>
                            <th>Student ID</th>
                            <th>Fee Status</th>
                            <th>Subject</th>
                            <th>State</th>
                            <th>District</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((stu, index) => (
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
                                    {/* ✅ SR NO */}
                                    <td className="p-4 text-cyan-300 font-bold">
                                        {index + 1}
                                    </td>

                                    <td className="text-white">
                                        {stu.student_name || "-"}
                                    </td>

                                    <td>{stu.StudentId || "-"}</td>

                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            stu.payment_status === "success"
                                                ? "bg-green-400 text-black"
                                                : "bg-red-400 text-black"
                                        }`}>
                                            {stu.payment_status === "success"
                                                ? "Paid"
                                                : "Pending"}
                                        </span>
                                    </td>

                                    <td>{stu.subject || "-"}</td>

                                    <td className="text-cyan-300">
                                        {stu.state || "-"}
                                    </td>

                                    <td className="text-pink-300">
                                        {stu.city || "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-6 text-gray-400">
                                    No Students Found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminStudents;


// ================= STYLES =================

const glassStyle = {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.12)"
};

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