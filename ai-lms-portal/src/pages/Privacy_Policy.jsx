import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // <-- apne logo ka correct path yaha lagana

function PrivacyPolicy() {
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

  const policy = [
    {
      title: "1. Introduction",
      content: `BHAYAT NGO (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our educational services, including Online Olympiad, online courses, and purchase of books or study materials.`
    },

    {
      title: "2. Information We Collect",
      content: `We may collect the following types of information:`
    },

    {
      title: "2(a). Personal Information",
      content: `• Name
• Email address
• Phone number
• Address (for delivery of books/materials)
• School/Student details (if applicable)`
    },

    {
      title: "2(b). Payment Information",
      content: `• Payment details are processed securely through third-party payment gateways
• We do not store your card or banking details`
    },

    {
      title: "2(c). Usage Information",
      content: `• Course activity, test participation, Olympiad performance
• Device and browser information
• IP address and login details`
    },

    {
      title: "3. How We Use Your Information",
      content: `We use your information to:
• Provide access to online courses and Olympiad exams
• Deliver books and study materials
• Communicate updates, schedules, and support
• Improve our services and user experience
• Process payments and maintain records`
    },

    {
      title: "4. Sharing of Information",
      content: `We do not sell or rent your personal data. We may share information only with:
• Trusted service providers (payment gateways, delivery partners)
• Legal authorities if required by law`
    },

    {
      title: "5. Data Security",
      content: `We take appropriate security measures to protect your data:
• Secure servers and encryption practices
• Limited access to personal information
• Regular monitoring for unauthorized access`
    },

    {
      title: "6. Cookies and Tracking Technologies",
      content: `We may use cookies to:
• Enhance user experience
• Track website usage
• Store login/session information

You can disable cookies through your browser settings if you prefer.`
    },

    {
      title: "7. User Rights",
      content: `You have the right to:
• Access your personal data
• Request correction of incorrect information
• Request deletion of your data (subject to legal obligations)`
    },

    {
      title: "8. Children’s Privacy",
      content: `Our services are mainly for students. We ensure:
• Data is collected responsibly
• Parent/guardian consent may be required where applicable`
    },

    {
      title: "9. Third-Party Links",
      content: `Our website or platform may contain links to third-party websites. We are not responsible for their privacy practices.`
    },

    {
      title: "10. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. Updates will be posted on this page with revised dates.`
    },

    {
      title: "11. Contact Us",
      content: (
        <>
          If you have any questions or concerns about this Privacy Policy, contact us:
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
        </>
      )
    },

    {
      title: "12. Our Commitment",
      content: `BHAYAT NGO is dedicated to maintaining the privacy, security, and trust of students, parents, and users while delivering quality educational services.`
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
                      navigate("/student-awards");
                      setShowAwards(false);
                    }}
                    className="block w-full text-left py-2 hover:text-indigo-600"
                  >
                    Student  Awards and Recognition
                  </button>

                  <button
                    onClick={() => {
                      navigate("/school-criteria");
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
              onClick={() => navigate("/criteria")}
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
            Privacy Policy
          </h1>

          <p className="opacity-90">
            BHAYAT NGO – Online Olympiad, Courses, Books & Study Materials
          </p>
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/80 rounded-2xl shadow-2xl p-6 md:p-10">
          {policy.map((item, index) => (
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

export default PrivacyPolicy;