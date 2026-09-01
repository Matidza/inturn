import { AppBar, Toolbar, Typography, Button, Stack, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { HandshakeOutlined } from "@mui/icons-material";

const Header = () => {

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { mode, setMode } = useContext(ColorModeContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <AppBar 
        position="sticky"
        elevation={0} 
        sx={{ backgroundColor: "#f5f0fdff", 
        px: { xs: 2, md: 1 } }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={4} alignItems="center"   sx={{ display: { xs: "none", md: "flex", } }}>
            <Stack direction="row" spacing={1} alignItems="center">
               {/* background: "linear-gradient(90deg, #b893f6ff, #7f42e7ff)", */}
               
              < HandshakeOutlined sx={{ fontSize: 27, color: "#05050B", fontWeight: 600 }} />
              <Typography component={Link} to="/"  sx={{ fontFamily: "", fontWeight: 700, fontSize: "1.7rem", color: "#05050B", textDecoration: "none" }}>
                inTURN
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3}  sx={{ display: { xs: "none", md: "flex",} }}>
              <Typography 
                component={Link} to="/ai-practice" 
                sx={{
                  color: "#05050B", cursor: "pointer",
                  fontSize: "0.95rem", textDecoration: "none",
                }}
              >
                AI practice
              </Typography>
              <Typography 
                component={Link} to="/cv-analyzer" 
                sx={{
                  color: "#05050B", cursor: "pointer",
                  fontSize: "0.95rem", textDecoration: "none"
                }}
              >
                CV analyzer
              </Typography>
              <Typography 
                component={Link} to="/professionals" 
                sx={{
                  color: "#05050B", cursor: "pointer",
                  fontSize: "0.95rem", textDecoration: "none"
                }}
              >
                Professionals
              </Typography>
              <Typography 
                component={Link} to="/my-interviews" 
                sx={{
                  color: "#05050B", cursor: "pointer",
                  fontSize: "0.95rem", textDecoration: "none"
                }}
              >
                Schedule
              </Typography>
              {/* <Stack direction="row" onClick={handleOpen} gap={1}  alignItems="center">
                <Typography 
                  // onClick={handleOpen}
                  sx={{ 
                    color: "#8b8b8bff", cursor: "pointer",
                    fontSize: "0.95rem", textDecoration: "none"
                  }}
                >
                  More 
                </Typography>
                <KeyboardArrowDown  sx={{ color: "#8b8b8bff"}}/>
              </Stack> */}
            </Stack>
          </Stack>
          

          

          <Stack direction="row" spacing={2}>
            {/* RIGHT: User Actions */}
            <IconButton
              sx={{ color: "#05050B" }}
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <Box>
              {user ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    src={user.avatar}
                    sx={{ width: 30, height: 30 }}
                  />
                    <Button onClick={handleLogout} sx={{ 
                        textTransform: "none", 
                        border: 1, 
                        borderRadius: 25, 
                        color: "#b893f6ff", 
                        fontWeight: 600, 
                        borderColor: "#b893f6ff", 
                        fontSize: 13,
                        "&:hover": {
                            background: "#b893f6ff", color: "#FFFFFF"
                          },
                      }}
                    >
                      Logout
                    </Button>
                </Stack>
              ) : (

                <Stack direction="row" gap={1}>
                  <Button 
                    component={Link}
                    to="/login"
                    sx={{ 
                    textTransform: "none",
                    border: 1, 
                    borderRadius: 25,
                    color: "#b893f6ff",
                    fontWeight: 600, 
                    borderColor: "#b893f6ff",
                    "&:hover": {
                        background: "#b893f6ff", color: "#FFFFFF"
                      },
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
                      borderRadius: "20px",
                      color: "#FFFFFF",
                      fontWeight: 600, 
                      "&:hover": {
                        background: "#b187faff", color: "#FFFFFF"
                      },
                    }}
                  >
                    Login
                  </Button>
                </Stack> 
              )}
            </Box>
            

          </Stack>
        </Toolbar>
      </AppBar>
    </>
    
  );
};

export default Header;