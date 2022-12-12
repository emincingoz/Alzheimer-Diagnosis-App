import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import userIcon from "../assets/images/user-icon.png";
import "../styles/SettingsPage.css";
import axios from "../services/axios";
import { InfoTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BASE_URL = "/api/user";
const GET_USER_INFOS_URL = BASE_URL + "/get-user-infos";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const PHONE_NUMBER_REGEX =
  /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SettingsPage = () => {
  const [unChangeableInfos, setUnChangeableInfos] = useState([
    { type: "TC-Kimlik No", value: "" },
    { type: "Ad", value: "" },
    { type: "Soyad", value: "" },
    { type: "Doğum Tarihi", value: "" },
  ]);

  const [changeableInfos, setChangeableInfos] = useState([
    { type: "Cep Telefonu", value: "" },
    { type: "E-Mail", value: "" },
    { type: "Şifre", value: "" },
    { type: "Şifrenizi Tekrar Giriniz", value: "" },
  ]);

  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfos();
  }, []);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [passwordAgain, setPasswordAgain] = useState("");
  const [validPasswordAgain, setValidPasswordAgain] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
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

  async function getUserInfos(e) {
    let tokenWithoutBearer = localStorage.getItem("accToken").toString();
    let token =
      "Bearer " +
      tokenWithoutBearer.substring(1, tokenWithoutBearer.length - 1);

    let tckn = JSON.parse(localStorage.getItem("user")).tckn;
    console.log("myTckns: " + tckn);

    try {
      const response = await axios.get(GET_USER_INFOS_URL + "/" + tckn, {
        headers: { "Content-Type": "application/json" },
        headers: { Authorization: token },
        withCredentials: true,
      });

      console.log("resp: " + response.data.tckn);

      let data = response.data;

      setUnChangeableInfos([
        { type: "TC-Kimlik No", value: data.tckn },
        { type: "Ad", value: data.firstName },
        { type: "Soyad", value: data.lastName },
        { type: "Doğum Tarihi", value: data.birthDate },
      ]);

      console.log("mfdfginfo: " + data.email);
      console.log("mfdfginfo: " + data.phoneNumber);

      setChangeableInfos([
        { type: "Cep Telefonu", value: data.phoneNumber },
        { type: "E-Mail", value: data.email },
        { type: "Şifre", value: "" },
        { type: "Şifrenizi Tekrar Giriniz", value: "" },
      ]);

      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
    } catch (e) {}
  }

  function RenderUnchangeableTextFields() {
    let array = [];

    unChangeableInfos.forEach((info, index) => {
      array.push(
        <div className="settings-page-textfield" key={index}>
          <p style={{ textAlign: "start", color: "#6e7ec2" }}>{info.type}</p>
          <TextField disabled={true} focused={true} value={info.value} />
        </div>
      );
    });

    return array;
  }

  function handleUpdateButtonActive() {
    let flag = false;
    changeableInfos.forEach((info, index) => {
      if (
        (info.type === "Cep Telefonu" &&
          info.value === phoneNumber.toString()) ||
        (info.type === "E-Mail" && info.value === email) ||
        (info.type === "Şifre" && info.value === password) ||
        (info.type === "Şifrenizi Tekrar Giriniz" &&
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

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accToken");
    localStorage.removeItem("roles");

    navigate("/login");
  }

  // TODO:: change url to /patient/home-page
  function navigateToHomePage() {
    const token = JSON.parse(localStorage.getItem("accToken"));
    const role = JSON.parse(localStorage.getItem("roles"));

    setAuth({ token, roles: [role] });
    navigate("/");
  }

  return (
    <div className="settings-page">
      <div className="settings-page-left-side">
        <div className="settings-page-user-icon">
          <img className="big-user-icon" src={userIcon} alt="send-icon" />
        </div>
        <div className="settings-page-two-button">
          <div className="settings-page-update-button">
            <Button
              disabled={handleUpdateButtonActive()}
              style={
                handleUpdateButtonActive()
                  ? { backgroundColor: "#d9d9d9", color: "black" }
                  : {}
              }
            >
              Güncelle
            </Button>
          </div>
          <div className="settings-page-cancel-button">
            <Button onClick={navigateToHomePage}>İptal</Button>
          </div>
        </div>
        <div className="settings-page-logout-button">
          <Button onClick={handleLogout}>Çıkış Yap</Button>
        </div>
      </div>
      <div className="settings-page-right-side">
        <div className="settings-page-header">Hesap Ayarları</div>
        <div className="settings-page-textfields">
          <div className="settings-page-unchangeable-textfields">
            <RenderUnchangeableTextFields />
          </div>
          <div className="settings-page-changeable-textfields">
            <div className="settings-page-textfield">
              <p style={{ textAlign: "start", color: "#6e7ec2" }}>
                Telefon Numarası
              </p>
              <TextField
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="number"
              />
            </div>
            <div className="settings-page-textfield">
              <p style={{ textAlign: "start", color: "#6e7ec2" }}>E-Mail</p>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="settings-page-textfield">
              <p style={{ textAlign: "start", color: "#6e7ec2" }}>Şifre</p>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="settings-page-textfield">
              <p style={{ textAlign: "start", color: "#6e7ec2" }}>
                Şifrenizi Tekrar Giriniz
              </p>
              <TextField
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
