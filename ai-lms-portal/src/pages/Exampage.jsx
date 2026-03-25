// import React, { useEffect, useRef, useState } from "react";
// import * as faceapi from "@vladmandic/face-api";

// export default function ExamPage() {

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
  

//   const [warnings, setWarnings] = useState(0);
//   const [time, setTime] = useState(30);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [showSubmitPopup, setShowSubmitPopup] = useState(false);

//   const maxWarnings = 5;

//   const questions = Array.from({ length: 20 }, (_, i) => ({
//     question: `Question ${i + 1} : What is ${i + 1} + ${i + 1}?`,
//     options: ["1", "2", "3", "4"]
//   }));


//   useEffect(() => {

//     startCamera();
//     detectTabSwitch();
//     startTimer();
//     startFullscreen();
//     loadFaceModel();
//     disableScreenshot();
//     disableRightClick();
//     disableCopyPaste();
//     disableReload();
//     disableBack();
//     disableDevTools();
//     disablePrint();
//   }, []);


//   // ================= WARNINGS =================

//   const giveWarning = (msg) => {

//     alert(msg);

//     setWarnings(prev => {

//       const newCount = prev + 1;

//       if (newCount >= maxWarnings) {
//         alert("Exam auto submitted");
//         submitExam();
//       }

//       return newCount;
//     });

//   };


//   // ================= CAMERA =================

//   const startCamera = async () => {

//     try {

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });

//       videoRef.current.srcObject = stream;

//       setInterval(captureScreenshot, 15000);

//     } catch {

//       alert("Camera and microphone permission required");

//     }

//   };


//   // ================= SCREENSHOT =================

//   const captureScreenshot = () => {

//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (!video) return;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(video, 0, 0);

//     const image = canvas.toDataURL("image/png");

//     fetch("http://localhost:5000/upload-screenshot", {

//       method: "POST",

//       headers: {
//         "Content-Type": "application/json"
//       },

//       body: JSON.stringify({
//         image,
//         student: "student123"
//       })

//     });

//   };


//   // ================= SCREENSHOT BLOCK =================

// const disableScreenshot = () => {

//   // PRINT SCREEN KEY BLOCK
//   document.addEventListener("keyup", (e) => {

//     if (e.key === "PrintScreen") {

//       giveWarning("Screenshot attempt detected");

//       navigator.clipboard.writeText("");

//     }

//   });

//   // SCREEN CAPTURE BLOCK
//   navigator.mediaDevices.getDisplayMedia = () => {
//     giveWarning("Screen recording attempt detected");
//     return Promise.reject("Screen capture blocked");
//   };

// };


//   // ================= FACE DETECTION =================

//   const loadFaceModel = async () => {

//     await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

//     setInterval(detectFace, 5000);

//   };

//   const detectFace = async () => {

//     if (!videoRef.current) return;

//     const detections = await faceapi.detectAllFaces(
//       videoRef.current,
//       new faceapi.TinyFaceDetectorOptions()
//     );

//     if (detections.length === 0) {
//       giveWarning("No face detected");
//     }

//     if (detections.length > 1) {
//       giveWarning("Multiple faces detected");
//     }

//   };


//   // ================= TAB SWITCH =================

//   const detectTabSwitch = () => {

//     document.addEventListener("visibilitychange", () => {

//       if (document.hidden) {
//         giveWarning("Tab switch detected");
//       }

//     });

//   };


//   // ================= TIMER =================

//   const startTimer = () => {

//     setInterval(() => {

//       setTime(prev => {

//         if (prev <= 1) {
//           alert("Time Up");
//           submitExam();
//           return 0;
//         }

//         return prev - 1;

//       });

//     }, 1000);

//   };

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;


//   // ================= COPY PASTE BLOCK =================

//   const disableCopyPaste = () => {

//     document.addEventListener("copy", (e) => e.preventDefault());
//     document.addEventListener("cut", (e) => e.preventDefault());
//     document.addEventListener("paste", (e) => e.preventDefault());

