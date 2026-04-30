

import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export default function BulkRegistration() {

  const [students, setStudents] = useState([
    {
      student_name: "",
      class: "",
      subject: "",
      roll_no: "",
      email: "",
      student_phone: "",
      father_name: "",
      mother_name: "",
      parent_phone: "",
      school_name: "",
      state: "",
      city: "",
      pincode: ""
    }
  ]);

  const school_code = localStorage.getItem("school_code");

  const [schoolCode, setSchoolCode] = useState("");
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    const fetchSchool = async () => {
      const email = localStorage.getItem("school_email");

      if (!email) return;

      try {
        const res = await axios.get(
          `${BASE_URL}/school/profile?email=${email}`
        );

        setSchoolCode(res.data.school_code);
        setSchoolName(res.data.institutionName);

      } catch (err) {
        console.log(err);
        alert("Failed to load school data");
      }
    };

    setTimeout(fetchSchool, 500);
  }, []);

  const addRow = () => {
    setStudents([
      ...students,
      {
        student_name: "",
        class: "",
        subject: "",
        roll_no: "",
        email: "",
        student_phone: "",
        father_name: "",
        mother_name: "",
        parent_phone: "",
        school_name: "",
        state: "",
        city: "",
        pincode: ""
      }
    ]);
  };

  const handleChange = (index, e) => {
    const updated = [...students];
    updated[index][e.target.name] = e.target.value;
    setStudents(updated);
  };

  const handleSubmit = async () => {
    try {
      const validStudents = students.filter(
        (s) => s.student_name && s.email && s.class
      );

      if (validStudents.length === 0) {
        alert("Fill Name, Email, Class ❌");
        return;
      }

      const res = await axios.post(`${BASE_URL}/bulk-register`, {
        students: validStudents,
        school_code: schoolCode || school_code
      });

      const creds = res.data.credentials;

      if (!creds || creds.length === 0) {
        alert("No data to download ❌");
        return;
      }

      alert("Registration + Signup Done ✅");
      downloadCSV(creds);

    } catch (err) {
      console.log(err.response?.data);
      alert("Error ❌");
    }
  };

  const downloadCSV = (data) => {
    let csv = "Name,Email,Password\n";

    data.forEach((item) => {
      csv += `${item.student_name},${item.email},${item.password}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "student_credentials.csv";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-6 text-white">

      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl animate-fadeIn">
        <h2 className="text-3xl font-bold text-center tracking-wide">
          {schoolName && schoolCode
            ? `${schoolName} (Code: ${schoolCode})`
            : "Loading school data..."}
        </h2>
      </div>

      {/* STUDENTS */}
      {students.map((s, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 mb-6 shadow-xl hover:scale-[1.01] transition-all duration-300"
        >
          <h3 className="text-lg font-semibold mb-4 text-indigo-300">
            Student #{index + 1}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            <input
              name="student_name"
              placeholder="Name"
              value={s.student_name}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

            <input
              name="class"
              placeholder="Class"
              value={s.class}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

            <input
              name="subject"
              placeholder="Subject"
              value={s.subject}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

            <input
              name="roll_no"
              placeholder="Roll No"
              value={s.roll_no}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

            <input
              name="email"
              placeholder="Email"
              value={s.email}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

            <input
              name="student_phone"
              placeholder="Phone"
              value={s.student_phone}
              onChange={(e) => handleChange(index, e)}
              className="inputStyle"
            />

          </div>
        </div>
      ))}

      {/* BUTTONS */}
      <div className="flex gap-4 justify-center mt-6">

        <button
          onClick={addRow}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          + Add Student
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          Submit All
        </button>

      </div>

      {/* CUSTOM CSS */}
      <style jsx>{`
        .inputStyle {
          padding: 10px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          outline: none;
          transition: all 0.3s ease;
        }

        .inputStyle::placeholder {
          color: rgba(255,255,255,0.6);
        }

        .inputStyle:focus {
          border: 1px solid #6366f1;
          box-shadow: 0 0 10px #6366f1;
          background: rgba(255,255,255,0.15);
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </div>
  );
}