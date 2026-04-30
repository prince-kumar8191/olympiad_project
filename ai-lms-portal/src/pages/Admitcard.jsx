import axios from "axios";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import admitImg from "../assets/Admit.png";
import logo from "../assets/logo.png";

function AdmitCard() {

  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-admit-card/${id}`
        );

        setStudent(res.data.student);
        setExam(res.data.exam);

      } catch (err) {
        console.log(err);
        if (err.response) {
          alert(err.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ BASE64
  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // ✅ PDF DOWNLOAD
  const downloadPDF = async () => {

    const pdf = new jsPDF("landscape", "mm", "a4");

    const admitBase64 = await toBase64(admitImg);
    const logoBase64 = await toBase64(logo);

    let photoBase64 = null;
    if (student?.photo) {
      try {
        photoBase64 = await toBase64(student.photo);
      } catch { }
    }

    pdf.rect(5, 5, 287, 200);

    pdf.setFillColor(230, 230, 230);
    pdf.rect(5, 5, 70, 200, "F");

    pdf.addImage(admitBase64, "PNG", 10, 10, 60, 60);
    pdf.setFontSize(14);
    pdf.text("ADMIT CARD", 20, 80);
    pdf.addImage(logoBase64, "PNG", 15, 90, 50, 30);

    let y = 30;

    pdf.setFontSize(12);

    pdf.text(`StudentId: ${student?.StudentId || "-"}`, 90, y); y += 10;
    pdf.text(`Name: ${student?.student_name || "-"}`, 90, y); y += 10;
    pdf.text(`DOB: ${student?.dob || "-"}`, 90, y); y += 10;
    pdf.text(`Class: ${student?.class || "-"}`, 90, y); y += 10;
    pdf.text(`Subject: ${student?.subject || "-"}`, 90, y); y += 10;

    pdf.text(`Date: ${exam?.examDate || "-"}`, 90, y); y += 10;
    pdf.text(`Time: ${exam?.examTime || "-"}`, 90, y); y += 10;
    pdf.text(`Reporting: ${exam?.reportingTime || "-"}`, 90, y); y += 10;
    pdf.text(`ExamMode: ${exam?.examMode || "-"}`, 90, y); y += 10;
    pdf.text(`ExamCode: ${exam?.examCode || "-"}`, 90, y); y += 10;

    if (photoBase64) {
      pdf.addImage(photoBase64, "JPEG", 230, 20, 40, 50);
    } else {
      pdf.rect(230, 20, 40, 50);
      pdf.text("Photo", 240, 50);
    }

    pdf.setFontSize(8);
    pdf.text("Passport size photograph", 225, 75);

    pdf.setFontSize(10);
    pdf.text("Signature", 40, 180);
    pdf.line(30, 185, 90, 185);

    pdf.text("Pawan Negi", 120, 180);
    pdf.text("Program Director", 120, 185);

    pdf.text("Suraj Rawat", 220, 180);
    pdf.text("General Secretary", 220, 185);

    pdf.text("Carry this admit card to exam centre", 100, 195);

    pdf.save("Admit_Card.pdf");
  };

  // 🔥 LOADING
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!student || !exam) {
    return (
      <div className="p-10 text-center text-red-500">
        Unable to load admit card
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="flex flex-col items-center p-10">

      <div className="w-[800px] border shadow-lg p-6 bg-white">

        <div className="flex">

          {/* LEFT */}
          <div className="w-[150px] bg-gray-200 p-2 text-center">
            <img src={admitImg} alt="" className="w-full" />
            <p className="mt-2 font-bold">ADMIT CARD</p>
            <img src={logo} alt="" className="mt-4 w-full" />
          </div>

          
{/* CENTER */}
<div className="flex-1 px-6">

  <h1 className="text-2xl font-bold text-center mb-6">ADMIT CARD</h1>

  <div className="grid grid-cols-2 gap-4">

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>🆔</div>
      <div>
        <p className="text-sm text-gray-500">Student ID</p>
        <p className="font-semibold">{student.StudentId}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>👤</div>
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-semibold">{student.student_name}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>🎂</div>
      <div>
        <p className="text-sm text-gray-500">DOB</p>
        <p className="font-semibold">{student.dob}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>🏫</div>
      <div>
        <p className="text-sm text-gray-500">Class</p>
        <p className="font-semibold">{student.class}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>📘</div>
      <div>
        <p className="text-sm text-gray-500">Subject</p>
        <p className="font-semibold">{student.subject}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>📅</div>
      <div>
        <p className="text-sm text-gray-500">Exam Date</p>
        <p className="font-semibold">{exam.examDate}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>⏰</div>
      <div>
        <p className="text-sm text-gray-500">Exam Time</p>
        <p className="font-semibold">{exam.examTime}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>⏳</div>
      <div>
        <p className="text-sm text-gray-500">Reporting Time</p>
        <p className="font-semibold">{exam.reportingTime}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>💻</div>
      <div>
        <p className="text-sm text-gray-500">Exam Mode</p>
        <p className="font-semibold">{exam.examMode}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl shadow-sm">
      <div>#️⃣</div>
      <div>
        <p className="text-sm text-gray-500">Exam Code</p>
        <p className="font-semibold">{exam.examCode}</p>
      </div>
    </div>

  </div>
</div>

          {/* RIGHT */}
          <div className="w-[150px] text-center">
            {student.photo ? (
              <img
                src={student.photo}
                className="w-[120px] h-[150px] object-cover mx-auto"
                alt=""
              />
            ) : (
              <div className="w-[120px] h-[150px] border mx-auto flex items-center justify-center">
                Photo
              </div>
            )}
            <p className="text-xs mt-2">Passport size photograph</p>
          </div>

        </div>

        {/* SIGNATURE SECTION */}
        <div className="flex justify-between mt-10 text-sm">

          <div>
            <p>Signature</p>
            <div className="w-[120px] border-t mt-2"></div>
          </div>

          <div className="text-center">
            <p>Pawan Negi</p>
            <p className="w-[120px] border-t mt-2">Program Director</p>
          </div>

          <div className="text-center">
            <p>Suraj Rawat</p>
            <p className="w-[120px] border-t mt-2">General Secretary</p>
          </div>

        </div>

      </div>

      {/* BUTTON */}
      <button
        onClick={downloadPDF}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg"
      >
        Download Admit Card
      </button>

    </div>
  );
}

export default AdmitCard;