//   };


//   // ================= RIGHT CLICK BLOCK =================

//   const disableRightClick = () => {

//     document.addEventListener("contextmenu", (e) => {
//       e.preventDefault();
//     });

//   };


//   // ================= FULLSCREEN =================

//   const startFullscreen = () => {

//     if (document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen();
//     }

//   };


//   // ================= RELOAD BLOCK =================

// const disableReload = () => {

//   document.addEventListener("keydown", function (e) {

//     // F5
//     if (e.key === "F5") {
//       e.preventDefault();
//       giveWarning("Page reload attempt detected");
//     }

//     // CTRL + R
//     if (e.ctrlKey && e.key === "r") {
//       e.preventDefault();
//       giveWarning("Page reload attempt detected");
//     }

//   });

// };



// // ================= BACK BUTTON BLOCK =================

// const disableBack = () => {

//   window.history.pushState(null, "", window.location.href);

//   window.onpopstate = function () {

//     window.history.pushState(null, "", window.location.href);

//     giveWarning("Back button not allowed during exam");

//   };

// };


// // ================= DEVTOOLS BLOCK =================

// const disableDevTools = () => {

//   document.addEventListener("keydown", function (e) {

//     // F12
//     if (e.key === "F12") {
//       e.preventDefault();
//       giveWarning("Developer tools not allowed");
//     }

//     // CTRL + SHIFT + I
//     if (e.ctrlKey && e.shiftKey && e.key === "I") {
//       e.preventDefault();
//       giveWarning("Developer tools not allowed");
//     }

//     // CTRL + SHIFT + J
//     if (e.ctrlKey && e.shiftKey && e.key === "J") {
//       e.preventDefault();
//       giveWarning("Developer tools not allowed");
//     }

//     // CTRL + U
//     if (e.ctrlKey && e.key === "u") {
//       e.preventDefault();
//       giveWarning("View source not allowed");
//     }

//   });

// };

// // ================= PRINT BLOCK =================

// const disablePrint = () => {

//   document.addEventListener("keydown", function (e) {

//     if (e.ctrlKey && e.key === "p") {
//       e.preventDefault();
//       giveWarning("Printing not allowed during exam");
//     }

//   });

// };
//   // ================= SUBMIT EXAM =================

//   const submitExam = () => {

//     const stream = videoRef.current?.srcObject;

//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//     }

//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     }

//     window.location.href = "/Submit";

//   };


//   // ================= MCQ =================

//   const selectOption = (opt) => {

//     setAnswers({
//       ...answers,
//       [current]: opt
//     });

//   };

//   const q = questions[current];


//   return (

//     <div className="flex h-screen bg-gray-100">

//       {/* CAMERA PANEL */}

//       <div className="w-1/4 bg-white p-4 shadow">

//         <h2 className="font-bold mb-2">Camera</h2>

//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           className="rounded border"
//         />

//         <p className="mt-3 text-red-600">
//           Warnings: {warnings}/{maxWarnings}
//         </p>

//         <p className="font-bold mt-2">
//           ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
//         </p>

//       </div>


//       {/* QUESTION AREA */}

//       <div className="w-3/4 p-8">

//         <div className="bg-white p-6 rounded shadow">

//           <h2 className="text-lg font-bold mb-3">
//             Question {current + 1}
//           </h2>

//           <p className="mb-4">{q.question}</p>

//           <div className="space-y-2">

//             {q.options.map((opt, i) => (

//               <label key={i} className="block border p-2 rounded">

//                 <input
//                   type="radio"
//                   name="option"
//                   checked={answers[current] === opt}
//                   onChange={() => selectOption(opt)}
//                   className="mr-2"
//                 />

//                 {opt}

//               </label>

//             ))}

//           </div>


//           {/* NAVIGATION */}

//           <div className="flex justify-between mt-6">

