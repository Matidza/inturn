import React, { forwardRef, useState } from "react";
import {
  Box, Typography, List, ListItemButton, ListItemIcon,
  ListItemText, IconButton, Avatar, Divider, Stack,
  Drawer, useMediaQuery, useTheme, Menu, MenuItem, Fade,
  Tooltip,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { HandshakeOutlined } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useLogout } from "@refinedev/core";
import { navbarLinks } from "../../constants/mentee/siderlinks";
import { useThemeMode } from "../../components/common/themecontext";

/* ── icons for the toggle ── */
import { Sun, Moon } from "lucide-react";

/* ── PROPS ───────────────────────────────────────────────── */
interface SideBarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const DRAWER_WIDTH    = 195;
const COLLAPSED_WIDTH = 60;

/* ── TOKEN HELPERS ───────────────────────────────────────── */
const tokens = (dark: boolean) => ({
  bg:         dark ? "#161820" : "#F0EAFD",
  bgHover:    dark ? "#1E2028" : "#E8E0FA",
  border:     dark ? "rgba(255,255,255,0.07)" : "#E5E3F0",
  text:       dark ? "#F0F0F5" : "#05050B",
  textSub:    dark ? "rgba(240,240,245,0.5)" : "#52526A",
  activeBg:   dark ? "rgba(127,66,231,0.18)" : "#F1ECFF",
  activeText: "#7F42E7",
  activeBar:  "#7F42E7",
  logoutText: dark ? "#FF6B6B" : "#d32f2f",
  logoutHover:dark ? "rgba(255,107,107,0.12)" : "#ffe5e5",
  iconColor:  dark ? "rgba(240,240,245,0.6)" : "#52526A",
  divider:    dark ? "rgba(255,255,255,0.07)" : "#E5E3F0",
  toggleBg:   dark ? "#262830" : "#E8E3F5",
  toggleFg:   dark ? "#B893F6" : "#7F42E7",
  shadow:     dark ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
  avatarBorder: dark ? "rgba(127,66,231,0.4)" : "#E8E3F5",
});

const css = `
  @keyframes siderFadeSlide {
    from { opacity:0; transform:translateX(24px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes toggleSpin {
    from { transform:rotate(-40deg) scale(.7); opacity:0; }
    to   { transform:rotate(0)      scale(1);  opacity:1; }
  }
  .toggle-icon { animation:toggleSpin .3s cubic-bezier(.34,1.56,.64,1) both; }
  .nav-item-text { transition:opacity .2s ease, transform .2s ease; }
  .sider-collapse-enter { animation:siderFadeSlide .3s cubic-bezier(.22,1,.36,1) both; }
`;

