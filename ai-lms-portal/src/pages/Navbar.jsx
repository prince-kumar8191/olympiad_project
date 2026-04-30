





import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar({ isLoggedIn, user, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Criteria", path: "/Criteria" },
    { name: "Olympiads", path: "/olympiads" },
    { name: "Scholarship", path: "/scholarship" },
  ];

  return (
    <nav className="sticky top-0 z-[999] bg-black/90 backdrop-blur-xl border-b border-pink-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

      <div className="flex justify-between items-center px-6 md:px-10 py-4">

        {/* 🔥 LOGO */}
        <motion.div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center group"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={logo}
            alt="logo"
            className="h-10 scale-[2.2] origin-left transition duration-300 group-hover:scale-[2.4]"
          />
        </motion.div>

        {/* 🔥 DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-white">

          {navItems.map((item, index) => (
            <div key={index} className="relative group cursor-pointer px-1">

              <span
                onClick={() => navigate(item.path)}
                className="relative z-10 hover:text-pink-400 transition"
              >
                {item.name}
              </span>

              {/* 🔥 PINK UNDERLINE */}
              <span
                className={`absolute left-0 -bottom-1 h-[3px] rounded-full 
                bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500
                transition-all duration-500
                ${location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>

              {/* 🔥 HOVER GLOW */}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 bg-pink-500/10 blur-md"></span>
            </div>
          ))}

          {/* 🔥 AWARDS */}
          <div className="relative">
            <span
              onClick={() => setShowAwards(!showAwards)}
              className="cursor-pointer relative group text-white hover:text-pink-400 transition"
            >
              Awards

              <span className="absolute left-0 -bottom-1 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-pink-400 to-fuchsia-500 transition-all duration-300"></span>
            </span>

            {showAwards && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 left-0 w-60 rounded-2xl border border-pink-500/20 bg-black/95 backdrop-blur-xl shadow-2xl p-3"
              >
                <button
                  onClick={() => {
                    navigate("/Student_Award");
                    setShowAwards(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-pink-500/10 transition text-white"
                >
                  🎓 Student Awards
                </button>

                <button
                  onClick={() => {
                    navigate("/School_Award");
                    setShowAwards(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-lg hover:bg-pink-500/10 transition text-white"
                >
                  🏫 School Awards
                </button>
              </motion.div>
            )}
          </div>

          {/* 🔥 AUTH */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 ml-4">

              <span className="text-gray-300 text-sm">
                👤 {user?.name || role}
              </span>

              {/* DASHBOARD */}
              <button
                onClick={() => navigate(`/${role}_Dashboard`)}
                className="relative px-5 py-2 rounded-full border border-pink-400/40 overflow-hidden group"
              >
                <span className="relative z-10 text-pink-300">
                  Dashboard
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="relative px-5 py-2 rounded-full border border-red-400/40 overflow-hidden group"
              >
                <span className="relative z-10 text-red-400">
                  Logout
                </span>
                <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full border border-pink-400 text-pink-300 hover:bg-pink-500 hover:text-white transition duration-300"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:scale-105 transition duration-300 shadow-lg shadow-pink-500/30"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* 🔥 MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-black/95 backdrop-blur-xl text-white font-semibold"
        >
          {navItems.map((item, index) => (
            <span key={index} onClick={() => navigate(item.path)}>
              {item.name}
            </span>
          ))}

          <span onClick={() => setShowAwards(!showAwards)}>
            Awards
          </span>

          {isLoggedIn ? (
            <>
              <button onClick={() => navigate(`/${role}_Dashboard`)}>
                Dashboard
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className="text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}