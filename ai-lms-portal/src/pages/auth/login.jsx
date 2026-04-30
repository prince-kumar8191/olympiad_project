

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import logo from "../../assets/logo.png";
import {
  FaUserGraduate,
  FaSchool,
  FaHandsHelping,
  FaUserTie,
  FaUserShield,
  FaCrown,
  FaIdCard   // ✅ NEW ICON
} from "react-icons/fa";

function LoginSelectRole() {

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

  const roles = [
    {
      title: "Student Login",
      icon: <FaUserGraduate size={40} />,
      path: "/login/student_login"
    },
    {
      title: "School / College / Institute Login",
      icon: <FaSchool size={40} />,
      path: "/login/school_login"
    },
    {
      title: "Volunteer Login",
      icon: <FaHandsHelping size={40} />,
      path: "/login/Volunteer_login"
    },
    {
      title: "Coordinator Login",
      icon: <FaUserTie size={40} />,
      path: "/login/Coordinator_login"

    },
    {
      title: "Admin Login",
      icon: <FaUserShield size={40} />,
      path: "/login/Admin_login"
    },


    // ✅ 🔥 NEW MEMBERSHIP LOGIN
    {
      title: "Membership Login",
      icon: <FaIdCard size={40} />,
      path: "/Membership_Login"
    }


  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-[999] relative">
        <div className="flex justify-between items-center px-6 md:px-10 py-4">

          <div className="flex items-center gap-3 cursor-pointer" onClick={goToHome}>
            <img
              src={logo}
              alt="Bhayat Logo"
              className="h-12 w-auto object-contain scale-[3.0] origin-left"
            />
          </div>

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

                {role === "student" && (
                  <button onClick={() => navigate("/Student_Dashboard")} className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition">
                    📊 Dashboard
                  </button>
                )}

                {role === "coordinator" && (
                  <button onClick={() => navigate("/Coordinator_Dashboard")} className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition">
                    📊 Dashboard
                  </button>
                )}

                {role === "volunteer" && (
                  <button onClick={() => navigate("/Volunteer_Dashboard")} className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition">
                    📊 Dashboard
                  </button>
                )}

                {role === "school" && (
                  <button onClick={() => navigate("/School_Dashboard")} className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition">
                    📊 Dashboard
                  </button>
                )}

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
                <button onClick={goToLogin} className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition">
                  Login
                </button>

                <button onClick={goToSignup} className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition">
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-white">
            <a onClick={goToHome}>Home</a>
            <a onClick={goToOlympiads}>Olympiads</a>
            <a onClick={goToScholarship}>Scholarship</a>
            <a onClick={goToAbout}>About</a>

            <button onClick={goToLogin}>Login</button>
            <button onClick={goToSignup}>Sign Up</button>
          </div>
        )}
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Select Login Role
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {roles.map((role, index) => (
            <div
              key={index}
              onClick={() => navigate(role.path)}
              className="cursor-pointer bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-72 text-center text-white shadow-2xl hover:scale-105 hover:bg-white/30 transition-all duration-300"
            >

              <div className="flex justify-center mb-4">
                {role.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {role.title}
              </h3>

            </div>
          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default LoginSelectRole;