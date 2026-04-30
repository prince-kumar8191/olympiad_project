






import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function CoordinatorProfile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    role: "School Coordinator",
    id: "",
    location: "",
    email: "",
    phone: "",
    school: "",
    experience: "",
    photo: "",
    blood_group: ""
  });

  useEffect(() => {
    const email = localStorage.getItem("CoordinatorEmail");

    if (!email) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/coordinator/profile/${email}`)
      .then((res) => {
        setProfile({
          name: res.data.name || "",
          role: "School Coordinator",
          id: res.data.coordinatorId || "",
          location: "India",
          email: res.data.email || "",
          phone: res.data.mobile || "",
          school: "School Name",
          experience: res.data.experience || "",
          photo: res.data.photo || "",
          blood_group: res.data.blood_group || ""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile Updated Successfully ✅");
  };

  const getProfileCompletion = () => {
    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.school,
      profile.experience,
      profile.blood_group,
      profile.location
    ];

    const filled = fields.filter((field) => field && field !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div className="min-h-screen flex mainBg text-white relative">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR (School Style) */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 sidebarGlass transform transition duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold flex justify-between items-center text-cyan-300">
          Coordinator
          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-3">

            <button
              onClick={() => {
                navigate("/Coordinator_Dashboard", { replace: true });
                setSidebarOpen(false);
              }}
              className="sidebarBtn"
            >
              🏠 Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/Coordinator_profile", { replace: true });
                setSidebarOpen(false);
              }}
              className="sidebarBtn active"
            >
              👤 Profile
            </button>

            <button className="sidebarBtn">🏫 Schools</button>

            <button
              onClick={() => {
                navigate("/Cor_student");
                setSidebarOpen(false);
              }}
              className="sidebarBtn"
            >
              👨‍🎓 Students
            </button>

            <button className="sidebarBtn">📋 Olympiad</button>
            <button className="sidebarBtn">📈 Reports</button>
            <button className="sidebarBtn">🔔 Notifications</button>

            <button
              onClick={() => {
                navigate("/CoordinatorRefer");
                setSidebarOpen(false);
              }}
              className="sidebarBtn"
            >
              🤝 Refer
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.replace("/login");
              }}
              className="sidebarBtn logoutBtn"
            >
              🔓 Logout
            </button>

          </div>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 w-full">

        {/* MOBILE TOPBAR */}
        <div className="lg:hidden bg-white/10 backdrop-blur-md px-4 py-4 flex justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl text-cyan-300">☰</button>
          <h2 className="font-bold text-cyan-300">Coordinator Profile</h2>
          <div className="w-8"></div>
        </div>

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6 text-cyan-300 fadeIn">
            Welcome {profile.name || "Coordinator"}
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT CARD */}
            <div className="glassCard slideUp">

              <div className="flex items-center gap-4">
                <div className="avatar">
                  {profile.photo ? (
                    <img src={profile.photo} alt="" />
                  ) : (
                    profile.name?.charAt(0) || "C"
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-lg">{profile.name}</h2>
                  <p>{profile.role}</p>
                  <p className="text-sm">ID : {profile.id}</p>
                </div>
              </div>

              <hr className="my-4 border-white/10" />

              <p>📍Location: {profile.location}</p>
              <p>📧Email: {profile.email}</p>
              <p>📞Phone: {profile.phone}</p>
              <p>🏫School: {profile.school}</p>
              <p>📊Experience: {profile.experience}</p>
              <p>🩸Blood Group: {profile.blood_group}</p>

              <button
                onClick={() => navigate("/DashVol_profile")}
                className="btnPrimary mt-4"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/CoordinatorId")}
                className="btnPrimary mt-2"
              >
                Download ID Card
              </button>

            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 space-y-6">

              <div className="glassCard slideUp delay1">
                <h3 className="text-xl font-bold mb-2">Coordinator Summary</h3>
                <p>
                  Responsible for coordinating Olympiad exams and managing student activities.
                </p>
              </div>

              <div className="glassCard slideUp delay2">
                <h3 className="text-xl font-bold mb-2">Profile Completion</h3>

                <div className="w-full bg-white/10 rounded-full h-4">
                  <div
                    className="progressBar h-4 rounded-full"
                    style={{ width: `${getProfileCompletion()}%` }}
                  ></div>
                </div>

                <p className="mt-2">{getProfileCompletion()}% Completed</p>
              </div>

              <div className="glassCard slideUp delay3">
                <h3 className="text-xl font-bold mb-3">Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {["Leadership","Communication","Management","Coordination"].map((s,i)=>(
                    <span key={i} className="skillTag">{s}</span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* STYLE */}
      <style>{`

.mainBg{
  background: linear-gradient(135deg,#001f2f,#003b4d,#005f73);
}

.sidebarGlass{
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
}

.glassCard{
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  border-radius:20px;
  padding:20px;
  transition:0.4s;
}

.glassCard:hover{
  transform: translateY(-6px);
  box-shadow:0 20px 60px rgba(0,255,255,0.2);
}

.btnPrimary{
  width:100%;
  padding:10px;
  border-radius:10px;
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
}

.avatar{
  width:60px;
  height:60px;
  border-radius:50%;
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
  display:flex;
  align-items:center;
  justify-content:center;
}

.skillTag{
  padding:6px 12px;
  border-radius:20px;
  background: rgba(255,255,255,0.1);
}

.progressBar{
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
}

.sidebarBtn{
  padding:12px;
  border-radius:10px;
  text-align:left;
  transition:0.3s;
}

.sidebarBtn:hover{
  background: rgba(255,255,255,0.1);
  transform: translateX(6px);
}

.sidebarBtn.active{
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
}

.logoutBtn:hover{
  background:red;
}

.fadeIn{animation:fade 1s ease;}
@keyframes fade{from{opacity:0}to{opacity:1}}

.slideUp{animation:up 0.6s ease;}
@keyframes up{
  from{transform:translateY(30px);opacity:0}
  to{transform:translateY(0);opacity:1}
}

      `}</style>
    </div>
  );
}

export default CoordinatorProfile;