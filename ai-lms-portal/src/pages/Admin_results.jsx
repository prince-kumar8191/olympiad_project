


import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminResults() {

    const [data, setData] = useState([]);
    const [examCode, setExamCode] = useState("");
    const [search, setSearch] = useState("");
    const [filterCode, setFilterCode] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/all-results`)
            .then(res => {
                const formatted = res.data.map(r => ({
                    studentId: r.studentId,
                    examCode: r.examCode || r.examcode,
                    score: r.score,
                    total: r.total,
                    status: r.status || "hidden"
                }));
                setData(formatted);
            });
    }, []);

    const uniqueCodes = [...new Set(data.map(d => d.examCode))];

    const filteredData = data.filter(d => {
        return (
            (!filterCode || d.examCode === filterCode) &&
            (d.studentId?.toLowerCase().includes(search.toLowerCase()) ||
                d.examCode?.toLowerCase().includes(search.toLowerCase()))
        );
    });

    const total = data.length;
    const published = data.filter(d => d.status === "published").length;
    const hidden = data.filter(d => d.status !== "published").length;

    const publishAll = () => {
        if (!examCode) return alert("Enter Exam Code");

        axios.put(`${import.meta.env.VITE_API_URL}/publish-by-exam/${examCode}`)
            .then(() => {
                setData(prev =>
                    prev.map(d =>
                        d.examCode === examCode
                            ? { ...d, status: "published" }
                            : d
                    )
                );
            });
    };

    const hideAll = () => {
        if (!examCode) return alert("Enter Exam Code");

        axios.put(`${import.meta.env.VITE_API_URL}/hide-by-exam/${examCode}`)
            .then(() => {
                setData(prev =>
                    prev.map(d =>
                        d.examCode === examCode
                            ? { ...d, status: "hidden" }
                            : d
                    )
                );
            });
    };

    return (
        <div className="p-6 min-h-screen text-white relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #020617, #0f172a, #1e293b)"
            }}
        >

            {/* Glow Effects */}
            <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 blur-[120px] top-[-80px] left-[-50px] animate-pulse" />
            <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-[120px] bottom-[-80px] right-[-50px] animate-pulse" />

            <h1 className="text-3xl font-bold text-center mb-6 
            bg-gradient-to-r from-cyan-400 to-pink-500 
            text-transparent bg-clip-text animate-pulse">
                🎯 Admin Result Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl text-center 
                bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
                    <h2 className="text-xl font-bold text-cyan-300">{total}</h2>
                    <p>Total Results</p>
                </div>

                <div className="p-4 rounded-xl text-center 
                bg-green-400/10 backdrop-blur-xl border border-green-400/20 shadow-lg">
                    <h2 className="text-xl font-bold text-green-400">{published}</h2>
                    <p>Published</p>
                </div>

                <div className="p-4 rounded-xl text-center 
                bg-red-400/10 backdrop-blur-xl border border-red-400/20 shadow-lg">
                    <h2 className="text-xl font-bold text-red-400">{hidden}</h2>
                    <p>Hidden</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6 justify-between">

                <input
                    type="text"
                    placeholder="Search Student ID / Exam Code"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 rounded w-64 bg-white/10 border border-white/20 backdrop-blur"
                />

                <select
                    value={filterCode}
                    onChange={(e) => setFilterCode(e.target.value)}
                    className="p-2 rounded bg-white/10 border border-white/20 backdrop-blur"
                >
                    <option value="" style={{ color: "black" }}>All Exam Codes</option>
                    {uniqueCodes.map((code, i) => (
                        <option key={i} value={code} style={{ color: "black" }}>{code}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter Exam Code"
                    value={examCode}
                    onChange={(e) => setExamCode(e.target.value)}
                    className="p-2 rounded bg-white/10 border border-white/20 backdrop-blur"
                />

                <button
                    onClick={publishAll}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 
                    hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded shadow-lg"
                >
                    Publish
                </button>

                <button
                    onClick={hideAll}
                    className="bg-gradient-to-r from-pink-500 to-red-500 
                    hover:scale-105 transition-all duration-300 text-white px-4 py-2 rounded shadow-lg"
                >
                    Hide
                </button>
            </div>

            {/* Table */}
            <div className="p-4 rounded-xl shadow-xl overflow-auto 
            bg-white/5 backdrop-blur-xl border border-white/10">

                <table className="w-full text-sm">

                    <thead>
                        <tr className="bg-white/10">
                            <th className="p-2">Student ID</th>
                            <th className="p-2">Exam Code</th>
                            <th className="p-2">Score</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((d, i) => (
                            <tr key={i} className="text-center border-t border-white/10 hover:bg-white/5 transition">

                                <td className="p-2">{d.studentId}</td>
                                <td className="p-2 text-cyan-300">{d.examCode}</td>

                                <td className="p-2">
                                    {typeof d.score === "number" && typeof d.total === "number"
                                        ? `${d.score}/${d.total}`
                                        : "No Result"}
                                </td>

                                <td className="p-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${d.status === "published"
                                            ? "bg-green-400/20 text-green-300 border border-green-400/30"
                                            : "bg-pink-400/20 text-pink-300 border border-pink-400/30"}`}>
                                        {d.status}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}