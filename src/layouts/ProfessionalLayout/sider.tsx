import React, { forwardRef } from "react";
import {
  Drawer,
  Box,
  Typography,
  Stack,
  Avatar,
  Tooltip,
} from "@mui/material";
import { HandshakeOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useLogout, useGetIdentity } from "@refinedev/core";
import { navbarLinks } from "../../constants/professionals/index";

// const variants = [
//   {
//     title: "Color 1 – Vibrant (High Energy)",
//     accent: "#d946ef",
//     bg: "#fdf2fb",
//   },
//   {
//     title: "Color 2 – Trust (Balanced SaaS)",
//     accent: "#6366f1",
//     bg: "#eef2ff",
//   },
//   {
//     title: "Color 3 – Premium (Your current)",
//     accent: "#7f42e7",
//     bg: "#f5f0fd",
//   },
// ];

const SideBar = forwardRef(
  ({ collapsed, width, collapsedWidth }: any, ref: any) => {
    const { mutate: logout } = useLogout();

    // ✅ GET USER (from Google / auth provider)
    const { data: user } = useGetIdentity<any>();

    return (
      <Drawer
        ref={ref}
        variant="permanent"
        sx={{
          width: collapsed ? collapsedWidth : width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : width,
            transition: "width 0.3s ease",
            overflowX: "hidden",
            borderRight: "1px solid #eee",
            backgroundColor: "#eef2ff",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* LOGO */}
        <Box sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <HandshakeOutlined sx={{ fontSize: 27 }} />

            {!collapsed && (
              <Typography fontWeight={700} fontSize="1.6rem">
                inTURN
              </Typography>
            )}
          </Stack>
        </Box>

        {/* NAV */}
        <Box sx={{ px: 1, flex: 1, overflowY: "auto" }}>
          {navbarLinks.map((group: any) => (
            <Box key={group.title} sx={{ mb: 2 }}>
              {!collapsed && (
                <Typography
                  fontSize={12}
                  color="text.secondary"
                  sx={{ px: 2, mb: 1 }}
                >
                  {group.title}
                </Typography>
              )}

              <Stack spacing={0.5}>
                {group.links.map((link: any) => {
                  const isLogout = link.label === "Logout";

                  if (isLogout) {
                    return (
                      <Tooltip
                        key={link.label}
                        title={collapsed ? link.label : ""}
                        placement="right"
                      >
                        <Box
                          onClick={() => logout()}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: collapsed
                              ? "center"
                              : "flex-start",
                            gap: 2,
                            height: 44,
                            px: collapsed ? 0 : 2,
                            borderRadius: 2,
                            cursor: "pointer",
                            color: "#ef4444",
                            "&:hover": {
                              backgroundColor: "#fee2e2",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              minWidth: 24,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <link.icon size={24} />
                          </Box>

                          {!collapsed && (
                            <Typography fontSize={14}>
                              {link.label}
                            </Typography>
                          )}
                        </Box>
                      </Tooltip>
                    );
                  }

                  return (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      style={{ textDecoration: "none" }}
                    >
                      {({ isActive }) => (
                        <Tooltip
                          title={collapsed ? link.label : ""}
                          placement="right"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: collapsed
                                ? "center"
                                : "flex-start",
                              gap: 2,
                              height: 44,
                              px: collapsed ? 0 : 2,
                              borderRadius: 2,

                              background: isActive
                                ? "#6366f1"
                                : "transparent",
                              color: isActive ? "#fff" : "#555",

                              "&:hover": {
                                backgroundColor: isActive
                                  ? undefined
                                  : "#f3f4f6",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: 24,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <link.icon size={24} />
                            </Box>

                            {!collapsed && (
                              <Typography fontSize={14}>
                                {link.label}
                              </Typography>
                            )}
                          </Box>
                        </Tooltip>
                      )}
                    </NavLink>
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Box>

        {/* PROFILE */}
        <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent={collapsed ? "center" : "flex-start"}
          >
            <Avatar
              src={user?.avatar} // ✅ Google image
              alt={user?.name}
            >
              {!user?.avatar && user?.name?.charAt(0)}
            </Avatar>

            {!collapsed && (
              <Box>
                <Typography fontSize={14} fontWeight={500}>
                  {user?.name || "User"}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  Professional
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Drawer>
    );
  }
);

SideBar.displayName = "SideBar";

export default SideBar;