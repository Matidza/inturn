import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sider from "./sider";
import Header from "./header";

const AdminLayout = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Sider />

      {/* Main Area */}
      <Box flex={1} display="flex" flexDirection="column">
        <Header />

        <Box p={2} flex={1}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;