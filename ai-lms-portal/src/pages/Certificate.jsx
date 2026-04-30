



import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { default as logo, default as sideImage } from "../assets/logo.png";

export default function Certificate() {

    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const certificateRef = useRef();

    const [result, setResult] = useState(null);
    

    useEffect(() => {
        console.log("ID:", id);

        if (!id || id === ":id") {
            console.log("❌ Wrong ID");
            return;
        }

        // 🔥 Student API
        axios.get(`${import.meta.env.VITE_API_URL}/student/${id}`)
            .then(res => {
                console.log("STUDENT:", res.data);
                setStudent(res.data);
            })
            .catch(err => console.error("Student ERROR:", err));

        // 🔥 Result API (RANK YAHI SE AAYEGI)
        axios.get(`${import.meta.env.VITE_API_URL}/get-result/${id}`)
            .then(res => {
                console.log("RESULT:", res.data);
                setResult(res.data);
            })
            .catch(err => console.error("Result ERROR:", err));

    }, [id]);

    // 🔥 PDF DOWNLOAD
   const downloadPDF = async () => {
    try {
        const element = certificateRef.current;

        if (!element) {
            alert("Certificate not ready");
            return;
        }

        // 🔥 wait for render
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(element, {
            scale: 3, // 🔥 better quality
            useCORS: true,
            allowTaint: true,
            logging: true
        });

        const imgData = canvas.toDataURL("image/png");

        if (!imgData) {
            alert("Image generate nahi hui");
            return;
        }

        const pdf = new jsPDF("landscape", "mm", "a4");

        const pageWidth = 297;
        const pageHeight = 210;

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

        pdf.save(`Certificate_${id}.pdf`);

        console.log("✅ PDF Downloaded");

    } catch (error) {
        console.error("❌ PDF Error:", error);
        alert("PDF generate nahi ho raha");
    }
};

    if (!student) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // ✅ 🔥 SUBJECT FIX (ONLY ADDITION)
    const subject = student?.subject || student?.Subject;

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-2 sm:p-4">

            {/* CERTIFICATE */}
            <div ref={certificateRef} className="bg-[#d4cfc4] border-[10px] border-yellow-600 w-full max-w-6xl">

                <div className="flex flex-col lg:flex-row">

                    {/* LEFT SIDE */}
                    <div className="w-full lg:w-[260px] bg-[#cfc8bb] flex flex-col items-center justify-between py-4 px-3">

                        <img src={logo} alt="logo" className="w-36 lg:w-52" />


                        <div className="text-center text-xs text-gray-700">
                            <p className="font-bold">BHAYAT</p>
                            <p>Connecting People For Development</p>
                        </div>
                    </div>

                    {/* MAIN CERTIFICATE */}
                    <div className="flex-1 p-6 lg:p-10 text-sm lg:text-base">

                        {/* NSMO */}
                        <div className="flex justify-center gap-2 mb-2">
                            <span className="bg-blue-700 text-white px-3 py-1">N</span>
                            <span className="bg-orange-500 text-white px-3 py-1">S</span>
                            <span className="bg-green-600 text-white px-3 py-1">M</span>
                            <span className="bg-pink-500 text-white px-3 py-1">O</span>
                        </div>

                        <p className="text-center mb-2">Learn Today Lead Tomorrow</p>

                        <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6">
                            Certificate of Merit
                        </h1>

                        <p className="mb-4">
                            This is to certify that{" "}
                            <span className="border-b-2 border-black px-3 mx-1 font-semibold inline-block">
                                {student.name}
                            </span>
                        </p>

                        <p className="mb-4">
                            a student of Class{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {student.student_class}
                            </span>
                            , Subject.{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {subject || "-"}
                            </span>
                            , Section{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {student.section}
                            </span>
                        </p>

                        <p className="mb-4">
                            School Name{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {student.school}
                            </span>
                        </p>

                        <p className="mb-4">
                            Distt.{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {student.city}
                            </span>
                            {" "}State{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {student.state}
                            </span>
                        </p>

                        <p className="mb-4">
                            has secured National Rank{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {result?.nationalRank || "-"}
                            </span>
                            , Zonal Rank{" "}
                            <span className="border-b-2 border-black px-3 mx-1 inline-block">
                                {result?.districtRank || "-"}
                            </span>

                        </p>

                        <p className="mb-4">
                            in State / National Olympiad Examination conducted in November 2026.
                        </p>

                        <p className="mb-10">
                            He/She is hereby awarded this certificate in recognition of outstanding performance.
                        </p>

                        {/* FOOTER */}

                        <div className="flex justify-between items-end text-sm mt-10 border-t pt-4">

                            {/* LEFT */}
                            <div>
                                <p>New Delhi, India</p>
                                <p>
                                    {new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>

                            {/* CENTER */}
                            <div className="text-center">
                                <p className="font-semibold border-b-2 border-black inline-block px-2">Pawan Negi</p>
                                <p className="text-gray-600 ">Olympiad Director</p>
                            </div>

                            {/* RIGHT */}
                            <div className="text-center">
                                <p className="font-semibold border-b-2 border-black inline-block px-2">
                                    Suraj Rawat
                                </p>
                                <p className="text-gray-600">National General Secretary</p>
                            </div>

                        </div>

                        {/* TAGS */}
                        <div className="flex flex-wrap justify-center gap-3 mt-6 font-semibold">
                            <span className="bg-blue-700 text-white px-2 py-1">NSMO</span>
                            <span className="bg-orange-500 text-white px-2 py-1">NCSO</span>
                            <span className="bg-green-600 text-white px-2 py-1">NMO</span>
                            <span className="bg-pink-500 text-white px-2 py-1">NEO</span>
                            <span className="bg-purple-600 text-white px-2 py-1">NGKO</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <button
                onClick={downloadPDF}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
            >
                Download PDF
            </button>

        </div>
    );
}