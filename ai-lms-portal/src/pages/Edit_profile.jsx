



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {

    const navigate = useNavigate();
    const storedStudent = JSON.parse(localStorage.getItem("student") || "{}");

    const [states, setStates] = useState([]);

    const [phoneError, setPhoneError] = useState("");
    const [parentPhoneError, setParentPhoneError] = useState("");

    const [formData, setFormData] = useState({
        name: storedStudent.name || "",
        email: storedStudent.email || "",
        phone: storedStudent.phone || "",
        studentId: storedStudent.StudentId || "",
        dob: storedStudent.dob || "",
        gender: storedStudent.gender || "",

        student_class: storedStudent.student_class || "",
        section: storedStudent.section || "",
        school_name: storedStudent.school || "",
        school_code: storedStudent.school_code || "",
        medium: storedStudent.medium || "",

        school_address: storedStudent.school_address || "",
        school_city: storedStudent.school_city || "",
        school_state: storedStudent.school_state || "",
        school_pincode: storedStudent.school_pincode || "",

        address: storedStudent.address || "",
        city: storedStudent.city || "",
        state: storedStudent.state || "",
        pincode: storedStudent.pincode || "",

        height: storedStudent.height || "",
        weight: storedStudent.weight || "",
        hobbies: storedStudent.hobbies || "",

        father_name: storedStudent.father_name || "",
        mother_name: storedStudent.mother_name || "",
        father_occupation: storedStudent.father_occupation || "",
        mother_occupation: storedStudent.mother_occupation || "",
        parents_mobile: storedStudent.parents_mobile || "",

        blood_group: storedStudent.blood_group || ""
    });

    const [photo, setPhoto] = useState(storedStudent.photo || null);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
                const india = res.data.data.find(c => c.name === "India");
                setStates(india.states.map(s => s.name));
            } catch (err) {
                console.log(err);
            }
        };
        fetchStates();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            if (!/^\d{0,10}$/.test(value)) return;
            setPhoneError(value.length < 10 ? "Please enter 10 digit number" : "");
        }

        if (name === "parents_mobile") {
            if (!/^\d{0,10}$/.test(value)) return;
            setParentPhoneError(value.length < 10 ? "Please enter 10 digit number" : "");
        }

        setFormData({ ...formData, [name]: value });
    };

    const handlePincodeChange = async (e) => {
        const value = e.target.value;

        if (!/^\d{0,6}$/.test(value)) return;

        setFormData({ ...formData, pincode: value });

        if (value.length === 6) {
            try {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                if (res.data[0].Status === "Success") {
                    const data = res.data[0].PostOffice[0];

                    setFormData(prev => ({
                        ...prev,
                        city: data.District,
                        state: data.State
                    }));
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleSchoolPincode = async (e) => {
        const value = e.target.value;

        if (!/^\d{0,6}$/.test(value)) return;

        setFormData({ ...formData, school_pincode: value });

        if (value.length === 6) {
            try {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
                if (res.data[0].Status === "Success") {
                    const data = res.data[0].PostOffice[0];

                    setFormData(prev => ({
                        ...prev,
                        school_city: data.District,
                        school_state: data.State
                    }));
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPhoto(imageURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }

        const updatedData = {
            ...formData,
            school: formData.school_name,
            photo
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/update-student-profile`,
                updatedData
            );

            if (res.data.success) {
                localStorage.setItem("student", JSON.stringify(updatedData));
                alert("Profile Updated Successfully");
                navigate("/StudentProfile", { replace: true });
            } else {
                alert("Update Failed: " + res.data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    return (
        <div className="min-h-screen mainBg p-8 text-white">

            <div className="max-w-4xl mx-auto glassCard p-8">

                {/* IMAGE */}
                <div className="flex flex-col items-center mb-6">
                    <div className="avatar">
                        <img src={photo || "https://via.placeholder.com/120"} />
                    </div>

                    <label className="uploadBtn mt-3">
                        Upload Photo
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                </div>

                <h1 className="text-3xl font-bold text-center text-cyan-300 mb-6">
                    Edit Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Personal */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">Personal Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="inputStyle"/>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="inputStyle"/>

                            <div>
                                {phoneError && <p className="error">{phoneError}</p>}
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="inputStyle"/>
                            </div>

                            <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" className="inputStyle"/>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="inputStyle"/>

                            <select name="gender" value={formData.gender} onChange={handleChange} className="inputStyle">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">Education Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <select name="student_class" value={formData.student_class} onChange={handleChange} className="inputStyle">
                                <option>Select Class</option>
                                <option>Class 6</option>
                                <option>Class 7</option>
                                <option>Class 8</option>
                                <option>Class 9</option>
                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                            </select>
                            <select name="Subject" value={formData.subject} onChange={handleChange} className="inputStyle">
                                <option value="">Select Subject</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Science">Science</option>
                            </select>
                            <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="inputStyle"/>
                            <input name="school_name" value={formData.school_name} onChange={handleChange} placeholder="School Name" className="inputStyle"/>
                            <input name="school_code" value={formData.school_code} onChange={handleChange} placeholder="School Code" className="inputStyle"/>

                            <select name="medium" value={formData.medium} onChange={handleChange} className="inputStyle">
                                <option value="">Select Medium</option>
                                <option>Hindi Medium</option>
                                <option>English Medium</option>
                            </select>
                        </div>
                    </div>

                    {/* School Address */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">School Address</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="school_address" value={formData.school_address} onChange={handleChange} placeholder="Address" className="inputStyle"/>

                            <select name="school_state" value={formData.school_state} onChange={handleChange} className="inputStyle">
                                <option value="">Select State</option>
                                {states.map((s, i) => <option key={i}>{s}</option>)}
                            </select>

                            <input name="school_pincode" value={formData.school_pincode} onChange={handleSchoolPincode} placeholder="Pincode" className="inputStyle"/>
                            <input name="school_city" value={formData.school_city} onChange={handleChange} placeholder="City" className="inputStyle"/>
                        </div>
                    </div>

                    {/* Permanent */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">Permanent Address</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="inputStyle"/>

                            <select name="state" value={formData.state} onChange={handleChange} className="inputStyle">
                                <option value="">Select State</option>
                                {states.map((s, i) => <option key={i}>{s}</option>)}
                            </select>

                            <input name="pincode" value={formData.pincode} onChange={handlePincodeChange} placeholder="Pincode" className="inputStyle"/>
                            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="inputStyle"/>
                        </div>
                    </div>

                    {/* Parents */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">Parents Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father Name" className="inputStyle"/>
                            <input name="mother_name" value={formData.mother_name} onChange={handleChange} placeholder="Mother Name" className="inputStyle"/>
                            <input name="father_occupation" value={formData.father_occupation} onChange={handleChange} placeholder="Father Occupation" className="inputStyle"/>
                            <input name="mother_occupation" value={formData.mother_occupation} onChange={handleChange} placeholder="Mother Occupation" className="inputStyle"/>

                            <div>
                                {parentPhoneError && <p className="error">{parentPhoneError}</p>}
                                <input name="parents_mobile" value={formData.parents_mobile} onChange={handleChange} placeholder="Parents Mobile" className="inputStyle"/>
                            </div>
                        </div>
                    </div>

                    {/* Other */}
                    <div className="glassInner">
                        <h2 className="sectionTitle">Other Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="height" value={formData.height} onChange={handleChange} placeholder="Height" className="inputStyle"/>
                            <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" className="inputStyle"/>

                            <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="inputStyle">
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

                            <input name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Hobbies" className="inputStyle"/>
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
  box-shadow:0 20px 50px rgba(0,255,255,0.1);
}

.glassInner{
  background: rgba(255,255,255,0.04);
  padding:20px;
  border-radius:15px;
}

.sectionTitle{
  color:#67e8f9;
  margin-bottom:10px;
}

.inputStyle{
  padding:12px;
  border-radius:10px;
  background: rgba(255,255,255,0.08);
  border:none;
  color:white;
}

.avatar{
  width:120px;
  height:120px;
  border-radius:50%;
  overflow:hidden;
  border:3px solid cyan;
}

.uploadBtn{
  background: linear-gradient(90deg,#06b6d4,#ec4899);
  padding:8px 16px;
  border-radius:20px;
}

.saveBtn{
  width:100%;
  padding:14px;
  border-radius:12px;
  background: linear-gradient(90deg,#06b6d4,#ec4899);
}

.error{
  color:red;
  font-size:12px;
}

/* 🔥 FIX */
select.inputStyle {
  background-color: rgba(255,255,255,0.08) !important;
  color: white !important;
}

select.inputStyle option {
  background: #0f172a !important;
  color: white !important;
}

            `}</style>
        </div>
    );
}