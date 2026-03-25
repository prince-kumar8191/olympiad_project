
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// ---------------------- Razorpay dynamic loader ----------------------
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BASE_URL = "http://localhost:5000"; // backend base URL

export default function OlympiadForm() {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const [states, setStates] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const classOptions = ["6", "7", "8", "9", "10", "11", "12"];
  const subjectOptions = ["Mathematics", "Science"];
  const affiliationOptions = {
    School: ["CBSE", "ICSE", "State Board", "IB", "Cambridge"],
    College: ["UGC", "AICTE", "Autonomous", "NAAC"],
    University: ["UGC Recognized", "AICTE", "NAAC", "Deemed"],
  };

  const [formData, setFormData] = useState({
    student_name: "",
    gender: "",
    dob: "",
    class: "",
    subject: "",
    roll_no: "",
    StudentId: "",   // now manual input
    category: "",
    email: "",
    student_phone: "",
    father_name: "",
    mother_name: "",
    parent_phone: "",
    institution_type: "",
    school_name: "",
    institution_code: "",
    affiliation: "",
    principal_name: "",
    coordinator_name: "",
    school_email: "",
    school_phone: "",
    school_address: "",
    state: "",
    city: "",
    pincode: "",
    referredBy: "",
  });

  // ---------------------- Referral Code ----------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  useEffect(() => {
    if (referralCode) {
      setFormData((prev) => ({ ...prev, referredBy: referralCode }));
    }
  }, [referralCode]);

  // ---------------------- States fetch ----------------------
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.states) setStates(data.data.states);
      });
  }, []);

  // ---------------------- Auto Fill from LocalStorage ----------------------
  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    if (student) {
      setFormData((prev) => ({
        ...prev,
        student_name: student.name || "",
        email: student.email || "",
        student_phone: student.phone || "",
        dob: student.dob || "",
      }));
    }
  }, []);

  // ---------------------- Handlers ----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setFormData((prev) => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            setFormData((prev) => ({
              ...prev,
              city: data[0].PostOffice[0].District,
            }));
          }
        });
    }
  };

  // ---------------------- Validation ----------------------
  const validate = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert("⚠️ Please fill all required fields!");
      return false;
    }
    return true;
  };

  // ---------------------- Razorpay Payment ----------------------
  const payNow = async (studentId) => {
    const resScript = await loadRazorpay();
    if (!resScript) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    try {
      const amountInPaise = 1 * 100; // ₹1
      const res = await fetch(`${BASE_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      if (!res.ok) throw new Error("Server error while creating order");

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

          await fetch(`${BASE_URL}/update-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentId: studentId,
              status: "success",
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("Payment Successful ✅");
          navigate("/success");
        },
        modal: {
          ondismiss: async function () {
            await fetch(`${BASE_URL}/update-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ studentId: studentId, status: "unsuccessful" }),
            });
            alert("Payment Cancelled ❌");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function () {
        await fetch(`${BASE_URL}/update-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: studentId, status: "failed" }),
        });
        alert("Payment Failed ❌");
        navigate("/Failed"); // navigate to failed page
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed ❌");
    }
  };

  // ---------------------- Submit Handler ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData);
      const studentId = formData.StudentId; // manual input
      localStorage.setItem("studentId", studentId);

      await axios.post(`${BASE_URL}/update-payment`, {
        studentId: studentId,
        status: "pending",
      });

      const pay = window.confirm(
        "Do you want to pay the registration fee now? Click Cancel to skip."
      );
      if (pay) {
        await payNow(studentId);
      } else {
        await axios.post(`${BASE_URL}/update-payment`, {
          studentId: studentId,
          status: "unsuccessful",
        });
        navigate("/success");
      }

      // Reset form
      setFormData({
        student_name: "",
        gender: "",
        dob: "",
        class: "",
        subject: "",
        roll_no: "",
        StudentId: "",
        category: "",
        email: "",
        student_phone: "",
        father_name: "",
        mother_name: "",
        parent_phone: "",
        institution_type: "",
        school_name: "",
        institution_code: "",
        affiliation: "",
        principal_name: "",
        coordinator_name: "",
        school_email: "",
        school_phone: "",
        school_address: "",
        state: "",
        city: "",
        pincode: "",
        referredBy: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Server Error ❌");
      console.log(err);
    }
  };

  const input = (name) =>
    `border p-3 rounded-lg w-full ${errors[name] ? "border-red-500 bg-red-50" : ""}`;

  const goToLogin = () => navigate("/login");
  const goToSignup = () => navigate("/signup");

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-indigo-600">OlympiadHub</h1>
          <div className="hidden md:flex gap-6 font-semibold">
            <Link to="/">Home</Link>
            <span>Olympiads</span>
            <Link to="/about">About</Link>
            <button onClick={goToLogin} className="border px-4 py-1 rounded">Login</button>
            <button onClick={goToSignup} className="bg-indigo-600 text-white px-4 py-1 rounded">Sign Up</button>
          </div>
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        {menuOpen && (
          <div className="md:hidden p-4 flex flex-col gap-3 bg-white">
            <Link to="/">Home</Link>
            <span>Olympiads</span>
            <Link to="/about">About</Link>
            <button onClick={goToLogin} className="border p-2 rounded">Login</button>
            <button onClick={goToSignup} className="bg-indigo-600 text-white p-2 rounded">Sign Up</button>
          </div>
        )}
      </nav>

      {/* FORM */}
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Olympiad Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* STUDENT DETAILS */}
            <h3 className="text-xl font-semibold">Student Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="student_name" placeholder="Student Name" value={formData.student_name} onChange={handleChange} className={input("student_name")} />
              <select name="gender" value={formData.gender} onChange={handleChange} className={input("gender")}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={input("dob")} />
              <select name="class" value={formData.class} onChange={handleChange} className={input("class")}>
                <option value="">Class</option>
                {classOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select name="subject" value={formData.subject} onChange={handleChange} className={input("subject")}>
                <option value="">Subject</option>
                {subjectOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
              <input name="roll_no" placeholder="Roll No" value={formData.roll_no} onChange={handleChange} className={input("roll_no")} />
              <input name="StudentId" placeholder="Student ID (manual)" value={formData.StudentId} onChange={handleChange} className={input("StudentId")} />
              <select name="category" value={formData.category} onChange={handleChange} className={input("category")}>
                <option value="">Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
              <input name="student_phone" placeholder="Student Phone" value={formData.student_phone} onChange={handleChange} className={input("student_phone")} />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={input("email")} />
            </div>

            {/* PARENT, INSTITUTION, ADDRESS, REFERRAL -- same as before */}


           <h3 className="text-xl font-semibold">Parent Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <input name="father_name" placeholder="Father Name" onChange={handleChange} className={input("father_name")} />
              <input name="mother_name" placeholder="Mother Name" onChange={handleChange} className={input("mother_name")} />
              <input name="parent_phone" placeholder="Parent Phone" onChange={handleChange} className={input("parent_phone")} />
            </div>

            {/* INSTITUTION DETAILS */}
            <h3 className="text-xl font-semibold">Institution/College/School Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <select name="institution_type" onChange={handleChange} className={input("institution_type")}>
                <option value="">Institution/College/School Type</option>
                <option>School</option>
                <option>College</option>
                <option>University</option>
              </select>

              {formData.institution_type && (
                <select name="affiliation" onChange={handleChange} className={input("affiliation")}>
                  <option value="">Affiliation</option>
                  {affiliationOptions[formData.institution_type].map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              )}

              <input name="school_name" placeholder="Institution/College/School Name" onChange={handleChange} className={input("school_name")} />
              <input name="institution_code" placeholder="Institution/College/School Code" onChange={handleChange} className={input("institution_code")} />
              <input name="principal_name" placeholder="Principal Name" onChange={handleChange} className={input("principal_name")} />
              <input name="coordinator_name" placeholder="Coordinator Name" onChange={handleChange} className={input("coordinator_name")} />
              <input name="school_email" placeholder="Institution Email" onChange={handleChange} className={input("school_email")} />
              <input name="school_phone" placeholder="Institution Phone" onChange={handleChange} className={input("school_phone")} />
            </div>

            {/* ADDRESS */}
            <h3 className="text-xl font-semibold">Address Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <select name="state" onChange={handleChange} className={input("state")}>
                <option value="">Select State</option>
                {states.map((s, i) => <option key={i}>{s.name}</option>)}
              </select>
              <input name="pincode" placeholder="Pincode" onChange={handlePincodeChange} className={input("pincode")} />
              <input name="city" value={formData.city} readOnly className={input("city")} />
              <input name="school_address" placeholder="Full Address" onChange={handleChange} className={input("school_address")} />
            </div>

            {/* REFERRAL CODE */}
            <h3 className="text-xl font-semibold">Referral Code (Optional)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="referredBy"
                placeholder="Enter Referral Code (Optional)"
                value={formData.referredBy}
                onChange={handleChange}
                className={input("referredBy")}
              />
            </div>


            <button type="submit" className="bg-blue-600 text-white w-full p-4 rounded-lg text-lg">Submit Registration</button>
          </form>
        </div>
      </div>
    </>
  );
}




















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";

// // ---------------------- Razorpay dynamic loader ----------------------
// const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     if (window.Razorpay) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const BASE_URL = "http://localhost:5000"; // backend base URL

// export default function OlympiadForm() {
//   const navigate = useNavigate();
//   const [referralCode, setReferralCode] = useState("");
//   const [states, setStates] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [errors, setErrors] = useState({});

//   const classOptions = ["6", "7", "8", "9", "10", "11", "12"];
//   const subjectOptions = ["Mathematics", "Science"];
//   const affiliationOptions = {
//     School: ["CBSE", "ICSE", "State Board", "IB", "Cambridge"],
//     College: ["UGC", "AICTE", "Autonomous", "NAAC"],
//     University: ["UGC Recognized", "AICTE", "NAAC", "Deemed"],
//   };

//   const [formData, setFormData] = useState({
//     student_name: "",
//     gender: "",
//     dob: "",
//     class: "",
//     subject: "",
//     roll_no: "",
//     StudentId: "",   // now manual input
//     category: "",
//     email: "",
//     student_phone: "",
//     father_name: "",
//     mother_name: "",
//     parent_phone: "",
//     institution_type: "",
//     school_name: "",
//     institution_code: "",
//     affiliation: "",
//     principal_name: "",
//     coordinator_name: "",
//     school_email: "",
//     school_phone: "",
//     school_address: "",
//     state: "",
//     city: "",
//     pincode: "",
//     referredBy: "",
//   });

//   // ---------------------- Referral Code ----------------------
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const ref = params.get("ref");
//     if (ref) setReferralCode(ref);
//   }, []);

//   useEffect(() => {
//     if (referralCode) {
//       setFormData((prev) => ({ ...prev, referredBy: referralCode }));
//     }
//   }, [referralCode]);

//   // ---------------------- States fetch ----------------------
//   useEffect(() => {
//     fetch("https://countriesnow.space/api/v0.1/countries/states", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ country: "India" }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data?.states) setStates(data.data.states);
//       });
//   }, []);



//   useEffect(() => {
//   const student = JSON.parse(localStorage.getItem("student"));

//   console.log("FORM AUTO FILL DATA:", student); // debug

//   if (student) {
//     setFormData((prev) => ({
//       ...prev,

//       // Personal
//       student_name: student.name || "",
//       email: student.email || "",
//       student_phone: student.phone || "",
//       dob: student.dob || "",
//       gender: student.gender || "",

//       // Education
//       class: student.student_class?.replace("Class ", "") || "",
//       school_name: student.school_name || student.school || "",
//       institution_code: student.school_code || "",

//       // Parents
//       father_name: student.father_name || "",
//       mother_name: student.mother_name || "",
//       parents_mobile: student.parents_mobile || "", // 🔥 FIX

//       // Address
//       state: student.state || "",
//       city: student.city || "",
//       pincode: student.pincode || "",
//       school_address: student.school_address || "",

//       // 🔥 IMPORTANT FIX
//       StudentId: student.studentId || student.StudentId || ""
//     }));
//   }
// }, []);



//   // ---------------------- Handlers ----------------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: false }));
//   };

//   const handlePincodeChange = (e) => {
//     const pin = e.target.value;
//     setFormData((prev) => ({ ...prev, pincode: pin }));
//     if (pin.length === 6) {
//       fetch(`https://api.postalpincode.in/pincode/${pin}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data[0].Status === "Success") {
//             setFormData((prev) => ({
//               ...prev,
//               city: data[0].PostOffice[0].District,
//             }));
//           }
//         });
//     }
//   };

//   // ---------------------- Validation ----------------------
//   const validate = () => {
//     let newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) newErrors[key] = true;
//     });
//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       alert("⚠️ Please fill all required fields!");
//       return false;
//     }
//     return true;
//   };

//   // ---------------------- Razorpay Payment ----------------------
//   const payNow = async (studentId) => {
//     const resScript = await loadRazorpay();
//     if (!resScript) {
//       alert("Razorpay SDK failed to load. Check your internet.");
//       return;
//     }

//     try {
//       const amountInPaise = 1 * 100; // ₹1
//       const res = await fetch(`${BASE_URL}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: amountInPaise }),
//       });

//       if (!res.ok) throw new Error("Server error while creating order");

//       const order = await res.json();

//       const options = {
//         key: "rzp_test_SSLBnarMv2zq8F",
//         amount: order.amount,
//         currency: "INR",
//         order_id: order.id,
//         name: "Olympiad Portal",
//         description: "Olympiad Registration Fee",
//         handler: async function (response) {
//           console.log("Payment Success:", response);

//           await fetch(`${BASE_URL}/update-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               studentId: studentId,
//               status: "success",
//               paymentId: response.razorpay_payment_id,
//             }),
//           });

//           alert("Payment Successful ✅");
//           navigate("/success");
//         },
//         modal: {
//           ondismiss: async function () {
//             await fetch(`${BASE_URL}/update-payment`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ studentId: studentId, status: "unsuccessful" }),
//             });
//             alert("Payment Cancelled ❌");
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       rzp.on("payment.failed", async function () {
//         await fetch(`${BASE_URL}/update-payment`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ studentId: studentId, status: "failed" }),
//         });
//         alert("Payment Failed ❌");
//         navigate("/Failed"); // navigate to failed page
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment failed ❌");
//     }
//   };

//   // ---------------------- Submit Handler ----------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await axios.post(`${BASE_URL}/register`, formData);
//       const studentId = formData.StudentId; // manual input
//       localStorage.setItem("studentId", studentId);

//       await axios.post(`${BASE_URL}/update-payment`, {
//         studentId: studentId,
//         status: "pending",
//       });

//       const pay = window.confirm(
//         "Do you want to pay the registration fee now? Click Cancel to skip."
//       );
//       if (pay) {
//         await payNow(studentId);
//       } else {
//         await axios.post(`${BASE_URL}/update-payment`, {
//           studentId: studentId,
//           status: "unsuccessful",
//         });
//         navigate("/success");
//       }

//       // Reset form
//       setFormData({
//         student_name: "",
//         gender: "",
//         dob: "",
//         class: "",
//         subject: "",
//         roll_no: "",
//         StudentId: "",
//         category: "",
//         email: "",
//         student_phone: "",
//         father_name: "",
//         mother_name: "",
//         parents_mobile: "",
//         institution_type: "",
//         school_name: "",
//         institution_code: "",
//         affiliation: "",
//         principal_name: "",
//         coordinator_name: "",
//         school_email: "",
//         school_phone: "",
//         school_address: "",
//         state: "",
//         city: "",
//         pincode: "",
//         referredBy: "",
//       });
//     } catch (err) {
//       alert(err.response?.data?.error || "Server Error ❌");
//       console.log(err);
//     }
//   };

//   const input = (name) =>
//     `border p-3 rounded-lg w-full ${errors[name] ? "border-red-500 bg-red-50" : ""}`;

//   const goToLogin = () => navigate("/login");
//   const goToSignup = () => navigate("/signup");

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="bg-white shadow sticky top-0 z-50">
//         <div className="flex justify-between items-center px-6 py-4">
//           <h1 className="text-xl font-bold text-indigo-600">OlympiadHub</h1>
//           <div className="hidden md:flex gap-6 font-semibold">
//             <Link to="/">Home</Link>
//             <span>Olympiads</span>
//             <Link to="/about">About</Link>
//             <button onClick={goToLogin} className="border px-4 py-1 rounded">Login</button>
//             <button onClick={goToSignup} className="bg-indigo-600 text-white px-4 py-1 rounded">Sign Up</button>
//           </div>
//           <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
//         </div>
//         {menuOpen && (
//           <div className="md:hidden p-4 flex flex-col gap-3 bg-white">
//             <Link to="/">Home</Link>
//             <span>Olympiads</span>
//             <Link to="/about">About</Link>
//             <button onClick={goToLogin} className="border p-2 rounded">Login</button>
//             <button onClick={goToSignup} className="bg-indigo-600 text-white p-2 rounded">Sign Up</button>
//           </div>
//         )}
//       </nav>

//       {/* FORM */}
//       <div className="bg-gray-100 min-h-screen p-6">
//         <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-3xl font-bold text-center mb-8">Olympiad Registration Form</h2>
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* STUDENT DETAILS */}
//             <h3 className="text-xl font-semibold">Student Details</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <input name="student_name" placeholder="Student Name" value={formData.student_name} onChange={handleChange} className={input("student_name")} />
//               <select name="gender" value={formData.gender} onChange={handleChange} className={input("gender")}>
//                 <option value="">Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//               </select>
//               <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={input("dob")} />
//               <select name="class" value={formData.class} onChange={handleChange} className={input("class")}>
//                 <option value="">Class</option>
//                 {classOptions.map((c) => <option key={c}>{c}</option>)}
//               </select>
//               <select name="subject" value={formData.subject} onChange={handleChange} className={input("subject")}>
//                 <option value="">Subject</option>
//                 {subjectOptions.map((s) => <option key={s}>{s}</option>)}
//               </select>
//               <input name="roll_no" placeholder="Roll No" value={formData.roll_no} onChange={handleChange} className={input("roll_no")} />
//               <input name="StudentId" placeholder="Student ID (manual)" value={formData.StudentId} onChange={handleChange} className={input("StudentId")} />
//               <select name="category" value={formData.category} onChange={handleChange} className={input("category")}>
//                 <option value="">Category</option>
//                 <option>General</option>
//                 <option>OBC</option>
//                 <option>SC</option>
//                 <option>ST</option>
//               </select>
//               <input name="student_phone" placeholder="Student Phone" value={formData.student_phone} onChange={handleChange} className={input("student_phone")} />
//               <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={input("email")} />
//             </div>

//             {/* PARENT, INSTITUTION, ADDRESS, REFERRAL -- same as before */}


//            <h3 className="text-xl font-semibold">Parent Details</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <input name="father_name" placeholder="Father Name"  value={formData.father_name}  onChange={handleChange} className={input("father_name")} />
//               <input name="mother_name" placeholder="Mother Name" value={formData.mother_name} onChange={handleChange} className={input("mother_name")} />
//               <input name="parent_phone" placeholder="Parent Phone" value={formData.parent_phone}  onChange={handleChange} className={input("parent_phone")} />
//             </div>

//             {/* INSTITUTION DETAILS */}
//             <h3 className="text-xl font-semibold">Institution/College/School Details</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <select name="institution_type" onChange={handleChange} className={input("institution_type")}>
//                 <option value="">Institution/College/School Type</option>
//                 <option>School</option>
//                 <option>College</option>
//                 <option>University</option>
//               </select>

//               {formData.institution_type && (
//                 <select name="affiliation" onChange={handleChange} className={input("affiliation")}>
//                   <option value="">Affiliation</option>
//                   {affiliationOptions[formData.institution_type].map((a) => (
//                     <option key={a}>{a}</option>
//                   ))}
//                 </select>
//               )}

//               <input name="school_name" value={formData.school_name}  placeholder="Institution/College/School Name" onChange={handleChange} className={input("school_name")} />
//               <input name="institution_code" placeholder="Institution/College/School Code" onChange={handleChange} className={input("institution_code")} />
//               <input name="principal_name" placeholder="Principal Name" onChange={handleChange} className={input("principal_name")} />
//               <input name="coordinator_name" placeholder="Coordinator Name" onChange={handleChange} className={input("coordinator_name")} />
//               <input name="school_email" placeholder="Institution Email" onChange={handleChange} className={input("school_email")} />
//               <input name="school_phone" placeholder="Institution Phone" onChange={handleChange} className={input("school_phone")} />
//             </div>

//             {/* ADDRESS */}
//             <h3 className="text-xl font-semibold">Address Details</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <select name="state" value={formData.state} onChange={handleChange} className={input("state")}>
//                 <option value="">Select State</option>
//                 {states.map((s, i) => <option key={i}>{s.name}</option>)}
//               </select>
//               <input name="pincode" placeholder="Pincode" value={formData.pincode}  onChange={handlePincodeChange} className={input("pincode")} />
//               <input name="city" value={formData.city} readOnly className={input("city")} />
//               <input name="school_address" placeholder="Full Address" onChange={handleChange} className={input("school_address")} />
//             </div>

//             {/* REFERRAL CODE */}
//             <h3 className="text-xl font-semibold">Referral Code (Optional)</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <input
//                 name="referredBy"
//                 placeholder="Enter Referral Code (Optional)"
//                 value={formData.referredBy}
//                 onChange={handleChange}
//                 className={input("referredBy")}
//               />
//             </div>


//             <button type="submit" className="bg-blue-600 text-white w-full p-4 rounded-lg text-lg">Submit Registration</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }