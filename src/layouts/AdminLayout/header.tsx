import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #eee",
      }}
    >
      <Typography fontWeight={600}>Dashboard</Typography>
    </Box>
  );
};

export default Header;