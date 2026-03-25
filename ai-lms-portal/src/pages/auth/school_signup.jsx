



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function SchoolSignup() {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);

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

  const [accepted, setAccepted] = useState(false);

  // Fetch Indian States
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

  // Auto District from Pincode
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

    const res = await axios.post(
      "http://localhost:5000/school/signup",
      form
    );

    alert(res.data.message);

    // ✅ SAVE DATA
    localStorage.setItem("school", JSON.stringify(form));
    localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("role", "school");

localStorage.setItem("user", JSON.stringify({
  name: form.name
}));
    navigate("/School_Dashboard", { state: form });

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

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          <InputField label="Institution Name" name="institutionName" type="text" onChange={handleChange} />

          <div>
            <label className="text-white text-sm">Institution Type</label>
            <select
              name="institutionType"
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="" className="text-black">Select Type</option>
              <option className="text-black">School</option>
              <option className="text-black">College</option>
              <option className="text-black">University</option>
              <option className="text-black">Institute</option>
            </select>
          </div>

          <InputField label="Affiliation (CBSE/UGC/AICTE)" name="affiliation" type="text" onChange={handleChange} />
          <InputField label="Principal / Head Name" name="principalName" type="text" onChange={handleChange} />
          <InputField label="Coordinator Name" name="coordinatorName" type="text" onChange={handleChange} />
          <InputField label="Mobile Number" name="mobile" type="tel" onChange={handleChange} />
          <InputField label="Official Email" name="email" type="email" onChange={handleChange} />
          <InputField label="Password" name="password" type="password" onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="text-white text-sm">Full Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              required
              rows="3"
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <div>
            <label className="text-white text-sm">State</label>
            <select
              name="state"
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="" className="text-black">Select State</option>
              {states.map((s, i) => (
                <option key={i} className="text-black">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white text-sm">District</label>
            <input
              type="text"
              name="district"
              value={form.district}
              readOnly
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm">Pin Code</label>
            <input
              type="text"
              name="pincode"
              maxLength="6"
              onChange={handlePincodeChange}
              required
              className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
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

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold text-lg hover:scale-105 transform transition duration-300 shadow-lg"
            >
              Register Now 🚀
            </button>
          </div>

        </form>
      </div>

      </div>

     
          <div className="border-t border-white/30 w-full"></div>
     
     {/* FOOTER POLICY LINKS */}
     <div className="text-white py-6">
     
       {/* COPYRIGHT */}
       <div className="text-center mb-6 text-sm text-white/80">
         © 2026 BHAYAT. All Copyrights reserved
       </div>
     
       <div className="grid grid-cols-3 text-center">
     
         <div>
           <Link
             to="/Term_Condition"
             className="hover:text-orange-400 font-semibold"
           >
             Terms & Conditions
           </Link>
         </div>
     
         <div>
           <Link
             to="/privacy-policy"
             className="hover:text-orange-400 font-semibold"
           >
             Privacy Policy
           </Link>
         </div>
     
         <div>
           <Link
             to="/refund-policy"
             className="hover:text-orange-400 font-semibold"
           >
             Refund & Return Policy
           </Link>
         </div>
     
       </div>
     
     </div>

    </div>
  );
}

function InputField({ label, name, type, onChange }) {
  return (
    <div>
      <label className="text-white text-sm">{label}</label>
      <input
        type={type}
        name={name}
        required
        onChange={onChange}
        className="w-full mt-1 p-3 rounded-xl bg-white/30 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  );
}

export default SchoolSignup;