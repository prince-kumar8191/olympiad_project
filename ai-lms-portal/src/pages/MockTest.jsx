import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Mocktest() {

    const [time, setTime] = useState(1800);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showSubmitPopup, setShowSubmitPopup] = useState(false);
    const [questions, setQuestions] = useState([]);

    // ✅ NEW
    const [page, setPage] = useState(1);
    const questionsPerPage = 50;

    // ================= SHUFFLE =================
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // ================= FETCH =================
    const fetchQuestions = async () => {
        try {
            const subject = localStorage.getItem("subject");
            const cls = localStorage.getItem("class");

            const res = await fetch(`${import.meta.env.VITE_API_URL}/get-mock-questions/${cls}/${subject}`);
            const data = await res.json();

            const shuffled = shuffleArray(data);
            setQuestions(shuffled);

        } catch (err) {
            console.log(err);
        }
    };

    // ================= TIMER =================
    useEffect(() => {

        fetchQuestions();

        const timer = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    alert("Time Up");
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // ================= PAGINATION =================
    const startIndex = (page - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;

    const currentQuestions = questions.slice(startIndex, endIndex);

    const q = currentQuestions[current] || {};

    // ================= SELECT OPTION =================
    const selectOption = (opt) => {
        setAnswers({
            ...answers,
            [startIndex + current]: opt
        });
    };

    // ================= SUBMIT =================
    const submitExam = async () => {
        try {

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/submit-mock`, {
                answers,
                questions
            });

            const result = res.data;

            localStorage.setItem("mockResult", JSON.stringify(result));
            window.location.href = "/MockResult";

        } catch (err) {
            console.error(err);
            alert("Submit failed");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">

            {/* LEFT PANEL */}
            <div className="w-1/4 bg-white p-4 shadow">

                <h2 className="font-bold mb-2">Mock Test</h2>

                <p className="font-bold text-lg">
                    ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
                </p>

                <p className="mt-4 text-gray-600">
                    Total Questions: {questions.length}
                </p>

                {/* ✅ Page Indicator */}
                <p className="mt-2 text-sm text-gray-600">
                    Page {page} / {Math.ceil(questions.length / questionsPerPage)}
                </p>

            </div>

            {/* QUESTION AREA */}
            <div className="w-3/4 p-8">

                <div className="bg-white p-6 rounded shadow">

                    <h2 className="text-lg font-bold mb-3">
                        Question {startIndex + current + 1}
                    </h2>

                    <p className="mb-4">
                        {questions.length === 0 ? "Loading..." : q.question}
                    </p>

                    <div className="space-y-2">

                        {q.options?.map((opt, i) => {

                            const label = ["A", "B", "C", "D"][i];

                            return (
                                <label key={i} className="block border p-2 rounded cursor-pointer">

                                    <input
                                        type="radio"
                                        name={`q${current}`}
                                        checked={answers[startIndex + current] === label}
                                        onChange={() => selectOption(label)}
                                        className="mr-2"
                                    />

                                    {label}. {opt}

                                </label>
                            );
                        })}
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex justify-between mt-6">

                        {/* PREVIOUS */}
                        <button
                            onClick={() => {
                                if (current > 0) {
                                    setCurrent(current - 1);
                                } else if (page > 1) {
                                    setPage(page - 1);
                                    setCurrent(questionsPerPage - 1);
                                }
                            }}
                            disabled={page === 1 && current === 0}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>

                        {/* NEXT */}
                        <button
                            onClick={() => {
                                if (current < currentQuestions.length - 1) {
                                    setCurrent(current + 1);
                                } else if (endIndex < questions.length) {
                                    setPage(page + 1);
                                    setCurrent(0);
                                }
                            }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>

                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowSubmitPopup(true)}
                            className="bg-red-600 text-white px-6 py-3 rounded"
                        >
                            Submit Test
                        </button>
                    </div>

                </div>

                {/* PALETTE (Page-wise) */}
                <div className="mt-6 grid grid-cols-10 gap-2">

                    {currentQuestions.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`p-2 rounded text-white
                            ${answers[startIndex + i] ? "bg-green-500" : "bg-gray-400"}`}
                        >
                            {startIndex + i + 1}
                        </button>
                    ))}

                </div>

            </div>

            {/* POPUP */}
            {showSubmitPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                    <div className="bg-white p-6 rounded shadow-lg text-center w-[350px]">

                        <h2 className="text-xl font-bold mb-3">
                            Confirm Submission
                        </h2>

                        <p className="mb-6">
                            Are you sure you want to submit the Test?
                        </p>

                        <div className="flex justify-center gap-4">

                            <button
                                onClick={() => setShowSubmitPopup(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitExam}
                                className="bg-red-600 text-white px-4 py-2 rounded"
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