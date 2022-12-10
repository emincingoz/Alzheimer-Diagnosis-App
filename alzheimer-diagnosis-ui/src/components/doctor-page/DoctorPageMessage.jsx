import React, { useState, useEffect, useRef } from "react";
// TODO:: change directory, i mean extract these components to general space
import MessageBubble from "../patient-page/MessageBubble";
import MessageContact from "../patient-page/MessageContact";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
// TODO:: exctract this css file also general space
import "../patient-page/styles/PatientPageMessage.css";
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

const DOCTOR_BASE_URL = "/api/doctor";
const GET_PATIENTS_URL = DOCTOR_BASE_URL + "/get-allpatients";

const MESSAGE_CONTACT_BASE_URL = "/api/message-contact";
const ADD_NEW_CONTACT_URL = MESSAGE_CONTACT_BASE_URL + "/add-contact";
const GET_CONTACTS_URL = MESSAGE_CONTACT_BASE_URL + "/get-contacts";
const UPDATE_LAST_MESSAGE_AND_TIME =
  MESSAGE_CONTACT_BASE_URL + "/update-last-message";

var stompClient = null;

const DoctorPageMessage = () => {
  const [myMessage, setMyMessage] = useState("");
  const [dialog, setDialog] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [currentPatient, setcurrentPatient] = useState(null);
  const [currentPatientFlag, setcurrentPatientFlag] = useState(false);
  const [userInfo, setUserInfo] = useState({
    tckn: "",
    roles: [],
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    registerUser();
  }, [userInfo]);

  useEffect(() => {
    setcurrentPatientFlag(true);
  }, [currentPatient]);

  useEffect(() => {
    getContacts();
  }, [messages]);

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

  const onError = (err) => {
    console.log("asdsdfhhhh: " + err);
  };

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
        receiverTckn: currentPatient.tckn,
        message: myMessage,
        sentTime: new Date().toLocaleTimeString(),
      };

      if (userInfo.tckn !== currentPatient.tckn && myMessage !== "") {
        let patientTckn = currentPatient.tckn;

        let data = getMessagesFromLocalStorage(patientTckn);

        data.push(chatMessage);

        localStorage.setItem(patientTckn, JSON.stringify(data));
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getAllPatients = async (e) => {
    let tokenWithoutBearer = localStorage.getItem("accToken").toString();
    let token =
      "Bearer " +
      tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);
    try {
      const response = await axios.get(GET_PATIENTS_URL, {
        headers: { "Content-Type": "application/json" },
        headers: { Authorization: token },
        withCredentials: true,
      });

      setAllPatients(response.data.data);
    } catch (e) {}
  };

  const addNewContact = async (e) => {
    try {
      const response = await axios.post(
        ADD_NEW_CONTACT_URL,
        JSON.stringify({
          senderTckn: userInfo.tckn,
          receiverTckn: currentPatient.tckn,
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

      const url = GET_CONTACTS_URL + "/" + user.tckn + "/PATIENT";

      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        //headers: {},
        withCredentials: true,
      });

      setContacts(response.data.data);
    } catch (e) {}
  };

  const handleDialogOpen = () => {
    getAllPatients();
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const handleDialogItemClick = (doctor) => {
    handleDialogClose();

    setcurrentPatient(doctor);

    getMessagesFromLocalStorage(doctor.tckn);
  };

  const getMessagesFromLocalStorage = (patientTckn) => {
    let messageArray = JSON.parse(localStorage.getItem(patientTckn));

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

    updateLastMessageAndTime(currentPatient, myMessage);

    setMyMessage("");
  };

  const RenderMessageBubbles = () => {
    //localStorage.clear();
    let array = [];

    messages.map((k, index) => {
      let whoIsResponsibleFromMessage =
        k.senderTckn !== null && k.senderTckn == userInfo.tckn ? true : false;

      array.push(
        <MessageBubble
          key={index}
          message={k.message}
          sentTime={k.sentTime}
          isMyMessage={whoIsResponsibleFromMessage}
        />
      );
    });

    return array;
  };

  const RenderSelectPatientDialogBox = () => {
    return (
      <Dialog onClose={handleDialogClose} open={dialog}>
        <DialogTitle>Bir Hasta Seç</DialogTitle>
        <List sx={{ pt: 0 }}>
          {allPatients.map((patient, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleDialogItemClick(patient)}
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
                  patient.firstName[0].toUpperCase() +
                  patient.firstName.substring(1) +
                  " " +
                  patient.lastName[0].toUpperCase() +
                  patient.lastName.substring(1)
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
            currentPatient !== null &&
            item.receiverTckn === currentPatient.tckn &&
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

  const getMessageBubble = (
    receiverTckn,
    receiverFirstName,
    receiverLastName
  ) => {
    let receiver = {
      tckn: receiverTckn,
      firstName: receiverFirstName,
      lastName: receiverLastName,
    };

    handleDialogItemClick(receiver);
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
          <h3>Hastalarım</h3>
          <IconButton
            className="person-add-icon-button"
            onClick={handleDialogOpen}
          >
            <PersonAddAlt1Icon />
          </IconButton>

          <RenderSelectPatientDialogBox />
        </div>
        <div className="patient-message-contacts">
          <RenderMessageContacts />
        </div>
      </div>
      <>
        {currentPatient != null ? (
          <div className="patient-message-right-container">
            <div className="message-right-top-contact-info">
              <MessageContact
                key={currentPatient.id}
                name={
                  capitalizeFirstLetter(currentPatient.firstName) +
                  " " +
                  capitalizeFirstLetter(currentPatient.lastName)
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
                  disabled={currentPatientFlag ? false : true}
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

export default DoctorPageMessage;
