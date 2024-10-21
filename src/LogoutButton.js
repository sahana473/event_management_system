import { AppBar, Toolbar,Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/user/login");
  };

  return (
    <div className="w-full shadow-sm">
      <AppBar
        position="static"
        sx={{ bgcolor:"#539ed8", height: "60px" }}
        elevation={0}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <LogoutIcon
            size="large"
            edge="start"
            data-test-id="logout-btn"
            className="text-red-700"
            aria-label="logout"
            onClick={handleLogout}
          ></LogoutIcon>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LogoutButton;
