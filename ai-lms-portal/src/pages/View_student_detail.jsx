import axios from "axios";
import { useState } from "react";


export default function Results() {

  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  const school_code = localStorage.getItem("school_code");

  const fetchResults = async () => {
    try {
      setSearched(true);

      console.log("Sending:", { school_code, class: className, subject });

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/school/results`, {
        school_code,
        class: className,
        subject
      });

      console.log("Response:", res.data);

      setData(res.data.students || []);
      setTotal(res.data.total || 0);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>📊 Results Dashboard</h1>

      {/* FILTERS */}
      <div style={filterBox}>

        <select
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select Class</option>
          {[6,7,8,9,10,11,12].map(c => (
            <option key={c} value={c}>Class {c}</option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select Subject</option>
          <option value="maths">Mathematics</option>
          <option value="science">Science</option>
        </select>

        <button onClick={fetchResults} style={btn}>
          🔍 Fetch Data
        </button>
      </div>

      {/* TOTAL */}
      {searched && (
        <div style={card}>
          <h2>Total Students: {total}</h2>
        </div>
      )}

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Sr No</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Class</th>
              <th style={th}>Subject</th>
               {/* 🔥 NEW */}
            </tr>
          </thead>

          <tbody>
            {/* ✔ Data available */}
            {data.length > 0 && data.map((s, i) => (
              <tr key={i}>
                <td style={td}>{i + 1}</td>
                <td style={td}>{s.name}</td>
                <td style={td}>{s.email}</td> 
                <td style={td}>{s.class}</td>
                <td style={td}>{s.subject}</td>
                 {/* 🔥 NEW */}
              </tr>
            ))}

            {/* ❌ No data AFTER search */}
            {searched && data.length === 0 && (
              <tr>
                <td colSpan="5" style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#94a3b8",
                  fontWeight: "bold"
                }}>
                  🚫 No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "30px",
  color: "white",
  background: "#0f172a",
  minHeight: "100vh"
};

const title = {
  fontSize: "32px",
  marginBottom: "20px"
};

const filterBox = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px"
};

const selectStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  outline: "none",
  cursor: "pointer"
};

const btn = {
  padding: "10px 20px",
  borderRadius: "10px",
  background: "cyan",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};

const card = {
  marginBottom: "20px",
  padding: "15px",
  background: "#1e293b",
  borderRadius: "12px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center"
};

const th = {
  padding: "12px",
  background: "#111827",
  color: "white",
  borderBottom: "1px solid #334155"
};

const td = {
  padding: "12px",
  textAlign: "center"
};