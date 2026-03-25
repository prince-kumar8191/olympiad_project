import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CoordinatorRefer() {

const [referralCode,setReferralCode] = useState("")
const [totalReferrals,setTotalReferrals] = useState(0)
const [earnings,setEarnings] = useState(0)

const email = localStorage.getItem("CoordinatorEmail")

useEffect(()=>{

axios
.get(`http://localhost:5000/coordinator/profile/${email}`)
.then(res=>{

const data = res.data

setReferralCode(data.coordinatorId)
setTotalReferrals(data.totalReferrals)
setEarnings(data.creditPoints)

})
.catch(err=>console.log(err))

},[email])

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