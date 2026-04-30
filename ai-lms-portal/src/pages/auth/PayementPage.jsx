






import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX: state + localStorage dono use
  const studentId =
    location.state?.studentId || localStorage.getItem("studentId");

  const payNow = async () => {

    if (!studentId) {
      alert("Student ID missing ❌");
      return;
    }

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const order = await res.json();

      const options = {

        key: "rzp_test_SXSRaYXP2vwXGu",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Olympiad Portal",
        description: "Olympiad Registration Fee",

        handler: async function (response) {

          console.log("Payment Success:", response);
          console.log("StudentId:", studentId);

          await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
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

          alert("Payment Successful ✅");
          navigate("/Success");
        },

        modal: {
          ondismiss: async function () {

            await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                studentId: studentId,
                status: "unsuccessful"
              })
            });

            alert("Payment Cancelled ❌");
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function () {

        await fetch(`${import.meta.env.VITE_API_URL}/update-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            studentId: studentId,
            status: "unsuccessful"
          })
        });

        alert("Payment Failed ❌");
      });

      rzp.open();

    } catch (err) {

      console.error("Payment error:", err);
      alert("Payment failed ❌");

    }

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <h1 className="text-3xl font-bold">
        Olympiad Registration Payment
      </h1>

      <button
        onClick={payNow}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay ₹1
      </button>

    </div>
  );
}