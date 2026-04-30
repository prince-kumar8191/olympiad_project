





import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function VolunteerProfile() {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔥 NEW (responsive sidebar toggle)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const email = localStorage.getItem("VolunteerEmail");

  const getLocalData = () => {
    try {
      return JSON.parse(localStorage.getItem(`volunteer_${email}`)) || {};
    } catch {
      return {};
    }
  };

  const calculateCompletion = (data) => {
    if (!data) return 0;

    const fields = [
      data.name,
      data.email,
      data.phone || data.mobile,
      data.qualification,
      data.profession || data.Profession,
      data.skills,
      data.availability,
      data.photo,
      data.blood_group
    ];

    const filled = fields.filter(
      (field) => field !== null && field !== "" && field !== undefined
    ).length;

    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateCompletion(profile);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (completion / 100) * circumference;

  useEffect(() => {

    if (!email) {
      setLoading(false);
      return;
    }

    const localData = getLocalData();

    if (Object.keys(localData).length > 0) {
      setProfile(localData);
    }

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`
        );

        console.log("API DATA:", res.data);

        if (res.data && Object.keys(res.data).length > 0) {

          const mergedData = {
            ...getLocalData(),
            ...res.data
          };

          setProfile(mergedData);

          localStorage.setItem(
            `volunteer_${email}`,
            JSON.stringify(mergedData)
          );
        }

      } catch (error) {
        console.log("Profile Error:", error);
      }

      setLoading(false);
    };

    fetchProfile();

  }, [email]);



  if (loading) {
    return <div className="p-10 text-center text-lg text-white">Loading...</div>;
  }

  const navItemStyle = {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
  };

  const activeNavStyle = {
    ...navItemStyle,
    background: "linear-gradient(90deg,#06b6d4,#ec4899)",
  };

  const logoutStyle = {
    background: "linear-gradient(90deg,#ef4444,#ec4899)",
  };

  return (

    <div className="flex min-h-screen mainBg text-white relative">

      {/* 🔥 MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-72 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          borderRight: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-8 text-cyan-300">
            Volunteer
          </h2>

          <ul className="space-y-3">
            <li
              onClick={() => navigate("/Volunteer_Dashboard")}
              className="p-3 rounded-2xl cursor-pointer" style={activeNavStyle}>
              🏠 Dashboard
            </li>

            <Link to="/Volunteer_Profile" className="block p-3 rounded-2xl" style={navItemStyle}>
              👤 Profile
            </Link>

            <li className="p-3 rounded-2xl" style={navItemStyle}>📅 Student Verification</li>
            <li className="p-3 rounded-2xl" style={navItemStyle}>📈 Attendance Monitoring</li>
            <li className="p-3 rounded-2xl" style={navItemStyle}>📊 Results Support</li>
            <li className="p-3 rounded-2xl" style={navItemStyle}>⚠️ Report Issue</li>
            <li className="p-3 rounded-2xl" style={navItemStyle}>📝 Tasks</li>

            <Link to="/VolunteerRefer" className="block p-3 rounded-2xl" style={navItemStyle}>
              🤝 Refer & Earn
            </Link>

            <li
              onClick={() => {
                localStorage.removeItem("volunteerEmail");
                window.location.href = "/Volunteer_Login";
              }}
              className="p-3 rounded-2xl cursor-pointer"
              style={logoutStyle}
            >
              🔓➡️ Logout
            </li>
          </ul>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* 🔥 MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            ☰
          </button>
          <h1 className="text-lg font-bold text-cyan-300">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT CARD */}
          <div className="glassCard p-6">

            <div className="flex items-center gap-4">

              <div className="avatar">
                {profile.photo ? (
                  <img src={profile.photo} />
                ) : (
                  <div className="fallback">
                    {profile.name ? profile.name.charAt(0) : "V"}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold">{profile.name || "Volunteer"}</h2>
                <p className="text-gray-300">Event Volunteer</p>
                <p className="text-gray-400">
                  Volunteer ID : {profile.volunteerId || "N/A"}
                </p>
              </div>

            </div>

            <hr className="my-4 border-gray-600" />

            <p>📧 {profile.email || "-"}</p>
            <p className="mt-2">📞 {profile.mobile || "-"}</p>
            <p className="mt-2">Qualification : {profile.qualification || "-"}</p>
            <p className="mt-2">Profession : {profile.profession || profile.Profession || "-"}</p>
            <p className="mt-2">Skills : {profile.skills || "-"}</p>
            <p className="mt-2">Availability : {profile.availability || "-"}</p>
            <p className="mt-2">Bloodgroup : {profile.blood_group}</p>

            <button onClick={() => navigate("/Voldash_profile")} className="btn mt-4">
              Edit Profile
            </button>

            <button onClick={() => navigate("/VolunteerID")} className="btnGreen mt-3">
              Download ID Card
            </button>

          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">

            <div className="glassCard p-6">
              <h3 className="text-xl font-bold mb-2">Volunteer Summary</h3>
              <p className="text-gray-300">
                Dedicated volunteer supporting Olympiad events and school coordination.
              </p>
            </div>

            <div className="glassCard p-6">
              <h3 className="text-xl font-bold mb-2">Volunteer Performance</h3>

              <div className="flex items-center gap-4">

                <div className="relative w-16 h-16">

                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r={radius} stroke="#1e293b" strokeWidth="6" fill="none" />
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      stroke="url(#grad)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center font-bold">
                    {completion}%
                  </div>

                </div>

                <p className="text-gray-300">
                  Performance score based on participation.
                </p>

              </div>

            </div>

            <div className="glassCard p-6">
              <h3 className="text-xl font-bold mb-4">Skills</h3>

              <span className="skillTag">
                {profile.skills || "No skills added"}
              </span>

            </div>

          </div>

        </div>

      </div>

      <style>{`

.mainBg{
  background: linear-gradient(135deg,#020617,#0f172a,#1e293b);
}

.glassCard{
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border-radius:20px;
}

.avatar{
  width:60px;
  height:60px;
  border-radius:50%;
  overflow:hidden;
  border:2px solid cyan;
}

.avatar img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.fallback{
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#06b6d4;
  font-weight:bold;
}

.btn{
  width:100%;
  padding:10px;
  border-radius:10px;
  background: linear-gradient(90deg,#06b6d4,#ec4899);
}

.btnGreen{
  width:100%;
  padding:10px;
  border-radius:10px;
  background: linear-gradient(90deg,#22c55e,#06b6d4);
}

.skillTag{
  background: rgba(255,255,255,0.1);
  padding:6px 14px;
  border-radius:20px;
}

`}</style>

    </div>
  );
}

export default VolunteerProfile;