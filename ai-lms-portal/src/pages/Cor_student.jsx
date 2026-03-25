import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cor_student() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const referralCode = localStorage.getItem("CoordinatorReferralCode");
    console.log("referralCode from localStorage:", referralCode);
    

    if(!referralCode){
      console.log("Referral Code Not Found");
      return;
    }

    axios
      .get(`http://localhost:5000/coordinator/referrals/${referralCode}`)
      .then((res) => {
        console.log("Students Fetched:", res.data);
        setStudents(res.data);
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

      <div className="bg-white shadow rounded-lg p-4">

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">School</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
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

              students.map((s,i)=>(
                <tr key={i} className="border-t">

                  <td className="p-3">{s.student_name}</td>
                  <td className="p-3">{s.class}</td>
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3">{s.school_name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3 text-green-600 font-semibold">
                    Registered
                  </td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}