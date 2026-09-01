import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import ScrollToTop from "../components/common/scrolltop";
import Footer from "../components/footer/Footer";
import Header from "../components/header/index";


// import Header from "./ProfessionalLayout/header";

const PublicLayout = () => {
  return ( 
    <Box
      bgcolor="#F2F2F2"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden", // 🔥 prevents global horizontal scroll
      }}
    >
      
      <Header />
      <Box sx={{ flex: 1, backgroundColor: "#FFFFFF", width: "100%", }}>
        <ScrollToTop />
        <Outlet />
      </Box>
      <Footer />
    </Box> 
  );
};

export default PublicLayout;