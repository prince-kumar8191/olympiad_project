// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function VolunteerManagement() {

//   const [search, setSearch] = useState("");
//   const [volunteers, setVolunteers] = useState([]);
//   const [selected, setSelected] = useState(null);

//   // ================= FETCH =================
//   useEffect(() => {
//     fetchVolunteers();
//   }, []);

//   const fetchVolunteers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/volunteers");
//       console.log("VOL DATA:", res.data.data);
//       setVolunteers(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= APPROVE =================
//   const approveVolunteer = async (id) => {
//     await axios.put(
//       `http://localhost:5000/admin/volunteer-status/${id}`,
//       { status: "approved" }
//     );
//     fetchVolunteers();
//   };

//   // ================= REJECT =================
//   const rejectVolunteer = async (id) => {
//     await axios.put(
//       `http://localhost:5000/admin/volunteer-status/${id}`,
//       { status: "rejected" }
//     );
//     fetchVolunteers();
//   };

//   // ================= BLOCK =================
//   const toggleBlock = async (id) => {
//     await axios.put(`http://localhost:5000/admin/toggle-volunteer/${id}`);
//     fetchVolunteers();
//   };

//   // ================= ADD CREDIT =================
//   const addCredit = async (id) => {
//     const points = parseInt(prompt("Enter Credit Points"));
//     if (!points) return;

//     await axios.post("http://localhost:5000/admin/add-volunteer-credits", {
//       volunteerId: id,
//       credits: points
//     });

//     fetchVolunteers();
//   };

//   // ================= SEARCH =================
//   const filtered = volunteers.filter(v =>
//     v.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

//       <h1 className="text-3xl font-bold mb-8">
//         Volunteer Management Dashboard
//       </h1>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search Volunteer..."
//         className="w-full p-3 border rounded-lg mb-6 shadow"
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">

//         <table className="w-full text-center">

//           <thead className="bg-indigo-500 text-white">
//             <tr>
//               <th className="p-3">ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Credits</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filtered.map(v => (

//               <tr key={v.volunteerId} className="border-t hover:bg-gray-50">

//                 <td className="p-3">{v.volunteerId}</td>
//                 <td>{v.name}</td>
//                 <td>{v.email}</td>

//                 <td>
//                   {v.status === "approved" && (
//                     <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
//                       Approved
//                     </span>
//                   )}

//                   {v.status === "pending" && (
//                     <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
//                       Pending
//                     </span>
//                   )}

//                   {v.status === "rejected" && (
//                     <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
//                       Rejected
//                     </span>
//                   )}
//                 </td>

//                 {/* ✅ CREDIT FIX */}
//                 <td className="font-bold text-purple-600">
//                   ⭐ {Number(v.credits) || 0}
//                 </td>

//                 <td className="flex gap-2 justify-center flex-wrap p-2">

//                   <button
//                     onClick={() => setSelected(v)}
//                     className="bg-gray-700 text-white px-3 py-1 rounded"
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() => approveVolunteer(v.volunteerId)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => rejectVolunteer(v.volunteerId)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>

//                   <button
//                     onClick={() => addCredit(v.volunteerId)}
//                     className="bg-purple-500 text-white px-3 py-1 rounded"
//                   >
//                     Credit +
//                   </button>

//                   {v.status === "approved" && (
//                     <button
//                       onClick={() => toggleBlock(v.volunteerId)}
//                       className={`px-3 py-1 rounded text-white ${
//                         v.blocked ? "bg-yellow-500" : "bg-black"
//                       }`}
//                     >
//                       {v.blocked ? "Unblock" : "Block"}
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
//               Volunteer Profile
//             </h2>

//             <p><b>ID:</b> {selected.volunteerId}</p>
//             <p><b>Name:</b> {selected.name}</p>
//             <p><b>Email:</b> {selected.email}</p>
//             <p><b>Credits:</b> ⭐ {Number(selected.credits) || 0}</p>

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

