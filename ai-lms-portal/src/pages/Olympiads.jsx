import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/auth/Footer"
import Navbar from "../pages/Navbar";
import logo from "../assets/logo.png";
import {
  FaBrain,
  FaBookOpen,
  FaChartLine,
  FaPuzzlePiece,
  FaTrophy,
  FaRocket,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaFileAlt,
  FaLaptopCode,
  FaArrowRight,
  FaStar,
  FaMedal,
  FaLightbulb,
  FaGraduationCap,
  FaBullseye,
} from "react-icons/fa";

const whyChooseData = [
  {
    icon: <FaBrain />,
    title: "Strong Conceptual Clarity",
    slug: "conceptual-clarity",
    desc: "Olympiads focus on building a deep and clear understanding of fundamental concepts rather than memorization. Students learn to explore subjects in detail, which helps them grasp topics more effectively and confidently.",
  },
  {
    icon: <FaChartLine />,
    title: "Improved Academic Performance",
    slug: "academic-performance",
    desc: "Regular practice and structured preparation for Olympiads significantly enhance overall academic performance. Students develop better study habits, improved concentration, and effective time management skills.",
  },
  {
    icon: <FaPuzzlePiece />,
    title: "Advanced Analytical & Problem-Solving Skills",
    slug: "problem-solving-skills",
    desc: "Olympiad questions are designed to challenge and stimulate critical thinking. Students learn to analyze problems from different angles and apply logical reasoning to arrive at accurate solutions.",
  },
  {
    icon: <FaTrophy />,
    title: "Building Confidence & Competitive Spirit",
    slug: "confidence-competitive-spirit",
    desc: "Participating in Olympiads exposes students to a healthy competitive environment, helping them build confidence and resilience. It encourages them to push their limits, overcome challenges, and strive for excellence.",
  },
  {
    icon: <FaRocket />,
    title: "Preparing for Future Success",
    slug: "future-success",
    desc: "Olympiads lay the groundwork for future academic and career achievements. The skills developed—such as critical thinking, discipline, and problem-solving—are essential for success in fields like engineering, medicine, research, and beyond.",
  },
];

const prepGuide = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Live Interactive Sessions",
    desc: "Concept explanation and instant doubt solving help students understand topics clearly and confidently.",
  },
  {
    icon: <FaBookOpen />,
    title: "Engaging Curriculum",
    desc: "A thoughtfully designed curriculum that makes learning simple, interactive, and Olympiad-focused.",
  },
  {
    icon: <FaFileAlt />,
    title: "Practice Worksheets",
    desc: "Topic-wise worksheets for Olympiad-level preparation with discussion and evaluation.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Mock Tests",
    desc: "Chapter-wise and full-length model papers to improve speed, accuracy, and exam confidence.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Smart Dashboard",
    desc: "Performance analytics and progress tracking help students identify strengths and weak areas.",
  },
];

const olympiadTypes = [
  "SOF Olympiads",
  "SilverZone Olympiads",
  "Unified Council",
  "Indian Talent Olympiad",
  "Crest Olympiads",
  "Math Kangaroo",
  "SASMO",
  "IMOCSEA",
  "HBCSE Olympiad",
  "ISTSE",
  "AMO",
  "VANDA",
];

