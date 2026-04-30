import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [volunteerID, setVolunteerID] = useState("");
  const [profile, setProfile] = useState({});

  const email = localStorage.getItem("VolunteerEmail");

  // ✅ LOCAL DATA GET
  const getLocalData = () => {
    try {
      return JSON.parse(localStorage.getItem(`volunteer_${email}`)) || {};
    } catch {
      return {};
    }
  };

  useEffect(() => {
    console.log("Email:", email);

    if (!email) return;

    // ✅ STEP 1: LOCAL LOAD (FAST + IMAGE SAFE)
    const localData = getLocalData();

    if (Object.keys(localData).length > 0) {
      setProfile(localData);
      setVolunteerID(localData.volunteerId);
    }

    // ✅ STEP 2: API CALL (MERGE FIX)
    axios
      .get(`${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`)
      .then((res) => {
        const data = res.data;

        console.log("API DATA:", data);

        if (data && Object.keys(data).length > 0) {
          const mergedData = {
            ...localData,
            ...data
          };

          setProfile(mergedData);
          setVolunteerID(mergedData.volunteerId);

          // ✅ SAVE BACK
          localStorage.setItem(
            `volunteer_${email}`,
            JSON.stringify(mergedData)
          );
        }
      })
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div
      className="flex min-h-screen font-sans text-white"
      style={{
        background: "linear-gradient(135deg, #07111f, #0b1f36, #102944, #091829)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
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
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "rgba(0,153,255,0.14)",
          filter: "blur(110px)",
          bottom: "-60px",
          right: "-40px",
          animation: "floatTwo 8s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* SIDEBAR */}
      <div
        className="w-72 text-white p-6 relative z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          className="text-3xl font-extrabold mb-8"
          style={{
            background: "linear-gradient(90deg, #00f5a0, #00d9ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Volunteer
        </h2>

        <ul className="space-y-3">
          <li
            className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={activeNavStyle}
          >
            🏠 Dashboard
          </li>

          <Link
            to="/Volunteer_Profile"
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            👤 Profile
          </Link>

          <Link
            to="/Vol_student"
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            📅 Student Verification
          </Link>

          <li
            className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            📈 Attendance Monitoring
          </li>

          <li
            className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            📊 Results Support
          </li>

          <li
            className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            ⚠️ Report Issue
          </li>

          <Link
            to="/Vol_Task"  
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            📝 Tasks
          </Link>

          <Link
            to="/VolunteerRefer"
            className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1"
            style={navItemStyle}
          >
            🤝 Refer & Earn
          </Link>

          <li
            onClick={() => {
              localStorage.removeItem("volunteerEmail");
              window.location.href = "/Volunteer_Login";
            }}
            className="p-3 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-x-1"
            style={logoutStyle}
          >
            🔓➡️ Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
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
          <h1
            className="text-2xl font-bold"
            style={{
              background: "linear-gradient(90deg, #ffffff, #c7f9ff, #9dfcff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome {profile.name || "Volunteer"}
          </h1>

          <div className="flex items-center gap-6">
            <span
              className="font-semibold px-4 py-2 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e0f7ff",
              }}
            >
              Volunteer ID :
              <span className="text-cyan-300 ml-1 font-bold">
                {volunteerID || "N/A"}
              </span>
            </span>

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

            {/* ✅ IMAGE FIX */}
            <img
              src={profile.photo ? profile.photo : "https://i.pravatar.cc/40"}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
              style={{
                border: "2px solid rgba(0,255,170,0.4)",
                boxShadow: "0 0 20px rgba(0,255,170,0.2)",
              }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 overflow-y-auto">
          {/* CARDS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {[
              {
                title: "Assigned Tasks",
                value: profile.task ? 1 : 0,  // 🔥 main line,
                color: "linear-gradient(135deg, #3f51b5, #2196f3)",
                icon: "📝",
                link:"/Vol_Task"
              },
              {
                title: "Students Verified",
                value: "45",
                color: "linear-gradient(135deg, #00c853, #64dd17)",
                icon: "✅",
              },
              {
                title: "Attendance Marked",
                value: "40",
                color: "linear-gradient(135deg, #00acc1, #26c6da)",
                icon: "📈",
              },
              {
                title: "Issues Reported",
                value: "02",
                color: "linear-gradient(135deg, #f44336, #ff7043)",
                icon: "⚠️",
              },
            ].map((item, i) => (
              <div
                key={i}
                 onClick={() => item.link && navigate(item.link)}
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
                  <h3 className="text-gray-300 font-medium">{item.title}</h3>
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
                <p className="text-4xl font-extrabold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {[
              {
                title: "Start Exam Monitoring",
                subtitle: "Monitor ongoing exam",
                icon: "🎯",
                color: "#7dd3fc",
              },
              {
                title: "Verify Students",
                subtitle: "Verify student identity",
                icon: "🧾",
                color: "#86efac",
              },
              {
                title: "Mark Attendance",
                subtitle: "Record exam attendance",
                icon: "📋",
                color: "#fcd34d",
              },
              {
                title: "Report Issue",
                subtitle: "Submit problem report",
                icon: "🚨",
                color: "#fca5a5",
              },
            ].map((item, i) => (
              <button
                key={i}
                className="rounded-3xl p-6 text-left transition-all duration-300"
                style={quickCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 22px 50px rgba(0,255,170,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.18)";
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
            className="rounded-3xl p-6"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            }}
          >
            <h2 className="text-2xl font-bold mb-5 text-cyan-300">
              Exam Students List
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderBottom: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <th className="p-4 text-gray-200 font-semibold">Student Name</th>
                    <th className="p-4 text-gray-200 font-semibold">Class</th>
                    <th className="p-4 text-gray-200 font-semibold">Exam</th>
                    <th className="p-4 text-gray-200 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    className="transition-all duration-300"
                    style={tableRowStyle}
                  >
                    <td className="p-4 text-white">Rahul Sharma</td>
                    <td className="p-4 text-gray-300">10</td>
                    <td className="p-4 text-gray-300">Math Olympiad</td>
                    <td className="p-4 text-green-400 font-bold">Present</td>
                  </tr>

                  <tr
                    className="transition-all duration-300"
                    style={tableRowStyle}
                  >
                    <td className="p-4 text-white">Priya Verma</td>
                    <td className="p-4 text-gray-300">9</td>
                    <td className="p-4 text-gray-300">Science Olympiad</td>
                    <td className="p-4 text-green-400 font-bold">Present</td>
                  </tr>

                  <tr
                    className="transition-all duration-300"
                    style={tableRowStyle}
                  >
                    <td className="p-4 text-white">Aman Singh</td>
                    <td className="p-4 text-gray-300">8</td>
                    <td className="p-4 text-gray-300">Math Olympiad</td>
                    <td className="p-4 text-red-400 font-bold">Absent</td>
                  </tr>

                  <tr
                    className="transition-all duration-300"
                    style={tableRowStyle}
                  >
                    <td className="p-4 text-white">Neha Gupta</td>
                    <td className="p-4 text-gray-300">7</td>
                    <td className="p-4 text-gray-300">Science Olympiad</td>
                    <td className="p-4 text-green-400 font-bold">Present</td>
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

const logoutStyle = {
  background: "rgba(244,67,54,0.15)",
  border: "1px solid rgba(244,67,54,0.25)",
  color: "#ffd7d7",
  backdropFilter: "blur(10px)",
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