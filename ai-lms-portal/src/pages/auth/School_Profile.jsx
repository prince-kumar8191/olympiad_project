











import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function SchoolProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [school, setSchool] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchSchoolProfile = async () => {
    try {
      const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");
      const email = savedSchool.email;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/school/profile?email=${email}`
      );

      if (res.data) {
        const formattedData = {
          school_name: res.data.institutionName,
          affiliation: res.data.affiliation,
          school_code: res.data.schoolCode || res.data.school_code,
          city: res.data.district,
          state: res.data.state,
          school_email: res.data.email,
          school_phone: res.data.mobile,
          principal_name: res.data.principalName,
          school_address: res.data.address,
          pincode: res.data.pincode,
          facilities: res.data.facilities || [],
          classes: res.data.classes || [],
          logo: res.data.logo || null
        };

        setSchool(formattedData);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");

    if (savedSchool && Object.keys(savedSchool).length > 0) {
      const formattedData = {
        school_name: savedSchool.institutionName || "",
        affiliation: savedSchool.affiliation || "",
        school_code: savedSchool.school_code || savedSchool.schoolCode || "",
        city: savedSchool.district || "",
        state: savedSchool.state || "",
        school_email: savedSchool.email || "",
        school_phone: savedSchool.mobile || "",
        principal_name: savedSchool.principalName || "",
        school_address: savedSchool.address || "",
        pincode: savedSchool.pincode || "",
        logo: savedSchool.logo || null
      };

      setSchool(formattedData);
    }

    fetchSchoolProfile();
  }, []);

  return (
    <div className="min-h-screen flex mainBg text-white relative">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 sidebarGlass transform transition duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold flex justify-between items-center text-pink-300">
          School Portal
          <button
            className="lg:hidden text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        

<nav className="flex-1 p-4 overflow-y-auto">

  <div className="flex flex-col gap-3">

    {/* Dashboard */}
    <button
      onClick={() => {
        navigate("/School_Dashboard", { replace: true });
        setSidebarOpen(false);
      }}
      className="sidebarBtn"
    >
      🏠 Dashboard
    </button>

    {/* Profile */}
    <button
      onClick={() => {
        navigate("/School_Profile", {
          state: school,
          replace: true
        });
        setSidebarOpen(false);
      }}
      className="sidebarBtn active"
    >
      👤 Profile
    </button>

    {/* Students */}
    <button className="sidebarBtn">
      👨‍🎓 Students
    </button>

    {/* Olympiad Registration */}
    <button className="sidebarBtn">
      📝 Olympiad Registration
    </button>

    {/* Exams */}
    <button className="sidebarBtn">
      🧪 Exams
    </button>

    {/* Results */}
    <button className="sidebarBtn">
      📊 Results
    </button>

    {/* Certificates */}
    <button className="sidebarBtn">
      🏆 Certificates
    </button>

  </div>

</nav>



</div>



      

      {/* MAIN */}
      <div className="flex-1 w-full">


    <div className="lg:hidden bg-white/10 backdrop-blur-md px-4 py-4 flex items-center justify-between sticky top-0 z-30">
      
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-2xl text-pink-300"
      >
        ☰
      </button>

      <h2 className="text-lg font-bold text-pink-300">
        School Profile
      </h2>

      <div className="w-8"></div>
    </div>


        <h1 className="text-3xl font-bold mb-6 text-pink-300 fadeIn">
          {school?.school_name || "School"} 
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT CARD */}
          <div className="glassCard slideUp">

            <div className="flex items-center gap-4">
              <div className="avatar">
                {school?.logo ? (
                  <img src={school.logo} alt="" />
                ) : (
                  school?.school_name?.charAt(0) || "S"
                )}
              </div>

              <div>
                <h2 className="font-bold text-lg">{school?.school_name}</h2>
                <p>{school?.affiliation}</p>
                <p className="text-sm">{school?.school_code}</p>
              </div>
            </div>

            <hr className="my-4 border-white/10" />

            <p>📍 {school?.city}, {school?.state}</p>
            <p>📧E-mail: {school?.school_email}</p>
            <p>📞School Phone: {school?.school_phone}</p>
            <p>👨‍🏫 Principal Name: {school?.principal_name}</p>
            <p>🏫 Address: {school?.school_address}</p>
            <p>📮Pincode: {school?.pincode}</p>

            <button
              onClick={() =>
                navigate("/SchoolEdit_profile", { state: school })
              }
              className="btnPrimary mt-4"
            >
              Edit Profile
            </button>

          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">

            <div className="glassCard slideUp delay1">
              <h3 className="text-xl font-bold mb-2">School Summary</h3>
              <p>
                {school?.school_name} focuses on Olympiad excellence and student growth.
              </p>
            </div>

            <div className="glassCard slideUp delay2">
              <h3 className="text-xl font-bold mb-2">Olympiad Performance</h3>

              <div className="w-full bg-white/10 rounded-full h-4">
                <div className="progressBar h-4 rounded-full w-[90%]"></div>
              </div>

              <p className="mt-2">90% Performance</p>
            </div>

            <div className="glassCard slideUp delay3">
              <h3 className="text-xl font-bold mb-3">School Facilities</h3>

              <div className="flex flex-wrap gap-2">
                {(school?.facilities?.length > 0
                  ? school.facilities
                  : ["Science Lab", "Computer Lab", "Library", "Sports Ground"]
                ).map((f, i) => (
                  <span key={i} className="skillTag">
                    {f}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* STYLE */}
      <style>{`


.mainBg{
          background: linear-gradient(135deg,#14001f,#1f0036,#2a004d);
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
          box-shadow:0 20px 60px rgba(255,0,255,0.2);
        }

        .navItem{
          padding:10px;
          border-radius:10px;
          transition:0.3s;
        }

        .navItem:hover{
          background: rgba(255,255,255,0.1);
        }

        .navItem.active{
          background: linear-gradient(90deg,#ff00cc,#7b00ff);
        }

        .btnPrimary{
          width:100%;
          padding:10px;
          border-radius:10px;
          background: linear-gradient(90deg,#ff00cc,#7b00ff);
        }

        .avatar{
          width:60px;
          height:60px;
          border-radius:50%;
          background: linear-gradient(90deg,#ff00cc,#7b00ff);
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
          background: linear-gradient(90deg,#ff00cc,#7b00ff);
        }

        /* Animations */
        .fadeIn{animation:fade 1s ease;}
        @keyframes fade{from{opacity:0}to{opacity:1}}

        .slideUp{animation:up 0.6s ease;}
        .delay1{animation-delay:0.1s}
        .delay2{animation-delay:0.2s}
        .delay3{animation-delay:0.3s}
        .delay4{animation-delay:0.4s}

        @keyframes up{
          from{transform:translateY(30px);opacity:0}
          to{transform:translateY(0);opacity:1}
        }




        
/* Sidebar container */
.sidebarGlass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
}

/* Sidebar buttons (vertical clean look) */
.sidebarBtn {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-radius: 10px;
  background: transparent;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Hover */
.sidebarBtn:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(6px);
}

/* Active button */
.sidebarBtn.active {
  background: linear-gradient(90deg, #ff00cc, #7b00ff);
  color: #fff;
  font-weight: 600;
}

/* Download button alag highlight */
.downloadBtn {
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  color: white;
  justify-content: center;
}

/* Download hover */
.downloadBtn:hover {
  transform: scale(1.03);
}


/* 📱 MOBILE RESPONSIVE FIX */
@media (max-width: 1024px) {

  /* Sidebar full height + smooth */
  .sidebarGlass {
    height: 100vh;
    overflow-y: auto;
  }

  /* Sidebar animation smooth */
  .sidebarGlass {
    transition: transform 0.3s ease-in-out;
  }

  /* Buttons thode bade for mobile */
  .sidebarBtn {
    padding: 14px 16px;
    font-size: 16px;
  }

}

/* 📱 SMALL MOBILE (extra fix) */
@media (max-width: 640px) {

  .sidebarBtn {
    padding: 15px 18px;
    font-size: 16px;
  }

}

   

      `}</style>
    </div>
  );
}

export default SchoolProfile;