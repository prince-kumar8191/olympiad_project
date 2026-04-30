
import React, { useState } from "react";
import { FaTrophy, FaAward, FaUserGraduate, FaMedal } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Footer from "./auth/Footer";


function ScholarshipPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const goToScholarship = () => navigate("/scholarship");
  const [showAwards, setShowAwards] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isCoordinator = localStorage.getItem("coordinatorLogin");
  const goToHome = () => navigate("/");
  const goToAbout = () => navigate("/about");
  const goToOlympiads = () => navigate("/olympiads");
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToSignup = () => {
    window.location.href = "/signup";
  };
  return (
    <div className="bg-gray-50">
      {/* {/NAVBAR/} */}
   <nav className="bg-white/70 backdrop-blur-xl shadow-md sticky top-0 z-[999] relative border-b border-white/40">
           <div className="flex justify-between items-center px-6 md:px-10 py-4">
             {/* 🔥 LOGO + NAME */}
             <div
               className="flex items-center gap-3 cursor-pointer transition duration-300 hover:scale-105"
               onClick={goToHome}
             >
               <img
                 src={logo}
                 alt="Bhayat Logo"
                 className="h-12 w-auto object-contain scale-[3.0] origin-left drop-shadow-md"
               />
             </div>
 
             {/* RIGHT SIDE MENU */}
             <div className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
               <a onClick={goToHome} className="nav-link hover:text-indigo-600 cursor-pointer">
                 Home
               </a>
 
               <a onClick={goToAbout} className="nav-link hover:text-indigo-600 cursor-pointer">
                 About
               </a>
 
               <div className="relative">
                 <button
                   onClick={() => setShowAwards(!showAwards)}
                   className="nav-link hover:text-indigo-600 cursor-pointer"
                 >
                   Awards
                 </button>
 
                 {showAwards && (
                   <div className="absolute top-12 left-0 glass shadow-2xl rounded-2xl p-3 w-56 z-50 animate-fadeUp">
                     <button
                       onClick={() => {
                         navigate("/Student_Award");
                         setShowAwards(false);
                       }}
                       className="block w-full text-left py-2 px-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                     >
                       Student Awards and Recognition
                     </button>
 
                     <button
                       onClick={() => {
                         navigate("/School_Award");
                         setShowAwards(false);
                       }}
                       className="block w-full text-left py-2 px-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition"
                     >
                       School Awards and Recognition
                     </button>
                   </div>
                 )}
               </div>
 
               <a
                 onClick={() => navigate("/Criteria")}
                 className="nav-link hover:text-indigo-600 cursor-pointer"
               >
                 Criteria
               </a>
 
               <a onClick={goToOlympiads} className="nav-link hover:text-indigo-600 cursor-pointer">
                 Olympiads
               </a>
 
               <a
                 onClick={goToScholarship}
                 className="nav-link hover:text-indigo-600 cursor-pointer"
               >
                 Scholarship
               </a>
 
               {isLoggedIn ? (
                 <div className="flex items-center gap-4">
                   <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full shadow-sm">
                     👤 {user.name || role}
                   </span>
 
                   {/* 🔥 ROLE DASHBOARD */}
                   {role === "student" && (
                     <button
                       onClick={() => navigate("/Student_Dashboard")}
                       className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                     >
                       📊 Dashboard
                     </button>
                   )}
 
                   {role === "coordinator" && (
                     <button
                       onClick={() => navigate("/Coordinator_Dashboard")}
                       className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                     >
                       📊 Dashboard
                     </button>
                   )}
 
                   {role === "volunteer" && (
                     <button
                       onClick={() => navigate("/Volunteer_Dashboard")}
                       className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                     >
                       📊 Dashboard
                     </button>
                   )}
 
                   {role === "school" && (
                     <button
                       onClick={() => navigate("/School_Dashboard")}
                       className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                     >
                       📊 Dashboard
                     </button>
                   )}
 
                   {/* LOGOUT */}
                   <button
                     onClick={() => {
                       localStorage.clear();
                       navigate("/login");
                     }}
                     className="border-2 border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition hover:scale-105"
                   >
                     Logout
                   </button>
                 </div>
               ) : (
                 <>
                   <button
                     onClick={goToLogin}
                     className="border-2 border-indigo-500 text-indigo-500 px-5 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition hover:scale-105"
                   >
                     Login
                   </button>
 
                   <button
                     onClick={goToSignup}
                     className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition hover:scale-105 animate-glow"
                   >
                     Sign Up
                   </button>
                 </>
               )}
             </div>
 
             {/* MOBILE MENU BUTTON */}
             <button
               className="md:hidden text-3xl text-indigo-700 hover:scale-110 transition"
               onClick={() => setMenuOpen(!menuOpen)}
             >
               ☰
             </button>
           </div>
 
           {/* MOBILE MENU */}
           {menuOpen && (
             <div className="md:hidden flex flex-col gap-4 px-6 pb-6 font-semibold bg-white/90 backdrop-blur-xl animate-fadeUp">
               <a onClick={goToHome} className="cursor-pointer hover:text-indigo-600 transition">
                 Home
               </a>
               <a
                 onClick={goToOlympiads}
                 className="cursor-pointer hover:text-indigo-600 transition"
               >
                 Olympiads
               </a>
               <a
                 onClick={goToScholarship}
                 className="cursor-pointer hover:text-indigo-600 transition"
               >
                 Scholarship
               </a>
               <a onClick={goToAbout} className="cursor-pointer hover:text-indigo-600 transition">
                 About
               </a>
 
               <div>
                 <button onClick={() => setShowAwards(!showAwards)} className="hover:text-indigo-600 transition">
                   Awards
                 </button>
 
                 {showAwards && (
                   <div className="ml-4 mt-2 flex flex-col gap-2 animate-fadeUp">
                     <button onClick={() => navigate("/Student_Award")} className="text-left hover:text-indigo-600">
                       Student Awards and Recognition
                     </button>
                     <button onClick={() => navigate("/School_Award")} className="text-left hover:text-indigo-600">
                       School Awards and Recognition
                     </button>
                   </div>
                 )}
               </div>
 
               <a onClick={() => navigate("/Criteria")} className="hover:text-indigo-600 transition">
                 Criteria
               </a>
 
               {isLoggedIn ? (
                 <>
                   <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full w-fit">
                     👤 {user.name || role}
                   </span>
 
                   {/* DASHBOARD */}
                   {role === "student" && (
                     <button onClick={() => navigate("/Student_Dashboard")} className="text-left hover:text-indigo-600">
                       Dashboard
                     </button>
                   )}
 
                   {role === "coordinator" && (
                     <button onClick={() => navigate("/Coordinator_Dashboard")} className="text-left hover:text-indigo-600">
                       Dashboard
                     </button>
                   )}
 
                   {role === "volunteer" && (
                     <button onClick={() => navigate("/Volunteer_Dashboard")} className="text-left hover:text-indigo-600">
                       Dashboard
                     </button>
                   )}
 
                   {role === "school" && (
                     <button onClick={() => navigate("/School_Dashboard")} className="text-left hover:text-indigo-600">
                       Dashboard
                     </button>
                   )}
 
                   {/* LOGOUT */}
                   <button
                     onClick={() => {
                       localStorage.clear();
                       navigate("/login");
                     }}
                     className="text-red-500 text-left"
                   >
                     Logout
                   </button>
                 </>
               ) : (
                 <>
                   <button onClick={goToLogin} className="text-left hover:text-indigo-600">
                     Login
                   </button>
                   <button onClick={goToSignup} className="text-left hover:text-indigo-600">
                     Sign Up
                   </button>
                 </>
               )}
             </div>
           )}
         </nav>

      {/* HERO */}
      <div className="relative h-[500px] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute w-full h-full bg-black opacity-60"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">
            BHAYAT - National Academic Excellence Scholarship
          </h1>

          <p className="text-xl mb-6">
            NAES 2026–27
          </p>

          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Apply Now
          </button>
        </div>
      </div>

      {/* ABOUT */}
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          About NAES Scholarship
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed">
          The BHAYAT NGO is pleased to introduce the National Academic
          Excellence Scholarship (NAES) 2026–27. The main objective of this
          scholarship is to encourage and promote all-round academic
          development among students. The scholarship recognizes outstanding
          students who demonstrate academic excellence in various Skill Test
          and Olympiad examinations conducted by the BHAYAT NGO.
        </p>
      </div>

      {/* IMAGE GALLERY */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-16">
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
          className="rounded-xl shadow-lg hover:scale-105 duration-300"
        />
      </div>

      {/* SELECTION CRITERIA */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
            Selection Criteria
          </h2>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              Scholarship winners from each class will be students who obtain
              the highest cumulative marks in any two Olympiad exams conducted
              during the year.
            </li>

            <li>
              For NSMO, NEO, NSO and NGKO Olympiads, highest marks obtained in
              any two Olympiad will be considered.
            </li>

            <li>
              If second level exams are not conducted, marks from the first
              level exams will be considered.
            </li>
          </ul>

        </div>
      </div>

      {/* SCHOLARSHIP NUMBERS */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-10">
          Number of Scholarships
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div>
            <h3 className="text-4xl font-bold">260</h3>
            <p>Total Students Receiving Cash Scholarship</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">26</h3>
            <p>Zones Across India</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">₹2500</h3>
            <p>Cash Award Per Winner</p>
          </div>

        </div>

        <div className="max-w-4xl mx-auto mt-10 text-lg">
          <p>
            One student from each class (Class 1 to Class 10) from every
            state/zone will be selected.
          </p>

          <p className="mt-2">
            Maximum 5 winners will be selected from each state/zone for CASH
            Scholar.
          </p>

          <p className="mt-2">
            Top 50 students from national level will get discount in NEET and
            JEE exam preparation.
          </p>
        </div>

      </div>

      {/* AWARDS */}
      <div className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          Scholarship Award
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaTrophy className="text-3xl text-yellow-500" />
            Trophy
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaAward className="text-3xl text-green-500" />
            Cash Award ₹2,500
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaMedal className="text-3xl text-purple-500" />
            Citation Certificate
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <FaUserGraduate className="text-3xl text-indigo-500" />
            JEE / NEET Preparation Support
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            National Tour for 26 National Top Achievers
          </div>

        </div>
      </div>

      {/* TIE BREAKING */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center">
            Tie-Breaking Criteria
          </h2>

          <ol className="list-decimal ml-6 text-lg space-y-3 text-gray-700">
            <li>
              Students scoring higher cumulative marks in 1st level exams.
            </li>

            <li>
              Higher marks order: Mathematics → Science → English → General
              Knowledge → Computers → Social Studies → Hindi.
            </li>

            <li>
              Higher ranks in 2nd level exams in order: Mathematics → Science →
              English.
            </li>
          </ol>

        </div>
      </div>

      {/* RESULT */}
      <div className="bg-purple-700 text-white text-center py-14">

        <h2 className="text-3xl font-bold mb-4">
          Result Declaration
        </h2>

        <p className="text-lg">
          The winners of the National Academic Excellence Scholarship (NAES)
          2026–27 will be announced by the end of March 2027.
        </p>
        </div>
      {/* FOOTER */}
      <Footer />

      </div>

     
  );
}

export default ScholarshipPage;