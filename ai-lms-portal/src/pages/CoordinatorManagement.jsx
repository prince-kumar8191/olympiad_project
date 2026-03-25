// // import React, { useState } from "react";

// // export default function CoordinatorManagement() {

// //   const [search, setSearch] = useState("");
// //   const [selected, setSelected] = useState(null);

// //   const [coordinators, setCoordinators] = useState([
// //     {
// //       id: "CO-2401",
// //       name: "Ankit Verma",
// //       email: "ankit@gmail.com",
// //       status: "Pending",
// //       blocked: false,
// //       task: "None",
// //       credits: 15,
// //       phone: "9876543210",
// //       city: "Delhi"
// //     },
// //     {
// //       id: "CO-2402",
// //       name: "Neha Singh",
// //       email: "neha@gmail.com",
// //       status: "Approved",
// //       blocked: false,
// //       task: "School Registration",
// //       credits: 30,
// //       phone: "9876541230",
// //       city: "Lucknow"
// //     }
// //   ]);

// //   // Approve
// //   const approveCoordinator = (id) => {
// //     setCoordinators(coordinators.map(c =>
// //       c.id === id ? { ...c, status: "Approved" } : c
// //     ));
// //   };

// //   // Reject
// //   const rejectCoordinator = (id) => {
// //     setCoordinators(coordinators.map(c =>
// //       c.id === id ? { ...c, status: "Rejected" } : c
// //     ));
// //   };

// //   // Block / Unblock
// //   const toggleBlock = (id) => {
// //     setCoordinators(coordinators.map(c =>
// //       c.id === id ? { ...c, blocked: !c.blocked } : c
// //     ));
// //   };

// //   // Assign task
// //   const assignTask = (id) => {
// //     const task = prompt("Enter Task");
// //     if (!task) return;

// //     setCoordinators(coordinators.map(c =>
// //       c.id === id ? { ...c, task } : c
// //     ));
// //   };

// //   // Add credit
// //   const addCredit = (id) => {
// //     const points = parseInt(prompt("Enter Credit Points"));
// //     if (!points) return;

// //     setCoordinators(coordinators.map(c =>
// //       c.id === id ? { ...c, credits: c.credits + points } : c
// //     ));
// //   };

// //   const filtered = coordinators.filter(c =>
// //     c.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (

// //     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

// //       <h1 className="text-3xl font-bold mb-8">
// //         Coordinator Management Dashboard
// //       </h1>

// //       {/* Search */}
// //       <input
// //         type="text"
// //         placeholder="Search Coordinator..."
// //         className="w-full p-3 border rounded-lg mb-6 shadow"
// //         onChange={(e) => setSearch(e.target.value)}
// //       />

// //       {/* Table */}
// //       <div className="bg-white rounded-xl shadow-lg overflow-hidden">

// //         <table className="w-full text-center">

// //           <thead className="bg-indigo-500 text-white">
// //             <tr>
// //               <th className="p-3">ID</th>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Status</th>
// //               <th>Task</th>
// //               <th>Credits</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>

// //             {filtered.map(c => (

// //               <tr key={c.id} className="border-t hover:bg-gray-50">

// //                 <td className="p-3">{c.id}</td>
// //                 <td>{c.name}</td>
// //                 <td>{c.email}</td>

// //                 <td>

// //                   {c.status === "Approved" && (
// //                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
// //                       Approved
// //                     </span>
// //                   )}

// //                   {c.status === "Pending" && (
// //                     <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
// //                       Pending
// //                     </span>
// //                   )}

// //                   {c.status === "Rejected" && (
// //                     <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
// //                       Rejected
// //                     </span>
// //                   )}

// //                 </td>

// //                 <td>{c.task}</td>

// //                 <td className="font-bold text-purple-600">
// //                   ⭐ {c.credits}
// //                 </td>

// //                 <td className="flex gap-2 justify-center flex-wrap p-2">

// //                   <button
// //                     onClick={() => setSelected(c)}
// //                     className="bg-gray-700 text-white px-3 py-1 rounded"
// //                   >
// //                     View
// //                   </button>

// //                   <button
// //                     onClick={() => approveCoordinator(c.id)}
// //                     className="bg-green-500 text-white px-3 py-1 rounded"
// //                   >
// //                     Approve
// //                   </button>

// //                   <button
// //                     onClick={() => rejectCoordinator(c.id)}
// //                     className="bg-red-500 text-white px-3 py-1 rounded"
// //                   >
// //                     Reject
// //                   </button>

// //                   <button
// //                     onClick={() => assignTask(c.id)}
// //                     className="bg-blue-500 text-white px-3 py-1 rounded"
// //                   >
// //                     Task
// //                   </button>

// //                   <button
// //                     onClick={() => addCredit(c.id)}
// //                     className="bg-purple-500 text-white px-3 py-1 rounded"
// //                   >
// //                     Credit +
// //                   </button>

