// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EditProfile() {
//     const navigate = useNavigate();
//     const storedStudent = JSON.parse(localStorage.getItem("student") || "{}");

//     const [formData, setFormData] = useState({
//         name: storedStudent.name || "",
//         email: storedStudent.email || "",
//         phone: storedStudent.phone || "",
//         StudentId: storedStudent.StudentId || "",
//         dob: storedStudent.dob || "",
//         father_name: storedStudent.father_name || "",
//         mother_name: storedStudent.mother_name || "",
//         student_class: storedStudent.student_class || "",
//         section: storedStudent.section || "",
//         school_name: storedStudent.school || "",
//         school_code: storedStudent.school_code || "",
//         school_address: storedStudent.school_address || "",
//         address: storedStudent.address || "",
//         city: storedStudent.city || "",
//         state: storedStudent.state || "",
//         pincode: storedStudent.pincode || "",
//         father_occupation: storedStudent.father_occupation || "",
//         mother_occupation: storedStudent.mother_occupation || "",
//         blood_group: storedStudent.blood_group || ""
//     });

//     const [photo, setPhoto] = useState(storedStudent.photo || null);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setPhoto(imageURL);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // 👇 FIX: school_name ko school me convert karna
//         const updatedData = {
//             ...formData,
//             school: formData.school_name,
//             photo
//         };

//         try {

//             const res = await axios.post(
//                 "http://localhost:5000/update-student-profile",
//                 updatedData
//             );

//             if (res.data.success) {

//                 localStorage.setItem("student", JSON.stringify(updatedData));

//                 alert("Profile Updated Successfully");

//                 navigate("/StudentProfile", { replace: true });

//             } else {
//                 alert("Update Failed: " + res.data.message);
//             }

//         } catch (error) {
//             console.log(error);
//             alert("Server Error");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 transition-all duration-500">
//             <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">

//                 <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
//                     <h1 className="text-3xl font-bold text-indigo-600 drop-shadow-sm">Edit Profile</h1>

//                     <div className="text-center relative group">
//                         <img
//                             src={photo || "https://via.placeholder.com/100"}
//                             className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-indigo-400 shadow-md group-hover:scale-105 transition-transform duration-300"
//                         />
//                         <label className="mt-2 block cursor-pointer text-sm text-indigo-600 font-medium hover:text-indigo-800">
//                             Upload Photo
//                             <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
//                         </label>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-8">

//                     <div className="bg-indigo-50 p-6 rounded-xl shadow-inner">
//                         <h2 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">Personal Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                             <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                             <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                              <input name="StudentId" placeholder="StudentId" value={formData.StudentId} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                             <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                             <input name="father_name" placeholder="Father Name" value={formData.father_name} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                             <input name="mother_name" placeholder="Mother Name" value={formData.mother_name} onChange={handleChange} className="border p-3 rounded focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
//                         </div>
//                     </div>

//                     <div className="bg-purple-50 p-6 rounded-xl shadow-inner">
//                         <h2 className="text-xl font-semibold mb-4 text-purple-700 border-b pb-2">Education Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                             <select
//                                 name="student_class"
//                                 value={formData.student_class}
//                                 onChange={handleChange}
//                                 className="border p-3 rounded focus:ring-2 focus:ring-purple-400 focus:outline-none"
//                             >
//                                 <option value="">Select Class</option>
//                                 <option>Class 6</option>
//                                 <option>Class 7</option>
//                                 <option>Class 8</option>
//                                 <option>Class 9</option>
//                                 <option>Class 10</option>
//                                 <option>Class 11</option>
//                                 <option>Class 12</option>
//                             </select>

//                             <input name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="school_name" placeholder="School Name" value={formData.school_name} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="school_code" placeholder="School Code" value={formData.school_code} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="school_address" placeholder="School Address" value={formData.school_address} onChange={handleChange} className="border p-3 rounded"/>
//                         </div>
//                     </div>

//                     <div className="bg-pink-50 p-6 rounded-xl shadow-inner">
//                         <h2 className="text-xl font-semibold mb-4 text-pink-700 border-b pb-2">Address Information</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-3 rounded"/>
//                             <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="border p-3 rounded"/>
//                         </div>

//                         <div className="mt-6">
//                             <h2 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">Optional Information</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <input name="father_occupation" placeholder="Father Occupation" value={formData.father_occupation} onChange={handleChange} className="border p-3 rounded"/>
//                                 <input name="mother_occupation" placeholder="Mother Occupation" value={formData.mother_occupation} onChange={handleChange} className="border p-3 rounded"/>

