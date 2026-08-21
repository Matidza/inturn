import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  Avatar,
  Popover,
  Grid,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import HandshakeOutlined from "@mui/icons-material/HandshakeOutlined";

import { Link } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../assets";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const handleNavigate = () => {
    handleClose();
  };
  const menuItemStyle = {
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: 2,
  };
  const open = Boolean(anchorEl);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  const navLinks = [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Professionals", path: "/professionals" },
    { label: "Applications", path: "/applications" },
  ];

  return (
    <>
      {/* ================= APP BAR ================= */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#f5f0fdff",
          px: { xs: 2, md: 1 },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          {/* ================= LOGO ================= */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* <HandshakeOutlined sx={{ fontSize: 27, color: "#05050B" }} /> */}
            <Box sx={{ width:32, height:32, borderRadius:"9px", background:"#", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <HandshakeOutlined sx={{ fontSize:27, color:"#7F42E7" }}/>
              </Box>
            <Typography
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                fontSize: "1.7rem",
                color: "#05050B",
                textDecoration: "none",
              }}
            >
              inTURN
            </Typography>
          </Stack>

          {/* ================= DESKTOP NAV ================= */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {navLinks.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#05050B",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </Typography>
            ))}

            <Typography
              onClick={handleOpen}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center", color: "#05050B" }}
            >
              More <KeyboardArrowDown sx={{ fontSize: 18 }} />
            </Typography>

            {/* AUTH */}
            {user ? (
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
            ) : (
              <Stack direction="row" spacing={1}>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: "none",
                    border: 1,
                    borderRadius: 25,
                    color: "#05050B",
                    borderColor: "#05050B",
                  }}
                >
                  Join
                </Button>

                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#7f42e7ff",
                    borderRadius: 25,
                  }}
                >
                  Login
                </Button>
              </Stack>
            )}
          </Stack>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <IconButton
            onClick={toggleMobileMenu}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileMenu}
      >
        <Box sx={{ width: 260, p: 2 }}>
          
          <Typography fontWeight={700} mb={2}>
            Menu
          </Typography>

          <List>
            {navLinks.map((item) => (
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.path}
                onClick={toggleMobileMenu}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}

            <ListItemButton onClick={handleOpen}>
              <ListItemText primary="More" />
            </ListItemButton>
          </List>

          <Stack spacing={1} mt={2}>
            <Button
              fullWidth
              component={Link}
              to="/login"
              sx={{
                backgroundColor: "#7f42e7ff",
                color: "#fff",
                textTransform: "none",
                borderRadius: 2,
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              component={Link}
              to="/signup"
              sx={{
                border: 1,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Join
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* ================= MEGA MENU (UNCHANGED STRUCTURE) ================= */}
      {/* <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            width: "100%",
            mt: 2,
            p: 4,
            background: "#fff",
          },
        }}
      >
        <Box onClick={handleClose}>
          <Grid container spacing={4}>
            
            <Grid item xs={12} md={3}>
              <Typography fontWeight={600}>Student Tools</Typography>
              <Typography fontSize={13}>AI Practice & CV tools</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography fontWeight={600}>Company Tools</Typography>
              <Typography fontSize={13}>Hire talent faster</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography fontWeight={600}>Support</Typography>
              <Typography fontSize={13}>Help center</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  backgroundImage: `url(${signup})`,
                  height: 140,
                  borderRadius: 2,
                  backgroundSize: "cover",
                }}
              />
            </Grid>

          </Grid>
        </Box>
      </Popover> */}
       <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            width: "100%",
            mt: 2.4,
            p: 4,
            background: "#FFFFFF",
            height: 490,     
            ml: -0.3, 
            // boxShadow: 0
          },
        }}
      > 
        <Box onClick={handleClose}>
            <Grid container spacing={4} sx={{
            width: "100%",
            p: 4,
            background: "#FFFFFF",     
            ml: -1,
            
          }}>
            <Grid item xs={12} md={3}>
              <Typography fontWeight={500} mb={2} sx={{ color: "#a877fdff" }}>
                Student tools
              </Typography>
              <Stack spacing={4}>
                <Stack direction="row" gap={1} component={Link} to="/student-portal" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                    <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Student Portal</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Practice interviews with AI guidance</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/mentee" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Student Dashboard</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Track progress and analyze performance</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/professional-portal" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Professional Portal</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Connect with emerging talent</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/pro" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Professional Dashboard</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Manage interviews and provide feedback</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography fontWeight={500} mb={2} sx={{ color: "#a877fdff" }}>
                Companies's tools
              </Typography>
              <Stack spacing={4}>
                <Stack direction="row" gap={1} component={Link} to="/company-portal" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Company Portal</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Get the best talent from the get-go</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/company" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Company Dashboard</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>View analytics and manage users</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Home</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Return to main page</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/about-us" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>About</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Learn about our story and mission</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography fontWeight={500} mb={2} sx={{ color: "#a877fdff" }}>
                Contact
              </Typography>
              <Stack spacing={4}>
                <Stack direction="row" gap={1} component={Link} to="/support" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Get in touch with our team</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Support</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/find-answers" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Find answers and get help</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Featured</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/tips" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Interview Tips</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>Master the fundamentals</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" gap={1} component={Link} to="/read-more" onClick={handleNavigate} sx={menuItemStyle}>
                  <HandshakeOutlined sx={{ color: "#1b1b1bff", fontSize: 22 }} />
                  <Stack direction="column" >
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "600", color: "#1b1b1bff" }}>Read More</Typography>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>See all articles</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={3}>
              <Typography fontWeight={500} mb={2} sx={{ color: "#a877fdff" }}>
                Sign in
              </Typography>
              <Box 
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  p: 2,
                  color: "#f5f5f5",
                  backgroundImage: `url(${signup})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                  height: 170
                }}
              >
                
              </Box>
              <Typography fontSize="0.9rem" mt={1} fontWeight={600} sx={{ color: "#2a2a2aff" }}>Start</Typography>
              <Typography fontSize={15} mb={2} sx={{ fontSize: "0.85rem", fontWeight: "400", color: "#4a4a4aff" }}>
                Practice interviews and land your dream job
              </Typography>
              <Button component={Link} to="/login" 
                // variant=""
                sx={{
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: 600,
                  background: "#7f42e7ff",
                  color: "#FFFFFF",
                  justifyContent: "start",
                  mt: 3, border: 1
                }}
              >
                Get started
              </Button>
            </Grid>
          </Grid>
        </Box>
        

      </Popover>
    </>
  );
};

export default Header;












// import {
//   Box, Typography, Button, Stack, Avatar,
//   Popover, Grid, IconButton, Drawer,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import { HandshakeOutlined } from "@mui/icons-material";
// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   GraduationCap, Briefcase, Building2, LayoutDashboard,
//   Headphones, BookOpen, Lightbulb, FileText, Users,
//   BarChart2, Info, ArrowRight, Sparkles,
// } from "lucide-react";

// /* ── TOKENS ─────────────────────────────────────────── */
// const P      = "#7F42E7";
// const P_DARK = "#5E2EC5";
// const P_MID  = "#B893F6";
// const P_LITE = "#F0EAFD";
// const INK    = "#0D0D12";
// const INK2   = "#5C5C72";
// const BORDER = "#E8E3F5";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   @keyframes megaIn {
//     from { opacity:0; transform:translateY(-8px) scale(.99); }
//     to   { opacity:1; transform:translateY(0) scale(1); }
//   }
//   @keyframes liveDot {
//     0%,100% { opacity:.5; transform:scale(.85); }
//     50%      { opacity:1;  transform:scale(1.15); }
//   }

//   .mega-anim { animation:megaIn .2s cubic-bezier(.22,1,.36,1) both; }

//   .nav-pill {
//     font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
//     color:${INK2}; text-decoration:none; padding:6px 12px; border-radius:8px;
//     transition:all .15s; position:relative;
//   }
//   .nav-pill:hover { color:${INK}; background:rgba(0,0,0,.04); }
//   .nav-pill.active { color:${P}; background:${P_LITE}; }

//   .mega-row {
//     display:flex; align-items:flex-start; gap:10px;
//     padding:10px 12px; border-radius:10px; text-decoration:none;
//     transition:background .15s; cursor:pointer;
//   }
//   .mega-row:hover { background:${P_LITE}; }
//   .mega-row-icon {
//     width:34px; height:34px; border-radius:8px;
//     background:${BORDER}; display:flex; align-items:center;
//     justify-content:center; color:${INK2}; flex-shrink:0;
//     transition:all .15s;
//   }
//   .mega-row:hover .mega-row-icon { background:${P}; color:#fff; }

//   .live-dot {
//     width:7px; height:7px; border-radius:50%; background:#22C55E;
//     animation:liveDot 1.8s ease-in-out infinite; flex-shrink:0;
//   }

//   .hdr {
//     position:sticky; top:0; z-index:1200;
//     background:rgba(255,255,255,.94);
//     transition:box-shadow .25s, background .25s;
//     font-family:'DM Sans',sans-serif;
//   }
//   .hdr.scrolled {
//     background:rgba(255,255,255,.88);
//     backdrop-filter:blur(14px);
//     -webkit-backdrop-filter:blur(14px);
//     box-shadow:0 1px 0 ${BORDER};
//   }

//   .mob-item {
//     display:flex; align-items:center; gap:10px;
//     padding:10px 12px; border-radius:10px;
//     text-decoration:none; font-family:'DM Sans',sans-serif;
//     font-size:14px; font-weight:500; color:${INK};
//     transition:background .15s;
//   }
//   .mob-item:hover { background:${P_LITE}; color:${P}; }

//   .more-btn {
//     background:none; border:none; cursor:pointer; padding:6px 12px;
//     display:flex; align-items:center; gap:4px; border-radius:8px;
//     font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500;
//     color:${INK2}; transition:all .15s;
//   }
//   .more-btn:hover { background:rgba(0,0,0,.04); color:${INK}; }
//   .more-btn.open { color:${P}; background:${P_LITE}; }
// `;

