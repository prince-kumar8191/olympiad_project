import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PaidUnpaid() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // localStorage se student data
  const student = JSON.parse(localStorage.getItem("student") || "{}");
  const studentId = student?.StudentId;

  useEffect(() => {
    if (studentId) {
      fetchPaymentStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchPaymentStatus = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/${studentId}`
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <div className="w-[380px] p-6 rounded-2xl shadow-2xl border border-gray-700 bg-gray-900">

        <h1 className="text-2xl font-bold text-center mb-6 text-cyan-400">
          Payment Status
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : data ? (
          <div className="space-y-3">

            {/* NAME */}
            <div className="p-3 bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-lg font-bold">{data.name}</p>
            </div>

            {/* CLASS */}
            <div className="p-3 bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-400">Class</p>
              <p className="text-lg font-bold">{data.class}</p>
            </div>

            {/* STUDENT ID */}
            <div className="p-3 bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-400">Student ID</p>
              <p className="text-lg font-bold">{data.studentId}</p>
            </div>

            {/* PAYMENT STATUS */}
            <div className="p-3 bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-400">Payment Status</p>

              <p
                className={`text-xl font-bold mt-1 ${
                  data.payment_status === "paid"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {data.payment_status?.toUpperCase()}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-center text-red-400">
            Student not found
          </p>
        )}

      </div>

    </div>
  );
}