import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/DoctorPage.css";
import DoctorPageTopBar from "./DoctorPageTopBar";
import DoctorPageTeshis from "./DoctorPageTeshis";
import MyPatients from "./MyPatients";
import DoctorPageMessage from "./DoctorPageMessage";
import DoctorSettingsPage from "./DoctorSettingsPage";

const DoctorPage = () => {
  const [clickedPage, setClickedPage] = useState(0);

  function RenderShowedPage() {
    if (clickedPage === 0) {
      return <DoctorPageTeshis />;
    } else if (clickedPage === 1) {
      return <MyPatients />;
    } else if (clickedPage === 2) {
      return <DoctorPageMessage />;
    } else if (clickedPage === 3) {
      return <DoctorSettingsPage />;
    }
  }

  return (
    <div className="doctor-page">
      <DoctorPageTopBar
        clickedPage={clickedPage}
        setClickedPage={setClickedPage}
      />
      <div className="doctor-page-inside">
        {/*<DoctorPageTeshis />*/}
        {/*<MyPatients />*/}
        {/*<DoctorPageMessage />*/}
        {/*<DoctorSettingsPage />*/}
        <RenderShowedPage />
      </div>
    </div>
  );
};

export default DoctorPage;
