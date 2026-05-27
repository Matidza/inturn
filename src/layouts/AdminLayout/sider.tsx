import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";

const Sider = () => {
  return (
    <Stack
      sx={{
        width: 220,
        p: 2,
        borderRight: "1px solid #eee",
      }}
      spacing={1}
    >
      <Button component={Link} to="/admin">
        Dashboard
      </Button>

      <Button component={Link} to="/admin/users">
        Users
      </Button>
    </Stack>
  );
};

export default Sider;