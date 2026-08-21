import { Routes, Route, Navigate } from "react-router-dom";

// layouts
import AdminLayout from "../layouts/AdminLayout";
import ProfessionalLayout from "../layouts/ProfessionalLayout/index";
import MenteeLayout from "../layouts/MenteeLayout/index";

// mentee pages
import {
  AIPractice,
  Analyzer,
  Professionals,
  Home,
  Interviews,
  Applications,
  Settingss,
  ProfessionalCardDetails,
  Feedback,
  RequestSession,
  Refund,
  JoinSession,
  PaySession,
  PaymentDeclined,
  PaymentSuccess,
  AIInterviewHome,
  AIInterviewDetail
} from "../pages/mentee";



import {
  AIPracticeInfo,
  CVAnalyzerInfo,
  HowItWorks,
  Tip,
  ProfessionalPortal,
  Pricing,
  Blog,
  Support,
  AboutUs,
  ContactUs,
  
} from "../pages/mentee/footerpages";

// admin pages
import AdminDashboard from "../pages/admin/dashboard";
// import Users from "../pages/admin/Users";

// professional pages
// import Dashboard from "../pages/professionals/dashboard";
// import Bookings from "../pages/professionals/Bookings";
import {
    Analytics,
    NewService,
    CancelledInterviews,
    InterviewRequest,
    ScheduledInterviews,
    CompletedInterviews,
    TransactionHistory,
    Withdrawals,
    Settings,
    Dashboard,
    Bookings,
} from "../pages/professionals/index"

import {
  PrivacyPolicy,
  TermsOfService,
  CookieSettings,
} from "../pages";

const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user?.role) {
    return <Navigate to="/login" replace />;
  }

  /* =========================
     ADMIN
  ========================= */
  if (user.role === "admin") {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  /* =========================
     PROFESSIONAL
  ========================= */
  if (user.role === "professional") {
    return (
      <Routes>
        <Route path="/pro" element={<ProfessionalLayout />}>
          {/* --- Dashboard --- */}
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />


          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<h1 className="title">Reports</h1>} />

          {/* --- Mentees / Session Management --- */}
          <Route path="interview-requests" element={<InterviewRequest />} />
          <Route path="scheduled-interviews" element={<ScheduledInterviews  />} />
          <Route path="completed-interviews" element={<CompletedInterviews />} />
          <Route path="cancelled-interview" element={<CancelledInterviews />} />
          
          {/* --- Payments & Finance --- */}
          <Route path="transaction-history" element={<TransactionHistory />} />
          <Route path="withdraw-funds" element={<Withdrawals />} />

          {/* --- Services --- */}  
          <Route path="new-service" element={<NewService />} />

          {/* --- Settings --- */}
          <Route path="settings" element={<Settings />} />
          {/* --- User Profile --- */}
          {/* <Route path="profile" element={<h1 className="title">My Profile</h1>} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/pro" replace />} />
      </Routes>
    );
  }

  /* =========================
     MENTEE (FIXED)
  ========================= */
  return (
    <Routes>
      <Route path="/mentee" element={<MenteeLayout />}>
        
        {/* 🔥 THIS is now the dashboard homepage */}
        <Route index element={<Home />} />

        {/* Side Bar Links */}
        <Route path="professionals" element={<Professionals />} />
        <Route path="ai-practice" element={<AIPractice />} />
        <Route path="ai-home" element={<AIInterviewHome />} />
        <Route path="cv-analyzer" element={<Analyzer />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="applications" element={<Applications />} />
        <Route path="settings" element={<Settingss />} />

        {/* NON-SIDEBAR pages */}
        <Route path="ai-interview/:id" element={<AIInterviewDetail />} />
        <Route path="professional-details/:id" element={<ProfessionalCardDetails />}/>
        <Route path="feedback" element={<Feedback />} />
        <Route path="request-an-interview" element={<RequestSession />} />
        <Route path="join-session" element={<JoinSession />} />
        <Route path="refund" element={<Refund />} />
        <Route path="pay" element={<PaySession />} />
        <Route path="payment-declined" element={<PaymentDeclined />} />
        <Route path="payment-successful" element={<PaymentSuccess />} />

      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/mentee" replace />} />
    </Routes>
  );
};

export default AppRoutes;