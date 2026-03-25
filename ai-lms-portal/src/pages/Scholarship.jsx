import React from "react";
import { FaTrophy, FaAward, FaUserGraduate, FaMedal } from "react-icons/fa";

function ScholarshipPage() {
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <div className="relative h-[500px] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute w-full h-full bg-black opacity-60"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            BHAYAT - National Academic Excellence Scholarship
          </h1>

          <p className="text-xl mb-6">
            NAES 2026–27
          </p>

          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Apply Now
          </button>
        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          About NAES Scholarship
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed">
          The BHAYAT NGO is pleased to introduce the National Academic
          Excellence Scholarship (NAES) 2026–27. The main objective of this
          scholarship is to encourage and promote all-round academic
          development among students. The scholarship recognizes outstanding
          students who demonstrate academic excellence in various Skill Test
          and Olympiad examinations conducted by the BHAYAT NGO.
        </p>
      </div>

      {/* IMAGE GALLERY */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-16">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
      </div>

      {/* SELECTION CRITERIA */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
            Selection Criteria
          </h2>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              Scholarship winners from each class will be students who obtain
              the highest cumulative marks in any two Olympiad exams conducted
              during the year.
            </li>

            <li>
              For NSMO, NEO, NSO and NGKO Olympiads, highest marks obtained in
              any two Olympiad will be considered.
            </li>

            <li>
              If second level exams are not conducted, marks from the first
              level exams will be considered.
            </li>
          </ul>

        </div>
      </div>

      {/* SCHOLARSHIP NUMBERS */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Number of Scholarships
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div>
            <h3 className="text-4xl font-bold">260</h3>
            <p>Total Students Receiving Cash Scholarship</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">26</h3>
            <p>Zones Across India</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">₹2500</h3>
            <p>Cash Award Per Winner</p>
          </div>

        </div>

        <div className="max-w-4xl mx-auto mt-10 text-lg">
          <p>
            One student from each class (Class 1 to Class 10) from every
            state/zone will be selected.
          </p>

          <p className="mt-2">
            Maximum 5 winners will be selected from each state/zone for CASH
            Scholar.
          </p>

          <p className="mt-2">
            Top 50 students from national level will get discount in NEET and
            JEE exam preparation.
          </p>
        </div>

      </div>

      {/* AWARDS */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          Scholarship Award
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaTrophy className="text-3xl text-yellow-500" />
            Trophy
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaAward className="text-3xl text-green-500" />
            Cash Award ₹2,500
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaMedal className="text-3xl text-purple-500" />
            Citation Certificate
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaUserGraduate className="text-3xl text-indigo-500" />
            JEE / NEET Preparation Support
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            National Tour for 26 National Top Achievers
          </div>

        </div>
      </div>

      {/* TIE BREAKING */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
            Tie-Breaking Criteria
          </h2>

          <ol className="list-decimal ml-6 text-lg space-y-3 text-gray-700">
            <li>
              Students scoring higher cumulative marks in 1st level exams.
            </li>

            <li>
              Higher marks order: Mathematics → Science → English → General
              Knowledge → Computers → Social Studies → Hindi.
            </li>

            <li>
              Higher ranks in 2nd level exams in order: Mathematics → Science →
              English.
            </li>
          </ol>

        </div>
      </div>

      {/* RESULT */}
      <div className="bg-purple-700 text-white text-center py-14">

        <h2 className="text-3xl font-bold mb-4">
          Result Declaration
        </h2>

        <p className="text-lg">
          The winners of the National Academic Excellence Scholarship (NAES)
          2026–27 will be announced by the end of March 2027.
        </p>

      </div>

    </div>
  );
}

export default ScholarshipPage;