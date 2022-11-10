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

const FormQuestion = () => {
  const [selected, setSelected] = useState(false);
  const [alignment, setAlignment] = useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="question">
      <div>1.</div>
      <div>
        Yeni Öğrendiğiniz Bilgileri Hatırlamakta Güçlük Çekiyor musunuz?
      </div>
      {/*<div className="patient-form-buttons">
            <div>
                <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
                </IconButton>
            </div>
            <div>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                    </IconButton>
            </div>
            </div>
        </div>*/}
      <div className="patient-form-buttons">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value="left" style={{ borderRadius: "50%" }}>
            <CheckIcon />
          </ToggleButton>
          <ToggleButton value="right" style={{ borderRadius: "50%" }}>
            <CloseIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default FormQuestion;
