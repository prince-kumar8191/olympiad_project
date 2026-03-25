// import React, { useState } from "react";
// import axios from "axios";
// import { FaSchool, FaEnvelope, FaLock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function SchoolLogin() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/school-login",
//         form
//       );

//       alert(res.data.message);

//       // email save
//       localStorage.setItem("schoolEmail", res.data.email);

//       // dashboard open
//       navigate("/School_Dashboard");

//     } catch (error) {

//       if (error.response) {
//         alert(error.response.data.message);
//       } else {
//         alert("Server Error");
//       }

//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

//       <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

//         <div className="flex flex-col items-center mb-6">
//           <FaSchool size={45} />
//           <h2 className="text-3xl font-bold mt-3">School Login</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div>
//             <label className="block mb-2">Email</label>

//             <div className="flex items-center bg-white/30 rounded-lg px-3">
//               <FaEnvelope className="mr-2" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="bg-transparent outline-none w-full py-3 text-white"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block mb-2">Password</label>

//             <div className="flex items-center bg-white/30 rounded-lg px-3">
//               <FaLock className="mr-2" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="bg-transparent outline-none w-full py-3 text-white"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
//           >
//             Login
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default SchoolLogin;



















import React, { useState } from "react";
import axios from "axios";
import { FaSchool, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SchoolLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/school-login", form);

    alert(res.data.message); // 🔹 Ye backend se message show karega

    // 🔹 Full school object localStorage me save karo (yehi line add karni hai)
    localStorage.setItem("school", JSON.stringify(res.data.data));
   localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", "school");
    // 🔹 Dashboard open
    // navigate("/School_Dashboard");
    navigate("/School_Dashboard", { state: res.data.data });

  } catch (error) {
    if (error.response && error.response.data.message) {
      alert(error.response.data.message);
    } else if (error.response && error.response.data.error) {
      alert("Server Error: " + error.response.data.error);
    } else {
      alert("Server Error");
    }
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-6">
          <FaSchool size={45} />
          <h2 className="text-3xl font-bold mt-3">School Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2">Email</label>

            <div className="flex items-center bg-white/30 rounded-lg px-3">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full py-3 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Password</label>

            <div className="flex items-center bg-white/30 rounded-lg px-3">
              <FaLock className="mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full py-3 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default SchoolLogin;