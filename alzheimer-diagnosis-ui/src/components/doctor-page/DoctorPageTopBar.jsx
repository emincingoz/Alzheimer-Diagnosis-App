import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/DoctorPageTopBar.css";

const DoctorPageTopBar = () => {
  return (
    <div className="doctor-top-bar">
      <div className="doctor-topbar-button">
        <Button className="doctor-topbar-button">Teşhis</Button>
      </div>
      <div className="doctor-topbar-button">
        <Button className="doctor-topbar-button">Hastalarım</Button>
      </div>
      <div className="doctor-topbar-button">
        <Button className="doctor-topbar-button">Mesajlar</Button>
      </div>
      <div className="doctor-topbar-button">
        <Button className="doctor-topbar-button">Ayarlar</Button>
      </div>

      <div className="doctor-user"></div>
    </div>
  );
};

export default DoctorPageTopBar;
