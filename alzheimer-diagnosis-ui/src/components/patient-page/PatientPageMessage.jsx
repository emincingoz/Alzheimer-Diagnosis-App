import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageContact from "./MessageContact";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import "./styles/PatientPageMessage.css";

const PatientPageMessage = () => {
  return (
    <div className="patient-message">
      <div className="patient-message-left-container">
        <div className="patient-message-left-title">
          <h3>Doktorlarım</h3>
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
      <div className="patient-message-right-container">
        <div className="message-right-top-contact-info">
          <MessageContact />
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
            <SendIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPageMessage;
