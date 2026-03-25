
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function OlympiadAdminDashboard() {
//   const [stats, setStats] = useState({
//     volunteers: 0,
//     coordinators: 0,
//     students: 0,
//     registrations: 0
//   });

//   const [volunteers, setVolunteers] = useState([]);
//   const [coordinators, setCoordinators] = useState([]);
//   const [schools, setSchools] = useState([]);

//   // 🔹 Fetch dashboard stats
//   const fetchStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/stats");
//       setStats(res.data);
//     } catch (err) {
//       console.log("Error fetching stats:", err);
//     }
//   };

//   // 🔹 Fetch volunteers
//   const fetchVolunteers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/volunteers");
//       setVolunteers(res.data);
//     } catch (err) {
//       console.log("Error fetching volunteers:", err);
//     }
//   };

//   // 🔹 Fetch coordinators
//   const fetchCoordinators = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/coordinators");
//       setCoordinators(res.data);
//     } catch (err) {
//       console.log("Error fetching coordinators:", err);
//     }
//   };

//   // 🔹 Fetch schools
//   const fetchSchools = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/schools");
//       setSchools(res.data);
//     } catch (err) {
//       console.log("Error fetching schools:", err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchVolunteers();
//     fetchCoordinators();
//     fetchSchools();
//   }, []);

//   // 🔹 Toggle status (block/unblock)
//   const toggleStatus = async (type, id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "active" ? "blocked" : "active";
//       await axios.put(
//         `http://localhost:5000/admin/${type}-status/${id}`,
//         { status: newStatus }
//       );

//       if (type === "volunteer") fetchVolunteers();
//       if (type === "coordinator") fetchCoordinators();
//       if (type === "school") fetchSchools();
//     } catch (err) {
//       console.log("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="bg-gray-100 font-sans">
//       <div className="flex h-screen">

//         {/* SIDEBAR */}
//         <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">
//           <div className="p-6 text-2xl font-bold border-b border-indigo-400">
//             Admin Portal
//           </div>
//           <nav className="flex-1 p-4 space-y-2">
//             <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
//               Dashboard
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Students
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Schools
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Coordinator
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Volunteer
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Question Bank
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Exams
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Results
//             </a>
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Logout
//             </a>
//           </nav>
//         </div>

//         {/* MAIN AREA */}
//         <div className="flex-1 flex flex-col">

//           {/* TOPBAR */}
//           <div className="bg-white shadow p-4 flex justify-between items-center">
//             <input
//               type="text"
//               placeholder="Search students, schools..."
//               className="border px-4 py-2 rounded-lg w-72"
//             />
//             <div className="flex items-center gap-4">
//               <button className="text-xl">🔔</button>
//               <img
//                 src="https://i.pravatar.cc/40"
//                 alt="profile"
//                 className="rounded-full"
//               />
//             </div>
//           </div>

//           {/* CONTENT */}
//           <div className="p-8 overflow-y-auto">
//             <h1 className="text-3xl font-bold mb-6 text-gray-700">
//               Dashboard Overview
//             </h1>

//             {/* DASHBOARD CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//               <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                 <p>Total Students</p>
//                 <h2 className="text-3xl font-bold mt-2">{stats.students}</h2>
//               </div>
//               <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                 <p>Registered Schools</p>
//                 <h2 className="text-3xl font-bold mt-2">{stats.registrations}</h2>
//               </div>
//               <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                 <p>Total Volunteers</p>
//                 <h2 className="text-3xl font-bold mt-2">{stats.volunteers}</h2>
//               </div>
//               <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                 <p>Total Coordinators</p>
//                 <h2 className="text-3xl font-bold mt-2">{stats.coordinators}</h2>
//               </div>
//             </div>

//             {/* VOLUNTEER TABLE */}
//             <div className="bg-white p-6 rounded-xl shadow mb-8">
//               <h3 className="text-xl font-bold mb-4">Volunteers</h3>
//               <table className="w-full">
//                 <thead className="border-b text-gray-500">
//                   <tr>
//                     <th className="text-left py-2">Name</th>
//                     <th className="text-left">Email</th>
//                     <th className="text-left">Status</th>
//                     <th className="text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {volunteers.map(v => (
//                     <tr key={v.volunteerId} className="border-b hover:bg-gray-50">
//                       <td className="py-3">{v.name}</td>
//                       <td>{v.email}</td>
//                       <td className={v.status === "active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
//                         {v.status}
//                       </td>
//                       <td>
//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//                           onClick={() => toggleStatus("volunteer", v.volunteerId, v.status)}
//                         >
//                           {v.status === "active" ? "Block" : "Unblock"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* COORDINATOR TABLE */}
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h3 className="text-xl font-bold mb-4">Coordinators</h3>
//               <table className="w-full">
//                 <thead className="border-b text-gray-500">
//                   <tr>
//                     <th className="text-left py-2">Name</th>
//                     <th className="text-left">Email</th>
//                     <th className="text-left">Status</th>
//                     <th className="text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {coordinators.map(c => (
//                     <tr key={c.coordinatorId} className="border-b hover:bg-gray-50">
//                       <td className="py-3">{c.name}</td>
//                       <td>{c.email}</td>
//                       <td className={c.status === "active" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
//                         {c.status}
//                       </td>
//                       <td>
//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//                           onClick={() => toggleStatus("coordinator", c.coordinatorId, c.status)}
//                         >
//                           {c.status === "active" ? "Block" : "Unblock"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* SCHOOL TABLE */}
//             <div className="bg-white p-6 rounded-xl shadow mt-8">
//               <h3 className="text-xl font-bold mb-4">Schools</h3>

//               <table className="w-full">
//                 <thead className="border-b text-gray-500">
//                   <tr>
//                     <th className="text-left py-2">School Name</th>
//                     <th className="text-left">Email</th>
//                     <th className="text-left">Phone</th>
//                     <th className="text-left">Status</th>
//                     <th className="text-left">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {schools.map(s => (
//                     <tr key={s.schoolId} className="border-b hover:bg-gray-50">
//                       <td className="py-3">{s.name}</td>
//                       <td>{s.email}</td>
//                       <td>{s.phone}</td>

//                       <td className={s.status === "active"
//                         ? "text-green-600 font-semibold"
//                         : "text-red-600 font-semibold"}>
//                         {s.status}
//                       </td>

//                       <td>
//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
//                           onClick={() => toggleStatus("school", s.schoolId, s.status)}
//                         >
//                           {s.status === "active" ? "Block" : "Unblock"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function OlympiadAdminDashboard() {

//   const [stats, setStats] = useState({
//     volunteers: 0,
//     coordinators: 0,
//     students: 0,
//     registrations: 0
//   });

//   const [volunteers, setVolunteers] = useState([]);
//   const [coordinators, setCoordinators] = useState([]);
//   const [schools, setSchools] = useState([]);
//   const [search, setSearch] = useState("");
//   const [students, setStudents] = useState([]);

//   // Fetch dashboard stats
//   const fetchStats = async () => {
//     const res = await axios.get("http://localhost:5000/admin/stats");
//     setStats(res.data);
//   };

//   // Fetch volunteers
//   const fetchVolunteers = async () => {
//     const res = await axios.get("http://localhost:5000/admin/volunteers");
//     setVolunteers(res.data);
//   };

//   // Fetch coordinators
//   const fetchCoordinators = async () => {
//     const res = await axios.get("http://localhost:5000/admin/coordinators");
//     setCoordinators(res.data);
//   };

//   // Fetch schools
//   const fetchSchools = async () => {
//     const res = await axios.get("http://localhost:5000/admin/schools");
//     setSchools(res.data);
//   };

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/admin/students");
//       setStudents(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     fetchVolunteers();
//     fetchCoordinators();
//     fetchSchools();
//     fetchStudents();
//   }, []);

//   // Block / Unblock
//   const toggleStatus = async (type, id, currentStatus) => {

//     const newStatus = currentStatus === "active" ? "blocked" : "active";

//     await axios.put(
//       `http://localhost:5000/admin/${type}-status/${id}`,
//       { status: newStatus }
//     );

//     if (type === "volunteer") fetchVolunteers();
//     if (type === "coordinator") fetchCoordinators();
//     if (type === "school") fetchSchools();
//   };

//   // SEARCH FILTER
//   const filteredVolunteers = volunteers.filter(v =>
//     v.name?.toLowerCase().includes(search.toLowerCase()) ||
//     v.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredCoordinators = coordinators.filter(c =>
//     c.name?.toLowerCase().includes(search.toLowerCase()) ||
//     c.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredSchools = schools.filter(s =>
//     s.name?.toLowerCase().includes(search.toLowerCase()) ||
//     s.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (

//     <div className="bg-gray-100 font-sans">

//       <div className="flex h-screen">

//         {/* SIDEBAR */}
//         <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

//           <div className="p-6 text-2xl font-bold border-b border-indigo-400">
//             Admin Portal
//           </div>

//           <nav className="flex-1 p-4 space-y-2">

//             <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
//               Dashboard
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Students
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Schools
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Coordinator
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Volunteer
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Question Bank
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Exams
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Results
//             </a>

//             <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//               Logout
//             </a>

//           </nav>

//         </div>

//         {/* MAIN */}

//         <div className="flex-1 flex flex-col">

//           {/* TOPBAR */}

//           <div className="bg-white shadow p-4 flex justify-between items-center">

//             <input
//               type="text"
//               placeholder="Search volunteers, coordinators, schools..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border px-4 py-2 rounded-lg w-72"
//             />

//             <img
//               src="https://i.pravatar.cc/40"
//               alt="profile"
//               className="rounded-full"
//             />

//           </div>

//           {/* CONTENT */}

//           <div className="p-8 overflow-y-auto">

//             <h1 className="text-3xl font-bold mb-6 text-gray-700">
//               Dashboard Overview
//             </h1>

//             {/* STATS */}

//             <div className="grid grid-cols-4 gap-6 mb-8">

//               <div className="bg-indigo-500 text-white p-6 rounded-xl">
//                 <p>Total Students</p>
//                 <h2 className="text-3xl font-bold">{stats.students}</h2>
//               </div>

//               <div className="bg-blue-500 text-white p-6 rounded-xl">
//                 <p>Schools</p>
//                 <h2 className="text-3xl font-bold">{stats.registrations}</h2>
//               </div>

//               <div className="bg-green-500 text-white p-6 rounded-xl">
//                 <p>Volunteers</p>
//                 <h2 className="text-3xl font-bold">{stats.volunteers}</h2>
//               </div>

//               <div className="bg-pink-500 text-white p-6 rounded-xl">
//                 <p>Coordinators</p>
//                 <h2 className="text-3xl font-bold">{stats.coordinators}</h2>
//               </div>

//             </div>

//             {/* VOLUNTEERS */}

//             <div className="bg-white p-6 rounded-xl shadow mb-8">

//               <h3 className="text-xl font-bold mb-4">Volunteers</h3>

//               <table className="w-full table-fixed border-collapse">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-2">Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredVolunteers.map(v => (

//                     <tr key={v.volunteerId} className="border-b">

//                       <td className="py-2">{v.name}</td>
//                       <td>{v.email}</td>
//                       <td>{v.status}</td>

//                       <td>

//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded"
//                           onClick={() => toggleStatus("volunteer", v.volunteerId, v.status)}
//                         >
//                           {v.status === "active" ? "Block" : "Unblock"}
//                         </button>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//             {/* COORDINATORS */}

//             <div className="bg-white p-6 rounded-xl shadow mb-8">

//               <h3 className="text-xl font-bold mb-4">Coordinators</h3>

//               <table className="w-full table-fixed border-collapse">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-2">Name</th>
//                     <th>Email</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredCoordinators.map(c => (

//                     <tr key={c.coordinatorId} className="border-b">

//                       <td className="py-2">{c.name}</td>
//                       <td>{c.email}</td>
//                       <td>{c.status}</td>

//                       <td>

//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded"
//                           onClick={() => toggleStatus("coordinator", c.coordinatorId, c.status)}
//                         >
//                           {c.status === "active" ? "Block" : "Unblock"}
//                         </button>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//             {/* SCHOOLS */}

//             <div className="bg-white p-6 rounded-xl shadow">

//               <h3 className="text-xl font-bold mb-4">Schools</h3>

//               <table className="w-full table-fixed border-collapse">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-2">School</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredSchools.map(s => (

//                     <tr key={s.schoolId} className="border-b">

//                       <td className="py-2">{s.name}</td>
//                       <td>{s.email}</td>
//                       <td>{s.phone}</td>
//                       <td>{s.status}</td>

//                       <td>

//                         <button
//                           className="bg-indigo-600 text-white px-3 py-1 rounded"
//                           onClick={() => toggleStatus("school", s.schoolId, s.status)}
//                         >
//                           {s.status === "active" ? "Block" : "Unblock"}
//                         </button>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//             {/* STUDENTS TABLE */}

//             <div className="bg-white p-6 rounded-xl shadow mt-8">

//               <h3 className="text-xl font-bold mb-4">Students</h3>

//               <table className="w-full table-fixed border-collapse">

//                 <thead className="border-b text-gray-500">

//                   <tr>
//                     <th className="text-left py-2">Name</th>
//                     <th>Class</th>
//                     <th>School</th>
//                     <th>Email</th>
//                   </tr>

//                 </thead>

//                 <tbody>

//                   {students.map(s => (

//                     <tr key={s.studentId} className="border-b hover:bg-gray-50">

//                       <td className="py-3">{s.name}</td>
//                       <td>{s.class}</td>
//                       <td>{s.school}</td>
//                       <td>{s.email}</td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }










// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function OlympiadAdminDashboard() {

//   const [stats, setStats] = useState({
//     volunteers: 0,
//     coordinators: 0,
//     students: 0,
//     registrations: 0
//   });

//   const [volunteers, setVolunteers] = useState([]);
//   const [coordinators, setCoordinators] = useState([]);
//   const [pendingCoordinators, setPendingCoordinators] = useState([]);
//   const [pendingVolunteers, setPendingVolunteers] = useState([]);
//   const [schools, setSchools] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");

//   // Fetch dashboard stats
//   const fetchStats = async () => {
//     const res = await axios.get("http://localhost:5000/admin/stats");
//     setStats(res.data);
//   };

//   const fetchVolunteers = async () => {
//     const res = await axios.get("http://localhost:5000/admin/volunteers");
//     setVolunteers(res.data);
//   };

//   const fetchPendingVolunteers = async () => {
//     const res = await axios.get("http://localhost:5000/admin/pending-volunteers");
//     setPendingVolunteers(res.data);
//   };

//   const fetchCoordinators = async () => {
//     const res = await axios.get("http://localhost:5000/admin/coordinators");
//     setCoordinators(res.data);
//   };

//   const fetchPendingCoordinators = async () => {
//     const res = await axios.get("http://localhost:5000/admin/pending-coordinators");
//     setPendingCoordinators(res.data);
//   };

//   const fetchSchools = async () => {
//     const res = await axios.get("http://localhost:5000/admin/schools");
//     setSchools(res.data);
//   };

//   const fetchStudents = async () => {
//     const res = await axios.get("http://localhost:5000/admin/students");
//     console.log(res.data);
//     setStudents(res.data);

//   };

//   useEffect(() => {
//     fetchStats();
//     fetchVolunteers();
//     fetch
//     fetchCoordinators();
//     fetchPendingCoordinators();
//     fetchPendingVolunteers();
//     fetchSchools();
//     fetchStudents();
//   }, []);

//   // APPROVE / REJECT COORDINATOR

//   const approveCoordinator = async (id) => {

//     await axios.put(
//       `http://localhost:5000/admin/coordinator-status/${id}`,
//       { status: "active" }
//     );

//     alert("Coordinator Approved");

//     fetchPendingCoordinators();
//     fetchCoordinators();
//   };

//   // APPROVE / REJECT VOLUNTEER

//   const approveVolunteer = async (id) => {

//     await axios.put(
//       `http://localhost:5000/admin/volunteer-status/${id}`,
//       { status: "active" }
//     );

//     alert("Volunteer Approved");

//     fetchPendingVolunteers();
//     fetchVolunteers();
//   };

//   // BLOCK / UNBLOCK
//   const toggleStatus = async (type, id, currentStatus) => {

//     const newStatus = currentStatus === "active" ? "blocked" : "active";

//     await axios.put(
//       `http://localhost:5000/admin/${type}-status/${id}`,
//       { status: newStatus }
//     );

//     if (type === "volunteer") fetchVolunteers();
//     if (type === "coordinator") fetchCoordinators();
//     if (type === "school") fetchSchools();
//   };

//   // SEARCH FILTERS

//   const filteredVolunteers = volunteers.filter(v =>
//     v.name?.toLowerCase().includes(search.toLowerCase()) ||
//     v.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredCoordinators = coordinators.filter(c =>
//     c.name?.toLowerCase().includes(search.toLowerCase()) ||
//     c.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredSchools = schools.filter(s =>
//     s.name?.toLowerCase().includes(search.toLowerCase()) ||
//     s.school_name?.toLowerCase().includes(search.toLowerCase()) ||
//     s.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredStudents = students.filter(s =>
//     s.name?.toLowerCase().includes(search.toLowerCase()) ||
//     s.email?.toLowerCase().includes(search.toLowerCase()) ||
//     s.school?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (

//     <div className="bg-gray-100 font-sans">

//       <div className="flex h-screen">

//         {/* SIDEBAR */}
//         <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

//           <div className="p-6 text-2xl font-bold border-b border-indigo-400">
//             Admin Portal
//           </div>

//           <nav className="flex-1 p-4 space-y-2">

//             <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
//               Dashboard
//             </a>

            // <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            //   Students
            // </a>

//            <Link to="/SchoolManagement">
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
//               Schools
//             </a>
//             </Link>

           
//            <Link to="/CoordinatorManagement"> 
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
//               Coordinator
//             </a>
//             </Link>


//           <Link to="/VolunteerManagement">    
//             <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
//               Volunteer
//             </a>
//             </Link>

            // <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            //   Question Bank
            // </a>

            // <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            //   Exams
            // </a>

            // <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            //   Results
            // </a>

            // <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
            //   Logout
            // </a>

//           </nav>

//         </div>

//         {/* MAIN */}

//         <div className="flex-1 flex flex-col">

//           {/* TOPBAR */}

//           <div className="bg-white shadow p-4 flex justify-between items-center">

//             <input
//               type="text"
//               placeholder="Search volunteers, coordinators, schools..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border px-4 py-2 rounded-lg w-72"
//             />

//             <img
//               src="https://i.pravatar.cc/40"
//               alt="profile"
//               className="rounded-full"
//             />

//           </div>

//           {/* CONTENT */}

//           <div className="p-8 overflow-y-auto">

//             <h1 className="text-3xl font-bold mb-6 text-gray-700">
//               Dashboard Overview
//             </h1>

//             {/* STATS */}

//             <div className="grid grid-cols-4 gap-6 mb-8">

//               <div className="bg-green-400 text-white p-6 rounded-xl">
//                 <p>Total Students</p>
//                 <h2 className="text-3xl font-bold">{stats.students}</h2>
//               </div>

//               <div className="bg-purple-400 text-white p-6 rounded-xl">
//                 <p>Schools</p>
//                 <h2 className="text-3xl font-bold">{stats.registrations}</h2>
//               </div>

//               <div className="bg-blue-400 text-white p-6 rounded-xl">
//                 <p>Volunteers</p>
//                 <h2 className="text-3xl font-bold">{stats.volunteers}</h2>
//               </div>

//               <div className="bg-cyan-400 text-white p-6 rounded-xl">
//                 <p>Coordinators</p>
//                 <h2 className="text-3xl font-bold">{stats.coordinators}</h2>
//               </div>

//             </div>

//             {/* VOLUNTEERS */}



//             <div className="bg-white p-6 rounded-xl shadow mb-8">

//               <h3 className="text-xl font-bold mb-4">Volunteers</h3>

//               <table className="w-full border-collapse">

//                 <thead>
//                   <tr className="border-b bg-gray-50">
//                     <th className="text-left py-3 px-2">Name</th>
//                     <th className="text-left py-3 px-18">Email</th>
//                     <th className="text-left py-3 px-5">Status</th>
//                     <th className="text-right py-3 px-4">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredVolunteers.map(v => (

//                     <tr key={v.volunteerId} className="border-b hover:bg-gray-50">

//                       <td className="py-3 px-4">{v.name}</td>
//                       <td className="py-3 px-4">{v.email}</td>
//                       <td className="py-3 px-4">{v.status}</td>

//                       <td className="text-right py-3 px-5">

//                         {v.status === "pending" ? (

//                           <button
//                             className="bg-green-500 text-white px-3 py-1 rounded"
//                             onClick={() => approveVolunteer(v.volunteerId)}
//                           >
//                             Approve
//                           </button>

//                         ) : (

//                           <button
//                             className="bg-blue-400 text-white px-3 py-1 rounded"
//                             onClick={() => toggleStatus("volunteer", v.volunteerId, v.status)}
//                           >
//                             {v.status === "active" ? "Block" : "Unblock"}
//                           </button>

//                         )}

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>


//             {/* COORDINATORS */}

//             <div className="bg-white p-6 rounded-xl shadow mb-8">

//               <h3 className="text-xl font-bold mb-4">Coordinators</h3>

//               <table className="w-full  border-collapse">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-3 px-2">Name</th>
//                     <th className="text-left py-3 px-3">Email</th>
//                     <th className="text-left py-3 px-7">Status</th>
//                     <th className="text-right py-3 px-2">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredCoordinators.map(c => (

//                     <tr key={c.coordinatorId} className="border-b hover:bg-gray-50">

//                       <td className="py-3 px-2">{c.name}</td>
//                       <td className="py-3 px-2">{c.email}</td>
//                       <td className="py-3 px-7">{c.status}</td>

//                       <td className="py-3 px-5 text-right">

//                         {c.status === "pending" ? (

//                           <button
//                             className="bg-green-500 text-white px-3 py-1 rounded"
//                             onClick={() => approveCoordinator(c.coordinatorId)}
//                           >
//                             Approve
//                           </button>

//                         ) : (

//                           <button
//                             className="bg-cyan-400 text-white px-3 py-1 rounded"
//                             onClick={() => toggleStatus("coordinator", c.coordinatorId, c.status)}
//                           >
//                             {c.status === "active" ? "Block" : "Unblock"}
//                           </button>

//                         )}

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>



//             {/* SCHOOLS */}

//             <div className="bg-white p-6 rounded-xl shadow">

//               <h3 className="text-xl font-bold mb-4">Schools</h3>

//               <table className="w-full  border-collapse">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-3 px-2">School</th>
//                     <th className="text-left py-3 px-40">Email</th>
//                     <th className="text-left py-3 px-14">Status</th>
//                     <th className="text-right py-3 px-2">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   {filteredSchools.map(s => (

//                     <tr key={s.schoolId} className="border-b hover:bg-gray-50">

//                       <td className="py-3 px-6">{s.school_name || s.name}</td>
//                       <td className="text-left py-3 px-27">{s.email}</td>
//                       <td className="py-4 px-15">{s.status}</td>

//                       <td className="py-3 px-6 text-right">

//                         <button
//                           className="bg-purple-400 text-white px-3 py-1 rounded"
//                           onClick={() => toggleStatus("school", s.schoolId, s.status)}
//                         >
//                           {s.status === "active" ? "Block" : "Unblock"}
//                         </button>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//             {/* STUDENTS */}

//             <div className="bg-white p-6 rounded-xl shadow mt-8">

//               <h3 className="text-xl font-bold mb-4">Students</h3>

//               <table className="w-full table-fixed border-collapse">

//                 <thead className="border-b">

//                   <tr>
//                     <th className="text-left py-3 px-4">Name</th>
//                     <th className="py-3 px-4">Class</th>
//                     <th className="py-3 px-4">School</th>
//                     <th className="py-3 px-7 text-right">Email</th>
//                   </tr>

//                 </thead>

//                 <tbody>

//                   {filteredStudents.map(s => (

//                     <tr key={s.studentId} className="border-b hover:bg-gray-50">

//                       <td className="py-3 px-4">{s.name}</td>
//                       <td className="py-3 px-4">{s.class || s.student_class}</td>
//                       <td className="py-3 px-4">{s.school || s.schoolname}</td>
//                       <td className="py-3 px-4 text-right">{s.email}</td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }





























import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OlympiadAdminDashboard() {

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

  // ================= FETCH =================

  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/admin/stats");
    setStats(res.data);
  };

  const fetchVolunteers = async () => {
    const res = await axios.get("http://localhost:5000/admin/volunteers");
    setVolunteers(res.data.data || []);
  };

  const fetchCoordinators = async () => {
    const res = await axios.get("http://localhost:5000/admin/coordinators");
    setCoordinators(res.data.data || []);
  };

  const fetchSchools = async () => {
    const res = await axios.get("http://localhost:5000/admin/schools");
    setSchools(res.data.data || []);
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/admin/students");
    setStudents(res.data.data || []);
  };

  useEffect(() => {
    fetchStats();
    fetchVolunteers();
    fetchCoordinators();
    fetchSchools();
    fetchStudents();
  }, []);

  // ================= ACTIONS =================

  const approveCoordinator = async (id) => {
    await axios.put(
      `http://localhost:5000/admin/coordinator-status/${id}`,
      { status: "active" }
    );
    fetchCoordinators();
  };

  const approveVolunteer = async (id) => {
    await axios.put(
      `http://localhost:5000/admin/volunteer-status/${id}`,
      { status: "active" }
    );
    fetchVolunteers();
  };

  const toggleStatus = async (type, id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";

    await axios.put(
      `http://localhost:5000/admin/${type}-status/${id}`,
      { status: newStatus }
    );

    if (type === "volunteer") fetchVolunteers();
    if (type === "coordinator") fetchCoordinators();
    if (type === "school") fetchSchools();
  };

  // ================= SEARCH =================

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

    <div className="bg-gray-100 font-sans">

      <div className="flex h-screen">

        {/* SIDEBAR */}
        <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

          <div className="p-6 text-2xl font-bold border-b border-indigo-400">
            Admin Portal
          </div>

          <nav className="flex-1 p-4 space-y-2">

            <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
              Dashboard
            </a>

            <Link to="/SchoolManagement" className="block p-3 rounded-lg hover:bg-indigo-600">
              Schools
            </Link>

            <Link to="/CoordinatorManagement" className="block p-3 rounded-lg hover:bg-indigo-600">
              Coordinator
            </Link>

            <Link to="/VolunteerManagement" className="block p-3 rounded-lg hover:bg-indigo-600">
              Volunteer
            </Link>

               <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
              Students
            </a>

            <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
              Question Bank
            </a>

            <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
              Exams
            </a>

            <Link to="/Uploadfile" className="block p-3 rounded-lg hover:bg-indigo-600">
              Question Upload
            </Link>

            <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
              Results
            </a>

            <a className="block p-3 rounded-lg hover:bg-indigo-600 cursor-pointer">
              Logout
            </a>



          </nav>

        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* TOPBAR */}
          <div className="bg-white shadow p-4 flex justify-between items-center">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-72"
            />

            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full"
            />

          </div>

          {/* CONTENT */}
          <div className="p-8 overflow-y-auto">

            <h1 className="text-3xl font-bold mb-6 text-gray-700">
              Dashboard Overview
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-6 mb-8">

              <div className="bg-green-400 text-white p-6 rounded-xl">
                <p>Total Students</p>
                <h2 className="text-3xl font-bold">{stats.students}</h2>
              </div>

              <div className="bg-purple-400 text-white p-6 rounded-xl">
                <p>Schools</p>
                <h2 className="text-3xl font-bold">{stats.registrations}</h2>
              </div>

              <div className="bg-blue-400 text-white p-6 rounded-xl">
                <p>Volunteers</p>
                <h2 className="text-3xl font-bold">{stats.volunteers}</h2>
              </div>

              <div className="bg-cyan-400 text-white p-6 rounded-xl">
                <p>Coordinators</p>
                <h2 className="text-3xl font-bold">{stats.coordinators}</h2>
              </div>

            </div>

            {/* VOLUNTEERS */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h3 className="text-xl font-bold mb-4">Volunteers</h3>

              {filteredVolunteers.map(v => (
                <div key={v.volunteerId} className="flex justify-between border-b py-2">
                  <span>{v.name} - {v.email}</span>

                  {v.status === "pending" ? (
                    <button onClick={() => approveVolunteer(v.volunteerId)} className="bg-green-500 text-white px-2 py-1 rounded">
                      Approve
                    </button>
                  ) : (
                    <button onClick={() => toggleStatus("volunteer", v.volunteerId, v.status)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      {v.status === "active" ? "Block" : "Unblock"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* COORDINATORS */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h3 className="text-xl font-bold mb-4">Coordinators</h3>

              {filteredCoordinators.map(c => (
                <div key={c.coordinatorId} className="flex justify-between border-b py-2">
                  <span>{c.name} - {c.email}</span>

                  {c.status === "pending" ? (
                    <button onClick={() => approveCoordinator(c.coordinatorId)} className="bg-green-500 text-white px-2 py-1 rounded">
                      Approve
                    </button>
                  ) : (
                    <button onClick={() => toggleStatus("coordinator", c.coordinatorId, c.status)} className="bg-cyan-500 text-white px-2 py-1 rounded">
                      {c.status === "active" ? "Block" : "Unblock"}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* STUDENTS */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-4">Students</h3>

              {filteredStudents.map(s => (
                <div key={s.studentId} className="border-b py-2">
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