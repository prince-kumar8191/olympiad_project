


import React from "react";
import { Link } from "react-router-dom";


export default function StudentDashboard() {

    const studentData = JSON.parse(localStorage.getItem("student") || "{}");

    const name = studentData?.name || "Student";
    const studentId = localStorage.getItem("studentId");
    const StudentId = studentData?.StudentId?.trim() || "";

    const profilePhoto = studentData?.photo
        ? studentData.photo
        : "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <div className="h-screen flex bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white overflow-hidden">

            {/* 🔥 Animated Background Glow */}
            <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-indigo-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

            {/* SIDEBAR */}
            <div className="w-64 backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-2xl flex flex-col z-10">

                <div className="p-6 text-2xl font-bold border-b border-white/20 tracking-wide">
                    🎓 Student Portal
                </div>

                <nav className="flex-1 p-4 space-y-2 text-sm">

                    <a className="block p-3 rounded-xl bg-white/20 backdrop-blur-md font-semibold shadow-lg hover:scale-105 transition">
                        🏠 Dashboard
                    </a>

                    <Link to="/StudentProfile" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        👤 My Profile
                    </Link>

                    <Link to="/ExamInstructions" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        🧪 Olympiad Exams
                    </Link>

                    <Link to="/MockStart" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        📝 Mock Tests
                    </Link>

                    <a className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        📚 PYQ
                    </a>

                    <Link to="/register" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        🎯 Register Now
                    </Link>

                    <a className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        📊 Results
                    </a>

                    <Link to={`/SkillExamLogin`} className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        Skill Test Login
                    </Link>

                    <Link to={`/Skill_Result/${studentId}`} className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        Skill Test Result
                    </Link>


                    <Link
                        to="/Student_paid_unpaid"
                        className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                        Payement Status
                    </Link>


                    <Link to="/BenefitPay" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        💰 Benefit and Pay
                    </Link>

                    <Link to="/StudentRefer" className="block p-3 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
                        🤝 Referral Points and Refer
                    </Link>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="w-full text-left p-3 rounded-xl bg-red-500/30 hover:bg-red-500 transition mt-3 hover:scale-105"
                    >
                        🔓 Logout
                    </button>

                </nav>
            </div>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col z-10">

                {/* TOPBAR */}
                <div className="backdrop-blur-2xl bg-white/10 border-b border-white/20 p-4 flex justify-between items-center shadow-lg">

                    <input
                        type="text"
                        placeholder="Search exams..."
                        className="bg-white/20 border border-white/30 px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 transition focus:scale-105"
                    />

                    <div className="flex items-center gap-4">

                        <button className="text-xl hover:scale-125 transition duration-300">🔔</button>

                        <div className="text-right">
                            <p className="text-xs opacity-70">Student ID</p>
                            <p className="font-bold text-indigo-300 animate-pulse">{StudentId}</p>
                        </div>

                        <img
                            src={profilePhoto}
                            alt="profile"
                            className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow-lg hover:scale-125 transition duration-300"
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 overflow-y-auto">

                    <h1 className="text-3xl font-bold mb-6">
                        Welcome <span className="text-indigo-400 animate-pulse">{name}</span>
                    </h1>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                        {[
                            { title: "Registered Exams", value: "00" },
                            { title: "Mock Tests Completed", value: "00" },
                            { title: "Best Score", value: "00%" },
                            { title: "Certificates Earned", value: "00" }
                        ].map((card, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition duration-300">
                                <p className="opacity-70">{card.title}</p>
                                <h2 className="text-3xl font-bold mt-2 text-indigo-300">{card.value}</h2>
                            </div>
                        ))}

                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="grid md:grid-cols-4 gap-6 mb-10">

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            {StudentId ? (
                                <Link to={`/Admitcard/${StudentId}`}>Open Admit Card</Link>
                            ) : <p>Loading...</p>}
                            <p className="opacity-70">Download Admit Card</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            <h3 className="text-xl font-bold text-indigo-300 mb-2">View Exams</h3>
                            <p className="opacity-70">Check upcoming exams</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            {StudentId ? (
                                <Link to={`/ResultPage/${StudentId}`} className="text-indigo-300 font-bold">
                                    View Results
                                </Link>
                            ) : <p>Loading...</p>}
                            <p className="opacity-70">Check exam results</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            {StudentId ? (
                                <Link to={`/Omr_View/${StudentId}`} className="text-indigo-300 font-bold">
                                    View Results
                                </Link>
                            ) : <p>Loading...</p>}
                            <p className="opacity-70">Check exam results</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            {StudentId ? (
                                <Link to={`/certificate/${StudentId}`}>Download Certificate</Link>
                            ) : <p>Loading...</p>}
                            <p className="opacity-70">Get your certificate</p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-110 hover:shadow-indigo-500/50 transition text-center border border-white/20">
                            {StudentId ? (
                                <Link to={`/School_certificate/${StudentId}`}>Download Skill Certificate</Link>
                            ) : <p>Loading...</p>}
                            <p className="opacity-70">Get your Skill certificate</p>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    );
}