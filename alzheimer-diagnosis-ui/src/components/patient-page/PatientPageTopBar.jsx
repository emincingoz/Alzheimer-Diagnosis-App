import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/PatientPage.css";

const PatientPageTopBar = ({ clickedPage, setClickedPage }) => {
  return (
    <div className="patient-top-bar">
      <div className="patient-anasayfa-button">
        <Button
          className="patient-anasayfa-button"
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
      <div className="patient-form-button">
        <Button
          className="patient-form-button"
          style={
            clickedPage === 1
              ? { backgroundColor: "#999", pointerEvents: "none" }
              : {}
          }
          onClick={() => setClickedPage(1)}
        >
          Hikaye Formu
        </Button>
      </div>
      <div className="patient-messages-button">
        <Button
          className="patient-messages-button"
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
      <div className="patient-settings-button">
        <Button
          className="patient-settings-button"
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

      <div className="patient-user"></div>
    </div>
  );
};

export default PatientPageTopBar;
