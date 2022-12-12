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

const CustomUpdateModal = (props) => {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

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

  // TODO:: Change user image here
  function changeUserImage() {}

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
        <DialogContent dividers style={{ height: "250px" }}>
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
                <TextField value={"fds"} />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Şifre</p>
                <TextField value={"fds"} />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Cep Telefonu</p>
                <TextField value={"fds"} />
              </div>
              <div className="update-dialog-textfield">
                <p style={{ textAlign: "start" }}>Şifreyi Tekrar Giriniz</p>
                <TextField value={"fds"} />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            İptal
          </Button>
          <Button autoFocus onClick={props.handleClose}>
            Değişiklikleri Kaydet
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default CustomUpdateModal;
