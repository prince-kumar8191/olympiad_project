import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaRupeeSign,
  FaCopy,
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaEnvelope,
  FaGift,
  FaLink,
  FaBullhorn,
} from "react-icons/fa";

export default function VolunteerRefer() {
  const [referralCode, setReferralCode] = useState("");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const email = localStorage.getItem("VolunteerEmail");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`)
      .then((res) => {
        const data = res.data;

        setReferralCode(data.volunteerId);
        setTotalReferrals(data.totalReferrals);
        setEarnings(data.creditPoints);
      })
      .catch((err) => console.log(err));
  }, [email]);

  const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;

  const message = `Join this Olympiad platform and start learning 🚀

Register here:
${referralLink}

Use my referral code: ${referralCode}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // 🔥 Social Share Functions
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        referralLink
      )}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const shareEmail = () => {
    window.open(
      `mailto:?subject=Join Now&body=${encodeURIComponent(message)}`
    );
  };

  return (
    <div
      className="min-h-screen text-white font-sans px-4 py-8 md:px-8"
      style={{
        background:
          "linear-gradient(135deg, #050505, #0f0a12, #170d1c, #09070b)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Glow Background */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(255, 0, 128, 0.18)",
          filter: "blur(130px)",
          top: "-80px",
          left: "-60px",
          animation: "floatOne 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.16)",
          filter: "blur(120px)",
          bottom: "-80px",
          right: "-50px",
          animation: "floatTwo 10s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(168, 85, 247, 0.14)",
          filter: "blur(100px)",
          top: "40%",
          left: "45%",
          animation: "pulseGlow 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div
        className="max-w-5xl mx-auto rounded-[32px] p-6 md:p-10 relative z-10"
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
          animation: "fadeUp 0.8s ease",
        }}
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: "linear-gradient(135deg, #ff4fa3, #a855f7)",
                boxShadow: "0 0 35px rgba(255, 79, 163, 0.35)",
                animation: "pulseBadge 2.5s infinite",
              }}
            >
              <FaGift />
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold mb-3"
            style={{
              background: "linear-gradient(90deg, #ffffff, #ff9bd2, #ff4fa3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Volunteer Refer & Earn
          </h1>

          <p className="text-pink-100/80 text-sm md:text-base">
            Share your referral link, invite new users, and earn exciting rewards
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div
            className="rounded-3xl p-7 text-center transition-all duration-300 cursor-pointer"
            style={statCardPink}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(255, 0, 128, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.25)";
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, #ff4fa3, #ec4899)",
                boxShadow: "0 10px 25px rgba(255, 79, 163, 0.25)",
              }}
            >
              <FaUsers />
            </div>
            <p className="text-pink-100/80 text-lg">Total Referrals</p>
            <h2 className="text-4xl font-extrabold mt-2 text-white">
              {totalReferrals}
            </h2>
          </div>

          <div
            className="rounded-3xl p-7 text-center transition-all duration-300 cursor-pointer"
            style={statCardPurple}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(236, 72, 153, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.25)";
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                boxShadow: "0 10px 25px rgba(168, 85, 247, 0.25)",
              }}
            >
              <FaRupeeSign />
            </div>
            <p className="text-pink-100/80 text-lg">Total Earnings</p>
            <h2 className="text-4xl font-extrabold mt-2 text-white">
              ₹{earnings}
            </h2>
          </div>
        </div>

        {/* Referral Code */}
        <div className="rounded-3xl p-6 mb-8" style={glassCardStyle}>
          <p className="text-lg font-semibold text-pink-200 mb-3 flex items-center gap-2">
            <FaBullhorn />
            Your Referral Code
          </p>

          <div
            className="rounded-2xl px-5 py-4 flex items-center justify-between"
            style={inputGlassStyle}
          >
            <span className="text-2xl font-extrabold tracking-wider text-white">
              {referralCode || "VOLUNTEER123"}
            </span>

            <div
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(90deg, #ec4899, #a855f7)",
                boxShadow: "0 10px 25px rgba(236,72,153,0.25)",
              }}
            >
              Active Code
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="rounded-3xl p-6 mb-8" style={glassCardStyle}>
          <p className="text-lg font-semibold text-pink-200 mb-3 flex items-center gap-2">
            <FaLink />
            Your Referral Link
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-5 py-4 rounded-2xl outline-none text-white placeholder:text-pink-100/50"
              style={inputGlassStyle}
            />

            <button
              onClick={copyLink}
              className="px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #ff4fa3, #a855f7)",
                boxShadow: "0 15px 30px rgba(255, 79, 163, 0.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(255, 79, 163, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 15px 30px rgba(255, 79, 163, 0.28)";
              }}
            >
              <FaCopy />
              Copy Link
            </button>
          </div>
        </div>

        {/* Social Share Section */}
        <div className="rounded-3xl p-6" style={glassCardStyle}>
          <p className="mb-5 text-xl font-bold text-pink-200">
            Share via
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={shareWhatsApp}
              className="rounded-2xl py-4 px-4 font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2"
              style={socialBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(37,211,102,0.35), rgba(255,255,255,0.10))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <FaWhatsapp className="text-3xl text-green-400" />
              WhatsApp
            </button>

            <button
              onClick={shareFacebook}
              className="rounded-2xl py-4 px-4 font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2"
              style={socialBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(24,119,242,0.35), rgba(255,255,255,0.10))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <FaFacebookF className="text-3xl text-blue-400" />
              Facebook
            </button>

            <button
              onClick={shareTelegram}
              className="rounded-2xl py-4 px-4 font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2"
              style={socialBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(0,136,204,0.35), rgba(255,255,255,0.10))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <FaTelegramPlane className="text-3xl text-sky-400" />
              Telegram
            </button>

            <button
              onClick={shareEmail}
              className="rounded-2xl py-4 px-4 font-semibold transition-all duration-300 flex flex-col items-center justify-center gap-2"
              style={socialBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(255,0,128,0.28), rgba(255,255,255,0.10))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <FaEnvelope className="text-3xl text-pink-300" />
              Email
            </button>
          </div>
        </div>
      </div>

      {/* Internal Styles */}
      <style>{`
        @keyframes floatOne {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(20px);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(-15px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes pulseBadge {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 25px rgba(255, 79, 163, 0.25);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 45px rgba(255, 79, 163, 0.45);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ff4fa3, #a855f7);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a855f7, #ff4fa3);
        }
      `}</style>
    </div>
  );
}

// ================= EXTRA STYLES =================

const glassCardStyle = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
};

const inputGlassStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(12px)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
};

const statCardPink = {
  background:
    "linear-gradient(135deg, rgba(255,0,128,0.18), rgba(255,255,255,0.05))",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
};

const statCardPurple = {
  background:
    "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(255,255,255,0.05))",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
};

const socialBtnStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
  color: "#fff",
};