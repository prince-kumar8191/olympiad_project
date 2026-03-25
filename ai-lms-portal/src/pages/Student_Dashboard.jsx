// import React from "react";
// import { Link } from "react-router-dom";


// export default function StudentDashboard() {
//     return (
//         <div className="bg-gray-100 font-sans h-screen flex">

//             {/* SIDEBAR */}
//             <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

//                 <div className="p-6 text-2xl font-bold border-b border-indigo-400">
//                     Student Portal
//                 </div>

//                 <nav className="flex-1 p-4 space-y-2">

//                     <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
//                         🏠 Dashboard
//                     </a>

//                     <Link
//                         to="/StudentProfile"
//                         className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
//                     >
//                         👤 My Profile
//                     </Link>



//                     <Link 
//                         to="/ExamInstructions"                   
//                     className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//                         🧪 My Exams
//                     </Link>

//                     <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//                         📝 Mock Tests
//                     </a>

//                     <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//                         📚  PYQ
//                     </a>

//                     <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//                         📊 Results
//                     </a>

//                     <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//                         🏆 Certificates
//                     </a>

//                 </nav>
//             </div>

//             {/* MAIN AREA */}
//             <div className="flex-1 flex flex-col">

//                 {/* TOPBAR */}
//                 <div className="bg-white shadow p-4 flex justify-between items-center">

//                     <input
//                         type="text"
//                         placeholder="Search exams..."
//                         className="border px-4 py-2 rounded-lg w-72"
//                     />

//                     <div className="flex items-center gap-4">
//                         <button className="text-xl">🔔</button>

//                         <img
//                             src="https://i.pravatar.cc/40"
//                             alt="profile"
//                             className="rounded-full"
//                         />
//                     </div>

//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-8 overflow-y-auto">

//                     <h1 className="text-3xl font-bold mb-6 text-gray-700">
//                         Welcome Student
//                     </h1>

//                     {/* DASHBOARD CARDS */}
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

//                         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                             <p>Registered Exams</p>
//                             <h2 className="text-3xl font-bold mt-2">00</h2>
//                         </div>

//                         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                             <p>Mock Tests Completed</p>
//                             <h2 className="text-3xl font-bold mt-2">00</h2>
//                         </div>

//                         <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                             <p>Best Score</p>
//                             <h2 className="text-3xl font-bold mt-2">00%</h2>
//                         </div>

//                         <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow hover:scale-105 transition">
//                             <p>Certificates Earned</p>
//                             <h2 className="text-3xl font-bold mt-2">00</h2>
//                         </div>

//                     </div>


//                     {/* QUICK ACTIONS */}
//                     <div className="grid md:grid-cols-4 gap-6 mb-10">

//                         <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
//                             <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                                 Start Mock Test
//                             </h3>
//                             <p className="text-gray-500">Practice before exam</p>
//                         </button>

//                         <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
//                             <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                                 View Exams
//                             </h3>
//                             <p className="text-gray-500">Check upcoming exams</p>
//                         </button>

//                         <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
//                             <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                                 View Results
//                             </h3>
//                             <p className="text-gray-500">Check exam results</p>
//                         </button>

//                         <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
//                             <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                                 Download Certificate
//                             </h3>
//                             <p className="text-gray-500">Get your certificates</p>
//                         </button>

//                     </div>


//                     {/* EXAMS TABLE */}
//                     <div className="bg-white p-6 rounded-xl shadow">

//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-xl font-bold">Upcoming Exams</h3>
//                         </div>

//                         <table className="w-full">

//                             <thead className="border-b text-gray-500">

//                                 <tr>
//                                     <th className="text-left py-2">Exam</th>
//                                     <th className="text-left">Subject</th>
//                                     <th className="text-left">Date</th>
//                                     <th className="text-left">Action</th>
//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 <tr className="border-b hover:bg-gray-50">

//                                     <td className="py-3">Olympiad 2026</td>
//                                     <td>Mathematics</td>
//                                     <td>15 March 2026</td>

//                                     <td>
//                                         <button className="bg-indigo-600 text-white px-3 py-1 rounded">
//                                             Start
//                                         </button>
//                                     </td>

//                                 </tr>

//                                 <tr>

//                                     <td className="py-3">Olympiad 2026</td>
//                                     <td>Science</td>
//                                     <td>18 March 2026</td>

//                                     <td>
//                                         <button className="bg-gray-400 text-white px-3 py-1 rounded">
//                                             Locked
//                                         </button>
//                                     </td>

//                                 </tr>

//                             </tbody>

//                         </table>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }










