import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Gallery1 from "../image/Gallery1.jpeg";
import Gallery2 from "../image/Gallery2.jpeg";
import Gallery3 from "../image/Gallery3.jpeg";
import Gallery4 from "../image/Gallery4.jpeg";
import Gallery5 from "../image/Gallery5.jpeg";
import GovSchoolKids from "../image/studentimgage.webp"; // 🔥 HEADER IMAGE
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png";

function Bhayat() {
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
      {/* ANIMATION + CUSTOM CSS */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% {
            box-shadow: 0 0 35px rgba(99, 102, 241, 0.25);
          }
          100% {
            box-shadow: 0 0 0 rgba(99, 102, 241, 0.4);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 8s infinite;
        }

        .animate-fadeUp {
          animation: fadeUp 1s ease forwards;
        }

        .animate-zoomIn {
          animation: zoomIn 1s ease forwards;
        }

        .animate-glow {
          animation: pulseGlow 3s infinite ease-in-out;
        }

        .animated-gradient {
          background: linear-gradient(-45deg, #4f46e5, #7c3aed, #2563eb, #0ea5e9);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }

        .glass {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .section-title {
          position: relative;
          display: inline-block;
        }

        /* ❌ HEADING KE NICHE LINE HATA DI */
        .section-title::after {
          display: none;
        }

        .hover-lift {
          transition: all 0.35s ease;
        }

        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.15);
        }

        .image-hover {
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        .image-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
        }

        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          left: 0;
          bottom: -4px;
          background: #4f46e5;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hero-overlay {
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
        }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-blue-50">
        {/* FLOATING BACKGROUND BLOBS */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>

        {/* NAVBAR */}
        <nav className="bg-white/70 backdrop-blur-xl shadow-md sticky top-0 z-[999] relative border-b border-white/40">
          <div className="flex justify-between items-center px-6 md:px-10 py-4">
            {/* 🔥 LOGO + NAME */}
            <div
              className="flex items-center gap-3 cursor-pointer transition duration-300 hover:scale-105"
              onClick={goToHome}
            >
              <img
                src={logo}
                alt="Bhayat Logo"
                className="h-12 w-auto object-contain scale-[3.0] origin-left drop-shadow-md"
              />
            </div>

            {/* RIGHT SIDE MENU */}
            <div className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
              <a onClick={goToHome} className="nav-link hover:text-indigo-600 cursor-pointer">
                Home
              </a>

              <a onClick={goToAbout} className="nav-link hover:text-indigo-600 cursor-pointer">
                About
              </a>

              <div className="relative">
                <button
                  onClick={() => setShowAwards(!showAwards)}
                  className="nav-link hover:text-indigo-600 cursor-pointer"
                >
                  Awards
                </button>

                {showAwards && (
                  <div className="absolute top-12 left-0 glass shadow-2xl rounded-2xl p-3 w-56 z-50 animate-fadeUp">
                    <button
                      onClick={() => {
                        navigate("/Student_Award");
                        setShowAwards(false);
                      }}
                      className="block w-full text-left py-2 px-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      Student Awards and Recognition
                    </button>

                    <button
                      onClick={() => {
                        navigate("/School_Award");
                        setShowAwards(false);
                      }}
                      className="block w-full text-left py-2 px-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      School Awards and Recognition
                    </button>
                  </div>
                )}
              </div>

              <a
                onClick={() => navigate("/Criteria")}
                className="nav-link hover:text-indigo-600 cursor-pointer"
              >
                Criteria
              </a>

              <a onClick={goToOlympiads} className="nav-link hover:text-indigo-600 cursor-pointer">
                Olympiads
              </a>

              <a
                onClick={goToScholarship}
                className="nav-link hover:text-indigo-600 cursor-pointer"
              >
                Scholarship
              </a>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full shadow-sm">
                    👤 {user.name || role}
                  </span>

                  {/* 🔥 ROLE DASHBOARD */}
                  {role === "student" && (
                    <button
                      onClick={() => navigate("/Student_Dashboard")}
                      className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "coordinator" && (
                    <button
                      onClick={() => navigate("/Coordinator_Dashboard")}
                      className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "volunteer" && (
                    <button
                      onClick={() => navigate("/Volunteer_Dashboard")}
                      className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "school" && (
                    <button
                      onClick={() => navigate("/School_Dashboard")}
                      className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
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
                    className="border-2 border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={goToLogin}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                  >
                    Login
                  </button>

                  <button
                    onClick={goToSignup}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition hover:scale-105 animate-glow"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-3xl text-indigo-700 hover:scale-110 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-white/90 backdrop-blur-xl animate-fadeUp">
              <a onClick={goToHome} className="cursor-pointer hover:text-indigo-600 transition">
                Home
              </a>
              <a
                onClick={goToOlympiads}
                className="cursor-pointer hover:text-indigo-600 transition"
              >
                Olympiads
              </a>
              <a
                onClick={goToScholarship}
                className="cursor-pointer hover:text-indigo-600 transition"
              >
                Scholarship
              </a>
              <a onClick={goToAbout} className="cursor-pointer hover:text-indigo-600 transition">
                About
              </a>

              <div>
                <button onClick={() => setShowAwards(!showAwards)} className="hover:text-indigo-600 transition">
                  Awards
                </button>

                {showAwards && (
                  <div className="ml-4 mt-2 flex flex-col gap-2 animate-fadeUp">
                    <button onClick={() => navigate("/Student_Award")} className="text-left hover:text-indigo-600">
                      Student Awards and Recognition
                    </button>
                    <button onClick={() => navigate("/School_Award")} className="text-left hover:text-indigo-600">
                      School Awards and Recognition
                    </button>
                  </div>
                )}
              </div>

              <a onClick={() => navigate("/Criteria")} className="hover:text-indigo-600 transition">
                Criteria
              </a>

              {isLoggedIn ? (
                <>
                  <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full w-fit">
                    👤 {user.name || role}
                  </span>

                  {/* DASHBOARD */}
                  {role === "student" && (
                    <button onClick={() => navigate("/Student_Dashboard")} className="text-left hover:text-indigo-600">
                      Dashboard
                    </button>
                  )}

                  {role === "coordinator" && (
                    <button onClick={() => navigate("/Coordinator_Dashboard")} className="text-left hover:text-indigo-600">
                      Dashboard
                    </button>
                  )}

                  {role === "volunteer" && (
                    <button onClick={() => navigate("/Volunteer_Dashboard")} className="text-left hover:text-indigo-600">
                      Dashboard
                    </button>
                  )}

                  {role === "school" && (
                    <button onClick={() => navigate("/School_Dashboard")} className="text-left hover:text-indigo-600">
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
                  <button onClick={goToLogin} className="text-left hover:text-indigo-600">
                    Login
                  </button>
                  <button onClick={goToSignup} className="text-left hover:text-indigo-600">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </nav>

        {/* HERO SECTION WITH HEADER IMAGE */}
        <section
          className="relative text-center py-28 px-6 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${GovSchoolKids})`,
          }}
        >
          <div className="absolute inset-0 hero-overlay"></div>

          <div className="relative z-10 animate-fadeUp">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wide drop-shadow-lg animate-float">
              BHAYAT NGO
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-white/95">
              Empowering young minds through education, technology, and environmental awareness.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={goToOlympiads}
                className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition"
              >
                Explore Olympiads
              </button>

              <button
                onClick={goToScholarship}
                className="border border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition hover:scale-105"
              >
                View Scholarship
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-zoomIn">
            <img
              src={Gallery1}
              className="rounded-3xl shadow-2xl image-hover"
              alt="Children learning"
            />
          </div>

          <div className="animate-fadeUp">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6 section-title">
              About BHAYAT NGO
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg mt-6">
              BHAYAT NGO is a non-profit organization established in 2010 by a
              group of passionate individuals committed to building a healthy,
              educated, and self-reliant India. The organization works towards
              the socio-economic development of underprivileged communities
              through education, health awareness, environmental protection,
              women empowerment, training programs and relief initiatives.
            </p>
          </div>
        </section>

        {/* DIGITAL OLYMPIAD SECTION */}
        <section className="bg-white/60 backdrop-blur-sm py-20 relative">
          <div className="max-w-6xl mx-auto px-6 text-center animate-fadeUp">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-6 section-title">
              🌱 Go Green, Go Digital Olympiad
            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 mb-10 text-lg leading-relaxed mt-6">
              This initiative combines environmental awareness with digital
              learning to inspire students to become responsible digital
              citizens while promoting sustainability.
            </p>

            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={Gallery2}
                className="mx-auto image-hover mb-2 w-full md:w-2/3 rounded-3xl"
                alt="Digital Olympiad"
              />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-14 section-title">
              Olympiad Portal Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-14">
              <div className="glass p-8 rounded-3xl shadow-lg hover-lift animate-fadeUp">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-600">
                  Easy Participation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Students can easily register and participate in the Digital
                  Olympiad through our online portal.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl shadow-lg hover-lift animate-fadeUp">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-600">
                  Interactive Learning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Access study materials, syllabus, previous year questions and
                  mock tests.
                </p>
              </div>

              <div className="glass p-8 rounded-3xl shadow-lg hover-lift animate-fadeUp">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-indigo-600">
                  Digital Awareness
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Promotes environmental consciousness with digital innovation
                  and learning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-20 relative">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12 section-title">
              Children Learning & Innovation
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-14">
              <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                <img
                  src={Gallery3}
                  className="rounded-3xl shadow image-hover w-full h-full object-cover"
                  alt="Gallery 1"
                />
              </div>

              <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                <img
                  src={Gallery4}
                  className="rounded-3xl shadow image-hover w-full h-full object-cover"
                  alt="Gallery 2"
                />
              </div>

              <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                <img
                  src={Gallery5}
                  className="rounded-3xl shadow image-hover w-full h-full object-cover"
                  alt="Gallery 3"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default Bhayat;