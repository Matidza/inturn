import {
  Authenticated,
  Refine,
} from "@refinedev/core";

import {
  DevtoolsProvider,
} from "@refinedev/devtools";

import {
  RefineKbar,
  RefineKbarProvider,
} from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import routerProvider, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";

import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Public Routs
import { 
  Applications, 
  Features, 
  Login, 
  Home,
  CookieSettings,
  PrivacyPolicy,
  TermsOfService,
  Signup
} from "./pages";


import { 
  AboutUs,
  Blog,
  CompanyPortal,
  ContactUs,
  HowItWorks,
  Pricing,
  ProfessionalPortal,
  StudentPortal,
  Support
} from "./pages/footer";

import { 
  CompanyDashboard,
  FindAnswers,
  InterviewCVTip,
  ProfessionalDashboard,
  ReadMore,
  StudentDashboard
} from "./pages/more";
// import { Professionals, ProfessionalCardDetails } from "./pages/mentee";
import Professionals from "./pages/professionals";
import ProfessionalCardDetails from "./pages/professionalDetails";


import HMM4750 from "./pages/4750";
import AppRoutes from "./routes/AppRoutes";
import { parseJwt } from "./utils/parse-jwt";
import { dataProvider } from "./providers/data";
import PublicLayout from "./layouts/PublicLayout";
import { ColorModeContextProvider } from "./contexts/color-mode";




/* Axios */
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

/* Auth */
const authProvider = {
  login: async ({ credential, role }: any) => {
  const profile = credential ? parseJwt(credential) : null;

  if (profile) {
    // ✅ USE ROLE FROM UI (fallback to mentee)
    const finalRole = role || "mentee";

    const user = {
      ...profile,
      role: finalRole,
      avatar: profile.picture,
      name: profile.name,
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", credential);

    return {
      success: true,
      redirectTo:
        finalRole === "admin"
          ? "/admin"
          : finalRole === "professional"
          ? "/pro"
          : "/mentee",
    };
  }

  return { success: false, redirectTo: "/" };
},

  logout: async () => {
    localStorage.clear();
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = localStorage.getItem("token");

    return token
      ? { authenticated: true }
      : {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
  },

  getIdentity: async () => {
    return JSON.parse(localStorage.getItem("user") || "null");
  },

  onError: async (error: any) => ({ error }),
};

/* App */
function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* <ColorModeContextProvider> */}
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />

          <RefineSnackbarProvider>
            {/* <DevtoolsProvider> */}
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  
                  {/* Protected */}
                  <Route 
                    element={
                      <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <Outlet />
                      </Authenticated>
                    }
                  >
                    <Route path="/*" element={<AppRoutes />} />
                  </Route>

                  {/* Public */}
                  <Route element={<PublicLayout />}>
                    
                    {/* Header Links */}
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/features" element={<Features />}/>
                    <Route path="/applications" element={<Applications />}/>
                    <Route path="/professionals" element={<Professionals />}/>
                    <Route path="/professional-details/:id" element={<ProfessionalCardDetails />}/>


                    <Route path="/company-dashboard" element={<CompanyDashboard />}/>
                    <Route path="/find-answers" element={<FindAnswers />}/>
                    <Route path="/tips" element={<InterviewCVTip />}/>
                    <Route path="/professional-dashboard" element={<ProfessionalDashboard />}/>
                    <Route path="/read-more" element={<ReadMore />}/>
                    <Route path="/student-dashboard" element={<StudentDashboard />}/>

                    {/* Footer Links */}
                    <Route path="/student-portal" element={<StudentPortal />}/>
                    <Route path="/professional-portal" element={<ProfessionalPortal />}/>
                    <Route path="/company-portal" element={<CompanyPortal />}/>
                    <Route path="/how-it-works" element={<HowItWorks />}/>
                    <Route path="/pricing" element={<Pricing />}/>
                    <Route path="/blog" element={<Blog />}/>
                    <Route path="/support" element={<Support />}/>
                    <Route path="/about-us" element={<AboutUs />}/>
                    <Route path="/contact-us" element={<ContactUs />}/>
                    

                    <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
                    <Route path="/terms-of-service" element={<TermsOfService />}/>
                    <Route path="/250904/0324/4750" element={<HMM4750 />}/>
                    <Route path="/cookie-settings" element={<CookieSettings />}/>
                  </Route>
                 
                  {/* Fallback */}
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            {/* </DevtoolsProvider> */}
          </RefineSnackbarProvider>
        {/* </ColorModeContextProvider> */}
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;