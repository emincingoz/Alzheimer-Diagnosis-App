import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/AdminPage.css";
import AdminPageTopBar from "./AdminPageTopBar";
import AdminPageAnasayfa from "./AdminPageAnasayfa";
import AdminPagePatients from "./AdminPagePatients";
import AdminPageDoctors from "./AdminPageDoctors";

const AdminPage = () => {
  const [clickedPage, setClickedPage] = useState(0);

  function RenderShowedPage() {
    if (clickedPage === 0) {
      return <AdminPageAnasayfa />;
    } else if (clickedPage === 1) {
      return <AdminPagePatients />;
    } else if (clickedPage === 2) {
      return <AdminPageDoctors />;
    } /*else if (clickedPage === 3) {
      return <DoctorSettingsPage />;
    }*/
  }

  return (
    <div className="doctor-page">
      <AdminPageTopBar
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

export default AdminPage;
