import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResultPage() {

    const [result, setResult] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const studentId = localStorage.getItem("studentId");

        axios.get(`${import.meta.env.VITE_API_URL}/get-result/${id}`)
            .then(res => {
                console.log("RESULT 👉", res.data);
                setResult(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    if (!result) {
        return <h2 className="text-center mt-10">Loading...</h2>;
    }

    if (result.error) {
        return <h2 className="text-center mt-10 text-red-500">{result.error}</h2>;
    }

    const percentage = ((result.score / result.total) * 100).toFixed(2);


    return (
        <div className="p-8 bg-gray-100 min-h-screen">

            {/* HEADER */}

            <div className="bg-white p-6 rounded shadow text-center">

                <h1 className="text-3xl font-bold">Exam Result</h1>

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

                {/* 🔥 NATIONAL RANK */}
                <p className="mt-2 text-lg">
                    National Rank:
                    <span className="ml-2 font-bold text-purple-600">
                        {result.nationalRank || "-"}
                    </span>
                </p>

                {/* 🔥 STATE RANK */}
                <p className="mt-2 text-lg">
                    State Rank:
                    <span className="ml-2 font-bold text-indigo-600">
                        {result.stateRank || "-"}
                    </span>
                </p>

                {/* 🔥 DISTRICT RANK */}
                <p className="mt-2 text-lg">
                    District Rank:
                    <span className="ml-2 font-bold text-pink-600">
                        {result.districtRank || "-"}
                    </span>
                </p>

            </div>

            {/* ANSWER REVIEW */}
            <div className="mt-6 bg-white p-6 rounded shadow">

                <h2 className="text-xl font-bold mb-4">Answer Review</h2>

                {result.questions.map((q, i) => {

                    const userAns = result.answers[i];
                    const correctAns = result.correctAnswers[i];

                    return (
                        <div key={i} className="mb-6 border-b pb-4">

                            {/* Question */}
                            <p className="font-semibold mb-3">
                                Q{i + 1}. {q.question}
                            </p>

                            {/* Options */}
                            <div className="space-y-2">

                                {q.options.map((opt, idx) => {

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
                                        <div
                                            key={idx}
                                            className={`p-2 rounded ${bg}`}
                                        >
                                            {opt}
                                        </div>
                                    );
                                })}

                            </div>

                            {/* Answer Info */}
                            <p className="mt-2 font-bold">
                                Your Answer: {userAns || "Not Attempted"} |
                                Correct: {correctAns}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}