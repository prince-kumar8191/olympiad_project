// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SubmitPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//   disableBack();
//   disableReload();
  
//     // STOP CAMERA + MICROPHONE
//     const stopMedia = () => {
//       const videos = document.querySelectorAll("video");
//       videos.forEach(video => {
//         const stream = video.srcObject;
//         if (stream) {
//           stream.getTracks().forEach(track => track.stop());
//         }
//       });
//     };
//     stopMedia();

//     // EXIT FULLSCREEN
//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     }

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


//     // ================= CLEANUP =================
//     return () => {
//       window.removeEventListener("popstate", handleBack);
//     };
//   }, []);

//   // ================= ON LOAD MARK EXAM SUBMITTED =================
//   useEffect(() => {
//     localStorage.setItem("examSubmitted", "true");
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-10 rounded-lg shadow-lg text-center w-[500px]">
//         <h1 className="text-3xl font-bold text-green-600 mb-4">
//           Exam Submitted
//         </h1>

//         <h2 className="text-xl text-gray-700 mb-3">Thank You!</h2>

//         <p className="text-gray-600 mb-6">
//           Your exam has been submitted successfully.
//         </p>

//         <button
//           onClick={() => navigate("/", { replace: true })} // Go to Home only
//           className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
//         >
//           Go to Home Page
//         </button>
//       </div>
//     </div>
//   );
// }












import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmitPage() {
  const navigate = useNavigate();

  // ================= WARNING FUNCTION =================
  const giveWarning = (msg) => {
    alert(msg);
  };

  // ================= RELOAD BLOCK =================
  const disableReload = () => {
    document.addEventListener("keydown", function (e) {
      if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
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

  useEffect(() => {
    // CALL AFTER DEFINITION ✅
    disableBack();
    disableReload();

    // STOP CAMERA + MICROPHONE
    const stopMedia = () => {
      const videos = document.querySelectorAll("video");
      videos.forEach((video) => {
        const stream = video.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      });
    };
    stopMedia();

    // EXIT FULLSCREEN
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    // CLEANUP
    return () => {
      window.onpopstate = null;
      document.onkeydown = null;
    };
  }, []);

  // ================= ON LOAD MARK EXAM SUBMITTED =================
  useEffect(() => {
    localStorage.setItem("examSubmitted", "true");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center w-[500px]">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Exam Submitted
        </h1>

        <h2 className="text-xl text-gray-700 mb-3">Thank You!</h2>

        <p className="text-gray-600 mb-6">
          Your exam has been submitted successfully.
        </p>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}