import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {

    // Get student data safely from localStorage
    const studentData = JSON.parse(localStorage.getItem("student") || "{}");
    const name = studentData?.name || "Student";
     const StudentId = studentData?.StudentId || "StudentId";

    // Profile photo logic:
    // - If student uploaded photo → use it
    // - If not → generic default avatar
    const profilePhoto = studentData?.photo
        ? studentData.photo
        : "https://www.w3schools.com/howto/img_avatar.png"; // generic default avatar

    return (
        <div className="bg-gray-100 font-sans h-screen flex">

            {/* SIDEBAR */}
            <div className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">

                <div className="p-6 text-2xl font-bold border-b border-indigo-400">
                    Student Portal
                </div>

                <nav className="flex-1 p-4 space-y-2">

                    <a className="block p-3 rounded-lg bg-white text-indigo-700 font-semibold">
                        🏠 Dashboard
                    </a>

                    <Link
                        to="/StudentProfile"
                        className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
                    >
                        👤 My Profile
                    </Link>
                  

                  <Link
                        to="/ExamInstructions"
                        className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
                    >
                        🧪 My Exams
                    </Link>

                    

                    <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        📝 Mock Tests
                    </a>

                    <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        📚 PYQ
                    </a>

                      <Link
                        to="/register"
                        className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer"
                    >
                       🎯 Register Now 
                    </Link>


                    <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        📊 Results
                    </a>

                    <a className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        🏆 Certificates
                    </a>

                    <Link
                        to="/BenefitPay"
                        className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        Benefit and Pay
                    </Link>

                    <Link
                        to="/StudentRefer"
                        className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
                        Referral Points and Refer
                    </Link>

                    {/* LOGOUT BUTTON */}
                    <button
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                        className="flex items-center gap-3 p-4 hover:bg-red-500 rounded-lg mt-2"
                    >
                        Logout
                    </button>


                </nav>
            </div>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* TOPBAR */}
                <div className="bg-white shadow p-4 flex justify-between items-center">

                    <input
                        type="text"
                        placeholder="Search exams..."
                        className="border px-4 py-2 rounded-lg w-72"
                    />


                    <div className="flex items-center gap-4">
                        <button className="text-xl">🔔</button>


                        <div className="text-right">

                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-bold text-indigo-600">{StudentId}</p>
            </div>

                        {/* Profile Photo */}
                        <img
                            src={profilePhoto}
                            alt="profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                        />
                    </div>

                </div>

                {/* CONTENT */}
                <div className="p-8 overflow-y-auto">

                    {/* NAME SHOW HERE */}
                    <h1 className="text-3xl font-bold mb-6 text-gray-700">
                        Welcome {name}
                    </h1>

                    {/* DASHBOARD CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
                            <p>Registered Exams</p>
                            <h2 className="text-3xl font-bold mt-2">00</h2>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
                            <p>Mock Tests Completed</p>
                            <h2 className="text-3xl font-bold mt-2">00</h2>
                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
                            <p>Best Score</p>
                            <h2 className="text-3xl font-bold mt-2">00%</h2>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-xl shadow hover:scale-105 transition">
                            <p>Certificates Earned</p>
                            <h2 className="text-3xl font-bold mt-2">00</h2>
                        </div>

                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="grid md:grid-cols-4 gap-6 mb-10">

                        <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
                            
                            <Link
                             to="/Admitcard"
                            className="text-xl font-bold text-indigo-600 mb-2">
                                Admit Card 
                            </Link>
                            <p className="text-gray-500">Download Admit Card </p>
                        </button>

                        <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">
                                View Exams
                            </h3>
                            <p className="text-gray-500">Check upcoming exams</p>
                        </button>

                        <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">
                                View Results
                            </h3>
                            <p className="text-gray-500">Check exam results</p>
                        </button>

                        <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">
                                Download Certificate
                            </h3>
                            <p className="text-gray-500">Get your certificates</p>
                        </button>

                    </div>

                    {/* EXAMS TABLE */}
                    <div className="bg-white p-6 rounded-xl shadow">

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Upcoming Exams</h3>
                        </div>

                        <table className="w-full">

                            <thead className="border-b text-gray-500">

                                <tr>
                                    <th className="text-left py-2">Exam</th>
                                    <th className="text-left">Subject</th>
                                    <th className="text-left">Date</th>
                                    <th className="text-left">Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr className="border-b hover:bg-gray-50">

                                    <td className="py-3">Olympiad 2026</td>
                                    <td>Mathematics</td>
                                    <td>15 March 2026</td>

                                    <td>
                                        <button className="bg-indigo-600 text-white px-3 py-1 rounded">
                                            Start
                                        </button>
                                    </td>

                                </tr>

                                <tr>

                                    <td className="py-3">Olympiad 2026</td>
                                    <td>Science</td>
                                    <td>18 March 2026</td>

                                    <td>
                                        <button className="bg-gray-400 text-white px-3 py-1 rounded">
                                            Locked
                                        </button>
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}