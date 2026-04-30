



import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cor_student() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const referralCode = localStorage.getItem("CoordinatorReferralCode");
    console.log("referralCode from localStorage:", referralCode);

    if (!referralCode) {
      console.log("Referral Code Not Found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/coordinator/referrals/${referralCode}`)
      .then((res) => {
        console.log("Students Fetched:", res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="min-h-screen p-6 text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#07111f,#0b1f36,#102944)"
      }}
    >

      {/* 🌈 Glow Effects */}
      <div style={glow1}></div>
      <div style={glow2}></div>

      <h2 className="text-3xl font-bold mb-8 text-center"
        style={{
          background: "linear-gradient(90deg,#00f5ff,#ff00c8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        🎓 My Referred Students
      </h2>

      <div className="rounded-2xl p-6 overflow-x-auto"
        style={glassStyle}
      >

        <table className="w-full text-center min-w-[900px]">

          <thead style={{
            background: "rgba(255,255,255,0.1)"
          }}>
            <tr>
              {/* ✅ SR NO */}
              <th className="p-3">Sr No</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Subject</th>
              <th className="p-3">School</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-400">
                  No Students Found
                </td>
              </tr>

            ) : (

              students.map((s, i) => (
                <tr key={i}
                  style={rowStyle(i)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >

                  {/* ✅ SR NO */}
                  <td className="p-3 text-cyan-300 font-bold">
                    {i + 1}
                  </td>

                  <td className="p-3">{s.student_name}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3">{s.school_name}</td>
                  <td className="p-3">{s.email}</td>

                  <td
                    className={`p-3 font-semibold ${
                      s.payment_status?.toLowerCase() === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {s.payment_status?.toLowerCase() === "success"
                      ? "Paid"
                      : "Pending"}
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

      {/* 🎨 Animations */}
      <style>{`
        @keyframes floatOne {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(20px)}
        }
        @keyframes floatTwo {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-20px)}
        }
      `}</style>

    </div>
  );
}


// 🎨 STYLES

const glassStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
};

const rowStyle = (i) => ({
  background: i % 2 === 0
    ? "rgba(255,255,255,0.03)"
    : "transparent",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  transition: "all 0.3s ease"
});

const glow1 = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(0,255,255,0.15)",
  borderRadius: "50%",
  filter: "blur(120px)",
  top: "-80px",
  left: "-50px",
  animation: "floatOne 6s infinite"
};

const glow2 = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(255,0,150,0.15)",
  borderRadius: "50%",
  filter: "blur(120px)",
  bottom: "-80px",
  right: "-50px",
  animation: "floatTwo 7s infinite"
};