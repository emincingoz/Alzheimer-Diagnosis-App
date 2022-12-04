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

const BASE_URL = "/api/patient";
const GET_DOCTORS_URL = BASE_URL + "/get-doctors";

var stompClient = null;

const PatientPageMessage = () => {
  const [myMessage, setMyMessage] = useState("");
  const [dialog, setDialog] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentDoctorFlag, setCurrentDoctorFlag] = useState(false);
  const [currentDoctorFullName, setCurrentDoctorFullName] = useState("");
  const [userInfo, setUserInfo] = useState({
    tckn: "",
    roles: [],
  });

  const [privateChats, setPrivateChats] = useState(new Map());
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("setState completed2: ", userInfo.tckn);
    registerUser();
  }, [userInfo]);

  useEffect(() => {
    console.log("setState completed2: ", userInfo.tckn);
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
    console.log("user1: " + user1.tckn);
    setUserInfo(user1);
    console.log("user: " + userInfo.tckn);
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
    console.log(payload);

    var payloadData = JSON.parse(payload.body);

    if (privateChats.get(payloadData.senderTckn)) {
      /*privateChats.get(payloadData.senderTckn).push(payloadData);
      setPrivateChats(new Map(privateChats));*/

      setPrivateChats(
        (prev) => new Map([...prev, [payloadData.senderTckn, payloadData]])
      );
    } else {
      let list = [];
      list.push(payloadData);
      /*privateChats.set(payloadData.senderTckn, list);
      setPrivateChats(new Map(privateChats));*/

      setPrivateChats(
        (prev) => new Map([...prev, [payloadData.senderTckn, list]])
      );
    }
  };

  // TODO:: senderTckn local storage'den çekilecek
  // TODO:: receiverTckn currentDoctor'dan çekilecek
  // TODO:: sentTime anlık zamanı tutacak
  // TODO:: message bir yerden çekilecek, bilmiyorum şu an
  const sendPrivateMessage = () => {
    if (stompClient) {
      console.log("asdfd: " + currentDoctor.tckn);
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
    //console.log("map: " + privateChats.get("53401215078").chat.message);
  }, []);

  useEffect(() => {
    //getUser();
    /*[privateChats.get("53401215074")].map((chat, index, value) => {
      console.log("chatssd: " + chat);
      console.log("chatssd: " + value.message);
      console.log("chatssd: " + index);
    });*/

    [...privateChats.keys()].map((k) => {
      console.log("sdfdgf: " + privateChats.get(k).receiverTckn);
      [k].map((chat, index) => {
        console.log("asffgggg: " + chat.receiverTckn);
      });
    });
  }, [privateChats]);

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
    handleDialogClose();

    console.log("doct: " + doctor.tckn);
    setCurrentDoctor(doctor);
    console.log("doct1: " + doctor.tckn);
    setCurrentDoctorFullName(
      doctor.firstName[0].toUpperCase() +
        doctor.firstName.substring(1) +
        " " +
        doctor.lastName[0].toUpperCase() +
        doctor.lastName.substring(1)
    );

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

    setMyMessage("");
  };

  const RenderMessageBubbles = () => {
    let array = [];

    messages.map((k) =>
      array.push(
        <MessageBubble
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
    );
  };

  const RenderMessageContacts = () => {};

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
          {/*<MessageContact />
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
          <MessageContact />*/}
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
