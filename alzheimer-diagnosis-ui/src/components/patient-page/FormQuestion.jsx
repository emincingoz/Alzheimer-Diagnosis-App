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

const FormQuestion = (props) => {
  const [alignment, setAlignment] = useState(
    props.answer == null ? null : props.answer == false ? false : true
  );

  const handleAlignment = (event, newAlignment) => {
    //var ans = newAlignment === "true";
    props.list[props.id - 1].answer = newAlignment;
    props.setAnswer(props.list);

    let flag = true;

    for (let i = 0; i < props.list.length; i++) {
      if (props.list[i].answer === null) flag = false;
    }
    if (flag) props.setFlag(true);
    else props.setFlag(false);

    setAlignment(newAlignment);
  };

  return (
    <div className="question">
      <div style={{ paddingRight: "1%" }}>{props.id}</div>
      <div>{props.question}</div>
      <div className="patient-form-buttons">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          size="small"
        >
          <ToggleButton value={true} style={{ borderRadius: "50%" }}>
            <CheckIcon />
          </ToggleButton>
          <ToggleButton value={false} style={{ borderRadius: "50%" }}>
            <CloseIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default FormQuestion;
