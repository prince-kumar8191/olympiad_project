





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OlympiadStudentProfile() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    section: "",
    student_class: "",
    email: "",
    phone: "",
    StudentId: "",
    address: "",
    school: "",
    skills: [],
    photo: "",
    city: "",
    state: "",
    pincode: "",
    father_name: "",
    mother_name: "",
    school_code: "",
    school_address: "",
    blood_group: "",
    father_occupation: "",
    mother_occupation: "",
    dob: ""
  });

  const [profileCompletion, setProfileCompletion] = useState(0);

  const safeSkills = Array.isArray(student.skills) ? student.skills : [];

  // FETCH DATA
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student") || "{}");

    if (storedStudent && Object.keys(storedStudent).length > 0) {
      setStudent({
        ...storedStudent,
        skills: Array.isArray(storedStudent.skills)
          ? storedStudent.skills
          : []
      });
    }

    if (storedStudent.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/get-student/${storedStudent.email}`)
        .then((res) => {
          if (res.data.success && res.data.student) {
            const db = res.data.student;

            const studentData = {
              name: db.name || "",
              email: db.email || "",
              phone: db.phone || "",
              StudentId: db.StudentId || db.student_id || "",
              dob: db.dob || "",
              father_name: db.father_name || "",
              mother_name: db.mother_name || "",
              father_occupation: db.father_occupation || "",
              mother_occupation: db.mother_occupation || "",
              student_class:
                db.student_class || db.class || db.class_name || "",
              section: db.section || "",
              school: db.school || db.school_name || "",
              school_code: db.school_code || "",
              school_address: db.school_address || "",
              address: db.address || "",
              city: db.city || "",
              state: db.state || "",
              pincode: db.pincode || "",
              blood_group: db.blood_group || "",
              photo: db.photo || "",
              skills: Array.isArray(db.skills) ? db.skills : []
            };

            setStudent(studentData);
            localStorage.setItem("student", JSON.stringify(studentData));
          }
        })
        .catch(() => {
          setStudent((prev) => ({ ...prev, skills: [] }));
        });
    }
  }, []);

  // PROFILE COMPLETION
  useEffect(() => {
    const fields = Object.values(student);
    const filled = fields.filter((f) =>
      Array.isArray(f) ? f.length > 0 : f !== ""
    ).length;

    setProfileCompletion(Math.round((filled / fields.length) * 100));
  }, [student]);

  return (
    <div className="min-h-screen flex text-white mainBg">
      
      


      <div className="w-64 p-5 hidden lg:block sidebarGlass">
        <h2 className="text-2xl font-bold mb-6 text-pink-400">
          Student Portal
        </h2>

        <div className="space-y-2">

          <button onClick={() => navigate("/Student_Dashboard")} className="navItem">🏠 Dashboard</button>

          <button className="navItem active">👤 My Profile</button>

          <button onClick={() => navigate("/ExamInstructions")} className="navItem">🧪 My Exams</button>

          {/* 🔥 Separate Mock Test */}
          <button onClick={() => navigate("/MockTests")} className="navItem">
            📝 Mock Tests
          </button>

          {/* 🔥 Separate PYQ */}
          <button onClick={() => navigate("/PYQ")} className="navItem">
            📚 Previous Year Questions
          </button>

          <button onClick={() => navigate("/register")} className="navItem">
            🎯 Register Now
          </button>

          <button onClick={() => navigate("/Results")} className="navItem">
            📊 Results
          </button>

          <button onClick={() => navigate("/Certificates")} className="navItem">
            🏆 Certificates
          </button>

          {/* 🔥 Separate Benefit */}
          <button onClick={() => navigate("/BenefitPay")} className="navItem">
            💰 Benefit & Pay
          </button>

          {/* 🔥 Separate Refer */}
          <button onClick={() => navigate("/StudentRefer")} className="navItem">
            🤝 Refer & Earn
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="navItem logout mt-3"
          >
            🔓 Logout
          </button>

        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6 text-pink-300 fadeIn">
          Welcome {student.name || "Student"} 👋
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT CARD */}
          <div className="glassCard slideUp">

            <div className="flex items-center gap-4">
              <div className="avatar">
                {student.photo ? (
                  <img src={student.photo} alt="" />
                ) : (
                  student.name?.charAt(0) || "S"
                )}
              </div>

              <div>
                <h2 className="font-bold text-lg">{student.name}</h2>
                <p> Class - {student.student_class}</p><p> Section - {student.section}</p>
                <p className="text-sm">Student Id - {student.StudentId}</p>
              </div>
            </div>

            <hr className="my-4 border-white/10" />

            <p>📧 E-mail: {student.email}</p>
            <p>📞Phone: {student.phone}</p>
            <p>📍Address: {student.city} {student.state}</p>
            <p>🏫School Name: {student.school}</p>
            <p>🏫 Code: {student.school_code}</p>
            <p>🧬 Blood: {student.blood_group}</p>

            <button
              onClick={() => navigate("/Edit_profile", { state: student })}
              className="btnPrimary mt-4"
            >
              Edit Profile
            </button>
          </div>

          {/* RIGHT */}
          <div className="md:col-span-2 space-y-6">

            {/* SUMMARY */}
            <div className="glassCard slideUp delay1">
              <h3 className="text-xl font-bold mb-2">Profile Summary</h3>
              <p>
                Welcome {student.name}! Your registered email is {student.email}.
              </p>
            </div>

            {/* FULL DETAILS */}
            <div className="glassCard slideUp delay2">
              <h3 className="text-xl font-bold mb-3">Full Details</h3>

              <div className="grid md:grid-cols-2 gap-3 text-sm">

                <p>👨 Father: {student.father_name}</p>
                <p>👩 Mother: {student.mother_name}</p>
                <p>💼 Father Job: {student.father_occupation}</p>
                <p>💼 Mother Job: {student.mother_occupation}</p>
                <p>🏠 Address: {student.address}</p>
                <p>🏫 School Address: {student.school_address}</p>
                <p>📮 Pincode: {student.pincode}</p>
                <p>🎂 DOB: {student.dob}</p>

              </div>
            </div>

            {/* PROGRESS */}
            <div className="glassCard slideUp delay3">
              <h3 className="text-xl font-bold mb-3">Profile Completion</h3>

              <div className="w-full bg-white/10 rounded-full h-4">
                <div
                  className="h-4 rounded-full progressBar"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>

              <p className="mt-2">{profileCompletion}% Completed</p>
            </div>

            {/* SKILLS */}
            <div className="glassCard slideUp delay4">
              <h3 className="text-xl font-bold mb-3">Skills</h3>

              <div className="flex flex-wrap gap-2">
                {(safeSkills.length > 0
                  ? safeSkills
                  : ["Mathematics", "Science", "Logical Reasoning", "Coding"]
                ).map((s, i) => (
                  <span key={i} className="skillTag">
                    {s}
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

      `}</style>
    </div>
  );
}