



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function SchoolSignup() {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [accepted, setAccepted] = useState(false);

  // 🔥 SCHOOL CODE (backend se ayega)
  const [schoolCode, setSchoolCode] = useState("");

  const [form, setForm] = useState({
    institutionName: "",
    institutionType: "",
    affiliation: "",
    principalName: "",
    coordinatorName: "",
    mobile: "",
    email: "",
    password: "",
    address: "",
    state: "",
    district: "",
    pincode: ""
  });

  // ❌ REMOVE RANDOM CODE GENERATION (IMPORTANT)
  // (ye pura hata diya)

  // Fetch States
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" })
    })
      .then(res => res.json())
      .then(data => setStates(data.data.states));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePincodeChange = (e) => {
    const pin = e.target.value;

    setForm(prev => ({ ...prev, pincode: pin }));

    if (pin.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === "Success") {
            setForm(prev => ({
              ...prev,
              district: data[0].PostOffice[0].District
            }));
          }
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted) {
      alert("Please accept the Terms and Conditions");
      return;
    }

    try {
      // 🔥 ONLY FORM SEND (code mat bhej)
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/school/signup`,
        form
      );

      alert(res.data.message);

      // 🔥 BACKEND SE REAL CODE LO
      const backendCode = res.data.school_code;

      console.log("Backend Code:", backendCode);

      // 🔥 UI me show karo
      setSchoolCode(backendCode);

      const schoolData = {
        ...form,
        school_code: backendCode
      };

      // 🔥 SAVE CORRECT CODE
      localStorage.setItem("school", JSON.stringify(schoolData));
      localStorage.setItem("school_code", backendCode);
      localStorage.setItem("school_email", form.email);
      localStorage.setItem("school_name", form.institutionName);

      console.log("Saved Code:", localStorage.getItem("school_code"));
      console.log("Saved email",form.email)

      // 🔥 DASHBOARD
      navigate("/School_Dashboard", { state: schoolData });

    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">

      <div className="flex-grow flex items-center justify-center p-4">

        <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">

          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Institution Registration
          </h2>

          {/* 🔥 SHOW CODE AFTER SIGNUP */}
          {schoolCode && (
            <div className="bg-yellow-400 text-black p-4 rounded-xl mb-6 text-center text-lg font-bold">
              Your School Code: {schoolCode}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            <InputField label="Institution Name" name="institutionName" type="text" onChange={handleChange} />

            <div>
              <label className="text-white text-sm">Institution Type</label>
              <select name="institutionType" onChange={handleChange} required className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white">
                <option value="" className="text-black">Select Type</option>
                <option className="text-black">School</option>
                <option className="text-black">College</option>
                <option className="text-black">University</option>
                <option className="text-black">Institute</option>
              </select>
            </div>

            <InputField label="Affiliation" name="affiliation" type="text" onChange={handleChange} />
            <InputField label="Principal Name" name="principalName" type="text" onChange={handleChange} />
            <InputField label="Coordinator Name" name="coordinatorName" type="text" onChange={handleChange} />
            <InputField label="Mobile" name="mobile" type="tel" onChange={handleChange} />
            <InputField label="Email" name="email" type="email" onChange={handleChange} />
            <InputField label="Password" name="password" type="password" onChange={handleChange} />

            <div className="md:col-span-2">
              <label className="text-white text-sm">Address</label>
              <textarea name="address" onChange={handleChange} required rows="3"
                className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white"></textarea>
            </div>

            <div>
              <label className="text-white text-sm">State</label>
              <select name="state" onChange={handleChange} required className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white">
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white text-sm">District</label>
              <input type="text" name="district" value={form.district} readOnly className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white" />
            </div>

            <div>
              <label className="text-white text-sm">Pincode</label>
              <input type="text" name="pincode" maxLength="6" onChange={handlePincodeChange} required className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white" />
            </div>

            <div className="md:col-span-2 flex items-start gap-2">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} required />
              <label className="text-white text-sm">Accept Terms & Conditions</label>
            </div>

            <div className="md:col-span-2">
              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold">
                Register Now 🚀
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, type, onChange }) {
  return (
    <div>
      <label className="text-white text-sm">{label}</label>
      <input type={type} name={name} required onChange={onChange}
        className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white" />
    </div>
  );
}

export default SchoolSignup;