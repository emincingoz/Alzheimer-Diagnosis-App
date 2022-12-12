import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/PatientPage.css";
import PatientPageTopBar from "./PatientPageTopBar";
import PatientPageAnasayfa from "./PatientPageAnasayfa";
import PatientPageForm from "./PatientPageForm";
import PatientPageMessage from "./PatientPageMessage";
import PatientSettingsPage from "./PatientSettingsPage";

const PatientPage = () => {
  const [clickedPage, setClickedPage] = useState(0);

  function RenderShowedPage() {
    if (clickedPage === 0) {
      return <PatientPageAnasayfa />;
    } else if (clickedPage === 1) {
      return <PatientPageForm />;
    } else if (clickedPage === 2) {
      return <PatientPageMessage />;
    } else if (clickedPage === 3) {
      return <PatientSettingsPage />;
    }
  }

  return (
    <div className="patient-page">
      <PatientPageTopBar
        clickedPage={clickedPage}
        setClickedPage={setClickedPage}
      />
      <div className="patient-page-inside">
        {}
        {/*<PatientPageAnasayfa />*/}
        {/*<PatientPageForm />*/}
        {/*<PatientPageMessage />*/}
        <RenderShowedPage />
      </div>
    </div>
  );
};

export default PatientPage;
