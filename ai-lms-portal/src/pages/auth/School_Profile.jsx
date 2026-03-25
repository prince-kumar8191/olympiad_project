


import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function SchoolProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const [school, setSchool] = useState({});




  const fetchSchoolProfile = async () => {

  try {

    const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");
    const email = savedSchool.email;

    const res = await axios.get(
      `http://localhost:5000/school/profile?email=${email}`
    );

    console.log("API DATA:", res.data);

    if (res.data) {

      const formattedData = {
        school_name: res.data.institutionName,
        affiliation: res.data.affiliation,
        school_code: res.data.schoolCode || res.data.school_code,
        city: res.data.district,
        state: res.data.state,
        school_email: res.data.email,
        school_phone: res.data.mobile,
        principal_name: res.data.principalName,
        school_address: res.data.address,
        pincode: res.data.pincode,
        facilities: res.data.facilities || [],
        classes: res.data.classes || [],
        logo: res.data.logo || null
      };

      setSchool(formattedData);

    }

  } catch (error) {

    console.log("Fetch Error:", error);

  }

};


  useEffect(() => {

    const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");

    if (savedSchool && Object.keys(savedSchool).length > 0) {

      const formattedData = {
        school_name: savedSchool.institutionName || "",
        affiliation: savedSchool.affiliation || "",
        school_code: savedSchool.school_code || savedSchool.schoolCode || "",
        city: savedSchool.district || "",
        state: savedSchool.state || "",
        school_email: savedSchool.email || "",
        school_phone: savedSchool.mobile || "",
        principal_name: savedSchool.principalName || "",
        school_address: savedSchool.address || "",
        pincode: savedSchool.pincode || "",
        logo: savedSchool.logo || null
      };

      setSchool(formattedData);

    }

    // 🔥 API call bhi hoga
    fetchSchoolProfile();

  }, []);



  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">

              {school?.logo ? (
                <img
                  src={school.logo}
                  alt="School Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white bg-indigo-600 w-full h-full flex items-center justify-center text-xl font-bold">
                  {school?.school_name ? school.school_name.charAt(0) : "S"}
                </span>
              )}

            </div>

            <div>
              <h2 className="text-xl font-bold">
                {school?.school_name || "School Name"}
              </h2>

              <p className="text-gray-500">
                {school?.affiliation || "Affiliation"}
              </p>

              <p className="text-gray-500">
                School Code : {school?.school_code || "SCH-001"}
              </p>
            </div>

          </div>

          <hr className="my-4" />

          <p className="text-gray-600">
            📍 {school?.city || "City"}, {school?.state || "State"}, India
          </p>

          <p className="text-gray-600 mt-2">
            📧 {school?.school_email || "school@email.com"}
          </p>

          <p className="text-gray-600 mt-2">
            📞 {school?.school_phone || "+91 0000000000"}
          </p>

          <p className="text-gray-600 mt-2">
            Principal : {school?.principal_name || "Principal Name"}
          </p>

          <p className="text-gray-600 mt-2">
            Address : {school?.school_address || "School Address"}
          </p>

          <p className="text-gray-600 mt-2">
            Pincode : {school?.pincode || "000000"}
          </p>

          <div className="mt-4">

            <button
              onClick={() =>
                navigate("/SchoolEdit_profile", { state: school })
              }
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Edit Profile
            </button>

          </div>

        </div>


        {/* RIGHT MAIN SECTION */}
        <div className="md:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              School Summary
            </h3>

            <p className="text-gray-600">
              {school?.school_name || "Our school"} is committed to academic excellence
              and actively participates in national and international Olympiad
              competitions. We focus on developing analytical thinking and
              problem solving skills.
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-2">
              Olympiad Performance
            </h3>

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center font-bold">
                90%
              </div>

              <p className="text-gray-600">
                Performance score based on Olympiad participation and results.
              </p>

            </div>

          </div>


          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4">
              School Facilities
            </h3>

            <div className="flex flex-wrap gap-3">

              {school?.facilities?.length > 0 ? (
                school.facilities.map((f, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                    Science Lab
                  </span>

                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                    Computer Lab
                  </span>

                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                    Library
                  </span>

                  <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                    Sports Ground
                  </span>
                </>
              )}

            </div>

          </div>


          <div className="bg-white p-6 rounded-xl shadow-md">

            <h3 className="text-xl font-bold mb-4">
              Olympiad Participation
            </h3>

            <ul className="list-disc ml-6 text-gray-600">

              <li>Math Olympiad 2024</li>
              <li>Science Olympiad 2025</li>
              <li>Computer Olympiad 2025</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SchoolProfile;