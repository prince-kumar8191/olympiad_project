
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function OlympiadStudentProfile() {

//   const navigate = useNavigate();

//   // 👇 State for student data
//   const [student, setStudent] = useState({
//     name: "",
//     section: "",
//     class: "",
//     email: "",
//     phone: "",
//     address: "",
//     school: "",
//     skills: [],
//     profileCompletion: 0
//   });

//   // 👇 Fetch student data from backend on mount
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/student-profile"); // backend endpoint
//         setStudent(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch profile data");
//       }
//     };

//     fetchStudent();
//   }, []);

//   // 👇 Calculate profile completion dynamically
//   useEffect(() => {
//     let totalFields = Object.keys(student).length;
//     let filledFields = Object.values(student).filter(
//       (val) => val !== "" && val !== null
//     ).length;
//     setStudent(prev => ({ ...prev, profileCompletion: Math.round((filledFields / totalFields) * 100) }));
//   }, [student.name, student.section, student.class, student.email, student.phone, student.address, student.school]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">

//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* LEFT PROFILE CARD */}
//         <div className="bg-white p-6 rounded-xl shadow-md">

//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
//               {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//             </div>

//             <div>
//               <h2 className="text-xl font-bold">{student.name || "Name"}</h2>
//               <p className="text-gray-500">{student.section || "Section"}</p>
//               <p className="text-gray-500">{student.class || "Class"}</p>
//             </div>
//           </div>

//           <hr className="my-4" />

//           <p className="text-gray-600">📍 India</p>
//           <p className="text-gray-600 mt-2">📧 {student.email || "student@email.com"}</p>
//           <p className="text-gray-600 mt-2">📞 {student.phone || "+91 0000000000"}</p>
//           <p className="text-gray-600 mt-2">Address - {student.address || "School Address"}</p>
//           <p className="text-gray-600 mt-2">{student.school || "School Name"}</p>

//           <button
//             onClick={() => navigate("/Edit_profile", { state: student })}
//             className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//           >
//             Edit Profile
//           </button>

//         </div>

//         {/* RIGHT SECTION */}
//         <div className="md:col-span-2 space-y-6">

//           {/* PROFILE SUMMARY */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-xl font-bold mb-3">Profile Summary</h3>
//             <p className="text-gray-600">
//               Passionate Olympiad student interested in Mathematics, Science, and Coding competitions.
//               Preparing for national-level olympiad exams and aiming for top rank.
//             </p>
//           </div>

//           {/* PROFILE COMPLETION */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-xl font-bold mb-3">Profile Completion</h3>
//             <div className="w-full bg-gray-200 rounded-full h-4">
//               <div
//                 className="bg-green-500 h-4 rounded-full"
//                 style={{ width: `${student.profileCompletion || 0}%` }}
//               ></div>
//             </div>
//             <p className="mt-2 text-gray-600">{student.profileCompletion || 0}% Profile Completed</p>
//           </div>

//           {/* SKILLS */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-xl font-bold mb-4">Skills</h3>
//             <div className="flex flex-wrap gap-3">
//               {student.skills && student.skills.length > 0
//                 ? student.skills.map((skill, idx) => (
//                     <span key={idx} className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">{skill}</span>
//                   ))
//                 : ["Mathematics", "Science", "Logical Reasoning", "Coding"].map((skill, idx) => (
//                     <span key={idx} className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">{skill}</span>
//                   ))
//               }
//             </div>
//           </div>

//           {/* TEST HISTORY */}
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-xl font-bold mb-4">Test History</h3>
//             <table className="w-full border">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-2">Exam</th>
//                   <th className="p-2">Score</th>
//                   <th className="p-2">Rank</th>
//                   <th className="p-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="text-center border-t">
//                   <td className="p-2">Math Olympiad</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2"></td>
//                 </tr>
//                 <tr className="text-center border-t">
//                   <td className="p-2">Science Olympiad</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2"></td>
//                 </tr>
//                 <tr className="text-center border-t">
//                   <td className="p-2">Computer Olympiad</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2">00</td>
//                   <td className="p-2"></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OlympiadStudentProfile() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    section: "",
    student_class: "",
    email: "",
    phone: "",
    StudentId:"",
    address: "",
    school: "",
    skills: [],
    photo: "",
    city: "",
    state: "",
    pincode: "",
    father_name: "",
    mother_name: "",
    school_code: "",
    school_address: "",
    blood_group: ""
  });

  const [profileCompletion, setProfileCompletion] = useState(0);

  // Load from localStorage and backend
  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student") || "{}");

    if (storedStudent && Object.keys(storedStudent).length > 0) {
      setStudent(storedStudent);
    }

    if (storedStudent.email) {
      axios.get(`http://localhost:5000/get-student/${storedStudent.email}`)
        .then(res => {
          if (res.data.success && res.data.student) {
            const dbStudent = res.data.student;
            const studentData = {
              name: dbStudent.name || "",
              email: dbStudent.email || "",
              phone: dbStudent.phone || "",
              StudentId: dbStudent.StudentId || dbStudent.student_id || "",
              dob: dbStudent.dob || "",
              father_name: dbStudent.father_name || "",
              mother_name: dbStudent.mother_name || "",
              student_class: dbStudent.student_class || dbStudent.class || dbStudent.class_name || "",
              section: dbStudent.section || "",
              school: dbStudent.school || dbStudent.school_name || "",
              school_code: dbStudent.school_code || "",
              school_address: dbStudent.school_address || "",
              address: dbStudent.address || "",
              city: dbStudent.city || "",
              state: dbStudent.state || "",
              pincode: dbStudent.pincode || "",
              father_occupation: dbStudent.father_occupation || "",
              mother_occupation: dbStudent.mother_occupation || "",
              blood_group: dbStudent.blood_group || "",
              photo: dbStudent.photo || "",
              skills: dbStudent.skills || []
            };

            setStudent(studentData);
            localStorage.setItem("student", JSON.stringify(studentData));
          }
        })
        .catch(err => console.log("Fetch Error:", err));
    }
  }, []);

  // Profile Completion Calculation
  useEffect(() => {
    const fields = [
      student.name,
      student.section,
      student.student_class,
      student.email,
      student.phone,
      student.StudentId,
      student.address,
      student.school,
      student.photo,
      student.skills,
      student.city,
      student.state,
      student.pincode,
      student.father_name,
      student.mother_name,
      student.school_code,
      student.school_address,
      student.blood_group
    ];

    const filledFields = fields.filter(field => {
      if (field === null || field === undefined) return false;
      if (typeof field === "string") return field.trim() !== "";
      if (Array.isArray(field)) return field.length > 0;
      return true;
    }).length;

    const percent = Math.round((filledFields / fields.length) * 100);
    setProfileCompletion(percent);
  }, [student]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xl font-bold overflow-hidden">
              {student.photo
                ? <img src={student.photo} alt="Profile" className="w-full h-full object-cover" />
                : student.name
                  ? student.name.charAt(0).toUpperCase()
                  : "S"
              }
            </div>

            <div>
              <h2 className="text-xl font-bold">{student.name || "Name"}</h2>
              <p className="text-gray-500">Section - {student.section || ""} </p>
              <p className="text-gray-500">{student.student_class || "Class"}</p>
              <p className="text-black font-bold">{student.StudentId || "StudentId"}</p>
            </div>
          </div>

          <hr className="my-4" />
          <p className="text-gray-600">📍 India</p>
          <p className="text-gray-600 mt-2">📧 {student.email || "student@email.com"}</p>
          <p className="text-gray-600 mt-2">📞 {student.phone || "+91 0000000000"}</p>
          <p className="text-gray-600 mt-2">Address - {student.address || "School Address"}</p>
          <p className="text-gray-600 mt-2">{student.school || "School Name"}</p>

          <button
            onClick={() => navigate("/Edit_profile", { state: student })}
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Edit Profile
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3">Profile Summary</h3>
            <p className="text-gray-600">
              Welcome {student.name || "Student"}! Your registered email is {student.email || "student@email.com"}.
            </p>
          </div>

          {/* PROFILE COMPLETION */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3">Profile Completion</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <p className="mt-2 text-gray-600">{profileCompletion}% Profile Completed</p>
          </div>

          {/* SKILLS */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {student.skills && student.skills.length > 0
                ? student.skills.map((skill, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">{skill}</span>
                ))
                : ["Mathematics", "Science", "Logical Reasoning", "Coding"].map((skill, idx) => (
                  <span key={idx} className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">{skill}</span>
                ))
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}