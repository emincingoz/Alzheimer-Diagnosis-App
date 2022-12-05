import React, { useState, useEffect, useRef } from "react";
import "./styles/PatientPageMessage.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MessageContact = (props) => {
  return (
    <div
      className={`message-contact ${props.className}`}
      onClick={props.onClick}
    >
      <AccountCircleIcon style={{ color: "black" }} sx={{ fontSize: 65 }} />
      <div className="message-contact-person">
        <div className="message-contact-person-info">
          <h4>{props.name}</h4>
          <p
            className={`last-message ${
              props.lastMessage == "false" ? "hidden" : ""
            }`}
          >
            {props.lastMessage}
          </p>
        </div>
        <div
          className={`message-last-seen ${
            props.lastSeen == "false" ? "hidden" : ""
          }`}
        >
          <h5>{props.lastMessageTime}</h5>
        </div>
      </div>
    </div>
  );
};

export default MessageContact;
