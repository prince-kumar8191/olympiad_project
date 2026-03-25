import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFlask, FaBrain, FaChartLine, FaTrophy, FaLaptopCode, FaMicroscope } from "react-icons/fa";

export default function ScienceOlympiad() {

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
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
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
            <Link to="/">Home</Link>
            <span>Olympiads</span>
            <Link to="/about">About</Link>

            <button onClick={goToLogin} className="border p-2 rounded">
              Login
            </button>

            <button onClick={goToSignup} className="bg-indigo-600 text-white p-2 rounded">
              Sign Up
            </button>
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
            <FaMicroscope size={40} className="mx-auto text-indigo-600 mb-4"/>
            <h3 className="font-bold text-lg">Scientific Thinking</h3>
            <p className="text-gray-600 mt-2">
              Develop curiosity and scientific mindset.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaFlask size={40} className="mx-auto text-indigo-600 mb-4"/>
            <h3 className="font-bold text-lg">Concept Clarity</h3>
            <p className="text-gray-600 mt-2">
              Understand physics, chemistry and biology concepts deeply.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaBrain size={40} className="mx-auto text-indigo-600 mb-4"/>
            <h3 className="font-bold text-lg">Logical Reasoning</h3>
            <p className="text-gray-600 mt-2">
              Improve analytical and reasoning skills.
            </p>
          </div>

          <div className="text-center p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <FaChartLine size={40} className="mx-auto text-indigo-600 mb-4"/>
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
            <FaLaptopCode size={40} className="mx-auto text-indigo-600 mb-4"/>
            <h3 className="font-bold text-xl mb-2">Online Mock Tests</h3>
            <p className="text-gray-600">
              Practice real Olympiad style science questions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center hover:scale-105 transition">
            <FaChartLine size={40} className="mx-auto text-indigo-600 mb-4"/>
            <h3 className="font-bold text-xl mb-2">National Ranking</h3>
            <p className="text-gray-600">
              Compete with students across the country.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center hover:scale-105 transition">
            <FaTrophy size={40} className="mx-auto text-indigo-600 mb-4"/>
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