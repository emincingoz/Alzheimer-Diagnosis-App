import { useRef, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "./styles/PatientPageForm.css";
import FormQuestion from "./FormQuestion";

const PatientPageForm = () => {
  return (
    <div className="patient-form">
      <div className="patient-form-title">
        <h1>Hasta Hikaye Formu</h1>
      </div>
      <div className="patient-form-questions">
        <FormQuestion />
      </div>
    </div>
  );
};

export default PatientPageForm;
