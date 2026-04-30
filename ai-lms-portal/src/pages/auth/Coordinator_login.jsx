



import React, { useState } from "react";
import { FaUserTie, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CoordinatorLogin() {

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
        `${import.meta.env.VITE_API_URL}/coordinator-login`,
        form
      );

      console.log("Login Response:", res.data);
      console.log("Saved:", res.data.referralCode);

      alert(res.data.message);

      // email save
      localStorage.setItem("CoordinatorEmail", res.data.email);
      localStorage.setItem("CoordinatorReferralCode", res.data.referralCode);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "coordinator");
      localStorage.setItem("coordinatorLogin", "true");


      // redirect dashboard AFTER SUCCESS LOGIN
      navigate("/Coordinator_Dashboard");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed ❌");

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-6 text-center">
          <FaUserTie size={45} />
          <h2 className="text-3xl font-bold mt-3 leading-tight">
            Coordinator Login
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

export default CoordinatorLogin;