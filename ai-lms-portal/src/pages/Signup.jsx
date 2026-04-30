import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Signup() {
  const navigate = useNavigate();



  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, form);

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    }
  };

  return (

    <form onSubmit={handelsubmit}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="border p-2 mb-4 w-64"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-64"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-64"
          onChange={handleChange}
          required
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded mb-4">
          Create Account
        </button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>
    </form>
  );
}

export default Signup;