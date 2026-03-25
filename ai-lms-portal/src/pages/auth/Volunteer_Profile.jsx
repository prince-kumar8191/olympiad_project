



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function VolunteerProfile() {

//   const navigate = useNavigate();
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchProfile = async () => {

//       try {

//         const email = localStorage.getItem("volunteerEmail");

//         if (!email) {
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:5000/volunteer/profile/${email}`
//         );

//         if (res.data) {
//           setProfile(res.data);
//         }

//       } catch (error) {

//         console.log("Profile Error:", error);

//       }

//       setLoading(false);

//     };

//     fetchProfile();

//   }, []);

//   if (loading) {
//     return <div className="p-10 text-center text-lg">Loading...</div>;
//   }

//   return (

//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* LEFT CARD */}

//         <div className="bg-white p-6 rounded-xl shadow-md">

//           <div className="flex items-center gap-4">

//             <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
//               {profile.name ? profile.name.charAt(0) : "V"}
//             </div>

//             <div>
//               <h2 className="text-xl font-bold">{profile.name || "Volunteer"}</h2>
//               <p className="text-gray-500">Event Volunteer</p>
//               <p className="text-gray-500">
//                 Volunteer ID : {profile.volunteerId || "N/A"}
//               </p>
//             </div>

//           </div>

//           <hr className="my-4" />

//           <p className="text-gray-600">📧 {profile.email || "-"}</p>
//           <p className="text-gray-600 mt-2">📞 {profile.mobile || "-"}</p>
//           <p className="text-gray-600 mt-2">
//             Qualification : {profile.qualification || "-"}
//           </p>

// <p className="text-gray-600 mt-2">
//             Profession : {profile.profession || "-"}
//           </p>

//           <p className="text-gray-600 mt-2">
//             Skills : {profile.skills || "-"}
//           </p>
//           <p className="text-gray-600 mt-2">
//             Availability : {profile.availability || "-"}
//           </p>

//           <div className="mt-4">
//             <button
//               onClick={() => navigate("/Voldash_profile")}
//               className="bg-indigo-600 text-white px-4 py-2 rounded"
//             >
//               Edit Profile
//             </button>
//           </div>

//           <div className="mt-4">
//             <button
//               onClick={() => navigate("/VolunteerID")}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Download ID Card
//             </button>
//           </div>

//         </div>


//         {/* RIGHT SIDE */}

//         <div className="md:col-span-2 space-y-6">

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-2">
//               Volunteer Summary
//             </h3>

//             <p className="text-gray-600">
//               Dedicated volunteer supporting Olympiad events and school coordination.
//             </p>

//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-2">
//               Volunteer Performance
//             </h3>

//             <div className="flex items-center gap-4">

//               <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold">
//                 85%
//               </div>

//               <p className="text-gray-600">
//                 Performance score based on participation.
//               </p>

//             </div>

//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-4">
//               Skills
//             </h3>

//              {/* <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//               {profile.skills || "No skills added"} */}

//                    <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Event Management
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Communication
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Coordination
//               </span>

//               <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
//                 Technical Support
                
//             </span>

//           </div>

//         </div>

       
//           {/* EVENTS PARTICIPATED */}

//           <div className="bg-white p-6 rounded-xl shadow-md">

//             <h3 className="text-xl font-bold mb-4">
//               Events Participated
//             </h3>

//             <ul className="list-disc ml-6 text-gray-600">

//               <li>Math Olympiad 2024 - Exam Support</li>               <li>Science Olympiad 2025 - School Coordination</li>
//               <li>Computer Olympiad 2025 - Event Volunteer</li>

//             </ul>

//           </div>


//         </div>

//       </div>

   

//   );

// }

// export default VolunteerProfile;














import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VolunteerProfile() {

  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("volunteerEmail");

  // ✅ LOCAL DATA (IMPORTANT 🔥)
  const getLocalData = () => {
    try {
      return JSON.parse(localStorage.getItem(`volunteer_${email}`)) || {};
    } catch {
      return {};
    }
  };

  // ✅ PROFILE COMPLETION LOGIC
  const calculateCompletion = (data) => {
    if (!data) return 0;

    const fields = [
      data.name,
      data.email,
      data.phone || data.mobile,
      data.qualification,
      data.profession || data.Profession,
      data.skills,
      data.availability,
      data.photo,
      data.blood_group
    ];

    const filled = fields.filter(
      (field) => field !== null && field !== "" && field !== undefined
    ).length;

    return Math.round((filled / fields.length) * 100);
  };

  const completion = calculateCompletion(profile);

  // 🔥 CIRCLE
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (completion / 100) * circumference;

  useEffect(() => {

    if (!email) {
      setLoading(false);
      return;
    }

    // ✅ STEP 1: LOCAL LOAD (IMAGE + DATA SAFE)
    const localData = getLocalData();

    if (Object.keys(localData).length > 0) {
      setProfile(localData);
    }

    // ✅ STEP 2: BACKEND FETCH (MERGE FIX)
    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/volunteer/profile/${email}`
        );

        console.log("API DATA:", res.data);

        if (res.data && Object.keys(res.data).length > 0) {

          const mergedData = {
            ...localData,
            ...res.data
          };

          setProfile(mergedData);

          // 🔥 SAVE FIXED DATA
          localStorage.setItem(
            `volunteer_${email}`,
            JSON.stringify(mergedData)
          );
        }

      } catch (error) {

        console.log("Profile Error:", error);

      }

      setLoading(false);

    };

    fetchProfile();

  }, [email]);

  if (loading) {
    return <div className="p-10 text-center text-lg">Loading...</div>;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT CARD */}

        <div className="bg-white p-6 rounded-xl shadow-md">

          <div className="flex items-center gap-4">

            {/* ✅ IMAGE FIX */}
            <div className="w-16 h-16 rounded-full overflow-hidden border">

              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {profile.name ? profile.name.charAt(0) : "V"}
                </div>
              )}

            </div>

            <div>
              <h2 className="text-xl font-bold">{profile.name || "Volunteer"}</h2>
              <p className="text-gray-500">Event Volunteer</p>
              <p className="text-gray-500">
                Volunteer ID : {profile.volunteerId || "N/A"}
              </p>
            </div>

          </div>

          <hr className="my-4" />

          <p className="text-gray-600">📧 {profile.email || "-"}</p>

          <p className="text-gray-600 mt-2">
            📞 {profile.mobile || profile.phone || "-"}
          </p>

          <p className="text-gray-600 mt-2">
            Qualification : {profile.qualification || "-"}
          </p>

          {/* ✅ PROFESSION FIX */}
          <p className="text-gray-600 mt-2">
            Profession : {profile.profession || profile.Profession || "-"}
          </p>

          <p className="text-gray-600 mt-2">
            Skills : {profile.skills || "-"}
          </p>

          <p className="text-gray-600 mt-2">
            Availability : {profile.availability || "-"}
          </p>

                         <p className="text-gray-600 mt-2">Bloodgroup : {profile.blood_group}</p>
          

          <div className="mt-4">
            <button
              onClick={() => navigate("/Voldash_profile")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate("/VolunteerID")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download ID Card
            </button>
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="md:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              Volunteer Summary
            </h3>

            <p className="text-gray-600">
              Dedicated volunteer supporting Olympiad events and school coordination.
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              Volunteer Performance
            </h3>

            <div className="flex items-center gap-4">

              <div className="relative w-16 h-16">

                <svg className="w-16 h-16 transform -rotate-90">

                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />

                  <circle
                    cx="32"
                    cy="32"
                    r={radius}
                    stroke="#22c55e"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />

                </svg>

                <div className="absolute inset-0 flex items-center justify-center font-bold">
                  {completion}%
                </div>

              </div>

              <p className="text-gray-600">
                Performance score based on participation.
              </p>

            </div>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4">
              Skills
            </h3>

            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
              {profile.skills || "No skills added"}
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default VolunteerProfile;