//             <button
//               onClick={() => setCurrent(current - 1)}
//               disabled={current === 0}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Previous
//             </button>

//             <button
//               onClick={() => setCurrent(current + 1)}
//               disabled={current === questions.length - 1}
//               className="bg-indigo-600 text-white px-4 py-2 rounded"
//             >
//               Next
//             </button>

//           </div>


//           {/* SUBMIT BUTTON */}

//           <div className="flex justify-center mt-6">

//             <button
//               onClick={() => setShowSubmitPopup(true)}
//               className="bg-red-600 text-white px-6 py-3 rounded"
//             >
//               Submit Exam
//             </button>

//           </div>

//         </div>


//         {/* QUESTION PALETTE */}

//         <div className="mt-6 grid grid-cols-10 gap-2">

//           {questions.map((_, i) => (

//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`p-2 rounded text-white
//               ${answers[i] ? "bg-green-500" : "bg-gray-400"}`}
//             >
//               {i + 1}
//             </button>

//           ))}

//         </div>

//       </div>


//       {/* SUBMIT POPUP */}

//       {showSubmitPopup && (

//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

//           <div className="bg-white p-6 rounded shadow-lg text-center w-[350px]">

//             <h2 className="text-xl font-bold mb-3">
//               Confirm Submission
//             </h2>

//             <p className="mb-6">
//               Are you sure you want to submit the exam?
//             </p>

//             <div className="flex justify-center gap-4">

//               <button
//                 onClick={() => setShowSubmitPopup(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={submitExam}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       <canvas ref={canvasRef} style={{ display: "none" }} />

//     </div>

//   );

// }















import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";

export default function ExamPage() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  const [warnings, setWarnings] = useState(0);
  const [time, setTime] = useState(1800);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [questions, setQuestions] = useState([]);

  const maxWarnings = 5;



  // const fetchQuestions = async () => {
  //   try {
  //     const examCode = "MATH101";

  //     const res = await fetch(`http://localhost:5000/get-questions/${examCode}`);
  //     const data = await res.json();

  //     console.log("Fetched Questions:", data);

  //     setQuestions(data);

  //   } catch (err) {
  //     console.log("Error fetching questions:", err);
  //   }
  // };



  const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const fetchQuestions = async () => {
  try {
    const examCode = localStorage.getItem("examCode");

    console.log("ExamCode 👉", examCode);

    if (!examCode) {
      alert("Exam Code not found");
      return;
    }

    const res = await fetch(`http://localhost:5000/get-questions/${examCode}`);
    const data = await res.json();

    console.log("API Data 👉", data);

    if (!data || data.length === 0) {
      alert("No questions found for this examCode");
      return;
    }

    const shuffled = shuffleArray(data);

    setQuestions(shuffled);

  } catch (err) {
    console.log("Error 👉", err);
  }
};

