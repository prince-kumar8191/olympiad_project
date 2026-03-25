
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function EditProfile() {
//   const [preview, setPreview] = useState("https://via.placeholder.com/120");
//   const [profile, setProfile] = useState({});

//   useEffect(() => {
//     const email = localStorage.getItem("CoordinatorEmail");

//     axios
//       .get(`http://localhost:5000/coordinator/profile/${email}`)
//       .then((res) => {
//         setProfile(res.data);
//         if (res.data.photo) setPreview(res.data.photo);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // 👇 Controlled inputs handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let data = { ...profile };
//     if (preview && !preview.startsWith("https://via.placeholder.com")) {
//       data.photo = preview;
//     }

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/coordinator/update/${profile.email}`,
//         data
//       );
//       alert(res.data.message);
//       setProfile(res.data.profile);
//       if (res.data.profile.photo) setPreview(res.data.profile.photo);
//     } catch (err) {
//       console.log(err);
//       alert("Error updating profile ❌");
//     }
//   };

//   if (!profile.name) {
//     return <div className="p-8 text-center text-xl">Loading profile...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <h1 className="text-3xl font-bold text-indigo-600">Edit Profile</h1>
//           <div className="text-center">
//             <img
//               src={preview}
//               alt="profile"
//               className="w-28 h-28 rounded-full object-cover border mx-auto"
//             />
//             <label className="mt-2 block cursor-pointer text-indigo-600 font-medium">
//               Upload Photo
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 className="hidden"
//               />
//             </label>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-10">
//           {/* Personal Information */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 value={profile.name || ""}
//                 onChange={handleChange}
//                 placeholder="Full Name*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="email"
//                 value={profile.email || ""}
//                 onChange={handleChange}
//                 placeholder="Email*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="mobile"
//                 value={profile.mobile || ""}
//                 onChange={handleChange}
//                 placeholder="Phone*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 type="date"
//                 name="dob"
//                 value={profile.dob ? profile.dob.split("T")[0] : ""}
//                 onChange={handleChange}
//                 className="border p-3 rounded"
//               />
//             </div>
//           </div>

//           {/* Education Information */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Education Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="course"
//                 value={profile.course || ""}
//                 onChange={handleChange}
//                 placeholder="Course"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="section"
//                 value={profile.section || ""}
//                 onChange={handleChange}
//                 placeholder="Section"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="school_name"
//                 value={profile.school_name || ""}
//                 onChange={handleChange}
//                 placeholder="School/College/Institute Name"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="school_code"
//                 value={profile.school_code || ""}
//                 onChange={handleChange}
//                 placeholder="School/College/Institute Code"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="school_address"
//                 value={profile.school_address || ""}
//                 onChange={handleChange}
//                 placeholder="School Address"
//                 className="border p-3 rounded md:col-span-2"
//               />
//             </div>
//           </div>

//           {/* Professional Information */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="profession"
//                 value={profile.profession || ""}
//                 onChange={handleChange}
//                 placeholder="Profession"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="skills"
//                 value={profile.skills || ""}
//                 onChange={handleChange}
//                 placeholder="Skills"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="organization"
//                 value={profile.organization || ""}
//                 onChange={handleChange}
//                 placeholder="Organization"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="experience"
//                 value={profile.experience || ""}
//                 onChange={handleChange}
//                 placeholder="Experience"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="linkedin"
//                 value={profile.linkedin || ""}
//                 onChange={handleChange}
//                 placeholder="LinkedIn Profile"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="github"
//                 value={profile.github || ""}
//                 onChange={handleChange}
//                 placeholder="GitHub Profile"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="achievement"
//                 value={profile.achievement || ""}
//                 onChange={handleChange}
//                 placeholder="Achievements"
//                 className="border p-3 rounded md:col-span-2"
//               />
//             </div>
//           </div>

//           {/* Address Information */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Address Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="address"
//                 value={profile.address || ""}
//                 onChange={handleChange}
//                 placeholder="Address*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="city"
//                 value={profile.city || ""}
//                 onChange={handleChange}
//                 placeholder="City*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="state"
//                 value={profile.state || ""}
//                 onChange={handleChange}
//                 placeholder="State*"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="pincode"
//                 value={profile.pincode || ""}
//                 onChange={handleChange}
//                 placeholder="Pincode*"
//                 className="border p-3 rounded"
//               />
//             </div>
//           </div>

//           {/* Optional Information */}
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Optional Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="father_name"
//                 value={profile.father_name || ""}
//                 onChange={handleChange}
//                 placeholder="Father Name"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="father_occupation"
//                 value={profile.father_occupation || ""}
//                 onChange={handleChange}
//                 placeholder="Father Occupation"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="mother_name"
//                 value={profile.mother_name || ""}
//                 onChange={handleChange}
//                 placeholder="Mother Name"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="mother_occupation"
//                 value={profile.mother_occupation || ""}
//                 onChange={handleChange}
//                 placeholder="Mother Occupation"
//                 className="border p-3 rounded"
//               />
//               <select
//                 name="blood_group"
//                 value={profile.blood_group || ""}
//                 onChange={handleChange}
//                 className="border p-3 rounded"
//               >
//                 <option value="">Select Blood Group</option>
//                 <option>A+</option>
//                 <option>A-</option>
//                 <option>B+</option>
//                 <option>B-</option>
//                 <option>AB+</option>
//                 <option>AB-</option>
//                 <option>O+</option>
//                 <option>O-</option>
//               </select>
//               <input
//                 name="bank_holder_name"
//                 value={profile.bank_holder_name || ""}
//                 onChange={handleChange}
//                 placeholder="Bank Holder Name"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="bank_name"
//                 value={profile.bank_name || ""}
//                 onChange={handleChange}
//                 placeholder="Bank Name"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="ifsc_code"
//                 value={profile.ifsc_code || ""}
//                 onChange={handleChange}
//                 placeholder="IFSC Code"
//                 className="border p-3 rounded"
//               />
//               <input
//                 name="account_number"
//                 value={profile.account_number || ""}
//                 onChange={handleChange}
//                 placeholder="Account Number"
//                 className="border p-3 rounded"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700"
//           >
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditProfile;













import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [preview, setPreview] = useState("https://via.placeholder.com/120");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("CoordinatorEmail");

    axios
      .get(`http://localhost:5000/coordinator/profile/${email}`)
      .then((res) => {
        setProfile(res.data);
        if (res.data.photo) setPreview(res.data.photo);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 👇 Controlled inputs handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = { ...profile };
    if (preview && !preview.startsWith("https://via.placeholder.com")) {
      data.photo = preview;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/coordinator/update/${profile.email}`,
        data
      );
      alert(res.data.message);
      setProfile(res.data.profile);
      if (res.data.profile.photo) setPreview(res.data.profile.photo);
      navigate(-1, { state: data });
    } catch (err) {
      console.log(err);
      alert("Error updating profile ❌");
       
    }
  };

  if (!profile.name) {
    return <div className="p-8 text-center text-xl">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Edit Profile</h1>
          <div className="text-center">
            <img
              src={preview}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border mx-auto"
            />
            <label className="mt-2 block cursor-pointer text-indigo-600 font-medium">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={profile.name || ""}
                onChange={handleChange}
                placeholder="Full Name*"
                className="border p-3 rounded"
              />
              <input
                name="email"
                value={profile.email || ""}
                onChange={handleChange}
                placeholder="Email*"
                className="border p-3 rounded"
              />
              <input
                name="mobile"
                value={profile.mobile || ""}
                onChange={handleChange}
                placeholder="Phone*"
                className="border p-3 rounded"
              />
              <input
                type="date"
                name="dob"
                value={profile.dob ? profile.dob.split("T")[0] : ""}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>
          </div>

          {/* Education Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Education Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="course"
                value={profile.course || ""}
                onChange={handleChange}
                placeholder="Course"
                className="border p-3 rounded"
              />
              <input
                name="section"
                value={profile.section || ""}
                onChange={handleChange}
                placeholder="Section"
                className="border p-3 rounded"
              />
              <input
                name="school_name"
                value={profile.school_name || ""}
                onChange={handleChange}
                placeholder="School/College/Institute Name"
                className="border p-3 rounded"
              />
              <input
                name="school_code"
                value={profile.school_code || ""}
                onChange={handleChange}
                placeholder="School/College/Institute Code"
                className="border p-3 rounded"
              />
              <input
                name="school_address"
                value={profile.school_address || ""}
                onChange={handleChange}
                placeholder="School Address"
                className="border p-3 rounded md:col-span-2"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="profession"
                value={profile.profession || ""}
                onChange={handleChange}
                placeholder="Profession"
                className="border p-3 rounded"
              />
              <input
                name="skills"
                value={profile.skills || ""}
                onChange={handleChange}
                placeholder="Skills"
                className="border p-3 rounded"
              />
              <input
                name="organization"
                value={profile.organization || ""}
                onChange={handleChange}
                placeholder="Organization"
                className="border p-3 rounded"
              />
              <input
                name="experience"
                value={profile.experience || ""}
                onChange={handleChange}
                placeholder="Experience"
                className="border p-3 rounded"
              />
              <input
                name="linkedin"
                value={profile.linkedin || ""}
                onChange={handleChange}
                placeholder="LinkedIn Profile"
                className="border p-3 rounded"
              />
              <input
                name="github"
                value={profile.github || ""}
                onChange={handleChange}
                placeholder="GitHub Profile"
                className="border p-3 rounded"
              />
              <input
                name="achievement"
                value={profile.achievement || ""}
                onChange={handleChange}
                placeholder="Achievements"
                className="border p-3 rounded md:col-span-2"
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="address"
                value={profile.address || ""}
                onChange={handleChange}
                placeholder="Address*"
                className="border p-3 rounded"
              />
              <input
                name="city"
                value={profile.city || ""}
                onChange={handleChange}
                placeholder="City*"
                className="border p-3 rounded"
              />
              <input
                name="state"
                value={profile.state || ""}
                onChange={handleChange}
                placeholder="State*"
                className="border p-3 rounded"
              />
              <input
                name="pincode"
                value={profile.pincode || ""}
                onChange={handleChange}
                placeholder="Pincode*"
                className="border p-3 rounded"
              />
            </div>
          </div>

          {/* Optional Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Optional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="father_name"
                value={profile.father_name || ""}
                onChange={handleChange}
                placeholder="Father Name"
                className="border p-3 rounded"
              />
              <input
                name="father_occupation"
                value={profile.father_occupation || ""}
                onChange={handleChange}
                placeholder="Father Occupation"
                className="border p-3 rounded"
              />
              <input
                name="mother_name"
                value={profile.mother_name || ""}
                onChange={handleChange}
                placeholder="Mother Name"
                className="border p-3 rounded"
              />
              <input
                name="mother_occupation"
                value={profile.mother_occupation || ""}
                onChange={handleChange}
                placeholder="Mother Occupation"
                className="border p-3 rounded"
              />
              <select
                name="blood_group"
                value={profile.blood_group || ""}
                onChange={handleChange}
                className="border p-3 rounded"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              <input
                name="bank_holder_name"
                value={profile.bank_holder_name || ""}
                onChange={handleChange}
                placeholder="Bank Holder Name"
                className="border p-3 rounded"
              />
              <input
                name="bank_name"
                value={profile.bank_name || ""}
                onChange={handleChange}
                placeholder="Bank Name"
                className="border p-3 rounded"
              />
              <input
                name="ifsc_code"
                value={profile.ifsc_code || ""}
                onChange={handleChange}
                placeholder="IFSC Code"
                className="border p-3 rounded"
              />
              <input
                name="account_number"
                value={profile.account_number || ""}
                onChange={handleChange}
                placeholder="Account Number"
                className="border p-3 rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;