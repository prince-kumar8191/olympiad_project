export default function StatsCards() {
  return (
    <div className="flex gap-6 px-10 -mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition">
        <p className="text-gray-500">Subjects</p>
        <h2 className="text-3xl font-bold">+40</h2>
      </div>

      <div className="bg-purple-400 text-white p-6 rounded-2xl shadow-md hover:scale-105 transition">
        <p>Courses</p>
        <h2 className="text-3xl font-bold">+120</h2>
      </div>

      <div className="bg-yellow-400 p-6 rounded-2xl shadow-md hover:scale-105 transition">
        <p>Reviews</p>
        <h2 className="text-3xl font-bold">+180k</h2>
      </div>
    </div>
  );
}