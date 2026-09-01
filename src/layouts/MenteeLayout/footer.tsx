import {
  Box,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { YouTube, Instagram,  } from "@mui/icons-material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { LinkedIn } from "@mui/icons-material";
import { X } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 4.5 }, py: 5, backgroundColor: "#FFFFFF", color: "#05050B" }}>
      <Stack direction="row"  mt={2} mb={8}>
        <Box
          sx={{              
            // background: "linear-gradient(135deg, #ff7a18, #0f4cff)",             
            display: "flex",
            flexDirection: "column",
            width: "50%"                    
          }}
        >          
          <Box sx={{}}>
            <Stack direction="column" spacing={5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Inventory2OutlinedIcon sx={{ fontSize: 27, color: "#a877fdff", fontWeight: 600,  }} />
                <Typography component={Link} to="/" sx={{ fontFamily: "", fontWeight: 700, fontSize: "1.9rem", color: "#05050B", textDecoration: "none" }}>
                  inTURN
                </Typography>
              </Stack>
              
              
              <Stack direction="column" >
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "600" }}>Address</Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: "400" }}>Ganymede Ave. Bedworth Park, Vereeniging, Gauteng, 1939</Typography>
              </Stack>
              <Stack direction="column" >
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "600" }}>Contact</Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", textDecoration: "underline" }}>0664347295</Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: "400", textDecoration: "underline" }}>matidza46@gmail.com</Typography>
              </Stack>
            </Stack>      
            
          </Box>
          
          <Stack direction="row" spacing={1} mt={3} color="#05050B">
            {/* onClick={() => push("/profile")}> */}
            {/* <FacebookRounded sx={{ fontSize: 28 }} /> */}
            <Typography component={Link} to="/student-portal" >
              <Instagram sx={{ color: "#05050B", fontSize: 28 }} />
            </Typography>
            <Typography component={Link} to="/student-portal">
              <X sx={{ color: "#05050B", fontSize: 28 }} />
            </Typography>
            <Typography component={Link} to="/student-portal">
              <LinkedIn sx={{ color: "#05050B", fontSize: 28 }} />
            </Typography>
            <Typography component={Link} to="/student-portal">
              <YouTube sx={{ color: "#05050B", fontSize: 28 }} />
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{              
            // background: "linear-gradient(135deg, #ff7a18, #0f4cff)",             
            display: "flex",
            flexDirection: "column",
            width: "50%",
                           
          }}
        >      
          <Grid container spacing={4} sx={{ justifyContent: "end"    }}>
            <Grid item xs={12} md={3}>           
              <Stack direction="column" spacing={1.5} >
                <Typography component={Link} to="/professionalsPortal"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Professionals</Typography>
                <Typography component={Link} to="/how-it-works"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>How it works</Typography>
                <Typography component={Link} to="/ai-info"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>AI practice</Typography>
                <Typography component={Link} to="/cv-info"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>CV analyzer</Typography>
                <Typography component={Link} to="/tips"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Tips</Typography>
              </Stack>       
            </Grid>

            <Grid item xs={12} md={3}>
              <Stack direction="column" spacing={1.5} >
                <Typography component={Link} to="/pricing"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Pricing</Typography>
                <Typography component={Link} to="/blog"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Blog</Typography>
                <Typography component={Link} to="/support"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Support</Typography>
                <Typography component={Link} to="/about-us"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>About us</Typography>
                <Typography component={Link} to="/contact-us"  sx={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none", color: "#05050B" }}>Contact us</Typography>
              </Stack>   
            </Grid>
          </Grid>      
        </Box>
         
          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{

                
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                background: "linear-gradient(135deg, #ff7a18, #0f4cff)",
                
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 2, md: 6 },          
              }}
            >
              <Typography variant="h6" textAlign="start" fontWeight="semi-bold"  color="#FFFFFF">
                Students
              </Typography>
              <Box>             
                <Typography
                  sx={{
                    fontFamily: "",
                    fontSize: { xs: "2.2rem", md: "3rem" },
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.1
                  }}
                >
                  Gain real interview experience
                </Typography>
              </Box>
              
              <Typography color="#FFFFFF" fontSize={14}>
                Practice with AI and real professionals. Get feedback that matters. Build confidence
              </Typography>

              <Stack direction="row" spacing={2} mt={3}>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    fontWeight: 600,
                    borderColor: "#e8e8e8ff",
                    color: "#FFFFFF",                  
                  }}
                >
                  Explore
                </Button>
                <Button
                  sx={{
                    borderRadius: 5,
                    textTransform: "none",
                    color: "#FFFFFF",
                    fontWeight: 600
                  }}
                >
                  Learn more < KeyboardArrowRight sx={{ mt: -0.2}}/>
                </Button>
              </Stack>
            </Box>
          </Grid>  */}
      </Stack>
      <Box sx={{ mt: 6, borderTop: "1px solid #a2a2a4ff", pt: 3 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography align="left" sx={{  }}>
            © 2026 inTURN. All rights reserved
          </Typography>
          <Stack direction="row" justifyContent="space-evenly" gap={1.5}>
            <Typography component={Link} to="/privacy-policy"  sx={{ color: "#05050B", "&:hover": { color: "#b893f6ff" } }}>
              Privacy policy
            </Typography>
            <Typography component={Link} to="/terms-of-service"  sx={{ color: "#05050B", "&:hover": { color: "#b893f6ff" } }}>
              Terms of service
            </Typography>
            <Typography component={Link} to="/cookie-settings"  sx={{ color: "#05050B", "&:hover": { color: "#b893f6ff" } }}>
              Cookie settings
            </Typography>
          </Stack>
          
        </Stack>
        
      </Box>
    </Box>
  );
};

export default Footer;