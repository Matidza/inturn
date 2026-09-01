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

const PL     = "#F0EAFD";

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
          backgroundColor: `${PL}`,
          // backgroundColor: "#f5f0fdff",
          //
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
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#7f42e7ff",
                    borderRadius: 25,
                  }}
                >
                  Login
                </Button>

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