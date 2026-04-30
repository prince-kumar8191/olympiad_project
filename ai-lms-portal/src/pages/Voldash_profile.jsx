
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VolunteerEditProfile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem("VolunteerEmail");

    const getLocalData = () => {
        try {
            return JSON.parse(localStorage.getItem(`volunteer_${email}`)) || {};
        } catch {
            return {};
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        course: "",
        section: "",
        school_name: "",
        school_code: "",
        school_address: "",
        profession: "",
        skills: "",
        organization: "",
        experience: "",
        linkedin: "",
        github: "",
        achievement: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        father_name: "",
        father_occupation: "",
        mother_name: "",
        mother_occupation: "",
        blood_group: "",
        bank_holder_name: "",
        bank_name: "",
        ifsc_code: "",
        account_number: "",
        photo: ""
    });

    const [photo, setPhoto] = useState("https://via.placeholder.com/120");

    useEffect(() => {

        if (!email) {
            setLoading(false);
            return;
        }

        const localData = getLocalData();

        if (Object.keys(localData).length > 0) {
            setProfile(localData);

            setFormData(prev => ({
                ...prev,
                ...localData
            }));

            if (localData.photo) {
                setPhoto(localData.photo);
            }
        }

        const fetchLatest = async () => {
            try {

                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`
                );

                if (res.data && Object.keys(res.data).length > 0) {


                    const merged = {
                        ...localData,
                        ...Object.fromEntries(
                            Object.entries(res.data).filter(([_, v]) => v !== "" && v !== null)
                        )
                    };

                    setProfile(merged);
                    setFormData(prev => ({
                        ...prev,
                        ...merged
                    }));

                    if (merged.photo) {
                        setPhoto(merged.photo);
                    }

                    localStorage.setItem(
                        `volunteer_${email}`,
                        JSON.stringify(merged)
                    );
                }

            } catch (error) {
                console.log("Fetch Error:", error);
            }

            setLoading(false);
        };

        fetchLatest();

    }, [email]);

    const handleChange = (e) => {

        const updated = {
            ...formData,
            [e.target.name]: e.target.value
        };

        setFormData(updated);

        localStorage.setItem(
            `volunteer_${email}`,
            JSON.stringify({
                ...getLocalData(),
                ...updated,
                photo
            })
        );
    };

    const handlePhotoChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {

                const newPhoto = reader.result;

                setPhoto(newPhoto);

                const updatedData = {
                    ...formData,
                    photo: newPhoto
                };

                setFormData(updatedData);

                localStorage.setItem(
                    `volunteer_${email}`,
                    JSON.stringify(updatedData)
                );
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            email,
            photo
        };

        try {

            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/volunteer/update/${email}`,
                updatedData
            );

            ;
            if (res.data) {

                const updatedProfile = res.data.profile;   // 🔥 ADD THIS

                localStorage.setItem(
                    `volunteer_${email}`,
                    JSON.stringify(updatedProfile)
                );

                setFormData(updatedProfile);
                setProfile(updatedProfile);
                setPhoto(updatedProfile.photo);

                alert("Profile Updated Successfully");

                navigate("/Volunteer_Profile", { replace: true });
            }
            else {
                alert("Profile Updated Successfully");

                navigate("/Volunteer_Profile", { replace: true });

                // } else {
                alert("Update Failed");
            }

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-lg text-white">Loading...</div>;
    }

    return (

        <div className="min-h-screen mainBg p-8 text-white">

            <div className="max-w-5xl mx-auto glassCard p-8">

                <div className="flex justify-between items-start mb-6">

                    <h1 className="text-3xl font-bold text-cyan-300">
                        Edit Volunteer Profile
                    </h1>

                    <div className="text-center">
                        <div className="avatar">
                            <img src={photo} alt="profile" />
                        </div>

                        <label className="uploadBtn mt-2 block">
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

                    <div className="glassInner">
                        <h2 className="sectionTitle">Personal Info</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Full Name" className="inputStyle" />
                            <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="inputStyle" />
                            <input name="phone" value={formData.mobile || ""} onChange={handleChange} placeholder="Mobile" className="inputStyle" />
                            <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} className="inputStyle" />
                        </div>
                    </div>

                    <div className="glassInner">
                        <h2 className="sectionTitle">Education</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="course" value={formData.course || ""} onChange={handleChange} placeholder="Course" className="inputStyle" />
                            <input name="section" value={formData.section || ""} onChange={handleChange} placeholder="Section" className="inputStyle" />
                            <input name="school_name" value={formData.school_name || ""} onChange={handleChange} placeholder="School Name" className="inputStyle" />
                            <input name="school_code" value={formData.school_code || ""} onChange={handleChange} placeholder="School Code" className="inputStyle" />
                            <input name="school_address" value={formData.school_address || ""} onChange={handleChange} placeholder="School Address" className="inputStyle md:col-span-2" />
                        </div>
                    </div>

                    <div className="glassInner">
                        <h2 className="sectionTitle">Professional</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="profession" value={formData.profession || ""} onChange={handleChange} placeholder="Profession" className="inputStyle" />
                            <input name="skills" value={formData.skills || ""} onChange={handleChange} placeholder="Skills" className="inputStyle" />
                            <input name="organization" value={formData.organization || ""} onChange={handleChange} placeholder="Organization" className="inputStyle" />
                            <input name="experience" value={formData.experience || ""} onChange={handleChange} placeholder="Experience" className="inputStyle" />
                            <input name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="LinkedIn" className="inputStyle" />
                            <input name="github" value={formData.github || ""} onChange={handleChange} placeholder="GitHub" className="inputStyle" />
                            <input name="achievement" value={formData.achievement || ""} onChange={handleChange} placeholder="Achievements" className="inputStyle md:col-span-2" />
                        </div>
                    </div>

                    <div className="glassInner">
                        <h2 className="sectionTitle">Address</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" className="inputStyle" />
                            <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" className="inputStyle" />
                            <input name="state" value={formData.state || ""} onChange={handleChange} placeholder="State" className="inputStyle" />
                            <input name="pincode" value={formData.pincode || ""} onChange={handleChange} placeholder="Pincode" className="inputStyle" />
                        </div>
                    </div>

                    <div className="glassInner">
                        <h2 className="sectionTitle">Optional</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="father_name" value={formData.father_name || ""} onChange={handleChange} placeholder="Father Name" className="inputStyle" />
                            <input name="father_occupation" value={formData.father_occupation || ""} onChange={handleChange} placeholder="Father Occupation" className="inputStyle" />
                            <input name="mother_name" value={formData.mother_name || ""} onChange={handleChange} placeholder="Mother Name" className="inputStyle" />
                            <input name="mother_occupation" value={formData.mother_occupation || ""} onChange={handleChange} placeholder="Mother Occupation" className="inputStyle" />

                            <select name="blood_group" value={formData.blood_group || ""} onChange={handleChange} className="inputStyle selectFix">
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

                            <input name="bank_holder_name" value={formData.bank_holder_name || ""} onChange={handleChange} placeholder="Bank Holder Name" className="inputStyle" />
                            <input name="bank_name" value={formData.bank_name || ""} onChange={handleChange} placeholder="Bank Name" className="inputStyle" />
                            <input name="ifsc_code" value={formData.ifsc_code || ""} onChange={handleChange} placeholder="IFSC Code" className="inputStyle" />
                            <input name="account_number" value={formData.account_number || ""} onChange={handleChange} placeholder="Account Number" className="inputStyle" />
                        </div>
                    </div>

                    <button className="saveBtn">
                        Save Changes
                    </button>

                </form>
            </div>

            <style>{`

.mainBg{
  background: linear-gradient(135deg,#020617,#0f172a,#1e293b);
}

.glassCard{
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border-radius:20px;
  box-shadow:0 20px 50px rgba(0,255,255,0.15);
}

.glassInner{
  background: rgba(255,255,255,0.04);
  padding:20px;
  border-radius:15px;
  transition:0.3s;
}

.glassInner:hover{
  transform:translateY(-5px);
  box-shadow:0 10px 30px rgba(236,72,153,0.3);
}

.sectionTitle{
  color:#67e8f9;
  margin-bottom:12px;
  font-weight:600;
}

.inputStyle{
  padding:12px;
  border-radius:10px;
  background: rgba(255,255,255,0.08);
  border:none;
  color:white;
}

.inputStyle::placeholder{
  color:#cbd5e1;
}

/* 🔥 SELECT FIX */
.selectFix{
  background:#0f172a !important;
  color:white !important;
}

select option{
  background:#0f172a;
  color:white;
}

.avatar{
  width:110px;
  height:110px;
  border-radius:50%;
  overflow:hidden;
  border:3px solid cyan;
}

.avatar img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.uploadBtn{
  background: linear-gradient(90deg,#06b6d4,#ec4899);
  padding:8px 16px;
  border-radius:20px;
  cursor:pointer;
}

.saveBtn{
  width:100%;
  padding:14px;
  border-radius:12px;
  background: linear-gradient(90deg,#06b6d4,#ec4899);
  font-size:18px;
}

`}</style>

        </div>
    );
}

export default VolunteerEditProfile;