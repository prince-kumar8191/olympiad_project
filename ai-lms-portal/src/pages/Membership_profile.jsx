import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MembershipProfile() {

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("membership") || "{}");
    setData(stored);
  }, []);

  if (!data) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div
      className="font-sans h-screen flex text-white"
      style={{
        background: "linear-gradient(135deg, #020617, #0f172a, #020617)",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* 🔥 GLOW */}
      <div style={glow1}></div>
      <div style={glow2}></div>
      <div style={glow3}></div>

      {/* 🔥 MOBILE TOPBAR */}
      <div className="md:hidden flex justify-between items-center p-4 absolute top-0 left-0 w-full z-40">
        <h2 className="text-xl font-bold" style={gradientText}>
          Membership
        </h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full w-72 p-6 flex flex-col z-50
          transform transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
        style={sidebarStyle}
      >

        {/* ✅ FIX: mobile me hide */}
        <h2 className="text-3xl font-extrabold mb-8 hidden md:block" style={gradientText}>
          Membership
        </h2>

        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/membership_dashboard", { replace: true });
          }}
          className="p-3 rounded-xl mb-2 transition-all hover:scale-105"
          style={navItem}
        >
          🏠 Dashboard
        </button>

        <button
          className="p-3 rounded-xl mb-2 font-bold"
          style={activeNav}
        >
          👤 Profile
        </button>

        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/Membership_Editprofile", { replace: true });
          }}
          className="p-3 rounded-xl transition-all hover:scale-105"
          style={navItem}
        >
          ✏️ Edit Profile
        </button>

      </div>

      {/* 🔥 OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10 overflow-y-auto p-4 md:p-10 mt-14 md:mt-0">

        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 md:mb-10"
          style={gradientText}
        >
          My Profile ✨
        </h1>

        {/* CARD */}
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col items-center shadow-2xl"
          style={mainCard}
        >

          {/* IMAGE */}
          <div className="relative group">
            <img
              src={data.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="profile"
              className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 blur-md opacity-0 group-hover:opacity-70 transition"></div>
          </div>

          {/* NAME */}
          <h2 className="text-xl md:text-3xl font-bold mt-4 text-center">
            {data.name}
          </h2>
          <p className="text-gray-300 text-center">
            {data.email}
          </p>

          {/* GRID */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">

            {[
              ["Bhayat ID", data.bhayatId],
              ["Phone", data.phone],
              ["Role", data.roleType],
              ["Field", data.field],
              ["Morcha", data.morcha],
              ["Membership", data.membershipType],
              ["State", data.state],
              ["District", data.city],
              ["Pincode", data.pincode],
              ["Blood Group", data.blood_group],
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl" style={cardStyle}>
                <p className="text-gray-400 text-sm">{item[0]}</p>
                <p className="text-lg font-bold">{item[1] || "N/A"}</p>
              </div>
            ))}

          </div>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/Membership_Editprofile", { replace: true })}
            className="mt-6 md:mt-10 px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
            style={btnStyle}
          >
            ✏️ Edit Profile
          </button>

        </div>

      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
      `}</style>
    </div>
  );
}

/* SAME STYLES */

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

const navItem = {
  background: "rgba(255,255,255,0.05)",
};

const activeNav = {
  background: "linear-gradient(90deg, rgba(34,211,238,0.3), rgba(236,72,153,0.3))",
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
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const btnStyle = {
  background: "linear-gradient(90deg, #22d3ee, #ec4899)",
};