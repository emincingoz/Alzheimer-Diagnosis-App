import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageContact from "./MessageContact";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import "./styles/PatientPageMessage.css";
import sendIcon from "../../assets/images/message-send-icon.png";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import axios from "../../services/axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SignalCellularNull } from "@mui/icons-material";

const BASE_URL = "/api/patient";
const GET_DOCTORS_URL = BASE_URL + "/get-doctors";

const PatientPageMessage = () => {
  const [dialog, setDialog] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentDoctorFullName, setCurrentDoctorFullName] = useState("");

  /*useEffect(() => {
    getAllDoctors();
  }, []);*/

  const getAllDoctors = async (e) => {
    try {
      const response = await axios.get(GET_DOCTORS_URL, {
        headers: { "Content-Type": "application/json" },
        //headers: {},
        withCredentials: true,
      });

      setAllDoctors(response.data.data);
    } catch (e) {}
  };

  const handleDialogOpen = () => {
    getAllDoctors();
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleDialogItemClick = (doctor) => {
    setCurrentDoctor(doctor);
    setCurrentDoctorFullName(
      doctor.firstName[0].toUpperCase() +
        doctor.firstName.substring(1) +
        " " +
        doctor.lastName[0].toUpperCase() +
        doctor.lastName.substring(1)
    );
  };

  return (
    <div className="patient-message">
      <div className="patient-message-left-container">
        <div className="patient-message-left-title">
          <h3>Doktorlarım</h3>
          <IconButton
            className="person-add-icon-button"
            onClick={handleDialogOpen}
          >
            <PersonAddAlt1Icon />
          </IconButton>

          <Dialog onClose={handleDialogClose} open={dialog}>
            <DialogTitle>Bir Doktor Seç</DialogTitle>
            <List sx={{ pt: 0 }}>
              {allDoctors.map((doctor) => (
                <ListItem
                  button
                  onClick={() => handleDialogItemClick(doctor)}
                  key={doctor}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#919bab", color: blue[600] }}>
                      <AccountCircleIcon
                        style={{ color: "black" }}
                        sx={{ fontSize: 50 }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      doctor.firstName[0].toUpperCase() +
                      doctor.firstName.substring(1) +
                      " " +
                      doctor.lastName[0].toUpperCase() +
                      doctor.lastName.substring(1)
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Dialog>
        </div>
        <div className="patient-message-contacts">
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
          <MessageContact />
        </div>
      </div>
      <>
        {currentDoctor != null ? (
          <div className="patient-message-right-container">
            <div className="message-right-top-contact-info">
              <MessageContact
                key={currentDoctor.id}
                name={currentDoctorFullName}
                lastMessage="false"
                lastSeen="false"
              />
            </div>
            <div className="message-messages-body">
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
              <MessageBubble />
            </div>
            <div className="message-send-container">
              <div className="message-write-field">
                <input className="message-textfield"></input>
                {/* TODO:: Change icon button */}
                <IconButton
                  className="message-send-icon-button"
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <img
                    className="message-send-icon"
                    src={sendIcon}
                    alt="send-icon"
                  />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div>nope burası boş</div>
        )}
      </>
    </div>
  );
};

export default PatientPageMessage;
