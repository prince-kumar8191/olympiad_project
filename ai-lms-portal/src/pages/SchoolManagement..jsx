import React, { useState } from "react";
// import axios from "axios";

export default function SchoolManagement() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [schools, setSchools] = useState([
    {
      id: "SCH-2401",
      name: "Green Valley School",
      email: "green@gmail.com",
      status: "Pending",
      blocked: false,
      task: "None",
      credits: 10,
      phone: "9876543210",
      city: "Delhi",
      students: 120
    },
    {
      id: "SCH-2402",
      name: "Sunrise Public School",
      email: "sunrise@gmail.com",
      status: "Approved",
      blocked: false,
      task: "Olympiad Registration",
      credits: 25,
      phone: "9876501234",
      city: "Lucknow",
      students: 200
    }
  ]);

  // Approve
  const approveSchool = (id) => {
    setSchools(schools.map(s =>
      s.id === id ? { ...s, status: "Approved" } : s
    ));
  };

  // Reject
  const rejectSchool = (id) => {
    setSchools(schools.map(s =>
      s.id === id ? { ...s, status: "Rejected" } : s
    ));
  };

  // Block / Unblock
  const toggleBlock = (id) => {
    setSchools(schools.map(s =>
      s.id === id ? { ...s, blocked: !s.blocked } : s
    ));
  };

  // Assign task
  const assignTask = (id) => {
    const task = prompt("Enter Task");
    if (!task) return;

    setSchools(schools.map(s =>
      s.id === id ? { ...s, task } : s
    ));
  };

  // Add credit
  const addCredit = (id) => {
    const points = parseInt(prompt("Enter Credit Points"));
    if (!points) return;

    setSchools(schools.map(s =>
      s.id === id ? { ...s, credits: s.credits + points } : s
    ));
  };

  const filtered = schools.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        School Management Dashboard
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search School..."
        className="w-full p-3 border rounded-lg mb-6 shadow"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th>School Name</th>
              <th>Email</th>
              <th>Students</th>
              <th>Status</th>
              <th>Task</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(s => (

              <tr key={s.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.students}</td>

                <td>

                  {s.status === "Approved" && (
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      Approved
                    </span>
                  )}

                  {s.status === "Pending" && (
                    <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  )}

                  {s.status === "Rejected" && (
                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                      Rejected
                    </span>
                  )}

                </td>

                <td>{s.task}</td>

                <td className="font-bold text-purple-600">
                  ⭐ {s.credits}
                </td>

                <td className="flex gap-2 justify-center flex-wrap p-2">

                  <button
                    onClick={() => setSelected(s)}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => approveSchool(s.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectSchool(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => assignTask(s.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Task
                  </button>

                  <button
                    onClick={() => addCredit(s.id)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Credit +
                  </button>

                  {s.status === "Approved" && (

                    <button
                      onClick={() => toggleBlock(s.id)}
                      className={`px-3 py-1 rounded text-white ${
                        s.blocked ? "bg-yellow-500" : "bg-black"
                      }`}
                    >
                      {s.blocked ? "Unblock" : "Block"}
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PROFILE MODAL */}

      {selected && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-2xl font-bold mb-4">
              School Profile
            </h2>

            <p><b>ID:</b> {selected.id}</p>
            <p><b>School:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>City:</b> {selected.city}</p>
            <p><b>Total Students:</b> {selected.students}</p>
            <p><b>Task:</b> {selected.task}</p>
            <p><b>Credits:</b> ⭐ {selected.credits}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}