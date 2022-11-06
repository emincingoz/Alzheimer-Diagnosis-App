import { useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import InputMask from "react-input-mask";
import "./styles/Register.css";
import CustomTextField from "./custom/CustomTextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "../../services/axios";
import { Link } from "react-router-dom";
import brainImage from "../../assets/images/register-brain.png";

//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const TCNO_REGEX = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
const PHONE_NUMBER_REGEX =
  /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const BASE_URL = "/api/user";
const REGISTER_URL = BASE_URL + "/register";

const Register2 = () => {
  // Name
  const [firstName, setFirstName] = useState("");
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  // Surname
  const [lastName, setLastName] = useState("");
  const [lastNameFocus, setLastNameFocus] = useState(false);

  // Tc No
  const [tckn, setTckn] = useState("");
  const [validTckn, setValidTckn] = useState(false);
  const [tcknFocus, setTcknFocus] = useState(false);

  // Email
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Validate Password
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  // Phone Number
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  // Birth Year
  const [birthDate, setBirthDate] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    status: "error",
  });

  const { vertical, horizontal, open } = snackbar;

  useEffect(() => {
    const result = TCNO_REGEX.test(tckn);
    setValidTckn(result);
  }, [tckn]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  const handlePhoneNumber = (phone) => {
    var result = false;
    var phoneNumber = "";

    if (phone.length === 14) {
      phoneNumber =
        phone.substring(1, 4) + phone.substring(6, 9) + phone.substring(10, 14);
      result = PHONE_NUMBER_REGEX.test(phoneNumber);
    }

    return phoneNumber;
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, vertical: "top", horizontal: "center" });
  };

  const handleSignUp = async (e) => {
    var date = new Date(birthDate).toLocaleDateString();

    // Note
    /*var day = date.substring(0, 2);
    var month = date.substring(3, 5);
    var year = date.substring(6, 10);*/

    var dateWithFormat =
      date.substring(6, 10) +
      "-" +
      date.substring(3, 5) +
      "-" +
      date.substring(0, 2);

    var phoneNumber = handlePhoneNumber(phone);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          firstName,
          lastName,
          password: password,
          email: email,
          phoneNumber: phoneNumber,
          tckn: tckn,
          birthDate: dateWithFormat,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Kullanıcı Kaydı Başarılı. Giriş Yapabilirsiniz",
        status: "success",
      });
    } catch (e) {
      if (e.response?.status === 409) {
        setSnackbar({
          open: true,
          vertical: "top",
          horizontal: "right",
          message: "Kullanıcı zaten kayıtlı",
          status: "error",
        });
      } else {
        setSnackbar({
          open: true,
          vertical: "top",
          horizontal: "right",
          message: "Kullanıcı Bilgileri Hatalı. Tekrar Giriniz.",
          status: "error",
        });
      }
    }
  };

  return (
    <div className="register-page">
      <div className="main-section">
        <div className="top">
          <div className="h1-text">
            <h1 className="register-h1">Kayıt Sayfası</h1>
          </div>
          {/*<div className="image">
          <img src={brainImage} alt="brain-image" />
        </div>*/}
        </div>

        <div className="container">
          <section className="register-section">
            <CustomTextField
              id="tckno"
              label="TC-Kimlik No"
              setState={setTckn}
              setFocus={setTcknFocus}
              validProp={validTckn}
              focusProp={tcknFocus}
              helperText=" Gerçek bir Tc-Kimlik numarası girmelisiniz"
            />

            <CustomTextField
              id="firstName"
              label="Ad"
              setState={setFirstName}
              setFocus={setFirstNameFocus}
              focusProp={firstNameFocus}
              validProp={true}
            />

            <CustomTextField
              id="lastName"
              label="Soyad"
              setState={setLastName}
              setFocus={setLastNameFocus}
              focusProp={lastNameFocus}
              validProp={true}
            />

            <CustomTextField
              id="email"
              label="E-mail"
              setState={setEmail}
              setFocus={setEmailFocus}
              validProp={validEmail}
              focusProp={emailFocus}
              helperText=" Gerçek bir email girmelisiniz"
            />
          </section>
          <section className="register-section">
            <CustomTextField
              id="password"
              label="Şifre"
              setState={setPassword}
              setFocus={setPasswordFocus}
              validProp={validPassword}
              focusProp={passwordFocus}
              helperText=" Şifre en az 6 karakterli olmalı"
              type="password"
            />

            <CustomTextField
              id="matchPassword"
              label="Şifrenizi tekrar giriniz"
              setState={setMatchPassword}
              setFocus={setMatchPasswordFocus}
              validProp={validMatchPassword}
              focusProp={matchPasswordFocus}
              helperText=" Şifreler eşleşmeli"
              type="password"
            />

            <InputMask
              mask="(999) 999-9999"
              onChange={(e) => setPhone(e.target.value)}
              required
            >
              {(inputProps) => (
                <TextField
                  className="textField"
                  id="phone"
                  label="Cep Telefonu"
                  margin="normal"
                  variant="outlined"
                  autoComplete="off"
                  size="small"
                  inputProps={{ style: { fontSize: 14 } }} // font size of input text
                  InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
                />
              )}
            </InputMask>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="datePicker"
                style={{ borderRadius: "25px" }}
                label="Doğum Tarihi"
                inputFormat="DD-MM-YYYY"
                value={birthDate}
                onChange={(date) => setBirthDate(date)}
                maxDate={new Date()}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    margin="normal"
                    inputProps={{ style: { fontSize: 14 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </section>
        </div>

        <br></br>
        <Button
          style={{
            borderRadius: "25px",
            fontWeight: "bold",
            marginBottom: "10px",
            backgroundColor: "#385e8e",
            color: "#d2d9df",
          }}
          className="signInButton"
          disabled={
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            phone === "" ||
            tckn === "" ||
            birthDate === "" ||
            password === "" ||
            matchPassword === ""
              ? true
              : false
          }
          variant="outlined"
          onClick={handleSignUp}
        >
          Kayıt Ol
        </Button>

        <p style={{ fontSize: 13 }}>
          Hesabınız varsa <Link to="/login">giriş</Link> yapınız
        </p>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.status}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register2;
