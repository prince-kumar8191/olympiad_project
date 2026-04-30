import { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {

    const [examCode, setExamCode] = useState("");
    const [studentId, setStudentId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const certificateRef = useRef();

    const generateCertificate = () => {

        if (!examCode || !studentId) {
            setError("Please enter Exam Code and Student ID");
            return;
        }

        setError("");

        const formattedCode = examCode.trim().toUpperCase();
        const formattedStudent = studentId.trim().toUpperCase();

        // 🔥 RESULT FETCH
        axios.get(`${import.meta.env.VITE_API_URL}/get-skill-result/${formattedCode}/${formattedStudent}`)
            .then(res => {

                if (res.data.error) {
                    setError(res.data.error);
                    return;
                }

                const result = res.data;

                // 🔥 STUDENT FETCH
                axios.get(`${import.meta.env.VITE_API_URL}/student/${formattedStudent}`)
                    .then(stuRes => {

                        const stu = stuRes.data;

                        setData({
                            student_name: stu.student_name || stu.name || "",
                            class: stu.student_class || "",
                            subject: stu.subject || "",
                            school_name: stu.school || stu.school_name || "",
                            rank: result.rank || "-",
                            exam_type: formattedCode,
                            date: new Date().toLocaleDateString()
                        });

                    });

            })
            .catch(() => setError("Server error"));
    };

    // 📄 PDF DOWNLOAD
    const downloadPDF = async () => {

        const element = certificateRef.current;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "px", [1100, 750]);

        pdf.addImage(imgData, "PNG", 0, 0, 1100, 750);
        pdf.save("certificate.pdf");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 p-6">

            {/* 🔍 INPUT BOX */}
            {!data && (
                <div className="bg-white p-8 rounded shadow text-center">

                    <h2 className="text-xl font-bold mb-2">Generate Certificate</h2>

                    <p className="text-sm text-gray-600 mb-4">
                        ⚠️ Enter the exam code given by the school here.
                    </p>

                    <input
                        type="text"
                        placeholder="Exam Code"
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value)}
                        className="border p-2 rounded w-64 mb-3"
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border p-2 rounded w-64"
                    />

                    <br />

                    <button
                        onClick={generateCertificate}
                        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded"
                    >
                        Generate Certificate
                    </button>

                    {error && (
                        <p className="text-red-500 mt-3">{error}</p>
                    )}

                </div>
            )}

            {/* 🎓 CERTIFICATE */}
            {data && (
                <>
                    <div
                        ref={certificateRef}
                        className="relative w-[1100px] h-[750px] rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
                    >

                        <img
                            src="/certificate-bg.png"
                            alt="certificate"
                            className="absolute w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 backdrop-blur-[6px] bg-white/10 border border-white/20"></div>

                        <div className="absolute inset-[10px] border-[3px] border-yellow-400 rounded-xl shadow-[0_0_25px_gold]"></div>

                        <div className="absolute inset-[20px] border border-white/30 rounded-lg"></div>

                        <div className="relative z-10 h-full text-center px-16 py-10 text-gray-800">

                            <div className="inline-block px-8 py-2 bg-[#0b3c5d]/90 text-white font-semibold tracking-widest rounded shadow-lg mb-4">
                                {data.school_name}
                            </div>

                            <h1 className="text-5xl font-bold">
                                CERTIFICATE OF ACHIEVEMENT
                            </h1>

                            <p className="text-blue-900 mt-2 text-lg">
                                (Online Skill Assessment Test)
                            </p>

                            <div className="w-40 h-[2px] bg-yellow-500 mx-auto my-4"></div>

                            <p className="mt-4 text-lg">This is to proudly certify that</p>

                            <div className="text-3xl font-bold border-b-2 border-gray-800 inline-block px-10 py-1 my-4">
                                {data.student_name}
                            </div>

                            <p className="text-lg">
                                of Class <b><span className="mx-2 border-b px-6">{data.class}</span></b>,
                                Subject <b><span className="mx-2 border-b px-6">{data.subject}</span></b>
                                from <b> {data.school_name}</b>
                            </p>

                            <p className="text-lg mt-3">
                                has successfully achieved RANK{" "}
                                <span className="bg-yellow-400 px-4 py-1 rounded font-bold">
                                    {data.rank}
                                </span>
                            </p>

                            <p className="text-blue-900 mt-3 text-lg">
                                in the online exam conducted by our institution.
                            </p>

                            <p className="italic mt-6 text-gray-700">
                                Keep striving for excellence!
                            </p>

                            <div className="flex justify-between mt-16 px-10">

                                <div>
                                    Date:
                                    <div className="border-t mt-2 w-44">
                                        {data.date}
                                    </div>
                                </div>

                                <div>
                                    Authorized School
                                    <div className="border-t mt-2 w-44"></div>
                                    {data.school_name}
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* ⬇️ DOWNLOAD BUTTON */}
                    <button
                        onClick={downloadPDF}
                        className="mt-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg"
                    >
                        Download PDF
                    </button>
                </>
            )}

        </div>
    );
}