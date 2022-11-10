import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/PatientPage.css";

const PatientPageTopBar = () => {
  return (
    <div className="patient-top-bar">
      <div className="patient-anasayfa-button">
        <Button className="patient-anasayfa-button">Anasayfa</Button>
      </div>
      <div className="patient-form-button">
        <Button className="patient-form-button">Hikaye Formu</Button>
      </div>
      <div className="patient-messages-button">
        <Button className="patient-messages-button">Mesajlar</Button>
      </div>
      <div className="patient-settings-button">
        <Button className="patient-settings-button">Ayarlar</Button>
      </div>

      <div className="patient-user"></div>
    </div>
  );
};

export default PatientPageTopBar;
