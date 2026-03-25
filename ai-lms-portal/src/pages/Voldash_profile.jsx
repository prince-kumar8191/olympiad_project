



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function VolunteerEditProfile() {

//     const navigate = useNavigate();
//     const [profile, setProfile] = useState({});

//     const storedVolunteer = JSON.parse(localStorage.getItem("volunteer") || "{}");

//     const [formData, setFormData] = useState({
//         name: storedVolunteer.name || "",
//         email: storedVolunteer.email || "",
//         phone: storedVolunteer.phone || "",
//         dob: storedVolunteer.dob || "",
//         course: storedVolunteer.course || "",
//         section: storedVolunteer.section || "",
//         school_name: storedVolunteer.school_name || "",
//         school_code: storedVolunteer.school_code || "",
//         school_address: storedVolunteer.school_address || "",
//         profession: storedVolunteer.profession || "",
//         skills: storedVolunteer.skills || "",
//         organization: storedVolunteer.organization || "",
//         experience: storedVolunteer.experience || "",
//         linkedin: storedVolunteer.linkedin || "",
//         github: storedVolunteer.github || "",
//         achievement: storedVolunteer.achievement || "",
//         address: storedVolunteer.address || "",
//         city: storedVolunteer.city || "",
//         state: storedVolunteer.state || "",
//         pincode: storedVolunteer.pincode || "",
//         father_name: storedVolunteer.father_name || "",
//         father_occupation: storedVolunteer.father_occupation || "",
//         mother_name: storedVolunteer.mother_name || "",
//         mother_occupation: storedVolunteer.mother_occupation || "",
//         blood_group: storedVolunteer.blood_group || "",
//         bank_holder_name: storedVolunteer.bank_holder_name || "",
//         bank_name: storedVolunteer.bank_name || "",
//         ifsc_code: storedVolunteer.ifsc_code || "",
//         account_number: storedVolunteer.account_number || ""
//     });

//     const [photo, setPhoto] = useState(storedVolunteer.photo || "https://via.placeholder.com/120");

//     useEffect(() => {

//     const stored = JSON.parse(localStorage.getItem("volunteer") || "{}");

//     // ✅ 1. pehle localStorage se show
//     if (stored) {
//         setProfile(stored);
//     }

//     const email = localStorage.getItem("volunteerEmail");

//     // ✅ 2. fir backend se fresh data
//     axios
//         .get(`http://localhost:5000/volunteer/profile/${email}`)
//         .then((res) => {

//             if (res.data) {

//                 const mergedData = {
//                     ...stored,
//                     ...res.data
//                 };

//                 setProfile(mergedData);

//                 // ✅ localStorage update
//                 localStorage.setItem("volunteer", JSON.stringify(res.data));
//             }

//         })
//         .catch((err) => console.log(err));

// }, []);


//     // 👇 Handle input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 👇 Handle photo
//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setPhoto(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // 👇 Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const email = localStorage.getItem("volunteerEmail");

//         const updatedData = {
//             ...formData,
//             email,
//             photo
//         };

//         try {
//             const res = await axios.post(
//               `http://localhost:5000/volunteer/update/${email}`,
//             updatedData
//             );

//            if (res.data && Object.keys(res.data).length > 0) {

//                 // ✅ Save updated data locally
//                 localStorage.setItem("volunteer", JSON.stringify(updatedData));

//                 alert("Profile Updated Successfully");

//                 navigate("/Volunteer_Profile", { replace: true });

//             } else {
//                 alert("Update Failed: " + res.data.message);
//             }

//         } catch (error) {
//             console.log(error);
//             alert("Server Error");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">

//             <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">

//                 <div className="flex justify-between items-start mb-8">

//                     <h1 className="text-3xl font-bold text-indigo-600">
//                         Edit Volunteer Profile
//                     </h1>

//                     <div className="text-center">
//                         <img
//                             src={photo}
//                             alt="profile"
//                             className="w-28 h-28 rounded-full object-cover border mx-auto"
//                         />

//                         <label className="mt-2 block cursor-pointer text-indigo-600 font-medium">
//                             Upload Photo
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handlePhotoChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>

//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-10">

//                     {/* PERSONAL */}
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded"/>
//                             <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-3 rounded"/>
//                             <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-3 rounded"/>
//                             <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-3 rounded"/>
//                         </div>
//                     </div>

//                     {/* EDUCATION */}
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">Education</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="course" value={formData.course} onChange={handleChange} placeholder="Course" className="border p-3 rounded"/>
//                             <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="border p-3 rounded"/>
//                             <input name="school_name" value={formData.school_name} onChange={handleChange} placeholder="School Name" className="border p-3 rounded"/>
//                             <input name="school_code" value={formData.school_code} onChange={handleChange} placeholder="School Code" className="border p-3 rounded"/>
//                             <input name="school_address" value={formData.school_address} onChange={handleChange} placeholder="School Address" className="border p-3 rounded md:col-span-2"/>
//                         </div>
//                     </div>

//                     {/* PROFESSIONAL */}
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">Professional</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" className="border p-3 rounded"/>
//                             <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" className="border p-3 rounded"/>
//                             <input name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" className="border p-3 rounded"/>
//                             <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="border p-3 rounded"/>
//                             <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" className="border p-3 rounded"/>
//                             <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub" className="border p-3 rounded"/>
//                             <input name="achievement" value={formData.achievement} onChange={handleChange} placeholder="Achievements" className="border p-3 rounded md:col-span-2"/>
//                         </div>
//                     </div>

//                     {/* ADDRESS */}
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">Address</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border p-3 rounded"/>
//                             <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border p-3 rounded"/>
//                             <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="border p-3 rounded"/>
//                             <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded"/>
//                         </div>
//                     </div>

//                     {/* OPTIONAL */}
//                     <div>
//                         <h2 className="text-xl font-semibold mb-4">Optional</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father Name" className="border p-3 rounded"/>
//                             <input name="father_occupation" value={formData.father_occupation} onChange={handleChange} placeholder="Father Occupation" className="border p-3 rounded"/>
//                             <input name="mother_name" value={formData.mother_name} onChange={handleChange} placeholder="Mother Name" className="border p-3 rounded"/>
//                             <input name="mother_occupation" value={formData.mother_occupation} onChange={handleChange} placeholder="Mother Occupation" className="border p-3 rounded"/>

//                             <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="border p-3 rounded">
//                                 <option value="">Select Blood Group</option>
//                                 <option>A+</option>
//                                 <option>A-</option>
//                                 <option>B+</option>
//                                 <option>B-</option>
//                                 <option>AB+</option>
//                                 <option>AB-</option>
//                                 <option>O+</option>
//                                 <option>O-</option>
//                             </select>

//                             <input name="bank_holder_name" value={formData.bank_holder_name} onChange={handleChange} placeholder="Bank Holder Name" className="border p-3 rounded"/>
//                             <input name="bank_name" value={formData.bank_name} onChange={handleChange} placeholder="Bank Name" className="border p-3 rounded"/>
//                             <input name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} placeholder="IFSC Code" className="border p-3 rounded"/>
//                             <input name="account_number" value={formData.account_number} onChange={handleChange} placeholder="Account Number" className="border p-3 rounded"/>
//                         </div>
//                     </div>

//                     <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
//                         Save Changes
//                     </button>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default VolunteerEditProfile;



















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VolunteerEditProfile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    const email = localStorage.getItem("volunteerEmail");

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

        // ✅ LOCAL LOAD
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

        // ✅ BACKEND FETCH
        const fetchLatest = async () => {
            try {

                const res = await axios.get(
                    `http://localhost:5000/volunteer/profile/${email}`
                );

                if (res.data && Object.keys(res.data).length > 0) {

                    const merged = {
                        ...localData,
                        ...res.data,
                        photo: res.data.photo || localData.photo // 🔥 FIX
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

    // ✅ INPUT CHANGE
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
                photo // 🔥 keep photo safe
            })
        );
    };

    // ✅ PHOTO CHANGE
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

    // ✅ SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            ...formData,
            email,
            photo
        };

        try {

            const res = await axios.post(
                `http://localhost:5000/volunteer/update/${email}`,
                updatedData
            );

            if (res.data) {

                localStorage.setItem(
                    `volunteer_${email}`,
                    JSON.stringify(updatedData)
                );

                setFormData(updatedData);
                setProfile(updatedData);
                setPhoto(updatedData.photo);

                alert("Profile Updated Successfully");

                navigate("/Volunteer_Profile", { replace: true });

            } else {
                alert("Update Failed");
            }

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    if (loading) {
        return <div className="p-10 text-center text-lg">Loading...</div>;
    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">

                <div className="flex justify-between items-start mb-6">

                    <h1 className="text-3xl font-bold text-indigo-600">
                        Edit Volunteer Profile
                    </h1>

                    <div className="text-center">
                        <img
                            src={photo}
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

                    {/* PERSONAL */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Full Name" className="border p-3 rounded"/>
                            <input name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="border p-3 rounded"/>
                            <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder="Phone" className="border p-3 rounded"/>
                            <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} className="border p-3 rounded"/>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Education</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="course" value={formData.course || ""} onChange={handleChange} placeholder="Course" className="border p-3 rounded"/>
                            <input name="section" value={formData.section || ""} onChange={handleChange} placeholder="Section" className="border p-3 rounded"/>
                            <input name="school_name" value={formData.school_name || ""} onChange={handleChange} placeholder="School Name" className="border p-3 rounded"/>
                            <input name="school_code" value={formData.school_code || ""} onChange={handleChange} placeholder="School Code" className="border p-3 rounded"/>
                            <input name="school_address" value={formData.school_address || ""} onChange={handleChange} placeholder="School Address" className="border p-3 rounded md:col-span-2"/>
                        </div>
                    </div>

                    {/* PROFESSIONAL */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Professional</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="profession" value={formData.profession || ""} onChange={handleChange} placeholder="Profession" className="border p-3 rounded"/>
                            <input name="skills" value={formData.skills || ""} onChange={handleChange} placeholder="Skills" className="border p-3 rounded"/>
                            <input name="organization" value={formData.organization || ""} onChange={handleChange} placeholder="Organization" className="border p-3 rounded"/>
                            <input name="experience" value={formData.experience || ""} onChange={handleChange} placeholder="Experience" className="border p-3 rounded"/>
                            <input name="linkedin" value={formData.linkedin || ""} onChange={handleChange} placeholder="LinkedIn" className="border p-3 rounded"/>
                            <input name="github" value={formData.github || ""} onChange={handleChange} placeholder="GitHub" className="border p-3 rounded"/>
                            <input name="achievement" value={formData.achievement || ""} onChange={handleChange} placeholder="Achievements" className="border p-3 rounded md:col-span-2"/>
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" className="border p-3 rounded"/>
                            <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" className="border p-3 rounded"/>
                            <input name="state" value={formData.state || ""} onChange={handleChange} placeholder="State" className="border p-3 rounded"/>
                            <input name="pincode" value={formData.pincode || ""} onChange={handleChange} placeholder="Pincode" className="border p-3 rounded"/>
                        </div>
                    </div>

                    {/* OPTIONAL */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Optional</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="father_name" value={formData.father_name || ""} onChange={handleChange} placeholder="Father Name" className="border p-3 rounded"/>
                            <input name="father_occupation" value={formData.father_occupation || ""} onChange={handleChange} placeholder="Father Occupation" className="border p-3 rounded"/>
                            <input name="mother_name" value={formData.mother_name || ""} onChange={handleChange} placeholder="Mother Name" className="border p-3 rounded"/>
                            <input name="mother_occupation" value={formData.mother_occupation || ""} onChange={handleChange} placeholder="Mother Occupation" className="border p-3 rounded"/>

                            <select name="blood_group" value={formData.blood_group || ""} onChange={handleChange} className="border p-3 rounded">
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

                            <input name="bank_holder_name" value={formData.bank_holder_name || ""} onChange={handleChange} placeholder="Bank Holder Name" className="border p-3 rounded"/>
                            <input name="bank_name" value={formData.bank_name || ""} onChange={handleChange} placeholder="Bank Name" className="border p-3 rounded"/>
                            <input name="ifsc_code" value={formData.ifsc_code || ""} onChange={handleChange} placeholder="IFSC Code" className="border p-3 rounded"/>
                            <input name="account_number" value={formData.account_number || ""} onChange={handleChange} placeholder="Account Number" className="border p-3 rounded"/>
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

export default VolunteerEditProfile;
