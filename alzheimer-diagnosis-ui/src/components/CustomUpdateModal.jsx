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
import DialogBodyAndFooter from "./DialogBodyAndFooter";
import { NavItem } from "react-bootstrap";
import axios from "../services/axios";

const BASE_URL = "/api/admin";
const CHANGE_DOCTOR_INFO_URL = BASE_URL + "/change-doctor-info";

const CustomUpdateModal = (props) => {
  const [changeableInfos, setChangeableInfos] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    passwordAgain: "",
  });

  const [infoSetted, setInfoSetted] = useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  useEffect(() => {
    if (infoSetted === true) {
      changeDoctorInfos();
    }
  }, [infoSetted]);

  async function changeDoctorInfos() {
    try {
      let tokenWithoutBearer = localStorage.getItem("accToken").toString();
      let token =
        "Bearer " +
        tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

      const response = await axios.put(
        CHANGE_DOCTOR_INFO_URL + "/" + props.tckn,
        JSON.stringify({
          email: changeableInfos.email,
          phoneNumber: changeableInfos.phoneNumber,
          password: changeableInfos.password,
        }),
        {
          headers: { "Content-Type": "application/json", Authorization: token },
          withCredentials: true,
        }
      );
      console.log("başarılı");
    } catch (e) {
      console.log("error: " + e.toString());
    }
  }

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  const handleSetInfos = (
    email,
    phoneNumber,
    password,
    passwordAgain,
    flag
  ) => {
    setChangeableInfos({
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      passwordAgain: passwordAgain,
    });
    setInfoSetted(flag);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.show}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
        >
          Güncellemek İstediğiniz Bilgileri Giriniz
        </BootstrapDialogTitle>
        <DialogBodyAndFooter
          email={props.email}
          phoneNumber={props.phoneNumber}
          handleSetInfos={handleSetInfos}
          handleClose={props.handleClose}
        />
      </BootstrapDialog>
    </div>
  );
};

export default CustomUpdateModal;
