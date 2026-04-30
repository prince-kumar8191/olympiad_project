import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SchoolDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [school, setSchool] = useState({});

  useEffect(() => {
    if (location.state) {
      setSchool(location.state);
    }
  }, [location.state]);

  return (
    <div
      className="font-sans h-screen flex text-white"
      style={{
        background: "linear-gradient(135deg, #07111f, #0b1f36, #102944, #091829)",
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
          background: "rgba(0,255,170,0.12)",
          filter: "blur(120px)",
          top: "-100px",
          left: "-60px",
          animation: "floatOne 7s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(0,153,255,0.14)",
          filter: "blur(120px)",
          bottom: "-80px",
          right: "-50px",
          animation: "floatTwo 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* SIDEBAR */}
      <div
        className="w-72 text-white flex flex-col relative z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="p-6 text-3xl font-extrabold border-b"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            background: "linear-gradient(90deg, #00f5a0, #00d9ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          School Portal
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <a
            className="block p-3 rounded-2xl font-semibold transition-all duration-300 hover:translate-x-1"
            style={activeNavStyle}
          >
            🏠 Dashboard
          </a>

          <a
            onClick={() => navigate("/School_Profile", { state: school })}
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            👤 Profile
          </a>

<a
            onClick={() => navigate("/View_student_detail", { state: school })}
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            📊 Find Student
          </a>
          <a
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            👨‍🎓 Students
          </a>
          <a
            onClick={() => navigate("/Student_payment_status")}
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            📊 Student Payment Status
          </a>

          <a
            onClick={() => navigate("/Bulk_Registration")}
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            📝 Bulk Registration
          </a>

          <a
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            🧪 Exams
          </a>
          <a
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            📊 Results
          </a>

          <a
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1 cursor-pointer"
            style={navItemStyle}
          >
            🏆 Certificates
          </a>
        </nav>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* TOPBAR */}
        <div
          className="p-4 flex justify-between items-center"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <input
            type="text"
            placeholder="Search students..."
            className="px-5 py-3 rounded-2xl w-80 outline-none text-white placeholder-gray-300"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          />

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-white text-lg">
                {school?.institutionName || "School Name"}
              </p>

              <p className="text-sm text-cyan-200">
                {school?.district || "District"}
              </p>
            </div>

            <button
              className="text-xl w-12 h-12 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
            >
              🔔
            </button>

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full w-12 h-12 object-cover"
              style={{
                border: "2px solid rgba(0,255,170,0.4)",
                boxShadow: "0 0 20px rgba(0,255,170,0.2)",
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 overflow-y-auto">
          <h1
            className="text-4xl font-extrabold mb-8"
            style={{
              background: "linear-gradient(90deg, #ffffff, #c7f9ff, #9dfcff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome {school?.institutionName || "School"}
          </h1>

          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Students",
                value: "00",
                color: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                icon: "👨‍🎓",
              },
              {
                title: "Registered in Olympiad",
                value: "00",
                color: "linear-gradient(135deg, #2563eb, #06b6d4)",
                icon: "📝",
              },
              {
                title: "Upcoming Exams",
                value: "00",
                color: "linear-gradient(135deg, #16a34a, #10b981)",
                icon: "🧪",
              },
              {
                title: "Certificates Earned",
                value: "00",
                color: "linear-gradient(135deg, #ec4899, #ef4444)",
                icon: "🏆",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  animation: `fadeUp 0.7s ease ${i * 0.1}s both`,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,255,170,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-300">{item.title}</p>
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
                <h2 className="text-4xl font-extrabold text-white">{item.value}</h2>
              </div>
            ))}
          </div>
          {/* QUICK ACTIONS */}
<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
  {[
    {
      title: "Download Bulk registration",
      subtitle: "Get Bulk registration form",
      icon: "📥",
      color: "#7dd3fc",
      action: () =>
        window.open(`${import.meta.env.VITE_API_URL}/download-registration-form`),
    },
    {
      title: "Download Template",
      subtitle: "Skill question template",
      icon: "📥",
      color: "#86efac",
      action: () => window.open("/Exam_question_template.xlsx"),
    },
    {
      title: "Upload Skill Test",
      subtitle: "Upload skill test excel file",
      icon: "⬆️",
      color: "#fcd34d",
      action: () => navigate("/Uploadfile"),
    },
    {
      title: "Achievement Certificates",
      subtitle: "Get achievement certificates",
      icon: "🏅",
      color: "#fca5a5",
      action: () => {
        // abhi empty hai, baad me link daal dena
      },
    },
  ].map((item, i) => (
    <button
      key={i}
      onClick={item.action}
      className="rounded-3xl p-6 text-left transition-all duration-300"
      style={quickCardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 22px 50px rgba(0,255,170,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.18)";
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {item.icon}
      </div>

      <h3
        className="text-xl font-bold mb-2"
        style={{ color: item.color }}
      >
        {item.title}
      </h3>

      <p className="text-gray-300">{item.subtitle}</p>
    </button>
  ))}
</div>

          {/* STUDENT TABLE */}
          <div
            className="p-6 rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold text-cyan-300">
                Recent Registered Students
              </h3>

              <button
                className="px-5 py-3 rounded-2xl font-semibold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00f5a0, #00d9ff)",
                  color: "#001b2b",
                  boxShadow: "0 10px 25px rgba(0,255,170,0.2)",
                }}
              >
                Add Student
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead
                  className="text-gray-300"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <tr>
                    <th className="text-left py-4 px-4">Name</th>
                    <th className="text-left px-4">Class</th>
                    <th className="text-left px-4">Olympiad</th>
                    <th className="text-left px-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={tableRowStyle}>
                    <td className="py-4 px-4 text-white">Rahul Sharma</td>
                    <td className="px-4 text-gray-300">10</td>
                    <td className="px-4 text-gray-300">Math Olympiad</td>
                    <td className="px-4 text-green-400 font-semibold">Registered</td>
                  </tr>

                  <tr style={tableRowStyle}>
                    <td className="py-4 px-4 text-white">Priya Verma</td>
                    <td className="px-4 text-gray-300">9</td>
                    <td className="px-4 text-gray-300">Science Olympiad</td>
                    <td className="px-4 text-green-400 font-semibold">Registered</td>
                  </tr>

                  <tr style={tableRowStyle}>
                    <td className="py-4 px-4 text-white">Aman Singh</td>
                    <td className="px-4 text-gray-300">8</td>
                    <td className="px-4 text-gray-300">Math Olympiad</td>
                    <td className="px-4 text-yellow-400 font-semibold">Pending</td>
                  </tr>

                  <tr style={tableRowStyle}>
                    <td className="py-4 px-4 text-white">Neha Gupta</td>
                    <td className="px-4 text-gray-300">7</td>
                    <td className="px-4 text-gray-300">Science Olympiad</td>
                    <td className="px-4 text-green-400 font-semibold">Registered</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00e5ff, #00c853);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #00c853, #00e5ff);
        }
      `}</style>
    </div>
  );
}

// ================= EXTRA STYLES =================

const navItemStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#e5f7ff",
  backdropFilter: "blur(10px)",
};

const activeNavStyle = {
  background: "linear-gradient(90deg, rgba(0,245,160,0.2), rgba(0,217,255,0.18))",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  boxShadow: "0 10px 25px rgba(0,255,170,0.12)",
};

const downloadBtnStyle = {
  background: "linear-gradient(135deg, rgba(0,245,160,0.18), rgba(0,217,255,0.18))",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#ffffff",
  backdropFilter: "blur(10px)",
  boxShadow: "0 12px 30px rgba(0,255,170,0.08)",
};

const quickCardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
};

const tableRowStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
};