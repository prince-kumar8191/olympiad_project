import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentsList() {

    const [students, setStudents] = useState([]);
    const school_code = localStorage.getItem("school_code");
    const navigate = useNavigate();

    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [form, setForm] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/school/all-students`, {
            school_code
        });

        setStudents(res.data.students || []);
    };

    // ✅ PAY ALL → sab pending
    const handlePayAll = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}0/school/update-all-payment`, {
                school_code
            });

            console.log("UPDATE RESPONSE:", res.data);

            fetchStudents();
            setShowPayment(true);

        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ FIXED SUBMIT (IMPORTANT)
    const submitPayment = async () => {
        try {

            if (!paymentMethod) {
                alert("❌ Please select payment method");
                return;
            }

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/school/save-payment-method`, {
                school_code,
                payment_method: paymentMethod,
                payment_details: form
            });

            console.log("SAVE PAYMENT:", res.data);

            fetchStudents(); // 🔥 refresh list after saving
            navigate("/Admin_stu_payment");

        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
        }
    };

    return (
        <div style={container}>
            <h1 style={heading}>📚 All Students (Class Wise)</h1>

            <div style={tableWrapper}>
                <table style={table}>
                    <thead>
                        <tr>
                            <th style={th}>Sr No</th>
                            <th style={th}>Name</th>
                            <th style={th}>Class</th>
                            <th style={th}>Email</th>
                            <th style={th}>Phone</th>
                            <th style={th}>Subject</th>
                            <th style={th}>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.length > 0 ? (
                            students.map((s, i) => (
                                <tr key={i} style={tr}>
                                    <td style={td}>{i + 1}</td>
                                    <td style={td}>{s.name}</td>
                                    <td style={td}>{s.class}</td>
                                    <td style={td}>{s.email}</td>
                                    <td style={td}>{s.phone}</td>
                                    <td style={td}>{s.subject}</td>

                                    <td style={td}>
                                        <span style={{
                                            color:
                                                s.payment_status === "unsuccessful"
                                                    ? "#ef4444"
                                                    : s.payment_status === "pending"
                                                        ? "#f59e0b"
                                                        : "#22c55e",
                                            fontWeight: "bold"
                                        }}>
                                            {s.payment_status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={noData}>
                                    🚫 No Students Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ BUTTON NICHE */}
            {students.length > 0 && (
                <button onClick={handlePayAll} style={payAllBtn}>
                    💳 Pay All Students
                </button>
            )}

            {/* 🔥 PAYMENT UI */}
            {showPayment && (
                <div style={paymentBox}>

                    <h2 style={{ marginBottom: "10px" }}>💳 Payment Details</h2>

                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={select}
                    >
                        <option value="" style={{ color: "black" }}>Select Payment Method</option>
                        <option value="upi" style={{ color: "black" }}>UPI ID</option>
                        <option value="scanner" style={{ color: "black" }}>UPI Scanner</option>
                        <option value="cash" style={{ color: "black" }}>Cash Payment</option>
                        <option value="bank" style={{ color: "black" }}>Bank Transfer</option>
                        <option value="cheque" style={{ color: "black" }}>Cheque</option>
                        <option value="draft" style={{ color: "black" }}>Demand Draft</option>
                    </select>

                    {/* 🔥 dynamic fields */}

                    {paymentMethod === "upi" && (
                        <input name="upi" placeholder="Enter UPI ID (example@upi)" onChange={handleChange} style={input} />
                    )}

                    {paymentMethod === "bank" && (
                        <>
                            <input name="account" placeholder="Account Number" onChange={handleChange} style={input} />
                            <input name="ifsc" placeholder="IFSC Code" onChange={handleChange} style={input} />
                            <input name="holder" placeholder="Account Holder Name" onChange={handleChange} style={input} />
                        </>
                    )}

                    {paymentMethod === "cheque" && (
                        <input name="cheque" placeholder="Cheque Number" onChange={handleChange} style={input} />
                    )}

                    {paymentMethod === "draft" && (
                        <input name="draft" placeholder="Demand Draft Number" onChange={handleChange} style={input} />
                    )}

                    {paymentMethod === "cash" && (
                        <p style={{ marginTop: "10px", color: "#94a3b8" }}>
                            Cash will be collected manually.
                        </p>
                    )}

                    <button onClick={submitPayment} style={submitBtn}>
                        ✅ Submit Payment
                    </button>

                </div>
            )}

        </div>
    );
}

/* ================= STYLES ================= */

const container = {
    padding: "30px",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
    textAlign: "center"
};

const heading = {
    marginBottom: "20px",
    fontSize: "28px"
};

const tableWrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "center"
};

const table = {
    width: "90%",
    borderCollapse: "collapse",
    background: "#1e293b",
    borderRadius: "10px",
    overflow: "hidden"
};

const th = {
    padding: "14px",
    background: "#020617",
    color: "white",
    borderBottom: "1px solid #334155"
};

const td = {
    padding: "12px",
    color: "white",
    borderBottom: "1px solid #334155"
};

const tr = {
    transition: "0.3s"
};

const payAllBtn = {
    marginTop: "20px",
    padding: "12px 25px",
    background: "orange",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
};

const paymentBox = {
    marginTop: "25px",
    padding: "25px",
    background: "#1e293b",
    borderRadius: "12px",
    maxWidth: "400px",
    marginInline: "auto"
};

const select = {
    padding: "10px",
    borderRadius: "10px",
    width: "100%",
    marginTop: "10px"
};

const input = {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    width: "100%"
};

const submitBtn = {
    marginTop: "15px",
    padding: "12px",
    background: "green",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold"
};

const noData = {
    padding: "20px",
    color: "#94a3b8",
    fontWeight: "bold"
};