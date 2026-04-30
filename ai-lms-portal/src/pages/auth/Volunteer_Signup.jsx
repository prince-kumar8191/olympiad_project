import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    pincode: "",
    city: "",
    state: "",
    qualification: "",
    skills: [],
    availability: "",
    password: "",
    resume: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [loadingPincode, setLoadingPincode] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      volunteerId: generateVolunteerId(),
    }));

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

      // fallback list
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
    formData.append("pincode", form.pincode);
    formData.append("city", form.city);
    formData.append("state", form.state);
    formData.append("qualification", form.qualification);
    formData.append("skills", form.skills.join(","));
    formData.append("availability", form.availability);
    formData.append("password", form.password);
    if (form.resume) formData.append("resume", form.resume);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register-volunteer`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful. Waiting for admin approval.");
        navigate("/Waiting");
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

          {/* 🔥 PINCODE + CITY */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-white text-sm">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={form.pincode}
                onChange={handlePincodeChange}
                maxLength={6}
                required
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          {/* 🔥 STATE DROPDOWN */}
          <div>
            <label className="text-white text-sm">State</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              <option value="10th" className="text-black">10th</option>
              <option value="12th" className="text-black">12th</option>
              <option value="Post Graduate" className="text-black">Diploma</option>
              <option value="Graduate" className="text-black">Graduate</option>
              <option value="Post Graduate" className="text-black">Post Graduate</option>
              <option value="Post Graduate" className="text-black">Master Degree</option>
              <option value="Post Graduate" className="text-black">PHD</option>
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
              <option value="Weekdays" className="text-black">Weekdays</option>
              <option value="Weekends" className="text-black">Weekends</option>
              <option value="Full Time" className="text-black">Full Time</option>
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
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg"
          >
            Register as Volunteer 🎯
          </button>
        </form>
      </div>
    </div>

  );
}