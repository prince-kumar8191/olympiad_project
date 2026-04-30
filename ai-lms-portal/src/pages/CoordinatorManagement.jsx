




import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CoordinatorManagement() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
const [resumeModal, setResumeModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const [taskModal, setTaskModal] = useState(false);
  const [assignAllMode, setAssignAllMode] = useState(false);
  const [currentCoordinator, setCurrentCoordinator] = useState(null);
  const [customTask, setCustomTask] = useState("");

  const taskList = [
    "Register new school details (name, address, board, contact info)",
    "Register new institute/coaching centers/partners",
    "Upload and verify institute credentials",
    "Monitor institute performance & enrollments",
    "Monitor school performance & enrollments",
    "Total no of free students added in LMS system",
    "Total no of paid students added in LMS system",
    "Verify payment status",
    "New added / onboard volunteers",
    "New added / onboard interns",
    "Guide students through payment process",
    "Contact schools/institutes for onboarding",
    "Resolve student queries and doubts",
    "Prepare daily performance reports",
    "Prepare weekly performance reports",
    "Work on portal (Edu/Bhakti/Olympia/Donation)",
    "Conduct meetings with schools/institutes",
    "Promote via WhatsApp & social media",
    "Daily calling data update"
  ];

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/coordinators`);
      setCoordinators(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const approveCoordinator = async (id) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/admin/update-coordinator-status/${id}`, {
      status: "approved"
    });
    fetchCoordinators();
  };

  const rejectCoordinator = async (id) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/admin/update-coordinator-status/${id}`, {
      status: "rejected"
    });
    fetchCoordinators();
  };
const toggleBlock = async (id) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/admin/toggle-block/${id}`);
    
    alert(res.data.message);

    // UI update (optional)
    fetchCoordinators();

  } catch (err) {
    console.error(err);
  }
};

  const addCredit = async (id) => {
    const points = parseInt(prompt("Enter Credit Points"));
    if (!points) return;

    await axios.post(`${import.meta.env.VITE_API_URL}/admin/add-credits`, {
      coordinatorId: id,
      credits: points
    });


    fetchCoordinators();
  };

  const removeCredit = async (id) => {
    const points = parseInt(prompt("Enter Credit Points to Deduct"));
    if (!points || points <= 0) return alert("Invalid points");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/remove-coordinator-credits`,
        {
          coordinatorId: id,
          credits: points
        }
      );

      alert(res.data.message || "Credits Deducted ✅");
      fetchCoordinators();

    } catch (err) {
      alert("Error ❌");
    }
  };

  const viewResume = (id) => {
    const url = `${import.meta.env.VITE_API_URL}/admin/get-coordinator-resume/${id}`;
    setResumeUrl(url);
    setResumeModal(true);
  };

  const assignTask = async (task) => {
    try {
      if (assignAllMode) {
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/assign-task-all-coordinator`, { task });
        alert("Task assigned to ALL Coordinators ✅");
      } else {
        if (!currentCoordinator) return;

        await axios.post(`${import.meta.env.VITE_API_URL}/admin/assign-task`, {
          coordinatorId: currentCoordinator.coordinatorId,
          task
        });

        alert("Task assigned ✅");

  
      }

      setTaskModal(false);
      setAssignAllMode(false);
      setCustomTask("");
      fetchCoordinators();

    } catch (err) {
      alert("Error ❌");
    }
  };

  const filtered = coordinators.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 sm:p-6 md:p-8 text-white">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center tracking-wide bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
        🚀 Coordinator Management Dashboard
      </h1>

      {/* ASSIGN ALL BUTTON */}
      <button
        onClick={() => {
          setAssignAllMode(true);
          setTaskModal(true);
        }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all px-5 py-2 rounded-xl mb-4 shadow-xl"
      >
        🚀 Assign Task to ALL Coordinators
      </button>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search Coordinator..."
        className="w-full p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-center text-xs sm:text-sm md:text-base min-w-[800px]">

            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
              <tr>
                <th className="p-3">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Task</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(c => (
                <tr key={c.coordinatorId}
                  className="border-t border-white/10 hover:bg-white/10 transition duration-300 hover:scale-[1.01]">

                  <td className="p-3">{c.coordinatorId}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>

                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm
                      ${c.status === "approved" && "bg-green-500/20 text-green-300"}
                      ${c.status === "pending" && "bg-yellow-500/20 text-yellow-300"}
                      ${c.status === "rejected" && "bg-red-500/20 text-red-300"}
                    `}>
                      {c.status}
                    </span>
                  </td>

                  <td>{c.task || "None"}</td>

                  <td className="font-bold text-yellow-300">
                    ⭐ {c.credits || 0}
                  </td>

                  <td className="flex gap-2 flex-wrap justify-center p-2">

                    <button onClick={() => setSelected(c)} className="btn">View</button>
                    <button onClick={() => viewResume(c.coordinatorId)} className="bg-blue-700 text-white px-3 py-1 rounded">Resume</button>

                    <button onClick={() => approveCoordinator(c.id)} className="btn green">Approve</button>

                    <button onClick={() => rejectCoordinator(c.id)} className="btn red">Reject</button>

                    <button
                      onClick={() => {
                        setCurrentCoordinator(c);
                        setAssignAllMode(false);
                        setTaskModal(true);
                      }}
                      className="btn blue"
                    >
                      Task
                    </button>

                    <button onClick={() => addCredit(c.id)} className="btn purple">+Credit</button>
                    <button onClick={() => removeCredit(c.id)} className="bg-red-600 text-white px-3 py-1 rounded">Credit -</button>

                    {c.status === "approved" && (
                      <button onClick={() => toggleBlock(c.coordinatorId)} className="btn black">
                        {c.blocked ? "Unblock" : "Block"}
                      </button>
                    )}

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* TASK MODAL */}
      {taskModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">

          <div className="bg-white text-black w-[90%] sm:w-[500px] max-h-[80vh] overflow-y-auto p-6 rounded-2xl shadow-2xl animate-scaleUp">

            <h2 className="text-xl font-bold mb-4">Assign Task</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter custom task..."
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={() => assignTask(customTask)}
                className="bg-green-500 text-white px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {taskList.map((task, i) => (
                <button
                  key={i}
                  onClick={() => assignTask(task)}
                  className="text-left p-3 bg-gray-100 hover:bg-indigo-100 rounded-lg"
                >
                  • {task}
                </button>
              ))}
            </div>

            <button
              onClick={() => setTaskModal(false)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center animate-fadeIn">
          <div className="bg-white text-black p-6 rounded-2xl w-[90%] sm:w-96 shadow-2xl animate-scaleUp">
            <h2 className="text-2xl font-bold mb-4">Coordinator Profile</h2>

            <p><b>ID:</b> {selected.coordinatorId}</p>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Task:</b> {selected.task || "None"}</p>
            <p><b>Credits:</b> ⭐ {selected.credits || 0}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* RESUME MODAL */}
      {resumeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] sm:w-[800px] h-[80vh] rounded-2xl flex flex-col">
            <div className="flex justify-between p-3 border-b">
              <h2>📄 Resume</h2>
              <button onClick={() => setResumeModal(false)} className="bg-red-500 text-white px-3 py-1 rounded">Close</button>
            </div>
            <iframe src={resumeUrl} className="w-full h-full" />
          </div>
        </div>
      )}

      {/* BUTTON STYLES */}
      <style>{`
        .btn {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
          background: rgba(255,255,255,0.1);
        }
        .btn:hover { transform: scale(1.1); }

        .green { background: linear-gradient(to right, #00c853, #64dd17); }
        .red { background: linear-gradient(to right, #d50000, #ff1744); }
        .purple { background: linear-gradient(to right, #6a11cb, #2575fc); }
        .blue { background: linear-gradient(to right, #2196f3, #21cbf3); }
        .black { background: linear-gradient(to right, #000000, #434343); }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-in-out; }
      `}</style>

    </div>
  );
}