// //                   {c.status === "Approved" && (

// //                     <button
// //                       onClick={() => toggleBlock(c.id)}
// //                       className={`px-3 py-1 rounded text-white ${
// //                         c.blocked ? "bg-yellow-500" : "bg-black"
// //                       }`}
// //                     >
// //                       {c.blocked ? "Unblock" : "Block"}
// //                     </button>

// //                   )}

// //                 </td>

// //               </tr>

// //             ))}

// //           </tbody>

// //         </table>

// //       </div>

// //       {/* PROFILE MODAL */}

// //       {selected && (

// //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

// //           <div className="bg-white p-6 rounded-xl w-96">

// //             <h2 className="text-2xl font-bold mb-4">
// //               Coordinator Profile
// //             </h2>

// //             <p><b>ID:</b> {selected.id}</p>
// //             <p><b>Name:</b> {selected.name}</p>
// //             <p><b>Email:</b> {selected.email}</p>
// //             <p><b>Phone:</b> {selected.phone}</p>
// //             <p><b>City:</b> {selected.city}</p>
// //             <p><b>Task:</b> {selected.task}</p>
// //             <p><b>Credits:</b> ⭐ {selected.credits}</p>

// //             <button
// //               onClick={() => setSelected(null)}
// //               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
// //             >
// //               Close
// //             </button>

// //           </div>

// //         </div>

// //       )}

// //     </div>
// //   );
// // }













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function CoordinatorManagement() {

//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState(null);
//   const [coordinators, setCoordinators] = useState([]);

//   // ================= FETCH DATA =================
//   useEffect(() => {
//     fetchCoordinators();
//   }, []);

//   const fetchCoordinators = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/coordinators");
//       setCoordinators(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= APPROVE =================
//   const approveCoordinator = async (id) => {
//     await axios.put(`http://localhost:5000/admin/update-coordinator-status/${id}`, {
//       status: "approved"
//     });
//     fetchCoordinators();
//   };

//   // ================= REJECT =================
//   const rejectCoordinator = async (id) => {
//     await axios.put(`http://localhost:5000/admin/update-coordinator-status/${id}`, {
//       status: "rejected"
//     });
//     fetchCoordinators();
//   };

//   // ================= BLOCK =================
//   const toggleBlock = async (id) => {
//     await axios.put(`http://localhost:5000/admin/toggle-block/${id}`);
//     fetchCoordinators();
//   };

//   // ================= TASK =================
//   const assignTask = async (id) => {
//     const task = prompt("Enter Task");
//     if (!task) return;

//     await axios.post("http://localhost:5000/admin/assign-task", {
//       coordinatorId: id,
//       task
//     });

//     fetchCoordinators();
//   };

//   // ================= CREDIT =================
//   const addCredit = async (id) => {
//     const points = parseInt(prompt("Enter Credit Points"));
//     if (!points) return;

//     await axios.post("http://localhost:5000/admin/add-credits", {
//       coordinatorId: id,
//       credits: points
//     });

//     fetchCoordinators();
//   };

//   // ================= SEARCH =================
//   const filtered = coordinators.filter(c =>
//     c.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

//       <h1 className="text-3xl font-bold mb-8">
//         Coordinator Management Dashboard
//       </h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search Coordinator..."
//         className="w-full p-3 border rounded-lg mb-6 shadow"
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">

//         <table className="w-full text-center">

//           <thead className="bg-indigo-500 text-white">
//             <tr>
//               <th className="p-3">ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Task</th>
//               <th>Credits</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filtered.map(c => (

//               <tr key={c.coordinatorId} className="border-t hover:bg-gray-50">

//                 <td className="p-3">{c.coordinatorId}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>

//                 <td>
//                   {c.status === "approved" && (
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
//                       Approved
//                     </span>
//                   )}

//                   {c.status === "pending" && (
//                     <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
//                       Pending
//                     </span>
//                   )}

//                   {c.status === "rejected" && (
//                     <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
//                       Rejected
//                     </span>
//                   )}
//                 </td>

//                 <td>{c.task}</td>

//                 <td className="font-bold text-purple-600">
//                   ⭐ {c.creditPoints}
//                 </td>

//                 <td className="flex gap-2 justify-center flex-wrap p-2">

//                   <button
//                     onClick={() => setSelected(c)}
//                     className="bg-gray-700 text-white px-3 py-1 rounded"
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() => approveCoordinator(c.coordinatorId)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => rejectCoordinator(c.coordinatorId)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>

//                   <button
//                     onClick={() => assignTask(c.coordinatorId)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Task
//                   </button>

//                   <button
//                     onClick={() => addCredit(c.coordinatorId)}
//                     className="bg-purple-500 text-white px-3 py-1 rounded"
//                   >
//                     Credit +
//                   </button>

//                   {c.status === "approved" && (
//                     <button
//                       onClick={() => toggleBlock(c.coordinatorId)}
//                       className={`px-3 py-1 rounded text-white ${
//                         c.blocked ? "bg-yellow-500" : "bg-black"
//                       }`}
//                     >
//                       {c.blocked ? "Unblock" : "Block"}
//                     </button>
//                   )}

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* MODAL */}

