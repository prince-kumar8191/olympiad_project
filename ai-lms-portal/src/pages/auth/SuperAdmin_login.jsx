import React, { useState } from "react";
import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";

function  SuperAdminLogin() {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // yaha backend API call hogi
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-10 w-full max-w-md text-white">

        <div className="flex flex-col items-center mb-6 text-center">
          <FaUserShield size={45} />
          <h2 className="text-3xl font-bold mt-3">
            SuperAdmin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2">SuperAdmin Email</label>

            <div className="flex items-center bg-white/30 rounded-lg px-3">
              <FaEnvelope className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Enter Superadmin email"
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

export default SuperAdminLogin;