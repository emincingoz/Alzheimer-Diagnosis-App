import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/PatientPage.css";
import PatientPageTopBar from "./PatientPageTopBar";
import PatientPageAnasayfa from "./PatientPageAnasayfa";
import PatientPageForm from "./PatientPageForm";

const PatientPage = () => {
  return (
    <div className="patient-page">
      <PatientPageTopBar />
      <div className="patient-page-inside">
        {/*<PatientPageAnasayfa />*/}
        <PatientPageForm />
      </div>
    </div>
  );
};

export default PatientPage;
