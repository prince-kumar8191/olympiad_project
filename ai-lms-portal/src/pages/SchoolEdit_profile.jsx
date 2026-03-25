// import React, { useState } from "react";

// function SchoolEditProfile() {

// const [logoPreview, setLogoPreview] = useState("https://via.placeholder.com/120");
// const [facilityInput, setFacilityInput] = useState("");
// const [facilities, setFacilities] = useState([]);

// const handleLogoChange = (e) => {
// const file = e.target.files[0];

// if (file) {
// const reader = new FileReader();

// reader.onload = () => {
// setLogoPreview(reader.result);
// };

// reader.readAsDataURL(file);
// }
// };

// const addFacility = () => {

// if (!facilityInput.trim()) return;

// setFacilities([...facilities, facilityInput]);
// setFacilityInput("");

// };

// const removeFacility = (index) => {
// setFacilities(facilities.filter((_, i) => i !== index));
// };

// const handleSubmit = (e) => {
// e.preventDefault();
// alert("School Profile Saved");
// };

// return (

// <div className="bg-gray-100 p-8 min-h-screen">

// <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">

// {/* HEADER */}

// <div className="flex justify-between items-center mb-6">

// <h1 className="text-3xl font-bold text-indigo-600">
// Edit School Profile
// </h1>

// {/* LOGO */}

// <div className="text-center">

// <img
// src={logoPreview}
// alt="school logo"
// className="w-28 h-28 rounded-full border object-cover"
// />

// <label className="block mt-2 text-indigo-600 cursor-pointer font-medium">

// Upload Logo

// <input
// type="file"
// onChange={handleLogoChange}
// className="hidden"
// />

// </label>

// </div>

// </div>

// <form onSubmit={handleSubmit} className="space-y-10">

// {/* SCHOOL INFO */}

// <div>

// <h2 className="text-xl font-semibold mb-4 border-b pb-2">
// School Information
// </h2>

// <div className="grid md:grid-cols-2 gap-4">

// <div className="md:col-span-2">
// <label className="font-medium">School Name*</label>
// <input type="text" required className="border p-3 rounded w-full"/>
// </div>

// <div className="md:col-span-2">
// <label className="font-medium">School Address*</label>
// <textarea required className="border p-3 rounded w-full"/>
// </div>

// <input placeholder="School City*" className="border p-3 rounded w-full"/>

// <input placeholder="School State*" className="border p-3 rounded w-full"/>

// <input placeholder="School Country*" className="border p-3 rounded w-full"/>

// <input placeholder="School Pincode*" className="border p-3 rounded w-full"/>

// <input type="email" placeholder="School Email*" className="border p-3 rounded w-full"/>

// <input placeholder="School Phone*" className="border p-3 rounded w-full"/>

// <input placeholder="School Affiliation" className="border p-3 rounded w-full"/>

// <input placeholder="School Code" className="border p-3 rounded w-full"/>

// </div>

// </div>

// {/* PRINCIPAL */}

// <div>

// <h2 className="text-xl font-semibold mb-4">
// Principal Information
// </h2>

// <div className="grid md:grid-cols-2 gap-4">

// <input placeholder="Principal Name" className="border p-3 rounded"/>

// <input placeholder="Principal Email" className="border p-3 rounded"/>

// <input placeholder="Principal Phone" className="border p-3 rounded"/>

// <input placeholder="Total Students" className="border p-3 rounded"/>

// </div>

// </div>

// {/* CLASSES */}

// <div>

// <h2 className="text-xl font-semibold mb-4">
// Classes Available
// </h2>

// <div className="grid grid-cols-3 gap-2">

// {[
// "Class 6","Class 7","Class 8",
// "Class 9","Class 10","Class 11","Class 12"
// ].map((cls,index)=>(
// <label key={index}>
// <input type="checkbox"/> {cls}
// </label>
// ))}

// </div>

// </div>

// {/* FACILITIES */}

// <div>

// <h2 className="text-xl font-semibold mb-4">
// Facilities
// </h2>

// <div className="flex gap-2">

// <input
// value={facilityInput}
// onChange={(e)=>setFacilityInput(e.target.value)}
// placeholder="Add Facility (Library, Lab...)"
// className="border p-3 rounded w-full"
// />

