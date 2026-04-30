import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaRobot,
  FaTrophy,
  FaBookOpen,
  FaComments,
  FaHeartbeat,
  FaBullseye,
  FaAward,
  FaBrain,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import Footer from "../pages/auth/Footer";

function Programs() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    // ✅ PAGE HAMESHA TOP SE KHULE
    window.scrollTo(0, 0);

    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    if (storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setUser(storedUser);
    }
  }, []);

  // ================= NAVIGATION =================
  const goToHome = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/");
  };

  const goToAbout = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/about");
  };

  const goToOlympiads = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/olympiads");
  };

  const goToScholarship = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/scholarship");
  };

  const goToLogin = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/login");
  };

  const goToSignup = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/signup");
  };

  const goToCriteria = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/Criteria");
  };

  const goToPrograms = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/programs");
  };

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/login");
  };

  // ================= PROGRAMS DATA =================
  const programs = [
    {
      id: 1,
      icon: <FaGraduationCap className="text-3xl text-indigo-600" />,
      title: "Academic & Educational Programs",
      subtitle: "Strong subject foundations with structured academic growth",
      description:
        "These programs are closely aligned with academic curricula to strengthen subject knowledge and build strong conceptual foundations. With structured learning, chapter-wise assessments, and continuous performance tracking, learners can consistently improve their academic outcomes.",
      gradient: "from-indigo-500 to-blue-500",
      bg: "from-indigo-50 to-blue-50",
    },
    {
      id: 2,
      icon: <FaLaptopCode className="text-3xl text-purple-600" />,
      title: "IT, AI & Future Technology Programs",
      subtitle: "Learn coding, AI, ML, web development & digital skills",
      description:
        "Focused on building both foundational and advanced technical skills, these programs cover programming, software tools, web development, and digital literacy, along with cutting-edge technologies like Artificial Intelligence, Machine Learning, Data Science, and Automation.",
      gradient: "from-purple-500 to-pink-500",
      bg: "from-purple-50 to-pink-50",
    },
    {
      id: 3,
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      title: "Competition, Assessment & Exam Preparation Programs",
      subtitle: "Olympiads, quizzes, mock tests & exam readiness",
      description:
        "These programs combine competitive assessments with structured exam preparation. Through quizzes, olympiads, mock tests, and detailed performance analytics, participants can evaluate their progress, identify strengths and weaknesses, and build a strong competitive mindset to achieve better results.",
      gradient: "from-yellow-400 to-orange-500",
      bg: "from-yellow-50 to-orange-50",
    },
    {
      id: 4,
      icon: <FaComments className="text-3xl text-green-600" />,
      title: "Language & Communication Programs",
      subtitle: "Boost confidence, fluency & communication skills",
      description:
        "Designed to enhance verbal and written communication skills, these programs improve language proficiency, confidence, and interpersonal abilities—key factors for both academic success and professional growth.",
      gradient: "from-green-500 to-emerald-500",
      bg: "from-green-50 to-emerald-50",
    },
    {
      id: 5,
      icon: <FaHeartbeat className="text-3xl text-rose-500" />,
      title: "Health & Wellness Programs",
      subtitle: "Fitness, mental wellness & healthy lifestyle awareness",
      description:
        "These programs focus on promoting physical fitness, mental well-being, and a balanced lifestyle through awareness sessions, wellness activities, and health-focused initiatives.",
      gradient: "from-rose-500 to-red-500",
      bg: "from-rose-50 to-red-50",
    },
    {
      id: 6,
      icon: <FaBullseye className="text-3xl text-cyan-600" />,
      title: "Skill Development & Career Programs",
      subtitle: "Soft skills, leadership & future-ready career growth",
      description:
        "Aimed at making individuals industry-ready, these programs focus on soft skills, leadership, communication, and career planning, along with practical, job-oriented technical skills to support long-term professional success.",
      gradient: "from-cyan-500 to-sky-500",
      bg: "from-cyan-50 to-sky-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-x-hidden relative">
      {/* ================= BACKGROUND BLOBS ================= */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-sky-300/10 rounded-full blur-3xl animate-bounce pointer-events-none"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-md z-[9999] border-b border-white/40">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={goToHome}
          >
            <img
              src={logo}
              alt="Bhayat Logo"
              className="h-12 w-auto object-contain scale-[3.0] origin-left"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
            <button onClick={goToHome} className="hover:text-indigo-600 transition">
              Home
            </button>

            <button onClick={goToAbout} className="hover:text-indigo-600 transition">
              About
            </button>

            <div className="relative">
              <button
                onClick={() => setShowAwards(!showAwards)}
                className="hover:text-indigo-600 transition"
              >
                Awards
              </button>

              {showAwards && (
                <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-3 w-60 z-50 border border-gray-100">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Student_Award");
                      setShowAwards(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    Student Awards and Recognition
                  </button>

                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/School_Award");
                      setShowAwards(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    School Awards and Recognition
                  </button>
                </div>
              )}
            </div>

            <button onClick={goToCriteria} className="hover:text-indigo-600 transition">
              Criteria
            </button>

            <button onClick={goToOlympiads} className="hover:text-indigo-600 transition">
              Olympiads
            </button>

            <button onClick={goToScholarship} className="hover:text-indigo-600 transition">
              Scholarship
            </button>

            {/* ❌ PROGRAMS NAV TEXT HATA DIYA */}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">👤 {user.name || role}</span>

                {role === "student" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Student_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "coordinator" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Coordinator_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "volunteer" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Volunteer_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "school" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/School_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                <button
                  onClick={handleLogout}
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

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-6 pt-2 font-semibold bg-white shadow-lg">
            <button onClick={goToHome} className="text-left">Home</button>
            <button onClick={goToOlympiads} className="text-left">Olympiads</button>
            <button onClick={goToScholarship} className="text-left">Scholarship</button>
            <button onClick={goToAbout} className="text-left">About</button>

            <div className="relative">
              <button
                onClick={() => setShowAwards(!showAwards)}
                className="text-left hover:text-indigo-600"
              >
                Awards
              </button>

              {showAwards && (
                <div className="mt-2 bg-gray-50 shadow rounded-lg p-3 w-full z-50">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Student_Award");
                      setShowAwards(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    Student Awards and Recognition
                  </button>

                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/School_Award");
                      setShowAwards(false);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    School Awards and Recognition
                  </button>
                </div>
              )}
            </div>

            <button onClick={goToCriteria} className="text-left">Criteria</button>

            {isLoggedIn ? (
              <>
                <span>👤 {user.name || role}</span>

                {role === "student" && (
                  <button onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/Student_Dashboard");
                    setMenuOpen(false);
                  }} className="text-left">
                    Dashboard
                  </button>
                )}

                {role === "coordinator" && (
                  <button onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/Coordinator_Dashboard");
                    setMenuOpen(false);
                  }} className="text-left">
                    Dashboard
                  </button>
                )}

                {role === "volunteer" && (
                  <button onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/Volunteer_Dashboard");
                    setMenuOpen(false);
                  }} className="text-left">
                    Dashboard
                  </button>
                )}

                {role === "school" && (
                  <button onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/School_Dashboard");
                    setMenuOpen(false);
                  }} className="text-left">
                    Dashboard
                  </button>
                )}

                <button onClick={handleLogout} className="text-red-500 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={goToLogin} className="text-left">Login</button>
                <button onClick={goToSignup} className="text-left">Sign Up</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <div className="pt-[110px] relative z-10">
        {/* ================= HERO ================= */}
        <section className="relative min-h-[520px] md:min-h-[620px] flex items-center justify-center overflow-hidden">
          {/* HERO IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
            alt="Programs Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* SOFT CLEAN OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-slate-900/20 to-blue-900/25"></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 md:px-16 text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-white/20 mb-6 animate-bounce">
              <FaBrain className="text-yellow-300 text-xl" />
              <span className="font-semibold text-white">
                Integrated Learning & Development Programs
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl">
              Transforming Learning Into <span className="text-yellow-300">Future Success</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Our platform offers a well-structured set of programs designed to ensure
              academic excellence, technical expertise, competitive readiness, and
              overall personal development.
            </p>
          </div>
        </section>

        {/* ================= PROGRAM CARDS ================= */}
        <section className="px-6 md:px-16 py-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`group relative bg-gradient-to-br ${program.bg} backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 overflow-hidden`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Glow Background */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${program.gradient} opacity-20 rounded-full blur-3xl group-hover:scale-125 transition duration-700`}></div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  {program.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition">
                    {program.title}
                  </h3>

                  <p className="text-sm font-semibold text-indigo-600 mb-4">
                    {program.subtitle}
                  </p>

                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {program.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r ${program.gradient} group-hover:w-32 transition-all duration-500`}></div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY PROGRAMS SECTION ================= */}
        <section className="px-6 md:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                    <FaUsers />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Our Programs Matter
                </h2>

                <p className="text-white/90 text-lg max-w-4xl mx-auto leading-relaxed">
                  Every program is designed to build not just academic strength,
                  but also confidence, communication, technical expertise,
                  leadership, wellness, and career readiness—helping learners
                  grow into well-rounded future achievers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS / HIGHLIGHT ================= */}
        <section className="px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBookOpen className="text-2xl text-indigo-600" />,
                title: "Academic Growth",
                value: "Structured Learning",
              },
              {
                icon: <FaRobot className="text-2xl text-purple-600" />,
                title: "Future Skills",
                value: "AI • Coding • Tech",
              },
              {
                icon: <FaAward className="text-2xl text-yellow-500" />,
                title: "Competitive Edge",
                value: "Tests • Olympiads",
              },
              {
                icon: <FaChalkboardTeacher className="text-2xl text-green-600" />,
                title: "Career Readiness",
                value: "Leadership & Skills",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center shadow mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-indigo-600 font-semibold mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />

        {/* ================= FOOTER ================= */}
        {/* <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Bhayat Olympiad. All rights reserved.</p>
            <p>Empowering learning, growth & future excellence.</p>
          </div>
        </footer> */}
      </div>
    </div>
  );
}

export default Programs;