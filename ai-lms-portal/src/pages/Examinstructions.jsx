import React from "react";
import { useNavigate } from "react-router-dom";
import ExamPage from "../pages/Exampage";
import Login from "../pages/Exam_login"
import ExamLogin from "../pages/Exam_login";



export default function ExamInstructions() {

  const navigate = useNavigate();

  const startExam = () => {
    navigate("/Exam_login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl text-center">

        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Olympiad Exam Instructions
        </h1>

        <ul className="text-left text-lg mb-8 space-y-2">
          <li>✔ Camera must remain ON during exam</li>
          <li>✔ Microphone must remain ON</li>
          <li>✔ Do not switch tabs</li>
          <li>✔ Only one face should be visible</li>
          <li>✔ Exam will auto submit after 5 warnings</li>
        </ul>

        <button
          onClick={startExam}
          className="bg-indigo-600 text-white px-10 py-3 rounded-full text-lg hover:scale-105 transition"
        >
          Start Exam
        </button>

      </div>

    </div>
  );
}