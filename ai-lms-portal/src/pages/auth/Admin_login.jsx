// // import React, { useState } from "react";
// // import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";

// // function AdminLogin() {

// //   const [form, setForm] = useState({
// //     email: "",
// //     password: ""
// //   });

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log(form);

// //     // yaha backend API call hogi
// //   };

// //   return (

// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

// //       <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

// //         <div className="flex flex-col items-center mb-6 text-center">
// //           <FaUserShield size={45} />
// //           <h2 className="text-3xl font-bold mt-3">
// //             Admin Login
// //           </h2>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">

// //           <div>
// //             <label className="block mb-2">Admin Email</label>

// //             <div className="flex items-center bg-white/30 rounded-lg px-3">
// //               <FaEnvelope className="mr-2" />
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="Enter admin email"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label className="block mb-2">Password</label>

// //             <div className="flex items-center bg-white/30 rounded-lg px-3">
// //               <FaLock className="mr-2" />
// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="Enter password"
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
// //               />
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
// //           >
// //             Login
// //           </button>

// //         </form>

// //       </div>

// //     </div>
// //   );
// // }

// // export default AdminLogin;












// import { useState } from "react"

// export default function AdminLogin(){

// const [email,setEmail] = useState("")
// const [password,setPassword] = useState("")

// const login = async () => {

// const res = await fetch("http://localhost:5000/Admin_login",{
//  method:"POST",
//  headers:{ "Content-Type":"application/json" },
//  body: JSON.stringify({ email,password })
// })

// const data = await res.json()

// alert(data.message)

// }

// return(

// <div>

// <h2>Admin Login</h2>

// <input
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// />

// <input
// placeholder="Password"
// type="password"
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button onClick={login}>
// Login
// </button>

// </div>

// )

// }








import React, { useState } from "react";
import axios from "axios";
import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

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

      const res = await axios.post(
        "http://localhost:5000/Admin_login",
        form
      );

      alert(res.data.message);

      if (res.data.success) {

        // email save for otp verification
        localStorage.setItem("admin_email", form.email);

        navigate("/OtpVerify");
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Error");
      }

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-6">
          <FaUserShield size={45} />
          <h2 className="text-3xl font-bold mt-3">Admin Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2">Email</label>

            <div className="flex items-center bg-white/30 rounded-lg px-3">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                value={form.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
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
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
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

export default AdminLogin;