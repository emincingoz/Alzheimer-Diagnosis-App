import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/DoctorPage.css";
import DoctorPageTopBar from "./DoctorPageTopBar";
import DoctorPageTeshis from "./DoctorPageTeshis";

const DoctorPage = () => {
  return (
    <div className="doctor-page">
      <DoctorPageTopBar />
      <div className="doctor-page-inside">
        <DoctorPageTeshis />
      </div>
    </div>
  );
};

export default DoctorPage;
