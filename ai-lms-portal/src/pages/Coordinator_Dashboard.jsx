// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function CoordinatorDashboard() {

//   const [profile, setProfile] = useState({});

//   useEffect(() => {

//     const email = localStorage.getItem("CoordinatorEmail");

//     axios
//       .get(`http://localhost:5000/coordinator/profile/${email}`)
//       .then((res) => {
//         setProfile(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//   }, []);

//   return (

//     <div className="bg-gray-100">

//       <div className="flex min-h-screen">

//         {/* SIDEBAR */}

//         <div className="w-64 bg-indigo-700 text-white p-6">

//           <h2 className="text-2xl font-bold mb-8">Coordinator</h2>

//           <ul className="space-y-4">

//             <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
//               Dashboard
//             </li>

//             <li>
//               <Link
//                 to="/Coordinator_profile"
//                 className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"
//               >
//                 My Profile
//               </Link>
//             </li>

//             <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Schools</li>
//             <li>
//               <Link
//                 to="/Cor_student"
//                 className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"
//               >
//                 Students
//               </Link>
//             </li>
//             <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Olympiad Registrations</li>
//             <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Reports</li>
//             <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Notifications</li>
//             <Link
//               to="/CoordinatorRefer"
//               className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"          >
//               Refer & Earn
//             </Link>
//             <li className="hover:bg-red-500 p-2 rounded cursor-pointer">Logout</li>

//           </ul>

//         </div>


//         {/* MAIN AREA */}

//         <div className="flex-1 flex flex-col">

//           {/* TOP HEADER */}

//           <div className="bg-white shadow p-4 flex justify-between items-center">

//             <h1 className="text-xl font-bold text-gray-700">
//               Welcome {profile.name}
//             </h1>

//             <div className="flex items-center gap-6">

//               <button className="text-xl">🔔</button>

//               <div className="text-right">

//                 <p className="text-sm text-gray-500">Coordinator ID</p>
//                 <p className="font-bold text-indigo-600">{profile.coordinatorId}</p>

//                 <p className="text-gray-600 text-sm">{profile.email}</p>
//                 <p className="text-gray-600 text-sm">{profile.mobile}</p>

//               </div>

//               <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
//                 {profile.name ? profile.name.charAt(0) : "C"}
//               </div>

//             </div>

//           </div>


//           {/* CONTENT */}

//           <div className="p-8">

//             {/* STATS */}

//             <div className="grid md:grid-cols-4 gap-6 mb-10">

//               <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500">Total Schools</h3>
//                 <p className="text-3xl font-bold text-indigo-600">25</p>
//               </div>

//               <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500">Registered Students</h3>
//                 <p className="text-3xl font-bold text-indigo-600">540</p>
//               </div>

//               <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500">Olympiad Registrations</h3>
//                 <p className="text-3xl font-bold text-indigo-600">320</p>
//               </div>

//               <div className="bg-white shadow rounded-xl p-6 text-center">
//                 <h3 className="text-gray-500">Pending Approvals</h3>
//                 <p className="text-3xl font-bold text-red-500">12</p>
//               </div>

//             </div>


//             {/* SCHOOL LIST */}

//             <div className="bg-white shadow rounded-xl p-6 mb-10">

//               <h2 className="text-xl font-semibold mb-4">Recent Schools</h2>

//               <table className="w-full text-left">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="p-2">School Name</th>
//                     <th className="p-2">City</th>
//                     <th className="p-2">Students</th>
//                     <th className="p-2">Status</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   <tr className="border-b">
//                     <td className="p-2">ABC Public School</td>
//                     <td className="p-2">Delhi</td>
//                     <td className="p-2">120</td>
//                     <td className="p-2 text-green-600">Active</td>
//                   </tr>

//                   <tr className="border-b">
//                     <td className="p-2">Bright Future School</td>
//                     <td className="p-2">Lucknow</td>
//                     <td className="p-2">85</td>
//                     <td className="p-2 text-green-600">Active</td>
//                   </tr>

//                   <tr>
//                     <td className="p-2">Sunrise Academy</td>
//                     <td className="p-2">Noida</td>
//                     <td className="p-2">65</td>
//                     <td className="p-2 text-yellow-600">Pending</td>
//                   </tr>

//                 </tbody>

//               </table>

//             </div>


//             {/* RECENT REGISTRATIONS */}

//             <div className="bg-white shadow rounded-xl p-6">

//               <h2 className="text-xl font-semibold mb-4">
//                 Recent Student Registrations
//               </h2>

//               <table className="w-full text-left">

//                 <thead>
//                   <tr className="border-b">
//                     <th className="p-2">Student Name</th>
//                     <th className="p-2">Class</th>
//                     <th className="p-2">School</th>
//                     <th className="p-2">Olympiad</th>
//                   </tr>
//                 </thead>

//                 <tbody>

//                   <tr className="border-b">
//                     <td className="p-2">Rahul Sharma</td>
//                     <td className="p-2">Class 8</td>
//                     <td className="p-2">ABC Public School</td>
//                     <td className="p-2">Math Olympiad</td>
//                   </tr>

//                   <tr className="border-b">
//                     <td className="p-2">Ananya Singh</td>
//                     <td className="p-2">Class 6</td>
//                     <td className="p-2">Bright Future School</td>
//                     <td className="p-2">Science Olympiad</td>
//                   </tr>

//                   <tr>
//                     <td className="p-2">Arjun Verma</td>
//                     <td className="p-2">Class 9</td>
//                     <td className="p-2">Sunrise Academy</td>
//                     <td className="p-2">English Olympiad</td>
//                   </tr>

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// }

// export default CoordinatorDashboard;












import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CoordinatorDashboard() {

  const [profile, setProfile] = useState({});

  useEffect(() => {

    const email = localStorage.getItem("CoordinatorEmail");

    axios
      .get(`http://localhost:5000/coordinator/profile/${email}`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div className="bg-gray-100">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}

        <div className="w-64 bg-indigo-700 text-white p-6">

          <h2 className="text-2xl font-bold mb-8">Coordinator</h2>

          <ul className="space-y-4">

            <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">
              Dashboard
            </li>

            <li>
              <Link
                to="/Coordinator_profile"
                className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"
              >
                My Profile
              </Link>
            </li>

            <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Schools</li>
            <li>
              <Link
                to="/Cor_student"
                className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"
              >
                Students
              </Link>
            </li>
            <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Olympiad Registrations</li>
            <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Reports</li>
            <li className="hover:bg-indigo-600 p-2 rounded cursor-pointer">Notifications</li>
            <Link
              to="/CoordinatorRefer"
              className="block hover:bg-indigo-600 p-2 rounded cursor-pointer"          >
              Refer & Earn
            </Link>
            <li className="hover:bg-red-500 p-2 rounded cursor-pointer">Logout</li>

          </ul>

        </div>


        {/* MAIN AREA */}

        <div className="flex-1 flex flex-col">

          {/* TOP HEADER */}

          <div className="bg-white shadow p-4 flex justify-between items-center">

            <h1 className="text-xl font-bold text-gray-700">
              Welcome {profile.name}
            </h1>

            <div className="flex items-center gap-6">

              <button className="text-xl">🔔</button>

              <div className="text-right">

                <p className="text-sm text-gray-500">Coordinator ID</p>
                <p className="font-bold text-indigo-600">{profile.coordinatorId}</p>

                <p className="text-gray-600 text-sm">{profile.email}</p>
                <p className="text-gray-600 text-sm">{profile.mobile}</p>

              </div>

              {/* <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
                {profile.name ? profile.name.charAt(0) : "C"}
              </div> */}
              {profile.photo ? (
                <img
                  src={
                    profile.photo.startsWith("data:image")
                      ? profile.photo
                      : `data:image/png;base64,${profile.photo}`
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border"
                />
              ) : (
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
                  {profile.name ? profile.name.charAt(0) : "C"}
                </div>
              )}

            </div>

          </div>


          {/* CONTENT */}

          <div className="p-8">

            {/* STATS */}

            <div className="grid md:grid-cols-4 gap-6 mb-10">

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-gray-500">Total Schools</h3>
                <p className="text-3xl font-bold text-indigo-600">25</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-gray-500">Registered Students</h3>
                <p className="text-3xl font-bold text-indigo-600">540</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-gray-500">Olympiad Registrations</h3>
                <p className="text-3xl font-bold text-indigo-600">320</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-gray-500">Pending Approvals</h3>
                <p className="text-3xl font-bold text-red-500">12</p>
              </div>

            </div>


            {/* SCHOOL LIST */}

            <div className="bg-white shadow rounded-xl p-6 mb-10">

              <h2 className="text-xl font-semibold mb-4">Recent Schools</h2>

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b">
                    <th className="p-2">School Name</th>
                    <th className="p-2">City</th>
                    <th className="p-2">Students</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="border-b">
                    <td className="p-2">ABC Public School</td>
                    <td className="p-2">Delhi</td>
                    <td className="p-2">120</td>
                    <td className="p-2 text-green-600">Active</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-2">Bright Future School</td>
                    <td className="p-2">Lucknow</td>
                    <td className="p-2">85</td>
                    <td className="p-2 text-green-600">Active</td>
                  </tr>

                  <tr>
                    <td className="p-2">Sunrise Academy</td>
                    <td className="p-2">Noida</td>
                    <td className="p-2">65</td>
                    <td className="p-2 text-yellow-600">Pending</td>
                  </tr>

                </tbody>

              </table>

            </div>


            {/* RECENT REGISTRATIONS */}

            <div className="bg-white shadow rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-4">
                Recent Student Registrations
              </h2>

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b">
                    <th className="p-2">Student Name</th>
                    <th className="p-2">Class</th>
                    <th className="p-2">School</th>
                    <th className="p-2">Olympiad</th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="border-b">
                    <td className="p-2">Rahul Sharma</td>
                    <td className="p-2">Class 8</td>
                    <td className="p-2">ABC Public School</td>
                    <td className="p-2">Math Olympiad</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-2">Ananya Singh</td>
                    <td className="p-2">Class 6</td>
                    <td className="p-2">Bright Future School</td>
                    <td className="p-2">Science Olympiad</td>
                  </tr>

                  <tr>
                    <td className="p-2">Arjun Verma</td>
                    <td className="p-2">Class 9</td>
                    <td className="p-2">Sunrise Academy</td>
                    <td className="p-2">English Olympiad</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default CoordinatorDashboard;