// const NAV = [
//   { label:"Features",      to:"/features" },
//   { label:"Pricing",       to:"/pricing" },
//   { label:"Professionals", to:"/professionals" },
//   { label:"Blog",          to:"/blog" },
// ];

// const MEGA = [
//   {
//     col:"Student tools",
//     rows:[
//       { icon:<GraduationCap size={15}/>, label:"Student Portal",   desc:"Practice & get hired",           to:"/student-portal" },
//       { icon:<LayoutDashboard size={15}/>,label:"Dashboard",       desc:"Track progress",                 to:"/mentee" },
//       { icon:<Sparkles size={15}/>,      label:"AI Interviews",    desc:"Practice anytime, get scored",   to:"/ai-practice" },
//       { icon:<FileText size={15}/>,      label:"CV Optimizer",     desc:"Beat ATS filters",               to:"/cv-analysis" },
//     ],
//   },
//   {
//     col:"Professionals & Companies",
//     rows:[
//       { icon:<Briefcase size={15}/>,    label:"Pro Portal",         desc:"Mentor & earn income",          to:"/professional-portal" },
//       { icon:<BarChart2 size={15}/>,    label:"Pro Dashboard",      desc:"Manage sessions & payouts",     to:"/pro" },
//       { icon:<Building2 size={15}/>,    label:"Company Portal",     desc:"Hire interview-ready talent",   to:"/company-portal" },
//       { icon:<Users size={15}/>,        label:"Company Dashboard",  desc:"Analytics & tracking",          to:"/company" },
//     ],
//   },
//   {
//     col:"Resources",
//     rows:[
//       { icon:<Headphones size={15}/>,  label:"Support",          desc:"Get help from our team",          to:"/support" },
//       { icon:<Lightbulb size={15}/>,   label:"Interview Tips",   desc:"Master the fundamentals",         to:"/tips" },
//       { icon:<BookOpen size={15}/>,    label:"Blog",             desc:"Articles & career guides",         to:"/blog" },
//       { icon:<Info size={15}/>,        label:"About us",         desc:"Our story & mission",              to:"/about-us" },
//     ],
//   },
// ];

