

import React, { useState } from "react";
import Gallery1 from "../image/Gallery1.jpeg";
import Gallery2 from "../image/Gallery2.jpeg";
import Gallery3 from "../image/Gallery3.jpeg";
import Gallery4 from "../image/Gallery4.jpeg";
import Gallery5 from "../image/Gallery5.jpeg";
import { Link } from "react-router-dom";
import Footer from "./auth/Footer";

function Bhayat() {

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
          <Link to="/"> <span>Home </span></Link>  
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
             <Link to="/"> <span>Home </span></Link> 
            <span>Olympiads</span>
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
      <section className="text-center py-16 px-6 bg-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-4">
          BHAYAT NGO
        </h1>

        <p className="max-w-3xl mx-auto text-lg">
          Empowering young minds through education, technology, and environmental awareness.
        </p>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">

        <img
          src={Gallery1}
          className="rounded-2xl shadow-xl"
          alt="Children learning"
        />

        <div>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            About BHAYAT NGO
          </h2>

          <p className="text-gray-700 leading-relaxed">
            BHAYAT NGO is a non-profit organization established in 2010 by a group of passionate individuals committed to building a healthy, educated, and self-reliant India. The organization works towards the socio-economic development of underprivileged communities through education, health awareness, environmental protection, women empowerment, training programs and relief initiatives.
          </p>
        </div>

      </section>

      {/* DIGITAL OLYMPIAD SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-indigo-600 mb-6">
            🌱 Go Green, Go Digital Olympiad
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 mb-10">
            This initiative combines environmental awareness with digital learning to inspire students to become responsible digital citizens while promoting sustainability.
          </p>

          <img
            src={Gallery2}
            className="mx-auto rounded-xl shadow-lg mb-12 w-full md:w-2/3"
            alt="Digital Olympiad"
          />

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-12">
            Olympiad Portal Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">Easy Participation</h3>
              <p className="text-gray-600">
                Students can easily register and participate in the Digital Olympiad through our online portal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">Interactive Learning</h3>
              <p className="text-gray-600">
                Access study materials, syllabus, previous year questions and mock tests.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">Digital Awareness</h3>
              <p className="text-gray-600">
                Promotes environmental consciousness with digital innovation and learning.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
            Children Learning & Innovation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <img src={Gallery3} className="rounded-xl shadow" alt="Gallery 1" />
            <img src={Gallery4} className="rounded-xl shadow" alt="Gallery 2" />
            <img src={Gallery5} className="rounded-xl shadow" alt="Gallery 3" />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Bhayat;