import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentRefer() {
    const [referralCode, setReferralCode] = useState("");
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [rank, setRank] = useState("");

    useEffect(() => {
        const student = JSON.parse(localStorage.getItem("membership") || "{}");

        console.log("Student Data:", student); // 👈 DEBUG

        // ✅ FIX 1: Multiple fallback (important)
        const code =
            student.referredCode ||
            student.membershipId ||
            student.StudentId ||
            "";

        setReferralCode(code);

        // ✅ FIX 2: Backend se fresh data lao (BEST PRACTICE)
        if (code) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/get-member/${code}`)
                .then((res) => {
                    const data = res.data;

                    setTotalReferrals(data.totalReferrals || 0);
                    setEarnings(data.creditPoints || 0);

                    const refs = data.totalReferrals || 0;

                    // ⭐ Rank Logic
                    if (refs <= 10) {
                        setRank("⭐ Beginner");
                    } else if (refs <= 50) {
                        setRank("⭐⭐ Rising Star");
                    } else if (refs <= 100) {
                        setRank("⭐⭐⭐ Pro Referrer");
                    } else {
                        setRank("⭐⭐⭐⭐ Superstar 🌟");
                    }
                })
                .catch((err) => {
                    console.error("API Error:", err);
                });
        }
    }, []);

    const referralLink = `https://yourwebsite.com/register?ref=${referralCode}`;

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
                    Membership & Refer Program
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">

                    <div className="bg-indigo-100 p-6 rounded-lg text-center">
                        <p>Total Referrals</p>
                        <h2 className="text-3xl font-bold">{totalReferrals}</h2>
                    </div>

                    <div className="bg-green-100 p-6 rounded-lg text-center">
                        <p>Total Points</p>
                        <h2 className="text-3xl font-bold">{earnings}</h2>
                    </div>

                    <div className="bg-yellow-100 p-6 rounded-lg text-center">
                        <p>Membership Rank</p>
                        <h2 className="text-xl font-bold">{rank}</h2>
                    </div>

                </div>

                {/* Referral Code */}
                <div className="mb-6">
                    <p>Your Referral Code</p>
                    <div className="bg-gray-100 p-4 rounded-lg mt-2">
                        <span className="text-xl font-bold text-indigo-600">
                            {referralCode || "No Code Found"}
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

                {/* Conditions */}
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                    <h3 className="text-xl font-bold mb-3">Membership Levels</h3>
                    <ul className="space-y-2">
                        <li>⭐ 0–10 → Beginner</li>
                        <li>⭐⭐ 11–50 → Rising Star</li>
                        <li>⭐⭐⭐ 51–100 → Pro Referrer</li>
                        <li>⭐⭐⭐⭐ 101+ → Superstar 🌟</li>
                    </ul>
                </div>
                {/* Social Media Share */}
                <div className="mb-6">
                    <p className="font-semibold mb-2">Share on Social Media</p>

                    <div className="flex gap-3 flex-wrap">

                        {/* WhatsApp */}
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            WhatsApp
                        </a>

                        {/* Facebook */}
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Facebook
                        </a>

                        {/* Twitter */}
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Join using my referral link")}&url=${encodeURIComponent(referralLink)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-sky-500 text-white px-4 py-2 rounded-lg"
                        >
                            Twitter
                        </a>

                        {/* Telegram */}
                        <a
                            href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent("Join using my referral link")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
                        >
                            Telegram
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}
