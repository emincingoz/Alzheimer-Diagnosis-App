import { useRef, useState, useEffect } from "react";
import {
  IconButton,
  Button,
  OutlinedInput,
  InputLabel,
  FormControl,
  TextField,
  InputAdornment,
  FormHelperText,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
} from "@mui/material";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faSolid,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputMask from "react-input-mask";
import "./Register.css";
import CustomTextField from "./CustomTextField";

//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const TCNO_REGEX = /^[1-9]{1}[0-9]{9}[02468]{1}$/;
const PHONE_NUMBER_REGEX =
  /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const BIRTH_YEAR_REGEX = /^(19|20)\d{2}$/;

const Register = () => {
  const errRef = useRef();

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
  const [birthDate, setBirthDate] = useState("");
  const [validBirthDate, setValidBirthDate] = useState(false);
  const [birthDateFocus, setBirthDateFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = TCNO_REGEX.test(tckn);
    setValidTckn(result);
  }, [tckn]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PHONE_NUMBER_REGEX.test(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = BIRTH_YEAR_REGEX.test(birthDate);
    setValidBirthDate(result);
  }, [birthDate]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password == matchPassword;
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMessage("");
  }, [
    firstName,
    lastName,
    password,
    matchPassword,
    tckn,
    email,
    phone,
    birthDate,
  ]);

  return (
    <section>
      <h1>Üye Ol</h1>
      <h3>Tüm alanların doldurulması zorunludur.</h3>

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
      />

      <CustomTextField
        id="lastName"
        label="Soyad"
        setState={setLastName}
        setFocus={setLastNameFocus}
        focusProp={lastNameFocus}
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
        onBlur={() => setPhoneFocus(false)}
        onFocus={() => setPhoneFocus(true)}
        required
      >
        {(inputProps) => (
          <CustomTextField
            id="phone"
            label="Cep Telefonu"
            setState={setPhone}
            setFocus={setPhoneFocus}
            validProp={validPhone}
            focusProp={phoneFocus}
            helperText=" 10 haneli olmalı ve 5 ile başlamalı"
            maxLength={10}
          />
        )}
      </InputMask>

      <CustomTextField
        id="birthDate"
        label="Doğum Tarihi"
        setState={setBirthDate}
        setFocus={setBirthDateFocus}
        validProp={validBirthDate}
        focusProp={birthDateFocus}
      />

      <br></br>
      <Button
        disabled={
          firstName === "" ||
          lastName === "" ||
          email === "" ||
          phone === "" ||
          tckn === ""
            ? true
            : false
        }
        variant="outlined"
        //onClick={handleCheckInfo}
      >
        Kayıt Ol
      </Button>
    </section>
  );
};

export default Register;
