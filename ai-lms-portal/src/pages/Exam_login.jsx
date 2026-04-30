import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamLogin() {

  const nav = useNavigate();
  const videoRef = useRef(null);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [examCode, setExamCode] = useState("");
  const [error, setError] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  // ================= CAMERA + MIC START =================

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);

    } catch {
      setError("Camera and microphone permission required");
    }
  };

  // ================= START EXAM =================

  const startExam = async () => {

    if (!studentId || !name || !examCode) {
      setError("All fields are required");
      return;
    }

    if (!cameraOn) {
      setError("Please allow camera and microphone first");
      return;
    }

    setError("");

    try {

      const formattedExamCode = examCode.trim().toUpperCase();

      // 🔥 BACKEND CHECK (POST)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/check-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: studentId,
          examCode: formattedExamCode
        })
      });

      const data = await res.json();

      if (data.alreadyGiven) {
        setError("❌ You already gave this exam");
        return;
      }

      // ✅ SAVE DATA
      localStorage.setItem("studentId", studentId);
      localStorage.setItem("studentName", name);
      localStorage.setItem("examCode", formattedExamCode);

      console.log("Saved ExamCode 👉", formattedExamCode);

      nav("/ExamPage");

    } catch (err) {
      console.error(err);
      setError("Server error, try again");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[420px]">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Olympiad Exam Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* CAMERA PREVIEW */}

        <div className="mb-4 text-center">

          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-40 bg-black rounded-lg"
          />

          {!cameraOn && (
            <button
              onClick={startCamera}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Enable Camera & Microphone
            </button>
          )}

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button
            onClick={startExam}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Start Exam
          </button>

        </div>

      </div>

    </div>

  );

}