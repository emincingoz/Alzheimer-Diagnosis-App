import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import "./styles/AdminPageTopBar.css";

const AdminPageTopBar = ({ clickedPage, setClickedPage }) => {
  return (
    <div className="admin-top-bar">
      <div className="admin-topbar-button">
        <Button
          className="admin-topbar-button"
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
      <div className="admin-topbar-button">
        <Button
          className="admin-topbar-button"
          style={
            clickedPage === 1
              ? { backgroundColor: "#999", pointerEvents: "none" }
              : {}
          }
          onClick={() => setClickedPage(1)}
        >
          Hastalar
        </Button>
      </div>
      <div className="admin-topbar-button">
        <Button
          className="admin-topbar-button"
          style={
            clickedPage === 2
              ? { backgroundColor: "#999", pointerEvents: "none" }
              : {}
          }
          onClick={() => setClickedPage(2)}
        >
          Doktorlar
        </Button>
      </div>
      <div className="admin-topbar-button">
        <Button
          className="admin-topbar-button"
          style={
            clickedPage === 3
              ? { backgroundColor: "#999", pointerEvents: "none" }
              : {}
          }
          onClick={() => setClickedPage(3)}
        >
          Yeni Doktor
        </Button>
      </div>

      <div className="admin-user"></div>
    </div>
  );
};

export default AdminPageTopBar;
