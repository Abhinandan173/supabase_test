import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline, Home, Logout } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.reload()
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <Diversity3Icon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            Money Tracker
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Top links */}
          <div>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              >
                <ListItemText primary="Home" /> <Home />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/create-expenses");
                  setOpen(false);
                }}
              >
                <ListItemText primary="Create Expense" /> <AddCircleOutline />
              </ListItemButton>
            </ListItem>
          </div>

          {/* Spacer */}
          <div style={{ flexGrow: 1 }} />

          {/* Bottom Logout */}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
              <Logout />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Header;
