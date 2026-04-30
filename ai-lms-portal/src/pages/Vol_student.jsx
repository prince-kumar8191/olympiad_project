import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Vol_student() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const referralCode = localStorage.getItem("VolunteerReferralCode");

    if (!referralCode) {
      console.log("Referral Code Not Found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/volunteer/referrals/${referralCode}`)
      .then((res) => {
        console.log("API DATA:", res.data);
        setStudents(res.data || []);   // ✅ IMPORTANT FIX
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-6">
        My Referred Students
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Class</th>
            <th className="p-3">Subject</th>
            <th className="p-3">School</th>
            <th className="p-3">Email</th>
            <th className="p-3">Payment</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No Students Found
              </td>
            </tr>
          ) : (

            students.map((s, i) => {

              const isPaid = (s.payment_status || "").toLowerCase() === "success";

              return (
                <tr key={i} className="border-t">

                  <td className="p-3">{s.student_name}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3">{s.school_name}</td>
                  <td className="p-3">{s.email}</td>

                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${
                      isPaid
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-700"
                    }`}>
                      {isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </td>

                </tr>
              );
            })

          )}

        </tbody>

      </table>

    </div>
  );
}




