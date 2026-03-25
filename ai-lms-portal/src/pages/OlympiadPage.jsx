
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";

export default function OlympiadPage() {

  const [menuOpen, setMenuOpen] = useState(false);

  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <>

      {/* NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-indigo-600">OlympiadHub</h1>

          <div className="hidden md:flex gap-6 font-semibold">
            <Link to="/"> <span>Home</span> </Link>
             <Link to="/about"> <span>About </span></Link>
            <span>Olympiads</span>
           

            <button onClick={goToLogin} className="border px-4 py-1 rounded">
              Login
            </button>

            <button onClick={goToSignup} className="bg-indigo-600 text-white px-4 py-1 rounded">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden p-4 flex flex-col gap-3 bg-white">
            <Link to="/"> <span>Home</span> </Link>
            <span>Olympiads</span>
            <Link to="/about"> <span>About </span></Link>
            <button onClick={goToLogin} className="border p-2 rounded">
              Login
            </button>
            <button onClick={goToSignup} className="bg-indigo-600 text-white p-2 rounded">
              Sign Up
            </button>
          </div>
        )}
      </nav>

      {/* ORIGINAL PAGE CONTENT (UNCHANGED) */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">

        <h1 className="text-5xl font-bold text-center text-indigo-600 mb-6">
          Olympiad
        </h1>

        <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
          Olympiad exams are competitive exams designed to improve analytical,
          logical and problem-solving skills of students. Participate in
          Previous Year Questions (PYQs) and Mock Tests to strengthen
          your preparation and achieve national ranking.
        </p>

        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600">
          Select Your Class
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[6,7,8,9,10,11,12].map((cls) => (
            <div
              key={cls}
              className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition"
            >
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">
                Class {cls}
              </h3>

              <div className="flex justify-center gap-4">
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:scale-110 transition">
                  Subjects
                </button>

                <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:scale-110 transition">
                  PYQ
                </button>

                <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:scale-110 transition">
                  Mock Test
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      <Footer />

    </>
  );
}