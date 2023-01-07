import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/AdminPageTopBar.css";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user-icon2.jpg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AdminPageTopBar = ({ clickedPage, setClickedPage }) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accToken");
    localStorage.removeItem("roles");

    handleClose();
    navigate("/login");
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="admin-top-bar">
      <div className="admin-top-bar-buttons">
        <div className="admin-topbar-button">
          <Button
            className="admin-topbar-button"
            style={
              clickedPage === 0
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(0)}
          >
            Anasayfa
          </Button>
        </div>
        <div className="admin-topbar-button">
          <Button
            className="admin-topbar-button"
            style={
              clickedPage === 1
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(1)}
          >
            Hastalar
          </Button>
        </div>
        <div className="admin-topbar-button">
          <Button
            className="admin-topbar-button"
            style={
              clickedPage === 2
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(2)}
          >
            Doktorlar
          </Button>
        </div>
        <div className="admin-topbar-button">
          <Button
            className="admin-topbar-button"
            style={
              clickedPage === 3
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(3)}
          >
            Yeni Doktor
          </Button>
        </div>
      </div>
      <div className="admin-user">
        <img
          className="admin-small-user-icon"
          src={userIcon}
          alt="send-icon"
          onClick={handleClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default AdminPageTopBar;
