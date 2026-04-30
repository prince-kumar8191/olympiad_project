
import React, { useEffect, useState } from "react";
import axios from "axios";

function Volunteer_Task() {
  const [task, setTask] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("VolunteerEmail");

    axios
      .get(`${import.meta.env.VITE_API_URL}/volunteer/profile/${email}`)
      .then((res) => {
        setTask(res.data.task);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #06b6d4, #2dd4bf)", // cyan → sea green
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {/* BIG CARD */}
      <div
        style={{
          width: "650px",
          padding: "50px",
          borderRadius: "25px",
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.18)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          color: "white",
          textAlign: "center",
        }}
      >
        {/* ICON */}
        <div style={{ fontSize: "70px", marginBottom: "15px" }}>📋</div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Assigned Task
        </h1>

        {/* SUBTITLE */}
        <p style={{ opacity: 0.85, marginBottom: "25px" }}>
          Your current responsibility
        </p>

        {/* TASK BOX */}
        <div
          style={{
            padding: "25px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.3)",
            fontSize: "18px",
            lineHeight: "1.6",
            fontWeight: "500",
            color: "#083344", // dark teal text for contrast
          }}
        >
          {task || "No Task Assigned"}
        </div>
      </div>
    </div>
  );
}

export default Volunteer_Task;