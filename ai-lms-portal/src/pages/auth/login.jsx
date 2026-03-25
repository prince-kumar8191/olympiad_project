import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaSchool, 
  FaHandsHelping, 
  FaUserTie, 
  FaUserShield, 
  FaCrown 
} from "react-icons/fa";

function LoginSelectRole() {

  const navigate = useNavigate();

  const roles = [
    {
      title: "Student Login",
      icon: <FaUserGraduate size={40} />,
      path: "/login/student_login"
    },
    {
      title: "School / College / Institute Login",
      icon: <FaSchool size={40} />,
      path: "/login/school_login"
    },
    {
      title: "Volunteer Login",
      icon: <FaHandsHelping size={40} />,
      path: "/login/Volunteer_login"
    },
    {
      title: "Coordinator Login",
      icon: <FaUserTie size={40} />,
      path: "/login/Coordinator_login"

    },
    {
      title: "Admin Login",
      icon: <FaUserShield size={40} />,
      path: "/login/Admin_login" 
    },
    {
      title: "Super Admin Login",
      icon: <FaCrown size={40} />,
      path: "/login/SuperAdmin_login"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Select Login Role
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => navigate(role.path)}
            className="cursor-pointer bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-72 text-center text-white shadow-2xl hover:scale-105 hover:bg-white/30 transition-all duration-300"
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

export default LoginSelectRole;