// const Header = () => {
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   const [anchor, setAnchor] = useState<HTMLElement|null>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mobExpanded, setMobExpanded] = useState<string|null>(null);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", fn, { passive:true });
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   useEffect(() => { setAnchor(null); setDrawerOpen(false); }, [location]);

//   const megaOpen = Boolean(anchor);

//   return (
//     <>
//       <style>{css}</style>

//       <Box component="header" className={`hdr${scrolled?" scrolled":""}`}>
//         <Box sx={{ maxWidth:1280, mx:"auto", px:{ xs:2, md:5 }, height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

//           {/* Logo */}
//           <Link to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:9 }}>
//             <Box sx={{ width:34, height:34, borderRadius:"10px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
//               <HandshakeOutlined sx={{ fontSize:18, color:"#fff" }}/>
//             </Box>
//             <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:INK, letterSpacing:"-0.01em" }}>
//               inTURN
//             </Typography>
//           </Link>

//           {/* Desktop nav */}
//           <Stack direction="row" spacing={.5} alignItems="center" sx={{ display:{ xs:"none", md:"flex" } }}>
//             {NAV.map(({ label, to }) => (
//               <Link key={to} to={to} className={`nav-pill${location.pathname===to?" active":""}`}>{label}</Link>
//             ))}
//             <button
//               className={`more-btn${megaOpen?" open":""}`}
//               onClick={(e) => setAnchor(anchor ? null : e.currentTarget)}
//             >
//               More
//               <KeyboardArrowDown sx={{ fontSize:16, transform:megaOpen?"rotate(180deg)":"none", transition:"transform .2s" }}/>
//             </button>
//           </Stack>