const stats = [
  { number: "6-12", label: "Classes Covered" },
  { number: "4+", label: "Core Subjects" },
  { number: "100%", label: "Concept Focused" },
  { number: "Live", label: "Interactive Learning" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function OlympiadPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  return (
    <>
    <Navbar 
        isLoggedIn={isLoggedIn}
        user={user}
        role={role}
      />
    <div className="bg-[#050816] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-[-80px] w-[320px] h-[320px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] right-[-100px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-120px] left-[30%] w-[350px] h-[350px] bg-blue-500/20 blur-[140px] rounded-full"></div>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-14 lg:px-24 pt-28 pb-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="z-10"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-md mb-6"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FaStar className="text-cyan-400" />
              <span className="text-sm text-cyan-200 tracking-wide">
                Future Ready Olympiad Learning
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight"
              variants={fadeUp}
              custom={1}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
                Olympiad?
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl"
              variants={fadeUp}
              custom={2}
            >
              Olympiad exams are more than just competitive tests—they are a gateway
              to academic excellence and skill development. For students from Classes
              6 to 12, Olympiads provide the perfect platform to strengthen concepts,
              enhance performance, and build future-ready skills.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              variants={fadeUp}
              custom={3}
            >
                <Link to="/Program">
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/30">
                Explore Programs
              </button>
                </Link>

              <button className="px-7 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold">
                Book Demo Class
              </button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              variants={fadeUp}
              custom={4}
            >
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-cyan-300">
                    {item.number}
                  </h3>
                  <p className="text-gray-300 text-sm mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[30px] p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-fuchsia-500/40 shadow-2xl shadow-cyan-500/20">
              <div className="rounded-[30px] bg-[#0b1227]/90 backdrop-blur-2xl p-8 md:p-10 border border-white/10">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { icon: <FaBrain />, title: "Concept Clarity" },
                    { icon: <FaPuzzlePiece />, title: "Logical Thinking" },
                    { icon: <FaMedal />, title: "Competitive Edge" },
                    { icon: <FaGraduationCap />, title: "Academic Growth" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                    >
                      <div className="text-3xl text-cyan-300 mb-4">{card.icon}</div>
                      <h3 className="font-bold text-lg">{card.title}</h3>
                      <p className="text-sm text-gray-300 mt-2">
                        Empowering students through smart Olympiad preparation.
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-5">
                  <p className="text-cyan-200 font-medium">
                    “Learn deeper. Think smarter. Perform better.”
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan-400/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-fuchsia-500/20 blur-2xl rounded-full animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="px-6 md:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Benefits of Olympiad
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Build Skills Beyond Textbooks
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-5 text-lg">
              Olympiads help students master concepts, think critically, improve
              academic results, and build a strong foundation for future success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
            {whyChooseData.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-cyan-400/30 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-cyan-500/30">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition">
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>

                <button
                  onClick={() => navigate(`/olympiad/${item.slug}`)}
                  className="mt-5 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-semibold transition"
                >
                  Learn More <FaArrowRight className="text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREPARATION GUIDE */}
      <section className="px-6 md:px-14 lg:px-24 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-fuchsia-300 font-semibold tracking-widest uppercase mb-3">
              Olympiad Preparation Guide
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Smart Learning System
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-5 text-lg">
              A complete preparation ecosystem designed to help students learn,
              practice, analyze, and improve with confidence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {prepGuide.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/[0.03] p-7 backdrop-blur-xl"
              >
                <div className="text-4xl text-fuchsia-300 mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM DETAILS */}
      <section className="px-6 md:px-14 lg:px-24 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link to="/Program">
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Program Details
            </p>
                </Link>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Designed for Olympiad Champions
            </h2>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Our Olympiad-focused learning program is designed to help students
              strengthen core subjects, develop logical thinking, and prepare
              effectively for multiple national and international Olympiad exams.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Covers Math, Science, English & Logical Reasoning",
                "Suitable for students from Classes 6 to 12",
                "Structured preparation with practice + mock tests",
                "Builds conceptual clarity and exam confidence",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <FaBullseye className="text-cyan-300 mt-1" />
                  <p className="text-gray-200">{point}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-fuchsia-500/30">
                Start Learning
              </button>
              <Link to="/Olympiad">
              <button className="px-7 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold">
                View Syllabus
              </button>
                </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-5"
          >
            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-7 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4">Olympiad Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                Best for students aiming to strengthen fundamentals and prepare
                for mainstream Olympiads with structured guidance.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {["Math", "Science", "English", "Reasoning"].map((sub, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 p-7 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4">Advanced Olympiad</h3>
              <p className="text-gray-300 leading-relaxed">
                Ideal for students who want higher-level problem-solving,
                analytical thinking, and deeper competitive exposure.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-7 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-4">International Olympiad</h3>
              <p className="text-gray-300 leading-relaxed">
                A great pathway for students preparing for global-level math and
                science competitions and international exposure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OLYMPIAD TYPES */}
      <section className="px-6 md:px-14 lg:px-24 py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Olympiad Categories
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Exams You Can Prepare For
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-5 text-lg">
              Students can prepare for multiple well-known Olympiads through a
              strong concept-based and skill-oriented learning system.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {olympiadTypes.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <FaMedal className="text-cyan-300 text-xl" />
                  <h3 className="font-semibold text-gray-100">{item}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-14 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[35px] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 backdrop-blur-2xl p-10 md:p-14 text-center shadow-2xl shadow-cyan-500/10"
          >
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ready to Start Your Olympiad Journey?
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
              Give students the right environment to build strong concepts,
              improve academic performance, and develop future-ready skills with
              Olympiad learning.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2">
                Enroll Now <FaArrowRight />
              </button>
              <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
    </>
  );
}