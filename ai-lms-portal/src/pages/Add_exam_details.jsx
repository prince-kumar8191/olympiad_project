import React, { useState } from "react";
import axios from "axios";

export default function AddExam() {

    const [form, setForm] = useState({
        examDate: "",
        examTime: "",
        reportingTime: "",
        examMode: "",
        examCode: "",
        subject: ""
    });

    const [loading, setLoading] = useState(false);

    // ✅ SUBJECT LIST (DYNAMIC)
    const subjects = ["Mathematics", "Science"];

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/add-exam`,
                form
            );

            if (res.data?.message) {
                alert(res.data.message);
            } else {
                alert("✅ Exam added successfully");
            }

            setForm({
                examDate: "",
                examTime: "",
                reportingTime: "",
                examMode: "",
                examCode: "",
                subject: ""
            });

        } catch (err) {
            alert(
                err.response?.data?.error ||
                "❌ Something went wrong"
            );
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                    ➕ Add Exam
                </h2>

                {/* SUBJECT DROPDOWN */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Subject</label>
                    <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Subject</option>
                        {subjects.map((sub, i) => (
                            <option key={i} value={sub}>
                                {sub}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DATE */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Exam Date</label>
                    <input
                        type="date"
                        name="examDate"
                        value={form.examDate}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg"
                    />
                </div>

                {/* TIME */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Exam Time</label>
                    <input
                        type="time"
                        name="examTime"
                        value={form.examTime}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg"
                    />
                </div>

                {/* REPORTING */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Reporting Time</label>
                    <input
                        type="time"
                        name="reportingTime"
                        value={form.reportingTime}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg"
                    />
                </div>

                {/* MODE */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Exam Mode</label>
                    <select
                        name="examMode"
                        value={form.examMode}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg"
                    >
                        <option value="">Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                {/* EXAM CODE */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium">Exam Code</label>
                    <input
                        type="text"
                        name="examCode"
                        placeholder="EX123"
                        value={form.examCode}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-lg"
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Adding..." : "Add Exam"}
                </button>
            </form>
        </div>
    );
}