import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaImages,
  FaAward,
  FaSchool,
  FaUserGraduate,
  FaCameraRetro,
  FaArrowDown,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import Footer from "../pages/auth/Footer";

// 🔥 Gallery Images
import img1 from "../assets/award_ceromany.png.jpeg";
import img2 from "../assets/campus_activity.png.jpeg";
import img3 from "../assets/recignition_celebration.png.jpeg";
import img4 from "../assets/school_excellecce.png.jpeg";
import img5 from "../assets/olympiad_event.png.jpeg";
import img6 from "../assets/school_participation.png.jpeg";
import img7 from "../assets/student_achivement.png.jpeg";
import img8 from "../assets/future_champian.png.jpeg";

function Gallery() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

    if (storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
      setUser(storedUser);
    }
  }, []);

  // ================= NAVIGATION =================
  const goToHome = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/");
  };

  const goToAbout = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/about");
  };

  const goToOlympiads = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/olympiads");
  };

  const goToScholarship = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/scholarship");
  };

  const goToLogin = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/login");
  };

  const goToSignup = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/signup");
  };

  const goToCriteria = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/Criteria");
  };

  const goToGallery = () => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/gallery");
  };

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    window.scrollTo(0, 0);
    navigate("/login");
  };

  // ================= GALLERY DATA =================
  const galleryItems = [
    {
      id: 1,
      title: "Olympiad Event Highlights",
      category: "Events",
      image: img5,
    },
    {
      id: 2,
      title: "Award Ceremony Moments",
      category: "Awards",
      image: img1,
    },
    {
      id: 3,
      title: "School Participation",
      category: "Schools",
      image: img6,
    },
    {
      id: 4,
      title: "Student Achievement",
      category: "Students",
      image: img7,
    },
    {
      id: 5,
      title: "Campus Activity",
      category: "Events",
      image: img2,
    },
    {
      id: 6,
      title: "Recognition Celebration",
      category: "Awards",
      image: img3,
    },
    {
      id: 7,
      title: "School Excellence Program",
      category: "Schools",
      image: img4,
    },
    {
      id: 8,
      title: "Future Champions",
      category: "Students",
      image: img8,
    },
  ];

  const categories = ["All", "Events", "Awards", "Schools", "Students"];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Awards":
        return <FaAward />;
      case "Schools":
        return <FaSchool />;
      case "Students":
        return <FaUserGraduate />;
      default:
        return <FaCameraRetro />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 overflow-x-hidden relative">
      {/* ================= BACKGROUND ANIMATION ================= */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-300/10 rounded-full blur-3xl animate-bounce pointer-events-none"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl shadow-md z-[9999] border-b border-white/40">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={goToHome}
          >
            <img
              src={logo}
              alt="Bhayat Logo"
              className="h-12 w-auto object-contain scale-[3.0] origin-left"
            />
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
            <button onClick={goToHome} className="hover:text-indigo-600 transition">
              Home
            </button>

            <button onClick={goToAbout} className="hover:text-indigo-600 transition">
              About
            </button>

            <div className="relative">
              <button
                onClick={() => setShowAwards(!showAwards)}
                className="hover:text-indigo-600 transition"
              >
                Awards
              </button>

              {showAwards && (
                <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl p-3 w-60 z-50 border border-gray-100">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
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

            <button onClick={goToCriteria} className="hover:text-indigo-600 transition">
              Criteria
            </button>

            <button onClick={goToOlympiads} className="hover:text-indigo-600 transition">
              Olympiads
            </button>

            <button onClick={goToScholarship} className="hover:text-indigo-600 transition">
              Scholarship
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">👤 {user.name || role}</span>

                {role === "student" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Student_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "coordinator" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Coordinator_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "volunteer" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/Volunteer_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

                {role === "school" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate("/School_Dashboard");
                    }}
                    className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition"
                  >
                    📊 Dashboard
                  </button>
                )}

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

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-3xl text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 px-6 pb-6 pt-2 font-semibold bg-white shadow-lg">
            <button onClick={goToHome} className="text-left">Home</button>
            <button onClick={goToOlympiads} className="text-left">Olympiads</button>
            <button onClick={goToScholarship} className="text-left">Scholarship</button>
            <button onClick={goToAbout} className="text-left">About</button>

            <div className="relative">
              <button
                onClick={() => setShowAwards(!showAwards)}
                className="text-left hover:text-indigo-600"
              >
                Awards
              </button>

              {showAwards && (
                <div className="mt-2 bg-gray-50 shadow rounded-lg p-3 w-full z-50">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
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

            <button onClick={goToCriteria} className="text-left">Criteria</button>

            {isLoggedIn ? (
              <>
                <span>👤 {user.name || role}</span>

                {role === "student" && (
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
                      navigate("/School_Dashboard");
                      setMenuOpen(false);
                    }}
                    className="text-left"
                  >
                    Dashboard
                  </button>
                )}

                <button onClick={handleLogout} className="text-red-500 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={goToLogin} className="text-left">Login</button>
                <button onClick={goToSignup} className="text-left">Sign Up</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <div className="pt-[90px] relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="relative h-[500px] md:h-[620px] flex items-center justify-center text-center text-white overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=100"
            alt="Gallery Hero"
            className="absolute w-full h-full object-cover"
          />

          {/* Clean dark overlay */}
          <div className="absolute inset-0 bg-black/45"></div>

          {/* Clean blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/35 via-blue-800/15 to-sky-700/20"></div>

          {/* Soft glow */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-sky-400/15 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative z-10 max-w-4xl px-6">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30 mb-6 animate-bounce">
              <FaImages className="text-yellow-300 text-xl" />
              <span className="font-semibold text-white tracking-wide">
                Bhayat Olympiad Gallery
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 drop-shadow-2xl">
              Moments That Define{" "}
              <span className="text-yellow-300">Success</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover inspiring snapshots of achievement, celebration,
              participation, and the unforgettable spirit of Bhayat Olympiad.
            </p>

            <button
              onClick={() =>
                document.getElementById("gallery-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition inline-flex items-center gap-3 shadow-xl"
            >
              Explore Gallery <FaArrowDown />
            </button>
          </div>
        </section>

        {/* ================= INTRO TEXT ================= */}
        <section className="px-6 md:px-16 py-16 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Our <span className="text-indigo-600">Memorable Moments</span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore inspiring memories, award ceremonies, school participation,
              student achievements, and the vibrant journey of Bhayat Olympiad.
            </p>
          </div>
        </section>

        {/* ================= FILTERS ================= */}
        <section className="px-6 md:px-16 pb-10">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ================= GALLERY GRID ================= */}
        <section id="gallery-section" className="px-6 md:px-16 pb-20">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* IMAGE AREA */}
                <div className="relative h-72 bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-100 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 group-hover:scale-105 transition duration-500">
                      <div className="w-20 h-20 rounded-full bg-white/70 shadow-md flex items-center justify-center text-3xl text-indigo-600 mb-4">
                        {getCategoryIcon(item.category)}
                      </div>
                      <p className="font-bold text-lg">Your Image Here</p>
                      <p className="text-sm mt-2 text-center px-4">
                        Replace this placeholder with your gallery image
                      </p>
                    </div>
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-700 text-sm font-semibold px-4 py-2 rounded-full shadow">
                    {item.category}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A special captured moment from the Bhayat Olympiad journey.
                  </p>
                </div>

                {/* GLOW EFFECT */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-indigo-200 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HIGHLIGHT SECTION ================= */}
        <section className="px-6 md:px-16 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Celebrating Excellence Through Moments
                </h2>
                <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed">
                  Every image tells a story of hard work, recognition, talent,
                  and educational growth. Bhayat Olympiad continues to inspire
                  students, schools, and achievers across the journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default Gallery;