//           {/* Desktop auth */}
//           <Stack direction="row" spacing={1} alignItems="center" sx={{ display:{ xs:"none", md:"flex" } }}>
//             {user ? (
//               <Avatar src={user.avatar} sx={{ width:32, height:32, border:`2px solid ${BORDER}` }}/>
//             ) : (
//               <>
//                 <Button component={Link} to="/login"
//                   sx={{ textTransform:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:14, border:`1.5px solid ${BORDER}`, borderRadius:100, color:INK2, px:2.5, "&:hover":{ borderColor:P, color:P } }}>
//                   Sign in
//                 </Button>
//                 <Button component={Link} to="/register" variant="contained"
//                   sx={{ textTransform:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:14, background:P, borderRadius:100, px:2.5, boxShadow:"none", "&:hover":{ background:P_DARK, boxShadow:"0 4px 16px rgba(127,66,231,.28)", transform:"translateY(-1px)" }, transition:"all .2s" }}>
//                   Get started
//                 </Button>
//               </>
//             )}
//           </Stack>

//           {/* Mobile hamburger */}
//           <IconButton onClick={() => setDrawerOpen(true)} sx={{ display:{ xs:"flex", md:"none" }, color:INK }}>
//             <MenuIcon/>
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Mega menu */}
//       <Popover
//         open={megaOpen}
//         anchorEl={anchor}
//         onClose={() => setAnchor(null)}
//         anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
//         transformOrigin={{ vertical:"top", horizontal:"center" }}
//         PaperProps={{
//           className:"mega-anim",
//           sx:{ width:"min(96vw,1020px)", mt:1.5, borderRadius:"18px", border:`1.5px solid ${BORDER}`, boxShadow:"0 24px 64px rgba(0,0,0,.09)", overflow:"hidden" },
//         }}
//       >
//         <Box sx={{ display:"flex" }}>
//           {/* 3 cols */}
//           <Box sx={{ flex:1, p:3 }}>
//             <Grid container>
//               {MEGA.map((col, ci) => (
//                 <Grid item xs={12} md={4} key={ci}
//                   sx={{ borderRight:ci<2?`1px solid ${BORDER}`:"none", pr:ci<2?2.5:0, pl:ci>0?2.5:0 }}>
//                   <Typography sx={{ fontSize:10.5, fontWeight:700, color:P, textTransform:"uppercase", letterSpacing:"0.1em", px:1.5, mb:1.5 }}>
//                     {col.col}
//                   </Typography>
//                   <Stack spacing={.25}>
//                     {col.rows.map(({ icon, label, desc, to }) => (
//                       <Link key={to} to={to} className="mega-row" onClick={() => setAnchor(null)}>
//                         <div className="mega-row-icon">{icon}</div>
//                         <Box>
//                           <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, color:INK, lineHeight:1.2 }}>{label}</Typography>
//                           <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:INK2, mt:.15 }}>{desc}</Typography>
//                         </Box>
//                       </Link>
//                     ))}
//                   </Stack>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>

//           {/* Dark CTA panel */}
//           <Box sx={{ width:210, flexShrink:0, background:`linear-gradient(170deg,${INK} 0%,#1C1030 100%)`, p:3, display:"flex", flexDirection:"column", justifyContent:"space-between", position:"relative", overflow:"hidden" }}>
//             <Box sx={{ position:"absolute", top:-50, right:-50, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,${P}50 0%,transparent 70%)`, pointerEvents:"none" }}/>
//             <Box sx={{ position:"relative", zIndex:1 }}>
//               <Stack direction="row" spacing={.75} alignItems="center" mb={2}>
//                 <div className="live-dot"/>
//                 <Typography sx={{ fontSize:10.5, fontWeight:700, color:"rgba(255,255,255,.45)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Live</Typography>
//               </Stack>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#fff", lineHeight:1.1, mb:1 }}>
//                 Try AI interview free
//               </Typography>
//               <Typography sx={{ fontSize:12.5, color:"rgba(255,255,255,.45)", lineHeight:1.6, mb:3 }}>
//                 No signup. Full mock interview right now.
//               </Typography>
//               <Link to="/ai-practice" onClick={() => setAnchor(null)}
//                 style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:100, background:P, color:"#fff", fontSize:13, fontWeight:500, fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>
//                 Start free <ArrowRight size={13}/>
//               </Link>
//             </Box>
//             <Typography sx={{ fontSize:11, color:"rgba(255,255,255,.25)", position:"relative", zIndex:1, mt:3 }}>
//               12K+ students practicing
//             </Typography>
//           </Box>
//         </Box>
//       </Popover>

