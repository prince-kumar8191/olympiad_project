import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CoordinatorSignup() {

  const navigate = useNavigate();

  // 🔹 Unique Coordinator ID Generator
  const generateCoordinatorId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().slice(-2);
    return `CO-${year}${random}`;
  };

  const [form, setForm] = useState({
    coordinatorId: "",
    name: "",
    email: "",
    mobile: "",
    city: "",
    department: "",
    roleType: "",
    qualification: "",
    experience: "",
    password: "",
    confirmPassword: "",
    resume: null
  });

  const [showPassword, setShowPassword] = useState(false);
  
      const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      coordinatorId: generateCoordinatorId(),
    }));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Resume Upload
  const handleFileChange = (e) => {
    setForm({
      ...form,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    
  if (!accepted) {
    alert("Please accept the Terms and Conditions");
    return;
  }

    const formData = new FormData();

    formData.append("coordinatorId", form.coordinatorId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("city", form.city);
    formData.append("department", form.department);
    formData.append("roleType", form.roleType);
    formData.append("qualification", form.qualification);
    formData.append("experience", form.experience);
    formData.append("password", form.password);
    formData.append("resume", form.resume);

    try {
      const response = await fetch("http://localhost:5000/register-coordinator", {
        method: "POST",
        body: formData,
      });
    
      
      const data = await response.json();

      if (response.ok) {
        alert("Coordinator Registered Successfully 👑. Waiting for Admin approval");

        // 🔹 email save
        localStorage.setItem("oordinatorEmail", form.email);

        // 🔹 open dashboard
        navigate("/Coordinator_login");

      } else {
        alert(data.message || "Registration Failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
    {/* // <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"> */}

      

   
      <div className="bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-white/30">

      
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Coordinator Registration 👑
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Coordinator ID */}
          <div>
            <label className="block text-white text-sm mb-1">
              Your Unique Coordinator ID
            </label>
            <input
              type="text"
              value={form.coordinatorId}
              readOnly
              className="w-full p-3 rounded-xl bg-white/30 text-white font-semibold border border-white/40"
            />
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-white text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Mobile */}
          <div>
            <label className="text-white text-sm">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="text-white text-sm">City / Area</label>
            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="text-white text-sm">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="text-white text-sm">Work Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="Example: 2 Years Teaching"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-white text-sm">Department</label>
            <select
              name="department"
              value={form.department}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">Select Department</option>
              <option className="text-black">Education</option>
              <option className="text-black">Event Management</option>
              <option className="text-black">Social Media</option>
              <option className="text-black">Technical</option>
            </select>
          </div>

          {/* Role Type */}
          <div>
            <label className="text-white text-sm">Role Type</label>
            <select
              name="roleType"
              value={form.roleType}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">Select Role</option>
              <option className="text-black">Junior Coordinator</option>
              <option className="text-black">Senior Coordinator</option>
              <option className="text-black">District Coordinator</option>
              <option className="text-black">State Coordinator</option>
              <option className="text-black">National Coordinator</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="text-white text-sm">Upload Resume / CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white text-sm">Create Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Register as Coordinator 👑
          </button>

        </form>
      </div>
      
           
     </div>

     
    
    
  );
}

