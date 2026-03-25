
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Navigation

// export default function VolunteerSignup() {
//   const navigate = useNavigate();

//   // 🔹 Unique Volunteer ID Generator
//   const generateVolunteerId = () => {
//     const random = Math.floor(1000 + Math.random() * 9000);
//     const year = new Date().getFullYear().toString().slice(-2);
//     return `VOL-${year}${random}`;
//   };

//   const [form, setForm] = useState({
//     volunteerId: "",
//     name: "",
//     email: "",
//     mobile: "",
//     qualification: "",
//     skills: [],
//     availability: "",
//     password: "",
//     resume: null,
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     setForm((prev) => ({
//       ...prev,
//       volunteerId: generateVolunteerId(),
//     }));
//   }, []);

//   const skillOptions = [
//     "Teaching",
//     "Management",
//     "Social Media",
//     "IT Support",
//     "Event Handling",
//   ];

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSkillChange = (skill) => {
//     if (form.skills.includes(skill)) {
//       setForm({
//         ...form,
//         skills: form.skills.filter((s) => s !== skill),
//       });
//     } else {
//       setForm({
//         ...form,
//         skills: [...form.skills, skill],
//       });
//     }
//   };

//   const handleFileChange = (e) => {
//     setForm({
//       ...form,
//       resume: e.target.files[0],
//     });
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("volunteerId", form.volunteerId);
  //   formData.append("name", form.name);
  //   formData.append("email", form.email);
  //   formData.append("mobile", form.mobile);
  //   formData.append("qualification", form.qualification);
  //   formData.append("skills", form.skills.join(", "));
  //   formData.append("availability", form.availability);
  //   formData.append("password", form.password);
  //   if (form.resume) formData.append("resume", form.resume);

  //   try {
  //     const res = await fetch("http://localhost:5000/register-volunteer", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     alert(data.message);

  //     if (res.ok) {
  //       // ✅ Navigate to Student Dashboard after registration
  //       navigate("/Volunteer_Dashboard");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Registration Failed");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("volunteerId", form.volunteerId);
  //   formData.append("name", form.name);
  //   formData.append("email", form.email);
  //   formData.append("mobile", form.mobile);
  //   formData.append("qualification", form.qualification);
  //   formData.append("skills", form.skills.join(", "));
  //   formData.append("availability", form.availability);
  //   formData.append("password", form.password);
  //   if (form.resume) formData.append("resume", form.resume);

  //   try {
  //     // 🔹 Signup first
  //     const res = await fetch("http://localhost:5000/register-volunteer", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     alert(data.message);

  //     if (res.ok) {
  //       // 🔹 Auto login after signup
  //       const loginRes = await fetch("http://localhost:5000/volunteer-login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           email: form.email,
  //           password: form.password
  //         }),
  //       });

  //       const loginData = await loginRes.json();

  //       if (loginRes.ok) {
  //         // 🔹 Save email for profile fetch
  //         localStorage.setItem("volunteerEmail", loginData.email);

  //         // 🔹 Navigate to dashboard
  //         navigate("/Volunteer_Dashboard");
  //       } else {
  //         alert(loginData.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Registration Failed");
  //   }
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (key === "skills") formData.append(key, value.join(", "));
//       else if (key === "resume" && value) formData.append(key, value);
//       else formData.append(key, value);
//     });

//     try {
//       const res = await fetch("http://localhost:5000/register-volunteer", {
//         method: "POST",
//         body: formData
//       });

//       const data = await res.json();
//       alert(data.message);

//       if (res.ok) {
//         // 🔹 Auto login
//         const loginRes = await fetch("http://localhost:5000/volunteer-login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: form.email,
//             password: form.password
//           })
//         });
//         const loginData = await loginRes.json();

//         if (loginRes.ok) {
//           localStorage.setItem("volunteerEmail", form.email);
//           navigate("/Volunteer_Dashboard");
//         } else {
//           alert(loginData.message);
//         }
//       }

//     } catch (err) {
//       console.error(err);
//       alert("Registration Failed");
//     }
//   }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
//       <div className="bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-white/30">
//         <h2 className="text-4xl font-bold text-center text-white mb-8">
//           Volunteer Registration 🚀
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-white text-sm mb-1">
//               Your Unique Volunteer ID
//             </label>
//             <input
//               type="text"
//               name="volunteerId"
//               value={form.volunteerId}
//               readOnly
//               className="w-full p-3 rounded-xl bg-white/30 text-white font-semibold border border-white/40"
//             />
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-white text-sm">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
//                 className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-white text-sm">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-white text-sm">Mobile Number</label>
//             <input
//               type="text"
//               name="mobile"
//               placeholder="Enter mobile number"
//               className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm">Qualification</label>
//             <select
//               name="qualification"
//               value={form.qualification}
//               className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
//               onChange={handleChange}
//               required
//             >
//               <option value="" className="text-black">
//                 Select Qualification
//               </option>
//               <option className="text-black">10th</option>
//               <option className="text-black">12th</option>
//               <option className="text-black">Graduate</option>
//               <option className="text-black">Post Graduate</option>
//             </select>
//           </div>

//           <div>
//             <p className="text-white font-semibold mb-3">Select Skills</p>
//             <div className="grid md:grid-cols-3 gap-4">
//               {skillOptions.map((skill) => (
//                 <label
//                   key={skill}
//                   className="flex items-center space-x-2 bg-white/20 p-3 rounded-xl cursor-pointer hover:bg-pink-400/40 transition"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={form.skills.includes(skill)}
//                     onChange={() => handleSkillChange(skill)}
//                     className="accent-pink-500"
//                   />
//                   <span className="text-white">{skill}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="text-white text-sm">Availability</label>
//             <select
//               name="availability"
//               value={form.availability}
//               className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
//               onChange={handleChange}
//               required
//             >
//               <option value="" className="text-black">
//                 Select Availability
//               </option>
//               <option className="text-black">Weekdays</option>
//               <option className="text-black">Weekends</option>
//               <option className="text-black">Full Time</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-white text-sm">Upload Resume / CV (PDF)</label>
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg"
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="text-white text-sm">Create Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Enter password"
//               className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               className="absolute right-4 top-9 text-white text-sm"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
//           >
//             Register as Volunteer 🎯
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VolunteerSignup() {
  const navigate = useNavigate();

  const generateVolunteerId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().slice(-2);
    return `VOL-${year}${random}`;
  };

  const [form, setForm] = useState({
    volunteerId: "",
    name: "",
    email: "",
    mobile: "",
    qualification: "",
    skills: [],
    availability: "",
    password: "",
    resume: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      volunteerId: generateVolunteerId(),
    }));
  }, []);

  const skillOptions = [
    "Teaching",
    "Management",
    "Social Media",
    "IT Support",
    "Event Handling",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill) => {
    if (form.skills.includes(skill)) {
      setForm({
        ...form,
        skills: form.skills.filter((s) => s !== skill),
      });
    } else {
      setForm({
        ...form,
        skills: [...form.skills, skill],
      });
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("volunteerId", form.volunteerId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("qualification", form.qualification);
    formData.append("skills", form.skills.join(","));
    formData.append("availability", form.availability);
    formData.append("password", form.password);
    if (form.resume) formData.append("resume", form.resume);

    try {
      const res = await fetch("http://localhost:5000/register-volunteer", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {

        alert("Registration Successful. Waiting for admin approval.");

        navigate("/volunteer_login");

      } else {

        alert(data.message);

      }

    } catch (error) {
      console.error("Error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-white/30">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Volunteer Registration 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-white text-sm mb-1">
              Your Unique Volunteer ID
            </label>
            <input
              type="text"
              name="volunteerId"
              value={form.volunteerId}
              readOnly
              className="w-full p-3 rounded-xl bg-white/30 text-white font-semibold border border-white/40"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="text-white text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="text-white text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

          </div>

          <div>
            <label className="text-white text-sm">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="text-white text-sm">Qualification</label>
            <select
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="" className="text-black">Select Qualification</option>
              <option className="text-black">10th</option>
              <option className="text-black">12th</option>
              <option className="text-black">Graduate</option>
              <option className="text-black">Post Graduate</option>
            </select>
          </div>

          <div>
            <p className="text-white font-semibold mb-3">Select Skills</p>
            <div className="grid md:grid-cols-3 gap-4">

              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center space-x-2 bg-white/20 p-3 rounded-xl cursor-pointer hover:bg-pink-400/40 transition"
                >
                  <input
                    type="checkbox"
                    checked={form.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="accent-pink-500"
                  />
                  <span className="text-white">{skill}</span>
                </label>
              ))}

            </div>
          </div>

          <div>
            <label className="text-white text-sm">Availability</label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="" className="text-black">Select Availability</option>
              <option className="text-black">Weekdays</option>
              <option className="text-black">Weekends</option>
              <option className="text-black">Full Time</option>
            </select>
          </div>

          <div>
            <label className="text-white text-sm">
              Upload Resume / CV (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg"
            />
          </div>

          <div className="relative">
            <label className="text-white text-sm">Create Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="button"
              className="absolute right-4 top-9 text-white text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Register as Volunteer 🎯
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}