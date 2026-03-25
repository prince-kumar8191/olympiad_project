

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function CoordinatorProfile() {

//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
  

//   const [profile, setProfile] = useState({
//     name: "",
//     role: "School Coordinator",
//     id: "",
//     location: "",
//     email: "",
//     phone: "",
//     school: "",
//     experience: ""
//   });

//   useEffect(() => {

//     const email = localStorage.getItem("CoordinatorEmail");

//     axios
//       .get(`http://localhost:5000/coordinator/profile/${email}`)
//       .then((res) => {

//         setProfile({
//           name: res.data.name,
//           role: "School Coordinator",
//           id: res.data.coordinatorId,
//           location: "India",
//           email: res.data.email,
//           phone: res.data.mobile,
//           school: "School Name",
//           experience: res.data.experience
//         });

//       })
//       .catch((err) => {
//         console.log(err);
//       });

//   }, []);

//   const handleChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSave = () => {
//     setEditMode(false);
//     alert("Profile Updated Successfully ✅");
//   };

//   const getProfileCompletion = () => {

//     const fields = [
//       profile.name,
//       profile.email,
//       profile.phone,
//       profile.school,
//       profile.experience,
//       profile.location
//     ];

//     const filled = fields.filter((field) => field && field !== "").length;

//     const percentage = Math.round((filled / fields.length) * 100);

//     return percentage;

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//         <div className="bg-white p-6 rounded-xl shadow-md">

//           <div className="flex items-center gap-4">

//             <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
//               CO
//             </div>

//             <div>

//               {editMode ? (
//                 <input
//                   name="name"
//                   value={profile.name}
//                   onChange={handleChange}
//                   className="border p-1 rounded"
//                 />
//               ) : (
//                 <h2 className="text-xl font-bold">{profile.name}</h2>
//               )}

//               <p className="text-gray-500">{profile.role}</p>
//               <p className="text-gray-500">Coordinator ID : {profile.id}</p>

//             </div>

//           </div>

//           <hr className="my-4" />

//           {editMode ? (
//             <>
//               <input
//                 name="location"
//                 value={profile.location}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full mb-2"
//               />

//               <input
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full mb-2"
//               />

//               <input
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full mb-2"
//               />

//               <input
//                 name="school"
//                 value={profile.school}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full mb-2"
//               />

//               <input
//                 name="experience"
//                 value={profile.experience}
//                 onChange={handleChange}
//                 className="border p-2 rounded w-full"
//               />
//             </>
//           ) : (
//             <>
//               <p className="text-gray-600">📍 {profile.location}</p>
//               <p className="text-gray-600 mt-2">📧 {profile.email}</p>
//               <p className="text-gray-600 mt-2">📞 {profile.phone}</p>
//               <p className="text-gray-600 mt-2">School : {profile.school}</p>
//               <p className="text-gray-600 mt-2">Experience : {profile.experience}</p>
//             </>
//           )}

//           <div className="mt-4">

//             {editMode ? (
//               <button
//                 onClick={handleSave}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Save Profile
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate("/DashVol_profile")}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//               >
//                 Edit Profile
//               </button>
//             )}

//           </div>

//           {/* DOWNLOAD ID CARD */}
//           <div className="mt-4">
//             <button
//               onClick={() => navigate("/CoordinatorId")}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Download ID Card
//             </button>
//           </div>


//         </div>

//         <div className="md:col-span-2 space-y-6">

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-2">
//               Coordinator Summary
//             </h3>

//             <p className="text-gray-600">
//               Responsible for coordinating Olympiad exams within the school,
//               managing student registrations and supporting exam activities.
//             </p>

//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-2">
//               Profile Completion
//             </h3>

//             <div className="flex items-center gap-4">

//               <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold">
//                 {getProfileCompletion()}%
//               </div>

//               <p className="text-gray-600">
//                 Percentage based on how much of your profile is filled.
//               </p>

//             </div>

//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-4">
//               Skills
//             </h3>

