import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Stack,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Add,
  Brightness4,
  Brightness7,
  Settings,
  Logout,
  Person,
} from "@mui/icons-material";

import { useLogout, useGetIdentity } from "@refinedev/core";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;

const Header = ({ collapsed, setCollapsed }: any) => {
  const { mutate: logout } = useLogout();
  const { data: user } = useGetIdentity<any>(); // ✅ get user from refine

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: `${collapsed ? collapsedWidth : drawerWidth}px`,
        width: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`,
        background: "#eef2ff",
        borderBottom: "1px solid #eee",
        color: "#000",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT */}
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </IconButton>

          <Box>
            <Typography fontWeight="bold">Dashboard</Typography>
            <Typography fontSize={12} color="text.secondary">
              Welcome back, {user?.name || "User"}
            </Typography>
          </Box>
        </Stack>

        {/* SEARCH */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 400,
            mx: 3,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            background: "#f3f4f6",
            px: 2,
            py: 0.5,
            borderRadius: 2,
          }}
        >
          <SearchIcon sx={{ color: "#888", mr: 1 }} />
          <InputBase placeholder="Search..." fullWidth />
        </Box>

        {/* RIGHT */}
        <Stack direction="row" spacing={1} alignItems="center">
          
          {/* NEW BUTTON */}
          <NavLink to="/professional/new-service">
            <Button
              startIcon={<Add />}
              sx={{
                display: { xs: "none", md: "flex" },
                background: "#6366f1",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                px: 2,
                "&:hover": {
                  opacity: 0.9,
                },
              }}
            >
              New
            </Button>
          </NavLink>

          {/* NOTIFICATIONS */}
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* PROFILE */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              src={user?.avatar} // ✅ Google profile image
              alt={user?.name}
            >
              {user?.name?.[0] || "U"} {/* fallback */}
            </Avatar>
          </IconButton>

          {/* DROPDOWN */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem component={NavLink} to="/professional/profile">
              <Person sx={{ mr: 1 }} /> Profile
            </MenuItem>

            <MenuItem component={NavLink} to="/professional/settings">
              <Settings sx={{ mr: 1 }} /> Settings
            </MenuItem>

            <MenuItem onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? (
                <Brightness7 sx={{ mr: 1 }} />
              ) : (
                <Brightness4 sx={{ mr: 1 }} />
              )}
              Theme
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => logout()}
              sx={{ color: "error.main" }}
            >
              <Logout sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;