/* ── DARK MODE TOGGLE BUTTON ─────────────────────────────── */
const DarkToggle = ({ dark, toggle, collapsed }: { dark:boolean; toggle:()=>void; collapsed:boolean }) => {
  const t = tokens(dark);
  return (
    <Tooltip title={dark ? "Switch to light mode" : "Switch to dark mode"} placement="right" arrow>
      <Box
        onClick={toggle}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: collapsed ? 0 : 1.5,
          justifyContent: collapsed ? "center" : "flex-start",
          px: collapsed ? 1.5 : 2,
          py: 1.25,
          mx: 1,
          mb: 0.5,
          borderRadius: 2,
          cursor: "pointer",
          background: t.toggleBg,
          transition: "all 0.2s ease",
          "&:hover": {
            background: dark ? "#2E2E3A" : "#DDD6F8",
            transform: "translateX(2px)",
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 32, height: 32, borderRadius: "9px",
            background: dark ? "rgba(127,66,231,0.2)" : "rgba(127,66,231,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: t.toggleFg, flexShrink: 0,
            transition: "background 0.2s",
          }}
        >
          <Box className="toggle-icon" key={String(dark)}>
            {dark ? <Sun size={16}/> : <Moon size={16}/>}
          </Box>
        </Box>

        {/* Label — hidden when collapsed */}
        {!collapsed && (
          <Typography
            sx={{
              fontSize: 13.5, fontWeight: 500,
              color: t.text, fontFamily: "'DM Sans',sans-serif",
              transition: "opacity .2s",
            }}
          >
            {dark ? "Light mode" : "Dark mode"}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

/* ── NAV ITEM ────────────────────────────────────────────── */
const NavItem = ({
  item, collapsed, dark, onClick,
}: {
  item: (typeof navbarLinks)[0];
  collapsed: boolean;
  dark: boolean;
  onClick?: () => void;
}) => {
  const t = tokens(dark);
  return (
    <NavLink to={item.path} style={{ textDecoration:"none" }} onClick={onClick}>
      {({ isActive }) => (
        <Tooltip title={collapsed ? item.label : ""} placement="right" arrow>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mb: 0.5,
              px: collapsed ? 1 : 2,
              py: 1,
              justifyContent: collapsed ? "center" : "flex-start",
              position: "relative",
              background: isActive ? t.activeBg : "transparent",
              color: isActive ? t.activeText : t.text,
              transition: "all 0.18s ease",
              "&:hover": {
                background: isActive ? t.activeBg : t.bgHover,
                transform: "translateX(2px)",
              },
              "&::before": isActive
                ? {
                    content: '""',
                    position: "absolute",
                    left: 0, top: "20%",
                    height: "60%", width: 4,
                    borderRadius: "0 4px 4px 0",
                    backgroundColor: t.activeBar,
                  }
                : {},
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 1.75,
                justifyContent: "center",
                color: isActive ? t.activeText : t.iconColor,
                transition: "color 0.18s",
              }}
            >
              <item.icon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 13.5, fontWeight: isActive ? 600 : 400,
                  fontFamily: "'DM Sans',sans-serif",
                  sx: { transition: "opacity .2s" },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      )}
    </NavLink>
  );
};

/* ── MAIN COMPONENT ──────────────────────────────────────── */
const Sider = forwardRef<HTMLDivElement, SideBarProps>(
  ({ collapsed, setCollapsed }, ref) => {
    const { mutate: logout }      = useLogout();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log(user)

    const { dark, toggle }        = useThemeMode();
    const theme                   = useTheme();
    const isMobile                = useMediaQuery(theme.breakpoints.down("md"));

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl,   setAnchorEl]   = useState<null | HTMLElement>(null);

    const t = tokens(dark);

    const toggleMobile  = () => setMobileOpen(p => !p);
    const openUserMenu  = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const closeUserMenu = () => setAnchorEl(null);

    /* ─────────── MOBILE ─────────── */
    if (isMobile) {
      return (
        <>
          <style>{css}</style>

          {/* MOBILE HEADER BAR */}
          <Box
            sx={{
              position: "fixed", top: 0, left: 0,
              width: "100%", height: 64,
              bgcolor: t.bg,
              borderBottom: `1px solid ${t.border}`,
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              px: 2, zIndex: 1200,
              transition: "background 0.3s",
              boxShadow: t.shadow,
            }}
          >
            {/* Logo */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ width:32, height:32, borderRadius:"9px", background:"#", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:27, color:"#7F42E7" }}/>
              </Box>
              <Typography
                component={Link} to="/mentee"
                sx={{ fontWeight:800, fontSize:"1.2rem", color:t.text, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'DM Sans',sans-serif" }}
              >
                inTurn
              </Typography>
            </Stack>

            {/* Right controls */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              {/* Dark mode toggle (icon only on mobile) */}
              <IconButton
                onClick={toggle}
                size="small"
                sx={{ color: t.toggleFg, background: t.toggleBg, borderRadius:"9px", p:1, "&:hover":{ background: dark?"#2E2E3A":"#DDD6F8" } }}
              >
                <Box className="toggle-icon" key={String(dark)}>
                  {dark ? <Sun size={16}/> : <Moon size={16}/>}
                </Box>
              </IconButton>

              {/* User avatar */}
              <IconButton onClick={openUserMenu} size="small">
                <Avatar
                  src={user?.avatar}
                  sx={{ width:32, height:32, border:`2px solid ${t.avatarBorder}` }}
                />
              </IconButton>

              {/* Hamburger */}
              <IconButton onClick={toggleMobile} sx={{ color: t.text }}>
                <MenuIcon/>
              </IconButton>
            </Stack>
          </Box>

          {/* USER DROPDOWN */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeUserMenu}
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                background: dark ? "#161820" : "#fff",
                border: `1px solid ${t.border}`,
                boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.1)",
                borderRadius: 2,
              },
            }}
          >
            <MenuItem disabled sx={{ color: t.textSub, fontSize:13 }}>{user?.name || "User"}</MenuItem>
            <MenuItem
              onClick={() => { closeUserMenu(); logout(); }}
              sx={{ color: t.logoutText, fontSize:13.5 }}
            >
              Logout
            </MenuItem>
          </Menu>

          {/* MOBILE DRAWER */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={toggleMobile}
            ModalProps={{
              BackdropProps: {
                sx: { backdropFilter:"blur(6px)", backgroundColor:"rgba(0,0,0,0.28)" },
              },
            }}
            PaperProps={{
              sx: {
                width: 260,
                background: t.bg,
                borderLeft: `1px solid ${t.border}`,
                p: 2,
                animation: "siderFadeSlide 0.3s ease",
              },
            }}
          >
            {/* Drawer header */}
            <Stack direction="row" spacing={1} alignItems="center" mb={2} px={1}>
              <Box sx={{ width:30, height:30, borderRadius:"8px", background:"#7F42E7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:16, color:"#fff" }}/>
              </Box>
              <Typography sx={{ fontWeight:800, fontSize:"1.1rem", color:t.text, fontFamily:"'DM Sans',sans-serif" }}>inTurn</Typography>
            </Stack>

            <Divider sx={{ borderColor: t.divider, mb:1 }}/>

            {/* Nav */}
            <List sx={{ flex:1, p:0 }}>
              {navbarLinks.map(item => (
                <NavItem key={item.label} item={item} collapsed={false} dark={dark} onClick={toggleMobile}/>
              ))}
            </List>

            <Divider sx={{ borderColor: t.divider, my:1 }}/>

            {/* Dark mode toggle */}
            <DarkToggle dark={dark} toggle={toggle} collapsed={false}/>

            <Divider sx={{ borderColor: t.divider, my:1 }}/>

            {/* Logout */}
            <ListItemButton
              onClick={() => logout()}
              sx={{ borderRadius:2, color:t.logoutText, "&:hover":{ background:t.logoutHover } }}
            >
              <ListItemIcon sx={{ color:t.logoutText, minWidth:0, mr:1.75 }}>
                <LogoutOutlinedIcon sx={{ fontSize:20 }}/>
              </ListItemIcon>
              <ListItemText primary="Logout" primaryTypographyProps={{ fontSize:13.5, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}/>
            </ListItemButton>

            {/* User */}
            <Box sx={{ mt:1, px:1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar src={user?.picture} sx={{ width:34, height:34, border:`2px solid ${t.avatarBorder}` }}/>
                <Box>
                  <Typography sx={{ fontSize:13, fontWeight:600, color:t.text }}>{user?.name || "User"}</Typography>
                  <Typography sx={{ fontSize:11.5, color:t.textSub, textTransform:"capitalize" }}>{user?.role || "Mentee"}</Typography>
                </Box>
              </Stack>
            </Box>
          </Drawer>
        </>
      );
    }

    /* ─────────── DESKTOP ─────────── */
    return (
      <>
        <style>{css}</style>
        <Box
          ref={ref}
          sx={{
            position: "fixed", top:0, left:0,
            width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
            height: "100vh",
            bgcolor: t.bg,
            borderRight: `1px solid ${t.border}`,
            transition: "width 0.3s ease, background 0.3s ease",
            display: "flex", flexDirection: "column",
            zIndex: 1100,
            boxShadow: t.shadow,
            overflowX: "hidden",
          }}
        >
          {/* TOP: Logo + collapse toggle */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              minHeight: 64,
              borderBottom: `1px solid ${t.border}`,
            }}
          >
            {!collapsed && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width:30, height:30, borderRadius:"8px", background:"#7F42E7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <HandshakeOutlined sx={{ fontSize:16, color:"#fff" }}/>
                </Box>
                <Typography
                  component={Link} to="/mentee"
                  sx={{ fontWeight:800, fontSize:"1.2rem", color:t.text, textDecoration:"none", letterSpacing:"-0.01em", fontFamily:"'DM Sans',sans-serif", whiteSpace:"nowrap" }}
                >
                  inTurn
                </Typography>
              </Stack>
            )}
            <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right" arrow>
              <IconButton
                onClick={() => setCollapsed(!collapsed)}
                size="small"
                sx={{
                  color: t.iconColor,
                  background: t.toggleBg,
                  borderRadius: "9px",
                  p: 0.75,
                  "&:hover":{ background: dark?"#2E2E3A":"#DDD6F8", color:t.activeText },
                  transition: "all 0.2s",
                }}
              >
                <MenuIcon sx={{ fontSize:20 }}/>
              </IconButton>
            </Tooltip>
          </Box>

          {/* NAV LINKS */}
          <List sx={{ flex:1, px:1, py:1.5, overflowY:"auto", overflowX:"hidden" }}>
            {navbarLinks.map(item => (
              <NavItem key={item.label} item={item} collapsed={collapsed} dark={dark}/>
            ))}
          </List>

          {/* DARK MODE TOGGLE */}
          <Box sx={{ px:1, pb:0.5 }}>
            <DarkToggle dark={dark} toggle={toggle} collapsed={collapsed}/>
          </Box>

          <Divider sx={{ borderColor: t.divider, mx:1 }}/>

          {/* LOGOUT */}
          <Box sx={{ px:1, pt:0.5 }}>
            <Tooltip title={collapsed ? "Logout" : ""} placement="right" arrow>
              <ListItemButton
                onClick={() => logout()}
                sx={{
                  borderRadius: 2,
                  color: t.logoutText,
                  px: collapsed ? 1 : 2,
                  justifyContent: collapsed ? "center" : "flex-start",
                  "&:hover":{ background:t.logoutHover },
                  transition: "all 0.18s",
                }}
              >
                <ListItemIcon sx={{ color:t.logoutText, minWidth:0, mr:collapsed?0:1.75, justifyContent:"center" }}>
                  <LogoutOutlinedIcon sx={{ fontSize:20 }}/>
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ fontSize:13.5, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </Box>

          <Divider sx={{ borderColor: t.divider, mx:1, mb:1 }}/>

          {/* USER PROFILE */}
          <Box sx={{ px:2, pb:2 }}>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent={collapsed ? "center" : "flex-start"}
            >
              <Tooltip title={collapsed ? (user?.name || "User") : ""} placement="right" arrow>
                
                <Avatar
                  src={user?.avatar}
                  sx={{
                    width: 36, height: 36,
                    border: `2px solid ${t.avatarBorder}`,
                    flexShrink: 0, cursor: "default",
                    transition: "border-color 0.2s",
                  }}
                />
              </Tooltip>
              {!collapsed && (
                <Box sx={{ overflow:"hidden" }}>
                  <Typography sx={{ fontSize:13, fontWeight:600, color:t.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {user?.name || "User"}
                  </Typography>
                  <Typography sx={{ fontSize:11.5, color:t.textSub, textTransform:"capitalize" }}>
                    {user?.role || "Mentee"}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </>
    );
  }
);

Sider.displayName = "Sider";
export default Sider;




