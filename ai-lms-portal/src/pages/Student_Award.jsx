import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import awardImg1 from "../assets/award1.jpeg";
import awardImg2 from "../assets/award2.jpeg";
import awardImg4 from "../assets/award4.jpeg";
import awardImg5 from "../assets/award5.jpeg";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png"

function StudentRecognition() {
    const navigate = useNavigate();
  
    const [showAwards, setShowAwards] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const goToScholarship = () => navigate("/scholarship");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isCoordinator = localStorage.getItem("coordinatorLogin");
    const [showSettings, setShowSettings] = useState(false);
    const goToHome = () => navigate("/");
    const goToAbout = () => navigate("/about");
    const goToOlympiads = () => navigate("/olympiads");
  
    const goToLogin = () => {
      window.location.href = "/login";
    };
  
    const goToSignup = () => {
      window.location.href = "/signup";
    };
  
  return (
    <>
     {/* NAVBAR */}
                <nav className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-[999] relative">
                  <div className="flex justify-between items-center px-6 md:px-10 py-4">
          
                    {/* 🔥 LOGO + NAME */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={goToHome}>
                      <img
                        src={logo}
                        alt="Bhayat Logo"
                        className="h-12 w-auto object-contain scale-[3.0] origin-left"
                      />
                    </div>
          
                    {/* RIGHT SIDE MENU */}
                    <div className="hidden md:flex items-center gap-6 font-semibold">
                      <a onClick={goToHome} className="hover:text-indigo-600 cursor-pointer">Home</a>
          
                      <a onClick={goToAbout} className="hover:text-indigo-600 cursor-pointer">
                        About
                      </a>
          
                      <div className="relative">
                        <button
                          onClick={() => setShowAwards(!showAwards)}
                          className="hover:text-indigo-600 cursor-pointer"
                        >
                          Awards
                        </button>
          
                        {showAwards && (
                          <div className="absolute top-10 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-48 z-50">
                            <button
                              onClick={() => {
                                navigate("/Student_Award");
                                setShowAwards(false);
                              }}
                              className="block w-full text-left py-2 hover:text-indigo-600"
                            >
                              Student  Awards and Recognition
                            </button>
          
                            <button
                              onClick={() => {
                                navigate("/School_Award");
                                setShowAwards(false);
                              }}
                              className="block w-full text-left py-2 hover:text-indigo-600"
                            >
                              School  Awards and Recognition
                            </button>
                          </div>
                        )}
          
                      </div>
          
                      <a
                        onClick={() => navigate("/Criteria")}
                        className="hover:text-indigo-600 cursor-pointer"
                      >
                        Criteria
                      </a>
          
                      <a onClick={goToOlympiads} className="hover:text-indigo-600 cursor-pointer">
                        Olympiads
                      </a>
          
                      <a onClick={goToScholarship} className="hover:text-indigo-600 cursor-pointer">
                        Scholarship
                      </a>
          
                      {isLoggedIn ? (
                        <div className="flex items-center gap-4">
                          <span>👤 {user.name || role}</span>
          
                          {/* 🔥 ROLE DASHBOARD */}
                          {role === "student" && (
                            <button
                              onClick={() => navigate("/Student_Dashboard")}
                              className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                            >
                              📊 Dashboard
                            </button>
                          )}
          
                          {role === "coordinator" && (
                            <button
                              onClick={() => navigate("/Coordinator_Dashboard")}
                              className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                            >
                              📊 Dashboard
                            </button>
                          )}
          
                          {role === "volunteer" && (
                            <button
                              onClick={() => navigate("/Volunteer_Dashboard")}
                              className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                            >
                              📊 Dashboard
                            </button>
                          )}
          
                          {role === "school" && (
                            <button
                              onClick={() => navigate("/School_Dashboard")}
                              className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                            >
                              📊 Dashboard
                            </button>
                          )}
          
                          {/* LOGOUT */}
                          <button
                            onClick={() => {
                              localStorage.clear();
                              navigate("/login");
                            }}
                            className="border-2 border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={goToLogin}
                            className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                          >
                            Login
                          </button>
          
                          <button
                            onClick={goToSignup}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
                          >
                            Sign Up
                          </button>
                        </>
                      )}
                    </div>
          
                    {/* MOBILE MENU BUTTON */}
                    <button
                      className="md:hidden text-3xl"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      ☰
                    </button>
                  </div>
          
                  {/* MOBILE MENU */}
                  {menuOpen && (
                    <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-white">
                      <a onClick={goToHome} className="cursor-pointer">Home</a>
                      <a onClick={goToOlympiads} className="cursor-pointer">Olympiads</a>
                      <a onClick={goToScholarship} className="cursor-pointer">Scholarship</a>
                      <a onClick={goToAbout} className="cursor-pointer">About</a>
          
                      <div>
                        <button onClick={() => setShowAwards(!showAwards)}>
                          Awards
                        </button>
          
                        {showAwards && (
                          <div className="ml-4 flex flex-col gap-2">
                            <button onClick={() => navigate("/Student_Award")}>
                              Student  Awards and Recognition
                            </button>
                            <button onClick={() => navigate("/School_Award")}>
                              School  Awards and Recognition
                            </button>
                          </div>
                        )}
          
                      </div>
                      <a onClick={() => navigate("/Criteria")}>
                        Criteria
                      </a>
                      {isLoggedIn ? (
                        <>
                          <span>👤 {user.name || role}</span>
          
                          {/* DASHBOARD */}
                          {role === "student" && (
                            <button onClick={() => navigate("/Student_Dashboard")}>
                              Dashboard
                            </button>
                          )}
          
                          {role === "coordinator" && (
                            <button onClick={() => navigate("/Coordinator_Dashboard")}>
                              Dashboard
                            </button>
                          )}
          
                          {role === "volunteer" && (
                            <button onClick={() => navigate("/Volunteer_Dashboard")}>
                              Dashboard
                            </button>
                          )}
          
                          {role === "school" && (
                            <button onClick={() => navigate("/School_Dashboard")}>
                              Dashboard
                            </button>
                          )}
          
                          {/* LOGOUT */}
                          <button
                            onClick={() => {
                              localStorage.clear();
                              navigate("/login");
                            }}
                            className="text-red-500 text-left"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={goToLogin}>Login</button>
                          <button onClick={goToSignup}>Sign Up</button>
                        </>
                      )}
                    </div>
                  )}
                </nav>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-4 md:p-6">
      
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent animate-pulse leading-tight">
          Student Recognition & Rewards
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Rewards, Scholarships, Medals & Special Honors
        </p>
      </div>

      {/* TOP BANNER */}
      <div className="mb-10 flex justify-center">
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-4 hover:shadow-pink-200 transition duration-500">
          <div className="w-full flex justify-center items-center rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-white h-[300px] md:h-[500px]">
            <img
              src={awardImg1}
              alt="Student Recognition"
              className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 max-w-6xl mx-auto">
        {/* Awards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <h3 className="text-xl font-bold mb-3">🏆 National Level</h3>
            <ul className="space-y-1">
              <li>Rank 1: Cash Prize ₹51,000/-</li>
              <li>Rank 2: Cash Prize ₹21,000/-</li>
              <li>Rank 3: Cash Prize ₹11,000/-</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-200 to-green-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <h3 className="text-xl font-bold mb-3">🥈 State Level</h3>
            <ul className="space-y-1">
              <li>Rank 1: Cash Prize ₹5,100/-</li>
              <li>Rank 2: Cash Prize ₹2,100/-</li>
              <li>Rank 3: Cash Prize ₹1,100/-</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-200 to-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
            <h3 className="text-xl font-bold mb-3">🥉 District Level</h3>
            <ul className="space-y-1">
              <li>Rank 1: Cash Prize ₹2,100/-</li>
              <li>Rank 2: Cash Prize ₹1,100/-</li>
              <li>Rank 3: Cash Prize ₹501/-</li>
            </ul>
          </div>
        </div>

        {/* Special Recognition */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition duration-300">
          <h2 className="text-2xl font-bold text-purple-700 mb-3">
            Special Recognition
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Best Performers (Ranks 11–20) - Applicable for individually
              registered students
            </li>
            <li>
              Top 50 Students: Up to 50% scholarship/discount on NEET & JEE
              preparation programs
            </li>
            <li>
              Top 5 National Rankers: Higher education scholarships of up to
              ₹1,00,000 (shared among 5 students) to support careers in
              engineering, medical, and scientific fields
            </li>
            <li>
              School-Level Recognition: Gold, Silver, and Bronze medals for
              School Toppers and Class Toppers
            </li>
            <li>
              State & District Toppers: Special recognition with honors and
              awards
            </li>
            <li>All School & Class Toppers: Medal and Certificate</li>
            <li>All Participants: Digital Participation Certificate</li>
          </ul>
        </div>

        {/* Images */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-3 hover:shadow-purple-200 transition duration-500">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white h-[300px] md:h-[460px] flex items-center justify-center">
              <img
                src={awardImg2}
                alt="School Level Recognition"
                className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-3 hover:shadow-pink-200 transition duration-500">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-white h-[300px] md:h-[460px] flex items-center justify-center">
              <img
                src={awardImg5}
                alt="State and District Toppers"
                className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* More Recognition */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">
              Medal & Certificate Recognition
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>Gold Medal for Top School Performers</li>
              <li>Silver Medal for Top Class Performers</li>
              <li>Bronze Medal for Recognized Achievers</li>
              <li>Certificates for all recognized participants</li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-3 hover:shadow-indigo-200 transition duration-500">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-white h-[300px] md:h-[380px] flex items-center justify-center">
              <img
                src={awardImg4}
                alt="All School and Class Toppers"
                className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
          
        </div>
       
      </div>
    
    </div>
    {/* FOOTER */}
          <Footer />
        </>
    
    
  );
}

export default StudentRecognition;