//                                 <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="border p-3 rounded">
//                                     <option value="">Select Blood Group</option>
//                                     <option>A+</option>
//                                     <option>A-</option>
//                                     <option>B+</option>
//                                     <option>B-</option>
//                                     <option>AB+</option>
//                                     <option>AB-</option>
//                                     <option>O+</option>
//                                     <option>O-</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md"
//                     >
//                         Save Changes
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// }

















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

    // 🔥 Fetch states API
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

    // 📍 Permanent Address Pincode
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

    // 📍 School Pincode
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

    // 📸 Image Upload
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
                "http://localhost:5000/update-student-profile",
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

                {/* 📸 Image Upload */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={photo || "https://via.placeholder.com/120"}
                        className="w-28 h-28 rounded-full object-cover border-2 border-indigo-400 mb-2"
                    />
                    <label className="cursor-pointer text-indigo-600">
                        Upload Photo
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                    </label>
                </div>

                <h1 className="text-3xl font-bold text-indigo-600 mb-6">Edit Profile</h1>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Personal */}
                    <div className="bg-indigo-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded"/>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded"/>

                            <div>
                                {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className={`border p-3 rounded w-full ${phoneError ? "border-red-500" : ""}`}
                                />
                            </div>

                            <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" className="border p-3 rounded"/>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-3 rounded"/>

                            <select name="gender" value={formData.gender} onChange={handleChange} className="border p-3 rounded">
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-purple-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Education Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <select name="student_class" value={formData.student_class} onChange={handleChange} className="border p-3 rounded">
                                <option>Select Class</option>
                                <option>Class 6</option>
                                <option>Class 7</option>
                                <option>Class 8</option>
                                <option>Class 9</option>
                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                            </select>

                            <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="border p-3 rounded"/>

                            <input name="school_name" value={formData.school_name} onChange={handleChange} placeholder="School Name" className="border p-3 rounded"/>

                            <input name="school_code" value={formData.school_code} onChange={handleChange} placeholder="School Code" className="border p-3 rounded"/>

                            <select name="medium" value={formData.medium} onChange={handleChange} className="border p-3 rounded">
                                <option value="">Select Medium</option>
                                <option>Hindi Medium</option>
                                <option>English Medium</option>
                            </select>
                        </div>
                    </div>

                    {/* School Address */}
                    <div className="bg-yellow-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">School Address</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="school_address" value={formData.school_address} onChange={handleChange} placeholder="Address" className="border p-3 rounded"/>

                            
                            <select name="school_state" value={formData.school_state} onChange={handleChange} className="border p-3 rounded">
                                <option value="">Select State</option>
                                {states.map((s, i) => <option key={i}>{s}</option>)}
                            </select>

                            <input
                                name="school_pincode"
                                value={formData.school_pincode}
                                onChange={handleSchoolPincode}
                                placeholder="Pincode"
                                className="border p-3 rounded"
                            />
                            <input name="school_city" value={formData.school_city} onChange={handleChange} placeholder="City" className="border p-3 rounded"/>

                        </div>
                    </div>

                    {/* Permanent Address */}
                    <div className="bg-pink-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Permanent Address Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-3 rounded"/>
                           
                            <select name="state" value={formData.state} onChange={handleChange} className="border p-3 rounded">
                                <option value="">Select State</option>
                                {states.map((s, i) => <option key={i}>{s}</option>)}
                            </select>

                            <input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handlePincodeChange}
                                placeholder="Pincode"
                                className="border p-3 rounded"
                            />

                             <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-3 rounded"/>

                        </div>
                    </div>

                    {/* Parents */}
                    <div className="bg-green-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Parents Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father Name" className="border p-3 rounded"/>
                            <input name="mother_name" value={formData.mother_name} onChange={handleChange} placeholder="Mother Name" className="border p-3 rounded"/>
                            <input name="father_occupation" value={formData.father_occupation} onChange={handleChange} placeholder="Father Occupation" className="border p-3 rounded"/>
                            <input name="mother_occupation" value={formData.mother_occupation} onChange={handleChange} placeholder="Mother Occupation" className="border p-3 rounded"/>

                            <div>
                                {parentPhoneError && <p className="text-red-500 text-sm">{parentPhoneError}</p>}
                                <input
                                    name="parents_mobile"
                                    value={formData.parents_mobile}
                                    onChange={handleChange}
                                    placeholder="Parents Mobile"
                                    className={`border p-3 rounded w-full ${parentPhoneError ? "border-red-500" : ""}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Student Other Info */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold mb-4">Student Other Information</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <input name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="border p-3 rounded"/>
                            <input name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" className="border p-3 rounded"/>

                            <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="border p-3 rounded">
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

                            <input name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Hobbies" className="border p-3 rounded"/>
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
                        Save Changes
                    </button>

                </form>
            </div>
        </div>
    );
}