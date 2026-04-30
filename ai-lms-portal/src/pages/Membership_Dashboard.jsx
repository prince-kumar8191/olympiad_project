import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MembershipDashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("membership") || "{}");
    setData(stored);
      console.log("Membership Data:", stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("membership");
    navigate("/");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="font-sans min-h-screen flex flex-col md:flex-row text-white"
      style={{
        background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* 🔥 ANIMATED GLOW */}
      <div style={glow1} />
      <div style={glow2} />
      <div style={glow3} />

      {/* SIDEBAR */}
      <div className="w-full md:w-72 flex flex-col relative z-10"
        style={sidebarStyle}
      >

        <div className="p-6 text-3xl font-extrabold border-b"
          style={logoStyle}
        >
          Membership
        </div>

        <nav className="flex-1 p-4 space-y-3">

          <a className="block p-3 rounded-2xl" style={activeNav}>
            🏠 Dashboard
          </a>

          <a
            onClick={() => navigate("/Membership_Profile",{ replace: true })}
            className="block p-3 rounded-2xl"
            style={navItem}
          >
            👤 My Profile
          </a>
          <a
            onClick={() => navigate("/Membership_Refer",{ replace: true })}
            className="block p-3 rounded-2xl"
            style={navItem}
          >
            Refer
          </a>

          <a 
              onClick={() => navigate("/Membership_Id",{ replace: true })}
          className="block p-3 rounded-2xl" style={navItem}>
            🪪 Membership Card
          </a>

          <a className="block p-3 rounded-2xl" style={navItem}>
            📊 Activity
          </a>

          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-2xl mt-2"
            style={logoutStyle}
          >
            🔓 Logout
          </button>

        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10 w-full">

        {/* TOPBAR */}
        <div style={topbar}>
          <div>
            <p className="text-sm text-gray-300">Membership ID</p>
            <p className="text-lg md:text-xl font-bold text-cyan-300">
              {data.membershipId}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-pink-200">Email</p>
            <p className="font-bold text-pink-300 text-md md:text-lg">
              {data.email || "N/A"}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-8 overflow-y-auto">

          <h1 className="text-2xl md:text-4xl font-extrabold mb-8"
            style={gradientText}
          >
            Welcome {data.name || "Member"}
          </h1>

          {/* 🔥 CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {[
              { title: "Bhayat ID", value: data.bhayatId, icon: "🆔" },
              { title: "Field", value: data.field, icon: "🎯" },
              { title: "State", value: data.state, icon: "🌍" },
              { title: "City", value: data.city, icon: "🏙️" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl"
                style={cardStyle}
              >
                <div className="flex justify-between mb-3">
                  <p className="text-gray-300">{item.title}</p>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{item.value || "N/A"}</h2>
              </div>
            ))}

          </div>

          {/* 🔥 MAIN MEMBERSHIP CARD */}
          <div style={mainCard}>
            <h3 className="text-xl md:text-2xl font-bold text-cyan-300 mb-4">
              Membership Details
            </h3>

            <div className="space-y-3 text-sm md:text-lg">

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-400">Membership ID</span>
                <span className="text-green-400">{data.membershipId}</span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-400">Joining Date</span>
                <span>{data.joiningDate || "N/A"}</span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-400">Role Type</span>
                <span>{data.roleType}</span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-400">Membership Type</span>
                <span>{data.membershipType}</span>
              </div>

              <div className="flex justify-between flex-wrap">
                <span className="text-gray-400">Morcha</span>
                <span>{data.morcha}</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔥 ANIMATION */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
      `}</style>
    </div>
  );
}


/* ================= STYLES ================= */

const glow1 = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(34,211,238,0.25)",
  filter: "blur(120px)",
  top: "-50px",
  left: "-50px",
  animation: "float 8s infinite",
};

const glow2 = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(236,72,153,0.25)",
  filter: "blur(120px)",
  bottom: "-50px",
  right: "-50px",
  animation: "float 10s infinite",
};

const glow3 = {
  position: "absolute",
  width: "250px",
  height: "250px",
  background: "rgba(168,85,247,0.2)",
  filter: "blur(100px)",
  top: "40%",
  left: "40%",
  animation: "float 12s infinite",
};

const sidebarStyle = {
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  borderRight: "1px solid rgba(255,255,255,0.1)",
};

const logoStyle = {
  background: "linear-gradient(90deg, cyan, pink)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const navItem = {
  background: "rgba(255,255,255,0.05)",
};

const activeNav = {
  background: "linear-gradient(90deg, rgba(34,211,238,0.3), rgba(236,72,153,0.3))",
};

const logoutStyle = {
  background: "rgba(255,0,0,0.2)",
};

const topbar = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "10px",
  padding: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
};

const gradientText = {
  background: "linear-gradient(90deg, cyan, pink)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const cardStyle = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const mainCard = {
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.1)",
};