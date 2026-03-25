// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PaymentPage() {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const studentId = location.state?.studentId;

//   const payNow = async () => {

//     const res = await fetch("http://localhost:5000/create-order",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify({
//         amount:299
//       })
//     })

//     const order = await res.json()

//     const options = {
//       key: "rzp_live_SF6LUag8RAirKb",
//       amount: order.amount,
//       currency: "INR",
//       order_id: order.id,
//       name: "Olympiad Portal",
//       description: "Olympiad Registration Fee",

//       handler: function (response) {

//         alert("Payment Successful ✅")

//         navigate("/success")
//       }
//     }

//     const rzp = new window.Razorpay(options)
//     rzp.open()
//   }

//   const skipPayment = () => {

//     alert("Registration Completed Without Payment")

//     navigate("/success")

//   }

//   return (

//     <div className="flex flex-col items-center justify-center h-screen gap-6">

//       <h1 className="text-3xl font-bold">
//         Olympiad Registration Payment
//       </h1>

//       <button
//         onClick={payNow}
//         className="bg-green-600 text-white px-6 py-3 rounded"
//       >
//         Pay ₹1
//       </button>

//       <button
//         onClick={skipPayment}
//         className="bg-gray-400 text-white px-6 py-3 rounded"
//       >
//         Skip Payment
//       </button>

//     </div>

//   );
// }












// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PaymentPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const studentId = location.state?.studentId;

//   const payNow = async () => {
//     try {
//       // Razorpay me amount hamesha paise me bhejna hota hai
//       const amountInPaise = 1 * 100; // 1 ₹ = 100 paise

//       const res = await fetch("http://localhost:5000/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           amount: amountInPaise
//         })
//       });

//       if (!res.ok) {
//         throw new Error("Server error while creating order");
//       }

//       const order = await res.json();

//       const options = {
//         key: "rzp_live_SF6LUag8RAirKb", // Test/live key dhyaan se use karo
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,
//         name: "Olympiad Portal",
//         description: "Olympiad Registration Fee",
//         handler: function (response) {
//           alert("Payment Successful ✅");
//           navigate("/success");
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed. Check console for details");
//     }
//   };

//   const skipPayment = () => {
//     alert("Registration Completed Without Payment");
//     navigate("/success");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-6">
//       <h1 className="text-3xl font-bold">Olympiad Registration Payment</h1>

//       <button
//         onClick={payNow}
//         className="bg-green-600 text-white px-6 py-3 rounded"
//       >
//         Pay ₹1
//       </button>

//       <button
//         onClick={skipPayment}
//         className="bg-gray-400 text-white px-6 py-3 rounded"
//       >
//         Skip Payment
//       </button>
//     </div>
//   );
// }















// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PaymentPage() {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const studentId = location.state?.studentId;

//   const payNow = async () => {

//     try {

//       const amountInPaise = 1 * 100;

//       const res = await fetch("http://localhost:5000/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           amount: amountInPaise
//         })
//       });

//       if (!res.ok) {
//         throw new Error("Server error while creating order");
//       }

//       const order = await res.json();

//       const options = {

//         key: "rzp_live_SF6LUag8RAirKb",
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,
//         name: "Olympiad Portal",
//         description: "Olympiad Registration Fee",

//         // ✅ PAYMENT SUCCESS
//         handler: async function (response) {

//           await fetch("http://localhost:5000/update-payment", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               studentId: studentId,
//               status: "success",
//               paymentId: response.razorpay_payment_id
//             })
//           });

//           alert("Payment Successful ✅");
//           navigate("/success");
//         },

//         // ✅ PAYMENT WINDOW CLOSE
//         modal: {
//           ondismiss: async function () {

//             await fetch("http://localhost:5000/update-payment", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify({
//                 studentId: studentId,
//                 status: "unsuccessful"
//               })
//             });

//             alert("Payment Cancelled ❌");
//           }
//         }
//       };

//       const rzp = new window.Razorpay(options);

//       // ✅ PAYMENT FAILED EVENT
//       rzp.on("payment.failed", async function () {

//         await fetch("http://localhost:5000/update-payment", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             studentId: studentId,
//             status: "unsuccessful"
//           })
//         });

//         alert("Payment Failed ❌");
//       });

//       rzp.open();

//     } catch (err) {

//       console.error("Payment error:", err);
//       alert("Payment failed. Check console for details");

//     }

//   };

//   const skipPayment = () => {

//     alert("Registration Completed Without Payment");
//     navigate("/success");

//   };

//   return (

//     <div className="flex flex-col items-center justify-center h-screen gap-6">

//       <h1 className="text-3xl font-bold">
//         Olympiad Registration Payment
//       </h1>

//       <button
//         onClick={payNow}
//         className="bg-green-600 text-white px-6 py-3 rounded"
//       >
//         Pay ₹1
//       </button>

//       <button
//         onClick={skipPayment}
//         className="bg-gray-400 text-white px-6 py-3 rounded"
//       >
//         Skip Payment
//       </button>

//     </div>

//   );

// }

















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

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const order = await res.json();

      const options = {

        key: "rzp_test_SSLBnarMv2zq8F",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Olympiad Portal",
        description: "Olympiad Registration Fee",

        handler: async function (response) {

          console.log("Payment Success:", response);
          console.log("StudentId:", studentId);

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

          alert("Payment Successful ✅");
          navigate("/Success");
        },

        modal: {
          ondismiss: async function () {

            await fetch("http://localhost:5000/update-payment", {
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

        await fetch("http://localhost:5000/update-payment", {
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