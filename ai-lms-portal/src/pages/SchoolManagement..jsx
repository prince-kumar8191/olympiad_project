

import axios from "axios";
import { useEffect, useState } from "react";

export default function SchoolManagement() {

  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);
  const [selected, setSelected] = useState(null);
  const [taskModal, setTaskModal] = useState(false);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [customTask, setCustomTask] = useState("");

  const taskList = [
    "Collect student data",
    "Upload school documents",
    "Verify registrations",
    "Promote Olympiad",
    "Coordinate with students",
    "Prepare daily report"
  ];

  // ================= FETCH =================
  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/schools`);
      setSchools(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ASSIGN TASK =================
  const assignTask = async (task) => {
    if (!currentSchool) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/assign-school-task`, {
        schoolId: currentSchool.schoolId,
        task
      });

      alert("Task Assigned ✅");
      setTaskModal(false);
      setCustomTask("");
      fetchSchools();

    } catch (err) {
      alert("Error assigning task ❌");
    }
  };

  // ================= ADD CREDIT =================
  const addCredit = async (id) => {
    const points = parseInt(prompt("Enter Credit Points"));
    if (!points || points <= 0) return alert("Invalid points");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/add-school-credits`, {
        schoolId: id,
        credits: points
      });

      alert("Credits Added ✅");
      fetchSchools();

    } catch (err) {
      alert("Error ❌");
    }
  };

  // ================= REMOVE CREDIT =================
  const removeCredit = async (id) => {
    const points = parseInt(prompt("Enter Credit Points to Deduct"));
    if (!points || points <= 0) return alert("Invalid points");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/remove-school-credits`, {
        schoolId: id,
        credits: points
      });

      alert("Credits Deducted ✅");
      fetchSchools();

    } catch (err) {
      alert("Error ❌");
    }
  };

  const filtered = schools.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        🏫 School Management Dashboard
      </h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search School..."
        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white/10 border border-white/20 rounded-2xl overflow-x-auto">

        <table className="w-full text-center min-w-[800px]">

          <thead className="bg-purple-600">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
                <th>Type</th> 
              <th>Email</th>
              <th>Students</th>
              <th>Task</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(s => (

              <tr key={s.schoolId} className="border-t border-white/10 hover:bg-white/10">

                <td className="p-3">{s.schoolId}</td>
                <td>{s.name}</td>
                <td>{s.type}</td>
                <td>{s.email}</td>
                <td>{s.students}</td>
                <td>{s.task || "No Task"}</td>

                <td className="text-yellow-300 font-bold">
                  ⭐ {s.credits || 0}
                </td>

                <td className="flex gap-2 flex-wrap justify-center p-2">

                  <button onClick={() => setSelected(s)} className="btn">View</button>

                  <button
                    onClick={() => addCredit(s.schoolId)}
                    className="btn green"
                  >
                    +Credit
                  </button>

                  <button
                    onClick={() => removeCredit(s.schoolId)}
                    className="btn red"
                  >
                    -Credit
                  </button>

                  <button
                    onClick={() => {
                      setCurrentSchool(s);
                      setTaskModal(true);
                    }}
                    className="btn blue"
                  >
                    Task
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {/* PROFILE MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-2xl w-96">
            <h2 className="text-xl font-bold mb-4">School Profile</h2>

            <p><b>ID:</b> {selected.schoolId}</p>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Type:</b> {selected.type}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>City:</b> {selected.city}</p>
            <p><b>Students:</b> {selected.students}</p>
            <p><b>Task:</b> {selected.task}</p>
            <p><b>Credits:</b> ⭐ {selected.credits}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* TASK MODAL */}
      {taskModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-white text-black w-[400px] p-6 rounded-2xl">

            <h2 className="text-xl font-bold mb-4">Assign Task</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Custom task..."
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => {
                  if (!customTask.trim()) return alert("Enter task");
                  assignTask(customTask);
                }}
                className="bg-green-500 text-white px-3 rounded"
              >
                Add
              </button>
            </div>

            {taskList.map((t, i) => (
              <button
                key={i}
                onClick={() => assignTask(t)}
                className="block w-full text-left p-2 bg-gray-100 mb-2 rounded"
              >
                • {t}
              </button>
            ))}

            <button
              onClick={() => setTaskModal(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* BUTTON STYLE */}
      <style>{`
        .btn {
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
          background: rgba(255,255,255,0.1);
          transition: 0.3s;
        }
        .btn:hover {
          transform: scale(1.1);
        }

        .green { background: linear-gradient(to right, #00c853, #64dd17); }
        .red { background: linear-gradient(to right, #d50000, #ff1744); }
        .blue { background: linear-gradient(to right, #2196f3, #21cbf3); }
      `}</style>

    </div>
  );
}