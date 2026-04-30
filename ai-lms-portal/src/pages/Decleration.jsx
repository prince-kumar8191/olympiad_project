import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer";
import {
  FaShieldAlt,
  FaGlobe,
  FaEnvelope,
  FaExclamationTriangle,
  FaLink,
  FaServer,
  FaInfoCircle,
  FaAward,
} from "react-icons/fa";
import logo from "../assets/logo.png";

function Disclaimer() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  // Login check
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    if (storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setUser(storedUser);
    }
  }, []);

  // Navigation functions
  const goToHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  const goToAbout = () => {
    setMenuOpen(false);
    navigate("/about");
  };

  const goToOlympiads = () => {
    setMenuOpen(false);
    navigate("/olympiads");
  };

  const goToScholarship = () => {
    setMenuOpen(false);
    navigate("/scholarship");
  };

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/login");
  };

  const goToSignup = () => {
    setMenuOpen(false);
    navigate("/signup");
  };

  const goToCriteria = () => {
    setMenuOpen(false);
    navigate("/Criteria");
  };

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/login");
  };

  const sections = [
    {
      icon: <FaInfoCircle className="text-indigo-600 text-2xl" />,
      title: "General Information",
      text: "The information provided on the Bhayat Olympiad website is intended for general informational and educational purposes only. While we make every effort to ensure that the content is accurate, current, and useful, Bhayat Olympiad does not guarantee the completeness, reliability, or accuracy of any information available on the website.",
    },
    {
      icon: <FaExclamationTriangle className="text-yellow-500 text-2xl" />,
      title: "Use at Your Own Risk",
      text: "Any action you take based on the information found on this website is strictly at your own risk. Bhayat Olympiad will not be held responsible for any losses or damages, including but not limited to indirect, incidental, or consequential losses, arising from the use of our website or reliance on its content.",
    },
    {
      icon: <FaLink className="text-pink-500 text-2xl" />,
      title: "Third-Party Links",
      text: "Our website may contain links to third-party websites for additional information or convenience. Please note that Bhayat Olympiad has no control over the content, nature, or availability of these external sites. The inclusion of any links does not imply endorsement or recommendation of the views or services offered by them.",
    },
    {
      icon: <FaServer className="text-green-500 text-2xl" />,
      title: "Website Availability",
      text: "We are committed to keeping the website accessible and running smoothly. However, Bhayat Olympiad shall not be liable for any temporary unavailability of the website due to technical issues or circumstances beyond our control.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 overflow-x-hidden relative">
      
      {/* 🔥 Background Animated Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl animate-bounce pointer-events-none"></div>

      {/* ================= NAVBAR ================= */}
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
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    Student Awards and Recognition
                  </button>

                  <button
                    onClick={() => {
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

            <a
              onClick={goToCriteria}
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

            <div className="relative">
              <button
                onClick={() => setShowAwards(!showAwards)}
                className="hover:text-indigo-600 cursor-pointer"
              >
                Awards
              </button>

              {showAwards && (
                <div className="mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 w-full z-50">
                  <button
                    onClick={() => {
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

            <a onClick={goToCriteria} className="cursor-pointer">
              Criteria
            </a>

            {isLoggedIn ? (
              <>
                <span>👤 {user.name || role}</span>

                {/* DASHBOARD */}
                {role === "student" && (
                  <button
                    onClick={() => {
                      navigate("/Student_Dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Dashboard
                  </button>
                )}

                {role === "coordinator" && (
                  <button
                    onClick={() => {
                      navigate("/Coordinator_Dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Dashboard
                  </button>
                )}

                {role === "volunteer" && (
                  <button
                    onClick={() => {
                      navigate("/Volunteer_Dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Dashboard
                  </button>
                )}

                {role === "school" && (
                  <button
                    onClick={() => {
                      navigate("/School_Dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Dashboard
                  </button>
                )}

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
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

      {/* ================= HERO ================= */}
      <section className="relative h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop"
          alt="Disclaimer Hero"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-white/20 mb-6 animate-bounce">
            <FaShieldAlt className="text-white text-xl" />
            <span className="font-semibold text-white">Bhayat Olympiad Disclaimer</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Important <span className="text-yellow-300">Disclaimer</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Please read this disclaimer carefully before using the Bhayat Olympiad website.
            Your trust matters to us, and we aim to keep our platform transparent, safe, and informative.
          </p>
        </div>
      </section>

      {/* ================= DISCLAIMER CARDS ================= */}
      <section className="relative z-10 px-6 md:px-16 pb-16 pt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {sections.map((item, index) => (
            <div
              key={index}
              className="group bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {item.title}
              </h2>

              <p className="text-gray-600 leading-relaxed text-[16px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HIGHLIGHT BOX ================= */}
      <section className="relative z-10 px-6 md:px-16 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <FaAward className="text-3xl" />
                <h3 className="text-2xl md:text-3xl font-bold">Our Commitment</h3>
              </div>

              <p className="text-white/90 text-lg leading-relaxed">
                Bhayat Olympiad is committed to delivering valuable educational content
                and maintaining a reliable online experience. While we strive for accuracy
                and smooth website performance, users are encouraged to independently verify
                important information when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="relative z-10 px-6 md:px-16 pb-20">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaEnvelope className="text-indigo-600 text-2xl" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Information
          </h2>

          <p className="text-gray-600 text-lg mb-6">
            If you have any questions regarding this disclaimer, feel free to contact us.
          </p>

          <div className="space-y-4 text-lg">
            <p className="flex items-center justify-center gap-3 text-gray-800 font-medium">
              <FaEnvelope className="text-indigo-600" />
              support@bhayatolympiad.org
            </p>

            <p className="flex items-center justify-center gap-3 text-gray-800 font-medium">
              <FaGlobe className="text-indigo-600" />
              www.bhayatolympiad.org
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}

export default Disclaimer;