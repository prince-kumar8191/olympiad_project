// import React from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import awardImg2 from "../assets/award2.jpeg";
import awardImg5 from "../assets/award5.jpeg";
import awardImg3 from "../assets/award3.jpeg";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png"

function SchoolRecognition() {
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
             <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100 p-4 md:p-6">
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent animate-pulse leading-tight">
          School Recognition & Rewards
        </h1>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Celebrating Schools, Principals & Educators
        </p>
      </div>

      {/* TOP IMAGES */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-3 md:p-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 h-[240px] md:h-[380px] flex items-center justify-center">
            <img
              src={awardImg2}
              alt="School Recognition"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-3 md:p-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 h-[240px] md:h-[380px] flex items-center justify-center">
            <img
              src={awardImg5}
              alt="School Awards"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-8 max-w-6xl mx-auto">
        {/* Main School Awards */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            School Awards & Recognition
          </h2>

          <div className="space-y-5">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-5 rounded-xl shadow-md">
              <p className="mb-2 font-bold text-lg text-gray-800">
                Academic Excellence School Award
              </p>
              <p className="text-gray-700">
                The Top 50 performing schools at the national, state, and
                district levels will be honored with the prestigious Academic
                Excellence School Award.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-5 rounded-xl shadow-md">
              <p className="mb-2 font-bold text-lg text-gray-800">
                Inspirational Educator Award
              </p>
              <p className="text-gray-700">
                Teachers-in-charge from top-performing schools will be
                recognized with the Inspirational Educator Award, along with
                attractive gifts and prizes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-5 rounded-xl shadow-md">
              <p className="mb-2 font-bold text-lg text-gray-800">
                Outstanding Principal/Headmaster Award
              </p>
              <p className="text-gray-700">
                Principals and Headmasters of exceptionally performing schools
                will be honored with the Outstanding Principal/Headmaster Award,
                along with gifts and prizes.
              </p>
            </div>
          </div>
        </div>

        {/* Poster */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-3 md:p-5">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-50 h-[260px] md:h-[500px] flex items-center justify-center">
              <img
                src={awardImg3}
                alt="School Recognition Poster"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">🏫 Top 50 Schools</h3>
            <p>
              National, state and district level top-performing schools receive
              special recognition.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-200 to-pink-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">👨‍🏫 Educator Honor</h3>
            <p>
              Teachers-in-charge are rewarded for leadership and student
              excellence.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-200 to-cyan-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">🎖 Principal Award</h3>
            <p>
              Principals and Headmasters are honored for exceptional academic
              performance.
            </p>
          </div>
        </div>
      </div>
      
    </div>

     {/* FOOTER */}
      <Footer />
    </>

  );
}

export default SchoolRecognition;