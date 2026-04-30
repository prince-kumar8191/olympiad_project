import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Class9Science() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showAwards, setShowAwards] = useState(false);

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

  const syllabusData = [
    {
      subject: "Science",
      color: "from-emerald-500 to-green-600",
      lightBg: "from-emerald-50 to-green-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      content: [
        {
          title: "1. Cell Biology & Genetics",
          topics: [
            "Cell Structure and Cell Division",
            "DNA, Genes & Chromosomes (Basic Structure & Role)",
            "Mendel’s Laws of Inheritance and Dominant & Recessive Traits",
            "Punnett Squares and Variation & Heredity",
          ],
        },
        {
          title: "2. Chemistry (A) Chemical Reactions",
          topics: [
            "Types of Reactions (Combination, Decomposition, Displacement, Redox)",
            "Balancing Chemical Equations and Reactivity Series",
            "Exothermic & Endothermic Reactions",
          ],
        },
        {
          title: "2. Chemistry (B) Periodic Table",
          topics: [
            "Modern Periodic Table Structure and Groups & Periods Trends",
            "Atomic Size, Valency, Metallic/Non-Metallic Character",
            "Properties of Elements (Comparison-Based)",
          ],
        },
        {
          title: "3. Astronomy",
          topics: [
            "Solar System, Stars and Galaxies & Universe Basics",
            "Motions of Earth and Phases of Moon & Eclipses",
          ],
        },
        {
          title: "4. Physics (A) Motion",
          topics: [
            "Distance, Displacement, Speed, Velocity",
            "Acceleration, Graphs and Equations of Motion",
          ],
        },
        {
          title: "4. Physics (B) Forces & Energy",
          topics: [
            "Types of Forces (Balanced/Unbalanced) and Newton’s Laws",
            "Work, Power and Conservation of Energy and Gravitation (Basic)",
          ],
        },
        {
          title: "5. Earth Science (A) Geology",
          topics: [
            "Structure of Earth (Crust, Mantle, Core)",
            "Rocks, Minerals and Rock Cycle",
          ],
        },
        {
          title: "5. Earth Science (B) Climate",
          topics: [
            "Weather vs Climate and Atmospheric Layers",
            "Climate Change Basics",
          ],
        },
        {
          title: "5. Earth Science (C) Natural Disasters",
          topics: [
            "Earthquakes, Volcanoes, Floods, Cyclones",
            "Causes & Prevention",
          ],
        },
        {
          title: "6. Environmental Science",
          topics: [
            "Pollution (Air, Water, Soil, Noise)",
            "Natural Resources and Conservation Methods",
            "Ecosystems, Food Chains and Biodiversity",
            "Sustainable Development",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-600 to-teal-500">
      {/* 🔥 NAVBAR */}
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

      {/* 🔥 PAGE CONTENT */}
      <div className="py-12 px-4 md:px-8">
        {/* HERO */}
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            CLASS IX - SCIENCE
          </h1>

          <p className="opacity-90 text-lg">For National Olympiad</p>
        </div>

        {/* 🔥 SYLLABUS SECTIONS */}
        <div className="max-w-6xl mx-auto">
          {syllabusData.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 overflow-hidden rounded-2xl mb-6"
            >
              {/* SUBJECT */}
              <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-green-50">
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Subject
                </p>

                <div
                  className={`inline-block bg-gradient-to-r ${item.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-md w-fit`}
                >
                  {item.subject}
                </div>

                <p className={`mt-3 text-sm font-medium ${item.text}`}>
                  National Olympiad Syllabus
                </p>
              </div>

              {/* CONTENT */}
              <div className="px-6 py-6">
                <p className="text-sm font-semibold text-gray-500 mb-3">
                  Content
                </p>

                <div className="space-y-5">
                  {item.content.map((section, i) => (
                    <div
                      key={i}
                      className={`bg-gradient-to-r ${item.lightBg} border ${item.border} rounded-xl p-4 shadow-sm hover:shadow-md transition`}
                    >
                      <h3 className={`font-semibold ${item.text} text-lg mb-2`}>
                        {section.title}
                      </h3>

                      {section.topics.length > 0 && (
                        <ul className="space-y-1 pl-2">
                          {section.topics.map((topic, idx) => (
                            <li
                              key={idx}
                              className="text-gray-700 flex items-start gap-2"
                            >
                              <span className="text-pink-500 mt-[2px]">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center text-white mt-10 opacity-80">
          © 2026 BHAYAT. All Copyrights Reserved
        </div>
      </div>
    </div>
  );
}

export default Class9Science;