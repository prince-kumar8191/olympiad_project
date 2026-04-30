


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OlympiadAdminDashboard() {

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    volunteers: 0,
    coordinators: 0,
    students: 0,
    registrations: 0
  });

  const [volunteers, setVolunteers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStats = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`);
    setStats(res.data);
  };

  const fetchVolunteers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/volunteers`);
    setVolunteers(res.data.data || []);
  };

  const fetchCoordinators = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/coordinators`);
    setCoordinators(res.data.data || []);
  };

  const fetchSchools = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/schools`);
    setSchools(res.data.data || []);
  };

  const fetchStudents = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/students`);
    setStudents(res.data.data || []);
  };

  useEffect(() => {
    fetchStats();
    fetchVolunteers();
    fetchCoordinators();
    fetchSchools();
    fetchStudents();
  }, []);

  const approveCoordinator = async (id) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/coordinator-status/${id}`,
      { status: "active" }
    );
    fetchCoordinators();
  };

  const approveVolunteer = async (id) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/volunteer-status/${id}`,
      { status: "active" }
    );
    fetchVolunteers();
  };

  const toggleStatus = async (type, id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    await axios.put(
      `${import.meta.env.VITE_API_URL}0/admin/${type}-status/${id}`,
      { status: newStatus }
    );

    if (type === "volunteer") fetchVolunteers();
    if (type === "coordinator") fetchCoordinators();
    if (type === "school") fetchSchools();
  };

  const filteredVolunteers = volunteers.filter(v =>
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCoordinators = coordinators.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSchools = schools.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.school_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.school?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="bg-gradient-to-br from-black via-cyan-900 to-pink-900 font-sans text-white">

      {/* 🔥 Background Glow */}
      <div className="fixed w-[400px] h-[400px] bg-cyan-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="fixed w-[400px] h-[400px] bg-pink-500 opacity-30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      <div className="flex h-screen">

        {/* SIDEBAR */}
        <div className="w-64 backdrop-blur-2xl bg-white/10 border-r border-white/20 shadow-2xl flex flex-col z-10">

          <div className="p-6 text-2xl font-bold border-b border-white/20">
            🚀 Admin Portal
          </div>

          <nav className="flex-1 p-4 space-y-2">

            <a className="block p-3 rounded-xl bg-white/20 font-semibold shadow hover:scale-105 transition">
              Dashboard
            </a>

            <Link to="/SchoolManagement" className="block p-3 rounded-xl hover:bg-white/20 hover:scale-105 transition">
              Schools
            </Link>

            <Link to="/CoordinatorManagement" className="block p-3 rounded-xl hover:bg-white/20 hover:scale-105 transition">
              Coordinator
            </Link>

            <Link to="/VolunteerManagement" className="block p-3 rounded-xl hover:bg-white/20 hover:scale-105 transition">
              Volunteer
            </Link>

            <Link to="/AdminRank" className="block p-3 rounded-xl hover:bg-white/20 hover:scale-105 transition">
              Toper Rank
            </Link>

            <a className="block p-3 rounded-xl hover:bg-white/20 hover:scale-105 transition cursor-pointer">
              Students
            </a>

           
           <Link
              to="/Admin_apporve_stu_payment"
              className="block p-3 rounded-2xl transition-all duration-300 hover:translate-x-1"
            >
              🏫 School Payment status
            </Link>

          
            <a className="block p-3 rounded-xl hover:bg-red-500 hover:scale-105 transition cursor-pointer">
              Logout
            </a>

          </nav>
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col z-10">

          {/* TOPBAR */}
          <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 p-4 flex justify-between items-center shadow">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-xl w-72 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full border-2 border-cyan-400 hover:scale-110 transition"
            />

          </div>

          {/* CONTENT */}
          <div className="p-8 overflow-y-auto">

            <h1 className="text-3xl font-bold mb-6">
              Dashboard Overview
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-6 mb-8">

              <button onClick={() => navigate("/Admin_students")}>
                <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-6 rounded-2xl shadow-lg hover:scale-110 transition">
                  <p>Total Students</p>
                  <h2 className="text-3xl font-bold">{stats.students}</h2>
                </div>
              </button>

              <button onClick={() => navigate("/Admin_schools")}>
                <div className="bg-gradient-to-r from-pink-500 to-cyan-500 p-6 rounded-2xl shadow-lg hover:scale-110 transition">
                  <p>Schools</p>
                  <h2 className="text-3xl font-bold">{stats.registrations}</h2>
                </div>
              </button>

              <button onClick={() => navigate("/Admin_volunteers")}>
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-2xl shadow-lg hover:scale-110 transition">
                  <p>Volunteers</p>
                  <h2 className="text-3xl font-bold">{stats.volunteers}</h2>
                </div>
              </button>

              <button onClick={() => navigate("/Admin_coordinators")}>
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 rounded-2xl shadow-lg hover:scale-110 transition">
                  <p>Coordinators</p>
                  <h2 className="text-3xl font-bold">{stats.coordinators}</h2>
                </div>
              </button>

            </div>

            {/* QUICK ACTIONS */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">

              <button onClick={() => window.open("${import.meta.env.VITE_API_URL}/download-registration-form")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-cyan-300 mb-2">📥 Download Form</h3>
                <p className="opacity-70">Bulk Registration Form</p>
              </button>

              <button onClick={() => window.open("/Exam_question_template.xlsx")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-pink-300 mb-2">📥 Download Template</h3>
                <p className="opacity-70">Exam Question Template</p>
              </button>

              <button onClick={() => navigate("/Uploadfile")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-cyan-300 mb-2">⬆️ Question Upload</h3>
                <p className="opacity-70">Exam Question Upload</p>
              </button>

              <button onClick={() => navigate("/MockUpload")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-pink-300 mb-2">⬆️ Question Upload</h3>
                <p className="opacity-70">Mock Question Upload</p>
              </button>

              <button onClick={() => navigate("/Admin_results")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-cyan-300 mb-2">Exam Result</h3>
                <p className="opacity-70">Exam Result Control</p>
              </button>

               <button onClick={() => navigate("/Add_exam_details")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-cyan-300 mb-2">Exam Details</h3>
                <p className="opacity-70">Add Exam Details </p>
              </button>

              <button onClick={() => navigate("/Admit_Control")}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow hover:scale-110 transition text-center border border-white/20">
                <h3 className="text-xl font-bold text-pink-300 mb-2">Admit Control</h3>
                <p className="opacity-70">Manage Admit Cards</p>
              </button>

            </div>

            {/* VOLUNTEERS */}
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow mb-8 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-cyan-300">Volunteers</h3>

              {filteredVolunteers.map(v => (
                <div key={v.volunteerId} className="flex justify-between border-b border-white/10 py-2">
                  <span>{v.name} - {v.email}</span>

                  {v.status === "pending" ? (
                    <button onClick={() => approveVolunteer(v.volunteerId)} className="bg-green-500 px-3 py-1 rounded-lg">
                      Approve
                    </button>
                  ) : (
                    <button onClick={() => toggleStatus("volunteer", v.volunteerId, v.status)} className="bg-cyan-500 px-3 py-1 rounded-lg">
                      {v.status === "active" ? "Block" : "Unblock"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* COORDINATORS */}
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow mb-8 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-pink-300">Coordinators</h3>

              {filteredCoordinators.map(c => (
                <div key={c.coordinatorId} className="flex justify-between border-b border-white/10 py-2">
                  <span>{c.name} - {c.email}</span>

                  {c.status === "pending" ? (
                    <button onClick={() => approveCoordinator(c.coordinatorId)} className="bg-green-500 px-3 py-1 rounded-lg">
                      Approve
                    </button>
                  ) : (
                    <button onClick={() => toggleStatus("coordinator", c.coordinatorId, c.status)} className="bg-pink-500 px-3 py-1 rounded-lg">
                      {c.status === "active" ? "Block" : "Unblock"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* STUDENTS */}
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-cyan-300">Students</h3>

              {filteredStudents.map(s => (
                <div key={s.studentId} className="border-b border-white/10 py-2">
                  {s.name} - {s.email}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}