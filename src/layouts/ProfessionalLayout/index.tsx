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