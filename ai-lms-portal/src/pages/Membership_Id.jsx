import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import image from "../image/Bhayat.png";

function MembershipID() {
    const [profile, setProfile] = useState({});
    const cardRef = useRef();

    useEffect(() => {
    const membershipId = localStorage.getItem("membershipId");
    
    if (!membershipId) {
        console.error("No membershipId found in localStorage");
        return;
    }

    axios
        .get(`${import.meta.env.VITE_API_URL}/api/membership/${membershipId}`)
        .then((res) => {
            console.log("API Response:", res.data); // 👈 check this
            setProfile(res.data);
        })
        .catch((err) => {
            console.error("API Error:", err);
        });

}, []);

    const downloadID = async () => {
        if (!cardRef.current) return;
        await new Promise((res) => setTimeout(res, 100));

        const canvas = await html2canvas(cardRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 20, 20, 170, 100);
        pdf.save("Membership_ID.pdf");
    };

    const joinDate = profile.joinDate ? new Date(profile.joinDate) : new Date();
    const expiryDate = new Date(joinDate);
    expiryDate.setFullYear(joinDate.getFullYear() + 1);

    return (
        <div className="flex flex-col items-center mt-10">

            <div
                ref={cardRef}
                className="flex gap-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl"
            >

                {/* FRONT CARD */}
                <div className="w-64 bg-white rounded-2xl shadow-lg p-5 text-center relative overflow-hidden">

                    {/* Logo */}
                    <img
                        src={image}
                        alt="Bhayat Logo"
                        className="w-16 h-16 absolute top-2 left-2 object-contain"
                    />

                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>

                    <h2 className="text-2xl font-extrabold text-blue-700 mb-2 mt-10 ml-6">
                        BHAYAT NGO
                    </h2>

                    {/* Profile Photo */}
                    <img
                        src={profile.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        alt="profile"
                        className="w-28 h-28 rounded-full mx-auto mt-6 border-4 border-blue-300 object-cover"
                    />

                    <h3 className="text-lg font-semibold mt-4">
                        {profile.name || "Name"}
                    </h3>

                    <p className="text-gray-500 mb-4">
                        {profile.designation || "Member"}
                    </p>

                    {/* Details */}
                    <div className="text-left text-sm space-y-1 mt-2">
                        <p><b>Bhayat ID :</b> {profile.bhayatId || "N/A"}</p> {/* NEW FIELD */}
                        <p><b>Member ID :</b> {profile.membershipId || "N/A"}</p>
                        <p><b>Mobile:</b> {profile.phone || "N/A"}</p>
                        <p><b>Email:</b> {profile.email || "N/A"}</p>
                        <p><b>Blood Group:</b> {profile.blood_group || "N/A"}</p>
                    </div>

                </div>

                {/* BACK CARD */}
                <div className="w-64 bg-white rounded-2xl shadow-lg p-5 relative overflow-hidden">

                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-30"></div>

                    <h2 className="text-xl font-bold text-blue-700 text-center">
                        Membership Details
                    </h2>

                    <div className="mt-6 text-sm space-y-2">
                        <p><b>Joining Date:</b> {joinDate.toLocaleDateString()}</p>
                        <p><b>Validity:</b> {expiryDate.toLocaleDateString()}</p>
                    </div>

                    <div className="mt-14 text-center">
                        <p className="italic text-gray-500">Authorized Sign</p>
                    </div>

                    <div className="mt-14 text-center">
                        <p className="italic text-gray-500">Contact Us</p>
                        <p>9711301699 , 9250697640</p>
                        <p>support@bhayat.org</p>
                    </div>

                    <div className="mt-10 text-xs text-gray-600">
                        <p>• This card is property of Bhayat Foundation</p>
                        <p>
                            • If found please return to organisation
                            D-322/8 Phase IV Aya Nagar Ext New Delhi 110057
                        </p>
                        <p>• Card must be carried during duty</p>
                    </div>

                </div>

            </div>

            <button
                onClick={downloadID}
                className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                Download ID Card
            </button>

        </div>
    );
}

export default MembershipID;