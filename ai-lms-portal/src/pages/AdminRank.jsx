


import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRanking() {

    const [national, setNational] = useState([]);

    const [stateData, setStateData] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [stateExamCode, setStateExamCode] = useState("");
    const [loadingState, setLoadingState] = useState(false);

    const [cityData, setCityData] = useState([]);
    const [cityInput, setCityInput] = useState("");
    const [cityExamCode, setCityExamCode] = useState("");
    const [loadingCity, setLoadingCity] = useState(false);

    const states = [
        "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
        "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
        "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
        "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
        "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
        "Uttar Pradesh","Uttarakhand","West Bengal",
        "Delhi","Jammu and Kashmir","Ladakh","Puducherry"
    ].sort();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/top-national`)
            .then(res => setNational(res.data || []))
            .catch(err => console.error(err));
    }, []);

    const handleStateSearch = async () => {
        if (!selectedState) return;
        setLoadingState(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/top-state/${encodeURIComponent(selectedState)}?examCode=${stateExamCode}`
            );
            setStateData(res.data || []);
        } catch (err) {
            console.error(err);
        }
        setLoadingState(false);
    };

    const handleCitySearch = async () => {
        if (!cityInput.trim()) return;
        setLoadingCity(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/top-city/${encodeURIComponent(cityInput.trim())}?examCode=${cityExamCode}`
            );
            setCityData(res.data || []);
        } catch (err) {
            console.error(err);
        }
        setLoadingCity(false);
    };

    const renderList = (data) => {
        if (!data.length) {
            return <p className="text-gray-300 text-center">No rankings found</p>;
        }

        return data.map((item, index) => (
            <div
                key={index}
                className={`flex justify-between items-center py-3 px-4 rounded-xl mb-2 
                backdrop-blur-lg border border-white/10 shadow-lg 
                transition-all duration-300 hover:scale-[1.03] hover:shadow-pink-400/20
                ${index === 0 ? "bg-yellow-200/20 font-bold" :
                        index === 1 ? "bg-white/10" :
                            index === 2 ? "bg-orange-200/20" : "bg-white/5"}`}
            >
                <span className="flex items-center gap-2">
                    <span>
                        {index === 0 ? "🥇" :
                            index === 1 ? "🥈" :
                                index === 2 ? "🥉" : `${index + 1}.`}
                    </span>
                    {item.name}
                </span>
                <span className="font-semibold text-cyan-300">
                    {item.score}
                </span>
            </div>
        ));
    };

    return (
        <div className="min-h-screen p-6 text-white relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0f172a, #020617, #1e293b)"
            }}
        >

            {/* Animated Glow */}
            <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 blur-[120px] top-[-80px] left-[-50px] animate-pulse" />
            <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-[120px] bottom-[-80px] right-[-50px] animate-pulse" />

            {/* HEADER */}
            <h1 className="text-3xl font-bold text-center mb-8 
            bg-gradient-to-r from-cyan-400 to-pink-500 
            text-transparent bg-clip-text animate-pulse">
                🏆 Admin Ranking Dashboard
            </h1>

            {/* NATIONAL */}
            <div className="max-w-4xl mx-auto p-5 rounded-2xl mb-6
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-center text-cyan-300">
                    🌍 National Top 5
                </h2>
                {renderList(national)}
            </div>

            {/* STATE */}
            <div className="max-w-4xl mx-auto p-5 rounded-2xl mb-6
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-pink-300">
                    🏙 State Ranking
                </h2>

                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="p-2 w-full mb-3 rounded bg-white/10 border border-white/20  "
                >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                        <option key={index} value={state} style={{ color: "#000" }}>{state}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Enter Exam Code (optional)"
                    value={stateExamCode}
                    onChange={(e) => setStateExamCode(e.target.value)}
                    className="p-2 w-full mb-3 rounded bg-white/10 border border-white/20"
                />

                <button
                    onClick={handleStateSearch}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 
                    hover:scale-105 transition-all duration-300 text-white p-2 w-full rounded mb-3 shadow-lg"
                >
                    {loadingState ? "Loading..." : "Search State Rank"}
                </button>

                {renderList(stateData)}
            </div>

            {/* CITY */}
            <div className="max-w-4xl mx-auto p-5 rounded-2xl
            bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-cyan-300">
                    📍 City Ranking
                </h2>

                <input
                    type="text"
                    placeholder="Enter City"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    className="p-2 w-full mb-3 rounded bg-white/10 border border-white/20"
                />

                <input
                    type="text"
                    placeholder="Enter Exam Code (optional)"
                    value={cityExamCode}
                    onChange={(e) => setCityExamCode(e.target.value)}
                    className="p-2 w-full mb-3 rounded bg-white/10 border border-white/20"
                />

                <button
                    onClick={handleCitySearch}
                    className="bg-gradient-to-r from-pink-500 to-cyan-400 
                    hover:scale-105 transition-all duration-300 text-white p-2 w-full rounded mb-3 shadow-lg"
                >
                    {loadingCity ? "Loading..." : "Search City Rank"}
                </button>

                {renderList(cityData)}
            </div>
        </div>
    );
}