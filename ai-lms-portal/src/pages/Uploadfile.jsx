import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function UploadExcelDynamic() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);



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
                defval: "",   // 🔥 empty cell handle karega
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
            await axios.post("http://localhost:5000/upload-questions", {
                questions: data
            });
            alert("Uploaded Successfully");
        } catch (err) {
            alert("Upload Failed");
        }
    };

    return (
        <div style={{ padding: "30px", fontFamily: "Arial" }}>

            <h2 style={{ marginBottom: "20px" }}>📂 Upload Questions</h2>

            {/* Upload Box */}
            <div
                style={{
                    border: "2px dashed #999",
                    padding: "30px",
                    textAlign: "center",
                    borderRadius: "10px",
                    background: "#fafafa"
                }}
            >
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                <p>Drag & Drop or Select Excel File</p>
            </div>

            {/* File Info */}
            {file && (
                <div style={{ marginTop: "15px" }}>
                    <strong>📄 File Name:</strong> {file.name} <br />
                    <strong>📦 Size:</strong> {(file.size / 1024).toFixed(2)} KB
                </div>
            )}

            {/* Preview Table */}
            {data.length > 0 && (
                <>
                    <h3 style={{ marginTop: "30px" }}>Preview & Edit</h3>

                    <div style={{ overflowX: "auto" }}>
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginTop: "10px"
                            }}
                        >
                            <thead style={{ background: "#333", color: "#fff" }}>
                                <tr>
                                    <th>Exam</th>
                                    <th>Question</th>
                                    <th>Opt1</th>
                                    <th>Opt2</th>
                                    <th>Opt3</th>
                                    <th>Opt4</th>
                                    <th>Correct</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        {[
                                            "examCode",
                                            "question",
                                            "option1",
                                            "option2",
                                            "option3",
                                            "option4",
                                            "correctAnswer"
                                        ].map((field) => (
                                            <td key={field}>
                                                <input
                                                    value={row[field] || ""}
                                                    onChange={(e) =>
                                                        handleChange(index, field, e.target.value)
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        padding: "5px",
                                                        border: "1px solid #ccc"
                                                    }}
                                                />
                                            </td>
                                        ))}

                                        <td>
                                            <button
                                                onClick={() => deleteRow(index)}
                                                style={{
                                                    background: "red",
                                                    color: "#fff",
                                                    border: "none",
                                                    padding: "5px 10px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        style={{
                            marginTop: "20px",
                            padding: "10px 20px",
                            background: "green",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        🚀 Final Upload
                    </button>
                </>
            )}
        </div>
    );
}

export default UploadExcelDynamic;