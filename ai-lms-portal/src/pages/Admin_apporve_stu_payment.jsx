import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-students`);
      setStudents(res.data.students || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 SCHOOL WISE APPROVE
  const handleApproveSchool = async (school_code) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/approve-school`, {
        school_code
      });

      alert("✅ Payment Approved for School");
      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 GROUP BY SCHOOL
  const grouped = students.reduce((acc, curr) => {
    const key = curr.school_code;

    if (!acc[key]) {
      acc[key] = {
        school_name: curr.school_name,
        school_code: curr.school_code,
        address: curr.address,
        students: []
      };
    }

    acc[key].students.push(curr);
    return acc;
  }, {});

  return (
    <div style={container}>

      <h1 style={heading}>🏫 Admin Payment Dashboard</h1>

      {/* 🔥 LOOP SCHOOL WISE */}
      {Object.values(grouped).map((school, idx) => (

        <div key={idx} style={schoolBox}>

          {/* 🔥 SCHOOL HEADER */}
          <div style={schoolHeader}>
            <h2 style={schoolTitle}>🏫 School Name: {school.school_name}</h2>
            <p style={schoolInfo}>📌 School Code: {school.school_code}</p>
            <p style={schoolInfo}>📍 Address: {school.address}</p>

            {/* 🔥 APPROVE BUTTON (INSIDE BOX) */}
            <button
              onClick={() => handleApproveSchool(school.school_code)}
              style={approveBtn}
            >
              ✅ Approve Payment
            </button>
          </div>

          {/* 🔥 TABLE */}
          <div style={tableWrapper}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Sr No</th>
                  <th style={th}>Student Name</th>
                  <th style={th}>Class</th>
                  <th style={th}>Email</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Subject</th>
                  <th style={th}>Payment Method</th>
                  <th style={th}>Status</th>
                </tr>
              </thead>

              <tbody>
                {school.students.map((s, i) => (
                  <tr key={i}>
                    <td style={td}>{i + 1}</td>
                    <td style={td}>{s.name}</td>
                    <td style={td}>{s.class}</td>
                    <td style={td}>{s.email}</td>
                    <td style={td}>{s.phone}</td>
                    <td style={td}>{s.subject}</td>
                    <td style={td}>{s.payment_method}</td>

                    <td style={td}>
                      <span style={{
                        color:
                          s.payment_status === "pending"
                            ? "#f59e0b"
                            : "#22c55e",
                        fontWeight: "bold"
                      }}>
                        {s.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      ))}

      {/* ❌ NO DATA */}
      {students.length === 0 && (
        <div style={noData}>
          🚫 No Data Found
        </div>
      )}

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "30px",
  background: "#020617",
  minHeight: "100vh",
  color: "white"
};

const heading = {
  textAlign: "center",
  marginBottom: "20px"
};

/* 🔥 SCHOOL BOX */
const schoolBox = {
  border: "1px solid #334155",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "25px",
  background: "#0f172a"
};

const schoolHeader = {
  marginBottom: "15px",
  borderBottom: "1px solid #334155",
  paddingBottom: "10px"
};

/* 🔥 BIG TEXT */
const schoolTitle = {
  fontSize: "22px",
  fontWeight: "bold",
  marginBottom: "5px"
};

const schoolInfo = {
  fontSize: "16px",
  color: "#cbd5f5"
};

const approveBtn = {
  marginTop: "10px",
  padding: "10px 18px",
  background: "green",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold"
};

const tableWrapper = {
  width: "100%",
  overflowX: "auto"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#1e293b"
};

const th = {
  padding: "12px",
  background: "#020617",
  borderBottom: "1px solid #334155"
};

const td = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #334155",
  color: "white"
};

const noData = {
  textAlign: "center",
  marginTop: "50px",
  color: "#94a3b8"
};