import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import "../styles/CustomUpdateModal.css";
import userIcon from "../assets/images/user-icon.png";
import { set } from "date-fns/esm";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const PHONE_NUMBER_REGEX =
  /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const DialogBodyAndFooter = (props) => {
  const [changeableInfos, setChangeableInfos] = useState([
    { type: "Cep Telefonu", value: props.phoneNumber },
    { type: "E-Mail", value: props.email },
    { type: "Şifre", value: "" },
    { type: "Şifrenizi Tekrar Giriniz", value: "" },
  ]);

  const [email, setEmail] = useState(props.email);
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [passwordAgain, setPasswordAgain] = useState("");
  const [validPasswordAgain, setValidPasswordAgain] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === passwordAgain;
    setValidPasswordAgain(match);
  }, [password, passwordAgain]);

  useEffect(() => {
    const result = PHONE_NUMBER_REGEX.test(phoneNumber);
    setValidPhoneNumber(result);
  }, [phoneNumber]);

  // TODO:: Change user image here
  function changeUserImage() {}

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const submitFields = () => {
    console.log("tıklandı");
    props.handleSetInfos(email, phoneNumber, password, passwordAgain, true);
  };

  function handleUpdateButtonActive() {
    let flag = false;
    changeableInfos.forEach((info, index) => {
      if (
        (info.type === "Cep Telefonu" &&
          info.value === phoneNumber.toString() &&
          info.type === "E-Mail" &&
          info.value === email &&
          info.type === "Şifre" &&
          info.value === password &&
          info.type === "Şifrenizi Tekrar Giriniz" &&
          info.value === passwordAgain) ||
        !validPhoneNumber ||
        !validEmail ||
        !validPassword ||
        !validPasswordAgain
      ) {
        flag = true;
      }
    });

    return flag;
  }

  return (
    <>
      <DialogContent dividers style={{ height: "250px" }}>
        <form onSubmit={handleSubmit}>
          <div className="update-dialog-body">
            <div className="update-dialog-body-left-side">
              <div className="update-dialog-icon-div">
                <img
                  className="update-medium-user-icon"
                  src={userIcon}
                  alt="send-icon"
                  onClick={changeUserImage}
                />
              </div>
            </div>
            <div className="update-dialog-body-right-side">
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>E-Mail</p>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Şifre</p>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Cep Telefonu</p>
                <TextField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Şifreyi Tekrar Giriniz</p>
                <TextField
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>İptal</Button>
        <Button
          onClick={submitFields}
          disabled={handleUpdateButtonActive()}
          style={
            handleUpdateButtonActive()
              ? {
                  /*backgroundColor: "#d9d9d9", color: "black"*/
                }
              : { backgroundColor: "#1c1645", color: "white" }
          }
        >
          Değişiklikleri Kaydet
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogBodyAndFooter;
