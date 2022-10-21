import { useRef, useState, useEffect } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import CustomTextField from "../../components/CustomTextField";
import axios from "../../services/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BASE_URL = "/api/user";
const LOGIN_URL = BASE_URL + "/login";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const TCNO_REGEX = /^[1-9]{1}[0-9]{9}[02468]{1}$/;

const Login = () => {
  // Tc No
  const [tckn, setTckn] = useState("");
  const [validTckn, setValidTckn] = useState(false);
  const [tcknFocus, setTcknFocus] = useState(false);

  // Password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    status: "error",
  });

  const { vertical, horizontal, open } = snackbar;

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, vertical: "top", horizontal: "center" });
  };

  const handleLogin = async (e) => {
    console.log(password);
    console.log(tckn);

    const resultTckn = TCNO_REGEX.test(tckn);
    const resultPassword = PWD_REGEX.test(password);

    console.log(resultTckn);
    console.log(resultPassword);

    if (!(resultPassword && resultTckn)) {
      setSnackbar({
        open: true,
        vertical: "top",
        horizontal: "right",
        message: "Kullanıcı Bilgileri Hatalı. Tekrar Giriniz.",
        status: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          password: password,
          tckn: tckn,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      // Navigate to home page if login is successfull
      navigate("/home");
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
    <section>
      <h1>Giriş Yap</h1>

      <CustomTextField
        id="tckno"
        label="TC-Kimlik No"
        setState={setTckn}
        setFocus={setTcknFocus}
        validProp={validTckn}
        focusProp={tcknFocus}
        //helperText=" Gerçek bir Tc-Kimlik numarası girmelisiniz"
      />

      <CustomTextField
        id="password"
        label="Şifre"
        setState={setPassword}
        setFocus={setPasswordFocus}
        validProp={validPassword}
        focusProp={passwordFocus}
        //helperText=" Şifre en az 6 karakterli olmalı"
        type="password"
      />

      <br></br>
      <Button
        className="signUpButton"
        disabled={tckn === "" || password === "" ? true : false}
        variant="outlined"
        onClick={handleLogin}
      >
        Giriş Yap
      </Button>

      <p style={{ fontSize: 13 }}>
        Hesabınız yoksa <Link to="/register">kayıt</Link> olabilirsiniz.
      </p>

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
    </section>
  );
};

export default Login;
