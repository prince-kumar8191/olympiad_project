


import axios from "axios";
import { useEffect, useState } from "react";

export default function AdmitControl() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);

    // 🔥 Fetch Students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/alls-students`);
            setStudents(res.data.data || []);
        } catch (err) {
            console.error(err);
            alert("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // 🔥 Toggle Admit Permission
    const toggleAdmitPermission = async (studentId, currentStatus, isPaid) => {

        if (!isPaid) {
            alert("Student payment not completed");
            return;
        }

        try {
            setUpdatingId(studentId);

            await axios.put(
                `${import.meta.env.VITE_API_URL}/admin/admit-permission/${studentId}`,
                {
                    admit_permission: !currentStatus
                }
            );

            fetchStudents();

        } catch (err) {
            console.error(err);
            alert("Update failed");
        } finally {
            setUpdatingId(null);
        }
    };

    // 🔍 Filter
    const filteredStudents = students.filter(s =>
        s.student_name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email?.toLowerCase().includes(search.toLowerCase()) ||
        s.StudentId?.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">

            <h1 className="text-3xl font-bold mb-8">
                🎫 Admit Card Permission Panel
            </h1>

            {/* 🔍 Search */}
            <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border rounded-lg mb-6 shadow"
            />

            {/* 📋 Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full text-center">

                    <thead className="bg-indigo-500 text-white">
                        <tr>
                            <th className="p-3">Name</th>
                            <th>Email</th>
                            <th>ID</th>
                            <th>Payment</th>
                            <th>Admit Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {loading ? (
                            <tr>
                                <td colSpan="6" className="p-5 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : filteredStudents.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-5 text-center text-gray-500">
                                    No students found
                                </td>
                            </tr>
                        ) : (

                            filteredStudents.map(s => {

                                const isPaid = s.payment_status === "success";
                                const isGranted = s.admit_permission === true;

                                return (
                                    <tr key={s.StudentId} className="border-t hover:bg-gray-50">

                                        <td className="p-3">{s.student_name}</td>
                                        <td>{s.email}</td>
                                        <td>{s.StudentId}</td>

                                        {/* 💳 Payment */}
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                isPaid
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-red-200 text-red-700"
                                            }`}>
                                                {isPaid ? "Paid" : "Not Paid"}
                                            </span>
                                        </td>

                                        {/* 🎫 Admit Status */}
                                        <td>
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                isGranted
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}>
                                                {isGranted ? "Granted" : "Not Granted"}
                                            </span>
                                        </td>

                                        {/* ⚙️ Action */}
                                        <td className="flex justify-center">

                                            {!isPaid ? (
                                                <span className="text-red-500 text-sm">
                                                    Not Eligible
                                                </span>
                                            ) : (
                                                <button
                                                    disabled={updatingId === s.StudentId}
                                                    onClick={() =>
                                                        toggleAdmitPermission(
                                                            s.StudentId,
                                                            isGranted,
                                                            isPaid
                                                        )
                                                    }
                                                    className={`px-3 py-1 rounded text-white ${
                                                        isGranted
                                                            ? "bg-red-500"
                                                            : "bg-green-500"
                                                    } ${
                                                        updatingId === s.StudentId
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                >
                                                    {updatingId === s.StudentId
                                                        ? "Updating..."
                                                        : isGranted
                                                            ? "Revoke"
                                                            : "Grant"}
                                                </button>
                                            )}

                                        </td>

                                    </tr>
                                );
                            })
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}