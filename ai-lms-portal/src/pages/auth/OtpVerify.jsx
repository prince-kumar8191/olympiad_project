import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OTPVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("admin_email"); // admin email frontend se

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-admin-otp`,
        { email, otp }
      );

      alert(res.data.message); // OTP success ya expired

      if (res.data.message === "Admin Login Successful") {
        navigate("/Admin_Dashboard"); // OTP sahi hai → dashboard
      }

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Invalid OTP / expired
      } else {
        alert("Error connecting to server");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OTPVerify;