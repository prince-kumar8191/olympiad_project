
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import ChooseSignup from "../pages/choose_signup";
import StudentSignup from "../pages/auth/student_signup" ;
import RegistrationPage from "../pages/RegistrationPage";
import SchoolSignup from "../pages/auth/school_signup";
import StudentDashboard from "../pages/Student_Dashboard";
import StudentProfile from "../pages/auth/StudentProfile";
import SchoolDashboard from "../pages/School_Dashboard";
import VolunteerSignup from "../pages/auth/Volunteer_Signup";
import CoordinatorSignup from "../pages/auth/Coordinator_Signup";
import StudentLogin from "../pages/auth/Student_login";
import SchoolLogin from "../pages/auth/School_login";
import VolunteerLogin from "../pages/auth/Volunteer_login";
import Coordinatorlogin from "../pages/auth/Coordinator_login";
import Adminlogin from "../pages/auth/Admin_login";
import SuperAdminlogin from "../pages/auth/SuperAdmin_login";
import Editprofile from "../pages/Edit_profile";
import Scholarship from "../pages/Scholarship";
import About from "../pages/About";
import OlympiadPage from "../pages/OlympiadPage";
import CoordinatorDashboard from "../pages/Coordinator_Dashboard";
import MathematicsOlympiad from "../pages/Subject_Features/Math_Olympiad";
import ScienceOlympiad from "../pages/Subject_Features/Science_Olympiad";
import ComputerOlympiad from "../pages/Subject_Features/Computer_Olympiad";
import EnglishOlympiad from "../pages/Subject_Features/English_Olympiad";
import Math_mock from "../pages/Subject_Features/Math_Mock";
import Science_mock from "../pages/Subject_Features/Science_mock";
import SchoolProfile from "../pages/auth/School_Profile";
import Coordinator_profile from "../pages/auth/Coordinator_profile";
import Volunteer_Profile from "../pages/auth/Volunteer_Profile";
import VolunteerDashboard from "../pages/Volunteer_Dashboard";  
import DashVol_profile from "../pages/DashVol_profile"
import SchoolEditProfile from "../pages/SchoolEdit_profile";
import AdminLogin from "../pages/auth/Admin_login";
import OtpVerify from "../pages/auth/OtpVerify";
import Admin_Dashboard from "../pages/Admin_Dashboard";
import Exam_login from "../pages/Exam_login";
import Exampage from "../pages/Exampage";
import Examinstructions from "../pages/Examinstructions";
import Voldash_profile  from "../pages/Voldash_profile"
import SubmitPage from "../pages/Submit";
import VolunteerID from "../pages/auth/VolunteerID";
import CoordinatorId from "../pages/CoordinatorId";
import CoordinatorManagement from "../pages/CoordinatorManagement";
import VolunteerManagement from "../pages/VolunteerManagement";
import SchoolManagement from "../pages/SchoolManagement.";
import ReferPage from "../pages/ReferPage";
import CoordinatorRefer from "../pages/CoordinatorRefer";
import Cor_student from "../pages/Cor_student";
import StudentRefer from "../pages/StudentRefer";
import TermsConditions from "../pages/Term_Condition";
import PaymentPage from "../pages/auth/PayementPage";
import Success from "../pages/Success";
import Failed from "../pages/Failed";
import BenefitPay from "../pages/BenefitPay";
import Awardcriteria from "../pages/Awardcriteria";
import AdmitCard from "../pages/Admitcard";
import Uploadfile from "../pages/Uploadfile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<ChooseSignup />} />
      <Route path="/signup/student_signup" element={< StudentSignup/>} />
      <Route path="/signup/school_signup" element={< SchoolSignup/>} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/Student_Dashboard" element={<StudentDashboard />} />
      <Route path="/StudentProfile" element={<StudentProfile />} />
      <Route path="/School_Dashboard" element={<SchoolDashboard />} />
      <Route path="/signup/Volunteer_Signup" element={<VolunteerSignup />} />
      <Route path="/signup/Coordinator_Signup" element={<CoordinatorSignup />} />
      <Route path="/login/student_login" element={<StudentLogin />} />
      <Route path="/login/school_login" element={<SchoolLogin />} />
      <Route path="/login/Volunteer_login" element={<VolunteerLogin />} />
      <Route path="/login/Coordinator_login" element={<Coordinatorlogin />} />
      <Route path="/login/Admin_login" element={<Adminlogin />} />
      <Route path="/login/SuperAdmin_login" element={<SuperAdminlogin />} />
      <Route path="/Edit_profile" element={<Editprofile />} />
      <Route path="/Scholarship" element={<Scholarship />} />
      <Route path="/About" element={<About />} />
      <Route path="/Olympiad" element={<OlympiadPage/>} />
      <Route path="/Coordinator_Dashboard" element={<CoordinatorDashboard />} />
      <Route path="/Math_Olympiad" element={<MathematicsOlympiad />} />
      <Route path="/Science_Olympiad" element={<ScienceOlympiad />} />
      <Route path="/Computer_Olympiad" element={<ComputerOlympiad />} />
      <Route path="/English_Olympiad" element={<EnglishOlympiad />} />
      <Route path="/Math_Mock" element={<Math_mock />} />
      <Route path="/Science_mock" element={<Science_mock />} />
      <Route path="/School_Profile" element={<SchoolProfile />} />
      <Route path="/Coordinator_profile" element={<Coordinator_profile />} />
      <Route path="/Volunteer_Profile" element={<Volunteer_Profile />} />
      <Route path="/Volunteer_Dashboard" element={<VolunteerDashboard />} />  
      <Route path="/DashVol_profile" element={<DashVol_profile />} />
      <Route path="/SchoolEdit_profile" element={<SchoolEditProfile />} />
      <Route path="/Admin_login" element={<AdminLogin />} />
      <Route path="/OtpVerify" element={<OtpVerify />} />
      <Route path="/Admin_Dashboard" element={<Admin_Dashboard />} /> 
      <Route path="/Exam_login" element={<Exam_login />} />
      <Route path="/ExamInstructions" element={<Examinstructions />} />
      <Route path="/ExamPage" element={<Exampage />} />
      <Route path="/Voldash_profile" element={<Voldash_profile />} />
      <Route path="/Submit" element={<SubmitPage />} />
      <Route path="/VolunteerID" element={<VolunteerID />} />
      <Route path="/CoordinatorId" element={<CoordinatorId />} />
      <Route path="/CoordinatorManagement" element={<CoordinatorManagement />} />
      <Route path="/SchoolManagement" element={<SchoolManagement />} />
      <Route path="/VolunteerManagement" element={<VolunteerManagement />} />
      <Route path="/ReferPage" element={<ReferPage />} />
      <Route path="/CoordinatorRefer" element={<CoordinatorRefer />} />
      <Route path="/Cor_student" element={<Cor_student />} />
      <Route path="/StudentRefer" element={<StudentRefer />} />
      <Route path="/Term_Condition" element={<TermsConditions />} /> 
      <Route path="/PaymentPage" element={<PaymentPage/>} />
      <Route path="/Success" element={<Success/>} />
      <Route path="/Failed" element={<Failed/>} />
      <Route path="/BenefitPay" element={<BenefitPay/>} />
      <Route path="/Awardcriteria" element={<Awardcriteria/>} />
      <Route path="/Admitcard" element={<AdmitCard/>} />
      <Route path="/Uploadfile" element={<Uploadfile/>} />


    </Routes>
  );
}