// <button
// type="button"
// onClick={addFacility}
// className="bg-indigo-600 text-white px-4 rounded"
// >
// Add
// </button>

// </div>

// <div className="flex flex-wrap gap-2 mt-4">

// {facilities.map((f,index)=>(
// <div
// key={index}
// className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded flex items-center gap-2"
// >
// {f}

// <span
// onClick={()=>removeFacility(index)}
// className="cursor-pointer text-red-500"
// >
// x
// </span>

// </div>
// ))}

// </div>

// </div>

// {/* CONTACT */}

// <div>

// <h2 className="text-xl font-semibold mb-4">
// Contact Information
// </h2>

// <div className="grid md:grid-cols-2 gap-4">

// <input placeholder="School Phone" className="border p-3 rounded"/>

// <input placeholder="School Email" className="border p-3 rounded"/>

// <input placeholder="Website" className="border p-3 rounded"/>

// <input placeholder="City" className="border p-3 rounded"/>

// <input placeholder="State" className="border p-3 rounded"/>

// <input placeholder="Pincode" className="border p-3 rounded"/>

// </div>

// </div>

// <button
// type="submit"
// className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700"
// >
// Save School Profile
// </button>

// </form>

// </div>

// </div>

// );
// }

// export default SchoolEditProfile;



















import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";


function SchoolEditProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const [logoPreview, setLogoPreview] = useState("");
  const [facilityInput, setFacilityInput] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    school_name: "",
    school_address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    school_email: "",
    school_phone: "",
    affiliation: "",
    school_code: "",
    principal_name: "",
    principal_email: "",
    principal_phone: "",
    total_students: "",
    contact_phone: "",
    contact_email: "",
    website: "",
    contact_city: "",
    contact_state: "",
    contact_pincode: ""
  });




