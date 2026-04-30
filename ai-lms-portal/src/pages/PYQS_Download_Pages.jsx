import React, { useState } from "react";

export default function PyqDownloadPage() {
    const [search, setSearch] = useState("");

    const pyqData = {
        6: {
            Maths: ["class-6-maths-1.pdf", "class-6-maths-2.pdf", "class-6-maths-3.pdf"],
            Science: ["class-6-science-1.pdf", "class-6-science-2.pdf"],
        },
        7: {
            Maths: ["class-7-maths-1.pdf"],
            Science: ["class-7-science-1.pdf"],
        },
        8: {
            Maths: ["class-8-maths-1.pdf"],
            Science: ["class-8-science-1.pdf"],
        },
        9: {
            Maths: ["class-9-maths-1.pdf"],
            Science: ["class-9-science-1.pdf"],
        },
        10: {
            English: ["class-10-english-1.pdf", "class-10-english-2.pdf", "class-10-english-3.pdf", "class-10-english-4.pdf","class-10-english-5.pdf"],
            Maths: ["class-10-maths-1.pdf", "class-10-maths-2.pdf", "class-10-maths-3.pdf", "class-10-maths-4.pdf", "class-10-maths-5.pdf"],
            Science: ["class-10-science-1.pdf", "class-10-science-2.pdf", "class-10-science-3.pdf"],
        },
        11: {
            Physics: ["class-11-physics-1.pdf"],
            Chemistry: ["class-11-chemistry-1.pdf"],
            Maths: ["class-11-maths-1.pdf"],
            Biology: ["class-11-biology-1.pdf"],
        },
        12: {
            Physics: ["class-12-physics-1.pdf", "class-12-physics-2.pdf", "class-12-physics-3.pdf", "class-12-physics-4.pdf", "class-12-physics-5.pdf"
                ,"class-12-physics-6.pdf", "class-12-physics-7.pdf"],
            Chemistry: ["class-12-chemistry-1.pdf", "class-12-chemistry-2.pdf", "class-12-chemistry-3.pdf", "class-12-chemistry-4.pdf", "class-12-chemistry-5.pdf", "class-12-chemistry-6.pdf",
                        "class-12-chemistry-7.pdf", "class-12-chemistry-8.pdf", "class-12-chemistry-9.pdf", "class-12-chemistry-10.pdf" ],
            Maths: ["class-12-Maths-1.pdf", "class-12-Maths-2.pdf", "class-12-Maths-3.pdf", "class-12-Maths-4.pdf", "class-12-Maths-5.pdf", "class-12-Maths-6.pdf", "class-12-Maths-7.pdf"],
            Biology: ["class-12-biology-1.pdf"],
        },
    };

    const openPDF = (file) => {
        const url = `/pdfs/${file}`;
        window.open(url, "_blank"); // 👉 open in new tab (viewer)
    };

    return (
        <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50">

            {/* HEADER */}
            <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-3">
                PYQ Download Center
            </h1>

            <p className="text-center text-gray-600 mb-8">
                Open PDF first, then download from viewer
            </p>

            {/* SEARCH */}
            <div className="max-w-xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search subject (Maths, Physics, English...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    className="w-full px-5 py-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            {/* GRID */}
            <div className="space-y-10 max-w-6xl mx-auto">

                {Object.keys(pyqData).map((cls) => {
                    const subjects = Object.keys(pyqData[cls]).filter((sub) =>
                        sub.toLowerCase().includes(search)
                    );

                    if (subjects.length === 0) return null;

                    return (
                        <div
                            key={cls}
                            className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-gray-100"
                        >

                            {/* CLASS TITLE */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-indigo-600">
                                    Class {cls}
                                </h2>

                                <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                                    PYQ Papers
                                </span>
                            </div>

                            {/* SUBJECTS */}
                            <div className="space-y-6">

                                {subjects.map((sub) => (
                                    <div key={sub} className="border-b pb-4 last:border-b-0">

                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            📘 {sub}
                                        </h3>

                                        <div className="flex flex-wrap gap-3">

                                            {pyqData[cls][sub].map((file, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => openPDF(file)}
                                                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
                                                >
                                                    Set {index + 1}
                                                </button>
                                            ))}

                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}