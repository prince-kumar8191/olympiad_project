import React from "react";

function Awards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Student & School Awards
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Recognition and Criteria
        </p>
      </div>

      {/* SECTION */}
      <div className="grid gap-8">

        {/* Ranking System */}
        <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Olympiad Ranking System & Awards
          </h2>
          <p>Students are evaluated and awarded ranks at four levels:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>National Level</li>
            <li>State Level</li>
            <li>District Level</li>
            <li>School Level</li>
          </ul>
        </div>

        {/* Ranking Criteria */}
        <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Ranking Criteria
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Total score obtained in the examination</li>
            <li>Time taken to complete the test (preference is given to faster completion)</li>
          </ul>
        </div>

        {/* Tie Breaking */}
        <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Tie-Breaking Criteria
          </h2>
          <ol className="list-decimal ml-6 space-y-1">
            <li>Higher number of correct answers</li>
            <li>Shorter completion time</li>
            <li>Fewer incorrect answers</li>
            <li>Higher overall accuracy</li>
          </ol>
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">🏆 National Level</h3>
            <ul className="space-y-1">
              <li>Rank 1: Cash Prize ₹51,000/-</li>
              <li>Rank 2: Cash Prize ₹21,000/-</li>
              <li>Rank 3: Cash Prize ₹11,000/-</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-200 to-green-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">🥈 State Level</h3>
            <ul>
              <li>Rank 1: Cash Prize ₹5,100/-</li>
              <li>Rank 2: Cash Prize ₹2,100/-</li>
              <li>Rank 3: Cash Prize ₹1,100/-</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-200 to-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
            <h3 className="text-xl font-bold mb-3">🥉 District Level</h3>
            <ul>
              <li>Rank 1: Cash Prize ₹2,100/-</li>
              <li>Rank 2: Cash Prize ₹1,100/-</li>
              <li>Rank 3: Cash Prize ₹501/-</li>
            </ul>
          </div>
        </div>

        {/* Special Recognition */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Special Recognition
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Best Performers (Ranks 11–20) - Applicable for individually registered students</li>
            <li>Top 50 Students: Up to 50% scholarship/discount on NEET & JEE preparation programs</li>
            <li>Top 5 National Rankers: Higher education scholarships of up to ₹1,00,000 (shared among 5 students) to support careers in engineering, medical, and scientific fields</li>
            <li>School-Level Recognition: Gold, Silver, and Bronze medals for School Toppers and Class Toppers</li>
            <li>State & District Toppers: Special recognition with honors and awards</li>
            <li>All School & Class Toppers: Medal and Certificate</li>
            <li>All Participants: Digital Participation Certificate</li>
          </ul>
        </div>

        {/* School Awards */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            School Awards & Recognition
          </h2>
          <p className="mb-2 font-semibold">Academic Excellence School Award</p>
          <p>The Top 50 performing schools at the national, state, and district levels will be honored with the prestigious Academic Excellence School Award.</p>

          <p className="mt-3 font-semibold">Inspirational Educator Award</p>
          <p>Teachers-in-charge from top-performing schools will be recognized with the Inspirational Educator Award, along with attractive gifts and prizes.</p>

          <p className="mt-3 font-semibold">Outstanding Principal/Headmaster Award</p>
          <p>Principals and Headmasters of exceptionally performing schools will be honored with the Outstanding Principal/Headmaster Award, along with gifts and prizes.</p>
        </div>

        {/* Login */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Online School Login Facility
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>View registered student details</li>
            <li>Earn credit points for student participation</li>
            <li>Access performance reports and analytics</li>
            <li>Download results for students</li>
          </ul>
        </div>

        {/* Communication */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Communication & Alerts
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>SMS on registered mobile numbers</li>
            <li>Email notifications on registered email IDs</li>
            <li>Important alerts and announcements</li>
          </ul>
        </div>

        {/* Eligibility */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3">
            Cash Prize Eligibility Criteria
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>National Level (Ranks 1, 2 & 3): Minimum 4,500 students must participate nationwide</li>
            <li>State Level: Minimum 450 students must participate from the respective state</li>
            <li>District/Regional Level: Minimum 120 students must participate from the respective district/region</li>
          </ul>
        </div>

        {/* Terms */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl animate-pulse">
          <h2 className="text-2xl font-bold mb-3">
            Important Terms – National Ranks & Scholarships
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>As per BHAYAT Olympiad policies, the scholarship amounts awarded to National Rank 1 and Rank 2 holders will be distributed in installments over a specified number of years. The disbursement will continue until the full scholarship amount is awarded.</li>
            <li>The National Scholarship Program aims to provide long-term educational support to outstanding students. To ensure sustained academic benefit, BHAYAT Talent Management has implemented a structured, multi-year scholarship distribution policy.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Awards;