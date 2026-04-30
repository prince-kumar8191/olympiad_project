









import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CoordinatorRefer() {
  const [referralCode, setReferralCode] = useState("");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const email = localStorage.getItem("CoordinatorEmail");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/coordinator/profile/${email}`)
      .then((res) => {
        const data = res.data;

        setReferralCode(data.coordinatorId);
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
      className="min-h-screen px-4 py-10 relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #090c1f, #1b1145, #2b1464, #4c1d95, #7c3aed)",
      }}
    >
      {/* 🔥 Animated Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(168,85,247,0.18)",
          filter: "blur(120px)",
          top: "-80px",
          left: "-60px",
          animation: "floatOne 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(236,72,153,0.18)",
          filter: "blur(120px)",
          bottom: "-60px",
          right: "-50px",
          animation: "floatTwo 9s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(96,165,250,0.16)",
          filter: "blur(100px)",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulseGlow 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div
        className="max-w-5xl mx-auto rounded-[32px] p-8 md:p-10 relative z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
          animation: "fadeUp 0.8s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6)",
              boxShadow: "0 15px 35px rgba(139,92,246,0.35)",
            }}
          >
            🤝
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold mb-3"
            style={{
              background: "linear-gradient(90deg, #ffffff, #d8b4fe, #f9a8d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Refer & Earn
          </h1>

          <p className="text-purple-100 text-sm md:text-base max-w-2xl mx-auto">
            Invite schools and students to join the Olympiad platform and earn
            exciting rewards with every successful referral.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div
            className="p-6 rounded-3xl transition-all duration-300"
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 25px 45px rgba(139,92,246,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.22)";
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Referrals</p>
                <h2 className="text-4xl font-extrabold mt-2 text-white">
                  {totalReferrals}
                </h2>
              </div>

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  boxShadow: "0 10px 30px rgba(139,92,246,0.28)",
                }}
              >
                👥
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-3xl transition-all duration-300"
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 25px 45px rgba(236,72,153,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 18px 40px rgba(0,0,0,0.22)";
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm">Total Earnings</p>
                <h2 className="text-4xl font-extrabold mt-2 text-white">
                  ₹{earnings}
                </h2>
              </div>

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  boxShadow: "0 10px 30px rgba(236,72,153,0.28)",
                }}
              >
                💰
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div
          className="mb-8 rounded-3xl p-6"
          style={glassCardStyle}
        >
          <p className="text-purple-100 mb-3 text-sm uppercase tracking-wider">
            Your Referral Code
          </p>

          <div
            className="p-5 rounded-2xl text-center md:text-left"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              className="text-3xl md:text-4xl font-extrabold tracking-[3px]"
              style={{
                background: "linear-gradient(90deg, #c084fc, #f9a8d4, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {referralCode || "Loading..."}
            </span>
          </div>
        </div>

        {/* Referral Link */}
        <div
          className="mb-8 rounded-3xl p-6"
          style={glassCardStyle}
        >
          <p className="text-purple-100 mb-3 text-sm uppercase tracking-wider">
            Your Referral Link
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 p-4 rounded-2xl outline-none text-white placeholder:text-gray-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "inset 0 0 15px rgba(255,255,255,0.03)",
              }}
            />

            <button
              onClick={copyLink}
              className="px-8 py-4 rounded-2xl font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6)",
                boxShadow: "0 15px 35px rgba(139,92,246,0.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(236,72,153,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(139,92,246,0.28)";
              }}
            >
              📋 Copy
            </button>
          </div>
        </div>

        {/* Social Share Section */}
        <div
          className="rounded-3xl p-6"
          style={glassCardStyle}
        >
          <p className="mb-5 font-bold text-2xl text-white">Share via</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={shareWhatsApp}
              className="py-4 rounded-2xl font-semibold transition-all duration-300"
              style={socialBtnStyle("linear-gradient(135deg, #22c55e, #16a34a)")}
            >
              WhatsApp
            </button>

            <button
              onClick={shareFacebook}
              className="py-4 rounded-2xl font-semibold transition-all duration-300"
              style={socialBtnStyle("linear-gradient(135deg, #2563eb, #1d4ed8)")}
            >
              Facebook
            </button>

            <button
              onClick={shareTelegram}
              className="py-4 rounded-2xl font-semibold transition-all duration-300"
              style={socialBtnStyle("linear-gradient(135deg, #0ea5e9, #0284c7)")}
            >
              Telegram
            </button>

            <button
              onClick={shareEmail}
              className="py-4 rounded-2xl font-semibold transition-all duration-300"
              style={socialBtnStyle("linear-gradient(135deg, #6b7280, #374151)")}
            >
              Email
            </button>
          </div>
        </div>
      </div>

      {/* Internal Styles */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatOne {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(20px) translateX(15px);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(-15px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 1;
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
          background: linear-gradient(180deg, #8b5cf6, #ec4899);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ec4899, #3b82f6);
        }
      `}</style>
    </div>
  );
}

// ================= EXTRA STYLES =================

const glassCardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
};

const statCardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
  cursor: "pointer",
};

const socialBtnStyle = (bg) => ({
  background: bg,
  boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
});