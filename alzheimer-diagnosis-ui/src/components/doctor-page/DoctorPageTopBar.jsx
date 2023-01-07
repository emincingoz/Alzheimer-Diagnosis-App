import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import userIcon from "../../assets/images/user-icon2.jpg";
import "./styles/DoctorPageTopBar.css";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const DoctorPageTopBar = ({ clickedPage, setClickedPage }) => {
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
    <div className="doctor-top-bar">
      <div className="doctor-top-bar-buttons">
        <div className="doctor-topbar-button">
          <Button
            className="doctor-topbar-button"
            style={
              clickedPage === 0
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(0)}
          >
            Teşhis
          </Button>
        </div>
        <div className="doctor-topbar-button">
          <Button
            className="doctor-topbar-button"
            style={
              clickedPage === 1
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(1)}
          >
            Hastalarım
          </Button>
        </div>
        <div className="doctor-topbar-button">
          <Button
            className="doctor-topbar-button"
            style={
              clickedPage === 2
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(2)}
          >
            Mesajlar
          </Button>
        </div>
        <div className="doctor-topbar-button">
          <Button
            className="doctor-topbar-button"
            style={
              clickedPage === 3
                ? { backgroundColor: "#999", pointerEvents: "none" }
                : {}
            }
            onClick={() => setClickedPage(3)}
          >
            Ayarlar
          </Button>
        </div>
      </div>
      <div className="doctor-user">
        <img
          className="doct-small-user-icon"
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

export default DoctorPageTopBar;
