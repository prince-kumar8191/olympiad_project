







import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CoordinatorDashboard() {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(0);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("CoordinatorEmail");

    axios
      .get(`${import.meta.env.VITE_API_URL}/coordinator/profile/${email}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
  const referralCode = localStorage.getItem("CoordinatorReferralCode");

  if (!referralCode) {
    console.log("Referral code not found");
    return;
  }

  axios
    .get(`${import.meta.env.VITE_API_URL}/coordinator/referrals/${referralCode}`)
    .then((res) => {
      console.log("Student Count API:", res.data);

      // ⚠️ check response format
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setStudentCount(data.length);   // 🔥 MAIN LINE
    })
    .catch((err) => console.log(err));

}, []);

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        background:
          "linear-gradient(135deg, #140b2d, #1c1040, #26145a, #12071f)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          background: "rgba(168,85,247,0.18)",
          filter: "blur(120px)",
          top: "-90px",
          left: "-70px",
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
          background: "rgba(236,72,153,0.16)",
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
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "rgba(99,102,241,0.16)",
          filter: "blur(120px)",
          top: "35%",
          right: "18%",
          animation: "floatThree 10s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div className="flex min-h-screen relative z-10">
        {/* SIDEBAR */}
        <div
          className="w-64 text-white p-6"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(18px)",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
          }}
        >
          <h2
            className="text-3xl font-extrabold mb-8"
            style={{
              background: "linear-gradient(90deg, #c084fc, #e879f9, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Coordinator
          </h2>

          <ul className="space-y-4">
            <li
              className="p-3 rounded-2xl font-semibold cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={activeNavStyle}
            >
              🏠 Dashboard
            </li>

            <li>
              <Link
                to="/Coordinator_profile"
                className="block p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
                style={navItemStyle}
              >
                👤 My Profile
              </Link>
            </li>

            <li
              className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={navItemStyle}
            >
              🏫 Schools
            </li>

            <li>
              <Link
                to="/Cor_student"
                className="block p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
                style={navItemStyle}
              >
                👨‍🎓 Students
              </Link>
            </li>

            <li
              className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={navItemStyle}
            >
              📋 olympiad Registrations
            </li>

            <li
              className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={navItemStyle}
            >
              📈 Reports
            </li>

            <li
              className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={navItemStyle}
            >
              🔔 Notifications
            </li>

            <Link
              to="/CoordinatorRefer"
              className="block p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={navItemStyle}
            >
              🤝 Refer & Earn
            </Link>

            <li
              className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
              style={logoutStyle}
            >
              🔓➡️ Logout
            </li>
          </ul>
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col">
          {/* TOP HEADER */}
          <div
            className="p-4 flex justify-between items-center"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(14px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h1
              className="text-2xl font-bold"
              style={{
                background:
                  "linear-gradient(90deg, #ffffff, #e9d5ff, #f0abfc, #c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome {profile.name || "Coordinator"}
            </h1>

            <div className="flex items-center gap-6">
              <button
                className="text-xl w-12 h-12 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                🔔
              </button>

              <div className="text-right">
                <p className="text-sm text-fuchsia-200">Coordinator ID</p>
                <p className="font-bold text-violet-300 text-lg">
                  {profile.coordinatorId || "N/A"}
                </p>

                <p className="text-gray-300 text-sm">{profile.email}</p>
                <p className="text-gray-300 text-sm">{profile.mobile}</p>
              </div>

              {profile.photo ? (
                <img
                  src={
                    profile.photo.startsWith("data:image")
                      ? profile.photo
                      : `data:image/png;base64,${profile.photo}`
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full object-cover border"
                  style={{
                    border: "2px solid rgba(192,132,252,0.45)",
                    boxShadow: "0 0 20px rgba(192,132,252,0.25)",
                  }}
                />
              ) : (
                <div
                  className="w-12 h-12 text-white flex items-center justify-center rounded-full font-bold text-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #a855f7, #ec4899, #6366f1)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(192,132,252,0.28)",
                  }}
                >
                  {profile.name ? profile.name.charAt(0) : "C"}
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 overflow-y-auto">
            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                {
                  title: "Assigned Task",
                 value: profile.task ? 1 : 0,  // 🔥 main line
                  icon: "🏫",
                  color: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  link: "/Cor_Task"
                  
                },
                {
                  title: "Registered Students",
                  value: studentCount,
                  icon: "👨‍🎓",
                  color: "linear-gradient(135deg, #a855f7, #ec4899)",
                  link: "/Cor_student"
                },
                {
                  title: "Olympiad Registrations",
                  icon: "📋",
                  color: "linear-gradient(135deg, #7c3aed, #c084fc)",
                  link: "/register"
                },
                {
                  title: "Pending Approvals",
                  value: studentCount,
                  icon: "⏳",
                  color: "linear-gradient(135deg, #f472b6, #ef4444)",
                  link: "/Cor_student"



                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => item.link && navigate(item.link)}
                  className="rounded-3xl p-6 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
                    animation: `fadeUp 0.7s ease ${i * 0.1}s both`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(192,132,252,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.22)";
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-300">{item.title}</h3>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{
                        background: item.color,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      }}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <p className="text-4xl font-extrabold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* SCHOOL LIST */}
            {/* <div className="rounded-3xl p-6 mb-10" style={glassCardStyle}>
              <h2 className="text-2xl font-bold mb-5 text-violet-300">
                Recent Schools
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <tr className="text-gray-300">
                      <th className="p-4">School Name</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Students</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">ABC Public School</td>
                      <td className="p-4 text-gray-300">Delhi</td>
                      <td className="p-4 text-gray-300">120</td>
                      <td className="p-4 text-green-400 font-semibold">
                        Active
                      </td>
                    </tr>

                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">Bright Future School</td>
                      <td className="p-4 text-gray-300">Lucknow</td>
                      <td className="p-4 text-gray-300">85</td>
                      <td className="p-4 text-green-400 font-semibold">
                        Active
                      </td>
                    </tr>

                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">Sunrise Academy</td>
                      <td className="p-4 text-gray-300">Noida</td>
                      <td className="p-4 text-gray-300">65</td>
                      <td className="p-4 text-yellow-300 font-semibold">
                        Pending
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* RECENT REGISTRATIONS */}
            {/* <div className="rounded-3xl p-6" style={glassCardStyle}>
              <h2 className="text-2xl font-bold mb-5 text-fuchsia-300">
                Recent Student Registrations
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <tr className="text-gray-300">
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Class</th>
                      <th className="p-4">School</th>
                      <th className="p-4">Olympiad</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">Rahul Sharma</td>
                      <td className="p-4 text-gray-300">Class 8</td>
                      <td className="p-4 text-gray-300">ABC Public School</td>
                      <td className="p-4 text-violet-300">Math Olympiad</td>
                    </tr>

                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">Ananya Singh</td>
                      <td className="p-4 text-gray-300">Class 6</td>
                      <td className="p-4 text-gray-300">
                        Bright Future School
                      </td>
                      <td className="p-4 text-fuchsia-300">
                        Science Olympiad
                      </td>
                    </tr>

                    <tr style={tableRowStyle}>
                      <td className="p-4 text-white">Arjun Verma</td>
                      <td className="p-4 text-gray-300">Class 9</td>
                      <td className="p-4 text-gray-300">Sunrise Academy</td>
                      <td className="p-4 text-pink-300">English Olympiad</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */} 
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

        @keyframes floatThree {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(18px) translateX(-12px);
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
          background: linear-gradient(180deg, #a855f7, #ec4899, #6366f1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #c084fc, #f472b6, #818cf8);
        }
      `}</style>
    </div>
  );
}

export default CoordinatorDashboard;

// ================= EXTRA STYLES =================

const navItemStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f5eaff",
  backdropFilter: "blur(10px)",
};

const activeNavStyle = {
  background:
    "linear-gradient(90deg, rgba(168,85,247,0.22), rgba(236,72,153,0.18), rgba(99,102,241,0.18))",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  boxShadow: "0 10px 25px rgba(192,132,252,0.16)",
};

const logoutStyle = {
  background:
    "linear-gradient(90deg, rgba(255,80,140,0.18), rgba(255,0,100,0.12))",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  backdropFilter: "blur(10px)",
};

const glassCardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
};

const tableRowStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
};