//       {/* Mobile drawer */}
//       <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
//         PaperProps={{ sx:{ width:300, background:"#fff" } }}>
//         <Box sx={{ p:2.5, height:"100%", display:"flex", flexDirection:"column" }}>

//           {/* Drawer header */}
//           <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//             <Link to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:8 }} onClick={() => setDrawerOpen(false)}>
//               <Box sx={{ width:30, height:30, borderRadius:"8px", background:P, display:"flex", alignItems:"center", justifyContent:"center" }}>
//                 <HandshakeOutlined sx={{ fontSize:15, color:"#fff" }}/>
//               </Box>
//               <Typography sx={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.05rem", color:INK }}>inTURN</Typography>
//             </Link>
//             <IconButton onClick={() => setDrawerOpen(false)} sx={{ color:INK2, "&:hover":{ color:INK } }}>
//               <CloseIcon sx={{ fontSize:20 }}/>
//             </IconButton>
//           </Stack>

//           {/* Direct links */}
//           <Stack spacing={.25} mb={2}>
//             {NAV.map(({ label, to }) => (
//               <Link key={to} to={to} className="mob-item" onClick={() => setDrawerOpen(false)}>{label}</Link>
//             ))}
//           </Stack>

//           <Box sx={{ height:1, background:BORDER, my:1.5 }}/>

//           {/* Expanded mega cols */}
//           {MEGA.map((col) => (
//             <Box key={col.col} mb={.5}>
//               <button
//                 onClick={() => setMobExpanded(mobExpanded===col.col?null:col.col)}
//                 style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"10px 12px", display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:600, color:INK }}
//               >
//                 {col.col}
//                 <KeyboardArrowDown sx={{ fontSize:16, color:INK2, transform:mobExpanded===col.col?"rotate(180deg)":"none", transition:"transform .2s" }}/>
//               </button>
//               {mobExpanded===col.col && (
//                 <Stack spacing={.15} pl={1}>
//                   {col.rows.map(({ icon, label, desc, to }) => (
//                     <Link key={to} to={to} className="mob-item" style={{ fontSize:13 }} onClick={() => setDrawerOpen(false)}>
//                       <Box sx={{ color:INK2, flexShrink:0 }}>{icon}</Box>
//                       <Box>
//                         <Typography sx={{ fontSize:13, fontWeight:600, color:INK, lineHeight:1.2 }}>{label}</Typography>
//                         <Typography sx={{ fontSize:11.5, color:INK2 }}>{desc}</Typography>
//                       </Box>
//                     </Link>
//                   ))}
//                 </Stack>
//               )}
//             </Box>
//           ))}

//           <Box flex={1}/>

//           {/* Mobile auth CTAs */}
//           <Box sx={{ borderTop:`1px solid ${BORDER}`, pt:2.5 }}>
//             {user ? (
//               <Stack direction="row" spacing={1.5} alignItems="center">
//                 <Avatar src={user.avatar} sx={{ width:36, height:36 }}/>
//                 <Box>
//                   <Typography sx={{ fontSize:13.5, fontWeight:600, color:INK }}>{user.name}</Typography>
//                   <Typography sx={{ fontSize:12, color:INK2 }}>{user.email}</Typography>
//                 </Box>
//               </Stack>
//             ) : (
//               <Stack spacing={1.25}>
//                 <Button fullWidth component={Link} to="/register" variant="contained" onClick={() => setDrawerOpen(false)}
//                   sx={{ textTransform:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:500, background:P, borderRadius:100, boxShadow:"none" }}>
//                   Get started
//                 </Button>
//                 <Button fullWidth component={Link} to="/login" onClick={() => setDrawerOpen(false)}
//                   sx={{ textTransform:"none", fontFamily:"'DM Sans',sans-serif", fontWeight:500, border:`1.5px solid ${BORDER}`, borderRadius:100, color:INK2 }}>
//                   Sign in
//                 </Button>
//               </Stack>
//             )}
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Header;