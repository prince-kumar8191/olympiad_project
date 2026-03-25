import { useState } from "react";

export default function HeroSection() {
  const [openPanel, setOpenPanel] = useState(null);

  return (
    <div className="relative bg-[#F4F1F8] rounded-3xl p-10 overflow-hidden">

      {/* HERO CONTENT */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div>
          <h1 className="text-5xl font-bold leading-tight">
            Find the right <span className="text-orange-500">course</span> for you
          </h1>

          <p className="text-gray-600 mt-6">
            Personalised recommendations based on your interests and goals.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition">
              Find course
            </button>

            <button className="text-orange-500 font-medium">
              View blog →
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="hero"
            className="w-72"
          />
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="flex gap-6 mt-10">
        <Card title="Subjects" value="+40" color="bg-white" onClick={() => setOpenPanel("subjects")} />
        <Card title="Courses" value="+120" color="bg-purple-400" />
        <Card title="Reviews" value="+180k" color="bg-yellow-400" />
      </div>

      {/* SLIDE PANEL */}
      {openPanel === "subjects" && (
        <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-xl animate-slideUp">
          <h2 className="text-xl font-semibold mb-4">Subjects</h2>
          <div className="flex flex-wrap gap-3">
            {["Math", "Science", "English", "Physics"].map((sub) => (
              <div key={sub} className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                {sub}
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpenPanel(null)}
            className="mt-4 text-red-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function Card({ title, value, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} rounded-2xl p-6 w-48 cursor-pointer hover:scale-105 transition shadow-md`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}