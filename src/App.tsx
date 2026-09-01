import axios from "axios";
import { useEffect } from "react";
import HMM4750 from "./pages/4750";
import { parseJwt } from "./utils/parse-jwt";

import { dataProvider } from "./providers/data";
import PublicLayout from "./layouts/PublicLayout";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import { RefineKbar,RefineKbarProvider } from "@refinedev/kbar";
import { FindAnswers, InterviewCVTip, ReadMore } from "./pages/more";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Authenticated, Refine, type AuthProvider } from "@refinedev/core";

import { ErrorComponent, RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import { refreshAccessToken, scheduleTokenRefresh, clearScheduledRefresh, markTokenIssued,} from "./utils/tokenRefresh";
import routerProvider, { CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router";


// Public Routs
// import { Professionals, ProfessionalCardDetails } from "./pages/mentee";
import AppRoutes from "./routes/AppRoutes";
import Professionals from "./pages/professionals";
import ProfessionalCardDetails from "./pages/professionalDetails";
import { Applications, Features, Login, Home, CookieSettings, PrivacyPolicy, TermsOfService, Signup } from "./pages";
import { AboutUs, Blog, CompanyPortal, ContactUs, HowItWorks, Pricing, ProfessionalPortal, StudentPortal, Support } from "./pages/footer";





/* Axios */
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});



// Reactive safety net: catches a 401 (e.g. clock drift, a backgrounded
// tab whose timer didn't fire) and refreshes on demand. Shares the same
// deduped refreshAccessToken() as the proactive 14-min timer, so the two
// never race each other into firing separate refresh calls.
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh-token")
    ) {
      originalRequest._retry = true;

      const ok = await refreshAccessToken();

      if (ok) {
        return axiosInstance(originalRequest);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


/* Auth */
const authProvider: AuthProvider = {
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
          email_verified: profile.email_verified,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: { name: "LoginError", message: data?.message || "Could not create user" },
        };
      }

      // Trust the account's ACTUAL role from the backend — never the role
      // picked on the login screen. That's what fixes the redirect bug
      // even outside the mismatch case.
      const actualRole = data.user?.role ?? "mentee";
      const user = {
        ...profile,
        role: actualRole,
        avatar: profile.picture,
        name: profile.name,
        userId: data.user?._id,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", credential);
      markTokenIssued();

      const redirectTo = actualRole === "admin" ? "/admin" : actualRole === "professional" ? "/pro" : "/mentee";

      scheduleTokenRefresh(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      });

      return {
        success: true,
        redirectTo,
        ...(data.roleMismatch && {
          successNotification: {
            message: "You already have an account",
            description: data.message,
          },
        }),
      };
    } catch (err: any) {
      return { success: false, error: { name: "LoginError", message: err.message } };
    }
  },

  check: async () => {
    const token = localStorage.getItem("token");
    return token
      ? { authenticated: true }
      : { authenticated: false, redirectTo: "/login", logout: true };
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  logout: async () => {
    clearScheduledRefresh();
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenIssuedAt");
    axios.defaults.headers.common = {};

    if (token && typeof window !== "undefined" && window.google?.accounts?.id?.revoke) {
      window.google.accounts.id.revoke(token, () => {
        // fire-and-forget cleanup callback from Google's SDK — don't rely on
        // this for Refine's flow, it doesn't await or block on it
      });
    }
    return { success: true, redirectTo: "/login" };
  },
};

/* App */
function App() {
  // Re-arm the proactive refresh timer on a hard page reload, if a
  // session already exists — accounts for elapsed time since login so
  // it doesn't reset the 14-min countdown on every refresh.
  useEffect(() => {
    if (localStorage.getItem("token")) {
      scheduleTokenRefresh(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
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
              {/* Protected Routes */}
              <Route
                element={
                  <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route path="/*" element={<AppRoutes />} />
              </Route>

              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                {/* Header Links */}
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/features" element={<Features />}/>
                <Route path="/applications" element={<Applications />}/>
                <Route path="/professionals" element={<Professionals />}/>
                <Route path="/professional-details/:id" element={<ProfessionalCardDetails />}/>

                <Route path="/find-answers" element={<FindAnswers />}/>
                <Route path="/tips" element={<InterviewCVTip />}/>
                <Route path="/read-more" element={<ReadMore />}/>

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

              {/* Fallback Routes */}
              <Route path="*" element={<ErrorComponent />} />
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;