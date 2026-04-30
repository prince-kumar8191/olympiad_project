import React, { useEffect, useState } from "react";
import axios from "axios";

function Cor_Task() {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("CoordinatorEmail");

    if (!email) {
      console.log("No email found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}0/coordinator/profile/${email}`)
      .then((res) => {
        console.log("Full API:", res.data);

        setTask(res.data.task || "No Task Assigned"); // ✅ main line
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        📋 Assigned Task
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "12px",
            fontSize: "18px",
          }}
        >
          {task}
        </div>
      )}
    </div>
  );
}

export default Cor_Task;