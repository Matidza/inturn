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
    if (!profile) {
      return { success: false, error: { name: "LoginError", message: "Invalid credential" } };
    }
    

    try {
      const response = await fetch(`http://localhost:1000/api/v1/auth/create-user`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          avatar: profile.picture,
          // avatar: profile.avatar,
          role
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: { name: "LoginError", message: data?.message || "Could not create user" },
        };
      }

      const finalRole = role || "mentee";
      const user = {
        ...profile,
        role: finalRole,
        avatar: profile.picture,
        name: profile.name,
        userId: data.newUser?._id ?? data._id,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", credential);

      return {
        success: true,
        redirectTo:
          finalRole === "admin" ? "/admin" : finalRole === "professional" ? "/pro" : "/mentee",
      };
    } catch (err: any) {
      return { success: false, error: { name: "LoginError", message: err.message } };
    }
  },
    checkAuth: async () => {
    const token = localStorage.getItem("token");
    return token
    ? { authenticated: true }
    : {
      authenticated: false,
      redirectTo: "/login",
      logout: true,
    };
  },
    checkError: () => Promise.resolve(),


  getPermissions: () => Promise.resolve(),
 useGetIdentity: async () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    console.log(user)
  },

  logout: () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common = {};

    if (token && typeof window !== "undefined" && window.google?.accounts?.id?.revoke) {
      window.google.accounts.id.revoke(token, () => {
        // fire-and-forget cleanup callback from Google's SDK — don't rely on
        // this for Refine's flow, it doesn't await or block on it
      });
    }

    return Promise.resolve({ success: true, redirectTo: "/login" });
  },


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
                  {/* <Route 
                    element={
                      <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                        <Outlet />
                      </Authenticated>
                    }
                  >
                    <Route path="/*" element={<AppRoutes />} />
                  </Route> */}
                  <Route 
                    element={
                      <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
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