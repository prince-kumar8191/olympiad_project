import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- apne logo ka correct path yaha lagana

function TermsConditions() {
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

  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: `By submitting the online registration form, the applicant (Volunteer, School, Student, or Coordinator) agrees to comply with and be bound by these Terms and Conditions. If the applicant is a minor (under 18 years), registration must be completed with the consent of a parent/guardian or school authority.`
    },

    {
      title: "2. Eligibility",
      content: `• Volunteers must meet the eligibility criteria specified for the program or event.
• Students must be currently enrolled in a recognized school or educational institution.
• Coordinators must be officially authorized by their respective school or organization.
• The organizing authority reserves the right to verify eligibility.`
    },

    {
      title: "3. Accuracy of Information",
      content: `• All information provided must be true and accurate.
• Submission of incorrect or misleading information may result in cancellation.`
    },

    {
      title: "4. Approval of Registration",
      content: `• Submission of the online form does not guarantee participation.
• Registration will be confirmed only after verification and approval.`
    },

    {
      title: "5. Payments – Fee and Pricing",
      content: `• All fees are listed in Indian Rupees (INR)
• Full payment is required before service begins
• Pricing may change without prior notice`
    },

    {
      title: "6. Refunds & Cancellations",
      content: `Please refer to our Refund & Returns Policy for detailed information regarding refunds and cancellations.`
    },

    {
      title: "7. Code of Conduct",
      content: `• Follow rules and guidelines issued by the organizers
• Maintain discipline and professionalism during activities
• Avoid behavior that may harm the reputation of the organization`
    },

    {
      title: "8. Participation and Responsibilities",
      content: `• Participants must actively participate in assigned tasks
• Coordinators supervise students from their schools
• The organizing authority may assign roles as required`
    },

    {
      title: "9. Use of Personal Information",
      content: `Personal details collected during registration will only be used for program communication and administration.`
    },

    {
      title: "10. Media and Publicity Consent",
      content: `Participants grant permission to use photographs or videos taken during events for promotional materials and official publications.`
    },

    {
      title: "11. Modification or Cancellation",
      content: `The organizing authority may modify schedules or cancel events due to unforeseen circumstances.`
    },

    {
      title: "12. Limitation of Liability",
      content: `The organization is not responsible for personal loss, injury, or technical errors during registration except where required by law.`
    },

    {
      title: "13. Termination of Participation",
      content: `Participation may be terminated if terms are violated or false information is provided.`
    },

    {
      title: "14. Contact Information",
      content: `Participants may contact the organizing authority through the official email or phone number listed on the website.`
    },

    {
      title: "15. Intellectual Property",
      content: `All website content, courses, software programs and materials belong to bhayat.org and are protected by copyright laws.`
    },

    {
      title: "16. Contact Us",
      content: (
        <>
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
            +91 9711301699
          </a>

          <br />

          Website:{" "}
          <a
            href="https://www.bhayat.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium hover:underline"
          >
            www.bhayat.org
          </a>
        </>
      )
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
                      navigate("/Student_Awards");
                      setShowAwards(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    Student Awards and Recognition
                  </button>

                  <button
                    onClick={() => {
                      navigate("/School_Award");
                      setShowAwards(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    School Awards and Recognition
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
                    Student Awards and Recognition
                  </button>
                  <button onClick={() => navigate("/School_Award")}>
                    School Awards and Recognition
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
            Terms & Conditions
          </h1>

          <p className="opacity-90">
            Online Registration – Volunteers, Schools, Teachers, Students & Coordinators
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-6 md:p-10">
          {terms.map((item, index) => (
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
        <div >
          <h2 className="text-xl font-semibold mt-6 pt-4 text-center text-white-100 text-sm sm:text-base">© 2026 BHAYAT. All Copyrights Reserved</h2>
        </div>
      </div>
    </div>

  );
}

export default TermsConditions;