useEffect(() => {

  let data = location.state;

  if (!data) {
    const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");
    data = savedSchool;
  }

  if (data) {

    setForm({
      school_name: data.school_name || data.institutionName || "",
      school_address: data.school_address || data.address || "",
      city: data.city || data.district || "",
      state: data.state || "",
      country: data.country || "",
      pincode: data.pincode || "",
      school_email: data.school_email || data.email || "",
      school_phone: data.school_phone || data.mobile || "",
      affiliation: data.affiliation || "",
      school_code: data.school_code || data.schoolCode || "",
      principal_name: data.principal_name || data.principalName || "",
      principal_email: data.principal_email || "",
      principal_phone: data.principal_phone || "",
      total_students: data.total_students || "",
      contact_phone: data.contact_phone || "",
      contact_email: data.contact_email || "",
      website: data.website || "",
      contact_city: data.contact_city || "",
      contact_state: data.contact_state || "",
      contact_pincode: data.contact_pincode || ""
    });

    setFacilities(data.facilities || []);
    setClasses(data.classes || []);

    if (data.logo) {
      setLogoPreview(data.logo);
    }

  }

}, [location.state]);



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {
        setLogoPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClassChange = (cls) => {

    if (classes.includes(cls)) {
      setClasses(classes.filter(c => c !== cls));
    } else {
      setClasses([...classes, cls]);
    }

  };

  const addFacility = () => {

    if (!facilityInput.trim()) return;

    setFacilities([...facilities, facilityInput]);
    setFacilityInput("");

  };

  const removeFacility = (index) => {

    setFacilities(facilities.filter((_, i) => i !== index));

  };




const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = {
      institutionName: form.school_name,
      address: form.school_address,
      district: form.city,
      state: form.state,
      country: form.country,
      pincode: form.pincode,
      email: form.school_email,
      mobile: form.school_phone,
      affiliation: form.affiliation,
      schoolCode: form.school_code,
      principalName: form.principal_name,
      principalEmail: form.principal_email,
      principalPhone: form.principal_phone,
      totalStudents: form.total_students,
      website: form.website,
      classes,
      facilities,
      logo: logoPreview
    };

    console.log("Sending Data:", data);

    const res = await axios.post(
      "http://localhost:5000/school/edit-profile",
      data
    );

    alert(res.data.message);

    localStorage.setItem("school", JSON.stringify(data));

    navigate(-1, { state: data });

  } catch (error) {

    console.log("Error:", error.response?.data);
    alert("Profile Save Failed");

  }

};


  return (

    <div className="bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8 min-h-screen">

      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-10">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

          <h1 className="text-4xl font-bold text-indigo-600">
            Edit School Profile
          </h1>

          <div className="text-center">

            <img
              src={logoPreview}
              alt="school logo"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
            />

            <label className="block mt-3 text-indigo-600 cursor-pointer font-semibold hover:underline">

              Upload Logo

              <input
                type="file"
                onChange={handleLogoChange}
                className="hidden"
              />

            </label>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* SCHOOL INFO */}

          <div className="bg-gray-50 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-5 border-b pb-2 text-indigo-600">
              School Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="school_name" value={form.school_name} onChange={handleChange} placeholder="School Name" className="border p-3 rounded-lg" />

              <textarea name="school_address" value={form.school_address} onChange={handleChange} placeholder="School Address" className="border p-3 rounded-lg" />

              <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-3 rounded-lg" />

              <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-3 rounded-lg" />

              <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="border p-3 rounded-lg" />

              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded-lg" />

              <input name="school_email" value={form.school_email} onChange={handleChange} placeholder="School Email" className="border p-3 rounded-lg" />

              <input name="school_phone" value={form.school_phone} onChange={handleChange} placeholder="School Phone" className="border p-3 rounded-lg" />

              <input name="affiliation" value={form.affiliation} onChange={handleChange} placeholder="Affiliation" className="border p-3 rounded-lg" />

              <input name="school_code" value={form.school_code} onChange={handleChange} placeholder="School Code" className="border p-3 rounded-lg" />

            </div>

          </div>

          {/* PRINCIPAL */}

          <div className="bg-gray-50 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-5 text-indigo-600">
              Principal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="principal_name" value={form.principal_name} onChange={handleChange} placeholder="Principal Name" className="border p-3 rounded-lg" />

              <input name="principal_email" value={form.principal_email} onChange={handleChange} placeholder="Principal Email" className="border p-3 rounded-lg" />

              <input name="principal_phone" value={form.principal_phone} onChange={handleChange} placeholder="Principal Phone" className="border p-3 rounded-lg" />

              <input name="total_students" value={form.total_students} onChange={handleChange} placeholder="Total Students" className="border p-3 rounded-lg" />

            </div>

          </div>

          {/* CLASSES */}

          <div className="bg-gray-50 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-5 text-indigo-600">
              Classes Available
            </h2>

            <div className="grid grid-cols-3 gap-3">

              {["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map((cls,index)=>(
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={classes.includes(cls)}
                    onChange={()=>handleClassChange(cls)}
                  />
                  {cls}
                </label>
              ))}

            </div>

          </div>

          {/* FACILITIES */}

          <div className="bg-gray-50 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-5 text-indigo-600">
              Facilities
            </h2>

            <div className="flex gap-2">

              <input
                value={facilityInput}
                onChange={(e)=>setFacilityInput(e.target.value)}
                placeholder="Add Facility"
                className="border p-3 rounded-lg w-full"
              />

              <button
                type="button"
                onClick={addFacility}
                className="bg-indigo-600 text-white px-6 rounded-lg"
              >
                Add
              </button>

            </div>

            <div className="flex flex-wrap gap-3 mt-5">

              {facilities.map((f,index)=>(
                <div key={index} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full flex items-center gap-2">
                  {f}
                  <span
                    onClick={()=>removeFacility(index)}
                    className="cursor-pointer text-red-500"
                  >
                    ×
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* CONTACT */}

          <div className="bg-gray-50 p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-5 text-indigo-600">
              Contact Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="Contact Phone" className="border p-3 rounded-lg" />

              <input name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="Contact Email" className="border p-3 rounded-lg" />

              <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="border p-3 rounded-lg" />

              <input name="contact_city" value={form.contact_city} onChange={handleChange} placeholder="City" className="border p-3 rounded-lg" />

              <input name="contact_state" value={form.contact_state} onChange={handleChange} placeholder="State" className="border p-3 rounded-lg" />

              <input name="contact_pincode" value={form.contact_pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded-lg" />

            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-lg"
          >
            Save School Profile
          </button>

        </form>

      </div>

    </div>

  );

}

export default SchoolEditProfile;