const examCode = localStorage.getItem("examCode");
console.log("ExamCode 👉", examCode);



  useEffect(() => {

    startCamera();
    detectTabSwitch();
    startTimer();
    startFullscreen();
    loadFaceModel();
    disableScreenshot();
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

      setInterval(captureScreenshot, 15000);

    } catch {

      alert("Camera and microphone permission required");

    }

  };


  // ================= SCREENSHOT =================

  const captureScreenshot = () => {

    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    fetch("http://localhost:5000/upload-screenshot", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        image,
        student: "student123"
      })

    });

  };


  // ================= SCREENSHOT BLOCK =================

  const disableScreenshot = () => {

    // PRINT SCREEN KEY BLOCK
    document.addEventListener("keyup", (e) => {

      if (e.key === "PrintScreen") {

        giveWarning("Screenshot attempt detected");

        navigator.clipboard.writeText("");

      }

    });

    // SCREEN CAPTURE BLOCK
    navigator.mediaDevices.getDisplayMedia = () => {
      giveWarning("Screen recording attempt detected");
      return Promise.reject("Screen capture blocked");
    };

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


  // ================= COPY PASTE BLOCK =================

  const disableCopyPaste = () => {

    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());
    document.addEventListener("paste", (e) => e.preventDefault());

  };


  // ================= RIGHT CLICK BLOCK =================

  const disableRightClick = () => {

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

  };


  // ================= FULLSCREEN =================

  const startFullscreen = () => {

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }

  };


  // ================= RELOAD BLOCK =================

  const disableReload = () => {

    document.addEventListener("keydown", function (e) {

      // F5
      if (e.key === "F5") {
        e.preventDefault();
        giveWarning("Page reload attempt detected");
      }

      // CTRL + R
      if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
        giveWarning("Page reload attempt detected");
      }

    });

  };



  // ================= BACK BUTTON BLOCK =================

  const disableBack = () => {

    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {

      window.history.pushState(null, "", window.location.href);

      giveWarning("Back button not allowed during exam");

    };

  };


  // ================= DEVTOOLS BLOCK =================

  const disableDevTools = () => {

    document.addEventListener("keydown", function (e) {

      // F12
      if (e.key === "F12") {
        e.preventDefault();
        giveWarning("Developer tools not allowed");
      }

      // CTRL + SHIFT + I
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        giveWarning("Developer tools not allowed");
      }

      // CTRL + SHIFT + J
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        giveWarning("Developer tools not allowed");
      }

      // CTRL + U
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        giveWarning("View source not allowed");
      }

    });

  };

  // ================= PRINT BLOCK =================

  const disablePrint = () => {

    document.addEventListener("keydown", function (e) {

      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        giveWarning("Printing not allowed during exam");
      }

    });

  };
  // ================= SUBMIT EXAM =================

  const submitExam = () => {

    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    window.location.href = "/Submit";

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

      {/* CAMERA PANEL */}

      <div className="w-1/4 bg-white p-4 shadow">

        <h2 className="font-bold mb-2">Camera</h2>

        <video
          ref={videoRef}
          autoPlay
          muted
          className="rounded border"
        />

        <p className="mt-3 text-red-600">
          Warnings: {warnings}/{maxWarnings}
        </p>

        <p className="font-bold mt-2">
          ⏱ {minutes}:{seconds < 10 ? "0" : ""}{seconds}
        </p>

      </div>


      {/* QUESTION AREA */}

      <div className="w-3/4 p-8">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-lg font-bold mb-3">
            Question {current + 1}
          </h2>

        <p className="mb-4">
          {questions.length === 0 ? "Loading..." : q.question}
        </p>

          <div className="space-y-2">

            {q.options?.map((opt, i) => (

              <label key={i} className="block border p-2 rounded">

                <input
                  type="radio"
                  name="option"
                  checked={answers[current] === opt}
                  onChange={() => selectOption(opt)}
                  className="mr-2"
                />

                {opt}

              </label>

            ))}

          </div>


          {/* NAVIGATION */}

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


          {/* SUBMIT BUTTON */}

          <div className="flex justify-center mt-6">

            <button
              onClick={() => setShowSubmitPopup(true)}
              className="bg-red-600 text-white px-6 py-3 rounded"
            >
              Submit Exam
            </button>

          </div>

        </div>


        {/* QUESTION PALETTE */}

        <div className="mt-6 grid grid-cols-10 gap-2">

          {questions.map((_, i) => (

            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`p-2 rounded text-white
              ${answers[i] ? "bg-green-500" : "bg-gray-400"}`}
            >
              {i + 1}
            </button>

          ))}

        </div>

      </div>


      {/* SUBMIT POPUP */}

      {showSubmitPopup && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded shadow-lg text-center w-[350px]">

            <h2 className="text-xl font-bold mb-3">
              Confirm Submission
            </h2>

            <p className="mb-6">
              Are you sure you want to submit the exam?
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

      <canvas ref={canvasRef} style={{ display: "none" }} />

    </div>

  );

}