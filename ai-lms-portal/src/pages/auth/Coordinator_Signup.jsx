



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CoordinatorSignup() {
  const navigate = useNavigate();

  // 🔹 Unique Coordinator ID Generator
  const generateCoordinatorId = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().slice(-2);
    return `CO-${year}${random}`;
  };

  const [form, setForm] = useState({
    coordinatorId: "",
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    AreaOfExperience: "",
    roleType: "",
    qualification: "",
    experience: "",
    password: "",
    confirmPassword: "",
    resume: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [states, setStates] = useState([]);
  const [loadingPincode, setLoadingPincode] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      coordinatorId: generateCoordinatorId(),
    }));

    // 🔥 India States Load
    fetchStates();
  }, []);

  // 🔥 API se states load
  const fetchStates = async () => {
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states");
      const data = await res.json();

      const india = data.data.find((country) => country.name === "India");

      if (india && india.states) {
        const stateNames = india.states.map((s) => s.name);
        setStates(stateNames);
      }
    } catch (error) {
      console.error("States fetch error:", error);

      // fallback list agar API fail ho jaye
      setStates([
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi",
        "Jammu and Kashmir",
        "Ladakh",
        "Lakshadweep",
        "Puducherry",
      ]);
    }
  };

  // 🔥 Normal input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Pincode change + city/state auto fetch
  const handlePincodeChange = async (e) => {
    const pin = e.target.value.replace(/\D/g, ""); // only digits

    setForm((prev) => ({
      ...prev,
      pincode: pin,
    }));

    if (pin.length === 6) {
      try {
        setLoadingPincode(true);

        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();

        const result = data?.[0];

        if (
          result?.Status === "Success" &&
          result?.PostOffice &&
          result.PostOffice.length > 0
        ) {
          const postOffice = result.PostOffice[0];

          setForm((prev) => ({
            ...prev,
            pincode: pin,
            city: postOffice.District || "",
            state: postOffice.State || "",
          }));
        } else {
          alert("Invalid Pincode ❌");
          setForm((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
        }
      } catch (error) {
        console.error("Pincode fetch error:", error);
        alert("Pincode fetch failed ❌");
      } finally {
        setLoadingPincode(false);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        city: "",
        state: "",
      }));
    }
  };

  // Resume Upload
  const handleFileChange = (e) => {
    setForm({
      ...form,
      resume: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!accepted) {
      alert("Please accept the Terms and Conditions");
      return;
    }

    const formData = new FormData();

    formData.append("coordinatorId", form.coordinatorId);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("mobile", form.mobile);
    formData.append("pincode", form.pincode);
    formData.append("city", form.city);
    formData.append("state", form.state);
    formData.append("AreaOfExperience", form.AreaOfExperience);
    formData.append("roleType", form.roleType);
    formData.append("qualification", form.qualification);
    formData.append("experience", form.experience);
    formData.append("password", form.password);
    formData.append("resume", form.resume);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register-coordinator`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Coordinator Registered Successfully 👑. Waiting for Admin approval");

        // 🔹 email save
        localStorage.setItem("oordinatorEmail", form.email);

        // 🔹 open dashboard
        navigate("/Waiting");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      {/* // <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"> */}

      <div className="bg-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-4xl p-10 border border-white/30">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Coordinator Registration 👑
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Coordinator ID */}
          <div>
            <label className="block text-white text-sm mb-1">
              Your Unique Coordinator ID
            </label>
            <input
              type="text"
              value={form.coordinatorId}
              readOnly
              className="w-full p-3 rounded-xl bg-white/30 text-white font-semibold border border-white/40"
            />
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="text-white text-sm">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={form.mobile}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* 🔥 PINCODE + CITY */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={form.pincode}
                maxLength={6}
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handlePincodeChange}
                required
              />
              {loadingPincode && (
                <p className="text-sm text-white mt-2">Fetching city/state...</p>
              )}
            </div>

            <div>
              <label className="text-white text-sm">District</label>
              <input
                type="text"
                name="city"
                placeholder="District auto-filled"
                value={form.city}
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 🔥 STATE DROPDOWN */}
          <div>
            <label className="text-white text-sm">State</label>
            <select
              name="state"
              value={form.state}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">
                Select State
              </option>
              {states.map((state, index) => (
                <option key={index} value={state} className="text-black">
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Qualification */}
          <div>
            <label className="text-white text-sm">Qualification</label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              value={form.qualification}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="text-white text-sm">Work Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="Example: 2 Years Teaching"
              value={form.experience}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-white text-sm">Area Of Experience</label>
            <select
              name="AreaOfExperience"
              value={form.AreaOfExperience}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">
                Area Of Experience
              </option>
              <option value="Education" className="text-black">Education</option>
              <option value="Event Management" className="text-black">Event Management</option>
              <option value="Social Media" className="text-black">Social Media</option>
              <option value="Technical" className="text-black">Technical</option>
            </select>
          </div>

          {/* Role Type */}
          <div>
            <label className="text-white text-sm">Role Type</label>
            <select
              name="roleType"
              value={form.roleType}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
              onChange={handleChange}
              required
            >
              <option value="" className="text-black">Select Role</option>
              <option value="Village Coordinator" className="text-black">
                Village Coordinator
              </option>
            </select>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="text-white text-sm">Upload Resume / CV (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 file:bg-pink-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white text-sm">Create Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2 flex items-start gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
              required
            />
            <label className="text-white text-sm">
              I hereby agree to share my detail for for purpose mention over here and and read the Terms and Conditions policy of the organisation listed below.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Register as Coordinator 👑
          </button>
        </form>
      </div>
    </div>
  );
}