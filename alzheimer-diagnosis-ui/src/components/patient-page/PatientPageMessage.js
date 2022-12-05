import React, { useState, useEffect, useRef } from "react";
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

import { over } from "stompjs";
import SockJS from "sockjs-client";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { useCallback } from "react";

const PATIENT_BASE_URL = "/api/patient";
const GET_DOCTORS_URL = PATIENT_BASE_URL + "/get-doctors";

const MESSAGE_CONTACT_BASE_URL = "/api/message-contact";
const ADD_NEW_CONTACT_URL = MESSAGE_CONTACT_BASE_URL + "/add-contact";
const GET_CONTACTS_URL = MESSAGE_CONTACT_BASE_URL + "/get-contacts";
const UPDATE_LAST_MESSAGE_AND_TIME =
  MESSAGE_CONTACT_BASE_URL + "/update-last-message";

var stompClient = null;

const PatientPageMessage = () => {
  const [myMessage, setMyMessage] = useState("");
  const [dialog, setDialog] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentDoctorFlag, setCurrentDoctorFlag] = useState(false);
  const [userInfo, setUserInfo] = useState({
    tckn: "",
    roles: [],
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    registerUser();
  }, [userInfo]);

  useEffect(() => {
    setCurrentDoctorFlag(true);
  }, [currentDoctor]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const registerUser = () => {
    connect();
  };

  const getUser = () => {
    let user1 = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user1);
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + userInfo.tckn + "/private",
      onPrivateMessageReceived
    );
  };

  const onError = (err) => {};

  const onPrivateMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);

    let data = getMessagesFromLocalStorage(payloadData.senderTckn);

    data.push(payloadData);

    localStorage.setItem(payloadData.senderTckn, JSON.stringify(data));
    setMessages(data);
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderTckn: userInfo.tckn,
        receiverTckn: currentDoctor.tckn,
        message: myMessage,
        sentTime: new Date().toLocaleTimeString(),
      };

      if (userInfo.tckn !== currentDoctor.tckn && myMessage !== "") {
        let docTckn = currentDoctor.tckn;

        let data = getMessagesFromLocalStorage(docTckn);

        data.push(chatMessage);

        localStorage.setItem(docTckn, JSON.stringify(data));
        setMessages(data);
      }

      stompClient.send(
        "/message-app/private-message",
        {},
        JSON.stringify(chatMessage)
      );
    }
  };

  useEffect(() => {
    getUser();
    getContacts();
  }, []);

  useEffect(() => {
    getContacts();
  }, [messages]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

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

  const addNewContact = async (e) => {
    try {
      const response = await axios.post(
        ADD_NEW_CONTACT_URL,
        JSON.stringify({
          senderTckn: userInfo.tckn,
          receiverTckn: currentDoctor.tckn,
          lastMessage: myMessage,
          lastMessageByReceiver: false,
          senderLastSeen: "",
          receiverLastSeen: "",
        }),
        {
          headers: { "Content-Type": "application/json" },
          //headers: {},
          withCredentials: true,
        }
      );
    } catch (e) {}
  };

  const getContacts = async (e) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const url = GET_CONTACTS_URL + "/" + user.tckn + "/DOCTOR";
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        //headers: {},
        withCredentials: true,
      });

      setContacts(response.data.data);
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
    handleDialogClose();

    setCurrentDoctor(doctor);

    getMessagesFromLocalStorage(doctor.tckn);
  };

  const getMessagesFromLocalStorage = (doctorTckn) => {
    let messageArray = JSON.parse(localStorage.getItem(doctorTckn));

    var data = [];

    if (messageArray != null) {
      let result = Object.entries(messageArray).map(([k, v]) => ({
        [k]: v,
      }));
      result.forEach((item) => {
        var key = Object.keys(item)[0];

        data.push({
          senderTckn: item[key].senderTckn,
          receiverTckn: item[key].receiverTckn,
          message: item[key].message,
          sentTime: item[key].sentTime,
        });
      });
    }

    setMessages(data);

    return data;
  };

  const handleMessageSend = () => {
    sendPrivateMessage();

    addNewContact();

    updateLastMessageAndTime(currentDoctor, myMessage);

    setMyMessage("");
  };

  const RenderMessageBubbles = () => {
    let array = [];

    messages.map((k, index) =>
      array.push(
        <MessageBubble
          key={index}
          message={k.message}
          sentTime={k.sentTime}
          isMyMessage={k.senderTckn === userInfo.tckn ? true : false}
        />
      )
    );

    return array;
  };

  const RenderSelectDoctorDialogBox = () => {
    return (
      <Dialog onClose={handleDialogClose} open={dialog}>
        <DialogTitle>Bir Doktor Seç</DialogTitle>
        <List sx={{ pt: 0 }}>
          {allDoctors.map((doctor, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleDialogItemClick(doctor)}
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
    );
  };

  const RenderMessageContacts = () => {
    let array = [];

    contacts.map((item, index) => {
      array.push(
        <MessageContact
          className={
            currentDoctor !== null &&
            item.receiverTckn === currentDoctor.tckn &&
            "selected-message-contact"
          }
          key={index}
          name={
            capitalizeFirstLetter(item.receiverFirstName) +
            " " +
            capitalizeFirstLetter(item.receiverLastName)
          }
          lastMessage={item.lastMessage}
          lastMessageTime={new Date(item.lastMessageTime).toLocaleTimeString()}
          lastSeen={item.receiverLastSeen}
          onClick={() =>
            getMessageBubble(
              item.receiverTckn,
              item.receiverFirstName,
              item.receiverLastName
            )
          }
        />
      );
    });

    return array;
  };

  const getMessageBubble = (doctorTckn, doctorFirstName, doctorLastName) => {
    let doctor = {
      tckn: doctorTckn,
      firstName: doctorFirstName,
      lastName: doctorLastName,
    };

    handleDialogItemClick(doctor);
  };

  const updateLastMessageAndTime = async (doctor, message) => {
    try {
      const response = await axios.put(
        UPDATE_LAST_MESSAGE_AND_TIME,
        JSON.stringify({
          senderTckn: userInfo.tckn,
          receiverTckn: doctor.tckn,
          lastMessage: message,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (e) {}
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

          <RenderSelectDoctorDialogBox />
        </div>
        <div className="patient-message-contacts">
          <RenderMessageContacts />
        </div>
      </div>
      <>
        {currentDoctor != null ? (
          <div className="patient-message-right-container">
            <div className="message-right-top-contact-info">
              <MessageContact
                key={currentDoctor.id}
                name={
                  capitalizeFirstLetter(currentDoctor.firstName) +
                  " " +
                  capitalizeFirstLetter(currentDoctor.lastName)
                }
                lastMessage="false"
                lastSeen="false"
              />
            </div>
            <div className="message-messages-body">
              <RenderMessageBubbles />
            </div>
            <div className="message-send-container">
              <div className="message-write-field">
                <input
                  type="text"
                  className="message-textfield"
                  placeholder="Bir mesaj yazın"
                  value={myMessage}
                  onChange={(e) => setMyMessage(e.target.value)}
                  onKeyUp={(event) =>
                    event.key === "Enter" ? handleMessageSend() : null
                  }
                ></input>
                <IconButton
                  className="message-send-icon-button"
                  color="primary"
                  onClick={handleMessageSend}
                  disabled={currentDoctorFlag ? false : true}
                >
                  <img
                    className="message-send-icon"
                    src={sendIcon}
                    alt="send-icon"
                  />
                </IconButton>
              </div>
              {/*<RenderMessageSendSection />*/}
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
