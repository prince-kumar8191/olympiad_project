import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaCalculator,
  FaTrophy,
  FaRocket,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function BlogsPage() {
  const navigate = useNavigate();

  // 🔥 Navbar States
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  // 🔥 Blog Header Ref
  const blogHeaderRef = useRef(null);

  useEffect(() => {
    // ✅ PAGE HAMESHA TOP SE OPEN HOGA
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const storedRole = localStorage.getItem("role") || "";
    const token = localStorage.getItem("token");

    setUser(storedUser);
    setRole(storedRole);
    setIsLoggedIn(!!token);
  }, []);

  // 🔥 Navigation Functions
  const goToHome = () => navigate("/");
  const goToAbout = () => navigate("/about");
  const goToOlympiads = () => navigate("/olympiads");
  const goToScholarship = () => navigate("/scholarship");
  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  // 🔥 Blogs Data
  const blogs = [
    {
      id: 1,
      title: "How to Prepare for National Mathematics and Science Olympiad (NSMO)",
      short: "Complete Guide for Students",
      icon: <FaCalculator />,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      content: {
        intro: `The National Mathematics and Science Olympiad (NSMO) is one of the most competitive exams for school students, designed to test not only academic knowledge but also logical reasoning, analytical thinking, and problem-solving abilities. Unlike regular school exams, NSMO challenges students to think beyond textbooks and apply concepts in real-life situations. With the right strategy, discipline, and consistent effort, any student can perform well in this exam.`,
        sections: [
          {
            heading: "What is NSMO?",
            points: [
              "NSMO stands for National Mathematics and Science Olympiad.",
              "It is a national-level competitive exam for school students.",
              "It evaluates understanding of Mathematics and Science concepts through application-based and logical questions.",
              "The exam attracts a large number of participants every year, making it competitive and rewarding.",
            ],
          },
          {
            heading: "Why NSMO Preparation is Important",
            points: [
              "Builds strong conceptual understanding",
              "Enhances logical and analytical thinking",
              "Improves problem-solving skills",
              "Prepares students for future competitive exams",
              "Boosts confidence and academic performance",
            ],
          },
          {
            heading: "Step-by-Step Strategy to Prepare for NSMO",
            points: [
              "Understand the latest syllabus and exam pattern from trusted sources.",
              "Start preparation 2–3 months early to revise properly and reduce stress.",
              "Strengthen basics using NCERT and school textbooks.",
              "Choose the right study material such as Olympiad books, previous papers, and mock tests.",
              "Practice consistently through weekly mock tests and different question types.",
              "Study smart by identifying question patterns and learning shortcuts.",
              "Revise regularly using short notes and flashcards.",
              "Work on weak areas with targeted practice.",
              "Create a realistic study timetable and follow it consistently.",
              "Maintain a productive study environment.",
              "Take short breaks and stay physically healthy.",
              "Seek guidance from teachers, mentors, or online learning platforms.",
              "Develop a positive and confident mindset.",
              "Stay calm and avoid learning new topics just before the exam.",
            ],
          },
          {
            heading: "NSMO Preparation Checklist",
            points: [
              "Start preparation early",
              "Understand syllabus and exam pattern",
              "Practice previous year papers",
              "Take regular mock tests",
              "Revise using notes and flashcards",
              "Focus on weak areas",
              "Follow a proper study schedule",
              "Maintain good health",
              "Stay confident and positive",
            ],
          },
          {
            heading: "Common Mistakes to Avoid",
            points: [
              "Starting preparation too late",
              "Ignoring basic concepts",
              "Practicing inconsistently",
              "Avoiding difficult topics",
              "Not analyzing mistakes",
              "Taking excessive stress",
            ],
          },
        ],
      },
    },

    {
      id: 2,
      title: "What is Olympiad?",
      short: "Meaning, Benefits, Types & Complete Guide",
      icon: <FaBookOpen />,
      gradient: "from-pink-600 via-rose-500 to-orange-500",
      content: {
        intro: `Olympiad exams have become an important part of modern education for school students. These exams are specially designed to identify students who have strong conceptual understanding, logical thinking, and problem-solving skills. Unlike regular school exams, Olympiads focus on how well a student understands and applies concepts, not just memorization.`,
        sections: [
          {
            heading: "What is Olympiad?",
            points: [
              "Olympiads are competitive exams conducted for school students to test knowledge, aptitude, and intelligence.",
              "These exams are usually organized at school, state, and national levels.",
              "They help students understand strengths and weak areas.",
              "They improve thinking and learning skills.",
              "They build confidence through healthy competition.",
            ],
          },
          {
            heading: "Subjects Covered in Olympiads",
            points: [
              "Mathematics",
              "Science",
              "English",
              "Computer Science",
              "General Knowledge (in some exams)",
            ],
          },
          {
            heading: "Olympiad Meaning (Simple Explanation)",
            points: [
              "An Olympiad is an academic competition where students compete with others of the same class to test their knowledge and skills.",
              "These exams encourage students to go beyond textbooks and think logically.",
            ],
          },
          {
            heading: "Types of Olympiad Exams",
            points: [
              "School Level Olympiads – conducted within schools.",
              "State Level Olympiads – students compete across their state.",
              "National Level Olympiads – top students compete nationally.",
            ],
          },
          {
            heading: "How Students Progress in Olympiads",
            points: [
              "School Level Screening",
              "State/District Level Qualification",
              "National Level Competition",
            ],
          },
          {
            heading: "Why Olympiads are Important",
            points: [
              "Prepare students for future competitive exams",
              "Improve logical and analytical thinking",
              "Build strong academic concepts",
              "Increase confidence and performance",
              "Provide exposure beyond school education",
            ],
          },
          {
            heading: "Benefits of Olympiad Exams",
            points: [
              "Strong conceptual clarity",
              "Better problem-solving skills",
              "Identifies strengths and weaknesses",
              "Boosts confidence",
              "Improves school performance",
              "Early competitive exposure",
              "Enhances logical thinking",
            ],
          },
          {
            heading: "How to Register for Olympiad Exams",
            points: [
              "Students can register through school.",
              "Many Olympiads also allow online registration through official websites.",
              "After registration, exam dates, syllabus, and guidelines are shared.",
            ],
          },
        ],
      },
    },

    {
      id: 3,
      title: "From Competitions to Careers",
      short: "The Benefits of Olympiad Participation",
      icon: <FaTrophy />,
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      content: {
        intro: `Entering the competitive world of Olympiads goes far beyond solving complex problems or earning medals—it is a transformative journey that profoundly shapes a student’s academic path and future career opportunities. Olympiads cultivate intellectual curiosity, sharpen analytical thinking, and instill discipline.`,
        sections: [
          {
            heading: "Benefits of Olympiad Participation",
            points: [
              "Demonstrates academic excellence and deep conceptual understanding.",
              "Enhances college applications and student profiles.",
              "Unlocks scholarships, grants, and financial opportunities.",
              "Provides global recognition and international exposure.",
              "Builds strong academic and professional networks.",
              "Improves critical thinking and problem-solving skills.",
              "Can lead to early research opportunities and internships.",
              "Creates pathways to STEM careers and innovation-driven fields.",
              "Strengthens resumes and professional portfolios.",
              "Cultivates a lifelong passion for learning and self-growth.",
            ],
          },
        ],
      },
    },

    {
      id: 4,
      title: "Redefining Excellence",
      short: "The Future of Olympiad Examinations",
      icon: <FaRocket />,
      gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
      content: {
        intro: `Olympiad examinations have long been recognized as a prestigious platform for students to showcase their academic excellence, critical thinking, and problem-solving abilities. As education continues to evolve, the importance of Olympiads is expected to grow significantly in the coming decade.`,
        sections: [
          {
            heading: "1. Building Future-Ready Skills for the 21st Century",
            points: [
              "Critical Thinking & Problem-Solving",
              "Creativity & Innovation",
              "Communication & Teamwork",
              "Students become confident thinkers for future careers",
            ],
          },
          {
            heading: "2. Strengthening Academic Foundation and Conceptual Clarity",
            points: [
              "Strong basics in Mathematics, Science, and English",
              "Exposure to advanced learning early",
              "Improved school and board exam performance",
            ],
          },
          {
            heading: "3. Developing Confidence Through Healthy Competition",
            points: [
              "Builds self-belief and motivation",
              "Teaches resilience and discipline",
              "Improves consistency and focus",
            ],
          },
          {
            heading: "4. Gaining Global Exposure and Learning Opportunities",
            points: [
              "International participation",
              "Networking with talented peers and mentors",
              "Recognition and scholarship opportunities",
            ],
          },
          {
            heading: "5. Preparing for Future Career Opportunities",
            points: [
              "Strong STEM readiness",
              "Innovation and entrepreneurship mindset",
              "Early exposure to research and advanced topics",
            ],
          },
          {
            heading: "6. Expanding Access and Encouraging Inclusive Participation",
            points: [
              "Online exams make participation easier",
              "Scholarships and support programs improve accessibility",
              "Equal opportunities for students from all backgrounds",
            ],
          },
          {
            heading: "7. Encouraging Holistic Development and Lifelong Learning",
            points: [
              "Boosts curiosity and exploration",
              "Promotes interdisciplinary learning",
              "Helps students become adaptable and self-motivated learners",
            ],
          },
        ],
      },
    },
  ];

  const [activeBlog, setActiveBlog] = useState(blogs[0]);

  // 🔥 Blog Change Handler
  const handleBlogChange = (blog) => {
    setActiveBlog(blog);

    setTimeout(() => {
      if (blogHeaderRef.current) {
        const navbarHeight = 110;
        const elementPosition =
          blogHeaderRef.current.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
      {/* 🔥 FIXED NAVBAR */}

      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-md z-[99999] border-b border-white/20 ">
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

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[110px] pb-10">
        {/* Top Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <p className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-sky-300 mb-4">
            Olympiad Knowledge Hub
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Blogs and Insights
            </span>
          </h1>

          <p className="text-slate-300 mt-4 max-w-3xl mx-auto text-sm sm:text-base">
            Click any blog heading below and its full content will appear instantly
            with a clean animated reading experience.
          </p>
        </div>

        {/* Blog Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {blogs.map((blog) => (
            <button
              key={blog.id}
              onClick={() => handleBlogChange(blog)}
              className={`group relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:scale-[1.02] ${
                activeBlog.id === blog.id ? "scale-[1.02]" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${blog.gradient}`}></div>

              <div
                className={`relative h-full rounded-3xl p-5 backdrop-blur-xl border transition-all duration-500 ${
                  activeBlog.id === blog.id
                    ? "bg-slate-900/90 border-white/20 shadow-2xl"
                    : "bg-slate-900/70 border-white/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl p-3 rounded-2xl bg-white/10 border border-white/10">
                    {blog.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-base sm:text-lg leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-2">{blog.short}</p>
                  </div>
                </div>

                {activeBlog.id === blog.id && (
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 font-semibold">
                    <FaLightbulb />
                    Currently Open
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Active Blog Content */}
        <div
          ref={blogHeaderRef}
          className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl animate-slideUp scroll-mt-28"
          key={activeBlog.id}
        >
          {/* Hero Header */}
          <div className={`bg-gradient-to-r ${activeBlog.gradient} p-6 sm:p-8 md:p-10`}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="text-4xl sm:text-5xl bg-white/15 w-20 h-20 rounded-3xl flex items-center justify-center border border-white/20 shadow-lg">
                {activeBlog.icon}
              </div>
              <div>
                <p className="text-white/80 text-sm uppercase tracking-[3px] mb-2">
                  Featured Blog
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                  {activeBlog.title}
                </h2>
                <p className="text-white/90 mt-3 text-sm sm:text-base max-w-3xl">
                  {activeBlog.short}
                </p>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-300">
              Introduction
            </h3>
            <p className="text-slate-200 leading-8 text-sm sm:text-base">
              {activeBlog.content.intro}
            </p>
          </div>

          {/* Sections */}
          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {activeBlog.content.sections.map((section, index) => (
              <div
                key={index}
                className="rounded-3xl border border-white/10 bg-slate-900/40 p-5 sm:p-6 hover:bg-slate-900/60 transition-all duration-300"
              >
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </span>
                  {section.heading}
                </h4>

                <div className="grid gap-3">
                  {section.points.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5"
                    >
                      <FaCheckCircle className="text-emerald-400 mt-1 shrink-0" />
                      <p className="text-slate-200 leading-7 text-sm sm:text-base">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        html, body, #root {
          scroll-behavior: smooth;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.7s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}


















