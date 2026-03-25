// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import admitImg from "../assets/Admit.png";
// import logo from "../assets/logo.png"

// function AdmitCard({ student }) {

//   const cardRef = useRef();
//   const data = student || {};


//   const downloadPDF = async () => {
//     try {
//       const element = cardRef.current;

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#ffffff"
//       });

//       const imgData = canvas.toDataURL("image/png");

//       const pdf = new jsPDF("landscape", "mm", "a4");

//       const width = 297;
//       const height = (canvas.height * width) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("NSMO_Admit_Card.pdf");

//     } catch (err) {
//       console.error("Download error:", err);
//       alert("Download failed! Check images.");
//     }
//   };


//   return (
//     <div className="min-h-screen flex flex-col items-center p-5 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

//       {/* BUTTON */}
//       <button
//         onClick={downloadPDF}
//         className="mb-5 px-6 py-2 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition"
//       >
//         Download Admit Card
//       </button>

//       {/* CARD */}
//       <div
//         ref={cardRef}
//         className="w-full max-w-6xl bg-white border-4 border-yellow-400 rounded-xl shadow-2xl overflow-hidden"
//       >

//         <div className="flex">

//           {/* 🔥 LEFT PANEL */}
//           <div className="w-1/4 bg-yellow-300 p-4 flex flex-col justify-between items-center">

//             {/* BIG NSMO LOGO */}
//            <div className="flex items-center justify-center w-full h-full">
//   <img
//     src={admitImg}
//     alt="Admit"
//     className="w-full max-w-[240px] object-contain"
//     crossOrigin="anonymous"
//   />
// </div>

//             {/* LEVEL */}
//             <p className="font-bold text-lg mt-2">2nd LEVEL</p>

//             {/* ORG LOGO */}
//             <img
//               src={logo}
//               alt="Bhayat Logo"
//               className="w-40 mt-3"
//               crossOrigin="anonymous"
//             />

//           </div>

//           {/* CENTER */}
//           <div className="w-1/2 p-6 text-sm space-y-2">

//             <p><b>Date of Exam:</b> {data.examDate || "—"}</p>
//             <p><b>Time of Exam:</b> {data.examTime || "—"}</p>
//             <p><b>Reporting Time:</b> {data.reportingTime || "—"}</p>
//             <p><b>Batch Code:</b> {data.batchCode || "—"}</p>

//             <p className="pt-2"><b>Name:</b> {data.name || "—"}</p>

//             <p><b>Class:</b> {data.class || "—"}</p>
//             <p><b>Section:</b> {data.section || "—"}</p>

//             <p><b>Roll No:</b> {data.rollNo || "—"}</p>

//             <p><b>Centre:</b> {data.center || "—"}</p>

//           </div>

//           {/* RIGHT */}
//           <div className="w-1/4 bg-yellow-100 p-4 text-center">

//             {/* PHOTO */}
//             {data.photo ? (
//               <img
//                 src={data.photo}
//                 alt="student"
//                 className="w-24 h-28 mx-auto border-2 border-black object-cover"
//                 crossOrigin="anonymous"
//               />
//             ) : (
//               <div className="w-24 h-28 mx-auto border-2 border-dashed border-black flex items-center justify-center">
//                 Photo
//               </div>
//             )}

//             <p className="text-[10px] mt-1">
//               Passport size photograph attested
//             </p>

//             {/* SIGN */}
//             <div className="mt-5">
//               <p>Signature</p>
//               <div className="border-t mt-5"></div>
//             </div>

//             {/* DIRECTORS */}
//             <div className="mt-5 text-xs">
//               <p className="font-bold">Pawan Negi</p>
//               <p>Program Director</p>

//               <p className="font-bold mt-2">Suraj Rawat</p>
//               <p>General Secretary</p>
//             </div>

//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="text-center text-xs bg-gray-100 py-1">
//           Copy to be submitted at exam centre | Read instructions carefully
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AdmitCard;
















import React from "react";
import jsPDF from "jspdf";
import admitImg from "../assets/Admit.png";
import logo from "../assets/logo.png";

function AdmitCard({ student }) {

  const data = student || {};

  // 🔥 convert image to base64 (important for PDF)
  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF("landscape", "mm", "a4");

    // 🔥 load images
    const admitBase64 = await toBase64(admitImg);
    const logoBase64 = await toBase64(logo);

    let photoBase64 = null;
    if (data.photo) {
      try {
        photoBase64 = await toBase64(data.photo);
      } catch {
        console.log("photo load failed");
      }
    }

    // 🔥 BORDER
    pdf.setDrawColor(0);
    pdf.rect(5, 5, 287, 200);

    // 🔥 LEFT PANEL BG
    pdf.setFillColor(230, 230, 230);
    pdf.rect(5, 5, 70, 200, "F");

    // 🔥 Admit Image
    pdf.addImage(admitBase64, "PNG", 10, 10, 60, 60);

    pdf.setFontSize(14);
    pdf.text("2nd LEVEL", 25, 80);

    // 🔥 Logo
    pdf.addImage(logoBase64, "PNG", 15, 90, 50, 30);

    // 🔥 CENTER TEXT
    pdf.setFontSize(12);

    let y = 30;

    pdf.text(`Date: ${data.examDate || "-"}`, 90, y);
    y += 10;
    pdf.text(`Time: ${data.examTime || "-"}`, 90, y);
    y += 10;
    pdf.text(`Reporting: ${data.reportingTime || "-"}`, 90, y);
    y += 10;
    pdf.text(`Batch: ${data.batchCode || "-"}`, 90, y);
    y += 10;

    pdf.text(`Name: ${data.name || "-"}`, 90, y);
    y += 10;
    pdf.text(`Class: ${data.class || "-"}`, 90, y);
    y += 10;
    pdf.text(`Section: ${data.section || "-"}`, 90, y);
    y += 10;
    pdf.text(`Roll No: ${data.rollNo || "-"}`, 90, y);
    y += 10;
    pdf.text(`Centre: ${data.center || "-"}`, 90, y);

    // 🔥 RIGHT PANEL (PHOTO)
    if (photoBase64) {
      pdf.addImage(photoBase64, "JPEG", 230, 20, 40, 50);
    } else {
      pdf.rect(230, 20, 40, 50);
      pdf.text("Photo", 240, 50);
    }

    pdf.setFontSize(8);
    pdf.text("Passport size photograph", 225, 75);

    // 🔥 SIGNATURE
    pdf.setFontSize(10);
    pdf.text("Signature", 240, 100);
    pdf.line(230, 110, 270, 110);

    // 🔥 DIRECTORS
    pdf.setFontSize(10);
    pdf.text("Pawan Negi", 230, 130);
    pdf.text("Program Director", 230, 135);

    pdf.text("Suraj Rawat", 230, 150);
    pdf.text("General Secretary", 230, 155);

    // 🔥 FOOTER
    pdf.setFontSize(10);
    pdf.text(
      "Carry this admit card to exam centre",
      100,
      195
    );

    pdf.save("Admit_Card.pdf");
  };

  return (
    <div className="flex flex-col items-center p-10">
      <button
        onClick={downloadPDF}
        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg"
      >
        Download Admit Card
      </button>
    </div>
  );
}

export default AdmitCard;