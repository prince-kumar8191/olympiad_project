import { useNavigate } from "react-router-dom";

export default function ExamInstructions() {

  const navigate = useNavigate();

  const startExam = () => {
    navigate("/Exam_login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
        Online Olympiad Exam Instructions
      </h1>

      {/* SPLIT SCREEN */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 🇬🇧 ENGLISH SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[75vh]">

          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            English Instructions
          </h2>

          <div className="space-y-5 text-gray-700 text-sm">

            <div>
              <h3 className="font-semibold text-indigo-500">📌 General</h3>
              <ul className="list-disc ml-5">
                <li>Ensure stable internet connection.</li>
                <li>Use supported device/browser.</li>
                <li>Do not refresh or close exam window.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">⏱️ Rules</h3>
              <ul className="list-disc ml-5">
                <li>Exam is time-bound.</li>
                <li>Timer starts after beginning.</li>
                <li>Auto-submit on time end.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">🖊️ Answers</h3>
              <ul className="list-disc ml-5">
                <li>Read carefully before answering.</li>
                <li>Use Save/Next button.</li>
                <li>Review answers before submit.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">🔒 Security</h3>
              <ul className="list-disc ml-5">
                <li>Tab switching is restricted.</li>
                <li>Copy-paste disabled.</li>
                <li>Activity may be recorded.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-500">🚨 Warnings</h3>
              <ul className="list-disc ml-5">
                <li>⚠️ Tab switching gives warning.</li>
                <li>⚠️ Multiple warnings = auto submit.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-600">✅ Submission</h3>
              <ul className="list-disc ml-5">
                <li>Click Submit after completion.</li>
                <li>No changes after submission.</li>
              </ul>
            </div>

          </div>
        </div>

        {/* 🇮🇳 HINDI SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-y-auto max-h-[75vh]">

          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            हिंदी निर्देश
          </h2>

          <div className="space-y-5 text-gray-700 text-sm">

            <div>
              <h3 className="font-semibold text-indigo-500">📌 सामान्य निर्देश</h3>
              <ul className="list-disc ml-5">
                <li>इंटरनेट कनेक्शन स्थिर रखें।</li>
                <li>सपोर्टेड डिवाइस/ब्राउज़र का उपयोग करें।</li>
                <li>परीक्षा के दौरान पेज रिफ्रेश न करें।</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">⏱️ परीक्षा नियम</h3>
              <ul className="list-disc ml-5">
                <li>परीक्षा समय-सीमित है।</li>
                <li>टाइमर शुरू होते ही गिनती शुरू होगी।</li>
                <li>समय समाप्त होने पर ऑटो सबमिट होगा।</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">🖊️ उत्तर देना</h3>
              <ul className="list-disc ml-5">
                <li>प्रश्न ध्यान से पढ़ें।</li>
                <li>Save/Next बटन का उपयोग करें।</li>
                <li>सबमिट से पहले उत्तर जांचें।</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-indigo-500">🔒 सुरक्षा</h3>
              <ul className="list-disc ml-5">
                <li>टैब बदलना प्रतिबंधित है।</li>
                <li>कॉपी-पेस्ट बंद हो सकता है।</li>
                <li>गतिविधि रिकॉर्ड की जा सकती है।</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-500">🚨 चेतावनी</h3>
              <ul className="list-disc ml-5">
                <li>⚠️ टैब बदलने पर चेतावनी मिलेगी।</li>
                <li>⚠️ अधिक चेतावनी पर परीक्षा समाप्त हो सकती है।</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-green-600">✅ सबमिशन</h3>
              <ul className="list-disc ml-5">
                <li>अंत में Submit बटन दबाएं।</li>
                <li>सबमिट के बाद बदलाव संभव नहीं।</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* START BUTTON */}
      <div className="text-center mt-8">
        <button
          onClick={startExam}
          className="bg-indigo-600 text-white px-12 py-4 rounded-full text-xl hover:scale-105 transition shadow-lg"
        >
          🚀 Start Exam
        </button>
      </div>

    </div>
  );
}