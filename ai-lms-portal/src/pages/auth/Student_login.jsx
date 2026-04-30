






import React, { useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
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
     console.log("Sending:", form);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/student-login`, form);

      console.log("Login Response:", res.data);
      alert(res.data.message);

      if (res.data.success) {
        const dbStudent = res.data.student || {};

         console.log("Student Data:", dbStudent); 

        // ✅ Fixed: proper mapping for all fields
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

        console.log("Saved Student for Dashboard:", studentData);

        localStorage.setItem("student", JSON.stringify(studentData));
        //========permanent login ========
       localStorage.setItem("studentLogin", "true");
   localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "student");


      

        navigate("/Student_Dashboard");
      }

    } catch (error) {
      console.log("Login Error:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error: Backend connect nahi ho raha");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">
        <div className="flex flex-col items-center mb-6">
          <FaUserGraduate size={45} />
          <h2 className="text-3xl font-bold mt-3">Student Login</h2>
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
                required
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
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

export default StudentLogin;