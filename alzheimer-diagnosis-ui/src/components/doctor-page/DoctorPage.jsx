import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/DoctorPage.css";
import DoctorPageTopBar from "./DoctorPageTopBar";
import DoctorPageTeshis from "./DoctorPageTeshis";
import MyPatients from "./MyPatients";
import DoctorPageMessage from "./DoctorPageMessage";

const DoctorPage = () => {
  return (
    <div className="doctor-page">
      <DoctorPageTopBar />
      <div className="doctor-page-inside">
        {/*<DoctorPageTeshis />*/}
        {/*<MyPatients />*/}
        <DoctorPageMessage />
      </div>
    </div>
  );
};

export default DoctorPage;
