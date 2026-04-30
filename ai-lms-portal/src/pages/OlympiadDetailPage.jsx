import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaBullseye,
  FaBookOpen,
  FaRocket,
} from "react-icons/fa";
import { olympiadDetailData } from "./olympiadData";

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

export default function OlympiadDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const page = olympiadDetailData.find((item) => item.slug === slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <button
            onClick={() => navigate("/olympiad")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            Back to Olympiad
          </button>
        </div>
      </div>
    );
  }

  const Icon = page.icon;

  return (
    <div className="bg-[#050816] text-white overflow-hidden min-h-screen">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-[-80px] w-[320px] h-[320px] bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-[30%] right-[-100px] w-[350px] h-[350px] bg-fuchsia-500/20 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-120px] left-[30%] w-[350px] h-[350px] bg-blue-500/20 blur-[140px] rounded-full"></div>
      </div>

      {/* HERO */}
      <section className="relative px-6 md:px-14 lg:px-24 pt-28 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="z-10"
          >
            <button
              onClick={() => navigate("/olympiad")}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <FaArrowLeft />
              Back
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-white/5 backdrop-blur-md mb-6">
              <FaStar className="text-cyan-400" />
              <span className="text-sm text-cyan-200 tracking-wide">
                Olympiad Learning Advantage
              </span>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30 mb-6">
              <Icon />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {page.title}
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl">
              {page.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 font-semibold shadow-lg shadow-cyan-500/30">
                Explore More
              </button>

              <button
                onClick={() => navigate("/olympiad")}
                className="px-7 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold"
              >
                Back to Main Page
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-[32px] p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-fuchsia-500/40 shadow-2xl shadow-cyan-500/20">
              <div className="rounded-[32px] overflow-hidden bg-[#0b1227]/90 border border-white/10">
                <img
                  src={page.image}
                  alt={page.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 md:px-14 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Detailed Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why This Matters
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {page.overview}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <p className="text-fuchsia-300 font-semibold tracking-widest uppercase mb-3">
              Key Learning Outcomes
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Students Gain
            </h2>

            <div className="space-y-4">
              {page.points.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <FaBullseye className="text-cyan-300 mt-1" />
                  <p className="text-gray-200">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXTRA DETAILED SECTIONS */}
      <section className="px-6 md:px-14 lg:px-24 py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Deep Insights
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Explore in Detail
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-5 text-lg">
              Understand how this area contributes to a student’s long-term
              academic growth and future success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {page.detailedSections.map((section, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-cyan-400/30 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-fuchsia-500/30">
                  <FaBookOpen />
                </div>
                <h3 className="text-xl font-bold mb-4">{section.heading}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-6 md:px-14 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-cyan-300 font-semibold tracking-widest uppercase mb-3">
              Core Benefits
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Long-Term Student Growth
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-5 text-lg">
              These are the key benefits students experience through Olympiad-based learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">
            {page.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-cyan-400/30 transition-all duration-300 shadow-lg shadow-black/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl mb-5 shadow-lg shadow-cyan-500/30">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-bold">{benefit}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-6 md:px-14 lg:px-24 py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-fuchsia-300 font-semibold tracking-widest uppercase mb-3">
              Student Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Step-by-Step Growth Through Olympiad Learning
            </h2>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Students gradually move from basic understanding to advanced
              confidence through regular practice, structured learning, and
              exposure to higher-level questions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-5"
          >
            {[
              "Understand concepts deeply",
              "Practice higher-level questions",
              "Build confidence through mock tests",
              "Develop future-ready academic skills",
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{step}</h3>
                  <p className="text-gray-300 mt-1">
                    Structured Olympiad preparation helps students move steadily
                    toward stronger academics and greater confidence.
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
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
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30 mb-6">
              <FaRocket />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Help Students Unlock Their Full Potential
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
              Olympiad learning helps students build strong concepts, improve
              confidence, and prepare for a brighter academic future.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 flex items-center gap-2">
                Start Learning <FaArrowRight />
              </button>
              <button
                onClick={() => navigate("/olympiad")}
                className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 font-semibold"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}