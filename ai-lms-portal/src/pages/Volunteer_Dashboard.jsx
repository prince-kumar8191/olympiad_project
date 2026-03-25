
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function VolunteerDashboard() {

//   const [volunteerID, setVolunteerID] = useState("");
//   const [profile, setProfile] = useState({});

//   useEffect(() => {

//     const email = localStorage.getItem("volunteerEmail");

//     if (email) {

//       axios
//         .get(`http://localhost:5000/volunteer/profile/${email}`)
//         .then((res) => {

//           const data = res.data;

//           setVolunteerID(data.volunteerId);

//         })
//         .catch((err) => console.log(err));

//     }

//   }, []);

//   return (

//     <div className="flex min-h-screen bg-gray-100 font-sans">

//       {/* SIDEBAR */}

//       <div className="w-64 bg-indigo-700 text-white p-6">

//         <h2 className="text-2xl font-bold mb-8">Volunteer</h2>

//         <ul className="space-y-4">

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Dashboard
//           </li>

//           <Link
//             to="/Volunteer_Profile"
//             className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//             Profile
//           </Link>

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Student Verification
//           </li>

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Attendance Monitoring
//           </li>

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Results Support
//           </li>

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Report Issue
//           </li>

//           <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//             Tasks
//           </li>

//           <Link
//             to="/VolunteerRefer"
//             className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
//             Refer & Earn
//           </Link>

//           <li
//             onClick={() => {
//               localStorage.removeItem("VolunteerEmail");
//               window.location.href = "/Volunteer_Login";
//             }}
//             className="hover:bg-red-500 p-2 rounded cursor-pointer">
//             Logout
//           </li>

//         </ul>

//       </div>


//       {/* MAIN CONTENT */}

//       <div className="flex-1 flex flex-col">


//         {/* TOPBAR */}

//         <div className="bg-white shadow p-4 flex justify-between items-center">

//           <h1 className="text-xl font-bold text-gray-700">
//             Welcome {profile.name}
//           </h1>

//           <div className="flex items-center gap-6">

//             <span className="font-semibold text-gray-600">
//               Volunteer ID :
//               <span className="text-indigo-600 ml-1">{volunteerID}</span>
//             </span>

//             <button className="text-xl">🔔</button>

//             <img
//               src="https://i.pravatar.cc/40"
//               className="rounded-full"
//               alt="profile"
//             />

//           </div>

//         </div>


//         {/* CONTENT */}

//         <div className="p-8">


//           {/* CARDS */}

//           <div className="grid md:grid-cols-4 gap-6 mb-10">

//             <div className="bg-white shadow rounded-xl p-6 text-center">
//               <h3 className="text-gray-500">Assigned Tasks</h3>
//               <p className="text-3xl font-bold text-indigo-600">03</p>
//             </div>

//             <div className="bg-white shadow rounded-xl p-6 text-center">
//               <h3 className="text-gray-500">Students Verified</h3>
//               <p className="text-3xl font-bold text-indigo-600">45</p>
//             </div>

//             <div className="bg-white shadow rounded-xl p-6 text-center">
//               <h3 className="text-gray-500">Attendance Marked</h3>
//               <p className="text-3xl font-bold text-indigo-600">40</p>
//             </div>

//             <div className="bg-white shadow rounded-xl p-6 text-center">
//               <h3 className="text-gray-500">Issues Reported</h3>
//               <p className="text-3xl font-bold text-red-500">02</p>
//             </div>

//           </div>


//           {/* QUICK ACTIONS */}

//           <div className="grid md:grid-cols-4 gap-6 mb-10">

//             <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

//               <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                 Start Exam Monitoring
//               </h3>

//               <p className="text-gray-500">
//                 Monitor ongoing exam
//               </p>

//             </button>


//             <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

//               <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                 Verify Students
//               </h3>

//               <p className="text-gray-500">
//                 Verify student identity
//               </p>

//             </button>


//             <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

//               <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                 Mark Attendance
//               </h3>

//               <p className="text-gray-500">
//                 Record exam attendance
//               </p>

//             </button>


//             <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

//               <h3 className="text-xl font-bold text-indigo-600 mb-2">
//                 Report Issue
//               </h3>

//               <p className="text-gray-500">
//                 Submit problem report
//               </p>

//             </button>

//           </div>


//           {/* STUDENT TABLE */}

//           <div className="bg-white shadow rounded-xl p-6">

//             <h2 className="text-xl font-semibold mb-4">
//               Exam Students List
//             </h2>

//             <table className="w-full text-left">

//               <thead>
//                 <tr className="border-b">
//                   <th className="p-2">Student Name</th>
//                   <th className="p-2">Class</th>
//                   <th className="p-2">Exam</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 <tr className="border-b">
//                   <td className="p-2">Rahul Sharma</td>
//                   <td className="p-2">10</td>
//                   <td className="p-2">Math Olympiad</td>
//                   <td className="p-2 text-green-600">Present</td>
//                 </tr>

//                 <tr className="border-b">
//                   <td className="p-2">Priya Verma</td>
//                   <td className="p-2">9</td>
//                   <td className="p-2">Science Olympiad</td>
//                   <td className="p-2 text-green-600">Present</td>
//                 </tr>

//                 <tr className="border-b">
//                   <td className="p-2">Aman Singh</td>
//                   <td className="p-2">8</td>
//                   <td className="p-2">Math Olympiad</td>
//                   <td className="p-2 text-red-500">Absent</td>
//                 </tr>

//                 <tr>
//                   <td className="p-2">Neha Gupta</td>
//                   <td className="p-2">7</td>
//                   <td className="p-2">Science Olympiad</td>
//                   <td className="p-2 text-green-600">Present</td>
//                 </tr>

//               </tbody>

//             </table>

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// }















import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function VolunteerDashboard() {

  const [volunteerID, setVolunteerID] = useState("");
  const [profile, setProfile] = useState({});

  const email = localStorage.getItem("volunteerEmail");

  // ✅ LOCAL DATA GET
  const getLocalData = () => {
    try {
      return JSON.parse(localStorage.getItem(`volunteer_${email}`)) || {};
    } catch {
      return {};
    }
  };

  useEffect(() => {

    console.log("Email:", email);

    if (!email) return;

    // ✅ STEP 1: LOCAL LOAD (FAST + IMAGE SAFE)
    const localData = getLocalData();

    if (Object.keys(localData).length > 0) {
      setProfile(localData);
      setVolunteerID(localData.volunteerId);
    }

    // ✅ STEP 2: API CALL (MERGE FIX)
    axios
      .get(`http://localhost:5000/volunteer/profile/${email}`)
      .then((res) => {

        const data = res.data;

        console.log("API DATA:", data);

        if (data && Object.keys(data).length > 0) {

          const mergedData = {
            ...localData,
            ...data
          };

          setProfile(mergedData);
          setVolunteerID(mergedData.volunteerId);

          // ✅ SAVE BACK
          localStorage.setItem(
            `volunteer_${email}`,
            JSON.stringify(mergedData)
          );
        }

      })
      .catch((err) => console.log(err));

  }, [email]);

  return (

    <div className="flex min-h-screen bg-gray-100 font-sans">

      {/* SIDEBAR */}

      <div className="w-64 bg-indigo-700 text-white p-6">

        <h2 className="text-2xl font-bold mb-8">Volunteer</h2>

        <ul className="space-y-4">

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Dashboard
          </li>

          <Link
            to="/Volunteer_Profile"
            className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
            Profile
          </Link>

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Student Verification
          </li>

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Attendance Monitoring
          </li>

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Results Support
          </li>

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Report Issue
          </li>

          <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
            Tasks
          </li>

          <Link
            to="/VolunteerRefer"
            className="block p-3 rounded-lg hover:bg-indigo-600 transition cursor-pointer">
            Refer & Earn
          </Link>

          <li
            onClick={() => {
              localStorage.removeItem("volunteerEmail");
              window.location.href = "/Volunteer_Login";
            }}
            className="hover:bg-red-500 p-2 rounded cursor-pointer">
            Logout
          </li>

        </ul>

      </div>


      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col">


        {/* TOPBAR */}

        <div className="bg-white shadow p-4 flex justify-between items-center">

          <h1 className="text-xl font-bold text-gray-700">
            Welcome {profile.name}
          </h1>

          <div className="flex items-center gap-6">

            <span className="font-semibold text-gray-600">
              Volunteer ID :
              <span className="text-indigo-600 ml-1">
                {volunteerID || "N/A"}
              </span>
            </span>

            <button className="text-xl">🔔</button>

            {/* ✅ IMAGE FIX */}
            <img
              src={
                profile.photo
                  ? profile.photo
                  : "https://i.pravatar.cc/40"
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border"
            />

          </div>

        </div>


        {/* CONTENT */}

        <div className="p-8">


          {/* CARDS */}

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-gray-500">Assigned Tasks</h3>
              <p className="text-3xl font-bold text-indigo-600">03</p>
            </div>

            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-gray-500">Students Verified</h3>
              <p className="text-3xl font-bold text-indigo-600">45</p>
            </div>

            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-gray-500">Attendance Marked</h3>
              <p className="text-3xl font-bold text-indigo-600">40</p>
            </div>

            <div className="bg-white shadow rounded-xl p-6 text-center">
              <h3 className="text-gray-500">Issues Reported</h3>
              <p className="text-3xl font-bold text-red-500">02</p>
            </div>

          </div>


          {/* QUICK ACTIONS */}

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Start Exam Monitoring
              </h3>

              <p className="text-gray-500">
                Monitor ongoing exam
              </p>

            </button>


            <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Verify Students
              </h3>

              <p className="text-gray-500">
                Verify student identity
              </p>

            </button>


            <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Mark Attendance
              </h3>

              <p className="text-gray-500">
                Record exam attendance
              </p>

            </button>


            <button className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition text-center">

              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Report Issue
              </h3>

              <p className="text-gray-500">
                Submit problem report
              </p>

            </button>

          </div>


          {/* STUDENT TABLE */}

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              Exam Students List
            </h2>

            <table className="w-full text-left">

              <thead>
                <tr className="border-b">
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Exam</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="p-2">Rahul Sharma</td>
                  <td className="p-2">10</td>
                  <td className="p-2">Math Olympiad</td>
                  <td className="p-2 text-green-600">Present</td>
                </tr>

                <tr className="border-b">
                  <td className="p-2">Priya Verma</td>
                  <td className="p-2">9</td>
                  <td className="p-2">Science Olympiad</td>
                  <td className="p-2 text-green-600">Present</td>
                </tr>

                <tr className="border-b">
                  <td className="p-2">Aman Singh</td>
                  <td className="p-2">8</td>
                  <td className="p-2">Math Olympiad</td>
                  <td className="p-2 text-red-500">Absent</td>
                </tr>

                <tr>
                  <td className="p-2">Neha Gupta</td>
                  <td className="p-2">7</td>
                  <td className="p-2">Science Olympiad</td>
                  <td className="p-2 text-green-600">Present</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );
}