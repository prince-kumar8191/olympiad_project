import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MockStart() {

    const navigate = useNavigate();

    const [selectedClass, setSelectedClass] = useState("");
    const [subject, setSubject] = useState("");
    

    const startTest = () => {

        if (!selectedClass || !subject) {
            alert("Please select class & subject");
            return;
        }

        // 🔥 localStorage me save
        localStorage.setItem("class", selectedClass);
        localStorage.setItem("subject", subject);

        navigate("/MockTest");
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">

            <div className="bg-white p-8 rounded-xl shadow w-[400px] text-center">

                <h2 className="text-2xl font-bold mb-6">
                    Start Mock Test
                </h2>

                {/* CLASS SELECT */}
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full p-3 border rounded mb-4"
                >
                    <option value="">Select Class</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>

                </select>

                {/* SUBJECT SELECT */}
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border rounded mb-6"
                >
                    <option value="">Select Subject</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="gk">GK</option>
                </select>

                <button
                    onClick={startTest}
                    className="bg-indigo-600 text-white px-6 py-3 rounded w-full"
                >
                    Start Test
                </button>

            </div>

        </div>
    );
}