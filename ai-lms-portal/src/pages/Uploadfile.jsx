
import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function UploadExcelDynamic() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile) return;

        setFile(uploadedFile);

        const reader = new FileReader();

        reader.onload = (evt) => {
            const data = evt.target.result;

            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                defval: "", // 🔥 empty cell handle karega
            });

            console.log("Excel Data 👉", jsonData); // 👈 DEBUG

            setData(jsonData);
        };

        reader.readAsBinaryString(uploadedFile);
    };

    // ✏️ Edit
    const handleChange = (index, field, value) => {
        const updated = [...data];
        updated[index][field] = value;
        setData(updated);
    };

    // ❌ Delete Row
    const deleteRow = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    // 🚀 Upload
    const handleUpload = async () => {
        try {
            setIsUploading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/upload-questions`, {
                questions: data,
            });
            alert("Uploaded Successfully");
        } catch (err) {
            alert("Upload Failed");
        } finally {
            setIsUploading(false);
        }
    };

    // 🔍 Search Filter
    const filteredData = data.filter((row) =>
        Object.values(row).some((val) =>
            String(val).toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "30px",
                fontFamily: "'Poppins', sans-serif",
                background:
                    "linear-gradient(135deg, #07111f, #0b1f36, #102944, #091829)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Floating Background Blur Circles */}
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

            {/* Header */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    marginBottom: "30px",
                    textAlign: "center",
                    animation: "fadeDown 0.8s ease",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.4rem",
                        fontWeight: "800",
                        marginBottom: "10px",
                        background: "linear-gradient(90deg, #00f5a0, #00d9ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 0 30px rgba(0,255,170,0.2)",
                    }}
                >
                    📂 Upload Questions Dashboard
                </h1>
                <p style={{ color: "#cfd8dc", fontSize: "15px" }}>
                    Excel upload, preview, edit, manage and upload questions with premium UI
                </p>
            </div>

            {/* Stats Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {[
                    {
                        title: "Selected File",
                        value: file ? file.name : "No File",
                        icon: "📄",
                        color: "#00e5ff",
                    },
                    {
                        title: "Total Rows",
                        value: data.length,
                        icon: "📊",
                        color: "#00ff95",
                    },
                    {
                        title: "Filtered Rows",
                        value: filteredData.length,
                        icon: "🔍",
                        color: "#ffcc00",
                    },
                    {
                        title: "File Size",
                        value: file ? `${(file.size / 1024).toFixed(2)} KB` : "0 KB",
                        icon: "💾",
                        color: "#ff6ec7",
                    },
                ].map((card, i) => (
                    <div
                        key={i}
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            backdropFilter: "blur(14px)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "22px",
                            padding: "22px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                            transition: "0.35s ease",
                            cursor: "pointer",
                            animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                            e.currentTarget.style.boxShadow =
                                `0 18px 40px ${card.color}33`;
                            e.currentTarget.style.border = `1px solid ${card.color}`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0) scale(1)";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
                            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                        }}
                    >
                        <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
                        <div style={{ fontSize: "14px", color: "#b0bec5", marginBottom: "8px" }}>
                            {card.title}
                        </div>
                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                color: card.color,
                                wordBreak: "break-word",
                            }}
                        >
                            {card.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Box */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    border: "2px dashed rgba(0,255,170,0.45)",
                    padding: "55px 25px",
                    textAlign: "center",
                    borderRadius: "28px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(14px)",
                    cursor: "pointer",
                    transition: "0.4s ease",
                    overflow: "hidden",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                    animation: "zoomIn 0.8s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,255,170,0.18)";
                    e.currentTarget.style.border = "2px dashed #00f5a0";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.25)";
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
                    onChange={handleFileChange}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer",
                        zIndex: 3,
                    }}
                />

                <div
                    style={{
                        fontSize: "60px",
                        marginBottom: "10px",
                        animation: "floatIcon 2.5s ease-in-out infinite",
                    }}
                >
                    📁
                </div>

                <h2
                    style={{
                        margin: "10px 0",
                        color: "#00f5a0",
                        fontWeight: "800",
                        fontSize: "28px",
                    }}
                >
                    Upload Excel File
                </h2>

                <p style={{ color: "#d0d7de", fontSize: "15px" }}>
                    Click or Drag & Drop your Excel file here
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
                        position: "relative",
                        zIndex: 2,
                        marginTop: "20px",
                        padding: "18px 20px",
                        borderRadius: "18px",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(10px)",
                        animation: "fadeUp 0.7s ease",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    }}
                >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                        <div>
                            <strong style={{ color: "#00e5ff" }}>📄 File Name:</strong>{" "}
                            <span style={{ color: "#fff" }}>{file.name}</span>
                        </div>
                        <div>
                            <strong style={{ color: "#00ff95" }}>📦 Size:</strong>{" "}
                            <span style={{ color: "#fff" }}>
                                {(file.size / 1024).toFixed(2)} KB
                            </span>
                        </div>
                        <div>
                            <strong style={{ color: "#ffcc00" }}>🗂️ Rows Loaded:</strong>{" "}
                            <span style={{ color: "#fff" }}>{data.length}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Table */}
            {data.length > 0 && (
                <>
                    {/* Search + Heading */}
                    <div
                        style={{
                            position: "relative",
                            zIndex: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "15px",
                            marginTop: "35px",
                            marginBottom: "15px",
                            animation: "fadeUp 0.8s ease",
                        }}
                    >
                        <h3
                            style={{
                                margin: 0,
                                fontSize: "28px",
                                fontWeight: "800",
                                color: "#ffffff",
                            }}
                        >
                            📝 Preview & Edit Questions
                        </h3>

                        <input
                            type="text"
                            placeholder="🔍 Search anything..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                width: "280px",
                                borderRadius: "14px",
                                border: "1px solid rgba(255,255,255,0.15)",
                                outline: "none",
                                background: "rgba(255,255,255,0.08)",
                                color: "#fff",
                                backdropFilter: "blur(8px)",
                                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                                transition: "0.3s",
                            }}
                            onFocus={(e) => {
                                e.target.style.border = "1px solid #00e5ff";
                                e.target.style.boxShadow =
                                    "0 0 0 4px rgba(0,229,255,0.12)";
                            }}
                            onBlur={(e) => {
                                e.target.style.border =
                                    "1px solid rgba(255,255,255,0.15)";
                                e.target.style.boxShadow =
                                    "0 8px 20px rgba(0,0,0,0.2)";
                            }}
                        />
                    </div>

                    <div
                        style={{
                            overflowX: "auto",
                            borderRadius: "24px",
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backdropFilter: "blur(14px)",
                            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                            position: "relative",
                            zIndex: 2,
                            animation: "fadeUp 0.9s ease",
                        }}
                    >
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: "1250px",
                            }}
                        >
                            <thead
                                style={{
                                    background:
                                        "linear-gradient(90deg, #00c853, #00bcd4, #1565c0)",
                                    color: "#fff",
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <tr>
                                    <th style={thStyle}>#</th>
                                    <th style={thStyle}>Exam</th>
                                    <th style={thStyle}>Question</th>
                                    <th style={thStyle}>Opt1</th>
                                    <th style={thStyle}>Opt2</th>
                                    <th style={thStyle}>Opt3</th>
                                    <th style={thStyle}>Opt4</th>
                                    <th style={thStyle}>Correct</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((row, index) => (
                                    <tr
                                        key={index}
                                        style={{
                                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                                            transition: "0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                "rgba(255,255,255,0.06)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                        }}
                                    >
                                        <td style={tdStyle}>
                                            <div
                                                style={{
                                                    width: "36px",
                                                    height: "36px",
                                                    borderRadius: "50%",
                                                    background:
                                                        "linear-gradient(135deg, #00e5ff, #00c853)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontWeight: "700",
                                                    color: "#fff",
                                                    margin: "auto",
                                                    boxShadow:
                                                        "0 6px 15px rgba(0,229,255,0.25)",
                                                }}
                                            >
                                                {index + 1}
                                            </div>
                                        </td>

                                        {[
                                            "examCode",
                                            "question",
                                            "option1",
                                            "option2",
                                            "option3",
                                            "option4",
                                            "correctAnswer",
                                        ].map((field) => (
                                            <td key={field} style={tdStyle}>
                                                <input
                                                    value={row[field] || ""}
                                                    onChange={(e) =>
                                                        handleChange(index, field, e.target.value)
                                                    }
                                                    placeholder={`Enter ${field}`}
                                                    style={{
                                                        width: "100%",
                                                        padding: "12px 14px",
                                                        borderRadius: "12px",
                                                        border:
                                                            "1px solid rgba(255,255,255,0.12)",
                                                        background: "rgba(255,255,255,0.08)",
                                                        color: "#fff",
                                                        outline: "none",
                                                        fontSize: "14px",
                                                        transition: "0.3s ease",
                                                        boxSizing: "border-box",
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.border = "1px solid #00e5ff";
                                                        e.target.style.boxShadow =
                                                            "0 0 0 4px rgba(0,229,255,0.12)";
                                                        e.target.style.transform = "scale(1.02)";
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.border =
                                                            "1px solid rgba(255,255,255,0.12)";
                                                        e.target.style.boxShadow = "none";
                                                        e.target.style.transform = "scale(1)";
                                                    }}
                                                />
                                            </td>
                                        ))}

                                        <td style={tdStyle}>
                                            <button
                                                onClick={() => deleteRow(index)}
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, #ff1744, #ff5252)",
                                                    color: "#fff",
                                                    border: "none",
                                                    padding: "12px 18px",
                                                    borderRadius: "12px",
                                                    cursor: "pointer",
                                                    fontWeight: "700",
                                                    boxShadow:
                                                        "0 10px 20px rgba(255,82,82,0.25)",
                                                    transition: "0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform =
                                                        "translateY(-3px) scale(1.05)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 14px 28px rgba(255,82,82,0.35)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform =
                                                        "translateY(0) scale(1)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 10px 20px rgba(255,82,82,0.25)";
                                                }}
                                            >
                                                🗑 Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Upload Button */}
                    <div
                        style={{
                            position: "relative",
                            zIndex: 2,
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "30px",
                            animation: "fadeUp 1s ease",
                        }}
                    >
                        <button
                            onClick={handleUpload}
                            disabled={isUploading}
                            style={{
                                padding: "16px 34px",
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
                                    e.currentTarget.style.transform =
                                        "translateY(-4px) scale(1.03)";
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
                            {isUploading ? "⏳ Uploading..." : "🚀 Final Upload"}
                        </button>
                    </div>
                </>
            )}

            {/* Internal Styles */}
            <style>{`
                @keyframes fadeDown {
                    from {
                        opacity: 0;
                        transform: translateY(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

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

                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
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

                input::placeholder {
                    color: rgba(255,255,255,0.55);
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

const thStyle = {
    padding: "18px 14px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
};

const tdStyle = {
    padding: "14px",
    verticalAlign: "top",
};

export default UploadExcelDynamic;