
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";
import logo from "../assets/logo.png"

export default function App() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
 const isLoggedIn = localStorage.getItem("isLoggedIn");
const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const isCoordinator = localStorage.getItem("coordinatorLogin");

  const languages = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese",
    "Maithili", "Santali", "Kashmiri", "Nepali", "Sindhi", "Konkani", "Dogri"
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);




  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");
  const goToRegister = () => navigate("signup/student_signup");
  const goToScholarship = () => navigate("/scholarship");

  // ✅ ADDED
  const goToAbout = () => navigate("/about");

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans dark:bg-gray-900 dark:text-white">


      {/* NAVBAR */}

<nav className="bg-white/70 dark:bg-gray-800 backdrop-blur-lg shadow-md sticky top-0 z-[999] relative">
  <div className="flex justify-between items-center px-6 md:px-10 py-4">

    {/* 🔥 LOGO + NAME */}
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="Bhayat Logo"
        className="h-12 w-auto object-contain scale-[3.0] origin-left"
      />
    </div>

    {/* RIGHT SIDE MENU */}
    <div className="hidden md:flex items-center gap-6 font-semibold"></div>

    <div className="hidden md:flex items-center gap-6 font-semibold">
      <a className="hover:text-indigo-600 cursor-pointer">Home</a>

      {/* ✅ UPDATED */}
      <a onClick={goToAbout} className="hover:text-indigo-600 cursor-pointer">
        About
      </a>

      <a className="hover:text-indigo-600 cursor-pointer">Olympiads</a>

      {/* ✅ NEW OPTION */}
      <a onClick={goToScholarship} className="hover:text-indigo-600 cursor-pointer">
        Scholarship
      </a>

     {isLoggedIn ? (
        <div className="flex items-center gap-4">

          <span>👤 {user.name || role}</span>

          {/* 🔥 ROLE DASHBOARD */}
          {role === "student" && (
            <button onClick={() => navigate("/Student_Dashboard")} className="btn">
              📊 Dashboard
            </button>
          )}

          {role === "coordinator" && (
            <button onClick={() => navigate("/Coordinator_Dashboard")} className="btn">
              📊 Dashboard
            </button>
          )}

          {role === "volunteer" && (
            <button onClick={() => navigate("/Volunteer_Dashboard")} className="btn">
              📊 Dashboard
            </button>
          )}

          {role === "school" && (
            <button onClick={() => navigate("/School_Dashboard")} className="btn">
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
          <button onClick={goToLogin} className="btn">Login</button>
          <button onClick={goToSignup} className="btn-primary">Sign Up</button>
        </>
      )}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="text-2xl hover:rotate-90 transition"
      >
        ⚙️
      </button>
    </div>

    <button
      className="md:hidden text-3xl"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>
  </div>

  {menuOpen && (
    <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-white dark:bg-gray-800">
      <a>Home</a>
      <a>Olympiads</a>
      <a>Scholarship</a>
      <a onClick={goToAbout}>About</a>

    
      {isLoggedIn ? (
        <>
          <span>👤 {user.name || role}</span>

          {/* DASHBOARD */}
          {role === "student" && (
            <button onClick={() => navigate("/Student_Dashboard")}>Dashboard</button>
          )}

          {role === "coordinator" && (
            <button onClick={() => navigate("/Coordinator_Dashboard")}>Dashboard</button>
          )}

          {role === "volunteer" && (
            <button onClick={() => navigate("/Volunteer_Dashboard")}>Dashboard</button>
          )}

          {role === "school" && (
            <button onClick={() => navigate("/School_Dashboard")}>Dashboard</button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="text-red-500"
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

      <button
        onClick={() => setShowSettings(!showSettings)}
        className="py-2 border rounded bg-gray-100 dark:bg-gray-700"
      >
        ⚙️ Settings
      </button>
    </div>
  )}

  {showSettings && (
    <div className="absolute right-10 top-20 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <span>Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full border p-1 rounded"
        >
          {languages.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <hr className="my-2" />

      <button className="block w-full text-left py-1 hover:text-indigo-600">
        Edit Profile
      </button>
      <button className="block w-full text-left py-1 hover:text-indigo-600">
        Feedback
      </button>
      <button className="block w-full text-left py-1 hover:text-indigo-600">
        Privacy & Policy
      </button>
    </div>
  )}
</nav>


      {/* HERO SECTION */}
      <section className="text-center py-28 px-6 relative overflow-hidden">
        <h2 className="text-6xl font-extrabold text-indigo-600 mb-6 leading-tight">
          India's Most <span className="text-indigo-600">Exciting</span><br />
          Olympiad Platform
        </h2>

        <p className="text-lg text-indigo-600 mb-10 max-w-2xl mx-auto">
          Compete with top students nationwide, test your knowledge,
          and win certificates & scholarships.
        </p>


        <button
          onClick={() => navigate("/olympiad")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-110 transition">
          Start Your Journey 🚀
        </button>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-10">
        <h3 className="text-4xl font-bold text-center mb-16 text-indigo-600">
          Why Choose Our Olympiad?
        </h3>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: "🏆", title: "National Ranking", text: "See your rank among thousands of students." },
            { icon: "⚡", title: "Instant Results", text: "Get results immediately after exams." },
            { icon: "💻", title: "Online Exams", text: "Attend exams anytime from anywhere." },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:scale-105 transition text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-2xl font-bold mb-3 text-indigo-600">{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>


      </section>

      {/* SUBJECTS SECTION */}
      <section className="py-20 bg-white/60 dark:bg-gray-800">
        <h3 className="text-4xl font-bold text-center mb-16 text-indigo-600">
          Popular Olympiads
        </h3>



        <div className="grid md:grid-cols-4 gap-10 px-10">
          {[
            { name: "Mathematics", emoji: "📐", link: "/Math_Olympiad" },
            { name: "Science", emoji: "🔬", link: "/Science_Olympiad" },
            { name: "English", emoji: "📚", link: "/English_Olympiad" },
            { name: "Computer", emoji: "💻", link: "/Computer_Olympiad" }
          ].map((sub, i) => (

            <Link to={sub.link} key={i}>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-10 rounded-3xl shadow-xl hover:scale-110 transition text-center">
                <div className="text-5xl mb-4">{sub.emoji}</div>
                <h4 className="text-2xl font-bold">{sub.name}</h4>
              </div>
            </Link>

          ))}
        </div>


      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h3 className="text-5xl font-bold mb-6 text-indigo-600">
          Ready to Become a Champion?
        </h3>

        <button
          onClick={goToRegister}
          className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg hover:scale-110 transition"
        >
          Register Now 🎯
        </button>
      </section>


      <Footer />

    </div>
  );
}