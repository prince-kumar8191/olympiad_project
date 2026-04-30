
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import ChooseSignup from "../pages/choose_signup";
import StudentSignup from "../pages/auth/student_signup";
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
import Voldash_profile from "../pages/Voldash_profile"
import SubmitPage from "../pages/Submit";
import VolunteerID from "../pages/auth/VolunteerID";
import CoordinatorId from "../pages/CoordinatorId";
import CoordinatorManagement from "../pages/CoordinatorManagement";
import VolunteerManagement from "../pages/VolunteerManagement";
import SchoolManagement from "../pages/SchoolManagement.";
import ReferPage from "../pages/ReferPage";
import CoordinatorRefer from "../pages/CoordinatorRefer";
import VolunteerRefer from "../pages/VolunteerRefer";
import Cor_student from "../pages/Cor_student";
import StudentRefer from "../pages/StudentRefer";
import TermsConditions from "../pages/Term_Condition";
import PaymentPage from "../pages/auth/PayementPage";
import Success from "../pages/Success";
import Failed from "../pages/Failed";
import BenefitPay from "../pages/BenefitPay";
import AdmitCard from "../pages/Admitcard";
import Uploadfile from "../pages/Uploadfile";
import Refund_Return from "../pages/Refund_Return";
import Privacy_Policy from "../pages/Privacy_Policy";
import Bulk_Registration from "../pages/auth/Bulk_Registration";
import School_Award from "../pages/School_Award";
import Waiting from "../pages/Waiting";
import Student_Award from "../pages/Student_Award";
import Criteria from "../pages/Criteria";
import Maths6 from "../Syllabus/Maths6";
import Maths7 from "../Syllabus/Maths7";
import Maths8 from "../Syllabus/Maths8";
import Maths9 from "../Syllabus/Maths9";
import Maths10 from "../Syllabus/Maths10";
import Science6 from "../Syllabus/Science6";
import Science7 from "../Syllabus/Science7";
import Science8 from "../Syllabus/Science8";
import Science9 from "../Syllabus/Science9";
import Science10 from "../Syllabus/Science10";
import ResultPage from "../pages/ResultPage";
import Mockstart from "../pages/Mockstart";
import MockTest from "../pages/MockTest";
import MockResult from "../pages/MockResult";
import MockUpload from "../pages/MockUpload";
import Program from "../pages/Program";
import Decleration from "../pages/Decleration";
import Gallery from "../pages/Gallery";
import Ourblog from "../pages/Ourblog";
import Contactus from "../pages/Contactus";
import Olympiads from "../pages/Olympiads";
import OlympiadDetailPage from "../pages/OlympiadDetailPage";
import Admin_results from "../pages/Admin_results";
import Admin_students from "../pages/Admin_students";
import Certificate from "../pages/Certificate";
import Admin_coordinators from "../pages/Admin_coordinators";
import Admin_volunteers from "../pages/Admin_volunteers";
import Admin_schools from "../pages/Admin_schools";
import School_certificate from "../pages/School_certificate";
import SkillExamLogin from "../pages/SkillExamLogin";
import SkillExamPage from "../pages/SkillExamPage";
import Skill_Result from "../pages/Skill_Result";
import AdminRank from "../pages/AdminRank";
import View_student_detail from "../pages/View_student_detail";
import Student_payment_status from "../pages/Student_payment_status";  
import Admin_stu_payment from "../pages/Admin_stu_payment";
import Admin_apporve_stu_payment from "../pages/Admin_apporve_stu_payment";
import Student_paid_unpaid from "../pages/Student_paid_unpaid";
import Add_exam_details from "../pages/Add_exam_details";
import PYQS_Download_Pages from "../pages/PYQS_Download_Pages"; 
import Vol_student from "../pages/Vol_student";
import Admit_Control from "../pages/Admit_Control";
import Membership_Signup from "../pages/Membership_Signup";
import Membership_profile from "../pages/Membership_profile";
import Membership_Refer from "../pages/Membership_Refer";
import Membership_Dashboard from "../pages/Membership_Dashboard";
import Membership_Login from "../pages/Membership_Login";
import Membership_Id from "../pages/Membership_Id";
import Membership_Editprofile from "../pages/Membership_EditProfile";
import Cor_Task from "../pages/Cor_Task";
import Vol_Task from "../pages/Vol_task";
// import OmrView from "../pages/OmrView";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<ChooseSignup />} />
      <Route path="/signup/student_signup" element={< StudentSignup />} />
      <Route path="/signup/school_signup" element={< SchoolSignup />} />
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
      <Route path="/Olympiad" element={<OlympiadPage />} />
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
      <Route path="/VolunteerRefer" element={<VolunteerRefer />} />
      <Route path="/Cor_student" element={<Cor_student />} />
      <Route path="/StudentRefer" element={<StudentRefer />} />
      <Route path="/Term_Condition" element={<TermsConditions />} />
      <Route path="/PaymentPage" element={<PaymentPage />} />
      <Route path="/Success" element={<Success />} />
      <Route path="/Failed" element={<Failed />} />
      <Route path="/BenefitPay" element={<BenefitPay />} />
      <Route path="/Admitcard/:id" element={<AdmitCard />} />
      <Route path="/Uploadfile" element={<Uploadfile />} />
      <Route path="/Refund_Return" element={<Refund_Return />} />
      <Route path="/Privacy_Policy" element={<Privacy_Policy />} />
      <Route path="/Bulk_Registration" element={<Bulk_Registration />} />
      <Route path="/School_Award" element={<School_Award />} />
      <Route path="/Waiting" element={<Waiting />} />
      <Route path="/Student_Award" element={<Student_Award />} />
      <Route path="/Criteria" element={<Criteria />} />
      <Route path="/Maths6" element={<Maths6 />} />
      <Route path="/Maths7" element={<Maths7 />} />
      <Route path="/Maths8" element={<Maths8 />} />
      <Route path="/Maths9" element={<Maths9 />} />
      <Route path="/Maths10" element={<Maths10 />} />
      <Route path="Science6" element={<Science6 />} />
      <Route path="Science7" element={<Science7 />} />
      <Route path="Science8" element={<Science8 />} />
      <Route path="Science9" element={<Science9 />} />
      <Route path="Science10" element={<Science10 />} />
      <Route path="/ResultPage/:id" element={<ResultPage />} />
      <Route path="/Mockstart" element={<Mockstart />} />
      <Route path="/MockTest" element={<MockTest />} />
      <Route path="/MockResult" element={<MockResult />} />
      <Route path="/MockUpload" element={<MockUpload />} />
      <Route path="/Program" element={<Program />} />
      <Route path="/Decleration" element={<Decleration />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/Ourblog" element={<Ourblog />} />
      <Route path="/Contactus" element={<Contactus />} />
      <Route path="/Olympiads" element={<Olympiads />} />
      <Route path="/olympiad/:slug" element={<OlympiadDetailPage />} />
      <Route path="/Admin_results" element={<Admin_results />} />
      <Route path="/Admin_students" element={<Admin_students />} />
      <Route path="/Certificate/:id" element={<Certificate />} />
      <Route path="/Admin_coordinators" element={<Admin_coordinators />} />
      <Route path="/Admin_volunteers" element={<Admin_volunteers />} />
      <Route path="/Admin_schools" element={<Admin_schools />} />
      <Route path="/School_certificate/:id" element={<School_certificate />} />
      <Route path="/SkillExamLogin" element={<SkillExamLogin />} />
      <Route path="/SkillExamPage" element={<SkillExamPage />} />
      <Route path="/Skill_Result/:id" element={<Skill_Result />} />
      <Route path="/AdminRank" element={<AdminRank />} />
      <Route path="/View_student_detail" element={<View_student_detail />} />
     <Route path="/Student_payment_status" element={<Student_payment_status />} />
      <Route path="/Admin_stu_payment" element={<Admin_stu_payment />} />
      <Route path="/Admin_apporve_stu_payment" element={<Admin_apporve_stu_payment />} />
      <Route path="/Student_paid_unpaid" element={<Student_paid_unpaid />} />
      <Route path="/Add_exam_details" element={<Add_exam_details />} />
      <Route path="/PYQS_Download_Pages" element={<PYQS_Download_Pages />} />
      <Route path="/Vol_student" element={<Vol_student />} />
      <Route path="/Admit_Control" element={<Admit_Control />} />
      <Route path="/Membership_Signup" element={<Membership_Signup />} />
      <Route path="/Membership_profile" element={<Membership_profile />} />
      <Route path="/Membership_Refer" element={<Membership_Refer />} /> 
      <Route path="/Membership_Dashboard" element={<Membership_Dashboard />} />
      <Route path="/Membership_Login" element={<Membership_Login />} />
      <Route path="/Membership_Id" element={<Membership_Id />} />
      <Route path="/Membership_Editprofile" element={<Membership_Editprofile />} />
    <Route path="/Cor_Task" element={<Cor_Task />} />
    <Route path="/Vol_Task" element={<Vol_Task />} />
    
    </Routes>
  );
}