import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Success() {

  const navigate = useNavigate();
  const location = useLocation();

  // optional: paymentId pass kare to dikha sakte ho
  const paymentId = location.state?.paymentId;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-green-50">

      <h1 className="text-4xl font-bold text-green-700">
        Payment Successful ✅
      </h1>

      <p className="text-lg text-gray-700">
        Your registration has been completed successfully.
      </p>

      {paymentId && (
        <p className="text-sm text-gray-600">
          Payment ID: {paymentId}
        </p>
      )}

      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Go to Home
      </button>

    </div>
  );
}