import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import axios from "axios";

export default function SkillExamPage() {

    const videoRef = useRef(null);

    const [warnings, setWarnings] = useState(0);
    const [time, setTime] = useState(1800);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const [questions, setQuestions] = useState([]);

    const maxWarnings = 5;

    // ================= FETCH QUESTIONS =================

    const fetchQuestions = async () => {
        try {
            const examCode = localStorage.getItem("skillExamCode");

            if (!examCode) {
                alert("Skill Exam Code not found");
                return;
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/get-questions/${examCode}`);
            const data = await res.json();

            if (!data || data.length === 0) {
                alert("No questions found");
                return;
            }

            setQuestions(data);

        } catch (err) {
            console.log("Error 👉", err);
        }
    };

    useEffect(() => {
        startCamera();
        detectTabSwitch();
        startTimer();
        startFullscreen();
        loadFaceModel();
        disableRightClick();
        disableCopyPaste();
        disableReload();
        disableBack();
        disableDevTools();
        disablePrint();
        fetchQuestions();
    }, []);

    // ================= WARNINGS =================

    const giveWarning = (msg) => {
        alert(msg);

        setWarnings(prev => {
            const newCount = prev + 1;

            if (newCount >= maxWarnings) {
                alert("Exam auto submitted");
                submitExam();
            }

            return newCount;
        });
    };

    // ================= CAMERA =================

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            videoRef.current.srcObject = stream;

        } catch {
            alert("Camera & mic permission required");
        }
    };

    // ================= FACE DETECTION =================

    const loadFaceModel = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        setInterval(detectFace, 5000);
    };

    const detectFace = async () => {
        if (!videoRef.current) return;

        const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length === 0) {
            giveWarning("No face detected");
        }

        if (detections.length > 1) {
            giveWarning("Multiple faces detected");
        }
    };

    // ================= TAB SWITCH =================

    const detectTabSwitch = () => {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                giveWarning("Tab switch detected");
            }
        });
    };

    // ================= TIMER =================

    const startTimer = () => {
        setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    alert("Time Up");
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // ================= BLOCK FEATURES =================

    const disableCopyPaste = () => {
        document.addEventListener("copy", e => e.preventDefault());
        document.addEventListener("cut", e => e.preventDefault());
        document.addEventListener("paste", e => e.preventDefault());
    };

    const disableRightClick = () => {
        document.addEventListener("contextmenu", e => e.preventDefault());
    };

    const startFullscreen = () => {
        document.documentElement.requestFullscreen();
    };

    const disableReload = () => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
                e.preventDefault();
                giveWarning("Reload not allowed");
            }
        });
    };

    const disableBack = () => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, "", window.location.href);
            giveWarning("Back not allowed");
        };
    };

    const disableDevTools = () => {
        document.addEventListener("keydown", (e) => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key)) ||
                (e.ctrlKey && e.key === "u")
            ) {
                e.preventDefault();
                giveWarning("DevTools blocked");
            }
        });
    };

    const disablePrint = () => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "p") {
                e.preventDefault();
                giveWarning("Print not allowed");
            }
        });
    };

    // ================= SUBMIT =================

    const submitExam = async () => {

        const stream = videoRef.current?.srcObject;
        if (stream) stream.getTracks().forEach(track => track.stop());

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        try {
            const studentId = localStorage.getItem("studentId");
            const examCode = localStorage.getItem("skillExamCode");

            const correctAnswers = {};
            questions.forEach((q, index) => {
                correctAnswers[index] = q.correctAnswer;
            });

            await axios.post(`${import.meta.env.VITE_API_URL}/submit-exam`, {
                studentId,
                examCode,
                answers,
                correctAnswers
            });

            window.location.href = "/Submit";

        } catch (err) {
            alert("Submit failed");
        }
    };

    // ================= MCQ =================

    const selectOption = (opt) => {
        setAnswers({
            ...answers,
            [current]: opt
        });
    };

    const q = questions[current] || {};

    return (

        <div className="flex h-screen bg-gray-100">

            {/* CAMERA */}
            <div className="w-1/4 bg-white p-4 shadow">
                <h2 className="font-bold mb-2">Camera</h2>

                <video ref={videoRef} autoPlay muted className="rounded border" />

                <p className="mt-3 text-red-600">
                    Warnings: {warnings}/{maxWarnings}
                </p>

                <p className="font-bold mt-2">
                    ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                </p>
            </div>

            {/* QUESTIONS */}
            <div className="w-3/4 p-8">

                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-lg font-bold mb-3">
                        Question {current + 1}
                    </h2>

                    <p className="mb-4">
                        {questions.length === 0 ? "Loading..." : q.question}
                    </p>

                    <div className="space-y-2">
                        {q.options?.map((opt, i) => {
                            const label = ["A", "B", "C", "D"][i];

                            return (
                                <label key={i} className="block border p-2 rounded">
                                    <input
                                        type="radio"
                                        checked={answers[current] === label}
                                        onChange={() => selectOption(label)}
                                    />
                                    {label}. {opt}
                                </label>
                            );
                        })}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => setCurrent(current - 1)}
                            disabled={current === 0}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => setCurrent(current + 1)}
                            disabled={current === questions.length - 1}
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowSubmitPopup(true)}
                            className="bg-red-600 text-white px-6 py-3 rounded"
                        >
                            Submit Exam
                        </button>
                    </div>

                </div>

            </div>

            {/* POPUP */}
            
            {showSubmitPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-xl shadow-xl w-[360px] text-center">

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Confirm Submission
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Are you sure you want to submit the exam?
                            <br />
                            <span className="text-red-500 font-medium">
                                Changes cannot be made after submission.
                            </span>
                        </p>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => setShowSubmitPopup(false)}
                                className="px-5 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitExam}
                                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                Submit
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}