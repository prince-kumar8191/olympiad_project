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

    <div className="bg-gray-100 font-sans h-screen flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-indigo-400">
          School Portal
        </div>

        <nav className="flex-1 p-4 space-y-2">

          <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
            🏠 Dashboard
          </a>

          <a
            onClick={() => navigate("/School_Profile", { state: school })}
            className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
          >
            👤 Profile
          </a>

          <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            👨‍🎓 Students
          </a>

          <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            📝 Olympiad Registration
          </a>

          <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            🧪 Exams
          </a>


          <button
            onClick={() => window.open("http://localhost:5000/download-registration-form")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Download Bulk Registration Form
          </button>

          <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            📊 Results
          </a>

          <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            🏆 Certificates
          </a>

        </nav>

      </div>


      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <div className="bg-white shadow p-4 flex justify-between items-center">

          <input
            type="text"
            placeholder="Search students..."
            className="border px-4 py-2 rounded-lg w-72"
          />

          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="font-semibold text-gray-700">
                {school?.institutionName}
              </p>

              <p className="text-sm text-gray-500">
                {school?.district}
              </p>
            </div>

            <button className="text-xl">🔔</button>

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full"
            />

          </div>

        </div>


        {/* CONTENT */}
        <div className="p-8 overflow-y-auto">

          <h1 className="text-3xl font-bold mb-6 text-gray-700">
            Welcome {school?.institutionName}
          </h1>


          {/* DASHBOARD CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow">
              <p>Total Students</p>
              <h2 className="text-3xl font-bold mt-2">00</h2>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow">
              <p>Registered in Olympiad</p>
              <h2 className="text-3xl font-bold mt-2">00</h2>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow">
              <p>Upcoming Exams</p>
              <h2 className="text-3xl font-bold mt-2">00</h2>
            </div>

            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow">
              <p>Certificates Earned</p>
              <h2 className="text-3xl font-bold mt-2">00</h2>
            </div>

          </div>


          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <button className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Add Student
              </h3>
              <p className="text-gray-500">Register new student</p>
            </button>

            <button className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Register Olympiad
              </h3>
              <p className="text-gray-500">Enroll students for exam</p>
            </button>

            <button className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                View Results
              </h3>
              <p className="text-gray-500">Check student results</p>
            </button>

            <button className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Download Certificates
              </h3>
              <p className="text-gray-500">Get student certificates</p>
            </button>

          </div>


          {/* STUDENT TABLE */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-xl font-bold">
                Recent Registered Students
              </h3>

              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Add Student
              </button>

            </div>

            <table className="w-full">

              <thead className="border-b text-gray-500">

                <tr>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Olympiad</th>
                  <th className="text-left">Status</th>
                </tr>

              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="py-3">Rahul Sharma</td>
                  <td>10</td>
                  <td>Math Olympiad</td>
                  <td className="text-green-600 font-semibold">Registered</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Priya Verma</td>
                  <td>9</td>
                  <td>Science Olympiad</td>
                  <td className="text-green-600 font-semibold">Registered</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Aman Singh</td>
                  <td>8</td>
                  <td>Math Olympiad</td>
                  <td className="text-yellow-600 font-semibold">Pending</td>
                </tr>

                <tr>
                  <td className="py-3">Neha Gupta</td>
                  <td>7</td>
                  <td>Science Olympiad</td>
                  <td className="text-green-600 font-semibold">Registered</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}