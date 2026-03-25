import Navbar from "../component/common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <Navbar />
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}