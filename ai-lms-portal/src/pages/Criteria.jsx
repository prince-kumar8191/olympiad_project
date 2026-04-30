import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png"


// ✅ Images import karo
import awardImg1 from "../assets/award1.jpeg";
import awardImg3 from "../assets/award3.jpeg";
import awardImg4 from "../assets/award4.jpeg";

function AwardsCriteria() {
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4 md:p-6">
        {/* HERO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse leading-tight">
            Awards Criteria & Rules
          </h1>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            Ranking, Eligibility, Login Facility & Important Terms
          </p>
        </div>

        {/* TOP BANNER */}
        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-4 hover:shadow-indigo-200 transition duration-500">
            <div className="w-full flex justify-center items-center rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-white h-[300px] md:h-[500px]">
              <img
                src={awardImg1}
                alt="Awards Banner"
                className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {/* Ranking System */}
          <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">
              Olympiad Ranking System & Awards
            </h2>
            <p>Students are evaluated and awarded ranks at four levels:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>National Level</li>
              <li>State Level</li>
              <li>District Level</li>
              <li>School Level</li>
            </ul>
          </div>

          {/* Ranking Criteria + Tie Breaking */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
              <h2 className="text-2xl font-bold text-indigo-600 mb-3">
                Ranking Criteria
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>Total score obtained in the examination</li>
                <li>
                  Time taken to complete the test (preference is given to faster
                  completion)
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
              <h2 className="text-2xl font-bold text-indigo-600 mb-3">
                Tie-Breaking Criteria
              </h2>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Higher number of correct answers</li>
                <li>Shorter completion time</li>
                <li>Fewer incorrect answers</li>
                <li>Higher overall accuracy</li>
              </ol>
            </div>
          </div>

          {/* Login + Alerts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
              <h2 className="text-2xl font-bold text-indigo-600 mb-3">
                Online School Login Facility
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>View registered student details</li>
                <li>Earn credit points for student participation</li>
                <li>Access performance reports and analytics</li>
                <li>Download results for students</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
              <h2 className="text-2xl font-bold text-indigo-600 mb-3">
                Communication & Alerts
              </h2>
              <ul className="list-disc ml-6 space-y-1">
                <li>SMS on registered mobile numbers</li>
                <li>Email notifications on registered email IDs</li>
                <li>Important alerts and announcements</li>
              </ul>
            </div>
          </div>

          {/* Mid Poster */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-4 hover:shadow-orange-200 transition duration-500">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-white h-[320px] md:h-[560px] flex items-center justify-center">
                <img
                  src={awardImg3}
                  alt="Award Details"
                  className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition duration-300">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">
              Cash Prize Eligibility Criteria
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                National Level (Ranks 1, 2 & 3): Minimum 4,500 students must
                participate nationwide
              </li>
              <li>
                State Level: Minimum 450 students must participate from the
                respective state
              </li>
              <li>
                District/Regional Level: Minimum 120 students must participate
                from the respective district/region
              </li>
            </ul>
          </div>

          {/* Bottom Image + Terms */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-2 md:p-3 hover:shadow-indigo-200 transition duration-500">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-white h-[300px] md:h-[460px] flex items-center justify-center">
                <img
                  src={awardImg4}
                  alt="Topper Recognition"
                  className="max-w-[96%] max-h-[96%] object-contain transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition duration-300">
              <h2 className="text-2xl font-bold mb-3">
                Important Terms – National Ranks & Scholarships
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  As per BHAYAT Olympiad policies, the scholarship amounts awarded
                  to National Rank 1 and Rank 2 holders will be distributed in
                  installments over a specified number of years. The disbursement
                  will continue until the full scholarship amount is awarded.
                </li>
                <li>
                  The National Scholarship Program aims to provide long-term
                  educational support to outstanding students. To ensure sustained
                  academic benefit, BHAYAT Talent Management has implemented a
                  structured, multi-year scholarship distribution policy.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default AwardsCriteria;