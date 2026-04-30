


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png";

export default function OlympiadPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubjectClass, setOpenSubjectClass] = useState(null);
const [showAwards, setShowAwards] = useState(false);
  const navigate = useNavigate();

  // 🔥 USER DATA
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 🔥 NAVIGATION FUNCTIONS
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");
  const goToAbout = () => navigate("/about");
  const goToScholarship = () => navigate("/scholarship");
  const goToHome = () => navigate("/");
  const goToOlympiads = () => navigate("/olympiads");

  const handleSubjectToggle = (cls) => {
    if (openSubjectClass === cls) {
      setOpenSubjectClass(null);
    } else {
      setOpenSubjectClass(cls);
    }
  };

  return (
    <>
      {/* 🔥 NEW NAVBAR */}
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
                Awards  Awards and Recognition
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

      {/* ORIGINAL PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-6">
          Olympiad
        </h1>

        <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-700">
          Olympiad exams are competitive exams designed to improve analytical,
          logical and problem-solving skills of students. Participate in
          Previous Year Questions (PYQs) and Mock Tests to strengthen your
          preparation and achieve national ranking.
        </p>

        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
          Select Your Class
        </h2>

        {/* IMPORTANT: items-start so card stretch issue na ho */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
            <div
              key={cls}
              className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-[1.02] transition border border-gray-100"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-md">
                🎓
              </div>

              <h3 className="text-2xl font-bold mb-2 text-indigo-600">
                Class {cls}
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                Syllabus, PYQ & Mock Test
              </p>

              {/* BUTTONS */}
              <div className="flex justify-center gap-4 flex-wrap">
                {/* SUBJECT BUTTON */}
                <button
                  onClick={() => handleSubjectToggle(cls)}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:scale-105 transition"
                >
                  Subjects
                </button>

                {/* PYQ BUTTON */}
                <Link to={`/PYQS_Download_Pages`}>
                  <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:scale-105 transition">
                    PYQ
                  </button>
                </Link>

                {/* MOCK TEST BUTTON */}
                <Link to={`/MockStart?class=${cls}`}>
                  <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:scale-105 transition">
                    Mock Test
                  </button>
                </Link>
              </div>

              {/* SUBJECT DROPDOWN - CLASS WISE */}
              {openSubjectClass === cls && (
                <div className="mt-5 flex justify-center animate-fadeIn">
                  <div className="w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* CLASS 6 */}
                    {cls === 6 && (
                      <>
                        <Link to="/Maths6">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/Science6">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-emerald-700 font-semibold text-sm transition">
                            🧪 Science
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 7 */}
                    {cls === 7 && (
                      <>
                        <Link to="/Maths7">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/Science7">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-emerald-700 font-semibold text-sm transition">
                            🧪 Science
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 8 */}
                    {cls === 8 && (
                      <>
                        <Link to="/Maths8">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/Science8">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-emerald-700 font-semibold text-sm transition">
                            🧪 Science
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 9 */}
                    {cls === 9 && (
                      <>
                        <Link to="/Maths9">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/Science9">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-emerald-700 font-semibold text-sm transition">
                            🧪 Science
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 10 */}
                    {cls === 10 && (
                      <>
                        <Link to="/Maths10">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/Science10">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-emerald-700 font-semibold text-sm transition">
                            🧪 Science
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 11 */}
                    {cls === 11 && (
                      <>
                        <Link to="/class-11-physics">
                          <button className="w-full px-4 py-3 text-left hover:bg-violet-50 text-violet-700 font-semibold border-b border-gray-100 text-sm transition">
                            ⚛️ Physics
                          </button>
                        </Link>

                        <Link to="/class-11-chemistry">
                          <button className="w-full px-4 py-3 text-left hover:bg-pink-50 text-pink-700 font-semibold border-b border-gray-100 text-sm transition">
                            🧫 Chemistry
                          </button>
                        </Link>

                        <Link to="/class-11-mathematics">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/class-11-biology">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-green-700 font-semibold text-sm transition">
                            🌿 Biology
                          </button>
                        </Link>
                      </>
                    )}

                    {/* CLASS 12 */}
                    {cls === 12 && (
                      <>
                        <Link to="/class-12-physics">
                          <button className="w-full px-4 py-3 text-left hover:bg-violet-50 text-violet-700 font-semibold border-b border-gray-100 text-sm transition">
                            ⚛️ Physics
                          </button>
                        </Link>

                        <Link to="/class-12-chemistry">
                          <button className="w-full px-4 py-3 text-left hover:bg-pink-50 text-pink-700 font-semibold border-b border-gray-100 text-sm transition">
                            🧫 Chemistry
                          </button>
                        </Link>

                        <Link to="/class-12-mathematics">
                          <button className="w-full px-4 py-3 text-left hover:bg-blue-50 text-blue-700 font-semibold border-b border-gray-100 text-sm transition">
                            📘 Mathematics
                          </button>
                        </Link>

                        <Link to="/class-12-biology">
                          <button className="w-full px-4 py-3 text-left hover:bg-green-50 text-green-700 font-semibold text-sm transition">
                            🌿 Biology
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}