// import React, { useState } from "react";

// export default function ReferPage() {
    

//     const referralCode = "STU12345";
//     const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;




//     // demo data (backend se aayega)
//     const [totalReferrals] = useState(8);
//     const [earnings] = useState(80);

//     const shareMessage = `Join this Olympiad platform and start learning 🚀



// Register here:
// ${referralLink}

// Use my referral code: ${referralCode}`;

//     const copyLink = async () => {
//         try {
//             await navigator.clipboard.writeText(referralLink);
//             alert("Referral link copied!");
//         } catch (err) {
//             console.error("Copy failed", err);
//         }
//     };

//     return (

//         <div className="min-h-screen bg-gray-100 p-8">

//             <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

//                 <h1 className="text-3xl font-bold text-indigo-600 mb-6">
//                     Refer & Earn
//                 </h1>

//                 {/* Stats Section */}
//                 <div className="grid grid-cols-2 gap-6 mb-8">

//                     <div className="bg-indigo-100 p-6 rounded-lg text-center">
//                         <p className="text-gray-600">Total Referrals</p>
//                         <h2 className="text-3xl font-bold text-indigo-700">
//                             {totalReferrals}
//                         </h2>
//                     </div>

//                     <div className="bg-green-100 p-6 rounded-lg text-center">
//                         <p className="text-gray-600">Total Earnings</p>
//                         <h2 className="text-3xl font-bold text-green-700">
//                             ₹{earnings}
//                         </h2>
//                     </div>

//                 </div>

//                 {/* Referral Code */}
//                 <div className="mb-6">
//                     <p className="text-gray-600">Your Referral Code</p>
//                     <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mt-2">
//                         <span className="text-xl font-bold">{referralCode}</span>
//                     </div>
//                 </div>

//                 {/* Referral Link */}
//                 <div className="mb-6">
//                     <p className="text-gray-600">Your Referral Link</p>

//                     <div className="flex gap-3 mt-2">

//                         <input
//                             type="text"
//                             value={referralLink}
//                             readOnly
//                             className="flex-1 p-3 border rounded-lg"
//                         />

//                         <button
//                             onClick={copyLink}
//                             className="bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-700"
//                         >
//                             Copy
//                         </button>

//                     </div>
//                 </div>

//                 {/* Share Section */}
//                 <h2 className="text-xl font-semibold mb-4">
//                     Share With Friends
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

//                     <a
//                         href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-green-500 text-white p-4 rounded-lg text-center hover:bg-green-600"
//                     >
//                         WhatsApp
//                     </a>

//                     <a
//                         href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700"
//                     >
//                         Facebook
//                     </a>

//                     <a
//                         href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-black text-white p-4 rounded-lg text-center hover:opacity-80"
//                     >
//                         Twitter
//                     </a>

//                     <a
//                         href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareMessage)}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-blue-400 text-white p-4 rounded-lg text-center hover:bg-blue-500"
//                     >
//                         Telegram
//                     </a>

//                 </div>
//                 {/* Info Banner */}

//                 <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg mb-6">

//                     <p className="font-semibold">
//                         Important
//                     </p>

//                     <p className="text-sm mt-1">
//                         Your total referral points can be used to reduce your Olympiad exam registration fee.
//                         The earned amount will be automatically adjusted during exam registration.
//                     </p>

//                 </div>

//                 {/* Referral Reward Rules Table */}

//                 <h2 className="text-xl font-semibold mb-4">
//                     Referral Reward Rules
//                 </h2>

//                 <div className="overflow-x-auto">

//                     <table className="w-full border text-center">

//                         <thead className="bg-gray-200">
//                             <tr>
//                                 <th className="p-3 border">Students Referred</th>
//                                 <th className="p-3 border">Credit per Student</th>
//                             </tr>
//                         </thead>

//                         <tbody>

//                             <tr>
//                                 <td className="p-3 border">1 – 10 students</td>
//                                 <td className="p-3 border">₹10 per student</td>
//                             </tr>

//                             <tr>
//                                 <td className="p-3 border">11 – 50 students</td>
//                                 <td className="p-3 border">₹12 per student</td>
//                             </tr>

//                             <tr>
//                                 <td className="p-3 border">51+ students</td>
//                                 <td className="p-3 border">₹15 per student</td>
//                             </tr>

//                         </tbody>

//                     </table>


//                 </div>

//             </div>

//         </div>
//     );

    
// }









import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReferPage() {

    const [referralCode, setReferralCode] = useState("");
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [earnings, setEarnings] = useState(0);

    const email = localStorage.getItem("VolunteerEmail");

    useEffect(() => {

        axios
            .get(`http://localhost:5000/volunteer/profile/${email}`)
            .then(res => {

                const data = res.data;

                setReferralCode(data.volunteerId);  // referral code
                setTotalReferrals(data.totalReferrals || 0);
                setEarnings(data.creditPoints || 0);

            })
            .catch(err => console.log(err));

    }, [email]);

    const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;

    const shareMessage = `Join this Olympiad platform and start learning 🚀

Register here:
${referralLink}

Use my referral code: ${referralCode}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            alert("Referral link copied!");
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

                <h1 className="text-3xl font-bold text-indigo-600 mb-6">
                    Refer & Earn
                </h1>

                {/* Stats Section */}

                <div className="grid grid-cols-2 gap-6 mb-8">

                    <div className="bg-indigo-100 p-6 rounded-lg text-center">
                        <p>Total Referrals</p>
                        <h2 className="text-3xl font-bold">
                            {totalReferrals}
                        </h2>
                    </div>

                    <div className="bg-green-100 p-6 rounded-lg text-center">
                        <p>Total Earnings</p>
                        <h2 className="text-3xl font-bold">
                            ₹{earnings}
                        </h2>
                    </div>

                </div>

                {/* Referral Code */}

                <div className="mb-6">

                    <p>Your Referral Code</p>

                    <div className="bg-gray-100 p-4 rounded-lg mt-2">

                        <span className="text-xl font-bold">
                            {referralCode}
                        </span>

                    </div>

                </div>

                {/* Referral Link */}

                <div className="mb-6">

                    <p>Your Referral Link</p>

                    <div className="flex gap-3 mt-2">

                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="flex-1 p-3 border rounded-lg"
                        />

                        <button
                            onClick={copyLink}
                            className="bg-indigo-600 text-white px-5 rounded-lg"
                        >
                            Copy
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}