export default function VolunteerManagement() {

    const [search, setSearch] = useState("");
    const [volunteers, setVolunteers] = useState([]);
    const [selected, setSelected] = useState(null);

    // ================= FETCH =================
    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/volunteers");
            console.log("VOL DATA:", res.data);
            setVolunteers(res.data.data || []);
        } catch (err) {
            console.error("FETCH ERROR:", err);
        }
    };

    // ================= APPROVE =================
    const approveVolunteer = async (id) => {
        await axios.put(
            `http://localhost:5000/admin/volunteer-status/${id}`,
            { status: "approved" }
        );
        fetchVolunteers();
    };

    // ================= REJECT =================
    const rejectVolunteer = async (id) => {
        await axios.put(
            `http://localhost:5000/admin/volunteer-status/${id}`,
            { status: "rejected" }
        );
        fetchVolunteers();
    };

    // ================= BLOCK / UNBLOCK =================
    const toggleBlock = async (id) => {
        await axios.put(
            `http://localhost:5000/admin/toggle-volunteer-block/${id}`
        );
        fetchVolunteers();
    };

    // ================= ADD CREDIT =================
    const addCredit = async (id) => {
        const points = parseInt(prompt("Enter Credit Points"));

        if (!points || points <= 0) {
            alert("Invalid points");
            return;
        }

        await axios.post("http://localhost:5000/admin/add-volunteer-credits", {
            volunteerId: id,
            credits: points
        });

        alert("Credits Added ✅");
        fetchVolunteers();
    };

    // ================= SEARCH =================
    const filtered = volunteers.filter(v =>
        v.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

            <h1 className="text-3xl font-bold mb-8">
                Volunteer Management Dashboard
            </h1>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search Volunteer..."
                className="w-full p-3 border rounded-lg mb-6 shadow"
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full text-center">

                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Credits</th>
                            <th>Actions</th>
                            <th>Task</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map(v => (
                            <tr key={v.volunteerId} className="border-t hover:bg-gray-50">

                                <td className="p-3">{v.volunteerId}</td>
                                <td>{v.name}</td>
                                <td>{v.email}</td>

                                {/* STATUS */}
                                <td>
                                    {v.status === "approved" && (
                                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                                            Approved
                                        </span>
                                    )}

                                    {v.status === "pending" && (
                                        <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm">
                                            Pending
                                        </span>
                                    )}

                                    {v.status === "rejected" && (
                                        <span className="bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm">
                                            Rejected
                                        </span>
                                    )}

                                    {v.status === "blocked" && (
                                        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                            Blocked
                                        </span>
                                    )}
                                </td>

                                {/* ✅ CREDITS */}

                                <td className="font-bold text-purple-600">
                                    ⭐ {v.credits || 0}
                                    {v.credits === 0 && (
                                        <span className="text-gray-400 text-xs ml-2">(No referrals)</span>
                                    )}
                                </td>

                                <td>{v.task || "No Task"}</td>
                                {/* ACTIONS */}
                                <td className="flex gap-2 justify-center flex-wrap p-2">

                                    <button
                                        onClick={() => setSelected(v)}
                                        className="bg-gray-700 text-white px-3 py-1 rounded"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => approveVolunteer(v.volunteerId)}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => rejectVolunteer(v.volunteerId)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => addCredit(v.volunteerId)}
                                        className="bg-purple-500 text-white px-3 py-1 rounded"
                                    >
                                        Credit +
                                    </button>

                                    <button
                                        onClick={async () => {
                                            const task = prompt("Enter Task");

                                            if (!task) return;

                                            await axios.post("http://localhost:5000/admin/assign-volunteer-task", {
                                                volunteerId: v.volunteerId,
                                                task: task
                                            });

                                            alert("Task Assigned ✅");
                                            fetchVolunteers();
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Assign Task
                                    </button>

                                    {v.status === "approved" || v.status === "blocked" ? (
                                        <button
                                            onClick={() => toggleBlock(v.volunteerId)}
                                            className={`px-3 py-1 rounded text-white ${v.status === "blocked"
                                                    ? "bg-yellow-500"
                                                    : "bg-black"
                                                }`}
                                        >
                                            {v.status === "blocked" ? "Unblock" : "Block"}
                                        </button>

                                    ) : null}

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
                            Volunteer Profile
                        </h2>

                        <p><b>ID:</b> {selected.volunteerId}</p>
                        <p><b>Name:</b> {selected.name}</p>
                        <p><b>Email:</b> {selected.email}</p>
                        <p><b>Status:</b> {selected.status}</p>
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