//             <div className="flex flex-wrap gap-3">

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Leadership
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Communication
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Exam Management
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Student Coordination
//               </span>

//             </div>

//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-4">
//               Exams Managed
//             </h3>

//             <ul className="list-disc ml-6 text-gray-600">

//               <li>Math Olympiad 2024</li>
//               <li>Science Olympiad 2025</li>
//               <li>Computer Olympiad 2025</li>

//             </ul>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default CoordinatorProfile;
















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CoordinatorProfile() {

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);


  const [profile, setProfile] = useState({
    name: "",
    role: "School Coordinator",
    id: "",
    location: "",
    email: "",
    phone: "",
    school: "",
    experience: "",
    photo: ""
  });

  useEffect(() => {

    const email = localStorage.getItem("CoordinatorEmail");

    axios
      .get(`http://localhost:5000/coordinator/profile/${email}`)
      .then((res) => {
          

        setProfile({
          name: res.data.name,
          role: "School Coordinator",
          id: res.data.coordinatorId,
          location: "India",
          email: res.data.email,
          phone: res.data.mobile,
          school: "School Name",
          experience: res.data.experience,
          photo: res.data.photo,
          blood_group: res.data.blood_group
        });

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile Updated Successfully ✅");
  };

  const getProfileCompletion = () => {

    const fields = [
      profile.name,
      profile.email,
      profile.phone,
      profile.school,
      profile.experience,
      profile.blood_group,
      profile.location
    ];

    const filled = fields.filter((field) => field && field !== "").length;

    const percentage = Math.round((filled / fields.length) * 100);

    return percentage;

  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-md">

          <div className="flex items-center gap-4">
            {/* 
            <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
              CO
            </div> */}

            {profile.photo ? (
              <img
                src={profile.photo}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
                CO
              </div>
            )}

            <div>

              {editMode ? (
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="border p-1 rounded"
                />
              ) : (
                <h2 className="text-xl font-bold">{profile.name}</h2>
              )}

              <p className="text-gray-500">{profile.role}</p>
              <p className="text-gray-500">Coordinator ID : {profile.id}</p>

            </div>

          </div>

          <hr className="my-4" />

          {editMode ? (
            <>
              <input
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                name="school"
                value={profile.school}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />

              <input
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
               <input
                name="bloodgroup"
                value={profile.blood_group}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </>
          ) : (
            <>
              <p className="text-gray-600">📍 {profile.location}</p>
              <p className="text-gray-600 mt-2">📧 {profile.email}</p>
              <p className="text-gray-600 mt-2">📞 {profile.phone}</p>
              <p className="text-gray-600 mt-2">School : {profile.school}</p>
              <p className="text-gray-600 mt-2">Experience : {profile.experience}</p>
               <p className="text-gray-600 mt-2">Bloodgroup : {profile.blood_group}</p>
            </>
          )}

          <div className="mt-4">

            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Profile
              </button>
            ) : (
              <button
                onClick={() => navigate("/DashVol_profile")}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            )}

          </div>

          {/* DOWNLOAD ID CARD */}
          <div className="mt-4">
            <button
              onClick={() => navigate("/CoordinatorId")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download ID Card
            </button>
          </div>


        </div>

        <div className="md:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              Coordinator Summary
            </h3>

            <p className="text-gray-600">
              Responsible for coordinating Olympiad exams within the school,
              managing student registrations and supporting exam activities.
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              Profile Completion
            </h3>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold">
                {getProfileCompletion()}%
              </div>

              <p className="text-gray-600">
                Percentage based on how much of your profile is filled.
              </p>

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4">
              Skills
            </h3>

            <div className="flex flex-wrap gap-3">

              <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                Leadership
              </span>

              <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                Communication
              </span>

              <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                Exam Management
              </span>

              <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                Student Coordination
              </span>

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4">
              Exams Managed
            </h3>

            <ul className="list-disc ml-6 text-gray-600">

              <li>Math Olympiad 2024</li>
              <li>Science Olympiad 2025</li>
              <li>Computer Olympiad 2025</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CoordinatorProfile;