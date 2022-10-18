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

//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PWD_REGEX = /^.{6, 24}$/;
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
    const result = TCNO_REGEX.test(password);
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

      <TextField
        className="textField"
        id="tckno"
        label="TC-Kimlik No"
        margin="normal"
        variant="outlined"
        type="text"
        autoComplete="off"
        size="small"
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onChange={(e) => setTckn(e.target.value)}
        required
        onFocus={() => setTcknFocus(true)}
        onBlur={() => setTcknFocus(false)}
        error={!validTckn && tcknFocus}
        helperText={
          !validTckn && tcknFocus ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              11 character numbers. <br />
              It must be real Tc Kimlik No
            </p>
          ) : (
            ""
          )
        }
      />

      <TextField
        className="textField"
        id="firstName"
        label="Ad"
        margin="normal"
        variant="outlined"
        size="small"
        autoComplete="off"
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onChange={(e) => setFirstName(e.target.value)}
        required
        onFocus={() => setFirstNameFocus(true)}
        onBlur={() => setFirstNameFocus(false)}
      />

      <TextField
        className="textField"
        id="lastName"
        label="Soyad"
        margin="normal"
        variant="outlined"
        size="small"
        autoComplete="off"
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onChange={(e) => setLastName(e.target.value)}
        required
        onFocus={() => setLastNameFocus(true)}
        onBlur={() => setLastNameFocus(false)}
      />

      <TextField
        className="textField"
        id="email"
        label="E-mail"
        margin="normal"
        variant="outlined"
        size="small"
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        required
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        error={!validEmail && emailFocus}
        helperText={
          !validEmail && emailFocus ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              It must be real email address
            </p>
          ) : (
            ""
          )
        }
      />

      <TextField
        className="textField"
        id="password"
        label="Şifre"
        margin="normal"
        variant="outlined"
        size="small"
        type="password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        required
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onFocus={() => setPasswordFocus(true)}
        onBlur={() => setPasswordFocus(false)}
        error={!validPassword && passwordFocus}
        helperText={
          !validPassword && passwordFocus ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              Şifreniz en az 6 karakterli olmalı
            </p>
          ) : (
            ""
          )
        }
      />

      <TextField
        className="textField"
        id="matchPassword"
        label="Şifrenizi tekrar giriniz"
        margin="normal"
        variant="outlined"
        size="small"
        type="password"
        autoComplete="off"
        onChange={(e) => setMatchPassword(e.target.value)}
        required
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        onFocus={() => setMatchPasswordFocus(true)}
        onBlur={() => setMatchPasswordFocus(false)}
        error={!validMatchPassword && matchPasswordFocus}
        helperText={
          !validMatchPassword && matchPasswordFocus ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />
              Şifreler eşleşmedi
            </p>
          ) : (
            ""
          )
        }
      />

      <InputMask
        mask="(999) 999-9999"
        onChange={(e) => setPhone(e.target.value)}
        onBlur={() => setPhoneFocus(false)}
        onFocus={() => setPhoneFocus(true)}
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
            maxLength={10}
            error={!validPhone && phoneFocus}
            inputProps={{ style: { fontSize: 14 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
            helperText={
              !validPhone && phoneFocus ? (
                <p>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  10 character numbers. <br />
                  It must be start with 5
                </p>
              ) : (
                ""
              )
            }
          />
        )}
      </InputMask>

      <TextField
        className="textField"
        id="birthYear"
        label="Doğum Tarihi"
        margin="normal"
        variant="outlined"
        size="small"
        autoComplete="off"
        onChange={(e) => setBirthDate(e.target.value)}
        required
        onFocus={() => setBirthDateFocus(true)}
        onBlur={() => setBirthDateFocus(false)}
        error={!validBirthDate && birthDateFocus}
        inputProps={{ style: { fontSize: 14 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
        helperText={
          !validBirthDate && birthDateFocus ? (
            <p>
              <FontAwesomeIcon icon={faInfoCircle} />4 character numbers
            </p>
          ) : (
            ""
          )
        }
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

      {/*<Snackbar
        //open={open}
        autoHideDuration={6000}
        //onClose={handleSnackbarClose}
        //anchorOrigin={{ vertical, horizontal }}
        //key={vertical + horizontal}
      >
        <Alert
          //onClose={handleSnackbarClose}
          severity={snackbar.status}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>*/}
    </section>
  );
};

export default Register;
