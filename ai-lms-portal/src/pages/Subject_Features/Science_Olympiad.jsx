import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFlask, FaBrain, FaChartLine, FaTrophy, FaLaptopCode, FaMicroscope } from "react-icons/fa";
import logo from "../../assets/logo.png";

export default function ScienceOlympiad() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  const navigate = useNavigate();
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

                    Student Awards and Recognition

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
                  <button onClick={() => navigate("/Student_award")}>
                    Student Awards and Recognition
                  </button>
                  <button onClick={() => navigate("/School_Award")}>
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

      {/* HERO SECTION */}

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>

            <h1 className="text-5xl font-bold text-indigo-700 mb-6">
              Science Olympiad
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              The Science Olympiad encourages students to explore scientific
              concepts beyond the classroom. It helps develop curiosity,
              logical thinking, and analytical skills in subjects such as
              Physics, Chemistry and Biology.
            </p>

            <Link to="/Science_mock" >
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:scale-105 transition">
                Start Mock Test
              </button>
            </Link>

          </div>

          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2784/2784459.png"
              alt="science"
              className="w-80 mx-auto"
            />
          </div>

        </div>

      </div>


      {/* BENEFITS */}

      <div className="py-16 bg-white">

        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-12">
          Why Participate in Science Olympiad?
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaMicroscope size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">Scientific Thinking</h3>
            <p className="text-gray-600 mt-2">
              Develop curiosity and scientific mindset.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaFlask size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">Concept Clarity</h3>
            <p className="text-gray-600 mt-2">
              Understand physics, chemistry and biology concepts deeply.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaBrain size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">Logical Reasoning</h3>
            <p className="text-gray-600 mt-2">
              Improve analytical and reasoning skills.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaChartLine size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg">Competitive Skills</h3>
            <p className="text-gray-600 mt-2">
              Prepare for national level science competitions.
            </p>
          </div>

        </div>

      </div>


      {/* EXAM FEATURES */}

      <div className="py-16 bg-indigo-50">

        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-12">
          Olympiad Exam Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

          <div className="bg-white p-8 rounded-2xl shadow text-center hover:scale-105 transition">
            <FaLaptopCode size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">Online Mock Tests</h3>
            <p className="text-gray-600">
              Practice real Olympiad style science questions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center hover:scale-105 transition">
            <FaChartLine size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">National Ranking</h3>
            <p className="text-gray-600">
              Compete with students across the country.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center hover:scale-105 transition">
            <FaTrophy size={40} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="font-bold text-xl mb-2">Awards & Certificates</h3>
            <p className="text-gray-600">
              Top performers receive certificates and rewards.
            </p>
          </div>

        </div>

        <div className="text-center mt-12">

          <Link to="/Science_mock" >
            <button className="bg-indigo-600 text-white px-10 py-3 text-lg rounded-full hover:scale-105 transition">
              Start Science Mock Test
            </button>
          </Link>

        </div>

      </div>

    </>
  );
}