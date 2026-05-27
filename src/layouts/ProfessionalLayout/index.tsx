// import React, { useEffect, useRef, useState } from 'react';
// import { Outlet } from 'react-router-dom';

// import SideBar from "../layouts/SideBar";
// import Header from "../layouts/Header";
// import { useClickOutside } from '../hooks/use-click-outside';
// import { cn } from '../utils/cn';

// import { useMediaQuery } from '@uidotdev/usehooks';





// const Layout = () => {
//   const isDesktopDevice = useMediaQuery('(min-width: 768px)');
//   const [collapsed, setCollapsed] = useState(!isDesktopDevice);

//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     setCollapsed(!isDesktopDevice);
//   }, [isDesktopDevice]
//   );

//   useClickOutside([sidebarRef], () => {
//       if (!isDesktopDevice && !collapsed) {
//           setCollapsed(true);
//       }
//   });

//   return (
    
//     <div className='min-h-screen bg-white transition-colors dark:bg-slate-900'>
//         <div 
//           className={cn(
//               "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
//               !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
//           )}
//         />
//         <SideBar 
//           ref={sidebarRef}
//           collapsed={collapsed}
//         />

//         <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
//           <Header 
//             collapsed={collapsed}
//             setCollapsed={setCollapsed}
//           />
//           <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
//               <Outlet />
//           </div>
//         </div>
//     </div>
//   );
// };

// export default Layout;


// import { Outlet } from "react-router-dom";
// import Sidebar from "../ProfessionalLayout/sider";
// import Header from "../ProfessionalLayout/header";

// const ProfessionalLayout = () => {
//   return (
//     <div className="flex h-screen bg-gray-50">
      
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main */}
//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalLayout;




// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { Box, CssBaseline } from "@mui/material";

// import SideBar from "./sider";
// import Header from "./header";

// const drawerWidth = 240;
// const collapsedWidth = 70;

// const ProfessionalLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   // Auto collapse on first load (optional)
//   useEffect(() => {
//     if (window.innerWidth < 900) {
//       setCollapsed(true);
//     }
//   }, []);

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F7F7FB" }}>
//       <CssBaseline />

//       {/* SIDEBAR */}
//       <SideBar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         width={drawerWidth}
//         collapsedWidth={collapsedWidth}
//       />

//       {/* MAIN CONTENT */}
//      <Box
//   sx={{
//     flexGrow: 1,
//     ml: `${collapsed ? collapsedWidth : drawerWidth}px`,
//     transition: "margin 0.3s ease",
//     display: "flex",
//     flexDirection: "column",
//     width: "100%",
//   }}
// >
//   {/* HEADER */}
//   <Header
//     collapsed={collapsed}
//     setCollapsed={setCollapsed}
//   />

//   {/* PAGE CONTENT */}
//   <Box
//     sx={{
//       flex: 1,
//       overflowY: "auto",
//       p: 3,
//       mt: "64px", // ✅ THIS FIXES EVERYTHING
//     }}
//   >
//     <Outlet />
//   </Box>
// </Box> 
//     </Box>
//   );
// };

// export default ProfessionalLayout;



import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";

import SideBar from "./sider";
import Header from "./header";

const drawerWidth = 240;
const collapsedWidth = 70;

const ProfessionalLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? collapsedWidth : drawerWidth;

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#F7F7FB" }}>
      <CssBaseline />

      {/* SIDEBAR */}
      <SideBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        width={drawerWidth}
        collapsedWidth={collapsedWidth}
      />

      {/* MAIN AREA */}
      <Box
        sx={{
          flexGrow: 1,
          ml: `${sidebarWidth}px`,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* HEADER */}
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* THIS replaces mt:64px */}
        <Toolbar />

        {/* CONTENT (ONLY SCROLL AREA) */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessionalLayout;