import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaSchool, FaHandsHelping, FaUserTie } from "react-icons/fa";


function SelectRole() {

  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      icon: <FaUserGraduate size={40} />,
      path: "/signup/student_signup"
    },
    {
      title: "School / College / University / Institute",
      icon: <FaSchool size={40} />,
      path: "/signup/school_signup"
    },
    {
      title: "Volunteer",
      icon: <FaHandsHelping size={40} />,
      path: "/signup/Volunteer_Signup"
    },
    {
      title: "Coordinator",
      icon: <FaUserTie size={40} />,
      path: "/signup/Coordinator_Signup"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Select Your Role
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => navigate(role.path)}
            className="cursor-pointer bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-80 text-center text-white shadow-2xl hover:scale-105 hover:bg-white/30 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              {role.icon}
            </div>

            <h3 className="text-xl font-semibold">
              {role.title}
            </h3>
          </div>
        ))}

      </div>

    </div>
  );
}

export default SelectRole;