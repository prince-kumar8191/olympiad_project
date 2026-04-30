import React, { useState } from "react";
import axios from "axios";

export default function SkillResultPage() {

    const [examCode, setExamCode] = useState("");
    const [studentId, setStudentId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchResult = () => {

        if (!examCode.trim()) {
            setError("Please enter exam code");
            return;
        }

        if (!studentId.trim()) {
            setError("Please enter student ID");
            return;
        }

        setError("");
        setLoading(true);
        setResult(null);

        axios.get(`${import.meta.env.VITE_API_URL}/get-skill-result/${examCode.trim()}/${studentId.trim()}`)
            .then(res => {

                console.log("RESULT 👉", res.data);

                if (!res.data || res.data.error) {
                    setError(res.data?.error || "Result not available");
                } else {
                    setResult(res.data);
                }

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("Server error");
                setLoading(false);
            });
    };

    const percentage = result
        ? ((result.score / result.total) * 100).toFixed(2)
        : 0;

    const status = percentage >= 40 ? "PASS" : "FAIL";

    return (
        <div className="p-8 bg-gradient-to-br from-indigo-100 to-gray-100 min-h-screen">

            {/* 🔍 SEARCH BOX */}
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center mb-8">

                <h2 className="text-3xl font-bold mb-6 text-indigo-600">
                    Check Skill Result
                </h2>

                <div className="flex flex-col gap-4 items-center">

                    <input
                        type="text"
                        placeholder="Enter Exam Code"
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value)}
                        className="p-3 border rounded-lg w-[260px]"
                    />

                    <input
                        type="text"
                        placeholder="Enter Student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="p-3 border rounded-lg w-[260px]"
                    />

                    <button
                        onClick={fetchResult}
                        className="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Get Result
                    </button>

                </div>

                {error && (
                    <p className="text-red-500 mt-4">{error}</p>
                )}

            </div>

            {/* ⏳ Loading */}
            {loading && (
                <h2 className="text-center text-lg font-semibold">
                    Loading...
                </h2>
            )}

            {/* 📊 RESULT */}
            {result && (

                <>
                    {/* HEADER */}
                    <div className="bg-white p-6 rounded-xl shadow text-center">

                        <h1 className="text-3xl font-bold text-indigo-600">
                            Skill Test Result
                        </h1>

                        <p className="mt-4 text-xl">
                            Marks:
                            <span className="text-green-600 font-bold ml-2">
                                {result.score} / {result.total}
                            </span>
                        </p>

                        <p className="mt-2 text-lg">
                            Percentage:
                            <span className="ml-2 font-bold text-blue-600">
                                {percentage}%
                            </span>
                        </p>

                        <p className="mt-2 text-lg">
                            Status:
                            <span className={`ml-2 font-bold ${status === "PASS" ? "text-green-600" : "text-red-600"}`}>
                                {status}
                            </span>
                        </p>

                        <p className="mt-2 text-lg">
                            Rank:
                            <span className="ml-2 font-bold text-purple-600">
                                {result.rank || "-"}
                            </span>
                        </p>

                    </div>

                    {/* ANSWER REVIEW */}
                    <div className="mt-6 bg-white p-6 rounded-xl shadow">

                        <h2 className="text-xl font-bold mb-4">Answer Review</h2>

                        {result.questions?.length > 0 ? (

                            result.questions.map((q, i) => {

                                const userAns = result.answers?.[i];
                                const correctAns = result.correctAnswers?.[i];

                                return (
                                    <div key={i} className="mb-6 border-b pb-4">

                                        <p className="font-semibold mb-3">
                                            Q{i + 1}. {q.question}
                                        </p>

                                        <div className="space-y-2">

                                            {q.options?.map((opt, idx) => {

                                                let bg = "bg-gray-200";

                                                if (opt === userAns && opt === correctAns) {
                                                    bg = "bg-green-500 text-white";
                                                }
                                                else if (opt === userAns && opt !== correctAns) {
                                                    bg = "bg-red-500 text-white";
                                                }
                                                else if (opt === correctAns) {
                                                    bg = "bg-yellow-300";
                                                }

                                                return (
                                                    <div key={idx} className={`p-2 rounded ${bg}`}>
                                                        {opt}
                                                    </div>
                                                );
                                            })}

                                        </div>

                                        <p className="mt-2 font-bold">
                                            Your Answer: {userAns || "Not Attempted"} |
                                            Correct: {correctAns}
                                        </p>

                                    </div>
                                );
                            })

                        ) : (
                            <p className="text-center text-gray-500">
                                No question data available
                            </p>
                        )}

                    </div>
                </>
            )}

        </div>
    );
}