





import React, { useState, useEffect } from "react";

export default function StudentRefer() {
  const [referralCode, setReferralCode] = useState("");
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student") || "{}");

    if (student.StudentId) {
      setReferralCode(student.StudentId);
    }

    setTotalReferrals(student.totalReferrals || 0);
    setEarnings(student.creditPoints || 0);
  }, []);

  const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;

  const message = `Join using my referral link and earn rewards 🎁\n${referralLink}`;

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
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`,
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
      className="min-h-screen p-8 text-white font-sans relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #12061d, #1b0b2f, #2a0d45, #170822)",
      }}
    >
      {/* 🌟 Animated Background Orbs */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(255, 0, 200, 0.18)",
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
          background: "rgba(168, 85, 247, 0.18)",
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
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.15)",
          filter: "blur(100px)",
          top: "40%",
          left: "45%",
          animation: "pulseGlow 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* MAIN CARD */}
      <div
        className="max-w-5xl mx-auto rounded-[32px] p-8 md:p-10 relative z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
          animation: "fadeUp 0.8s ease",
        }}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-3"
              style={{
                background: "linear-gradient(90deg, #ffffff, #f9a8d4, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Refer & Earn
            </h1>
            <p className="text-pink-100 text-sm md:text-base">
              Invite your friends and earn exciting rewards every time someone joins using your referral code.
            </p>
          </div>

          <div
            className="px-5 py-4 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(236,72,153,0.18), rgba(168,85,247,0.18))",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 12px 30px rgba(236,72,153,0.18)",
            }}
          >
            <p className="text-sm text-pink-100">Reward Status</p>
            <h3 className="text-2xl font-bold text-white">Active 🚀</h3>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="p-6 rounded-3xl transition-all duration-300 cursor-pointer"
            style={statCardPink}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 25px 45px rgba(236,72,153,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-pink-100">Total Referrals</p>
                <h2 className="text-4xl font-extrabold mt-2">{totalReferrals}</h2>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(totalReferrals * 10, 100)}%`,
                  background: "linear-gradient(90deg, #f472b6, #c084fc)",
                }}
              />
            </div>
          </div>

          <div
            className="p-6 rounded-3xl transition-all duration-300 cursor-pointer"
            style={statCardViolet}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 25px 45px rgba(168,85,247,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 18px 35px rgba(0,0,0,0.18)";
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-violet-100">Total Earnings</p>
                <h2 className="text-4xl font-extrabold mt-2">₹{earnings}</h2>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(earnings / 10, 100)}%`,
                  background: "linear-gradient(90deg, #c084fc, #ec4899)",
                }}
              />
            </div>
          </div>
        </div>

        {/* REFERRAL CODE */}
        <div
          className="mb-8 p-6 rounded-3xl"
          style={glassCardStyle}
        >
          <p className="text-pink-100 text-sm mb-3">Your Referral Code</p>
          <div
            className="p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <span className="text-3xl font-extrabold tracking-[4px] text-white">
              {referralCode || "N/A"}
            </span>

            <div
              className="px-4 py-2 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(90deg, rgba(236,72,153,0.22), rgba(168,85,247,0.22))",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Premium Referral Access ✨
            </div>
          </div>
        </div>

        {/* REFERRAL LINK */}
        <div
          className="mb-8 p-6 rounded-3xl"
          style={glassCardStyle}
        >
          <p className="text-pink-100 text-sm mb-3">Your Referral Link</p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-5 py-4 rounded-2xl outline-none text-white placeholder:text-pink-200"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            />

            <button
              onClick={copyLink}
              className="px-7 py-4 rounded-2xl font-bold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #ec4899, #a855f7)",
                boxShadow: "0 15px 35px rgba(236,72,153,0.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Copy Link
            </button>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: "🔗",
              title: "Share Link",
              desc: "Send your referral link to friends through WhatsApp, Telegram, Facebook or Email.",
            },
            {
              icon: "📝",
              title: "Friend Registers",
              desc: "When someone signs up using your referral code, it gets counted automatically.",
            },
            {
              icon: "🎁",
              title: "Earn Rewards",
              desc: "You receive referral rewards and bonus points directly into your student account.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl transition-all duration-300"
              style={{
                ...glassCardStyle,
                animation: `fadeUp 0.8s ease ${i * 0.15}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 25px 50px rgba(168,85,247,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.22)";
              }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-pink-100 text-sm leading-7">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* SOCIAL SHARE */}
        <div
          className="p-6 rounded-3xl"
          style={glassCardStyle}
        >
          <p className="mb-5 text-lg font-semibold text-pink-100">Share via</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={shareWhatsApp}
              className="rounded-2xl p-4 font-bold transition-all duration-300"
              style={shareBtnStyle("#22c55e", "#16a34a")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div className="text-2xl mb-2">💬</div>
              WhatsApp
            </button>

            <button
              onClick={shareFacebook}
              className="rounded-2xl p-4 font-bold transition-all duration-300"
              style={shareBtnStyle("#3b82f6", "#2563eb")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div className="text-2xl mb-2">📘</div>
              Facebook
            </button>

            <button
              onClick={shareTelegram}
              className="rounded-2xl p-4 font-bold transition-all duration-300"
              style={shareBtnStyle("#38bdf8", "#0ea5e9")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div className="text-2xl mb-2">📨</div>
              Telegram
            </button>

            <button
              onClick={shareEmail}
              className="rounded-2xl p-4 font-bold transition-all duration-300"
              style={shareBtnStyle("#8b5cf6", "#ec4899")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              <div className="text-2xl mb-2">✉️</div>
              Email
            </button>
          </div>
        </div>
      </div>

      {/* INTERNAL STYLES */}
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
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.12);
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
          background: linear-gradient(180deg, #ec4899, #a855f7);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #a855f7, #ec4899);
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

const statCardPink = {
  background: "linear-gradient(135deg, rgba(236,72,153,0.18), rgba(168,85,247,0.15))",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
};

const statCardViolet = {
  background: "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(217,70,239,0.14))",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 35px rgba(0,0,0,0.18)",
};

const shareBtnStyle = (c1, c2) => ({
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.10)",
});