import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import "../styles/Register.css";

const CustomTextField = (props) => {
  // id
  // label
  // type
  // setState
  // setFocus
  // validProp
  // focusProp
  // helperText

  return (
    <TextField
      className="textField"
      id={props.id}
      label={props.label}
      margin="normal"
      variant="outlined"
      type={props.type ? props.type : "text"}
      autoComplete="off"
      size="small"
      inputProps={{ style: { fontSize: 14 } }} // font size of input text
      InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
      onChange={(e) => props.setState(e.target.value)}
      required
      onFocus={() => props.setFocus(true)}
      onBlur={() => props.setFocus(false)}
      error={!props.validProp && props.focusProp}
      maxLength={props.maxLength}
      helperText={
        props.helperText ? (
          !props.validProp && props.focusProp ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              {props.helperText}
            </p>
          ) : (
            ""
          )
        ) : null
      }
    />
  );
};

export default CustomTextField;
