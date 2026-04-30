



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
      .get(`${import.meta.env.VITE_API_URL}/coordinator/profile/${email}`)
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
        `${import.meta.env.VITE_API_URL}/coordinator/update/${profile.email}`,
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
    <div className="min-h-screen mainBg p-8 text-white">

      <div className="max-w-6xl mx-auto glassCard p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

          <h1 className="text-4xl font-bold text-cyan-300 fadeIn">
            Edit Profile
          </h1>

          <div className="text-center">

            <div className="avatarBig">
              <img src={preview} alt="profile" />
            </div>

            <label className="uploadBtn mt-3">
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

          {/* PERSONAL */}
          <Section title="Personal Information">
            <Input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name*" />
            <Input name="email" value={profile.email} onChange={handleChange} placeholder="Email*" />
            <Input name="mobile" value={profile.mobile} onChange={handleChange} placeholder="Phone*" />
            <Input type="date" name="dob" value={profile.dob ? profile.dob.split("T")[0] : ""} onChange={handleChange} />
          </Section>

          {/* EDUCATION */}
          <Section title="Education Information">
            <Input name="course" value={profile.course} onChange={handleChange} placeholder="Course" />
            <Input name="section" value={profile.section} onChange={handleChange} placeholder="Section" />
            <Input name="school_name" value={profile.school_name} onChange={handleChange} placeholder="Institute Name" />
            <Input name="school_code" value={profile.school_code} onChange={handleChange} placeholder="Institute Code" />
            <Input name="school_address" value={profile.school_address} onChange={handleChange} placeholder="School Address" full />
          </Section>

          {/* PROFESSIONAL */}
          <Section title="Professional Information">
            <Input name="profession" value={profile.profession} onChange={handleChange} placeholder="Profession" />
            <Input name="skills" value={profile.skills} onChange={handleChange} placeholder="Skills" />
            <Input name="organization" value={profile.organization} onChange={handleChange} placeholder="Organization" />
            <Input name="experience" value={profile.experience} onChange={handleChange} placeholder="Experience" />
            <Input name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="LinkedIn" />
            <Input name="github" value={profile.github} onChange={handleChange} placeholder="GitHub" />
            <Input name="achievement" value={profile.achievement} onChange={handleChange} placeholder="Achievements" full />
          </Section>

          {/* ADDRESS */}
          <Section title="Address Information">
            <Input name="address" value={profile.address} onChange={handleChange} placeholder="Address*" />
            <Input name="city" value={profile.city} onChange={handleChange} placeholder="City*" />
            <Input name="state" value={profile.state} onChange={handleChange} placeholder="State*" />
            <Input name="pincode" value={profile.pincode} onChange={handleChange} placeholder="Pincode*" />
          </Section>

          {/* OPTIONAL */}
          <Section title="Optional Information">
            <Input name="father_name" value={profile.father_name} onChange={handleChange} placeholder="Father Name" />
            <Input name="father_occupation" value={profile.father_occupation} onChange={handleChange} placeholder="Father Occupation" />
            <Input name="mother_name" value={profile.mother_name} onChange={handleChange} placeholder="Mother Name" />
            <Input name="mother_occupation" value={profile.mother_occupation} onChange={handleChange} placeholder="Mother Occupation" />
            
            <select
              name="blood_group"
              value={profile.blood_group || ""}
              onChange={handleChange}
              className="inputStyle"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
            </select>

            <Input name="bank_holder_name" value={profile.bank_holder_name} onChange={handleChange} placeholder="Bank Holder Name" />
            <Input name="bank_name" value={profile.bank_name} onChange={handleChange} placeholder="Bank Name" />
            <Input name="ifsc_code" value={profile.ifsc_code} onChange={handleChange} placeholder="IFSC Code" />
            <Input name="account_number" value={profile.account_number} onChange={handleChange} placeholder="Account Number" />
          </Section>

          <button className="saveBtn">
            Save Changes
          </button>

        </form>

      </div>

      {/* COMPONENTS */}
      <style>{`

.mainBg{
  background: linear-gradient(135deg,#001f2f,#003b4d,#005f73);
}

.glassCard{
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(25px);
  border-radius:20px;
  box-shadow:0 20px 60px rgba(0,255,255,0.2);
}

.avatarBig{
  width:120px;
  height:120px;
  border-radius:50%;
  overflow:hidden;
  border:3px solid cyan;
}

.avatarBig img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.uploadBtn{
  display:inline-block;
  padding:8px 14px;
  border-radius:20px;
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
  cursor:pointer;
}

.inputStyle{
  padding:12px;
  border-radius:10px;
  background: rgba(255,255,255,0.08);
  border:none;
  outline:none;
  color:white;
}

.saveBtn{
  width:100%;
  padding:14px;
  border-radius:12px;
  background: linear-gradient(90deg,#00e5ff,#00bcd4);
  font-size:18px;
  font-weight:bold;
}

.fadeIn{animation:fade 1s ease;}
@keyframes fade{from{opacity:0}to{opacity:1}}

      `}</style>
    </div>
  );
}

/* 🔥 REUSABLE COMPONENTS */
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-cyan-300">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Input = ({ full, ...props }) => (
  <input
    {...props}
    className={`inputStyle ${full ? "md:col-span-2" : ""}`}
  />
);

export default EditProfile;