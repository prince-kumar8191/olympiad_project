

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPaperPlane,
  FaBuilding,
} from "react-icons/fa";

function ContactUs() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  const goToHome = () => navigate("/");
  const goToAbout = () => navigate("/about");
  const goToOlympiads = () => navigate("/olympiads");
  const goToScholarship = () => navigate("/scholarship");

  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔥 PAGE TOP SE OPEN HOGA
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* CUSTOM CSS */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
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

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 120%; }
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
          background: linear-gradient(-45deg, #312e81, #4f46e5, #7c3aed, #0f172a, #2563eb);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }

        .glass {
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .dark-glass {
          background: rgba(17, 24, 39, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 45px rgba(0,0,0,0.25);
        }

        .hover-lift {
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(79, 70, 229, 0.18);
        }

        .hover-lift::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.18),
            transparent
          );
          transform: skewX(-20deg);
        }

        .hover-lift:hover::before {
          animation: shine 1.2s ease;
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
          background: linear-gradient(to right, rgba(15,23,42,0.78), rgba(79,70,229,0.55));
          backdrop-filter: blur(2px);
        }

        /* 🔥 FIXED INPUT STYLE */
        .input-style {
          width: 100%;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.18);
          outline: none;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.95);
          color: #111827 !important; /* typed text black */
          font-weight: 500;
        }

        .input-style::placeholder {
          color: #6b7280 !important;
          opacity: 1;
        }

        .input-style:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
          transform: scale(1.01);
          color: #111827 !important;
        }

        textarea.input-style,
        input.input-style {
          color: #111827 !important;
          caret-color: #111827;
        }

        /* 🔥 Chrome Autofill Fix */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: #111827 !important;
          transition: background-color 5000s ease-in-out 0s;
          box-shadow: 0 0 0px 1000px rgba(255,255,255,0.95) inset !important;
          border-radius: 16px;
        }

        .social-icon {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.92);
          color: #4f46e5;
          box-shadow: 0 10px 20px rgba(0,0,0,0.10);
          transition: all 0.35s ease;
          font-size: 18px;
        }

        .social-icon:hover {
          transform: translateY(-8px) scale(1.12) rotate(4deg);
          color: white;
          box-shadow: 0 18px 35px rgba(0,0,0,0.18);
        }

        .facebook:hover {
          background: #1877F2;
        }

        .instagram:hover {
          background: linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4);
        }

        .linkedin:hover {
          background: #0A66C2;
        }

        .youtube:hover {
          background: #FF0000;
        }

        .text-soft {
          color: rgba(255,255,255,0.88);
        }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 min-h-screen text-white">
        {/* FLOATING BLOBS */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob"></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-blob"></div>

        {/* NAVBAR */}
        <nav className="bg-white/10 backdrop-blur-xl shadow-md sticky top-0 z-[999] relative border-b border-white/10">
          <div className="flex justify-between items-center px-6 md:px-10 py-4">
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

            <div className="hidden md:flex items-center gap-6 font-semibold text-white">
              <a onClick={goToHome} className="nav-link hover:text-indigo-300 cursor-pointer">Home</a>
              <a onClick={goToAbout} className="nav-link hover:text-indigo-300 cursor-pointer">About</a>

              <div className="relative">
                <button
                  onClick={() => setShowAwards(!showAwards)}
                  className="nav-link hover:text-indigo-300 cursor-pointer"
                >
                  Awards
                </button>

                {showAwards && (
                  <div className="absolute top-12 left-0 glass shadow-2xl rounded-2xl p-3 w-56 z-50 animate-fadeUp text-white">
                    <button
                      onClick={() => {
                        navigate("/Student_Award");
                        setShowAwards(false);
                      }}
                      className="block w-full text-left py-2 px-2 rounded-lg hover:bg-white/10 hover:text-indigo-300 transition"
                    >
                      Student Awards and Recognition
                    </button>

                    <button
                      onClick={() => {
                        navigate("/School_Award");
                        setShowAwards(false);
                      }}
                      className="block w-full text-left py-2 px-2 rounded-lg hover:bg-white/10 hover:text-indigo-300 transition"
                    >
                      School Awards and Recognition
                    </button>
                  </div>
                )}
              </div>

              <a onClick={() => navigate("/Criteria")} className="nav-link hover:text-indigo-300 cursor-pointer">
                Criteria
              </a>

              <a onClick={goToOlympiads} className="nav-link hover:text-indigo-300 cursor-pointer">
                Olympiads
              </a>

              <a onClick={goToScholarship} className="nav-link hover:text-indigo-300 cursor-pointer">
                Scholarship
              </a>

              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="bg-white/10 text-white px-4 py-2 rounded-full shadow-sm">
                    👤 {user.name || role}
                  </span>

                  {role === "student" && (
                    <button
                      onClick={() => navigate("/Student_Dashboard")}
                      className="border-2 border-indigo-400 text-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "coordinator" && (
                    <button
                      onClick={() => navigate("/Coordinator_Dashboard")}
                      className="border-2 border-indigo-400 text-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "volunteer" && (
                    <button
                      onClick={() => navigate("/Volunteer_Dashboard")}
                      className="border-2 border-indigo-400 text-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  {role === "school" && (
                    <button
                      onClick={() => navigate("/School_Dashboard")}
                      className="border-2 border-indigo-400 text-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                    >
                      📊 Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="border-2 border-red-400 text-red-300 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={goToLogin}
                    className="border-2 border-indigo-400 text-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
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

            <button
              className="md:hidden text-3xl text-white hover:scale-110 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-slate-950/80 backdrop-blur-xl animate-fadeUp text-white">
              <a onClick={goToHome} className="cursor-pointer hover:text-indigo-300 transition">Home</a>
              <a onClick={goToOlympiads} className="cursor-pointer hover:text-indigo-300 transition">Olympiads</a>
              <a onClick={goToScholarship} className="cursor-pointer hover:text-indigo-300 transition">Scholarship</a>
              <a onClick={goToAbout} className="cursor-pointer hover:text-indigo-300 transition">About</a>

              <div>
                <button onClick={() => setShowAwards(!showAwards)} className="hover:text-indigo-300 transition">
                  Awards
                </button>

                {showAwards && (
                  <div className="ml-4 mt-2 flex flex-col gap-2 animate-fadeUp">
                    <button onClick={() => navigate("/Student_Award")} className="text-left hover:text-indigo-300">
                      Student Awards and Recognition
                    </button>
                    <button onClick={() => navigate("/School_Award")} className="text-left hover:text-indigo-300">
                      School Awards and Recognition
                    </button>
                  </div>
                )}
              </div>

              <a onClick={() => navigate("/Criteria")} className="hover:text-indigo-300 transition">
                Criteria
              </a>

              {isLoggedIn ? (
                <>
                  <span className="bg-white/10 text-white px-4 py-2 rounded-full w-fit">
                    👤 {user.name || role}
                  </span>

                  {role === "student" && (
                    <button onClick={() => navigate("/Student_Dashboard")} className="text-left hover:text-indigo-300">
                      Dashboard
                    </button>
                  )}
                  {role === "coordinator" && (
                    <button onClick={() => navigate("/Coordinator_Dashboard")} className="text-left hover:text-indigo-300">
                      Dashboard
                    </button>
                  )}
                  {role === "volunteer" && (
                    <button onClick={() => navigate("/Volunteer_Dashboard")} className="text-left hover:text-indigo-300">
                      Dashboard
                    </button>
                  )}
                  {role === "school" && (
                    <button onClick={() => navigate("/School_Dashboard")} className="text-left hover:text-indigo-300">
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="text-red-400 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={goToLogin} className="text-left hover:text-indigo-300">Login</button>
                  <button onClick={goToSignup} className="text-left hover:text-indigo-300">Sign Up</button>
                </>
              )}
            </div>
          )}
        </nav>

        {/* HERO SECTION */}
        <section className="relative text-center py-24 px-6 animated-gradient text-white overflow-hidden">
          <div className="absolute inset-0 hero-overlay"></div>

          <div className="relative z-10 animate-fadeUp">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wide drop-shadow-lg animate-float">
              Contact Us
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-white/95">
              We’d love to hear from you. Reach out to BHAYAT NGO anytime.
            </p>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="max-w-7xl mx-auto py-20 px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* LEFT SIDE */}
            <div className="space-y-8 animate-fadeUp">
              <div className="dark-glass rounded-3xl p-8 hover-lift">
                <h2 className="text-3xl font-bold text-indigo-300 mb-6">
                  Get In Touch
                </h2>
                <p className="text-soft leading-relaxed text-lg">
                  For partnerships, school collaboration, volunteer opportunities,
                  support, or any general inquiry, you can contact us through the
                  details below.
                </p>
              </div>

              {/* ADDRESS 1 */}
            
              
              <div className="glass rounded-3xl p-8 hover-lift animate-zoomIn">
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-purple-500/20 text-purple-300 p-4 rounded-2xl text-2xl animate-float">
                    <FaMapMarkerAlt />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-200">
                    Registered Office
                  </h3>
                </div>

                <div className="space-y-4 text-white/90">
                  <div className="flex gap-4 items-start">
                    <FaMapMarkerAlt className="text-purple-300 mt-1 text-xl" />
                    <p className="leading-relaxed">
                      D-322/8, Phase IV, Aya Nagar Ext.,
                      <br />
                      New Delhi - 110047
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <FaPhoneAlt className="text-purple-300 text-lg" />
                    <p>+91 9711301699</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <FaClock className="text-purple-300 text-lg" />
                    <p>Mon - Sat : 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>


               {/* ADDRESS 2 */}

                <div className="glass rounded-3xl p-8 hover-lift animate-zoomIn">
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-indigo-500/20 text-indigo-300 p-4 rounded-2xl text-2xl animate-float">
                    <FaBuilding />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-200">
                    State office
                  </h3>
                </div>

                <div className="space-y-4 text-white/90">
                  <div className="flex gap-4 items-start">
                    <FaMapMarkerAlt className="text-indigo-300 mt-1 text-xl" />
                    <p className="leading-relaxed">
                      <strong>State Office:</strong> Ward No. 98, Near Laxmi Narayan Mandir,
                      <br />
                      Balawala, Dehradun, Uttarakhand - 248001
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <FaEnvelope className="text-indigo-300 text-lg" />
                    <p>support@bhayat.org</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <FaGlobe className="text-indigo-300 text-lg" />
                    <p>bhayat.org</p>
                  </div>

                  <div className="flex gap-4 items-center">
                    <FaPhoneAlt className="text-indigo-300 text-lg" />
                    <p>+91 9058870102</p>
                  </div>
                </div>
              </div>


              {/* SOCIAL */}
              <div className="dark-glass rounded-3xl p-8 hover-lift">
                <h3 className="text-2xl font-bold text-indigo-300 mb-5">
                  Connect With Us
                </h3>

                <div className="flex flex-wrap gap-4 mb-6">
                  <a href="#" className="social-icon facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-icon instagram">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-icon linkedin">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="social-icon youtube">
                    <FaYoutube />
                  </a>
                </div>

                <p className="text-soft">
                  Add your official social links here. You can edit these anytime.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl animate-fadeUp hover-lift">
              <h2 className="text-3xl font-bold text-indigo-200 mb-2">
                Send Us a Message
              </h2>
              <p className="text-white/80 mb-8">
                Fill out the form and you can later connect it with your backend.
              </p>

              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-semibold text-white">
                      Full Name
                    </label>
                    <input type="text" placeholder="Enter your full name" className="input-style" />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-white">
                      Phone Number
                    </label>
                    <input type="text" placeholder="Enter phone number" className="input-style" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-white">
                    Email Address
                  </label>
                  <input type="email" placeholder="Enter your email" className="input-style" />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-white">
                    Subject
                  </label>
                  <input type="text" placeholder="Enter subject here" className="input-style" />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-white">
                    Message
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Write your message here..."
                    className="input-style resize-none"
                  ></textarea>
                </div>

                <div className="dark-glass rounded-2xl p-5 border border-dashed border-indigo-400/30">
                  <h4 className="font-bold text-indigo-300 mb-2">
                    Editable Extra Section
                  </h4>
                  <p className="text-white/75 text-sm">
                    You can replace this with map, WhatsApp number, emergency contact,
                    office timing, branch office details, or anything else later.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition hover:scale-[1.02] flex items-center justify-center gap-3 animate-glow"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* EXTRA INFO STRIP */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-3xl p-6 hover-lift text-center">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-xl font-bold text-indigo-200 mb-2">Call Support</h3>
              <p className="text-white/80">+91 9711301699

</p>
            </div>

            <div className="glass rounded-3xl p-6 hover-lift text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-xl font-bold text-purple-200 mb-2">Email Support</h3>
              <p className="text-white/80">support@bhayat.org</p>
            </div>

            <div className="glass rounded-3xl p-6 hover-lift text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-xl font-bold text-sky-200 mb-2">Website</h3>
              <p className="text-white/80">www.bhayat.org</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ContactUs;