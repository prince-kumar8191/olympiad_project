import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- apne logo ka correct path yaha lagana

function RefundReturnsPolicy() {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  const navigate = useNavigate();

  // 🔥 USER DATA
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const toggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  // 🔥 NAVIGATION FUNCTIONS
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");
  const goToAbout = () => navigate("/about");
  const goToScholarship = () => navigate("/scholarship");
  const goToHome = () => navigate("/");
  const goToOlympiads = () => navigate("/olympiads");

  const refundPolicy = [
    {
      title: "1. For Online Educational Services (Olympiad & Online Courses)",
      content: `Issue Resolution
We provide support in the following situations:
• The online class, Olympiad, or service was not conducted as scheduled
• Lack of communication or updates from our team

Non-Refund Policy
Due to the nature of digital education services:
• No refunds will be provided once the course, Olympiad, or service has started (fully or partially)
• Access to study materials, test series, or sessions counts as service initiation`
    },

    {
      title: "2. For Physical Products (Books & Study Materials)",
      content: `Issue Resolution
We offer support in the following cases:
• The book or study material received is damaged or defective

Reporting Window
• You must report the issue within 3 days of delivery
• Please share clear photos/videos as proof for quick verification

Resolution Process
• Once verified, we will provide:
o Replacement, or
o Appropriate resolution as per the case
• In most cases, return of the product is not required`
    },

    {
      title: "3. Situations Not Covered",
      content: `The following cases are not eligible for refund or replacement:
• Incorrect details provided by the customer (address, contact, etc.)
• Minor color/print variations within acceptable limits
• Requests for changes after:
o Enrollment in Olympiad/course
o Printing or dispatch of books has begun`
    },

    {
      title: "4. Service Cancellation Policy",
      content: `• Before Start:
You may cancel within 24 hours of payment, only if the service/course has not started

• After Start:
Once the course, Olympiad, or service has begun, cancellation is not allowed`
    },

    {
      title: "5. Refund Processing (If Approved)",
      content: `In rare approved cases:
• Processing Time: 5–7 business days
• You will receive an email confirmation once the refund is processed

Non-Refundable Cases
• Online courses or Olympiad already started
• Access to digital content already provided
• Delays caused due to incomplete information from the user`
    },

    {
      title: "6. How to Raise an Issue",
      content: (
        <>
          To report any issue, contact us with your details:
          <br />
          <br />
          Email:{" "}
          <a
            href="mailto:support@bhayat.org"
            className="text-indigo-600 font-medium hover:underline"
          >
            support@bhayat.org
          </a>

          <br />

          Phone:{" "}
          <a
            href="tel:+919711301699"
            className="text-indigo-600 font-medium hover:underline"
          >
            +91-9711301699
          </a>

          <br />
          <br />

          Please include:
          <br />
          • Order ID / Enrollment Number
          <br />
          • Brief description of the issue
          <br />
          • Supporting screenshots, photos, or proof
        </>
      )
    },

    {
      title: "7. Our Commitment to You",
      content: `We, BHAYAT NGO, are committed to delivering high-quality educational services, Olympiad programs, and learning materials. Our goal is to ensure a smooth, transparent, and satisfying learning experience for every student.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

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

      {/* PAGE CONTENT */}
      <div className="py-12 px-4">
        {/* HERO */}
        <div className="text-center text-white mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Refund & Returns Policy
          </h1>

          <p className="opacity-90">
            Education Services, Olympiads, Online Courses, Books & Study Materials
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-6 md:p-10">
          {refundPolicy.map((item, index) => (
            <div
              key={index}
              className="border-b last:border-none py-4"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left font-semibold text-lg text-gray-800 hover:text-indigo-600 transition"
              >
                {item.title}

                <FaChevronDown
                  className={`transition-transform duration-300 ${active === index ? "rotate-180 text-indigo-600" : ""
                    }`}
                />
              </button>

              {active === index && (
                <div className="mt-3 text-gray-600 whitespace-pre-line leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div>
          <h2 className="text-xl font-semibold mt-6 pt-4 text-center text-white-100 text-sm sm:text-base">© 2026 BHAYAT. All Copyrights Reserved</h2>
        </div>
      </div>
    </div>

  );
}

export default RefundReturnsPolicy;