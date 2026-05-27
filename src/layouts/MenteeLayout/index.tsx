// // Sider to Header 1
// import { Outlet } from "react-router-dom";
// import { Box } from "@mui/material";
// import { useState } from "react";
// import Sider from "./sider";
// import ScrollToTop from "../../components/common/scrolltop";

// const DRAWER_WIDTH = 220;
// const COLLAPSED_WIDTH = 72;
// const HEADER_HEIGHT = 64;

// const MenteeLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
  
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#FFFFFF" }}>
      
//       {/* SAME SIDER */}
//       <Sider collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* CONTENT */}
//       <Box
//         sx={{
//           flex: 1,

//           // 👇 Desktop: leave space for sidebar
//           ml: {
//             xs: 0,
//             md: collapsed
//               ? `${COLLAPSED_WIDTH}px`
//               : `${DRAWER_WIDTH}px`,
//           },

//           // 👇 Mobile: leave space for header
//           mt: {
//             xs: `${HEADER_HEIGHT}px`,
//             md: 0,
//           },

//           transition: "all 0.3s ease",
//         }}
//       >
//         <Box
//           sx={{
//             maxWidth: "1400px",
//             minHeight: "100vh",
//             // px: { xs: 2, md: 3 },
//           }}
//         >
//           <ScrollToTop />
//           <Outlet />
//         </Box> 
//       </Box> 
//   </Box>
//   );
// };

// export default MenteeLayout;












import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import Sider from "./sider";
import ScrollToTop from "../../components/common/scrolltop";
import { ThemeProvider, useThemeMode } from "../../components/common/themecontext";

const DRAWER_WIDTH    = 220;
const COLLAPSED_WIDTH = 72;
const HEADER_HEIGHT   = 64;

/* ── Inner layout (needs theme context to be available) ── */
const LayoutInner = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { dark } = useThemeMode();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: dark ? "#0D0D12" : "#FFFFFF",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* SIDEBAR */}
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
          <Outlet />
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