//       {selected && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-96">

//             <h2 className="text-2xl font-bold mb-4">
//               Coordinator Profile
//             </h2>

//             <p><b>ID:</b> {selected.coordinatorId}</p>
//             <p><b>Name:</b> {selected.name}</p>
//             <p><b>Email:</b> {selected.email}</p>
//             <p><b>Phone:</b> {selected.mobile}</p>
//             <p><b>Qualification:</b> {selected.qualification}</p>
//             <p><b>Experience:</b> {selected.experience}</p>
//             <p><b>Task:</b> {selected.task}</p>
//             <p><b>Credits:</b> ⭐ {selected.credits}</p>

//             <button
//               onClick={() => setSelected(null)}
//               className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


















import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CoordinatorManagement() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [coordinators, setCoordinators] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/coordinators");
      console.log("DATA:", res.data.data); // DEBUG
      setCoordinators(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= APPROVE =================
  const approveCoordinator = async (id) => {
    await axios.put(`http://localhost:5000/admin/update-coordinator-status/${id}`, {
      status: "approved"
    });
    fetchCoordinators();
  };

  // ================= REJECT =================
  const rejectCoordinator = async (id) => {
    await axios.put(`http://localhost:5000/admin/update-coordinator-status/${id}`, {
      status: "rejected"
    });
    fetchCoordinators();
  };

  // ================= BLOCK =================
  const toggleBlock = async (id) => {
    await axios.put(`http://localhost:5000/admin/toggle-block/${id}`);
    fetchCoordinators();
  };

  // ================= TASK =================
  const assignTask = async (id) => {
    const task = prompt("Enter Task");
    if (!task) return;

    await axios.post("http://localhost:5000/admin/assign-task", {
      coordinatorId: id,
      task
    });

    fetchCoordinators();
  };

  // ================= CREDIT =================
  const addCredit = async (id) => {
    const points = parseInt(prompt("Enter Credit Points"));
    if (!points) return;

    await axios.post("http://localhost:5000/admin/add-credits", {
      coordinatorId: id,
      credits: points
    });

    fetchCoordinators();
  };

  // ================= SEARCH =================
  const filtered = coordinators.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Coordinator Management Dashboard
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Coordinator..."
        className="w-full p-3 border rounded-lg mb-6 shadow"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full text-center">

          <thead className="bg-indigo-500 text-white">
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

              <tr key={c.coordinatorId} className="border-t hover:bg-gray-50">

                <td className="p-3">{c.coordinatorId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>

                <td>
                  {c.status === "approved" && (
                    <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                      Approved
                    </span>
                  )}

                  {c.status === "pending" && (
                    <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>
                  )}

                  {c.status === "rejected" && (
                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                      Rejected
                    </span>
                  )}
                </td>

                <td>{c.task || "None"}</td>

                {/* ✅ FIXED CREDIT */}
                <td className="font-bold text-purple-600">
                  ⭐ {Number(c.credits) || 0}
                </td>

                <td className="flex gap-2 justify-center flex-wrap p-2">

                  <button
                    onClick={() => setSelected(c)}
                    className="bg-gray-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => approveCoordinator(c.coordinatorId)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectCoordinator(c.coordinatorId)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => assignTask(c.coordinatorId)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Task
                  </button>

                  <button
                    onClick={() => addCredit(c.coordinatorId)}
                    className="bg-purple-500 text-white px-3 py-1 rounded"
                  >
                    Credit +
                  </button>

                  {c.status === "approved" && (
                    <button
                      onClick={() => toggleBlock(c.coordinatorId)}
                      className={`px-3 py-1 rounded text-white ${
                        c.blocked ? "bg-yellow-500" : "bg-black"
                      }`}
                    >
                      {c.blocked ? "Unblock" : "Block"}
                    </button>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {selected && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-2xl font-bold mb-4">
              Coordinator Profile
            </h2>

            <p><b>ID:</b> {selected.coordinatorId}</p>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Phone:</b> {selected.mobile}</p>
            <p><b>Qualification:</b> {selected.qualification}</p>
            <p><b>Experience:</b> {selected.experience}</p>
            <p><b>Task:</b> {selected.task || "None"}</p>

            {/* ✅ FIXED CREDIT */}
            <p><b>Credits:</b> ⭐ {Number(selected.credits) || 0}</p>

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