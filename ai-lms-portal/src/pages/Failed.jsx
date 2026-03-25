// PaymentFailed.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/Student_Dashboard"); // student dashboard route
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed ❌</h1>
        <p className="text-gray-700 mb-6">
          Your payment could not be processed. Please try again or contact support.
        </p>
        <button
          onClick={goToDashboard}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}