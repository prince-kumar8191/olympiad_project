





import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function BenefitPay() {
  const [status, setStatus] = useState(null);
  const studentId = localStorage.getItem("studentId");

  // 🔹 Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔹 Fetch payment status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!studentId) {
          console.log("❌ No studentId");
          setStatus("pending");
          return;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/get-payment-status/${studentId}`
        );
        const data = await res.json();

        console.log("STATUS API:", data);

        const paymentStatus = (data.payment_status || "").toLowerCase().trim();

        if (paymentStatus === "success") {
          setStatus("success");
        } else {
          setStatus("pending");
        }
      } catch (err) {
        console.error(err);
        setStatus("pending");
      }
    };

    fetchStatus();
  }, [studentId]);

  // 🔥 BLOCK SUCCESS USERS
  if (status === "success") {
    alert("Already paid! You can claim your benefits.");
    return <Navigate to="/Student_Dashboard" replace />;
  }

  // 🔥 LOADING
  if (status === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white text-2xl font-bold"
        style={{
          background:
            "linear-gradient(135deg, #071a35, #0b2f63, #153d8a, #28105c)",
        }}
      >
        <div className="text-center animate-pulse">
          <div className="w-20 h-20 border-4 border-pink-400 border-t-cyan-300 rounded-full animate-spin mx-auto mb-4"></div>
          Loading Benefits...
        </div>
      </div>
    );
  }

  // 🔹 Pay Now Function (REAL RAZORPAY)
  const payNow = async () => {
    const razorLoaded = await loadRazorpay();

    if (!razorLoaded) {
      alert("Razorpay failed to load");
      return;
    }

    try {
      // 🔹 Create order
      const res = await fetch("${import.meta.env.VITE_API_URL}/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: 500 * 100 }) // amount in paise
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SXSRaYXP2vwXGu",
        amount: order.amount,
        currency: "INR",
        name: "Bhayat Foundation",
        description: "Registration Fee",
        order_id: order.id,

        handler: async function (response) {
          // 🔥 Update backend
          await fetch("${import.meta.env.VITE_API_URL}/update-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              studentId: studentId,
              status: "success",
              paymentId: response.razorpay_payment_id
            })
          });

          alert("Payment Successful 🎉");

          // 🔥 instant UI update
          setStatus("success");
        },

        prefill: {
          name: "Student",
          email: "test@gmail.com"
        },

        theme: {
          color: "#3b82f6"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #071a35, #0b2f63, #153d8a, #28105c)",
      }}
    >
      {/* 🔥 Floating Glow Background */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(59,130,246,0.22)",
          filter: "blur(120px)",
          top: "-80px",
          left: "-70px",
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
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(147,197,253,0.16)",
          filter: "blur(100px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulseGlow 5s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* MAIN CARD */}
      <div
        className="w-full max-w-2xl p-8 md:p-10 rounded-[32px] relative z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
          animation: "fadeUp 0.8s ease",
        }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-4"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #ec4899)",
              boxShadow: "0 15px 35px rgba(59,130,246,0.35)",
            }}
          >
            💳
          </div>

          <h1
            className="text-4xl font-extrabold mb-2"
            style={{
              background: "linear-gradient(90deg, #ffffff, #bfdbfe, #f9a8d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Benefits & Payment
          </h1>

          <p className="text-blue-100 text-sm md:text-base">
            Unlock premium student features and exam benefits
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {[
            { icon: "🎁", title: "Referral Points System", desc: "Earn rewards by inviting friends" },
            { icon: "🏆", title: "Olympiad Access", desc: "Participate in olympiad exams" },
            { icon: "📝", title: "Mock Tests", desc: "Practice with smart mock tests" },
            { icon: "🚀", title: "Skill Tests", desc: "Improve and track your performance" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-all duration-300 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
                animation: `fadeUp 0.7s ease ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 35px rgba(236,72,153,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.16)";
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #ec4899)",
                    boxShadow: "0 10px 25px rgba(59,130,246,0.22)",
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-blue-100 mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Box */}
        <div
          className="rounded-3xl p-6 mb-6"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
          }}
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-blue-100 text-sm">Registration Fee</p>
              <h2 className="text-4xl font-extrabold text-white mt-1">₹500</h2>
              <p className="text-pink-200 text-sm mt-2">
                One-time payment for student premium access
              </p>
            </div>

            <div
              className="px-5 py-3 rounded-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(236,72,153,0.16))",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              🔐 Secure Payment
            </div>
          </div>
        </div>

        {/* Pay Button */}
        {status === "pending" && (
          <button
            onClick={payNow}
            className="w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300"
            style={{
              background: "linear-gradient(90deg, #2563eb, #3b82f6, #ec4899)",
              boxShadow: "0 15px 35px rgba(59,130,246,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.01)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(236,72,153,0.28)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(59,130,246,0.35)";
            }}
          >
            🚀 Pay ₹500 Now
          </button>
        )}

        {/* Footer Note */}
        <p className="text-center text-xs text-blue-100 mt-6 opacity-80">
          Powered by Razorpay • Safe • Fast • Encrypted
        </p>
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
          background: linear-gradient(180deg, #3b82f6, #ec4899);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ec4899, #3b82f6);
        }
      `}</style>
    </div>
  );
}