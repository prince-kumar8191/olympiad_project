






import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  // 🔹 Unique Student ID Generator
  const generateStudentId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().slice(-2);
    return `STU-${year}${random}`;
  };

  const [form, setForm] = useState({
    StudentId: "",
    name: "",
    email: "",
    password: "",
    referredCode: ""
  });

   const [accepted, setAccepted] = useState(false);

  // Generate StudentId on component mount
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      StudentId: generateStudentId(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
      setForm({ ...form, [name]: capitalized });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!accepted) {
    alert("Please accept the Terms and Conditions");
    return;
  }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, form);

      alert(res.data.message);

      // ✅ Save student data including StudentId in localStorage
      console.log(res.data);
      localStorage.setItem(
        "student",
        JSON.stringify({
          name: form.name,
          email: form.email,
          StudentId: form.StudentId
        })
      );

      localStorage.setItem("studentLogin", "true");
      navigate("/Student_Dashboard");
    } catch (err) {
      console.log("Signup Error:", err);
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/30"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Student Sign Up
        </h2>

        {/* Student ID */}
        <div className="mb-4">
          <label className="block text-white text-sm mb-1">
            Your Unique Student ID
          </label>
          <input
            type="text"
            value={form.StudentId}
            readOnly
            className="w-full p-3 rounded-xl bg-white/30 text-white font-semibold border border-white/40"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-white text-sm">Full Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            placeholder="Enter your name"
            className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-white text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Enter your email"
            className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-white text-sm">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Enter password"
            className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
            required
          />
        </div>
  
          <div className="md:col-span-2 flex items-start gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
              required
            />
            <label className="text-white text-sm">
              I hereby agree to share my detail for for purpose mention over here and and read the Terms and Conditions policy of the organisation listed below.
            </label>
          </div>
        

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
        >
          Create Account 🚀
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form >
    </div >
  );
}

export default Signup;