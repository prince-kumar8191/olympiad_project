import React from "react";
import { useNavigate } from "react-router-dom";

const WaitingApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">

      {/* ICON */}
      <div className="text-6xl mb-6 animate-pulse">⏳</div>

      {/* MAIN TEXT */}
      <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Waiting for Admin Approval
      </h1>

      {/* SUBTEXT */}
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
        Your account has been created successfully. Please wait until the admin approves your request.
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-lg"
      >
        🏠 Go to Home
      </button>
    </div>
  );
};

export default WaitingApproval;