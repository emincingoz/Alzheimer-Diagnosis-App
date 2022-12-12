import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/DoctorPageTopBar.css";

const DoctorPageTopBar = ({ clickedPage, setClickedPage }) => {
  return (
    <div className="doctor-top-bar">
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

      <div className="doctor-user"></div>
    </div>
  );
};

export default DoctorPageTopBar;
