import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import Sider from "./sider";
import ScrollToTop from "../../components/common/scrolltop";
import { ThemeProvider, useThemeMode } from "../../components/common/themecontext";

const DRAWER_WIDTH    = 220;
const COLLAPSED_WIDTH = 72;
const HEADER_HEIGHT   = 64;

const P      = "#7F42E7";
const P_LITE = "#F0EAFD";
const INK    = "#0D0D12";
const INK2   = "#4A4A5A";

/* ── Known mentee routes ─────────────────────────────────────
   Add any new route path segments here to keep 404 accurate.  */
const KNOWN_ROUTES = new Set([
  "/mentee",
  "/mentee/ai-home",
  "/mentee/ai-practice",
  "/ai-interview/:id",
  "/mentee/cv-analyzer",
  "/mentee/interviews",
  "/mentee/applications",
  "/mentee/settings",
  "/mentee/professionals",
  "/mentee/professional-details/:id",
  "mentee/request-an-interview",
  "/mentee/feedback",
  "/mentee/join-session",
  "/mentee/pay",
  "/mentee/refund",
  "/mentee/payment-declined",
  "/mentee/payment-successful",
]);


/** Returns true when the current pathname matches no known route */
const useIs404 = () => {
  const { pathname } = useLocation();
  return !Array.from(KNOWN_ROUTES).some(
    r => pathname === r || pathname.startsWith(r + "/")
  );
};

/* ── 404 Page ────────────────────────────────────────────── */
const NotFoundPage = () => {
  const navigate    = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        bgcolor: "#FAFAFA",
      }}
    >
      {/* Big 404 */}
      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontSize: { xs: "5rem", md: "8rem" },
          fontWeight: 800,
          color: P_LITE,
          lineHeight: 1,
          mb: 0,
          letterSpacing: "-0.04em",
          userSelect: "none",
        }}
      >
        404
      </Typography>

      {/* Icon */}
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          bgcolor: P_LITE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          mt: -2,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </Box>

      <Typography
        sx={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: "1.6rem" },
          color: INK,
          mb: 1,
        }}
      >
        Page not found
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          color: INK2,
          mb: 1,
          maxWidth: 420,
          lineHeight: 1.7,
        }}
      >
        The page{" "}
        <Box
          component="code"
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            bgcolor: P_LITE,
            color: P,
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
          }}
        >
          {pathname}
        </Box>{" "}
        doesn't exist or may have been moved.
      </Typography>

      <Typography sx={{ fontSize: 13, color: INK2, mb: 4, maxWidth: 380, lineHeight: 1.7 }}>
        If you typed the URL manually, check for typos. Otherwise use the
        buttons below to get back on track — no backend connection needed.
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/mentee")}
          sx={{
            bgcolor: P,
            borderRadius: "100px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: "0 4px 16px rgba(127,66,231,.25)",
            "&:hover": { bgcolor: "#6a35c9" },
          }}
        >
          Go to dashboard
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            borderColor: "#ddd",
            color: INK2,
            borderRadius: "100px",
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            "&:hover": { borderColor: P, color: P, bgcolor: P_LITE },
          }}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
};

/* ── Inner layout (needs theme context to be available) ── */
const LayoutInner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { dark } = useThemeMode();
  const is404 = useIs404();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: dark ? "#0D0D12" : "#FFFFFF",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* SIDEBAR — always shown so user can navigate away from 404 */}
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* CONTENT AREA */}
      <Box
        sx={{
          flex: 1,
          ml: {
            xs: 0,
            md: collapsed ? `${COLLAPSED_WIDTH}px` : `${DRAWER_WIDTH}px`,
          },
          mt: {
            xs: `${HEADER_HEIGHT}px`,
            md: 0,
          },
          transition: "all 0.3s ease",
          minHeight: "100vh",
          bgcolor: dark ? "#0D0D12" : "#FFFFFF",
        }}
      >
        <Box sx={{ maxWidth: "1400px", minHeight: "100vh" }}>
          <ScrollToTop />
          {is404 ? <NotFoundPage /> : <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};

/* ── Outer layout wraps with provider ── */
const MenteeLayout = () => (
  <ThemeProvider>
    <LayoutInner />
  </ThemeProvider>
);

export default MenteeLayout;
