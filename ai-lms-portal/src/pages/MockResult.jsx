import React from "react";
import { useNavigate } from "react-router-dom";

export default function MockResult() {

    const navigate = useNavigate();

    const result = JSON.parse(localStorage.getItem("mockResult"));

    if (!result) {
        return <h2 className="text-center mt-10">No Result Found</h2>;
    }

    const { score, total, percentage } = result;

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">

            <div className="bg-white p-10 rounded-xl shadow text-center w-[400px]">

                <h1 className="text-3xl font-bold mb-6 text-green-600">
                    🎉 Result
                </h1>

                <p className="text-xl mb-3">
                    Score: <b>{score}</b> / {total}
                </p>

                <p className="text-xl mb-6">
                    Percentage: <b>{percentage}%</b>
                </p>

                {/* 🔥 RESULT STATUS */}
                <p className={`text-lg font-bold mb-6 ${percentage >= 80 ? "text-green-600" :
                        percentage >= 50 ? "text-yellow-600" :
                            "text-red-600"
                    }`}>
                    {percentage >= 80 ? "Excellent 🎯" :
                        percentage >= 50 ? "Good 👍" :
                            "Needs Improvement ❗"}
                </p>

                {/* 🔥 BUTTON */}
                <button
                    onClick={() => navigate("/")}
                    className="bg-indigo-600 text-white px-6 py-3 rounded w-full"
                >
                    Go to Home
                </button>

            </div>

        </div>
    );
}