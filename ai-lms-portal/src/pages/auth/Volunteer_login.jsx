





import React, { useState } from "react";
import { FaHandsHelping, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VolunteerLogin() {

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

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/volunteer-login`,
        form
      );

      if (response.status === 200) {

        alert(response.data.message);

        // ✅ EMAIL SAVE FOR DASHBOARD / PROFILE / EDIT PROFILE
        localStorage.setItem("VolunteerEmail", response.data.email);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "volunteer");
        localStorage.setItem("volunteerLogin", "true");

        // optional: pura volunteer data bhi save kar sakta hai
        localStorage.setItem(
          "volunteerData",
          JSON.stringify(response.data)
        );

        navigate("/Volunteer_Dashboard");

      }

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Server Error");

      }

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-6 text-center">
          <FaHandsHelping size={45} />
          <h2 className="text-3xl font-bold mt-3 leading-tight">
            Volunteer Login
          </h2>
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
                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
                required
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
                className="bg-transparent outline-none w-full py-3 text-white placeholder-white/70"
                required
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

export default VolunteerLogin;