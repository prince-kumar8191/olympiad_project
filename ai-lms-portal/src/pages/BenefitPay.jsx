
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function BenefitPay() {

  const [status, setStatus] = useState(null);
  const studentId = localStorage.getItem("studentId");

  // 🔹 Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 🔹 Fetch payment status
  useEffect(() => {

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/get-payment-status/${studentId}`);
        const data = await res.json();

        console.log("STATUS API:", data);

        const paymentStatus = (data.payment_status || "").toLowerCase().trim();

        if (paymentStatus === "success") {
          setStatus("success");
        } else {
          setStatus("pending");
        }

      } catch (err) {
        console.error(err);
        setStatus("pending");
      }
    };

    if (studentId) fetchStatus();

  }, [studentId]);

  // 🔥 BLOCK SUCCESS USERS
  if (status === "success") {
    alert("Already paid! You can claim your benefits.");
    return <Navigate to="/Student_Dashboard" replace />;
  }

  // 🔥 LOADING
  if (status === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // 🔹 Pay Now Function (REAL RAZORPAY)
  const payNow = async () => {

    const razorLoaded = await loadRazorpay();

    if (!razorLoaded) {
      alert("Razorpay failed to load");
      return;
    }

    try {

      // 🔹 Create order
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: 1 })
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SSLBnarMv2zq8F",
        amount: order.amount,
        currency: "INR",
        name: "Bhayat Foundation",
        description: "Registration Fee",
        order_id: order.id,

        handler: async function (response) {

          // 🔥 Update backend
          await fetch("http://localhost:5000/update-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              studentId: studentId,
              status: "success",
              paymentId: response.razorpay_payment_id
            })
          });

          alert("Payment Successful 🎉");

          // 🔥 instant UI update
          setStatus("success");
        },

        prefill: {
          name: "Student",
          email: "test@gmail.com"
        },

        theme: {
          color: "#6366f1"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500">

      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl w-full max-w-2xl text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Benefits & Payment
        </h1>

        <ul className="space-y-3 mb-6">
          <li>✅ Referral Points System</li>
          <li>✅ Olympiad Access</li>
          <li>✅ Mock Tests</li>
          <li>✅ Skill Tests</li>
        </ul>

        {/* ONLY PENDING USER SEES BUTTON */}
        {status === "pending" && (
          <button
            onClick={payNow}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl font-bold"
          >
            Pay ₹1 Now
          </button>
        )}

      </div>
    </div>
  );
}