









import React, { useState } from "react";
import axios from "axios";

export default function MockUpload() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsUploading(true);

            await axios.post(`${import.meta.env.VITE_API_URL}/upload-mock-questions`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Upload Successful ✅");
        } catch (err) {
            console.error(err);
            alert("Upload Failed ❌");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{
                background: "linear-gradient(135deg, #07111f, #0b1f36, #102944, #091829)",
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background Glow */}
            <div
                style={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    background: "rgba(0, 255, 170, 0.15)",
                    filter: "blur(100px)",
                    top: "-80px",
                    left: "-50px",
                    animation: "floatOne 7s ease-in-out infinite",
                    zIndex: 0,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: "260px",
                    height: "260px",
                    borderRadius: "50%",
                    background: "rgba(0, 153, 255, 0.18)",
                    filter: "blur(100px)",
                    bottom: "-50px",
                    right: "-40px",
                    animation: "floatTwo 8s ease-in-out infinite",
                    zIndex: 0,
                }}
            />

            {/* Main Upload Card */}
            <div
                className="w-full max-w-xl text-center"
                style={{
                    position: "relative",
                    zIndex: 2,
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "30px",
                    padding: "40px 30px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                    animation: "fadeUp 0.8s ease",
                }}
            >
                {/* Heading */}
                <h2
                    style={{
                        fontSize: "2rem",
                        fontWeight: "800",
                        marginBottom: "12px",
                        background: "linear-gradient(90deg, #00f5a0, #00d9ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 25px rgba(0,255,170,0.15)",
                    }}
                >
                    📘 Upload Mock Test Questions
                </h2>

                <p
                    style={{
                        color: "#cfd8dc",
                        fontSize: "14px",
                        marginBottom: "28px",
                    }}
                >
                    Upload your mock test Excel file with premium dashboard UI
                </p>

                {/* Upload Box */}
                <div
                    style={{
                        position: "relative",
                        border: "2px dashed rgba(0,255,170,0.45)",
                        borderRadius: "24px",
                        padding: "45px 20px",
                        background: "rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        transition: "0.35s ease",
                        overflow: "hidden",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.22)",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px) scale(1.01)";
                        e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,255,170,0.18)";
                        e.currentTarget.style.border = "2px dashed #00f5a0";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "0 10px 35px rgba(0,0,0,0.22)";
                        e.currentTarget.style.border = "2px dashed rgba(0,255,170,0.45)";
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
                            transform: "translateX(-100%)",
                            animation: "shine 3s infinite linear",
                        }}
                    />

                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    <div
                        style={{
                            fontSize: "60px",
                            marginBottom: "12px",
                            animation: "floatIcon 2.5s ease-in-out infinite",
                        }}
                    >
                        📁
                    </div>

                    <h3
                        style={{
                            color: "#00f5a0",
                            fontWeight: "800",
                            fontSize: "24px",
                            marginBottom: "10px",
                        }}
                    >
                        Upload Excel File
                    </h3>

                    <p style={{ color: "#d0d7de", fontSize: "14px" }}>
                        Click or Drag & Drop your file here
                    </p>

                    <span
                        style={{
                            display: "inline-block",
                            marginTop: "16px",
                            padding: "10px 18px",
                            background: "linear-gradient(90deg, #00c853, #00e5ff)",
                            color: "#fff",
                            borderRadius: "999px",
                            fontSize: "13px",
                            fontWeight: "700",
                            boxShadow: "0 10px 25px rgba(0,255,170,0.25)",
                        }}
                    >
                        .xlsx / .xls only
                    </span>
                </div>

                {/* File Info */}
                {file && (
                    <div
                        style={{
                            marginTop: "22px",
                            padding: "18px 20px",
                            borderRadius: "18px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                            animation: "fadeUp 0.7s ease",
                            textAlign: "left",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                color: "#fff",
                                fontSize: "14px",
                            }}
                        >
                            <div>
                                <strong style={{ color: "#00e5ff" }}>📄 File Name:</strong>{" "}
                                {file.name}
                            </div>
                            <div>
                                <strong style={{ color: "#00ff95" }}>📦 Size:</strong>{" "}
                                {(file.size / 1024).toFixed(2)} KB
                            </div>
                            <div>
                                <strong style={{ color: "#ffcc00" }}>📂 Type:</strong>{" "}
                                {file.type || "Excel File"}
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    style={{
                        marginTop: "28px",
                        padding: "15px 34px",
                        background: isUploading
                            ? "linear-gradient(90deg, #607d8b, #78909c)"
                            : "linear-gradient(90deg, #00c853, #00e5ff)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "999px",
                        cursor: isUploading ? "not-allowed" : "pointer",
                        fontWeight: "800",
                        fontSize: "16px",
                        letterSpacing: "0.5px",
                        boxShadow: "0 15px 35px rgba(0,255,170,0.28)",
                        transition: "0.35s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (!isUploading) {
                            e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                            e.currentTarget.style.boxShadow =
                                "0 20px 45px rgba(0,255,170,0.38)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 15px 35px rgba(0,255,170,0.28)";
                    }}
                >
                    {isUploading ? "⏳ Uploading..." : "🚀 Upload"}
                </button>
            </div>

            {/* Internal Animations */}
            <style>{`
                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shine {
                    0% {
                        transform: translateX(-120%);
                    }
                    100% {
                        transform: translateX(120%);
                    }
                }

                @keyframes floatIcon {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes floatOne {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(20px) translateX(15px);
                    }
                }

                @keyframes floatTwo {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-20px) translateX(-15px);
                    }
                }

                ::-webkit-scrollbar {
                    height: 10px;
                    width: 10px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.05);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #00e5ff, #00c853);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #00c853, #00e5ff);
                }
            `}</style>
        </div>
    );
}