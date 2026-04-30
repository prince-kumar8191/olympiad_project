import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import image from "../../image/Bhayat.png";
import Bhayat from "../About";

function VolunteerID() {
    const [profile, setProfile] = useState({});
    const cardRef = useRef();

    useEffect(() => {
        const email = localStorage.getItem("VolunteerEmail");
        axios
            .get(`${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`)
            .then((res) => {
                setProfile(res.data);
            });
    }, []);

    const downloadID = async () => {
        if (!cardRef.current) return;
        await new Promise((res) => setTimeout(res, 100));
        const canvas = await html2canvas(cardRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 20, 20, 170, 100);
        pdf.save("Volunteer_ID.pdf");
    };

    const joinDate = profile.joinDate ? new Date(profile.joinDate) : new Date();
    const expiryDate = new Date(joinDate);
    expiryDate.setFullYear(joinDate.getFullYear() + 1);

    return (
        <div className="flex flex-col items-center mt-10">

            <div
                ref={cardRef}
                className="flex gap-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
            >

                {/* FRONT CARD */}
                <div className="w-64 bg-white rounded-2xl shadow-lg p-5 text-center relative overflow-hidden">

                    {/* Logo */}
                    <img
                        src={image}
                        alt="Bhayat Logo"
                        className="w-16 h-16 absolute top-2 left-2 object-contain"
                    />

                    {/* Decorative circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>

                    {/* Header: shift slightly right and down */}
                    <h2 className="text-2xl font-extrabold text-blue-700 mb-2 mt-10 ml-6">
                        BHAYAT NGO
                    </h2>

                    {/* Profile photo */}

                    <img
                        src={profile.photo || "photo"}
                        alt="profile"
                        className="w-28 h-28 rounded-full mx-auto mt-6 border-4 border-blue-300 object-cover"
                    />

                    {/* Name & designation */}
                    <h3 className="text-lg font-semibold mt-4">{profile.name || "Name"}</h3>
                    <p className="text-gray-500 mb-4">{profile.designation || "Volunteer"}</p>

                    {/* Details: add mt-2 for spacing from above */}
                    <div className="text-left text-sm space-y-1 mt-2">
                        <p><b>Volunteer ID :</b> {profile.volunteerId || "N/A"}</p>
                        <p><b>Mobile:</b> {profile.mobile || "N/A"}</p>
                        <p><b>Email:</b> {profile.email || "N/A"}</p>
                        <p><b>Blood Group:</b> {profile.blood_group || "N/A"}</p>
                    </div>

                </div>
                {/* BACK CARD */}
                <div className="w-64 bg-white rounded-2xl shadow-lg p-5 relative overflow-hidden">
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-30"></div>
                    <h2 className="text-xl font-bold text-blue-700 text-center">Volunteer Details</h2>

                    <div className="mt-6 text-sm space-y-2">
                        <p><b>Joining Date:</b> {joinDate.toLocaleDateString()}</p>
                        <p><b>Validity:</b> {expiryDate.toLocaleDateString()}</p>

                    </div>

                    <div className="mt-14 text-center">
                        <p className="italic text-gray-500">Authorized Sign</p>
                    </div>
                    <div className="mt-14 text-center">
                        <p className="italic text-gray-500">ContactUs</p>
                        <p className="italic text-black-500">9711301699 , 9250697640</p>
                        <p className="italic text-black-500">support@bhayat.org</p>
                    </div>
                    <div className="mt-10 text-xs text-gray-600">
                        <p>• This card is property of Bhayat Foundation</p>
                        <p>• If found please return to organisation
                            D-322/8 Phase IV Aya Nagar Ext New Delhi 110057
                        </p>
                        <p>• Card must be carried during duty</p>
                    </div>

                </div>

            </div>

            <button
                onClick={downloadID}
                className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
                Download ID Card
            </button>

        </div>
    );
}

export default VolunteerID;



